angular.module("contact",[])
    .controller("MainCtrl",[
        "$scope","$http",
        function($scope,$http) {
            $scope.test = "Hello world!";
            $scope.contacts = [];

        $scope.addContacts = function() {
            if($scope.number === "") { return; }
            // Add the contact
            console.log("In addContacts with "+$scope.name);
            $scope.create({
                name: $scope.name,
                number: $scope.number
            });

            $scope.name = "";
            $scope.number = "";
        };

        $scope.getAll = function() {
            return $http.get("/contacts").success(function(data){
                angular.copy(data, $scope.contacts);
            });
        };
        $scope.getAll();

        $scope.create = function(contact) {
            return $http.post("/contacts", contact).success(function(data){
                $scope.contacts.push(data);
            });
        };

        $scope.delete = function(contact) {
            $http.delete("/contacts/" + contact._id )
                .success(function(data){
                    console.log("delete worked");
                    $scope.alertType = "alert alert-success";
                    $scope.alertMSG = "Deleted " + contact.name + " from contacts";
                });
            $scope.getAll();
        };

        /* Function to send an SMS message using API built by Dan Kindt. */
        $scope.sendSMS = function(contact) {
            var name = contact.name;
            var phoneNumber = contact.number;
            console.log("Attempting to send SMS to " + name);
            $http({
                url: "https://www.searchit.today/send-sms",
                method: "POST",
                data: {
                    "fName":    name,
                    "pNum":     phoneNumber
                },
                headers: {
                    "Accept": "application/json, text/plain, */*",
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                transformRequest: function (obj) {
                    var str = [];
                    for(var p in obj) {
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    };
                    return str.join("&");
                }

            }).then(function successCallback(response) {
                var data = response.data;
                console.log("SMS sent response: " + data);
                $scope.alertType = "alert alert-info";
                $scope.alertMSG = data;

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

