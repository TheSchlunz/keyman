///<reference path="visualKeyboard.ts" />
///<reference path="uiTouchHandlerBase.ts" />

namespace com.keyman.osk {
  // Base class for a banner above the keyboard in the OSK

  export abstract class Banner {
    private _height: number; // pixels
    private _width: number; // pixels
    private div: HTMLDivElement;

    public static DEFAULT_HEIGHT: number = 37; // pixels; embedded apps can modify

    public static readonly BANNER_CLASS: string = 'kmw-banner-bar';
    public static readonly BANNER_ID: string = 'kmw-banner-bar';

    /**
     * Function     height
     * Scope        Public
     * @returns     {number} height in pixels
     * Description  Returns the height of the banner in pixels
     */
    public get height(): number {
      return this._height;
    }

    /**
     * Function     height
     * Scope        Public
     * @param       {number} height   the height in pixels
     * Description  Sets the height of the banner in pixels. If a negative
     *              height is given, set height to 0 pixels.
     *              Also updates the banner styling.
     */
    public set height(height: number) {
      this._height = (height > 0) ?  height : 0;
      this.update();
    }

    public get width(): number {
      return this._width;
    }

    public set width(width: number) {
      this._width = width;
      this.update();
    }

    /**
     * Function      update
     * @return       {boolean}   true if the banner styling changed
     * Description   Update the height and display styling of the banner
     */
    private update() : boolean {
      let ds = this.div.style;
      let currentHeightStyle = ds.height;
      let currentDisplayStyle = ds.display;

      if (this._height > 0) {
        ds.height = this._height + 'px';
        ds.display = 'block';
      } else {
        ds.height = '0px';
        ds.display = 'none';
      }

      return (!(currentHeightStyle === ds.height) ||
        !(currentDisplayStyle === ds.display));
    }

    public constructor(height?: number) {
      let keymanweb = com.keyman.singleton;
      let util = keymanweb.util;

      let d = util._CreateElement('div');
      d.id = Banner.BANNER_ID;
      d.className = Banner.BANNER_CLASS;
      this.div = d;

      this.height = height;
      this.update();
    }

    public appendStyleSheet() {
      let keymanweb = com.keyman.singleton;
      let util = keymanweb.util;

      // TODO: add stylesheets
    }

    /**
     * Function     getDiv
     * Scope        Public
     * @returns     {HTMLElement} Base element of the banner
     * Description  Returns the HTMLElement of the banner
     */
    public getDiv(): HTMLElement {
      return this.div;
    }

    /**
     * Function     activate
     * Scope        Public
     * Description  Adds any relevant event listeners needed by this banner type.
     */
    public activate() {
      // Default implementation - no listeners.
    }

    /**
     * Function     activate
     * Scope        Public
     * Description  Removes any relevant event listeners previously added by this banner.
     */
    public deactivate() {
      // Default implementation - no listeners.
    }
  }

  /**
   * Function       BlankBanner
   * Description    A banner of height 0 that should not be shown
   */
  export class BlankBanner extends Banner {

    constructor() {
      super(0);
    }
  }

  /**
   * Function       ImageBanner
   * @param         {string}        imagePath   Path of image to display in the banner
   * @param         {number}        height      If provided, the height of the banner in pixels
   * Description    Display an image in the banner
   */
  export class ImageBanner extends Banner {
    private img: HTMLElement;

    constructor(imagePath: string, height?: number) {
      if (imagePath.length > 0) {
        super();
        if (height) {
          this.height = height;
        }
      } else {
        super(0);
      }

      if(imagePath.indexOf('base64') >=0) {
        console.log("Loading img from base64 data");
      } else {
        console.log("Loading img with src '" + imagePath + "'");
      }
      this.img = document.createElement('img');
      this.img.setAttribute('src', imagePath);
      let ds = this.img.style;
      ds.width = '100%';
      ds.height = '100%';
      this.getDiv().appendChild(this.img);
      console.log("Image loaded.");
    }

    /**
     * Function     setImagePath
     * Scope        Public
     * @param       {string}     imagePath   Path of image to display in the banner
     * Description  Update the image in the banner
     */
    public setImagePath(imagePath: string) {
      if (this.img) {
        this.img.setAttribute('src', imagePath);
      }
    }
  }

  // TODO:  finalize + document
  interface OptionFormatSpec {
    minWidth?: number;
    paddingWidth: number,
    emSize: number,
    styleForFont: CSSStyleDeclaration,
    rtl?: boolean,

    collapsedWidth?: number
  }

  export class BannerSuggestion {
    div: HTMLDivElement;
    container: HTMLDivElement;
    private display: HTMLSpanElement;

    private _collapsedWidth: number;
    private _textWidth: number;
    private _minWidth: number;
    private _paddingWidth: number;
    private _rtl: boolean = false;

    private fontFamily?: string;

    private _suggestion: Suggestion;

    private index: number;

    static readonly BASE_ID = 'kmw-suggestion-';

    constructor(index: number) {
      let keyman = com.keyman.singleton;

      this.index = index;

      this.constructRoot();

      // Provides an empty, base SPAN for text display.  We'll swap these out regularly;
      // `Suggestion`s will have varying length and may need different styling.
      let display = this.display = keyman.util._CreateElement('span');
      display.className = 'kmw-suggestion-text';
      this.container.appendChild(display);
    }

