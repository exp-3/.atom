(function() {
  var GitOps, ResolverView, util;

  ResolverView = require('../../lib/view/resolver-view').ResolverView;

  GitOps = require('../../lib/git').GitOps;

  util = require('../util');

  describe('ResolverView', function() {
    var fakeEditor, pkg, state, view, _ref;
    _ref = [], view = _ref[0], fakeEditor = _ref[1], pkg = _ref[2];
    state = {
      context: {
        isStaged: function() {
          return Promise.resolve(false);
        },
        add: function() {}
      },
      relativize: function(filepath) {
        return filepath.slice("/fake/gitroot/".length);
      }
    };
    beforeEach(function() {
      pkg = util.pkgEmitter();
      fakeEditor = {
        isModified: function() {
          return true;
        },
        getURI: function() {
          return '/fake/gitroot/lib/file1.txt';
        },
        save: function() {},
        onDidSave: function() {}
      };
      return view = new ResolverView(fakeEditor, state, pkg);
    });
    it('begins needing both saving and staging', function() {
      waitsForPromise(function() {
        return view.refresh();
      });
      return runs(function() {
        return expect(view.actionText.text()).toBe('Save and stage');
      });
    });
    it('shows if the file only needs staged', function() {
      fakeEditor.isModified = function() {
        return false;
      };
      waitsForPromise(function() {
        return view.refresh();
      });
      return runs(function() {
        return expect(view.actionText.text()).toBe('Stage');
      });
    });
    return it('saves and stages the file', function() {
      var p;
      p = null;
      state.context.add = function(filepath) {
        p = filepath;
        return Promise.resolve();
      };
      spyOn(fakeEditor, 'save');
      waitsForPromise(function() {
        return view.resolve();
      });
      return runs(function() {
        expect(fakeEditor.save).toHaveBeenCalled();
        return expect(p).toBe('lib/file1.txt');
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvdGFrYWFraS8uYXRvbS9wYWNrYWdlcy9tZXJnZS1jb25mbGljdHMvc3BlYy92aWV3L3Jlc29sdmVyLXZpZXctc3BlYy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsMEJBQUE7O0FBQUEsRUFBQyxlQUFnQixPQUFBLENBQVEsOEJBQVIsRUFBaEIsWUFBRCxDQUFBOztBQUFBLEVBRUMsU0FBVSxPQUFBLENBQVEsZUFBUixFQUFWLE1BRkQsQ0FBQTs7QUFBQSxFQUdBLElBQUEsR0FBTyxPQUFBLENBQVEsU0FBUixDQUhQLENBQUE7O0FBQUEsRUFLQSxRQUFBLENBQVMsY0FBVCxFQUF5QixTQUFBLEdBQUE7QUFDdkIsUUFBQSxrQ0FBQTtBQUFBLElBQUEsT0FBMEIsRUFBMUIsRUFBQyxjQUFELEVBQU8sb0JBQVAsRUFBbUIsYUFBbkIsQ0FBQTtBQUFBLElBRUEsS0FBQSxHQUNFO0FBQUEsTUFBQSxPQUFBLEVBQ0U7QUFBQSxRQUFBLFFBQUEsRUFBVSxTQUFBLEdBQUE7aUJBQUcsT0FBTyxDQUFDLE9BQVIsQ0FBZ0IsS0FBaEIsRUFBSDtRQUFBLENBQVY7QUFBQSxRQUNBLEdBQUEsRUFBSyxTQUFBLEdBQUEsQ0FETDtPQURGO0FBQUEsTUFHQSxVQUFBLEVBQVksU0FBQyxRQUFELEdBQUE7ZUFBYyxRQUFTLGdDQUF2QjtNQUFBLENBSFo7S0FIRixDQUFBO0FBQUEsSUFRQSxVQUFBLENBQVcsU0FBQSxHQUFBO0FBQ1QsTUFBQSxHQUFBLEdBQU0sSUFBSSxDQUFDLFVBQUwsQ0FBQSxDQUFOLENBQUE7QUFBQSxNQUNBLFVBQUEsR0FBYTtBQUFBLFFBQ1gsVUFBQSxFQUFZLFNBQUEsR0FBQTtpQkFBRyxLQUFIO1FBQUEsQ0FERDtBQUFBLFFBRVgsTUFBQSxFQUFRLFNBQUEsR0FBQTtpQkFBRyw4QkFBSDtRQUFBLENBRkc7QUFBQSxRQUdYLElBQUEsRUFBTSxTQUFBLEdBQUEsQ0FISztBQUFBLFFBSVgsU0FBQSxFQUFXLFNBQUEsR0FBQSxDQUpBO09BRGIsQ0FBQTthQVFBLElBQUEsR0FBVyxJQUFBLFlBQUEsQ0FBYSxVQUFiLEVBQXlCLEtBQXpCLEVBQWdDLEdBQWhDLEVBVEY7SUFBQSxDQUFYLENBUkEsQ0FBQTtBQUFBLElBbUJBLEVBQUEsQ0FBRyx3Q0FBSCxFQUE2QyxTQUFBLEdBQUE7QUFDM0MsTUFBQSxlQUFBLENBQWdCLFNBQUEsR0FBQTtlQUFHLElBQUksQ0FBQyxPQUFMLENBQUEsRUFBSDtNQUFBLENBQWhCLENBQUEsQ0FBQTthQUNBLElBQUEsQ0FBSyxTQUFBLEdBQUE7ZUFBRyxNQUFBLENBQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFoQixDQUFBLENBQVAsQ0FBOEIsQ0FBQyxJQUEvQixDQUFvQyxnQkFBcEMsRUFBSDtNQUFBLENBQUwsRUFGMkM7SUFBQSxDQUE3QyxDQW5CQSxDQUFBO0FBQUEsSUF1QkEsRUFBQSxDQUFHLHFDQUFILEVBQTBDLFNBQUEsR0FBQTtBQUN4QyxNQUFBLFVBQVUsQ0FBQyxVQUFYLEdBQXdCLFNBQUEsR0FBQTtlQUFHLE1BQUg7TUFBQSxDQUF4QixDQUFBO0FBQUEsTUFDQSxlQUFBLENBQWdCLFNBQUEsR0FBQTtlQUFHLElBQUksQ0FBQyxPQUFMLENBQUEsRUFBSDtNQUFBLENBQWhCLENBREEsQ0FBQTthQUVBLElBQUEsQ0FBSyxTQUFBLEdBQUE7ZUFBRyxNQUFBLENBQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFoQixDQUFBLENBQVAsQ0FBOEIsQ0FBQyxJQUEvQixDQUFvQyxPQUFwQyxFQUFIO01BQUEsQ0FBTCxFQUh3QztJQUFBLENBQTFDLENBdkJBLENBQUE7V0E0QkEsRUFBQSxDQUFHLDJCQUFILEVBQWdDLFNBQUEsR0FBQTtBQUM5QixVQUFBLENBQUE7QUFBQSxNQUFBLENBQUEsR0FBSSxJQUFKLENBQUE7QUFBQSxNQUNBLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBZCxHQUFvQixTQUFDLFFBQUQsR0FBQTtBQUNsQixRQUFBLENBQUEsR0FBSSxRQUFKLENBQUE7ZUFDQSxPQUFPLENBQUMsT0FBUixDQUFBLEVBRmtCO01BQUEsQ0FEcEIsQ0FBQTtBQUFBLE1BS0EsS0FBQSxDQUFNLFVBQU4sRUFBa0IsTUFBbEIsQ0FMQSxDQUFBO0FBQUEsTUFPQSxlQUFBLENBQWdCLFNBQUEsR0FBQTtlQUFHLElBQUksQ0FBQyxPQUFMLENBQUEsRUFBSDtNQUFBLENBQWhCLENBUEEsQ0FBQTthQVNBLElBQUEsQ0FBSyxTQUFBLEdBQUE7QUFDSCxRQUFBLE1BQUEsQ0FBTyxVQUFVLENBQUMsSUFBbEIsQ0FBdUIsQ0FBQyxnQkFBeEIsQ0FBQSxDQUFBLENBQUE7ZUFDQSxNQUFBLENBQU8sQ0FBUCxDQUFTLENBQUMsSUFBVixDQUFlLGVBQWYsRUFGRztNQUFBLENBQUwsRUFWOEI7SUFBQSxDQUFoQyxFQTdCdUI7RUFBQSxDQUF6QixDQUxBLENBQUE7QUFBQSIKfQ==

//# sourceURL=/home/takaaki/.atom/packages/merge-conflicts/spec/view/resolver-view-spec.coffee
