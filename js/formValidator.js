/*
Name: formValidator.js
Author: Neil Agor
Date: June 16, 2016
Description:
    Validates HTML form elements using vanilla JS
*/

var name = "";
var sex = "";
var education = [];
var notes = "";
var car = "";
var street = "";
var city = "";
var phone = "";
var email = "";
var displayInfo = document.getElementById('displayInfo');

function validateAll(form){
    
    name = form.name.value;
    sex = form.sex.value;
    notes = form.notes.value;
    
    var educationAttained = form.educAttained;
    for(var i = 0; i < educationAttained.length; i++){
        if(educationAttained[i].checked){
            education.push(educationAttained[i].value);
        }
    }
    
    car = form.car.value;
    street = form.street.value;
    city = form.city.value;
    phone = form.phone.value;
    email = form.email.value;
    
    /* for debugging only */
    displayInfo.innerHTML = "Name: " + name + "<br>";
    displayInfo.innerHTML += "Sex: " + sex + "<br>";
    displayInfo.innerHTML += "Education: " + education.join(', ') + "<br>";
    displayInfo.innerHTML += "Notes: " + notes + "<br>";
    displayInfo.innerHTML += "Car: " + car + "<br>";
    displayInfo.innerHTML += "Street: " + street + "<br>";
    displayInfo.innerHTML += "City: " + city + "<br>";
    displayInfo.innerHTML += "Phone: " + phone + "<br>";
    displayInfo.innerHTML += "Email: " + email + "<br>";
}


function editNodeText(regex, input, helpId, fieldName){
    
    if(input.trim().length > 1){
        while(helpId.childNodes[0]){
            helpId.removeChild(helpId.childNodes[0]);
        }
        
        if(!regex.test(input)){
            helpId.appendChild(document.createTextNode("Enter valid " + fieldName));
        }else{
            helpId.appendChild(document.createTextNode(fieldName + ": " + input));
        }
    }else{
        
        while(helpId.childNodes[0]){
            helpId.removeChild(helpId.childNodes[0]);
        }
        
        helpId.appendChild(document.createTextNode("Enter your " + fieldName));
    }
}

function isTheFieldEmpty(inputField, helpId,fieldName){
    return editNodeText(/^[A-Za-z\.\' \-]{1,15}\s?[A-Za-z\.\' \-]{1,15}\s?[A-Za-z\.\' \-]{1,15}/, inputField.value, helpId, fieldName);
}

function isAddressOK(inputField, helpId, fieldName){
    return editNodeText(/^#?[A-Za-z0-9\.\' \-]{5,30}$/, inputField.value, helpId, fieldName);
}

function isPhoneOK(inputField, helpId, fieldName){
    return editNodeText(/^([0-9]( |-)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-)?([0-9]{3}( |-)?[0-9]{4}|[a-zA-Z0-9]{7})$/, inputField.value, helpId, fieldName);
}

function isEmailOK(inputField, helpId, fieldName){
    return editNodeText(/^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/, inputField.value, helpId, fieldName);
}









