    private constructRoot() {
      let keyman = com.keyman.singleton;

      // Add OSK suggestion labels
      let div = this.div = keyman.util._CreateElement('div'), ds=div.style;
      div.className = "kmw-suggest-option";
      div.id = BannerSuggestion.BASE_ID + this.index;

      let kbdDetails = keyman.keyboardManager.activeStub;
      if(kbdDetails) {
        if (kbdDetails['KLC']) {
          div.lang = kbdDetails['KLC'];
        }

        // Establish base font settings
        let font = kbdDetails['KFont'];
        if(font && font.family && font.family != '') {
          ds.fontFamily = this.fontFamily = font.family;
        }
      }

      this.div['suggestion'] = this;

      let container = this.container = document.createElement('div');
      container.className = "kmw-suggestion-container";

      // Ensures that a reasonable default width, based on % is set. (Since it's not yet in the DOM, we may not yet have actual width info.)
      let usableWidth = 100 - SuggestionBanner.MARGIN * (SuggestionBanner.SUGGESTION_LIMIT - 1);

      // The `/ 2` part:  Ensures that the full banner is double-wide, which is useful for demoing scrolling.
      let widthpc = usableWidth / (SuggestionBanner.SUGGESTION_LIMIT / 2);
      container.style.minWidth = widthpc + '%';

      div.appendChild(container);
    }

    get suggestion(): Suggestion {
      return this._suggestion;
    }

    /**
     * Function update
     * @param {string}     id           Element ID for the suggestion span
     * @param {Suggestion} suggestion   Suggestion from the lexical model
     * Description  Update the ID and text of the BannerSuggestionSpec
     */
    public update(suggestion: Suggestion, format: OptionFormatSpec) {
      this._suggestion = suggestion;
      this.updateText();

      // Set internal properties for use in format calculations.
      if(format.minWidth !== undefined) {
        this._minWidth = format.minWidth;
      }

      this._paddingWidth = format.paddingWidth;
      this._collapsedWidth = format.collapsedWidth;

      if(suggestion && suggestion.displayAs) {
        const rawMetrics = OSKKey.getTextMetrics(suggestion.displayAs, format.emSize, format.styleForFont);
        this._textWidth = rawMetrics.width;
      } else {
        this._textWidth = 0;
      }

      this.updateLayout();
    }

    public updateLayout() {
      if(!this.suggestion && this.index != 0) {
        this.div.style.width='0px';
        return;
      } else {
        this.div.style.width='';
      }

      // TODO:  if the option is highlighted, maybe don't disable transitions?
      this.container.style.transition = 'none'; // temporarily disable transition effects.

      const collapserStyle = this.container.style;
      collapserStyle.minWidth = this.collapsedWidth + 'px';

      if(this.rtl) {
        collapserStyle.marginRight = (this.collapsedWidth - this.expandedWidth) + 'px';
      } else {
        collapserStyle.marginLeft  = (this.collapsedWidth - this.expandedWidth) + 'px';
      }

      this.container.offsetWidth; // To 'flush' the changes before re-enabling transition animations.
      this.container.offsetLeft;

      this.container.style.transition = ''; // Re-enable them (it's set on the element's class)
    }

    private updateText() {
      let display = this.generateSuggestionText();
      this.container.replaceChild(display, this.display);
      this.display = display;
    }

    public get targetCollapsedWidth(): number {
      return this._collapsedWidth;
    }

    public get textWidth(): number {
      return this._textWidth;
    }

    public get paddingWidth(): number {
      return this._paddingWidth;
    }

    public get minWidth(): number {
      return this._minWidth;
    }

    public set minWidth(val: number) {
      this._minWidth = val;
    }

    public get expandedWidth(): number {
      // minWidth must be defined AND greater for the conditional to return this.minWidth.
      return this.minWidth > this.spanWidth ? this.minWidth : this.spanWidth;
    }

    public get spanWidth(): number {
      let spanWidth = this.textWidth ?? 0;
      if(spanWidth) {
        spanWidth += this.paddingWidth ?? 0;
      }

      return spanWidth;
    }

    public get collapsedWidth(): number {
      let maxWidth = this.targetCollapsedWidth < this.expandedWidth ? this.targetCollapsedWidth : this.expandedWidth;

      // Will return maxWidth if this.minWidth is undefined.
      return (this.minWidth > maxWidth ? this.minWidth : maxWidth);
    }

    public get currentWidth(): number {
      return this.div.offsetWidth;
    }

    public set currentWidth(val: number) {
      // TODO:  probably should set up errors or something here...
      if(val < this.collapsedWidth) {
        val = this.collapsedWidth;
      } else if(val > this.expandedWidth) {
        val = this.expandedWidth;
      }

      if(this.rtl) {
        this.container.style.marginRight = `${val - this.expandedWidth}px`;
      } else {
        this.container.style.marginLeft = `${val - this.expandedWidth}px`;
      }
    }

    public get rtl(): boolean {
      return this._rtl;
    }

    private set rtl(val: boolean) {
      this._rtl = val;
    }

