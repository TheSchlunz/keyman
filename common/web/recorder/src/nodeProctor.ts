import Proctor, { AssertCallback } from "./proctor.js";
import {
  KeyboardTest,
  TestSet,
  TestSequence,
  RecordedKeystrokeSequence,
  RecordedPhysicalKeystroke,
  RecordedSyntheticKeystroke
} from "./index.js";

import Keyboard from "keyboard-processor/build/modules/keyboards/keyboard.js";
import type KeyEvent from "keyboard-processor/build/modules/text/keyEvent.js";
import KeyboardProcessor from "keyboard-processor/build/modules/text/keyboardProcessor.js";
import type OutputTarget from "keyboard-processor/build/modules/text/outputTarget.js";
import { Mock } from "keyboard-processor/build/modules/text/outputTarget.js";

import DeviceSpec from "utils/build/modules/deviceSpec.js";

export default class NodeProctor extends Proctor {
  private keyboard: Keyboard;
  public __debug = false;

  constructor(keyboard: Keyboard, device: DeviceSpec, assert: AssertCallback) {
    super(device, assert);

    this.keyboard = keyboard;
  }

  beforeAll() {
    //
  }

  before() {
    //
  }

  compatibleWithSuite(testSuite: KeyboardTest): boolean {
    // Original-version tests did not supply core-compatible KeyEvent data.
    return !testSuite.specVersion.equals(KeyboardTest.FALLBACK_VERSION);
  }

  get debugMode(): boolean {
    return this.__debug;
  }

  set debugMode(value: boolean) {
    this.__debug = value;
  }

  matchesTestSet(testSet: TestSet<any>) {
    // KeyboardProcessor is abstract enough to run tests aimed at any platform.
    return true;
  }

  simulateSequence(sequence: TestSequence<any>, target?: OutputTarget): string {
    // Start with an empty OutputTarget and a fresh KeyboardProcessor.
    if(!target) {
      target = new Mock();
    }

    // Establish a fresh processor, setting its keyboard appropriately for the test.
    let processor = new KeyboardProcessor(this.device);
    processor.activeKeyboard = this.keyboard;

    if(sequence instanceof RecordedKeystrokeSequence) {
      for(let keystroke of sequence.inputs) {
        let keyEvent: KeyEvent;
        if(keystroke instanceof RecordedPhysicalKeystroke) {
          // Use the keystroke's stored data to reconstruct the KeyEvent.
          keyEvent = {
            Lcode: keystroke.keyCode,
            Lmodifiers: keystroke.modifiers,
            LmodifierChange: keystroke.modifierChanged,
            vkCode: keystroke.vkCode,
            Lstates: keystroke.states,
            kName: '',
            device: this.device,
            isSynthetic: false,
            LisVirtualKey: this.keyboard.definesPositionalOrMnemonic // Only false for 1.0 keyboards.
          }
        } else if(keystroke instanceof RecordedSyntheticKeystroke) {
          let key = this.keyboard.layout(this.device.formFactor).getLayer(keystroke.layer).getKey(keystroke.keyName);
          keyEvent = key.constructKeyEvent(processor, this.device);
        }

        // Fill in the final details of the KeyEvent...
        keyEvent.device = this.device;

        // And now, execute the keystroke!
        // We don't care too much about particularities of per-keystroke behavior yet.
        // ... we _could_ if we wanted to, though.  The framework is mostly in place;
        // it's a matter of actually adding the feature.
        let ruleBehavior = processor.processKeystroke(keyEvent, target);

        if(this.debugMode) {
          console.log(JSON.stringify(target, null, '  '));
          console.log(JSON.stringify(ruleBehavior, null, '  '));
        }
      }
    } else {
      throw new Error("NodeProctor only supports RecordedKeystrokeSequences for testing at present.");
    }
    return target.getText();
  }
}