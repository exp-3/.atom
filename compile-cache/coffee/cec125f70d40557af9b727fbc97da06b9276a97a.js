(function() {
  var Conflict, util;

  Conflict = require('../lib/conflict').Conflict;

  util = require('./util');

  describe("Conflict", function() {
    describe('a single two-way diff', function() {
      var conflict;
      conflict = [][0];
      beforeEach(function() {
        return util.openPath('single-2way-diff.txt', function(editorView) {
          return conflict = Conflict.all({
            isRebase: false
          }, editorView.getModel())[0];
        });
      });
      it('identifies the correct rows', function() {
        expect(util.rowRangeFrom(conflict.ours.marker)).toEqual([1, 2]);
        expect(conflict.ours.ref).toBe('HEAD');
        expect(util.rowRangeFrom(conflict.theirs.marker)).toEqual([3, 4]);
        return expect(conflict.theirs.ref).toBe('master');
      });
      it('finds the ref banners', function() {
        expect(util.rowRangeFrom(conflict.ours.refBannerMarker)).toEqual([0, 1]);
        return expect(util.rowRangeFrom(conflict.theirs.refBannerMarker)).toEqual([4, 5]);
      });
      it('finds the separator', function() {
        return expect(util.rowRangeFrom(conflict.navigator.separatorMarker)).toEqual([2, 3]);
      });
      it('marks "ours" as the top and "theirs" as the bottom', function() {
        expect(conflict.ours.position).toBe('top');
        return expect(conflict.theirs.position).toBe('bottom');
      });
      return it('links each side to the following marker', function() {
        expect(conflict.ours.followingMarker).toBe(conflict.navigator.separatorMarker);
        return expect(conflict.theirs.followingMarker).toBe(conflict.theirs.refBannerMarker);
      });
    });
    it("finds multiple conflict markings", function() {
      return util.openPath('multi-2way-diff.txt', function(editorView) {
        var cs;
        cs = Conflict.all({}, editorView.getModel());
        expect(cs.length).toBe(2);
        expect(util.rowRangeFrom(cs[0].ours.marker)).toEqual([5, 7]);
        expect(util.rowRangeFrom(cs[0].theirs.marker)).toEqual([8, 9]);
        expect(util.rowRangeFrom(cs[1].ours.marker)).toEqual([14, 15]);
        return expect(util.rowRangeFrom(cs[1].theirs.marker)).toEqual([16, 17]);
      });
    });
    describe('when rebasing', function() {
      var conflict;
      conflict = [][0];
      beforeEach(function() {
        return util.openPath('rebase-2way-diff.txt', function(editorView) {
          return conflict = Conflict.all({
            isRebase: true
          }, editorView.getModel())[0];
        });
      });
      it('swaps the lines for "ours" and "theirs"', function() {
        expect(util.rowRangeFrom(conflict.theirs.marker)).toEqual([3, 4]);
        return expect(util.rowRangeFrom(conflict.ours.marker)).toEqual([5, 6]);
      });
      it('recognizes banner lines with commit shortlog messages', function() {
        expect(util.rowRangeFrom(conflict.theirs.refBannerMarker)).toEqual([2, 3]);
        return expect(util.rowRangeFrom(conflict.ours.refBannerMarker)).toEqual([6, 7]);
      });
      it('marks "theirs" as the top and "ours" as the bottom', function() {
        expect(conflict.theirs.position).toBe('top');
        return expect(conflict.ours.position).toBe('bottom');
      });
      return it('links each side to the following marker', function() {
        expect(conflict.theirs.followingMarker).toBe(conflict.navigator.separatorMarker);
        return expect(conflict.ours.followingMarker).toBe(conflict.ours.refBannerMarker);
      });
    });
    describe('sides', function() {
      var conflict, editor, _ref;
      _ref = [], editor = _ref[0], conflict = _ref[1];
      beforeEach(function() {
        return util.openPath('single-2way-diff.txt', function(editorView) {
          var _ref1;
          editor = editorView.getModel();
          return _ref1 = Conflict.all({}, editor), conflict = _ref1[0], _ref1;
        });
      });
      it('retains a reference to conflict', function() {
        expect(conflict.ours.conflict).toBe(conflict);
        return expect(conflict.theirs.conflict).toBe(conflict);
      });
      it('remembers its initial text', function() {
        editor.setCursorBufferPosition([1, 0]);
        editor.insertText("I prefer this text! ");
        return expect(conflict.ours.originalText).toBe("These are my changes\n");
      });
      it('resolves as "ours"', function() {
        conflict.ours.resolve();
        expect(conflict.resolution).toBe(conflict.ours);
        expect(conflict.ours.wasChosen()).toBe(true);
        return expect(conflict.theirs.wasChosen()).toBe(false);
      });
      it('resolves as "theirs"', function() {
        conflict.theirs.resolve();
        expect(conflict.resolution).toBe(conflict.theirs);
        expect(conflict.ours.wasChosen()).toBe(false);
        return expect(conflict.theirs.wasChosen()).toBe(true);
      });
      return it('broadcasts an event on resolution', function() {
        var resolved;
        resolved = false;
        conflict.onDidResolveConflict(function() {
          return resolved = true;
        });
        conflict.ours.resolve();
        return expect(resolved).toBe(true);
      });
    });
    return describe('navigator', function() {
      var conflicts, navigator, _ref;
      _ref = [], conflicts = _ref[0], navigator = _ref[1];
      beforeEach(function() {
        return util.openPath('triple-2way-diff.txt', function(editorView) {
          conflicts = Conflict.all({}, editorView.getModel());
          return navigator = conflicts[1].navigator;
        });
      });
      it('knows its conflict', function() {
        return expect(navigator.conflict).toBe(conflicts[1]);
      });
      it('links to the previous conflict', function() {
        return expect(navigator.previous).toBe(conflicts[0]);
      });
      it('links to the next conflict', function() {
        return expect(navigator.next).toBe(conflicts[2]);
      });
      it('skips resolved conflicts', function() {
        var nav;
        nav = conflicts[0].navigator;
        conflicts[1].ours.resolve();
        return expect(nav.nextUnresolved()).toBe(conflicts[2]);
      });
      return it('returns null at the end', function() {
        var nav;
        nav = conflicts[2].navigator;
        expect(nav.next).toBeNull();
        return expect(nav.nextUnresolved()).toBeNull();
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvdGFrYWFraS8uYXRvbS9wYWNrYWdlcy9tZXJnZS1jb25mbGljdHMvc3BlYy9jb25mbGljdC1zcGVjLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxjQUFBOztBQUFBLEVBQUMsV0FBWSxPQUFBLENBQVEsaUJBQVIsRUFBWixRQUFELENBQUE7O0FBQUEsRUFDQSxJQUFBLEdBQU8sT0FBQSxDQUFRLFFBQVIsQ0FEUCxDQUFBOztBQUFBLEVBR0EsUUFBQSxDQUFTLFVBQVQsRUFBcUIsU0FBQSxHQUFBO0FBRW5CLElBQUEsUUFBQSxDQUFTLHVCQUFULEVBQWtDLFNBQUEsR0FBQTtBQUNoQyxVQUFBLFFBQUE7QUFBQSxNQUFDLFdBQVksS0FBYixDQUFBO0FBQUEsTUFFQSxVQUFBLENBQVcsU0FBQSxHQUFBO2VBQ1QsSUFBSSxDQUFDLFFBQUwsQ0FBYyxzQkFBZCxFQUFzQyxTQUFDLFVBQUQsR0FBQTtpQkFDcEMsUUFBQSxHQUFXLFFBQVEsQ0FBQyxHQUFULENBQWE7QUFBQSxZQUFFLFFBQUEsRUFBVSxLQUFaO1dBQWIsRUFBa0MsVUFBVSxDQUFDLFFBQVgsQ0FBQSxDQUFsQyxDQUF5RCxDQUFBLENBQUEsRUFEaEM7UUFBQSxDQUF0QyxFQURTO01BQUEsQ0FBWCxDQUZBLENBQUE7QUFBQSxNQU1BLEVBQUEsQ0FBRyw2QkFBSCxFQUFrQyxTQUFBLEdBQUE7QUFDaEMsUUFBQSxNQUFBLENBQU8sSUFBSSxDQUFDLFlBQUwsQ0FBa0IsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFoQyxDQUFQLENBQThDLENBQUMsT0FBL0MsQ0FBdUQsQ0FBQyxDQUFELEVBQUksQ0FBSixDQUF2RCxDQUFBLENBQUE7QUFBQSxRQUNBLE1BQUEsQ0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQXJCLENBQXlCLENBQUMsSUFBMUIsQ0FBK0Is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

//# sourceURL=/home/takaaki/.atom/packages/merge-conflicts/spec/conflict-spec.coffee