    /**
     * Function apply
     * @param target (Optional) The OutputTarget to which the `Suggestion` ought be applied.
     * Description  Applies the predictive `Suggestion` represented by this `BannerSuggestion`.
     */
    public apply(target?: text.OutputTarget): Promise<Reversion> {
      let keyman = com.keyman.singleton;

      if(this.isEmpty()) {
        return null;
      }

      if(!target) {
        /* Assume it's the currently-active `OutputTarget`.  We should probably invalidate
          * everything if/when the active `OutputTarget` changes, though we haven't gotten that
          * far in implementation yet.
          */
        target = dom.Utils.getOutputTarget();
      }

      if(this._suggestion.tag == 'revert') {
        keyman.core.languageProcessor.applyReversion(this._suggestion as Reversion, target);
        return null;
      } else {
        return keyman.core.languageProcessor.applySuggestion(this.suggestion, target, () => keyman.core.keyboardProcessor.layerId);
      }
    }

    public isEmpty(): boolean {
      return !this._suggestion;
    }

    /**
     * Function generateSuggestionText
     * @return {HTMLSpanElement}  Span element of the suggestion
     * Description   Produces a HTMLSpanElement with the key's actual text.
     */
    //
    public generateSuggestionText(): HTMLSpanElement {
      let keyman = com.keyman.singleton;
      let util = keyman.util;

      let suggestion = this._suggestion;
      var suggestionText: string;

      var s=util._CreateElement('span');
      s.className = 'kmw-suggestion-text';

      if(suggestion == null) {
        return s;
      }

      if(suggestion.displayAs == null || suggestion.displayAs == '') {
        suggestionText = '\xa0';  // default:  nbsp.
      } else {
        // Default the LTR ordering to match that of the active keyboard.
        let activeKeyboard = keyman.core.activeKeyboard;
        this.rtl = activeKeyboard && activeKeyboard.isRTL;
        let orderCode = this.rtl ? 0x202e /* RTL */ : 0x202d /* LTR */;
        suggestionText = String.fromCharCode(orderCode) + suggestion.displayAs;
      }

      // TODO:  Dynamic suggestion text resizing.  (Refer to OSKKey.getTextWidth in visualKeyboard.ts.)

      // Finalize the suggestion text
      s.innerHTML = suggestionText;
      return s;
    }
  }

  /**
   * Function     SuggestionBanner
   * Scope        Public
   * @param {number} height - If provided, the height of the banner in pixels
   * Description  Display lexical model suggestions in the banner
   */
  export class SuggestionBanner extends Banner {
    public static readonly SUGGESTION_LIMIT: number = 6;
    public static readonly MARGIN = 1;

    private options : BannerSuggestion[];
    private separators: HTMLElement[];

    private hostDevice: utils.DeviceSpec;

    private manager: SuggestionManager;
    private readonly container: HTMLElement;

    static readonly TOUCHED_CLASS: string = 'kmw-suggest-touched';
    static readonly BANNER_CLASS: string = 'kmw-suggest-banner';
    static readonly BANNER_SCROLLER_CLASS = 'kmw-suggest-banner-scroller';

    constructor(hostDevice: utils.DeviceSpec, height?: number) {
      super(height || Banner.DEFAULT_HEIGHT);
      this.hostDevice = hostDevice;

      this.getDiv().className = this.getDiv().className + ' ' + SuggestionBanner.BANNER_CLASS;

      this.container = document.createElement('div');
      this.container.className = SuggestionBanner.BANNER_SCROLLER_CLASS;
      this.getDiv().appendChild(this.container);
      // TODO:  additional styling for the banner scroll container?

      this.buildOptions();

      this.manager = new SuggestionManager(this.container, this.container, (suggestions) => this.updateOptions(suggestions));

      this.setupInputHandling();
    }

    private buildOptions() {
      this.options = [];
      this.separators = [];

      for (var i=0; i<SuggestionBanner.SUGGESTION_LIMIT; i++) {
        let d = new BannerSuggestion(i);
        this.options[i] = d;
      }

      /* LTR behavior:  the default (index 0) suggestion should be at the left
       * RTL behavior:  the default (index 0) suggestion should be at the right
       *
       * The cleanest way to make it work - simply invert the order in which
       * the elements are inserted for RTL.  This allows the banner to be RTL
       * for visuals/UI while still being internally LTR.
       */
      let activeKeyboard = com.keyman.singleton.core.activeKeyboard;
      let rtl = activeKeyboard && activeKeyboard.isRTL;
      for (var i=0; i<SuggestionBanner.SUGGESTION_LIMIT; i++) {
        let indexToInsert = rtl ? SuggestionBanner.SUGGESTION_LIMIT - i -1 : i;
        this.container.appendChild(this.options[indexToInsert].div);

        if(i != SuggestionBanner.SUGGESTION_LIMIT - 1) {
          // Adds a 'separator' div element for UI purposes.
          let separatorDiv = com.keyman.singleton.util._CreateElement('div');
          separatorDiv.className = 'kmw-banner-separator';

          let ds = separatorDiv.style;
          ds.marginLeft = `calc(${(SuggestionBanner.MARGIN / 2)}% - 0.5px)`;
          ds.marginRight = `calc(${(SuggestionBanner.MARGIN / 2)}% - 0.5px)`;

          this.container.appendChild(separatorDiv);
          this.separators.push(separatorDiv);
        }

        // RTL should start right-aligned, thus @ max scroll.
        if(rtl) {
          this.container.scrollLeft = this.container.scrollWidth;
        }
      }
    }

