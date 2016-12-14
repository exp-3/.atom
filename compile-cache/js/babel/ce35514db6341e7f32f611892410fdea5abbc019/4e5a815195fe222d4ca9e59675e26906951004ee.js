'use babel';

//
// JSON error format parser.
//

Object.defineProperty(exports, '__esModule', {
  value: true
});
var err = require('./errors');

// Copies a location from the given span to a linter message
function copySpanLocation(span, msg) {
  msg.file = span.file_name;
  msg.line = span.line_start;
  msg.line_end = span.line_end;
  msg.col = span.column_start;
  msg.col_end = span.column_end;
}

function parseSpan(_x, _x2, _x3) {
  var _again = true;

  _function: while (_again) {
    var span = _x,
        msg = _x2,
        mainMsg = _x3;
    _again = false;

    if (span.is_primary) {
      msg.extra.spanLabel = span.label;
      // If the error is within a macro, add the macro text to the message
      if (span.file_name && span.file_name.startsWith('<') && span.text && span.text.length > 0) {
        msg.trace.push({
          message: span.text[0].text,
          type: 'Macro',
          severity: 'info',
          extra: {}
        });
      }
    }
    if (span.file_name && !span.file_name.startsWith('<')) {
      if (!span.is_primary && span.label) {
        // A secondary span
        var trace = {
          message: span.label,
          type: 'Note',
          severity: 'info',
          extra: {}
        };
        copySpanLocation(span, trace);
        msg.trace.push(trace);
      }
      // Copy the main error location from the primary span or from any other
      // span if it hasn't been defined yet
      if (span.is_primary || !msg.file) {
        copySpanLocation(span, msg);
      }
      return true;
    } else if (span.expansion) {
      _x = span.expansion.span;
      _x2 = msg;
      _x3 = mainMsg;
      _again = true;
      trace = undefined;
      continue _function;
    }
    return false;
  }
}

// Parses spans of the given message
function parseSpans(jsonObj, msg, mainMsg) {
  if (jsonObj.spans) {
    jsonObj.spans.forEach(function (span) {
      return parseSpan(span, msg, mainMsg);
    });
  }
}

// Parses a compile message in the JSON format
var parseMessage = function parseMessage(line, messages) {
  var json = JSON.parse(line);
  var msg = {
    message: json.message,
    type: err.level2type(json.level),
    severity: err.level2severity(json.level),
    trace: [],
    extra: {}
  };
  parseSpans(json, msg, msg);
  json.children.forEach(function (child) {
    var tr = {
      message: child.message,
      type: err.level2type(child.level),
      severity: err.level2severity(child.level),
      extra: {}
    };
    parseSpans(child, tr, msg);
    msg.trace.push(tr);
  });
  if (json.code) {
    msg.extra.errorCode = json.code.code;
    if (json.code.explanation) {
      msg.trace.push({
        message: json.code.explanation,
        type: 'Explanation',
        severity: 'info',
        extra: {}
      });
    }
  }
  messages.push(msg);
};

