"use strict";

function containsForbiddenCharacters(stringToCheck) {
	return stringToCheck.includes('$')
		|| stringToCheck.includes('{')
		|| stringToCheck.includes('}')
		|| stringToCheck.includes('&')
		|| stringToCheck.includes('|');
}


function dataIsForbidden(dataToCheck) {
	var foundForbidden = false;
	Object.entries(dataToCheck).forEach(([key, value]) => {
    if (containsForbiddenCharacters(`${value}`)) {
			foundForbidden = true;
		}
});
	return foundForbidden;
}


function isNullEmptyOrUndefined(elementToCheck) {
	return elementToCheck !== undefined && elementToCheck !== null && elementToCheck != "";
}

function validateForm(dataToValidate) {
	if (!isNullEmptyOrUndefined(dataToValidate.name) || !isNullEmptyOrUndefined(dataToValidate.email)) {
		alert("Name and Email must not be empty.");
		return false;
	} else if (dataIsForbidden(dataToValidate)) {
		alert("Forbidden special characters detected.");
		return false;
	} else {
		return true;
	}

}


$("#add_user").submit(function(event){
	event.preventDefault();
			var unindexed_array = $(this).serializeArray();
			var data = {}

			$.map(unindexed_array, function(n, i){
					data[n['name']] = n['value']
			})

		if (validateForm(data)) {
			var request = {
					"url" : `http://localhost:3000/api/users`,
					"method" : "POST",
					"data" : data
			}

			$.ajax(request).done(function(response){
					alert("Data Inserted Successfully!");
			})

    }

})


$("#add_event").submit(function(event){
	event.preventDefault();
			var unindexed_array = $(this).serializeArray();
			var data = {}

			$.map(unindexed_array, function(n, i){
					data[n['name']] = n['value']
			})
//		if (validateForm(data)) {  NEED TO VALIDATE LATER
			var request = {
					"url" : `http://localhost:3000/api/events`,
					"method" : "POST",
					"data" : data
			}

			$.ajax(request).done(function(response){
					alert("Data Inserted Successfully!");
			})

//    }

})


$("#update_user").submit(function(event){
    event.preventDefault();

			var unindexed_array = $(this).serializeArray();
			var data = {}

			$.map(unindexed_array, function(n, i){
					data[n['name']] = n['value']
			})

		if (validateForm(data)) {
			var request = {
					"url" : `http://localhost:3000/api/users/${data.id}`,
					"method" : "PUT",
					"data" : data
			}

			$.ajax(request).done(function(response){
					alert("Data Updated Successfully!");
			})

    }

})


$("#update_event").submit(function(event){
    event.preventDefault();

			var unindexed_array = $(this).serializeArray();
			var data = {}

			$.map(unindexed_array, function(n, i){
					data[n['name']] = n['value']
			})

//		if (validateForm(data)) { NEED TO DO VALIDATION LATER
			var request = {
					"url" : `http://localhost:3000/api/event/${data.id}`,
					"method" : "PUT",
					"data" : data
			}

			$.ajax(request).done(function(response){
					alert("Data Updated Successfully!");
			})

//    }

})


//Deletes a user and updates the page to show it
if(window.location.pathname == "/"){
    $(".table tbody td a.delete").click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url" : `http://localhost:3000/api/users/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function(response){
                alert("Data Deleted Successfully!");
                location.reload();
            })
        }

    })
}

//Deletes a user and updates the page to show it
if(window.location.pathname == "/profile"){
    $(".table tbody td a.delete").click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url" : `http://localhost:3000/api/events/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function(response){
                alert("Data Deleted Successfully!");
                location.reload();
            })
        }

    })
}