    private updateOptions(suggestions: Suggestion[]) {
      const fontStyle = getComputedStyle(this.options[0].div);
      const emSizeStr = getComputedStyle(document.body).fontSize;
      const emSize = getFontSizeStyle(emSizeStr).val;

      const textStyle = getComputedStyle(this.options[0].container.firstChild as HTMLSpanElement);

      let activeKeyboard = com.keyman.singleton.core.activeKeyboard;
      let rtl = activeKeyboard && activeKeyboard.isRTL;

      // TODO:  polish up; do a calculation that leaves perfect, clean edges when displaying exactly three options.
      const targetWidth = this.width / 3; // Not fancy; it'll leave rough edges. But... it'll do for a demo.
      const textLeftPad = new ParsedLengthStyle(textStyle.paddingLeft || '2px');   // computedStyle will fail if the element's not in the DOM yet.
      const textRightPad = new ParsedLengthStyle(textStyle.paddingRight || '2px');

      let optionFormat: OptionFormatSpec = {
        paddingWidth: textLeftPad.val + textRightPad.val, // Assumes fixed px padding.
        emSize: emSize,
        styleForFont: fontStyle,
        collapsedWidth: targetWidth,
        minWidth: 0,
        rtl: rtl
      }

      let totalWidth = 0;
      let displayCount = 0;

      for (let i=0; i<SuggestionBanner.SUGGESTION_LIMIT; i++) {
        const d = this.options[i];

        if(suggestions.length > i) {
          const suggestion = suggestions[i];
          d.update(suggestion, optionFormat);

          totalWidth += d.collapsedWidth;
          displayCount++;
        } else {
          d.update(null, optionFormat);
        }
      }

      // Ensure one suggestion is always displayed, even if empty.  (Keep the separators out)
      displayCount = displayCount || 1;

      if(totalWidth < this.width) {
        let separatorWidth = (this.width * 0.01 * (displayCount-1));
        let fillPadding = (this.width - totalWidth - separatorWidth) / displayCount;

        for(let i=0; i < displayCount; i++) {
          const d = this.options[i];

          d.minWidth = d.collapsedWidth + fillPadding;
          d.updateLayout();
        }
      }

      // Hide any separators beyond the final displayed suggestion
      for(let i=0; i < SuggestionBanner.SUGGESTION_LIMIT - 1; i++) {
        this.separators[i].style.display = i < displayCount - 1 ? '' : 'none';
      }
    }

    private setupInputHandling() {
      let inputEngine: InputEventEngine;
      if(this.hostDevice.touchable) { //  /*&& ('ontouchstart' in window)*/ // Except Chrome emulation doesn't set this.
        // Not to mention, it's rather redundant.
        inputEngine = TouchEventEngine.forPredictiveBanner(this, this.manager);
      } else {
        inputEngine = MouseEventEngine.forPredictiveBanner(this, this.manager);
      }

      inputEngine.registerEventHandlers();
    }

    activate() {
      let keyman = com.keyman.singleton;
      let manager = this.manager;

      keyman.core.languageProcessor.addListener('invalidatesuggestions', manager.invalidateSuggestions);
      keyman.core.languageProcessor.addListener('suggestionsready', manager.updateSuggestions);
      keyman.core.languageProcessor.addListener('tryaccept', manager.tryAccept);
      keyman.core.languageProcessor.addListener('tryrevert', manager.tryRevert);
      keyman.core.languageProcessor.addListener('suggestionapplied', this.suggestionApplied);
    }

    /**
     * Handler for post-processing once a suggestion has been applied: calls
     * into the active keyboard's `begin postKeystroke` entry point.
     * @param    outputTarget
     * @returns  true
     */
    suggestionApplied: (outputTarget: text.OutputTarget) => boolean = function(this: SuggestionBanner, outputTarget: text.OutputTarget) {
      const keyman = com.keyman.singleton;
      // Tell the keyboard that the current layer has not changed
      keyman.core.keyboardProcessor.newLayerStore.set('');
      keyman.core.keyboardProcessor.oldLayerStore.set('');
      // Call the keyboard's entry point.
      keyman.core.keyboardProcessor.processPostKeystroke(this.hostDevice, outputTarget)
        // If we have a RuleBehavior as a result, run it on the target. This should
        // only change system store and variable store values.
        ?.finalize(keyman.core.keyboardProcessor, outputTarget, true);

      return true;
    }.bind(this);

    postConfigure() {
      let keyman = com.keyman.singleton;
      // Trigger a null-based initial prediction to kick things off.
      keyman.core.languageProcessor.predictFromTarget(dom.Utils.getOutputTarget(), keyman.core.keyboardProcessor.layerId);
    }

    deactivate() {
      let keyman = com.keyman.singleton;
      let manager = this.manager;

      keyman.core.languageProcessor.removeListener('invalidatesuggestions', manager.invalidateSuggestions);
      keyman.core.languageProcessor.removeListener('suggestionsready', manager.updateSuggestions);
      keyman.core.languageProcessor.removeListener('tryaccept', manager.tryAccept);
      keyman.core.languageProcessor.removeListener('tryrevert', manager.tryRevert);
      keyman.core.languageProcessor.removeListener('suggestionapplied', this.suggestionApplied);
    }
  }

