(function() {
  var SelectStageHunkFile, git, gitStageHunk;

  git = require('../git');

  SelectStageHunkFile = require('../views/select-stage-hunk-file-view');

  gitStageHunk = function(repo) {
    return git.unstagedFiles(repo).then(function(data) {
      return new SelectStageHunkFile(repo, data);
    });
  };

  module.exports = gitStageHunk;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvdGFrYWFraS8uYXRvbS9wYWNrYWdlcy9naXQtcGx1cy9saWIvbW9kZWxzL2dpdC1zdGFnZS1odW5rLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxzQ0FBQTs7QUFBQSxFQUFBLEdBQUEsR0FBTSxPQUFBLENBQVEsUUFBUixDQUFOLENBQUE7O0FBQUEsRUFDQSxtQkFBQSxHQUFzQixPQUFBLENBQVEsc0NBQVIsQ0FEdEIsQ0FBQTs7QUFBQSxFQUdBLFlBQUEsR0FBZSxTQUFDLElBQUQsR0FBQTtXQUNiLEdBQUcsQ0FBQyxhQUFKLENBQWtCLElBQWxCLENBQ0EsQ0FBQyxJQURELENBQ00sU0FBQyxJQUFELEdBQUE7YUFBYyxJQUFBLG1CQUFBLENBQW9CLElBQXBCLEVBQTBCLElBQTFCLEVBQWQ7SUFBQSxDQUROLEVBRGE7RUFBQSxDQUhmLENBQUE7O0FBQUEsRUFPQSxNQUFNLENBQUMsT0FBUCxHQUFpQixZQVBqQixDQUFBO0FBQUEiCn0=

//# sourceURL=/home/takaaki/.atom/packages/git-plus/lib/models/git-stage-hunk.coffee
