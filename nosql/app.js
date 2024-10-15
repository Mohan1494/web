var app = angular.module('crudApp', []);

app.controller('crudController', function($scope, $http) {
  $scope.users = [];
  $scope.user = {};
  $scope.isEditing = false;

  // Fetch users
  $http.get('http://localhost:3000/users').then(function(response) {
    $scope.users = response.data;
  });

  // Add user
  $scope.addUser = function() {
    $http.post('http://localhost:3000/users', $scope.user).then(function(response) {
      alert('User added!');
      $scope.users.push(response.data); // response data contains the new user with _id
      $scope.user = {};
    });
  };

  // Update user
  $scope.updateUser = function() {
    $http.put('http://localhost:3000/users/' + $scope.user._id, $scope.user).then(function(response) {
      alert('User updated!');
      const index = $scope.users.findIndex(u => u._id === $scope.user._id);
      $scope.users[index] = $scope.user; // Update the user in the list
      $scope.user = {};
      $scope.isEditing = false;
    });
  };

  // Delete user
  $scope.deleteUser = function(id) {
    console.log('Deleting user with id:', id);
    $http.delete('http://localhost:3000/users/' + id).then(function(response) {
      alert('User deleted!');
      $scope.users = $scope.users.filter(user => user._id !== id);
    });
  };

  // Edit user
  $scope.editUser = function(user) {
    $scope.user = angular.copy(user);
    $scope.isEditing = true;
  };

  // Handle form submission
  $scope.handleSubmit = function() {
    if ($scope.isEditing) {
      $scope.updateUser();
    } else {
      $scope.addUser();
    }
  };
});