  class SuggestionExpandContractAnimation {
    private scrollContainer: HTMLElement | null;
    private option: BannerSuggestion;

    private collapsedScrollOffset: number;
    private rootScrollOffset: number;

    private startTimestamp: number;
    private pendingAnimation: number;

    private static TRANSITION_TIME = 250; // in ms.

    constructor(scrollContainer: HTMLElement, option: BannerSuggestion, forRTL: boolean) {
      this.scrollContainer = scrollContainer;
      this.option = option;
      this.collapsedScrollOffset = scrollContainer.scrollLeft;
      this.rootScrollOffset  = scrollContainer.scrollLeft;
    }

    public setBaseScroll(val: number) {
      this.collapsedScrollOffset = val;

      // If the user has shifted the scroll position to make more of the element visible, we can remove part
      // of the corresponding scrolling offset permanently; the user's taken action to view that area.
      if(this.option.rtl) {
        // A higher scrollLeft (scrolling right) will reveal more of an initially-clipped suggestion.
        if(val > this.rootScrollOffset) {
          this.rootScrollOffset = val;
        }
      } else {
        // Here, a lower scrollLeft (scrolling left).
        if(val < this.rootScrollOffset) {
          this.rootScrollOffset = val;
        }
      } // TODO:  else for the RTL adjustment instead.

      // Attempt to sync the banner-scroller's offset update with that of the
      // animation for expansion and collapsing.
      window.requestAnimationFrame(this.setOffsetScroll);

      // this.setOffsetScroll();
    }

    // the "fun", top-level banner part.
    private setOffsetScroll = () => {
      // If we've been 'decoupled', a different instance (likely for a different suggestion)
      // is responsible for counter-scrolling.
      if(!this.scrollContainer) {
        return;
      }

      // -- Clamping logic --

      // As currently written / defined below, "clamping" refers to alterations to scroll-positioned mapping designed
      // to keep as much of the expanded option visible as possible via the offsets below while not pushing
      // already-obscured parts of the expanded option into visible range.
      //
      // In essence, it's an extra offset we apply that is dynamically adjusted depending on scroll position as it changes.
      // This offset may be decreased when it is no longer needed to make parts of the element visible.

      // The amount of extra space being taken by a partially or completely expanded suggestion.
      const maxWidthToCounterscroll = this.option.currentWidth - this.option.collapsedWidth;
      const rtl = this.option.rtl;

      // If non-zero, indicates the pixel-width of the collapsed form of the suggestion clipped by the relevant screen border.
      const ltrOverflow = Math.max(this.rootScrollOffset - this.option.div.offsetLeft, 0);
      const rtlOverflow = Math.max(this.option.div.offsetLeft + this.option.collapsedWidth - (this.rootScrollOffset + this.scrollContainer.offsetWidth));

      const srcCounterscrollOverflow = Math.max(rtl ? rtlOverflow : ltrOverflow, 0);  // positive offset into overflow-land.

      // Base position for scrollLeft clamped within std element scroll bounds, including:
      // - an adjustment to cover the extra width from expansion
      // - preserving the base expected overflow levels
      const unclampedExpandingScrollOffset = Math.max(this.collapsedScrollOffset + (rtl ? 0 : 1) * maxWidthToCounterscroll, 0) + (rtl ? 0 : -1) * srcCounterscrollOverflow;
      const srcUnclampedExpandingScrollOffset = Math.max(this.rootScrollOffset + (rtl ? 0 : 1) * maxWidthToCounterscroll, 0) + (rtl ? 0 : -1) * srcCounterscrollOverflow;

      // Do not shift an element clipped by the screen border further than its original scroll starting point.
      const elementOffsetForClamping = rtl
        ? Math.max(unclampedExpandingScrollOffset, srcUnclampedExpandingScrollOffset)
        : Math.min(unclampedExpandingScrollOffset, srcUnclampedExpandingScrollOffset);

      // Based on the scroll point selected, determine how far to offset scrolls to keep the option in visible range.
      // Higher .scrollLeft values make this non-zero and reflect when scroll has begun clipping the element.
      const elementOffsetFromBorder = rtl
        // RTL offset:                   "offsetRight"                                       based on "scrollRight"
        ? Math.max(this.option.div.offsetLeft + this.option.currentWidth - (elementOffsetForClamping + this.scrollContainer.offsetWidth), 0) // double-check this one.
        // LTR:       based on scrollLeft            offsetLeft
        : Math.max(elementOffsetForClamping - this.option.div.offsetLeft, 0);

      const clampedExpandingScrollOffset = Math.min(maxWidthToCounterscroll, elementOffsetFromBorder);

      const clampedScrollLeft = unclampedExpandingScrollOffset  // base scroll-coordinate transform mapping based on extra width from element expansion
                                + (rtl ? 1 : -1) * clampedExpandingScrollOffset  // offset to scroll to put word-start border against the corresponding screen border, fully visible
                                + (rtl ? 0 :  1) * srcCounterscrollOverflow;     // offset to maintain original overflow past that border if it existed

      // -- Final step: Apply & fine-tune the final scroll positioning --
      this.scrollContainer.scrollLeft = clampedScrollLeft;

      // Prevent "jitters" during counterscroll that occur on expansion / collapse animation.
      // A one-frame "error correction" effect at the end of animation is far less jarring.
      if(this.pendingAnimation) {
        // scrollLeft doesn't work well with fractional values, unlike marginLeft / marginRight
        const fractionalOffset = this.scrollContainer.scrollLeft - clampedScrollLeft;
        // So we put the fractional difference into marginLeft to force it to sync.
        this.option.currentWidth += fractionalOffset;
      }
    }

