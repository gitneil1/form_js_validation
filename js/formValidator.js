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
var username = "";
var passwordFinal = "";
var dateFinal = "";

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
    username = form.username.value;
    //passwordFinal
    //dateFinal
    
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
    displayInfo.innerHTML += "Username: " + username + "<br>";
    displayInfo.innerHTML += "Password: " + passwordFinal + "<br>";
    displayInfo.innerHTML += "Date: " + dateFinal + "<br>";
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

function isUsernameOK(inputField, helpId, fieldName){
    return editNodeText(/^[A-Za-z]+[A-Za-z0-9_]*/, inputField.value, helpId, fieldName);
}

function arePasswordsOK(password, password2, helpId, fieldName){
    if(password.value.trim().length > 0 && password2.value.trim().length > 0){
        if(password.value === password2.value){
            while(helpId.childNodes[0]){
                helpId.removeChild(helpId.childNodes[0]);
            }
            
            passwordFinal = password.value;
            helpId.appendChild(document.createTextNode(fieldName + ": " + password.value));
        }
    }else{
        while(helpId.childNodes[0]){
            helpId.removeChild(helpId.childNodes[0]);
        }
        helpId.appendChild(document.createTextNode("Enter your passwords"));
    }
}


function isDayOK(monthNum0, dayNum0, yearNum0){
    var message = "";
    var dayRegEx = /^(\d{1,2})$/;
    var yearRegEx = /^\d{4}$/;
    
    if(monthNum0.value === "-Month-"){
        message += "Choose month";
    }
    
    if(!dayNum0.value.match(dayRegEx)){
        message += "Enter day";
    }
    
    if(!yearNum0.value.match(yearRegEx)){
        message += "Enter year";
    }
    
    if(message == ""){
        console.log("Proceeding to isFullDateOK()");
        
        var splitMonth = monthNum0.value.split('_');
        var monthStr = splitMonth[1];
        var monthNum = parseInt(splitMonth[0]);
        var dayNum = parseInt(dayNum0.value);
        var yearNum = parseInt(yearNum0.value);
        
        console.log(monthNum + " " + dayNum + " " + yearNum);
        
        var fullDateObj = getFullDateObj(monthNum, dayNum, yearNum);
        if(fullDateObj.isOK){
            console.log(fullDateObj.message);
            dateFinal = monthNum + "/" + dayNum + "/" + yearNum;
            alert(dateFinal);
        }else{
            console.log(fullDateObj.message);
        }
    }else{
        console.log(message);
    }

}

function isPatternOK(regEx){
    
}

function showHelpMessage(message){
    
}


function getFullDateObj(monthNum, dayNum, yearNum){
    
    var dateObj = {};
    
    if(((monthNum === 9) || (monthNum === 4) || (monthNum === 6) || (monthNum === 11)) && (yearNum > 2015)){
        if(dayNum > 0 && dayNum < 31){
            dateObj.isOK = true;
            dateObj.message = "30 days ok";
            return dateObj;
        }else{
            dateObj.isOK = false;
            dateObj.message = "September, April, June, November have 30 days. Enter day again";
            return dateObj;
        }
    }else if(((monthNum === 1) || (monthNum === 3) || (monthNum === 5) || (monthNum === 8) || (monthNum === 7) || (monthNum === 10) || (monthNum === 12)) && (yearNum > 2015)){
        if(dayNum > 0 && dayNum < 32){
            dateObj.isOK = true;
            dateObj.message = "31 days ok";
            return dateObj;
        }else{
            dateObj.isOK = false;
            dateObj.message = "Months have a maximum of 31 days. Enter day again.";
            return dateObj;
        }
    }else if(((monthNum === 2) && ((yearNum % 4) === 0)) && (yearNum > 2015)){
        if(dayNum > 0 && dayNum < 30){
            dateObj.isOK = true;
            dateObj.message = "February ok";
            return dateObj;
        }else{
            dateObj.isOK = false;
            dateObj.message = "February has 29 days on leap year. Enter day again.";
            return dateObj;
        }
    }else if(monthNum === 2){
        if(dayNum > 0 && dayNum < 29){
            dateObj.isOK = true;
            dateObj.message = "February ok";
            return dateObj;
        }else{
            dateObj.isOK = false;
            dateObj.message = "February has 28 days on a regular year. Enter day again.";
            return dateObj;
        }
    }
    else{
        dateObj.isOK = false;
        dateObj.message = "Date format incorrect";
        return dateObj;
    }
}






