exports.parseMessage = parseMessage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3Rha2Fha2kvLmF0b20vcGFja2FnZXMvYnVpbGQtY2FyZ28vbGliL2pzb24tcGFyc2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFdBQVcsQ0FBQzs7Ozs7Ozs7O0FBTVosSUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDOzs7QUFHaEMsU0FBUyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFO0FBQ25DLEtBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztBQUMxQixLQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7QUFDM0IsS0FBRyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO0FBQzdCLEtBQUcsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztBQUM1QixLQUFHLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7Q0FDL0I7O0FBRUQsU0FBUyxTQUFTOzs7NEJBQXFCO1FBQXBCLElBQUk7UUFBRSxHQUFHO1FBQUUsT0FBTzs7O0FBQ25DLFFBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtBQUNuQixTQUFHLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDOztBQUVqQyxVQUFJLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7QUFDekYsV0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7QUFDYixpQkFBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSTtBQUMxQixjQUFJLEVBQUUsT0FBTztBQUNiLGtCQUFRLEVBQUUsTUFBTTtBQUNoQixlQUFLLEVBQUUsRUFBRTtTQUNW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WUFBSSxFQUFFLGFBQWE7QUFDbkIsZ0JBQVEsRUFBRSxNQUFNO0FBQ2hCLGFBQUssRUFBRSxFQUFFO09BQ1YsQ0FBQyxDQUFDO0tBQ0o7R0FDRjtBQUNELFVBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDcEIsQ0FBQzs7UUFFTyxZQUFZLEdBQVosWUFBWSIsImZpbGUiOiIvaG9tZS90YWthYWtpLy5hdG9tL3BhY2thZ2VzL2J1aWxkLWNhcmdvL2xpYi9qc29uLXBhcnNlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2UgYmFiZWwnO1xuXG4vL1xuLy8gSlNPTiBlcnJvciBmb3JtYXQgcGFyc2VyLlxuLy9cblxuY29uc3QgZXJyID0gcmVxdWlyZSgnLi9lcnJvcnMnKTtcblxuLy8gQ29waWVzIGEgbG9jYXRpb24gZnJvbSB0aGUgZ2l2ZW4gc3BhbiB0byBhIGxpbnRlciBtZXNzYWdlXG5mdW5jdGlvbiBjb3B5U3BhbkxvY2F0aW9uKHNwYW4sIG1zZykge1xuICBtc2cuZmlsZSA9IHNwYW4uZmlsZV9uYW1lO1xuICBtc2cubGluZSA9IHNwYW4ubGluZV9zdGFydDtcbiAgbXNnLmxpbmVfZW5kID0gc3Bhbi5saW5lX2VuZDtcbiAgbXNnLmNvbCA9IHNwYW4uY29sdW1uX3N0YXJ0O1xuICBtc2cuY29sX2VuZCA9IHNwYW4uY29sdW1uX2VuZDtcbn1cblxuZnVuY3Rpb24gcGFyc2VTcGFuKHNwYW4sIG1zZywgbWFpbk1zZykge1xuICBpZiAoc3Bhbi5pc19wcmltYXJ5KSB7XG4gICAgbXNnLmV4dHJhLnNwYW5MYWJlbCA9IHNwYW4ubGFiZWw7XG4gICAgLy8gSWYgdGhlIGVycm9yIGlzIHdpdGhpbiBhIG1hY3JvLCBhZGQgdGhlIG1hY3JvIHRleHQgdG8gdGhlIG1lc3NhZ2VcbiAgICBpZiAoc3Bhbi5maWxlX25hbWUgJiYgc3Bhbi5maWxlX25hbWUuc3RhcnRzV2l0aCgnPCcpICYmIHNwYW4udGV4dCAmJiBzcGFuLnRleHQubGVuZ3RoID4gMCkge1xuICAgICAgbXNnLnRyYWNlLnB1c2goe1xuICAgICAgICBtZXNzYWdlOiBzcGFuLnRleHRbMF0udGV4dCxcbiAgICAgICAgdHlwZTogJ01hY3JvJyxcbiAgICAgICAgc2V2ZXJpdHk6ICdpbmZvJyxcbiAgICAgICAgZXh0cmE6IHt9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgaWYgKHNwYW4uZmlsZV9uYW1lICYmICFzcGFuLmZpbGVfbmFtZS5zdGFydHNXaXRoKCc8JykpIHtcbiAgICBpZiAoIXNwYW4uaXNfcHJpbWFyeSAmJiBzcGFuLmxhYmVsKSB7XG4gICAgICAvLyBBIHNlY29uZGFyeSBzcGFuXG4gICAgICBjb25zdCB0cmFjZSA9IHtcbiAgICAgICAgbWVzc2FnZTogc3Bhbi5sYWJlbCxcbiAgICAgICAgdHlwZTogJ05vdGUnLFxuICAgICAgICBzZXZlcml0eTogJ2luZm8nLFxuICAgICAgICBleHRyYToge31cbiAgICAgIH07XG4gICAgICBjb3B5U3BhbkxvY2F0aW9uKHNwYW4sIHRyYWNlKTtcbiAgICAgIG1zZy50cmFjZS5wdXNoKHRyYWNlKTtcbiAgICB9XG4gICAgLy8gQ29weSB0aGUgbWFpbiBlcnJvciBsb2NhdGlvbiBmcm9tIHRoZSBwcmltYXJ5IHNwYW4gb3IgZnJvbSBhbnkgb3RoZXJcbiAgICAvLyBzcGFuIGlmIGl0IGhhc24ndCBiZWVuIGRlZmluZWQgeWV0XG4gICAgaWYgKHNwYW4uaXNfcHJpbWFyeSB8fCAhbXNnLmZpbGUpIHtcbiAgICAgIGNvcHlTcGFuTG9jYXRpb24oc3BhbiwgbXNnKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSBpZiAoc3Bhbi5leHBhbnNpb24pIHtcbiAgICByZXR1cm4gcGFyc2VTcGFuKHNwYW4uZXhwYW5zaW9uLnNwYW4sIG1zZywgbWFpbk1zZyk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vLyBQYXJzZXMgc3BhbnMgb2YgdGhlIGdpdmVuIG1lc3NhZ2VcbmZ1bmN0aW9uIHBhcnNlU3BhbnMoanNvbk9iaiwgbXNnLCBtYWluTXNnKSB7XG4gIGlmIChqc29uT2JqLnNwYW5zKSB7XG4gICAganNvbk9iai5zcGFucy5mb3JFYWNoKHNwYW4gPT4gcGFyc2VTcGFuKHNwYW4sIG1zZywgbWFpbk1zZykpO1xuICB9XG59XG5cbi8vIFBhcnNlcyBhIGNvbXBpbGUgbWVzc2FnZSBpbiB0aGUgSlNPTiBmb3JtYXRcbmNvbnN0IHBhcnNlTWVzc2FnZSA9IChsaW5lLCBtZXNzYWdlcykgPT4ge1xuICBjb25zdCBqc29uID0gSlNPTi5wYXJzZShsaW5lKTtcbiAgY29uc3QgbXNnID0ge1xuICAgIG1lc3NhZ2U6IGpzb24ubWVzc2FnZSxcbiAgICB0eXBlOiBlcnIubGV2ZWwydHlwZShqc29uLmxldmVsKSxcbiAgICBzZXZlcml0eTogZXJyLmxldmVsMnNldmVyaXR5KGpzb24ubGV2ZWwpLFxuICAgIHRyYWNlOiBbXSxcbiAgICBleHRyYToge31cbiAgfTtcbiAgcGFyc2VTcGFucyhqc29uLCBtc2csIG1zZyk7XG4gIGpzb24uY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgY29uc3QgdHIgPSB7XG4gICAgICBtZXNzYWdlOiBjaGlsZC5tZXNzYWdlLFxuICAgICAgdHlwZTogZXJyLmxldmVsMnR5cGUoY2hpbGQubGV2ZWwpLFxuICAgICAgc2V2ZXJpdHk6IGVyci5sZXZlbDJzZXZlcml0eShjaGlsZC5sZXZlbCksXG4gICAgICBleHRyYToge31cbiAgICB9O1xuICAgIHBhcnNlU3BhbnMoY2hpbGQsIHRyLCBtc2cpO1xuICAgIG1zZy50cmFjZS5wdXNoKHRyKTtcbiAgfSk7XG4gIGlmIChqc29uLmNvZGUpIHtcbiAgICBtc2cuZXh0cmEuZXJyb3JDb2RlID0ganNvbi5jb2RlLmNvZGU7XG4gICAgaWYgKGpzb24uY29kZS5leHBsYW5hdGlvbikge1xuICAgICAgbXNnLnRyYWNlLnB1c2goe1xuICAgICAgICBtZXNzYWdlOiBqc29uLmNvZGUuZXhwbGFuYXRpb24sXG4gICAgICAgIHR5cGU6ICdFeHBsYW5hdGlvbicsXG4gICAgICAgIHNldmVyaXR5OiAnaW5mbycsXG4gICAgICAgIGV4dHJhOiB7fVxuICAgICAgfSk7XG4gICAgfVxuICB9XG4gIG1lc3NhZ2VzLnB1c2gobXNnKTtcbn07XG5cbmV4cG9ydCB7IHBhcnNlTWVzc2FnZSB9O1xuIl19
//# sourceURL=/home/takaaki/.atom/packages/build-cargo/lib/json-parser.js