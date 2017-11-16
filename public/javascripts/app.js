
angular.module('contact',[])
.controller('MainCtrl',[
  '$scope','$http',
  function($scope,$http) {
	$scope.test = "Hello world!";


	$scope.contacts = [
		
			

	];

	$scope.addContacts = function() {
		
		//var newobj = {title:$scope.formContent,upvotes:0}
		//$scope.comments.push(newobj);

		if($scope.number === '') { return; }
      		console.log("In addComment with "+$scope.name);
      		$scope.create({
        	name: $scope.name,
        	number: $scope.number,
      		});
      		$scope.name = '';
		$scope.number = '';

	}


	$scope.getAll = function() {
    		return $http.get('/contacts').success(function(data){
      			angular.copy(data, $scope.contacts);
    		});	
  	};
  	$scope.getAll();

	$scope.create = function(contact) {
    		return $http.post('/contacts', contact).success(function(data){
      			$scope.contacts.push(data);
    		});
  	};	

	$scope.delete = function(contact) {
      		$http.delete('/contacts/' + contact._id )
        	.success(function(data){
          		console.log("delete worked");
        	});
      		$scope.getAll();
    	};

  }
]);

