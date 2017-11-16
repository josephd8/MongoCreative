angular.module('contact',[])
.controller('MainCtrl',[
  '$scope','$http',
  function($scope,$http) {
	  $scope.test = "Hello world!";

	  $scope.contacts = [
	  ];

	  $scope.addContacts = function() {
		
		  if($scope.number === '') { return; }
    
      // Add the contact
      console.log("In addContacts with "+$scope.name);
      $scope.create({
        name: $scope.name,
        number: $scope.number,
      });
    
      $scope.name = '';
		  $scope.number = '';

	  } //End of addContacts

	  $scope.getAll = function() {
      return $http.get('/contacts').success(function(data){
        angular.copy(data, $scope.contacts);
      });	
  	}; //End of getAll
  	$scope.getAll();

	  $scope.create = function(contact) {
      return $http.post('/contacts', contact).success(function(data){
          $scope.contacts.push(data);
        });
    }; //End of create	

	  $scope.delete = function(contact) {
      $http.delete('/contacts/' + contact._id )
        .success(function(data){
          console.log("delete worked");
        });
      	$scope.getAll();
      }; //End of delete
  
  /* Function to send an SMS message using custom API built by Dan Kindt. */
  $scope.sendSMS = function() {
    console.log("Attempting to send SMS to " + $scope.name);
    
  };


  }
]);

