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
      it('links each side to the following marker', function() {
        expect(conflict.ours.followingMarker).toBe(conflict.navigator.separatorMarker);
        return expect(conflict.theirs.followingMarker).toBe(conflict.theirs.refBannerMarker);
      });
      return it('does not have base side', function() {
        return expect(conflict.base).toBeNull();
      });
    });
    describe('a single three-way diff', function() {
      var conflict;
      conflict = [][0];
      beforeEach(function() {
        return util.openPath('single-3way-diff.txt', function(editorView) {
          return conflict = Conflict.all({
            isRebase: false
          }, editorView.getModel())[0];
        });
      });
      it('identifies the correct rows', function() {
        expect(util.rowRangeFrom(conflict.ours.marker)).toEqual([1, 2]);
        expect(conflict.ours.ref).toBe('HEAD');
        expect(util.rowRangeFrom(conflict.base.marker)).toEqual([3, 4]);
        expect(conflict.base.ref).toBe('merged common ancestors');
        expect(util.rowRangeFrom(conflict.theirs.marker)).toEqual([5, 6]);
        return expect(conflict.theirs.ref).toBe('master');
      });
      it('finds the ref banners', function() {
        expect(util.rowRangeFrom(conflict.ours.refBannerMarker)).toEqual([0, 1]);
        expect(util.rowRangeFrom(conflict.base.refBannerMarker)).toEqual([2, 3]);
        return expect(util.rowRangeFrom(conflict.theirs.refBannerMarker)).toEqual([6, 7]);
      });
      it('finds the separator', function() {
        return expect(util.rowRangeFrom(conflict.navigator.separatorMarker)).toEqual([4, 5]);
      });
      it('marks "ours" as the top and "theirs" as the bottom', function() {
        expect(conflict.ours.position).toBe('top');
        expect(conflict.base.position).toBe('base');
        return expect(conflict.theirs.position).toBe('bottom');
      });
      return it('links each side to the following marker', function() {
        expect(conflict.ours.followingMarker).toBe(conflict.base.refBannerMarker);
        expect(conflict.base.followingMarker).toBe(conflict.navigator.separatorMarker);
        return expect(conflict.theirs.followingMarker).toBe(conflict.theirs.refBannerMarker);
      });
    });
    it("identifies the correct rows for complex three-way diff", function() {
      return util.openPath('single-3way-diff-complex.txt', function(editorView) {
        var conflict;
        conflict = Conflict.all({
          isRebase: false
        }, editorView.getModel())[0];
        expect(util.rowRangeFrom(conflict.ours.marker)).toEqual([1, 2]);
        expect(conflict.ours.ref).toBe('HEAD');
        expect(util.rowRangeFrom(conflict.base.marker)).toEqual([3, 18]);
        expect(conflict.base.ref).toBe('merged common ancestors');
        expect(util.rowRangeFrom(conflict.theirs.marker)).toEqual([19, 20]);
        return expect(conflict.theirs.ref).toBe('master');
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
    describe('with corrupted diffs', function() {
      it('handles corrupted diff output', function() {
        return util.openPath('corrupted-2way-diff.txt', function(editorView) {
          var cs;
          cs = Conflict.all({}, editorView.getModel());
          return expect(cs.length).toBe(0);
        });
      });
      return it('handles corrupted diff3 output', function() {
        return util.openPath('corrupted-3way-diff.txt', function(editorView) {
          var cs;
          cs = Conflict.all({}, editorView.getModel());
          expect(cs.length).toBe(1);
          expect(util.rowRangeFrom(cs[0].ours.marker)).toEqual([13, 14]);
          expect(util.rowRangeFrom(cs[0].base.marker)).toEqual([15, 16]);
          return expect(util.rowRangeFrom(cs[0].theirs.marker)).toEqual([17, 18]);
        });
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
