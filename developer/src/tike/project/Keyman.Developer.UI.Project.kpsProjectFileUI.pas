(*
  Name:             Keyman.Developer.UI.Project.kpsProjectFileUI
  Copyright:        Copyright (C) 2003-2017 SIL International.
  Documentation:
  Description:
  Create Date:      4 May 2015

  Modified Date:    4 May 2015
  Authors:          mcdurdin
  Related Files:
  Dependencies:

  Bugs:
  Todo:
  Notes:
  History:          04 May 2015 - mcdurdin - I4694 - V9.0 - Split UI actions from non-UI actions in projects
*)
unit Keyman.Developer.UI.Project.kpsProjectFileUI;

interface

uses
  System.UITypes,
  KPSFile,
  Menus,
  Keyman.Developer.System.Project.ProjectFile,
  Keyman.Developer.UI.Project.ProjectFilesUI,
  Keyman.Developer.UI.Project.ProjectFileUI,
  Keyman.Developer.System.Project.kpsProjectFileAction;

type
  TkpsProjectFileUI = class(TOpenableProjectFileUI)
  private
    function TestPackageOnline: Boolean;
    function InstallPackage: Boolean;
    function UninstallPackage: Boolean;
    function CompilePackage(FSilent: Boolean): Boolean;
    function CompilePackageInstaller(FSilent: Boolean): Boolean;

    function GetPack: TKPSFile;
    function GetProjectFile: TkpsProjectFileAction;
    function TestPackageState(FCompiledName: string; FSilent: Boolean): Boolean;
  public
    function DoAction(action: TProjectFileAction; FSilent: Boolean): Boolean; override;
    property ProjectFile: TkpsProjectFileAction read GetProjectFile;
  end;

implementation

uses
  System.SysUtils,

  Windows,
  Dialogs,
  dmActionsMain,
  Controls,
  Keyman.Developer.System.Project.Project,
  Keyman.Developer.System.ServerAPI,
  Keyman.Developer.UI.Project.ProjectUIFileType,
  Keyman.Developer.UI.ServerUI,
  UfrmMain,
  UfrmMessages,
  UfrmMDIEditor,
  UfrmPackageEditor,
  UmodWebHttpServer,
  utilexecute,
  Variants,
  ShellApi,
  KeymanDeveloperUtils,
  PackageInfo;

function TkpsProjectFileUI.CompilePackage(FSilent: Boolean): Boolean;
begin
  Result := False;
  if ProjectFile.Modified then
    if not modActionsMain.actFileSave.Execute then Exit;

  Result := ProjectFile.CompilePackage(GetPack, FSilent);

  if Result and
      TServerDebugAPI.Running and
      TServerDebugAPI.IsPackageRegistered(ProjectFile.TargetFileName) then
    TestPackageOnline;
end;

function TkpsProjectFileUI.CompilePackageInstaller(FSilent: Boolean): Boolean;
begin
  Result := False;
  if ProjectFile.Modified then
    if not modActionsMain.actFileSave.Execute then Exit;

  Result := ProjectFile.CompilePackageInstaller(GetPack, FSilent);
end;

function TkpsProjectFileUI.DoAction(action: TProjectFileAction; FSilent: Boolean): Boolean;
begin
  case action of
    pfaCompile: Result := CompilePackage(FSilent);
    pfaInstall: Result := InstallPackage;
    pfaUninstall: Result := UninstallPackage;
    pfaCompileInstaller: Result := CompilePackageInstaller(FSilent);
    pfaClean: Result := ProjectFile.Clean;
    pfaTestKeymanWeb: Result := TestPackageOnline;
  else
    Result := False;
  end;
end;

function TkpsProjectFileUI.GetPack: TKPSFile;
begin
  if Assigned(MDIChild)
    then with MDIChild as TfrmPackageEditor do Result := GetPack
    else Result := nil;
end;

function TkpsProjectFileUI.GetProjectFile: TkpsProjectFileAction;
begin
  Result := FOwner as TkpsProjectFileAction;
end;

function TkpsProjectFileUI.InstallPackage: Boolean;
var
  FCompiledName: string;
begin
  Result := False;
  FCompiledName := ProjectFile.TargetFilename;
  if not TestPackageState(FCompiledName, False) then Exit;
  KeymanDeveloperUtils.InstallPackage(FCompiledName, True);
  Result := True;
end;

function TkpsProjectFileUI.TestPackageOnline: Boolean;
var
  FCompiledName: string;
  editor: TfrmTikeEditor;
  packageEditor: TfrmPackageEditor;
begin
  editor := frmKeymanDeveloper.FindEditorByFileName(ProjectFile.FileName);   // I4021
  if not Assigned(editor) or not (editor is TfrmPackageEditor) then
    Exit(False);
  packageEditor := editor as TfrmPackageEditor;

  FCompiledName := ProjectFile.TargetFilename;
  if not FileExists(FCompiledName) then
    Exit(False);

  if TServerUI.VerifyServerRunning then
  begin
    TServerDebugAPI.RegisterPackage(FCompiledName, ProjectFile.Header_Name);
    packageEditor.NotifyStartedWebDebug;   // I4021
  end;

  Result := True;
end;

function TkpsProjectFileUI.UninstallPackage: Boolean;
begin
  Result := KeymanDeveloperUtils.UninstallPackage(ChangeFileExt(ExtractFileName(ProjectFile.FileName), ''));
end;

function TkpsProjectFileUI.TestPackageState(FCompiledName: string; FSilent: Boolean): Boolean;
var
  ftkps, ftkmp: TDateTime;
begin
  Result := False;

  if not FileExists(FCompiledName) then
    if FSilent then
    begin
      if not CompilePackage(FSilent) then Exit;
    end
    else
      case MessageDlg('You need to compile the keyboard before you can test it.  Compile now?',
          mtConfirmation, mbOkCancel, 0) of
        mrOk:     if not CompilePackage(FSilent) then Exit;
        mrCancel: Exit;
      end;

  FileAge(ProjectFile.FileName, ftkps);
  FileAge(FCompiledName, ftkmp);

  if ProjectFile.Modified or (ftkps > ftkmp) then
    if FSilent then
    begin
      if not CompilePackage(FSilent) then Exit;
    end
    else
      case MessageDlg('The source file has changed.  Recompile before testing?',
          mtConfirmation, mbYesNoCancel, 0) of
        mrYes:    if not CompilePackage(FSilent) then Exit;
        mrNo:     ;
        mrCancel: Exit;
      end;

  Result := True;
end;

initialization
  RegisterProjectFileUIType(TkpsProjectFileAction, TkpsProjectFileUI);
end.
