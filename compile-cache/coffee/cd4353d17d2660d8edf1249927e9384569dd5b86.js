(function() {
  var OutputViewManager, git, notifier;

  git = require('../git');

  notifier = require('../notifier');

  OutputViewManager = require('../output-view-manager');

  module.exports = function(repo) {
    var cwd;
    cwd = repo.getWorkingDirectory();
    return git.cmd(['stash', 'save'], {
      cwd: cwd
    }).then(function(msg) {
      if (msg !== '') {
        return OutputViewManager["new"]().addLine(msg).finish();
      }
    })["catch"](function(msg) {
      return notifier.addInfo(msg);
    });
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvdGFrYWFraS8uYXRvbS9wYWNrYWdlcy9naXQtcGx1cy9saWIvbW9kZWxzL2dpdC1zdGFzaC1zYXZlLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxnQ0FBQTs7QUFBQSxFQUFBLEdBQUEsR0FBTSxPQUFBLENBQVEsUUFBUixDQUFOLENBQUE7O0FBQUEsRUFDQSxRQUFBLEdBQVcsT0FBQSxDQUFRLGFBQVIsQ0FEWCxDQUFBOztBQUFBLEVBRUEsaUJBQUEsR0FBb0IsT0FBQSxDQUFRLHdCQUFSLENBRnBCLENBQUE7O0FBQUEsRUFJQSxNQUFNLENBQUMsT0FBUCxHQUFpQixTQUFDLElBQUQsR0FBQTtBQUNmLFFBQUEsR0FBQTtBQUFBLElBQUEsR0FBQSxHQUFNLElBQUksQ0FBQyxtQkFBTCxDQUFBLENBQU4sQ0FBQTtXQUNBLEdBQUcsQ0FBQyxHQUFKLENBQVEsQ0FBQyxPQUFELEVBQVUsTUFBVixDQUFSLEVBQTJCO0FBQUEsTUFBQyxLQUFBLEdBQUQ7S0FBM0IsQ0FDQSxDQUFDLElBREQsQ0FDTSxTQUFDLEdBQUQsR0FBQTtBQUNKLE1BQUEsSUFBaUQsR0FBQSxLQUFTLEVBQTFEO2VBQUEsaUJBQWlCLENBQUMsS0FBRCxDQUFqQixDQUFBLENBQXVCLENBQUMsT0FBeEIsQ0FBZ0MsR0FBaEMsQ0FBb0MsQ0FBQyxNQUFyQyxDQUFBLEVBQUE7T0FESTtJQUFBLENBRE4sQ0FHQSxDQUFDLE9BQUQsQ0FIQSxDQUdPLFNBQUMsR0FBRCxHQUFBO2FBQ0wsUUFBUSxDQUFDLE9BQVQsQ0FBaUIsR0FBakIsRUFESztJQUFBLENBSFAsRUFGZTtFQUFBLENBSmpCLENBQUE7QUFBQSIKfQ==

//# sourceURL=/home/takaaki/.atom/packages/git-plus/lib/models/git-stash-save.coffee
