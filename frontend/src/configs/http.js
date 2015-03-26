'use strict';

angular.module('app').run(function ($http, $location) {
  $http.defaults.withCredentials = true;
  $http.defaults.transformRequest.push(function (data, headersGetter) {
    headersGetter()['X-Instance'] = $location.search().instance;
    return data;
  });
});