    public decouple() {
      this.scrollContainer = null;
    }

    private clear() {
      this.startTimestamp = null;
      window.cancelAnimationFrame(this.pendingAnimation);
      this.pendingAnimation = null;
    }

    public expand() {
      // Cancel any prior iterating animation-frame commands.
      this.clear();

      // set timestamp, adjusting the current time based on intermediate progress
      this.startTimestamp = performance.now();

      let progress = this.option.currentWidth - this.option.collapsedWidth;
      let expansionDiff = this.option.expandedWidth - this.option.collapsedWidth;

      if(progress != 0) {
        // Offset the timestamp by noting what start time would have given rise to
        // the current position, keeping related animations smooth.
        this.startTimestamp -= (progress / expansionDiff) * SuggestionExpandContractAnimation.TRANSITION_TIME;
      }

      this.pendingAnimation = window.requestAnimationFrame(this._expand);
    }

    private _expand = (timestamp: number) => {
      if(this.startTimestamp === undefined) {
        return; // No active expand op exists.  May have been cancelled via `clear`.
      }

      let progressTime = timestamp - this.startTimestamp;
      let fin = progressTime > SuggestionExpandContractAnimation.TRANSITION_TIME;

      if(fin) {
        progressTime = SuggestionExpandContractAnimation.TRANSITION_TIME;
      }

      // -- Part 1:  handle option expand / collapse state --
      let expansionDiff = this.option.expandedWidth - this.option.collapsedWidth;
      let expansionRatio = progressTime / SuggestionExpandContractAnimation.TRANSITION_TIME;

      // expansionDiff * expansionRatio:  the total adjustment from 'collapsed' width, in px.
      const expansionPx = expansionDiff * expansionRatio;
      this.option.currentWidth = expansionPx + this.option.collapsedWidth;

      // Part 2:  trigger the next animation frame.
      if(!fin) {
        this.pendingAnimation = window.requestAnimationFrame(this._expand);
      } else {
        this.clear();
      }

      // Part 3:  perform any needed counter-scrolling, scroll clamping, etc
      // Existence of a followup animation frame is part of the logic, so keep this 'after'!
      this.setOffsetScroll();
    };

    public collapse() {
      // Cancel any prior iterating animation-frame commands.
      this.clear();

      // set timestamp, adjusting the current time based on intermediate progress
      this.startTimestamp = performance.now();

      let progress = this.option.expandedWidth - this.option.currentWidth;
      let expansionDiff = this.option.expandedWidth - this.option.collapsedWidth;

      if(progress != 0) {
        // Offset the timestamp by noting what start time would have given rise to
        // the current position, keeping related animations smooth.
        this.startTimestamp -= (progress / expansionDiff) * SuggestionExpandContractAnimation.TRANSITION_TIME;
      }

      this.pendingAnimation = window.requestAnimationFrame(this._collapse);
    }

    private _collapse = (timestamp: number) => {
      if(this.startTimestamp === undefined) {
        return; // No active collapse op exists.  May have been cancelled via `clear`.
      }

      let progressTime = timestamp - this.startTimestamp;
      let fin = progressTime > SuggestionExpandContractAnimation.TRANSITION_TIME;
      if(fin) {
        progressTime = SuggestionExpandContractAnimation.TRANSITION_TIME;
      }

      // -- Part 1:  handle option expand / collapse state --
      let expansionDiff = this.option.expandedWidth - this.option.collapsedWidth;
      let expansionRatio = 1 - progressTime / SuggestionExpandContractAnimation.TRANSITION_TIME;

      // expansionDiff * expansionRatio:  the total adjustment from 'collapsed' width, in px.
      const expansionPx = expansionDiff * expansionRatio;
      this.option.currentWidth = expansionPx + this.option.collapsedWidth;

      // Part 2:  trigger the next animation frame.
      if(!fin) {
        this.pendingAnimation = window.requestAnimationFrame(this._collapse);
      } else {
        this.clear();
      }

      // Part 3:  perform any needed counter-scrolling, scroll clamping, etc
      // Existence of a followup animation frame is part of the logic, so keep this 'after'!
      this.setOffsetScroll();
    };
  }

  export class SuggestionManager extends UITouchHandlerBase<HTMLDivElement> {
    private selected: BannerSuggestion;

    platformHold: (suggestion: BannerSuggestion, isCustom: boolean) => void;

