
document.addEventListener("DOMContentLoaded", function() {
    // Retrieve data from localStorage
    const displayDate = localStorage.getItem("displayDate");
    const displayTime = localStorage.getItem("displayTime");
    const displayDuration = localStorage.getItem("displayDuration");

    const FAtot = localStorage.getItem("FAtot");
    const FCtot = localStorage.getItem("FCtot");
    const SLAtot = localStorage.getItem("SLAtot");
    const SLCtot = localStorage.getItem("SLCtot");
    const Total = localStorage.getItem("Total");

    const FAcount = localStorage.getItem("FAcount");
    const FCcount = localStorage.getItem("FCcount");
    const SLAcount = localStorage.getItem("SLAcount");
    const SLCcount = localStorage.getItem("SLCcount");
    const Infantcount = localStorage.getItem("Infantcount");

    const fullname = localStorage.getItem("fullname");
    const phoneNumber = localStorage.getItem("phoneNumber");
    const Email = localStorage.getItem("Email");
    const gender = localStorage.getItem("gender")

    // Update the summary table 
    document.getElementById("displayDate").textContent = displayDate;
    document.getElementById("displayTime").textContent = displayTime;
    document.getElementById("totalDuration").textContent = displayDuration;

    document.getElementById("FAtot").textContent = FAtot;
    document.getElementById("FCtot").textContent = FCtot;
    document.getElementById("SLAtot").textContent = SLAtot;
    document.getElementById("SLCtot").textContent = SLCtot;
    document.getElementById("Total").textContent = Total;

    document.getElementById("FAcount").textContent = FAcount;
    document.getElementById("FCcount").textContent = FCcount;
    document.getElementById("SLAcount").textContent = SLAcount;
    document.getElementById("SLCcount").textContent = SLCcount;
    document.getElementById("Inafantcount").textContent = Infantcount;

    document.getElementById("fullname").textContent = fullname;
    document.getElementById("phoneNumber").textContent = phoneNumber;
    document.getElementById("Email").textContent = Email;
    document.getElementById("gender").textContent = gender;


});
