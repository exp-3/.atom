(function() {
  var $, BOTTOM, CONFLICT_REGEX, Conflict, ConflictParser, Emitter, INVALID, MIDDLE, Navigator, OurSide, Side, TOP, TheirSide, _, _ref;

  $ = require('space-pen').$;

  Emitter = require('atom').Emitter;

  _ = require('underscore-plus');

  _ref = require('./side'), Side = _ref.Side, OurSide = _ref.OurSide, TheirSide = _ref.TheirSide;

  Navigator = require('./navigator').Navigator;

  CONFLICT_REGEX = /^<{7} (.+)\r?\n([^]*?)={7}\r?\n([^]*?)>{7} (.+)(?:\r?\n)?/mg;

  INVALID = null;

  TOP = 'top';

  MIDDLE = 'middle';

  BOTTOM = 'bottom';

  ConflictParser = (function() {
    var options;

    options = {
      persistent: false,
      invalidate: 'never'
    };

    function ConflictParser(state, editor) {
      this.state = state;
      this.editor = editor;
      this.position = INVALID;
    }

    ConflictParser.prototype.start = function(m) {
      this.m = m;
      this.startRow = this.m.range.start.row;
      this.endRow = this.m.range.end.row;
      this.chunks = this.m.match;
      this.chunks.shift();
      this.currentRow = this.startRow;
      this.position = TOP;
      return this.previousSide = null;
    };

    ConflictParser.prototype.finish = function() {
      return this.previousSide.followingMarker = this.previousSide.refBannerMarker;
    };

    ConflictParser.prototype.markOurs = function() {
      return this._markHunk(OurSide);
    };

    ConflictParser.prototype.markSeparator = function() {
      var marker, sepRowEnd, sepRowStart;
      if (this.position !== MIDDLE) {
        throw new Error("Unexpected position for separator: " + this.position);
      }
      this.position = BOTTOM;
      sepRowStart = this.currentRow;
      sepRowEnd = this._advance(1);
      marker = this.editor.markBufferRange([[sepRowStart, 0], [sepRowEnd, 0]], this.options);
      this.previousSide.followingMarker = marker;
      return new Navigator(marker);
    };

    ConflictParser.prototype.markTheirs = function() {
      return this._markHunk(TheirSide);
    };

    ConflictParser.prototype._markHunk = function(sideKlass) {
      var bannerMarker, bannerRowEnd, bannerRowStart, lines, marker, ref, rowEnd, rowStart, side, sidePosition, text;
      sidePosition = this.position;
      switch (this.position) {
        case TOP:
          ref = this.chunks.shift();
          text = this.chunks.shift();
          lines = text.split(/\n/);
          bannerRowStart = this.currentRow;
          bannerRowEnd = rowStart = this._advance(1);
          rowEnd = this._advance(lines.length - 1);
          this.position = MIDDLE;
          break;
        case BOTTOM:
          text = this.chunks.shift();
          ref = this.chunks.shift();
          lines = text.split(/\n/);
          rowStart = this.currentRow;
          bannerRowStart = rowEnd = this._advance(lines.length - 1);
          bannerRowEnd = this._advance(1);
          this.position = INVALID;
          break;
        default:
          throw new Error("Unexpected position for side: " + this.position);
      }
      bannerMarker = this.editor.markBufferRange([[bannerRowStart, 0], [bannerRowEnd, 0]], this.options);
      marker = this.editor.markBufferRange([[rowStart, 0], [rowEnd, 0]], this.options);
      side = new sideKlass(text, ref, marker, bannerMarker, sidePosition);
      this.previousSide = side;
      return side;
    };

    ConflictParser.prototype._advance = function(rowCount) {
      return this.currentRow += rowCount;
    };

    return ConflictParser;

  })();

  Conflict = (function() {
    function Conflict(ours, theirs, parent, navigator, state) {
      this.ours = ours;
      this.theirs = theirs;
      this.parent = parent;
      this.navigator = navigator;
      this.state = state;
      this.emitter = new Emitter;
      this.ours.conflict = this;
      this.theirs.conflict = this;
      this.navigator.conflict = this;
      this.resolution = null;
    }

    Conflict.prototype.isResolved = function() {
      return this.resolution != null;
    };

    Conflict.prototype.onDidResolveConflict = function(callback) {
      return this.emitter.on('resolve-conflict', callback);
    };

    Conflict.prototype.resolveAs = function(side) {
      this.resolution = side;
      return this.emitter.emit('resolve-conflict');
    };

    Conflict.prototype.scrollTarget = function() {
      return this.ours.marker.getTailBufferPosition();
    };

    Conflict.prototype.markers = function() {
      return _.flatten([this.ours.markers(), this.theirs.markers(), this.navigator.markers()], true);
    };

    Conflict.prototype.toString = function() {
      return "[conflict: " + this.ours + " " + this.theirs + "]";
    };

    Conflict.all = function(state, editor) {
      var marker, previous, results;
      results = [];
      previous = null;
      marker = new ConflictParser(state, editor);
      editor.getBuffer().scan(CONFLICT_REGEX, function(m) {
        var c, nav, ours, theirs;
        marker.start(m);
        if (state.isRebase) {
          theirs = marker.markTheirs();
          nav = marker.markSeparator();
          ours = marker.markOurs();
        } else {
          ours = marker.markOurs();
          nav = marker.markSeparator();
          theirs = marker.markTheirs();
        }
        marker.finish();
        c = new Conflict(ours, theirs, null, nav, state);
        results.push(c);
        nav.linkToPrevious(previous);
        return previous = c;
      });
      return results;
    };

    return Conflict;

  })();

  module.exports = {
    Conflict: Conflict
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvdGFrYWFraS8uYXRvbS9wYWNrYWdlcy9tZXJnZS1jb25mbGljdHMvbGliL2NvbmZsaWN0LmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxnSUFBQTs7QUFBQSxFQUFDLElBQUssT0FBQSxDQUFRLFdBQVIsRUFBTCxDQUFELENBQUE7O0FBQUEsRUFDQyxVQUFXLE9BQUEsQ0FBUSxNQUFSLEVBQVgsT0FERCxDQUFBOztBQUFBLEVBRUEsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxpQkFBUixDQUZKLENBQUE7O0FBQUEsRUFJQSxPQUE2QixPQUFBLENBQVEsUUFBUixDQUE3QixFQUFDLFlBQUEsSUFBRCxFQUFPLGVBQUEsT0FBUCxFQUFnQixpQkFBQSxTQUpoQixDQUFBOztBQUFBLEVBS0MsWUFBYSxPQUFBLENBQVEsYUFBUixFQUFiLFNBTEQsQ0FBQTs7QUFBQSxFQU9BLGNBQUEsR0FBaUIsNkRBUGpCLENBQUE7O0FBQUEsRUFTQSxPQUFBLEdBQVUsSUFUVixDQUFBOztBQUFBLEVBVUEsR0FBQSxHQUFNLEtBVk4sQ0FBQTs7QUFBQSxFQVdBLE1BQUEsR0FBUyxRQVhULENBQUE7O0FBQUEsRUFZQSxNQUFBLEdBQVMsUUFaVCxDQUFBOztBQUFBLEVBaUJNO0FBR0osUUFBQSxPQUFBOztBQUFBLElBQUEsT0FBQSxHQUNFO0FBQUEsTUFBQSxVQUFBLEVBQVksS0FBWjtBQUFBLE1BQ0EsVUFBQSxFQUFZLE9BRFo7S0FERixDQUFBOztBQVNhLElBQUEsd0JBQUUsS0FBRixFQUFVLE1BQVYsR0FBQTtBQUNYLE1BRFksSUFBQyxDQUFBLFFBQUEsS0FDYixDQUFBO0FBQUEsTUFEb0IsSUFBQyxDQUFBLFNBQUEsTUFDckIsQ0FBQTtBQUFBLE1BQUEsSUFBQyxDQUFBLFFBQUQsR0FBWSxPQUFaLENBRFc7SUFBQSxDQVRiOztBQUFB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

//# sourceURL=/home/takaaki/.atom/packages/merge-conflicts/lib/conflict.coffee
