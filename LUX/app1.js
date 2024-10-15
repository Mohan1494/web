// Custom module creation using AngularJS's built-in 'ngSanitize' module for additional filtering
var app = angular.module('eventApp', ['ngSanitize']);

// Factory to manage registrations, keeping them centralized
app.factory('EventService', function() {
    var registrations = [];

    return {
        getRegistrations: function() {
            return registrations;
        },
        addRegistration: function(registration) {
            registrations.push(registration);
        }
    };
});

// Filter to format and sanitize data
app.filter('capitalize', function() {
    return function(input) {
        if (input != null) {
            return input.charAt(0).toUpperCase() + input.slice(1);
        }
        return '';
    };
});

// Controller with dependency injection for $scope and EventService
app.controller('EventController', ['$scope', 'EventService', function($scope, EventService) {
    // Predefined event types, with the first letter capitalized using the 'capitalize' filter
    $scope.eventTypes = ['conference', 'workshop', 'meetup', 'webinar'];

    // Initialize the event object for the form
    $scope.event = {};

    // Retrieve registrations using EventService
    $scope.registrations = EventService.getRegistrations();

    // Submit form and add the event to the registration list
    $scope.submitForm = function() {
        EventService.addRegistration(angular.copy($scope.event));
        $scope.event = {}; // Reset the form after submission
    };
}]);

// Custom directive to encapsulate the event registration form
app.directive('eventForm', function() {
    return {
        restrict: 'E',
        templateUrl: 'index1.html'
    };
});
