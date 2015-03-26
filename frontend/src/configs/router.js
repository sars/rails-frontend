'use strict';

/**
 * Config for the router
 */
angular.module('app')
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider
      .state('app', {
        abstract: true,
        controller: 'AppCtrl',
        templateUrl: 'components/app/app.html',
        data: {
          permissions: {
            except: ['anonymous'],
            redirectTo: 'auth.login'
          }
        }
      })
      .state('app.dashboard', {
        url: '/',
        controller: 'DashboardCtrl',
        templateUrl: 'components/dashboard/dashboard.html'
      })
      .state('app.posts', {
        url: '/posts',
        controller: 'PostsCtrl',
        templateUrl: 'components/posts/index.html'
      })
      .state('admin', {
        abstract: true,
        controller: 'AdminCtrl',
        templateUrl: 'components/admin/admin.html',
        data: {
          permissions: {
            except: ['anonymous'],
            redirectTo: 'auth.login'
          }
        }
      })
      .state('admin.dashboard', {
        url: '/admin',
        templateUrl: 'components/dashboard/dashboard.html'
      })
      .state('admin.create-post', {
        abstract: true,
        controller: 'CreatePostCtrl',
        templateUrl: 'components/create-post/create-post.html'
      })
      .state('admin.create-post.text', {
        url: '/admin/create-post/text',
        controller: 'CreatePostTextCtrl',
        templateUrl: 'components/create-post/create-post-text.html'
      });

    $urlRouterProvider.otherwise('/');

  });
