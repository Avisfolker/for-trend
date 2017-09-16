app.config(function($stateProvider, $urlRouterProvider) {


  $stateProvider
    .state('task1', {
      url: "/task1",
      templateUrl: "tasks/task1.html"
    })
    .state('task2', {
      url: "/task2",
      templateUrl: "tasks/task2.html"
    })
  ;

  $urlRouterProvider.otherwise("/task1");



});


