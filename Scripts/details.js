

function detailsValidateForm() {
    let fullnameValue = document.getElementById("fullname").value;
    let emailValue = document.getElementById("Email").value;
    let confirmEmailValue = document.getElementById("confirmEmail").value;
    let phoneNumberValue = document.getElementById("phoneNumber").value;
    let genderValue = document.getElementById("Gender").value;
    let isValid = true;
    
    if (fullnameValue.trim() === "") {
      document.getElementById("nameError").innerHTML = "Full name is required";
      isValid = false;
    } else {
      document.getElementById("nameError").innerHTML = "";
    }
    
    if (emailValue.trim() === "") {
      document.getElementById("emailError").innerHTML = "Email is required";
      isValid = false;
    } else if (!isValidEmail(emailValue)) {
      document.getElementById("emailError").innerHTML = "Provide a valid email address";
      isValid = false;
    } else {
      document.getElementById("emailError").innerHTML = "";
    }
    
    if (confirmEmailValue.trim() === "") {
      document.getElementById("confirmEmailError").innerHTML = "Please confirm your email";
      isValid = false;
    } else if (confirmEmailValue !== emailValue) {
      document.getElementById("confirmEmailError").innerHTML = "Emails don't match";
      isValid = false;
    } else {
      document.getElementById("confirmEmailError").innerHTML = "";
    }
    
    if (phoneNumberValue.trim() === "") {
      document.getElementById("phoneError").innerHTML = "Phone number is required";
      isValid = false;
    } else {
      document.getElementById("phoneError").innerHTML = "";
    }
    
    if (genderValue.trim() === "") {
      document.getElementById("genderError").innerHTML = "Please select gender";
      isValid = false;
    } else {
      document.getElementById("genderError").innerHTML = "";
    }
    
    if (isValid) {
      localStorage.setItem("fullname", fullnameValue);
      localStorage.setItem("Email", emailValue);
      localStorage.setItem("phoneNumber", phoneNumberValue);
      localStorage.setItem("gender", genderValue);
      // If all inputs are valid, redirect to payment.html
      window.location.href = "Payment.html";
    }
    
    return false; // Prevent form submission 
    }
    
    function isValidEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
    }
    
    