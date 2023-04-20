// Get the html elements
var dayInput = document.querySelector("#day");
var dayError = document.querySelector(".day-error");
var dayLabel = document.querySelector(".day-label");
var daysResult = document.querySelector(".days-result");

var monthInput = document.querySelector("#month");
var monthError = document.querySelector(".month-error");
var monthLabel = document.querySelector(".month-label");
var monthsResult = document.querySelector(".months-result");

var yearInput = document.querySelector("#year");
var yearError = document.querySelector(".year-error");
var yearLabel = document.querySelector(".year-label");
var yearsResult = document.querySelector(".years-result");

var error = document.querySelectorAll(".error");
var label = document.querySelectorAll("label");
var inputField = document.querySelectorAll("input");

var calculateButton = document.querySelector("#calculate");

// function to show relevant error messages
function setError(input, label, error, message) {
  error.innerHTML = message;
  input.style.border = `1px solid var(--color-primary-light-red)`;
  label.style.color = `var(--color-primary-light-red)`;
}

// Add an click event listener to the calculate button
calculateButton.addEventListener("click", function () {
  // Get the values of the user input
  var day = parseInt(dayInput.value);
  var month = parseInt(monthInput.value);
  var year = parseInt(yearInput.value);

  // Create a date object from the user input
  var birthDate = new Date(year + "-" + month + "-" + day); // Use a standard format

  // Check if the input is valid and show relevant error
  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    error.forEach((element) => {
      element.innerHTML = `This field is required`;
    });
    label.forEach((element) => {
      element.style.color = `var(--color-primary-light-red)`;
    });
    inputField.forEach((element) => {
      element.style.border = `1px solid var(--color-primary-light-red)`;
    });
  } else if (day < 1 || day > 31) {
    setError(dayInput, dayLabel, dayError, `Must be a valid day`);
  } else if (month < 1 || month > 12) {
    setError(monthInput, monthLabel, monthError, `Must be a valid month`);
  } else if (year < 1900) {
    setError(yearInput, yearLabel, yearError, `Must be a valid year`);
  } else if (birthDate > new Date()) {
    error.forEach((element) => {
      element.innerHTML = `Date must be in the past`;
    });
    label.forEach((element) => {
      element.style.color = `var(--color-primary-light-red)`;
    });
    inputField.forEach((element) => {
      element.style.border = `1px solid var(--color-primary-light-red)`;
    });
  } else {
    // Get the current date
    var currentDate = new Date();

    // Convert the difference to years, months and days
    var years = currentDate.getFullYear() - birthDate.getFullYear();
    var months = currentDate.getMonth() - birthDate.getMonth();
    var days = currentDate.getDate() - birthDate.getDate();

    if (months < 0 || (months == 0 && days < 0)) {
      // If the current date is before the birth date in the same year or month
      years--; // Subtract one year from the year difference
      months += 12; // Add 12 months to the month difference
    }

    if (days < 0) {
      // If the current date is before the birth date in the same month
      months--; // Subtract one month from the month difference
      days += new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        0
      ).getDate(); // Add the number of days in the previous month to the day difference
    }

    // Display the results
    yearsResult.innerHTML = years;
    monthsResult.innerHTML = months;
    daysResult.innerHTML = days;
  }
});
