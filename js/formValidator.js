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

var educationObj = new ObjectField([], true, undefined, "Education", 0);//not used

var addressObj = new ObjectField("", false, document.getElementById('street_help'), "Ex. #123 Main St.", 10);

var cityObj = new ObjectField("", false, document.getElementById('city_help'), "Ex. Quezon City", 8);

var phoneObj = new ObjectField("", false, document.getElementById('phone_help'), "Ex. 09277691525", 7);

var emailObj = new ObjectField("", false, document.getElementById('email_help'), "neil@mysite.com", 8);

var carObj = new ObjectField("", false, document.getElementById('car_help'), "Choose your favorite car", 0);

var dateObj = new ObjectField("", false, document.getElementById('date_help'), "Enter date", 0);

var listOfInvalidField = [];

listOfInvalidField.push(nameObj);
listOfInvalidField.push(sexObj);
listOfInvalidField.push(usernameObj);
listOfInvalidField.push(passwordObj);
listOfInvalidField.push(carObj);
listOfInvalidField.push(addressObj);
listOfInvalidField.push(cityObj);
listOfInvalidField.push(phoneObj);
listOfInvalidField.push(emailObj);
listOfInvalidField.push(dateObj);


function validateAll(form){
    
    //check for valid fields, then remove it from the array
    for(var i = 0; i < listOfInvalidField.length; i++){
        //list all objects in listOfInvalidField
        if(listOfInvalidField[i].valid === true){
            
            var objIndex = listOfInvalidField.indexOf(listOfInvalidField[i]);
            
            listOfInvalidField.splice(objIndex, 1);
            
            //substract 1 from index
            i--;
        }
    }
    
    //check listOfInvalidField for invalid fields
    if(listOfInvalidField.length > 0){
        alert("validate all");
        
        //display all invalid fields
        for(var i = 0; i < listOfInvalidField.length; i++){
            
            showInvalid(listOfInvalidField[i].helpId);
            
            removeChildNodes(listOfInvalidField[i].helpId);
            sendMessageToHelpId(listOfInvalidField[i].helpId, listOfInvalidField[i].errMsg);
            
            
        }
    }else{
        //push all checked values to array
        var educationAttained = form.educAttained;
        for(var i = 0; i < educationAttained.length; i++){
            if(educationAttained[i].checked){
                education.push(educationAttained[i].value);
            }
        }
        
        var educationStr = "";
        if(education.length > 0){
            for(var i = 0; i < education.length; i++){
                educationStr += education[i] + ", ";
            }
        }
        
        //create JSON obj for DB
        var userObj = {
            name: nameObj.value,
            sex: sexObj.value,
            username: usernameObj.value,
            password: passwordObj.value,
            education: educationStr,
            notes: document.getElementById('notes').value,
            car: carObj.value,
            street: addressObj.value,
            city: cityObj.value,
            phone: phoneObj.value,
            email: emailObj.value,
            date: dateObj.value
        };
        
        console.log(userObj);
        
    }
    
    
    
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

function showValid(helpId){
    helpId.style.display = "inline";
    helpId.style.background = "#228B22";
}

function showInvalid(helpId){
    helpId.style.display = "inline";
    helpId.style.background = "#d45252";
}

function isNameOK(inputField, helpId){
    var isValid = editNodeText(/^[A-Za-z]+[\s-A-Za-z]*[A-Za-z]$/, inputField.value, helpId, nameObj.minLength, nameObj.errMsg);
    if(isValid){
        nameObj.valid = true;
        nameObj.value = inputField.value.trim();
        
        showValid(helpId);
        
    }else{
        nameObj.valid = false;
        nameObj.value = "";
        listOfInvalidField.push(nameObj);
        
        showInvalid(helpId);
    }
}

function setSexToTrue(value, helpId){
    sexObj.value = value;
    sexObj.valid = true;
    removeChildNodes(helpId);
    sendMessageToHelpId(helpId, "Valid");
    
    showValid(helpId);
}

function isTheFieldEmpty(inputField, helpId,fieldName){
    return editNodeText(/^[A-Za-z\.\' \-]{1,15}\s?[A-Za-z\.\' \-]{1,15}\s?[A-Za-z\.\' \-]{1,15}/, inputField.value, helpId, fieldName);
}

function isAddressOK(inputField, helpId){
    var isValid = editNodeText(/^#?[A-Za-z0-9\.\' \-]{5,30}$/, inputField.value, helpId, addressObj.minLength, addressObj.errMsg);
    if(isValid){
        addressObj.valid = true;
        addressObj.value = inputField.value.trim();
        
        showValid(helpId);
        
    }else{
        addressObj.valid = false;
        addressObj.value = "";
        listOfInvalidField.push(addressObj);
        
        showInvalid(helpId);
        
    }
    
}

function isCityOK(inputField, helpId){
    var isValid = editNodeText(/^[A-Za-z0-9\.\' \-]{5,30}$/, inputField.value, helpId, cityObj.minLength, cityObj.errMsg);
    if(isValid){
        cityObj.valid = true;
        cityObj.value = inputField.value.trim();
        
        showValid(helpId);
        
    }else{
        cityObj.valid = false;
        cityObj.value = "";
        listOfInvalidField.push(cityObj);
        
        showInvalid(helpId);
        
    }
    
}

function isPhoneOK(inputField, helpId){
    var isValid = editNodeText(/^[0-9]+$/, inputField.value, helpId, phoneObj.minLength, phoneObj.errMsg);
    if(isValid){
        phoneObj.valid = true;
        phoneObj.value = inputField.value.trim();
        
        showValid(helpId);
    }else{
        phoneObj.valid = false;
        phoneObj.value = "";
        listOfInvalidField.push(phoneObj);
        
        showInvalid(helpId);
    }
}

function isEmailOK(inputField, helpId, fieldName){
    var isValid = editNodeText(/^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/, inputField.value, helpId, emailObj.minLength, emailObj.errMsg);
    if(isValid){
        emailObj.valid = true;
        emailObj.value = inputField.value.trim();
        
        showValid(helpId);
    }else{
        email.valid = false;
        email.value = "";
        listOfInvalidField.push(emailObj);
        
        showInvalid(helpId);
    }
}

function isUsernameOK(inputField, helpId){
    var isValid = editNodeText(/^[A-Za-z]+[A-Za-z0-9_]*/, inputField.value, helpId, usernameObj.minLength, usernameObj.errMsg);
    if(isValid){
        usernameObj.valid = true;
        usernameObj.value = inputField.value.trim();
        
        showValid(helpId);
    }else{
        usernameObj.valid = false;
        usernameObj.value = "";
        listOfInvalidField.push(usernameObj);
        
        showInvalid(helpId);
    }
    
}

function arePasswordsOK(password, password2, helpId){
    if((password.value.trim().length >= passwordObj.minLength) && (password2.value.trim().length >= passwordObj.minLength)){
        
        if(password.value.trim() === password2.value.trim()){
            removeChildNodes(helpId);
            sendMessageToHelpId(helpId, "Passwords match");
            
            passwordObj.valid = true;
            passwordObj.value = password.value.trim();
            
            showValid(helpId);
        }else{
            removeChildNodes(helpId);
            sendMessageToHelpId(helpId, "Passwords must match");
            
            passwordObj.valid = false;
            passwordObj.value = "";
            listOfInvalidField.push(passwordObj);
            
            showInvalid(helpId);
        }
    }else{
        removeChildNodes(helpId);
        sendMessageToHelpId(helpId, "Passwords must be at least 8 characters long");
        
        passwordObj.valid = false;
        passwordObj.value = "";
        listOfInvalidField.push(passwordObj);
    }
}

function setCar(inputField, helpId){
    if(inputField.value != "-Choose one-"){
        carObj.valid = true;
        carObj.value = inputField.value;
        
        showValid(helpId);
        
        removeChildNodes(helpId);
        sendMessageToHelpId(helpId, "Valid");
    }else{
        carObj.valid = false;
        carObj.value = "-Choose one-";
        listOfInvalidField.push(carObj);
        
        showInvalid(helpId);
        
        removeChildNodes(helpId);
        sendMessageToHelpId(helpId, carObj.errMsg);
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
        var splitMonth = monthNum0.value.split('_');
        var monthStr = splitMonth[1];
        var monthNum = parseInt(splitMonth[0]);
        var dayNum = parseInt(dayNum0.value);
        var yearNum = parseInt(yearNum0.value);
        
        var fullDateObj = getFullDateObj(monthNum, dayNum, yearNum);
        if(fullDateObj.isOK){
            dateFinal = monthNum + "/" + dayNum + "/" + yearNum;
            
            dateObj.valid = true;
            dateObj.value = dateFinal;
            
            showValid(document.getElementById('date_help'));
            
            removeChildNodes(document.getElementById('date_help'));//quick-fix
            sendMessageToHelpId(document.getElementById('date_help'), "Date OK");
        
        }else{
            dateObj.valid = false;
            dateObj.value = "";
            listOfInvalidField.push(dateObj);
            
            showInvalid(document.getElementById('date_help'));
            
            removeChildNodes(document.getElementById('date_help'));
            sendMessageToHelpId(document.getElementById('date_help'), fullDateObj.message);
        }
    }else{
        console.log(message);
        
        showInvalid(document.getElementById('date_help'));
        
        removeChildNodes(document.getElementById('date_help'));
        sendMessageToHelpId(document.getElementById('date_help'), dateObj.errMsg);
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

function ObjectField(value, valid, helpId, errMsg, minLength){
    this.value = value;
    this.valid = valid;
    this.helpId = helpId;
    this.errMsg = errMsg;
    this.minLength = minLength;
}


























