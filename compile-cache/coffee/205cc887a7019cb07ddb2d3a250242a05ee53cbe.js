(function() {
  var GitDiff, git;

  git = require('../git');

  GitDiff = require('./git-diff');

  module.exports = function(repo) {
    var args;
    args = ['diff', '--stat'];
    if (atom.config.get('git-plus.includeStagedDiff')) {
      args.push('HEAD');
    }
    return git.cmd(args, {
      cwd: repo.getWorkingDirectory()
    }).then(function(data) {
      return GitDiff(repo, {
        diffStat: data,
        file: '.'
      });
    });
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvdGFrYWFraS8uYXRvbS9wYWNrYWdlcy9naXQtcGx1cy9saWIvbW9kZWxzL2dpdC1kaWZmLWFsbC5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsWUFBQTs7QUFBQSxFQUFBLEdBQUEsR0FBTSxPQUFBLENBQVEsUUFBUixDQUFOLENBQUE7O0FBQUEsRUFDQSxPQUFBLEdBQVUsT0FBQSxDQUFRLFlBQVIsQ0FEVixDQUFBOztBQUFBLEVBR0EsTUFBTSxDQUFDLE9BQVAsR0FBaUIsU0FBQyxJQUFELEdBQUE7QUFDZixRQUFBLElBQUE7QUFBQSxJQUFBLElBQUEsR0FBTyxDQUFDLE1BQUQsRUFBUyxRQUFULENBQVAsQ0FBQTtBQUNBLElBQUEsSUFBb0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLDRCQUFoQixDQUFwQjtBQUFBLE1BQUEsSUFBSSxDQUFDLElBQUwsQ0FBVSxNQUFWLENBQUEsQ0FBQTtLQURBO1dBRUEsR0FBRyxDQUFDLEdBQUosQ0FBUSxJQUFSLEVBQWM7QUFBQSxNQUFBLEdBQUEsRUFBSyxJQUFJLENBQUMsbUJBQUwsQ0FBQSxDQUFMO0tBQWQsQ0FDQSxDQUFDLElBREQsQ0FDTSxTQUFDLElBQUQsR0FBQTthQUFVLE9BQUEsQ0FBUSxJQUFSLEVBQWM7QUFBQSxRQUFBLFFBQUEsRUFBVSxJQUFWO0FBQUEsUUFBZ0IsSUFBQSxFQUFNLEdBQXRCO09BQWQsRUFBVjtJQUFBLENBRE4sRUFIZTtFQUFBLENBSGpCLENBQUE7QUFBQSIKfQ==

//# sourceURL=/home/takaaki/.atom/packages/git-plus/lib/models/git-diff-all.coffee
