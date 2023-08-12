

//TICKETS PAGE JS

// Ticket Increment Decrement
function incrementTicket(ticketId) {
  var ticketSpan = document.getElementById(ticketId);
  var currentValue = parseInt(ticketSpan.textContent);
  ticketSpan.textContent = currentValue + 1;
}

function decrementTicket(ticketId) {
  var ticketSpan = document.getElementById(ticketId);
  var currentValue = parseInt(ticketSpan.textContent);
  ticketSpan.textContent = currentValue - 1;
  ticketSpan.textContent = Math.max(currentValue - 1, 0);
}



// Ticket timeslot selection

const selectTime = document.getElementById('time');
const selectedTimeSlots = [];

selectTime.addEventListener('change', function () {
  const selectedOption = selectTime.options[selectTime.selectedIndex];

  if (selectedOption.value !== '') {
    const timeSlot = selectedOption.textContent;

    // Check if the selected time slot is already in the array
    if (!selectedTimeSlots.includes(timeSlot)) {
      // Check for consecutive selections
      if (selectedTimeSlots.length === 0 || isConsecutive(selectedTimeSlots[selectedTimeSlots.length - 1], timeSlot)) {
        selectedTimeSlots.push(timeSlot);
        // Update the display with the selected time slots
        displaySelectedTimeSlots();
      } else {
        alert('Error: Selected time slots must be consecutive.');
      }
    }
  }
});

function isConsecutive(prevTimeSlot, currentTimeSlot) {
  const prevTime = prevTimeSlot.split(' ')[0];
  const currentTime = currentTimeSlot.split(' ')[0];

  return parseInt(currentTime) === parseInt(prevTime) + 1;
}

function displaySelectedTimeSlots() {
  const selectedTimeSlotsContainer = document.getElementById('selectedTimeSlots');
  selectedTimeSlotsContainer.innerHTML = ''; // Clear the container first

  selectedTimeSlots.forEach(slot => {
    const listItem = document.createElement('li');
    listItem.textContent = slot;
    selectedTimeSlotsContainer.appendChild(listItem);
  });
}




document.addEventListener("DOMContentLoaded", function() {
  const dateInput = document.getElementById("datepicker");
  const today = new Date();
  const options = {
    altInput: true,
      altFormat: "F j, Y",
      dateFormat: "Y-m-d",
      minDate: "today",
      onChange: function(selectedDates, dateStr, instance) {
          dateInput.value = dateStr;
      }
  };

  flatpickr(dateInput, options);

  // Set the default date to today's date
  dateInput._flatpickr.setDate(today);
});






//Adding details to the table on the tickets page


//Date Row
const inputDate = document.getElementById('datepicker');
const displayDate = document.getElementById('displayDate');

inputDate.addEventListener('input', (event)=> {
const typedDate = event.target.value;
displayDate.textContent = typedDate;
localStorage.setItem("displayDate", displayDate.textContent);

});






//Time and Duration Row
document.addEventListener("DOMContentLoaded", function() {
const selectedTimeSlotsDiv = document.getElementById("selectedTimeSlots");
const displayTimeElement = document.getElementById("displayTime");
const displayDurationElement = document.getElementById("displayDuration");
const totalDurationElement = document.getElementById("totalDuration");
const timePicker = document.getElementById("time");


let timeSlots = [];

timePicker.addEventListener("change", function() {
    const selectedOption = timePicker.options[timePicker.selectedIndex];
    const selectedTime = selectedOption.textContent.trim();

    if (selectedTime !== "Select a Time") {
        if (isConsecutiveTimeSlot(selectedTime)) {
            timeSlots.push(selectedTime);
            updateSelectedTimeSlots();
        }
    }
});

function isConsecutiveTimeSlot(selectedTime) {
    const lastSelectedSlot = timeSlots.length > 0 ? timeSlots[timeSlots.length - 1] : null;

    if (!lastSelectedSlot) return true;

    const [lastEndTime, selectedStartTime] = [lastSelectedSlot.split(" - ")[1], selectedTime.split(" - ")[0]];
    return lastEndTime === selectedStartTime;
}

function updateSelectedTimeSlots() {
    // Clear existing content in the selectedTimeSlotsDiv
    selectedTimeSlotsDiv.innerHTML = "";

    // Display each selected time slot as bullet points
    timeSlots.forEach(timeSlot => {
        displayBulletPoint(timeSlot);
    });

    // Combine consecutive time slots into a single range for displayTimeElement
    const combinedTimeSlot = combineConsecutiveTimeSlots();
    displayTimeElement.textContent = combinedTimeSlot;
    localStorage.setItem("displayTime", displayTimeElement.textContent);

    // Calculate and display the total duration in displayDurationElement
    const totalDuration = calculateTotalDuration();
    totalDurationElement.textContent = formatDuration(totalDuration);
    localStorage.setItem("displayDuration", totalDurationElement.textContent);

     }

function combineConsecutiveTimeSlots() {
    const timeRanges = [];
    let start = null;
    let end = null;

    for (const timeSlot of timeSlots) {
        const [startTime, endTime] = timeSlot.split(" - ");

        if (end !== startTime) {
            if (start !== null && end !== null) {
                timeRanges.push(`${start} - ${end}`);
            }
            start = startTime;
        }
        end = endTime;
    }

    // Add the last time range
    if (start !== null && end !== null) {
        timeRanges.push(`${start} - ${end}`);
    }

    return timeRanges.join(", ");
}


function displayBulletPoint(timeSlot) {
    const bulletPoint = document.createElement("p");
    bulletPoint.textContent = "• " + timeSlot;
    selectedTimeSlotsDiv.appendChild(bulletPoint);
}


function calculateTotalDuration() {
    let totalDuration = 0;

    for (const timeSlot of timeSlots) {
        const [startTime, endTime] = timeSlot.split(" - ");
        totalDuration += calculateSlotDuration(startTime, endTime);
    }

    return totalDuration;
}


function calculateSlotDuration(startTime, endTime) {
    const startHour = parseInt(startTime.split(":")[0]);
    const endHour = parseInt(endTime.split(":")[0]);

    const duration = endHour - startHour;
    return duration;
}


function formatDuration(duration) {
    return `${duration}`;
    
}


});






