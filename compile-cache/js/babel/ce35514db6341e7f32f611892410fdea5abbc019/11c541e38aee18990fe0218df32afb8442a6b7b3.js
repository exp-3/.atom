"use babel";

describe('Configuration function tests', function () {
  var main = require('../lib/main');
  var utility = require('../lib/utility.js');
  var settings = require("../lib/config").settings;

  beforeEach(function () {
    waitsForPromise(function () {
      atom.config.set('linter-gcc.execPath', '/usr/bin/g++');
      atom.config.set('linter-gcc.gccDefaultCFlags', '-Wall');
      atom.config.set('linter-gcc.gccDefaultCppFlags', '-Wall -std=c++11');
      atom.config.set('linter-gcc.gccErrorLimit', 15);
      atom.config.set('linter-gcc.gccIncludePaths', ' ');
      atom.config.set('linter-gcc.gccSuppressWarnings', true);
      main.messages = {};
      return atom.packages.activatePackage('linter-gcc');
    });
  });

  it('Uses default settings when no config file is found', function () {
    waitsForPromise(function () {
      return atom.workspace.open(__dirname + '/files/comment.cpp').then(function () {
        var config = settings();
        expect(config.execPath).toEqual("/usr/bin/g++");
        expect(config.gccDefaultCFlags).toEqual("-Wall");
        expect(config.gccDefaultCppFlags).toEqual("-Wall -std=c++11");
        expect(config.gccErrorLimit).toEqual(15);
        expect(config.gccIncludePaths).toEqual(" ");
        expect(config.gccSuppressWarnings).toEqual(true);
      });
    });
  });

  it('Uses file-specific config file when it exists', function () {
    waitsForPromise(function () {
      return atom.workspace.open(__dirname + '/files/project_test/sub1/subsub1/file.cpp').then(function () {
        var config = settings();
        expect(config.execPath).toEqual("exec_file");
        expect(config.gccDefaultCFlags).toEqual("cflags_file");
        expect(config.gccDefaultCppFlags).toEqual("cppflags_file");
        expect(config.gccErrorLimit).toEqual(1);
        expect(config.gccIncludePaths).toEqual("includepath_file");
        expect(config.gccSuppressWarnings).toEqual(true);
      });
    });
  });

  it('Uses directory-specific config file when it exists', function () {
    waitsForPromise(function () {
      return atom.workspace.open(__dirname + '/files/project_test/sub2/file.cpp').then(function () {
        var config = settings();
        expect(config.execPath).toEqual("exec_subdir");
        expect(config.gccDefaultCFlags).toEqual("cflags_subdir");
        expect(config.gccDefaultCppFlags).toEqual("cppflags_subdir");
        expect(config.gccErrorLimit).toEqual(2);
        expect(config.gccIncludePaths).toEqual("includepath_subdir");
        expect(config.gccSuppressWarnings).toEqual(true);
      });
    });
  });

  it('Uses current directory config file when it exists', function () {
    waitsForPromise(function () {
      return atom.workspace.open(__dirname + '/files/project_test/sub2/file.cpp').then(function () {
        var config = settings();
        expect(config.execPath).toEqual("exec_subdir");
        expect(config.gccDefaultCFlags).toEqual("cflags_subdir");
        expect(config.gccDefaultCppFlags).toEqual("cppflags_subdir");
        expect(config.gccErrorLimit).toEqual(2);
        expect(config.gccIncludePaths).toEqual("includepath_subdir");
        expect(config.gccSuppressWarnings).toEqual(true);
      });
    });
  });

  it('Uses upper-level config file when it exists', function () {
    waitsForPromise(function () {
      return atom.workspace.open(__dirname + '/files/project_test/sub4/subsub2/file.cpp').then(function () {
        var config = settings();
        expect(config.execPath).toEqual("exec_updir");
        expect(config.gccDefaultCFlags).toEqual("cflags_updir");
        expect(config.gccDefaultCppFlags).toEqual("cppflags_updir");
        expect(config.gccErrorLimit).toEqual(5);
        expect(config.gccIncludePaths).toEqual("includepath_updir");
        expect(config.gccSuppressWarnings).toEqual(true);
      });
    });
  });

  it('Uses project-specific config file when it exists', function () {
    waitsForPromise(function () {
      return atom.workspace.open(__dirname + '/files/project_test').then(function () {
        return atom.workspace.open(__dirname + '/files/project_test/sub3/file.cpp').then(function () {
          var config = settings();
          expect(config.execPath).toEqual("exec_project");
          expect(config.gccDefaultCFlags).toEqual("cflags_project");
          expect(config.gccDefaultCppFlags).toEqual("cppflags_project");
          expect(config.gccErrorLimit).toEqual(3);
          expect(config.gccIncludePaths).toEqual("includepath_project");
          expect(config.gccSuppressWarnings).toEqual(false);
        });
      });
    });
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3Rha2Fha2kvLmF0b20vcGFja2FnZXMvbGludGVyLWdjYy9zcGVjL2NvbmZpZy1zcGVjLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFdBQVcsQ0FBQzs7QUFFWixRQUFRLENBQUMsOEJBQThCLEVBQUUsWUFBTTtBQUM3QyxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUE7QUFDbkMsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUE7QUFDNUMsTUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDLFFBQVEsQ0FBQTs7QUFFaEQsWUFBVSxDQUFDLFlBQU07QUFDZixtQkFBZSxDQUFDLFlBQU07QUFDcEIsVUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMscUJBQXFCLEVBQUUsY0FBYyxDQUFDLENBQUE7QUFDdEQsVUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLEVBQUUsT0FBTyxDQUFDLENBQUE7QUFDdkQsVUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsK0JBQStCLEVBQUUsa0JBQWtCLENBQUMsQ0FBQTtBQUNwRSxVQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsRUFBRSxFQUFFLENBQUMsQ0FBQTtBQUMvQyxVQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsRUFBRSxHQUFHLENBQUMsQ0FBQTtBQUNsRCxVQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsRUFBRSxJQUFJLENBQUMsQ0FBQTtBQUN2RCxVQUFJLENBQUMsUUFBUSxHQUFDLEVBQUUsQ0FBQztBQUNqQixhQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxDQUFBO0tBQ25ELENBQUMsQ0FBQTtHQUNILENBQUMsQ0FBQTs7QUFFRixJQUFFLENBQUMsb0RBQW9ELEVBQUUsWUFBTTtBQUM3RCxtQkFBZSxD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QUMsQ0FBQyxDQUFBO0FBQ3ZDLGdCQUFNLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBO0FBQzdELGdCQUFNLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFBO1NBQ2xELENBQUMsQ0FBQTtPQUNILENBQUMsQ0FBQTtLQUNILENBQUMsQ0FBQTtHQUNILENBQUMsQ0FBQTtDQUNILENBQUMsQ0FBQSIsImZpbGUiOiIvaG9tZS90YWthYWtpLy5hdG9tL3BhY2thZ2VzL2xpbnRlci1nY2Mvc3BlYy9jb25maWctc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGJhYmVsXCI7XG5cbmRlc2NyaWJlKCdDb25maWd1cmF0aW9uIGZ1bmN0aW9uIHRlc3RzJywgKCkgPT4ge1xuICBjb25zdCBtYWluID0gcmVxdWlyZSgnLi4vbGliL21haW4nKVxuICBjb25zdCB1dGlsaXR5ID0gcmVxdWlyZSgnLi4vbGliL3V0aWxpdHkuanMnKVxuICB2YXIgc2V0dGluZ3MgPSByZXF1aXJlKFwiLi4vbGliL2NvbmZpZ1wiKS5zZXR0aW5nc1xuXG4gIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgIHdhaXRzRm9yUHJvbWlzZSgoKSA9PiB7XG4gICAgICBhdG9tLmNvbmZpZy5zZXQoJ2xpbnRlci1nY2MuZXhlY1BhdGgnLCAnL3Vzci9iaW4vZysrJylcbiAgICAgIGF0b20uY29uZmlnLnNldCgnbGludGVyLWdjYy5nY2NEZWZhdWx0Q0ZsYWdzJywgJy1XYWxsJylcbiAgICAgIGF0b20uY29uZmlnLnNldCgnbGludGVyLWdjYy5nY2NEZWZhdWx0Q3BwRmxhZ3MnLCAnLVdhbGwgLXN0ZD1jKysxMScpXG4gICAgICBhdG9tLmNvbmZpZy5zZXQoJ2xpbnRlci1nY2MuZ2NjRXJyb3JMaW1pdCcsIDE1KVxuICAgICAgYXRvbS5jb25maWcuc2V0KCdsaW50ZXItZ2NjLmdjY0luY2x1ZGVQYXRocycsICcgJylcbiAgICAgIGF0b20uY29uZmlnLnNldCgnbGludGVyLWdjYy5nY2NTdXBwcmVzc1dhcm5pbmdzJywgdHJ1ZSlcbiAgICAgIG1haW4ubWVzc2FnZXM9e307XG4gICAgICByZXR1cm4gYXRvbS5wYWNrYWdlcy5hY3RpdmF0ZVBhY2thZ2UoJ2xpbnRlci1nY2MnKVxuICAgIH0pXG4gIH0pXG5cbiAgaXQoJ1VzZXMgZGVmYXVsdCBzZXR0aW5ncyB3aGVuIG5vIGNvbmZpZyBmaWxlIGlzIGZvdW5kJywgKCkgPT4ge1xuICAgIHdhaXRzRm9yUHJvbWlzZSgoKSA9PiB7XG4gICAgICByZXR1cm4gYXRvbS53b3Jrc3BhY2Uub3BlbihfX2Rpcm5hbWUgKyAnL2ZpbGVzL2NvbW1lbnQuY3BwJykudGhlbigoKSA9PiB7XG4gICAgICAgICAgdmFyIGNvbmZpZyA9IHNldHRpbmdzKClcbiAgICAgICAgICBleHBlY3QoY29uZmlnLmV4ZWNQYXRoKS50b0VxdWFsKFwiL3Vzci9iaW4vZysrXCIpXG4gICAgICAgICAgZXhwZWN0KGNvbmZpZy5nY2NEZWZhdWx0Q0ZsYWdzKS50b0VxdWFsKFwiLVdhbGxcIilcbiAgICAgICAgICBleHBlY3QoY29uZmlnLmdjY0RlZmF1bHRDcHBGbGFncykudG9FcXVhbChcIi1XYWxsIC1zdGQ9YysrMTFcIilcbiAgICAgICAgICBleHBlY3QoY29uZmlnLmdjY0Vycm9yTGltaXQpLnRvRXF1YWwoMTUpXG4gICAgICAgICAgZXhwZWN0KGNvbmZpZy5nY2NJbmNsdWRlUGF0aHMpLnRvRXF1YWwoXCIgXCIpXG4gICAgICAgICAgZXhwZWN0KGNvbmZpZy5nY2NTdXBwcmVzc1dhcm5pbmdzKS50b0VxdWFsKHRydWUpXG4gICAgICB9KVxuICAgIH0pXG4gIH0pXG5cbiAgaXQoJ1VzZXMgZmlsZS1zcGVjaWZpYyBjb25maWcgZmlsZSB3aGVuIGl0IGV4aXN0cycsICgpID0+IHtcbiAgICB3YWl0c0ZvclByb21pc2UoKCkgPT4ge1xuICAgICAgcmV0dXJuIGF0b20ud29ya3NwYWNlLm9wZW4oX19kaXJuYW1lICsgJy9maWxlcy9wcm9qZWN0X3Rlc3Qvc3ViMS9zdWJzdWIxL2ZpbGUuY3BwJykudGhlbigoKSA9PiB7XG4gICAgICAgICAgdmFyIGNvbmZpZyA9IHNldHRpbmdzKClcbiAgICAgICAgICBleHBlY3QoY29uZmlnLmV4ZWNQYXRoKS50b0VxdWFsKFwiZXhlY19maWxlXCIpXG4gICAgICAgICAgZXhwZWN0KGNvbmZpZy5nY2NEZWZhdWx0Q0ZsYWdzKS50b0VxdWFsKFwiY2ZsYWdzX2ZpbGVcIilcbiAgICAgICAgICBleHBlY3QoY29uZmlnLmdjY0RlZmF1bHRDcHBGbGFncykudG9FcXVhbChcImNwcGZsYWdzX2ZpbGVcIilcbiAgICAgICAgICBleHBlY3QoY29uZmlnLmdjY0Vycm9yTGltaXQpLnRvRXF1YWwoMSlcbiAgICAgICAgICBleHBlY3QoY29uZmlnLmdjY0luY2x1ZGVQYXRocykudG9FcXVhbChcImluY2x1ZGVwYXRoX2ZpbGVcIilcbiAgICAgICAgICBleHBlY3QoY29uZmlnLmdjY1N1cHByZXNzV2FybmluZ3MpLnRvRXF1YWwodHJ1ZSlcbiAgICAgIH0pXG4gICAgfSlcbiAgfSlcblxuICBpdCgnVXNlcyBkaXJlY3Rvcnktc3BlY2lmaWMgY29uZmlnIGZpbGUgd2hlbiBpdCBleGlzdHMnLCAoKSA9PiB7XG4gICAgd2FpdHNGb3JQcm9taXNlKCgpID0+IHtcbiAgICAgIHJldHVybiBhdG9tLndvcmtzcGFjZS5vcGVuKF9fZGlybmFtZSArICcvZmlsZXMvcHJvamVjdF90ZXN0L3N1YjIvZmlsZS5jcHAnKS50aGVuKCgpID0+IHtcbiAgICAgICAgICB2YXIgY29uZmlnID0gc2V0dGluZ3MoKVxuICAgICAgICAgIGV4cGVjdChjb25maWcuZXhlY1BhdGgpLnRvRXF1YWwoXCJleGVjX3N1YmRpclwiKVxuICAgICAgICAgIGV4cGVjdChjb25maWcuZ2NjRGVmYXVsdENGbGFncykudG9FcXVhbChcImNmbGFnc19zdWJkaXJcIilcbiAgICAgICAgICBleHBlY3QoY29uZmlnLmdjY0RlZmF1bHRDcHBGbGFncykudG9FcXVhbChcImNwcGZsYWdzX3N1YmRpclwiKVxuICAgICAgICAgIGV4cGVjdChjb25maWcuZ2NjRXJyb3JMaW1pdCkudG9FcXVhbCgyKVxuICAgICAgICAgIGV4cGVjdChjb25maWcuZ2NjSW5jbHVkZVBhdGhzKS50b0VxdWFsKFwiaW5jbHVkZXBhdGhfc3ViZGlyXCIpXG4gICAgICAgICAgZXhwZWN0KGNvbmZpZy5nY2NTdXBwcmVzc1dhcm5pbmdzKS50b0VxdWFsKHRydWUpXG4gICAgICB9KVxuICAgIH0pXG4gIH0pXG5cbiAgaXQoJ1VzZXMgY3VycmVudCBkaXJlY3RvcnkgY29uZmlnIGZpbGUgd2hlbiBpdCBleGlzdHMnLCAoKSA9PiB7XG4gICAgd2FpdHNGb3JQcm9taXNlKCgpID0+IHtcbiAgICAgIHJldHVybiBhdG9tLndvcmtzcGFjZS5vcGVuKF9fZGlybmFtZSArICcvZmlsZXMvcHJvamVjdF90ZXN0L3N1YjIvZmlsZS5jcHAnKS50aGVuKCgpID0+IHtcbiAgICAgICAgICB2YXIgY29uZmlnID0gc2V0dGluZ3MoKVxuICAgICAgICAgIGV4cGVjdChjb25maWcuZXhlY1BhdGgpLnRvRXF1YWwoXCJleGVjX3N1YmRpclwiKVxuICAgICAgICAgIGV4cGVjdChjb25maWcuZ2NjRGVmYXVsdENGbGFncykudG9FcXVhbChcImNmbGFnc19zdWJkaXJcIilcbiAgICAgICAgICBleHBlY3QoY29uZmlnLmdjY0RlZmF1bHRDcHBGbGFncykudG9FcXVhbChcImNwcGZsYWdzX3N1YmRpclwiKVxuICAgICAgICAgIGV4cGVjdChjb25maWcuZ2NjRXJyb3JMaW1pdCkudG9FcXVhbCgyKVxuICAgICAgICAgIGV4cGVjdChjb25maWcuZ2NjSW5jbHVkZVBhdGhzKS50b0VxdWFsKFwiaW5jbHVkZXBhdGhfc3ViZGlyXCIpXG4gICAgICAgICAgZXhwZWN0KGNvbmZpZy5nY2NTdXBwcmVzc1dhcm5pbmdzKS50b0VxdWFsKHRydWUpXG4gICAgICB9KVxuICAgIH0pXG4gIH0pXG5cbiAgaXQoJ1VzZXMgdXBwZXItbGV2ZWwgY29uZmlnIGZpbGUgd2hlbiBpdCBleGlzdHMnLCAoKSA9PiB7XG4gICAgd2FpdHNGb3JQcm9taXNlKCgpID0+IHtcbiAgICAgIHJldHVybiBhdG9tLndvcmtzcGFjZS5vcGVuKF9fZGlybmFtZSArICcvZmlsZXMvcHJvamVjdF90ZXN0L3N1YjQvc3Vic3ViMi9maWxlLmNwcCcpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIHZhciBjb25maWcgPSBzZXR0aW5ncygpXG4gICAgICAgICAgZXhwZWN0KGNvbmZpZy5leGVjUGF0aCkudG9FcXVhbChcImV4ZWNfdXBkaXJcIilcbiAgICAgICAgICBleHBlY3QoY29uZmlnLmdjY0RlZmF1bHRDRmxhZ3MpLnRvRXF1YWwoXCJjZmxhZ3NfdXBkaXJcIilcbiAgICAgICAgICBleHBlY3QoY29uZmlnLmdjY0RlZmF1bHRDcHBGbGFncykudG9FcXVhbChcImNwcGZsYWdzX3VwZGlyXCIpXG4gICAgICAgICAgZXhwZWN0KGNvbmZpZy5nY2NFcnJvckxpbWl0KS50b0VxdWFsKDUpXG4gICAgICAgICAgZXhwZWN0KGNvbmZpZy5nY2NJbmNsdWRlUGF0aHMpLnRvRXF1YWwoXCJpbmNsdWRlcGF0aF91cGRpclwiKVxuICAgICAgICAgIGV4cGVjdChjb25maWcuZ2NjU3VwcHJlc3NXYXJuaW5ncykudG9FcXVhbCh0cnVlKVxuICAgICAgfSlcbiAgICB9KVxuICB9KVxuXG4gIGl0KCdVc2VzIHByb2plY3Qtc3BlY2lmaWMgY29uZmlnIGZpbGUgd2hlbiBpdCBleGlzdHMnLCAoKSA9PiB7XG4gICAgd2FpdHNGb3JQcm9taXNlKCgpID0+IHtcbiAgICAgIHJldHVybiBhdG9tLndvcmtzcGFjZS5vcGVuKF9fZGlybmFtZSArICcvZmlsZXMvcHJvamVjdF90ZXN0JykudGhlbiggKCkgPT4ge1xuICAgICAgcmV0dXJuIGF0b20ud29ya3NwYWNlLm9wZW4oX19kaXJuYW1lICsgJy9maWxlcy9wcm9qZWN0X3Rlc3Qvc3ViMy9maWxlLmNwcCcpLnRoZW4oICgpID0+IHtcbiAgICAgICAgICB2YXIgY29uZmlnID0gc2V0dGluZ3MoKVxuICAgICAgICAgIGV4cGVjdChjb25maWcuZXhlY1BhdGgpLnRvRXF1YWwoXCJleGVjX3Byb2plY3RcIilcbiAgICAgICAgICBleHBlY3QoY29uZmlnLmdjY0RlZmF1bHRDRmxhZ3MpLnRvRXF1YWwoXCJjZmxhZ3NfcHJvamVjdFwiKVxuICAgICAgICAgIGV4cGVjdChjb25maWcuZ2NjRGVmYXVsdENwcEZsYWdzKS50b0VxdWFsKFwiY3BwZmxhZ3NfcHJvamVjdFwiKVxuICAgICAgICAgIGV4cGVjdChjb25maWcuZ2NjRXJyb3JMaW1pdCkudG9FcXVhbCgzKVxuICAgICAgICAgIGV4cGVjdChjb25maWcuZ2NjSW5jbHVkZVBhdGhzKS50b0VxdWFsKFwiaW5jbHVkZXBhdGhfcHJvamVjdFwiKVxuICAgICAgICAgIGV4cGVjdChjb25maWcuZ2NjU3VwcHJlc3NXYXJuaW5ncykudG9FcXVhbChmYWxzZSlcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfSlcbiAgfSlcbn0pXG4iXX0=
//# sourceURL=/home/takaaki/.atom/packages/linter-gcc/spec/config-spec.js
