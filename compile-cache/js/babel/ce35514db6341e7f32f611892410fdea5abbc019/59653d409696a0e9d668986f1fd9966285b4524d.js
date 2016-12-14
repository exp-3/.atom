Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.provideService = provideService;
exports.provideServiceV2 = provideServiceV2;
exports.provideServiceV3 = provideServiceV3;

var _autohideTreeViewJs = require('./autohide-tree-view.js');

// provide service for other packages to control the tree view
'use babel';

function provideService() {
  return {
    showTreeView: _autohideTreeViewJs.showTreeView,
    hideTreeView: _autohideTreeViewJs.hideTreeView,
    enableAutohide: _autohideTreeViewJs.enableAutohide,
    disableAutohide: _autohideTreeViewJs.disableAutohide
  };
}

function provideServiceV2() {
  return {
    showTreeView: _autohideTreeViewJs.showTreeView,
    hideTreeView: _autohideTreeViewJs.hideTreeView,
    isTreeViewVisible: _autohideTreeViewJs.isTreeViewVisible,
    enableAutohide: _autohideTreeViewJs.enableAutohide,
    disableAutohide: _autohideTreeViewJs.disableAutohide,
    isAutohideEnabled: _autohideTreeViewJs.isAutohideEnabled
  };
}

function provideServiceV3() {
  return {
    showTreeView: _autohideTreeViewJs.showTreeView,
    hideTreeView: _autohideTreeViewJs.hideTreeView,
    isTreeViewVisible: _autohideTreeViewJs.isTreeViewVisible,
    pin: _autohideTreeViewJs.enableAutohide,
    unpin: _autohideTreeViewJs.disableAutohide,
    isPinned: _autohideTreeViewJs.isAutohideEnabled
  };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3Rha2Fha2kvLmF0b20vcGFja2FnZXMvYXV0b2hpZGUtdHJlZS12aWV3L2xpYi9zZXJ2aWNlLXByb3ZpZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7a0NBRTJELHlCQUF5Qjs7O0FBRnBGLFdBQVcsQ0FBQzs7QUFLTCxTQUFTLGNBQWMsR0FBRztBQUMvQixTQUFPO0FBQ0wsZ0JBQVksa0NBQUE7QUFDWixnQkFBWSxrQ0FBQTtBQUNaLGtCQUFjLG9DQUFBO0FBQ2QsbUJBQWUscUNBQUE7R0FDaEIsQ0FBQztDQUNIOztBQUVNLFNBQVMsZ0JBQWdCLEdBQUc7QUFDakMsU0FBTztBQUNMLGdCQUFZLGtDQUFBO0FBQ1osZ0JBQVksa0NBQUE7QUFDWixxQkFBaUIsdUNBQUE7QUFDakIsa0JBQWMsb0NBQUE7QUFDZCxtQkFBZSxxQ0FBQTtBQUNmLHFCQUFpQix1Q0FBQTtHQUNsQixDQUFDO0NBQ0g7O0FBRU0sU0FBUyxnQkFBZ0IsR0FBRztBQUNqQyxTQUFPO0FBQ0wsZ0JBQVksa0NBQUE7QUFDWixnQkFBWSxrQ0FBQTtBQUNaLHFCQUFpQix1Q0FBQTtBQUNqQixPQUFHLG9DQUFnQjtBQUNuQixTQUFLLHFDQUFpQjtBQUN0QixZQUFRLHVDQUFtQjtHQUM1QixDQUFDO0NBQ0giLCJmaWxlIjoiL2hvbWUvdGFrYWFraS8uYXRvbS9wYWNrYWdlcy9hdXRvaGlkZS10cmVlLXZpZXcvbGliL3NlcnZpY2UtcHJvdmlkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJztcbmltcG9ydCB7c2hvd1RyZWVWaWV3LCBoaWRlVHJlZVZpZXcsIGlzVHJlZVZpZXdWaXNpYmxlLFxuICBlbmFibGVBdXRvaGlkZSwgZGlzYWJsZUF1dG9oaWRlLCBpc0F1dG9oaWRlRW5hYmxlZH0gZnJvbSAnLi9hdXRvaGlkZS10cmVlLXZpZXcuanMnO1xuXG4vLyBwcm92aWRlIHNlcnZpY2UgZm9yIG90aGVyIHBhY2thZ2VzIHRvIGNvbnRyb2wgdGhlIHRyZWUgdmlld1xuZXhwb3J0IGZ1bmN0aW9uIHByb3ZpZGVTZXJ2aWNlKCkge1xuICByZXR1cm4ge1xuICAgIHNob3dUcmVlVmlldyxcbiAgICBoaWRlVHJlZVZpZXcsXG4gICAgZW5hYmxlQXV0b2hpZGUsXG4gICAgZGlzYWJsZUF1dG9oaWRlLFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJvdmlkZVNlcnZpY2VWMigpIHtcbiAgcmV0dXJuIHtcbiAgICBzaG93VHJlZVZpZXcsXG4gICAgaGlkZVRyZWVWaWV3LFxuICAgIGlzVHJlZVZpZXdWaXNpYmxlLFxuICAgIGVuYWJsZUF1dG9oaWRlLFxuICAgIGRpc2FibGVBdXRvaGlkZSxcbiAgICBpc0F1dG9oaWRlRW5hYmxlZCxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByb3ZpZGVTZXJ2aWNlVjMoKSB7XG4gIHJldHVybiB7XG4gICAgc2hvd1RyZWVWaWV3LFxuICAgIGhpZGVUcmVlVmlldyxcbiAgICBpc1RyZWVWaWV3VmlzaWJsZSxcbiAgICBwaW46IGVuYWJsZUF1dG9oaWRlLFxuICAgIHVucGluOiBkaXNhYmxlQXV0b2hpZGUsXG4gICAgaXNQaW5uZWQ6IGlzQXV0b2hpZGVFbmFibGVkLFxuICB9O1xufVxuIl19
//# sourceURL=/home/takaaki/.atom/packages/autohide-tree-view/lib/service-provider.js
