var assert = chai.assert;
var LMLayer = com.keyman.text.prediction.LMLayer;
var DefaultWorker = com.keyman.text.prediction.DefaultWorker;

describe('LMLayer', function () {
  this.timeout(testconfig.timeouts.standard);

  describe('[[constructor]]', function () {
    it('should construct with a single argument', function () {
      let lmLayer = new LMLayer(helpers.defaultCapabilities, null, true);
      assert.instanceOf(lmLayer, LMLayer);
      lmLayer.shutdown();
    });
  });

  describe('#asBlobURI()', function () {
    // #asBlobURI() requires browser APIs, hence why it cannot be tested headless in Node.
    it('should take a function and convert it into a blob function', function (done) {
      let uri = DefaultWorker.asBlobURI(function dummyHandler() {
        // Post something weird, so we can be reasonably certain the Web Worker is...
        // well, working.
        // WARNING: Do NOT refactor this string as a variable. It **MUST** remain a string
        // in this function body, because the code in this function's body gets
        // stringified!
        postMessage('fhqwhgads');
      });
      assert.match(uri, /^blob:/);

      let worker = new Worker(uri);
      worker.onmessage = function thisShouldBeCalled(event) {
        assert.propertyVal(event, 'data', 'fhqwhgads');
        worker.terminate();
        done();
      };
    })
  })
});
