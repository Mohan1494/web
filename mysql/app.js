var app = angular.module('crudApp', []);

app.controller('crudController', function($scope, $http) {
  $scope.users = [];
  $scope.user = {};
  $scope.isEditing = false; // Track whether you're editing a user

  // Fetch users
  $http.get('http://localhost:3000/users').then(function(response) {
    $scope.users = response.data;
  });

  // Add user
  $scope.addUser = function() {
    $http.post('http://localhost:3000/users', $scope.user).then(function(response) {
      alert('User added!');
      $scope.users.push($scope.user);
      $scope.user = {};
    });
  };

  // Update user
  $scope.updateUser = function() {
    $http.put('http://localhost:3000/users/' + $scope.user.id, $scope.user).then(function(response) {
      alert('User updated!');
      const index = $scope.users.findIndex(u => u.id === $scope.user.id);
      $scope.users[index] = $scope.user; // Update the user in the list
      $scope.user = {}; // Reset the form
      $scope.isEditing = false; // Reset editing state
    });
  };

  // Delete user
  $scope.deleteUser = function(id) {
    console.log('Deleting user with id:', id); // Check if id is correctly passed
    $http.delete('http://localhost:3000/users/' + id).then(function(response) {
      alert('User deleted!');
      $scope.users = $scope.users.filter(user => user.id !== id);
    });
  };

  // Edit user
  $scope.editUser = function(user) {
    $scope.user = angular.copy(user);
    $scope.isEditing = true; // Set editing state to true
  };

  // Handle form submission
  $scope.handleSubmit = function() {
    if ($scope.isEditing) {
      $scope.updateUser(); // Call update if in editing mode
    } else {
      $scope.addUser(); // Otherwise, call add
    }
  };
});
