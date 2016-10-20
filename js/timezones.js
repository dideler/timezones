var app = angular.module('timezones', []);

app.run(function($rootScope) {
  function update() {
    $rootScope.now = moment().format('LLLL');
  }
  $rootScope.$on('update-minute', update);
  update();
});

app.controller('timezones', function($scope, $rootScope) {
  var data = [
        { name: "Benjamin",  role: "student", timezone: "America/Vancouver" }
      , { name: "Brenden",   role: "student", timezone: "America/Moncton" }
      , { name: "Dennis",    role: "mentor",  timezone: "Europe/London" }
      , { name: "Faraz",     role: "student", timezone: "America/Toronto" }
      , { name: "Francisco", role: "student", timezone: "America/Toronto" }
      , { name: "Joseph",    role: "mentor",  timezone: "America/Toronto" }
      , { name: "Kaiyuan",   role: "student", timezone: "America/Vancouver" }
      , { name: "Michael",   role: "mentor",  timezone: "America/Vancouver" }
      , { name: "Stephen",   role: "student", timezone: "America/Edmonton" }
      , { name: "Thanh",     role: "mentor",  timezone: "America/Toronto" }
      ]
    , offsets = data.toString().substr(0, 24).split('').map(function(val, key) {
        return key;
      });

  function update() {
    $scope.data = data.map(function(d) {
      var now = moment().tz(d.timezone);
      d.offset = now.format('Z');
      d.times = offsets.map(function(offset) {
        return now.clone().add(offset, 'h');
      });
      return d;
    });
  }
  $scope.offsets = offsets;
  update();

  $rootScope.$on('update-minute', update);
});

app.controller('herp', function($scope, $timeout, $rootScope) {
  function update() {
    var now = moment()
      , second = now.seconds() * 6
      , minute = now.minutes() * 6 + second / 60
      , hour = ((now.hours() % 12) / 12) * 360 + 90 + minute / 12;

    $scope.sec = second;
    $scope.min = minute;
    $scope.hr = hour;

    if (!second) {
      $rootScope.$emit('update-minute');
    }

    $timeout(function() {
      $scope.$apply(update);
    }, 1000);
  }
  update();
});
