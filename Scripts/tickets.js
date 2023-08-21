
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
   // const today = new Date();
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
   // dateInput._flatpickr.setDate(today);
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
 // const displayDurationElement = document.getElementById("displayDuration");
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
  
  
  
  function refresh() {
    var fatnp = localStorage.getItem("FAcount") * 10;
    var fcnp = localStorage.getItem("FCcount") * 5;
    var slanp = localStorage.getItem("SLAcount") * 4;
    var slcnp = localStorage.getItem("SLCcount") * 2;
  
    var fatpp = localStorage.getItem("FAcount") * 13;
    var fcpp = localStorage.getItem("FCcount") * 8;
    var slapp = localStorage.getItem("SLAcount") * 6;
    var slcpp = localStorage.getItem("SLCcount") * 3;
  
    var total = 0;
  
    for (const timeSlot of selectedTimeSlots) {
      if (
        timeSlot.includes("10:00 - 11:00") ||
        timeSlot.includes("11:00 - 12:00") ||
        timeSlot.includes("12:00 - 13:00") ||
        timeSlot.includes("15:00 - 16:00") ||
        timeSlot.includes("16:00 - 17:00") ||
        timeSlot.includes("17:00 - 18:00")
      ) {
        total +=
          localStorage.getItem("FAcount") * 13 +
          localStorage.getItem("FCcount") * 8 +
          localStorage.getItem("SLAcount") * 6 +
          localStorage.getItem("SLCcount") * 3;
      } else {
        total +=
          localStorage.getItem("FAcount") * 10 +
          localStorage.getItem("FCcount") * 5 +
          localStorage.getItem("SLAcount") * 4 +
          localStorage.getItem("SLCcount") * 2;
      }
    }
  
    localStorage.setItem("FAtot", total);
   
  
    document.getElementById("FAtot").innerText = fatpp + fatnp + " USD";
    document.getElementById("FCtot").innerText = fcpp + fcnp +" USD";
    document.getElementById("SLAtot").innerText = slapp + slanp + " USD";
    document.getElementById("SLCtot").innerText = slcpp + slcnp +" USD";

    localStorage.setItem("FAtot", document.getElementById("FAtot").innerText);
    localStorage.setItem("FCtot", document.getElementById("FCtot").innerText);
    localStorage.setItem("SLAtot", document.getElementById("SLAtot").innerText);
    localStorage.setItem("SLCtot", document.getElementById("SLCtot").innerText);

  
    document.getElementById("Total").innerText = total + " USD";
    localStorage.setItem("Total", total + " USD");
  }
  
  
    
 