    //#region Touch handling implementation
    findTargetFrom(e: HTMLElement): HTMLDivElement {
      let keyman = com.keyman.singleton;
      let util = keyman.util;

      try {
        if(e) {
          if(util.hasClass(e,'kmw-suggest-option')) {
            return e as HTMLDivElement;
          }

          if(!e.parentNode) {
            return null;
          }

          if(util.hasClass(<HTMLElement> e.parentNode, 'kmw-suggest-option')) {
            return e.parentNode as HTMLDivElement;
          }

          if(!e.parentNode.parentNode) {
            return null;
          }

          if(util.hasClass(<HTMLElement> e.parentNode.parentNode, 'kmw-suggest-option')) {
            return e.parentNode.parentNode as HTMLDivElement;
          }
          // if(e.firstChild && util.hasClass(<HTMLElement> e.firstChild,'kmw-suggest-option')) {
          //   return e.firstChild as HTMLDivElement;
          // }
        }
      } catch(ex) {}
      return null;
    }

    protected onScrollLeftUpdate(val: number): void {
      if(this.highlightAnimation) {
        this.highlightAnimation.setBaseScroll(val);
      } else {
        super.onScrollLeftUpdate(val);
      }
    }

    protected highlight(t: HTMLDivElement, on: boolean): void {
      let classes = t.className;
      let cs = ' ' + SuggestionBanner.TOUCHED_CLASS;
      let suggestion: BannerSuggestion;

      if(t.id.indexOf(BannerSuggestion.BASE_ID) == -1) {
        console.warn("Cannot find BannerSuggestion object for element to highlight!");
      } else {
        // Never highlight an empty suggestion button.
        this.selected = t['suggestion'] as BannerSuggestion;
        suggestion = this.selected;

        if(suggestion.isEmpty()) {
          on = false;
          this.selected = null;
        }
      }

      if(on && classes.indexOf(cs) < 0) {
        t.className=classes+cs;
        if(this.highlightAnimation) {
          this.highlightAnimation.decouple();
        }

        this.highlightAnimation = new SuggestionExpandContractAnimation(this.topScroller, suggestion, false);
        this.highlightAnimation.expand();
      } else {
        t.className=classes.replace(cs,'');
        if(!this.highlightAnimation) {
          this.highlightAnimation = new SuggestionExpandContractAnimation(this.topScroller, suggestion, false);
        }
        this.highlightAnimation.collapse();
      }
    }

    protected select(t: HTMLDivElement): void {
      this.doAccept(t['suggestion'] as BannerSuggestion);
    }

    //#region Long-press support
    protected hold(t: HTMLDivElement): void {
      let suggestionObj = t['suggestion'] as BannerSuggestion;

      // Is this the <keep> suggestion?  It's never in this.currentSuggestions, so check against that.
      let isCustom = this.currentSuggestions.indexOf(suggestionObj.suggestion) == -1;

      if(this.platformHold) {
        // Implemented separately for native + embedded mode branches.
        // Embedded mode should pass any info needed to show a submenu IMMEDIATELY.
        this.platformHold(suggestionObj, isCustom); // No implementation yet for native.
        return;
      }
    }
    protected clearHolds(): void {
      // Temp, pending implementation of suggestion longpress submenus
      // - nothing to clear without them -

      // only really used in native-KMW
    }

    protected hasModalPopup(): boolean {
      // Utilized by the mobile apps; allows them to 'take over' touch handling,
      // blocking it within KMW when the apps are already managing an ongoing touch-hold.
      let keyman = com.keyman.singleton;
      return keyman['osk'].vkbd.subkeyGesture && keyman.isEmbedded;
    }

    protected dealiasSubTarget(target: HTMLDivElement): HTMLDivElement {
      return target;
    }

    protected hasSubmenu(t: HTMLDivElement): boolean {
      // Temp, pending implementation of suggestion longpress submenus

      // Only really used by native-KMW - see kmwnative's highlightSubKeys func.
      return false;
    }

    protected isSubmenuActive(): boolean {
      // Temp, pending implementation of suggestion longpress submenus

      // Utilized only by native-KMW - it parallels hasModalPopup() in purpose.
      return false;
    }

    protected displaySubmenuFor(target: HTMLDivElement) {
      // Utilized only by native-KMW to show submenus.
      throw new Error("Method not implemented.");
    }
    //#endregion
    //#endregion

    private optionUpdater: (suggestions: Suggestion[]) => void;

    private initNewContext: boolean = true;

    private currentSuggestions: Suggestion[] = [];
    private keepSuggestion: Keep;
    private revertSuggestion: Reversion;

    private recentAccept: boolean = false;
    private revertAcceptancePromise: Promise<Reversion>;

    private swallowPrediction: boolean = false;

    private doRevert: boolean = false;
    private recentRevert: boolean = false;

    private readonly topScroller: HTMLElement;
    private highlightAnimation: SuggestionExpandContractAnimation;

    constructor(div: HTMLElement, scroller: HTMLElement, optionUpdater: typeof SuggestionManager.prototype.optionUpdater) {
      // TODO:  Determine appropriate CSS styling names, etc.
      super(div, scroller, Banner.BANNER_CLASS, SuggestionBanner.TOUCHED_CLASS);
      this.optionUpdater = optionUpdater;
      this.topScroller = scroller;
    }

