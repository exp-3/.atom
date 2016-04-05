(function() {
  var Conflict, GitBridge, MergeConflictsView, MergeState, path, util, _;

  path = require('path');

  _ = require('underscore-plus');

  MergeConflictsView = require('../../lib/view/merge-conflicts-view').MergeConflictsView;

  MergeState = require('../../lib/merge-state').MergeState;

  Conflict = require('../../lib/conflict').Conflict;

  GitBridge = require('../../lib/git-bridge').GitBridge;

  util = require('../util');

  describe('MergeConflictsView', function() {
    var fullPath, pkg, repoPath, state, view, _ref;
    _ref = [], view = _ref[0], state = _ref[1], pkg = _ref[2];
    fullPath = function(fname) {
      return path.join(atom.project.getPaths()[0], 'path', fname);
    };
    repoPath = function(fname) {
      return atom.project.getRepositories()[0].relativize(fullPath(fname));
    };
    beforeEach(function() {
      var conflicts, done;
      pkg = util.pkgEmitter();
      GitBridge.process = function(_arg) {
        var exit;
        exit = _arg.exit;
        exit(0);
        return {
          process: {
            on: function(err) {}
          },
          onWillThrowError: function() {}
        };
      };
      done = false;
      GitBridge.locateGitAnd(function(err) {
        return done = true;
      });
      waitsFor(function() {
        return done;
      });
      conflicts = _.map(['file1.txt', 'file2.txt'], function(fname) {
        return {
          path: repoPath(fname),
          message: 'both modified'
        };
      });
      return util.openPath('triple-2way-diff.txt', function(editorView) {
        var repo;
        repo = atom.project.getRepositories()[0];
        state = new MergeState(conflicts, repo, false);
        conflicts = Conflict.all(state, editorView.getModel());
        return view = new MergeConflictsView(state, pkg);
      });
    });
    afterEach(function() {
      return pkg.dispose();
    });
    describe('conflict resolution progress', function() {
      var progressFor;
      progressFor = function(filename) {
        return view.pathList.find("li[data-path='" + (repoPath(filename)) + "'] progress")[0];
      };
      it('starts at zero', function() {
        expect(progressFor('file1.txt').value).toBe(0);
        return expect(progressFor('file2.txt').value).toBe(0);
      });
      return it('advances when requested', function() {
        var progress1;
        pkg.didResolveConflict({
          file: fullPath('file1.txt'),
          total: 3,
          resolved: 2
        });
        progress1 = progressFor('file1.txt');
        expect(progress1.value).toBe(2);
        return expect(progress1.max).toBe(3);
      });
    });
    describe('tracking the progress of staging', function() {
      var isMarkedWith;
      isMarkedWith = function(filename, icon) {
        var rs;
        rs = view.pathList.find("li[data-path='" + (repoPath(filename)) + "'] span.icon-" + icon);
        return rs.length !== 0;
      };
      it('starts without files marked as staged', function() {
        expect(isMarkedWith('file1.txt', 'dash')).toBe(true);
        return expect(isMarkedWith('file2.txt', 'dash')).toBe(true);
      });
      return it('marks files as staged on events', function() {
        GitBridge.process = function(_arg) {
          var exit, stdout;
          stdout = _arg.stdout, exit = _arg.exit;
          stdout("UU " + (repoPath('file2.txt')));
          exit(0);
          return {
            process: {
              on: function(err) {}
            }
          };
        };
        pkg.didStageFile({
          file: fullPath('file1.txt')
        });
        expect(isMarkedWith('file1.txt', 'check')).toBe(true);
        return expect(isMarkedWith('file2.txt', 'dash')).toBe(true);
      });
    });
    return it('minimizes and restores the view on request', function() {
      expect(view.hasClass('minimized')).toBe(false);
      view.minimize();
      expect(view.hasClass('minimized')).toBe(true);
      view.restore();
      return expect(view.hasClass('minimized')).toBe(false);
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvdGFrYWFraS8uYXRvbS9wYWNrYWdlcy9tZXJnZS1jb25mbGljdHMvc3BlYy92aWV3L21lcmdlLWNvbmZsaWN0cy12aWV3LXNwZWMuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGtFQUFBOztBQUFBLEVBQUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSLENBQVAsQ0FBQTs7QUFBQSxFQUNBLENBQUEsR0FBSSxPQUFBLENBQVEsaUJBQVIsQ0FESixDQUFBOztBQUFBLEVBR0MscUJBQXNCLE9BQUEsQ0FBUSxxQ0FBUixFQUF0QixrQkFIRCxDQUFBOztBQUFBLEVBS0MsYUFBYyxPQUFBLENBQVEsdUJBQVIsRUFBZCxVQUxELENBQUE7O0FBQUEsRUFNQyxXQUFZLE9BQUEsQ0FBUSxvQkFBUixFQUFaLFFBTkQsQ0FBQTs7QUFBQSxFQU9DLFlBQWEsT0FBQSxDQUFRLHNCQUFSLEVBQWIsU0FQRCxDQUFBOztBQUFBLEVBUUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxTQUFSLENBUlAsQ0FBQTs7QUFBQSxFQVVBLFFBQUEsQ0FBUyxvQkFBVCxFQUErQixTQUFBLEdBQUE7QUFDN0IsUUFBQSwwQ0FBQTtBQUFBLElBQUEsT0FBcUIsRUFBckIsRUFBQyxjQUFELEVBQU8sZUFBUCxFQUFjLGFBQWQsQ0FBQTtBQUFBLElBRUEsUUFBQSxHQUFXLFNBQUMsS0FBRCxHQUFBO2FBQ1QsSUFBSSxDQUFDLElBQUwsQ0FBVSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQWIsQ0FBQSxDQUF3QixDQUFBLENBQUEsQ0FBbEMsRUFBc0MsTUFBdEMsRUFBOEMsS0FBOUMsRUFEUztJQUFBLENBRlgsQ0FBQTtBQUFBLElBS0EsUUFBQSxHQUFXLFNBQUMsS0FBRCxHQUFBO2FBQ1QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFiLENBQUEsQ0FBK0IsQ0FB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

//# sourceURL=/home/takaaki/.atom/packages/merge-conflicts/spec/view/merge-conflicts-view-spec.coffee
