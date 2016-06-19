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


var nameObj = new ObjectField("", false, document.getElementById('name_help'), "Name must contain at least 5 letters and spaces only.", 5);

var sexObj = new ObjectField("", false, document.getElementById('sex_help'), "You must choose one of the sexes", 0);

var usernameObj = new ObjectField("", false, document.getElementById('username_help'), "Username must consist of at least 8 characters", 8);

var passwordObj = new ObjectField("", false, document.getElementById('password_help'), "Passwords must match.", 8);

//push(obj) - store obj in array
//delete array[index] - delete obj in array

var listOfInvalidField = [];

var listOfValidatedField = [];
//list all required fields in listOfInvalidField

listOfInvalidField.push(nameObj);
listOfInvalidField.push(sexObj);
listOfInvalidField.push(usernameObj);
listOfInvalidField.push(passwordObj);


function validateAll(form){
    //console.log("length of invalid: " + listOfInvalidField.length);
    //check for valid fields, then remove it from the array
    for(var i = 0; i < listOfInvalidField.length; i++){
        //list all objects in listOfInvalidField
        //console.log(listOfInvalidField[1]);
        //console.log("value of i: " + i);
        
        if(listOfInvalidField[i].valid === true){
            //console.log("This obj must not be here");
            //console.log(listOfInvalidField[i]);
            
            var objIndex = listOfInvalidField.indexOf(listOfInvalidField[i]);
            
            //console.log("Valid object. index: " + objIndex);
            //show what index will be deleted
            //console.log(listOfInvalidField[objIndex]);
            listOfInvalidField.splice(objIndex, 1);
            //console.log("length of list after splice: " + listOfInvalidField.length);
            //console.log();
            
            //substract 1 from index
            i--;
        }
    }
    
    //console.log("length of invalid after splice: " + listOfInvalidField.length);
    //check listOfInvalidField for invalid fields
    if(listOfInvalidField.length > 0){
        alert("validate all");
        
        //display all invalid fields
        for(var i = 0; i < listOfInvalidField.length; i++){
            //for debugging - display all invalid
            //console.log(listOfInvalidField[i]);
            
            removeChildNodes(listOfInvalidField[i].helpId);
            sendMessageToHelpId(listOfInvalidField[i].helpId, listOfInvalidField[i].errMsg);
            
            
        }
    }else{
        //create JSON obj for DB
        console.log("Successfully validated objects");
        console.log(nameObj);
        console.log(sexObj);
        console.log(usernameObj);
        console.log(passwordObj);
        
    }
    
    /*
    
    var educationAttained = form.educAttained;
    for(var i = 0; i < educationAttained.length; i++){
        if(educationAttained[i].checked){
            education.push(educationAttained[i].value);
        }
    }
    
    */
}

function removeChildNodes(helpId){
    while(helpId.childNodes[0]){
        helpId.removeChild(helpId.childNodes[0]);
    }
}

function sendMessageToHelpId(helpId, message){
    helpId.appendChild(document.createTextNode(message));
}

function editNodeText(regEx, input, helpId, minLength, errMsg){
    if((input.trim().match(regEx)) && (input.trim().length >= minLength)){
        
        removeChildNodes(helpId);
        sendMessageToHelpId(helpId, "Valid");
        
        return true;
    }else{
        removeChildNodes(helpId);
        sendMessageToHelpId(helpId, errMsg);
        return false;
    }
}

function isNameOK(inputField, helpId){
    var isValid = editNodeText(/^[A-Za-z]+[\s-A-Za-z]*[A-Za-z]$/, inputField.value, helpId, nameObj.minLength, nameObj.errMsg);
    if(isValid){
        nameObj.valid = true;
        nameObj.value = inputField.value.trim();
    }else{
        nameObj.valid = false;
        nameObj.value = "";
        listOfInvalidField.push(nameObj);
    }
}

function setSexToTrue(value, helpId){
    sexObj.value = value;
    sexObj.valid = true;
    removeChildNodes(helpId);
    sendMessageToHelpId(helpId, "Valid");
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

function isUsernameOK(inputField, helpId){
    var isValid = editNodeText(/^[A-Za-z]+[A-Za-z0-9_]*/, inputField.value, helpId, usernameObj.minLength, usernameObj.errMsg);
    if(isValid){
        usernameObj.valid = true;
        usernameObj.value = inputField.value.trim();
    }else{
        usernameObj.valid = false;
        usernameObj.value = "";
        listOfInvalidField.push(usernameObj);
    }
    
}

function arePasswordsOK(password, password2, helpId){
    if((password.value.trim().length >= passwordObj.minLength) && (password2.value.trim().length >= passwordObj.minLength)){
        
        if(password.value.trim() === password2.value.trim()){
            removeChildNodes(helpId);
            sendMessageToHelpId(helpId, "Passwords match");
            
            passwordObj.valid = true;
            passwordObj.value = password.value.trim();
        }else{
            removeChildNodes(helpId);
            sendMessageToHelpId(helpId, "Passwords must match");
            
            passwordObj.valid = false;
            passwordObj.value = "";
            listOfInvalidField.push(passwordObj);
        }
    }else{
        removeChildNodes(helpId);
        sendMessageToHelpId(helpId, "Passwords must be at least 8 characters long");
        
        passwordObj.valid = false;
        passwordObj.value = "";
        listOfInvalidField.push(passwordObj);
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
        }else{
            console.log(fullDateObj.message);
        }
    }else{
        console.log(message);
    }

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



/*
validate all fields when submit button is clicked
create an object for each field where flags, helpId, and message will be stored
create an alert box saying check all inputs?
when all inputs are valid, create a JSON object for database
refactor each field's validation
create all object fields with false validity
when submitted check all objects for validity then push into 'invalid' array
'invalid' array must be empty

obj.field
obj.valid
obj.helpId
*/

function ObjectField(value, valid, helpId, errMsg, minLength){
    this.value = value;
    this.valid = valid;
    this.helpId = helpId;
    this.errMsg = errMsg;
    this.minLength = minLength;
}


