document.addEventListener("DOMContentLoaded", function() {

const ticketDetails = [
{ type: "ForeignerAdult", normalPrice: 10, peakPrice: 13, count: 0 },
{ type: "ForeignerChild", normalPrice: 5, peakPrice: 8, count: 0 },
{ type: "SLAdult", normalPrice: 4, peakPrice: 6, count: 0 },
{ type: "SLChild", normalPrice: 2, peakPrice: 3, count: 0 },
{ type: "Infant", normalPrice: 0, peakPrice: 0, count: 0 },
];

function updateTicketCounts() {

document.getElementById("FAcount").textContent = document.getElementById("ticketNumber3").textContent;
localStorage.setItem("FAcount", document.getElementById("ticketNumber3").textContent);

document.getElementById("FCcount").textContent = document.getElementById("ticketNumber4").textContent;
localStorage.setItem("FCcount", document.getElementById("ticketNumber4").textContent);

document.getElementById("SLAcount").textContent = document.getElementById("ticketNumber1").textContent;
localStorage.setItem("SLAcount", document.getElementById("ticketNumber1").textContent);

document.getElementById("SLCcount").textContent = document.getElementById("ticketNumber2").textContent;
localStorage.setItem("SLCcount", document.getElementById("ticketNumber2").textContent);

document.getElementById("Inafantcount").textContent = document.getElementById("ticketNumber5").textContent;
localStorage.setItem("Infantcount", document.getElementById("ticketNumber5").textContent);


}




// Call updateTicketCounts whenever ticket value changes to get the count of selected tickets
document.querySelectorAll(".ticketValue").forEach((el) => {
el.addEventListener("DOMSubtreeModified", updateTicketCounts);
}); 




});



 function refresh(){
  var fatnp =localStorage.getItem("FAcount")*10;
  var fcnp =localStorage.getItem("FCcount")*5;
  var slanp =localStorage.getItem("SLAcount")*4;
  var slcnp =localStorage.getItem("SLCcount")*2;

  var fatpp =localStorage.getItem("FAcount")*13;
  var fcpp =localStorage.getItem("FCcount")*8;
  var slapp =localStorage.getItem("SLAcount")*6;
  var slcpp =localStorage.getItem("SLCcount")*3;



if(localStorage.getItem("displayTime")=="10:00 - 11:00" || 
localStorage.getItem("displayTime")=="11:00 - 12:00" || 
localStorage.getItem("displayTime")=="12:00 - 13:00" || 
localStorage.getItem("displayTime")=="15:00 - 16:00" || 
localStorage.getItem("displayTime")=="16:00 - 17:00" || 
localStorage.getItem("displayTime")=="17:00 - 18:00"){

  localStorage.setItem("FAtot", fatpp);
  localStorage.setItem("Fctot", fcpp);
  localStorage.setItem("slatot", slapp);
  localStorage.setItem("slctot", slcpp);

  document.getElementById("FAtot").innerText = fatpp+" USD";
  document.getElementById("FCtot").innerText = fcpp+" USD";
  document.getElementById("SLAtot").innerText = slapp+" USD";
  document.getElementById("SLCtot").innerText = slcpp+" USD";

  var total =fatpp+fcpp+slapp+slcpp;
  document.getElementById("Total").innerText = total+" USD";
}else{

  localStorage.setItem("FAtot", fatnp);
  localStorage.setItem("Fctot", fcnp);
  localStorage.setItem("slatot", slanp);
  localStorage.setItem("slctot", slcnp);

  document.getElementById("FAtot").innerText = fatnp+" USD";
  document.getElementById("FCtot").innerText = fcnp+" USD";
  document.getElementById("SLAtot").innerText = slanp+" USD";
  document.getElementById("SLCtot").innerText = slcnp+" USD";



var total =fatnp+fcnp+slanp+slcnp;
 document.getElementById("Total").innerText = total+" USD";
 localStorage.setItem("Total", total+" USD");
}


} 











//----------------------------------------------------------------------------------------------------------------------------------------------

//DETAILS PAGE JS



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












//----------------------------------------------------------------------------------------------------------------------------------------------

//PAYMENT PAGE JS


function paymentValidateForm() {
  let cardNumberValue = document.getElementById("cardNumber").value;
  let expiryDateValue = document.getElementById("expiryDate").value;
  let cvvValue = document.getElementById("CVV").value;
  let nameCardValue = document.getElementById("nameCard").value;
  let isValid = true;

  const cardNumberMaxLength = 16;
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