    private doAccept(suggestion: BannerSuggestion) {
      let _this = this;

      // Selecting a suggestion or a reversion should both clear selection
      // and clear the reversion-displaying state of the banner.
      this.selected = null;
      this.doRevert = false;

      this.revertAcceptancePromise = suggestion.apply();
      if(!this.revertAcceptancePromise) {
        // We get here either if suggestion acceptance fails or if it was a reversion.
        if(suggestion.suggestion && suggestion.suggestion.tag == 'revert') {
          // Reversion state management
          this.recentAccept = false;
          this.recentRevert = true;

          this.doUpdate();
        }
        return;
      }

      this.revertAcceptancePromise.then(function(suggestion) {
        // Always null-check!
        if(suggestion) {
          _this.revertSuggestion = suggestion;
        }
      });

      this.recentAccept = true;
      this.recentRevert = false;

      this.swallowPrediction = true;
      this.doUpdate();
    }

    private showRevert() {
      // Construct a 'revert suggestion' to facilitate a reversion UI component.
      this.doRevert = true;
      this.doUpdate();
    }

    /**
     * Receives messages from the keyboard that the 'accept' keystroke has been entered.
     * Should return 'false' if the current state allows accepting a suggestion and act accordingly.
     * Otherwise, return true.
     */
    tryAccept: (source: string) => boolean = function(this: SuggestionManager, source: string, returnObj: {shouldSwallow: boolean}) {
      let keyman = com.keyman.singleton;

      if(!this.recentAccept && this.selected) {
        this.doAccept(this.selected);
        returnObj.shouldSwallow = true;
      } else if(this.recentAccept && source == 'space') {
        this.recentAccept = false;
        // If the model doesn't insert wordbreaks, don't swallow the space.  If it does,
        // we consider that insertion to be the results of the first post-accept space.
        returnObj.shouldSwallow = !!keyman.core.languageProcessor.wordbreaksAfterSuggestions;
      } else {
        returnObj.shouldSwallow = false;
      }
    }.bind(this);

    /**
     * Receives messages from the keyboard that the 'revert' keystroke has been entered.
     * Should return 'false' if the current state allows reverting a recently-applied suggestion and act accordingly.
     * Otherwise, return true.
     */
    tryRevert: () => boolean = function(this: SuggestionManager, returnObj: {shouldSwallow: boolean}) {
      // Has the revert keystroke (BKSP) already been sent once since the last accept?
      if(this.doRevert) {
        // If so, clear the 'revert' option and start doing normal predictions again.
        this.doRevert = false;
        this.recentAccept = false;
        // Otherwise, did we just accept something before the revert signal was received?
      } else if(this.recentAccept) {
        this.showRevert();
        this.swallowPrediction = true;
      }

      // We don't yet actually do key-based reversions.
      returnObj.shouldSwallow = false;
      return;
    }.bind(this);

    /**
     * Function invalidateSuggestions
     * Scope        Public
     * Description  Clears the suggestions in the suggestion banner
     */
    public invalidateSuggestions: (this: SuggestionManager, source: text.prediction.InvalidateSourceEnum) => boolean =
        function(this: SuggestionManager, source: string) {

      // By default, we assume that the context is the same until we notice otherwise.
      this.initNewContext = false;

      if(!this.swallowPrediction || source == 'context') {
        this.recentAccept = false;
        this.doRevert = false;
        this.recentRevert = false;

        if(source == 'context') {
          this.swallowPrediction = false;
          this.initNewContext = true;
        }
      }

      this.optionUpdater([]);
    }.bind(this);

    public activateKeep(): boolean {
      return !this.recentAccept && !this.recentRevert && !this.initNewContext;
    }

    private doUpdate() {
      let suggestions = [];
      // Insert 'current text' if/when valid as the leading option.
      // Since we don't yet do auto-corrections, we only show 'keep' whenever it's
      // a valid word (according to the model).
      if(this.activateKeep() && this.keepSuggestion && this.keepSuggestion.matchesModel) {
        suggestions.push(this.keepSuggestion);
      } else if(this.doRevert) {
        suggestions.push(this.revertSuggestion);
      }

      suggestions = suggestions.concat(this.currentSuggestions);

      this.optionUpdater(suggestions);
    }

    /**
     * Function updateSuggestions
     * Scope       Public
     * @param {Suggestion[]}  suggestions   Array of suggestions from the lexical model.
     * Description    Update the displayed suggestions in the SuggestionBanner
     */
    public updateSuggestions: (this: SuggestionManager, prediction: text.prediction.ReadySuggestions) => boolean =
        function(this: SuggestionManager, prediction: text.prediction.ReadySuggestions) {

      let suggestions = prediction.suggestions;

      this.currentSuggestions = suggestions;

      // Do we have a keep suggestion?  If so, remove it from the list so that we can control its display position
      // and prevent it from being hidden after reversion operations.
      this.keepSuggestion = null;
      for(let s of suggestions) {
        if(s.tag == 'keep') {
          this.keepSuggestion = s as Keep;
        }
      }

      if(this.keepSuggestion) {
        this.currentSuggestions.splice(this.currentSuggestions.indexOf(this.keepSuggestion), 1);
      }

      // If we've gotten an update request like this, it's almost always user-triggered and means the context has shifted.
      if(!this.swallowPrediction) {
        this.recentAccept = false;
        this.doRevert = false;
        this.recentRevert = false;
      } else { // This prediction was triggered by a recent 'accept.'  Now that it's fulfilled, we clear the flag.
        this.swallowPrediction = false;
      }

      // The rest is the same, whether from input or from "self-updating" after a reversion to provide new suggestions.
      this.doUpdate();
    }.bind(this);
  }
}
