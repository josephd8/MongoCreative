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
          $scope.alertType = "alert alert-success";
          $scope.alertMSG = "Deleted " + contact.name + " from contacts";
        });
      	$scope.getAll();
      }; //End of delete
  
  /* Function to send an SMS message using custom API built by Dan Kindt. */
  $scope.sendSMS = function(contact) {
    console.log("Attempting to send SMS to " + contact.name);
    $http({
      url: "https://www.searchit.today/send-sms",
      method: "POST",
      data: {
        "fName": contact.name,
        "pNum": contact.number,
      },
      headers: {
        "Accept": "application/json, text/plain, */*",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      transformRequest: function(o) {
        var str = [];
        for(var p in o) {
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(o[p]));
        };
        return str.join("&");
      } //End of transformRequest

    }).then(function successCallback(response) {
      console.log("success! response: " + response.data);
      var msg = "Successfully sent SMS to " + contact.name + " using " + 
        contact.number + ". Response: " + response.data;
      $scope.alertType = "alert alert-success";
      $scope.alertMSG = msg;

    }, function errorCallback(response) {
      console.log("failed! statusText: " + response.statusText);
      $scope.alertType = "alert alert-danger";
      var errorMsg = "Unable to send SMS.  Status Text: ";
      errorMsg += response.statusText;
      $scope.alertMSG = errorMsg;
    });
  };


  }
]);

