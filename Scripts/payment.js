

function paymentValidateForm() {
    const cardNumberValue = document.getElementById("cardNumber").value;
    let expiryDateValue = document.getElementById("expiryDate").value;
    let cvvValue = document.getElementById("CVV").value;
    let nameCardValue = document.getElementById("nameCard").value;
    let isValid = true;
  
    const cardNumberMaxLength = 19;
    const cvvMaxLength = 3;
  
    
    if (cardNumberValue.trim() === "") {
      document.getElementById("cardNumberError").innerHTML = "Card number is required";
      isValid = false;
    } else if (cardNumberValue.length < cardNumberMaxLength) {
      document.getElementById("cardNumberError").innerHTML = "Incomplete Field";
      isValid = false;
    } else {
      document.getElementById("cardNumberError").innerHTML = "";
    }
  
    // Expiry date validation - assuming MM/YY format
    const [expiryMonth, expiryYear] = expiryDateValue.split("/");
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear() % 100; // Get last two digits of the current year
  
    if (expiryDateValue.trim() === ""){
      document.getElementById("expiryDateError").innerHTML = "Expiry date is required";
    }else if (
      isNaN(expiryMonth) ||
      isNaN(expiryYear) ||
      expiryMonth > 12 ||
      expiryMonth < 1 ||
      expiryYear < currentYear ||
      (expiryYear == currentYear && expiryMonth < currentMonth)
    ) {
      document.getElementById("expiryDateError").innerHTML = "Invalid expiry date";
      isValid = false;
    } else {
      document.getElementById("expiryDateError").innerHTML = "";
    }
  
    if (cvvValue.trim() === "") {
      document.getElementById("cvvError").innerHTML = "CVV is required";
      isValid = false;
    } else if (cvvValue.length < cvvMaxLength) {
      document.getElementById("cvvError").innerHTML = "Incomplete Field";
      isValid = false;
    } else {
      document.getElementById("cvvError").innerHTML = "";
    }
  
    if (nameCardValue.trim() === "") {
      document.getElementById("nameCardError").innerHTML = "Name on card is required";
      isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(nameCardValue)) {
      document.getElementById("nameCardError").innerHTML = "Invalid characters in name";
      isValid = false;
    } else {
      document.getElementById("nameCardError").innerHTML = "";
    }
  
    if (isValid) {
      // If all inputs are valid, redirect to Confirmation.html
      window.location.href = "Confirmation.html";
    }
  
    return false; // Prevent form submission as we'll handle it manually
  }
  
 

  const cardNumberInput = document.getElementById("cardNumber");

cardNumberInput.addEventListener("input", (event) => {
    const input = event.target;
    const value = input.value.replace(/\D/g, ""); // Remove non-numeric characters
    const formattedValue = formatCardNumber(value); // Implement this function to format the card number
    input.value = formattedValue;
});

function formatCardNumber(value) {
  const chunkedValue = value.replace(/\s/g, "").match(/.{1,4}/g);
  return chunkedValue ? chunkedValue.join(" ") : value;
}

const expiryDateInput = document.getElementById("expiryDate");

expiryDateInput.addEventListener("input", (event) => {
    const input = event.target;
    const value = input.value.replace(/\D/g, ""); // Remove non-numeric characters
    const formattedValue = formatExpiryDate(value); // Implement this function to format the expiry date
    input.value = formattedValue;
});

function formatExpiryDate(value) {
  const month = value.slice(0, 2);
  const year = value.slice(2, 4);
  return `${month}/${year}`;
}
