let todaysDate = new Date(); // Today's date
let currentMonth = todaysDate.getMonth();
let currentYear = todaysDate.getFullYear();

let months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

let monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);
function jump(){
let monthSelect = document.getElementById("month").value;
let yearSelect = document.getElementById("year").value;
    showCalendar(monthSelect, yearSelect);
}
// Displays next month
function nextMonth() {
    if (currentMonth === 11){ // If currentMonth is December...
        currentYear = currentYear + 1; //... Increase currentYear number
    }
    currentMonth = (currentMonth + 1) % 12; // currentMonth modulo 12. Always between 0 and 11
    showCalendar(currentMonth, currentYear); // Show new calendar
}

function todaysMonth() {
    showCalendar(todaysDate.getMonth(), todaysDate.getFullYear());
}

// Displays previous month
function previousMonth() {
    if (currentMonth === 0){ // If currentMonth is January...
        currentYear = currentYear - 1; //... Decrease currentYear number
        currentMonth = 11; //... currentMonth becomes December
    }
    else{
        currentMonth = currentMonth - 1;
    }
    showCalendar(currentMonth, currentYear); // Show new calendar
}

// Method to generate and display (fill) the calendar grid
function showCalendar(month, year) {

    let firstDayOfMonth = (new Date(year, month)).getDay(); // Gets the first day of the month number ID
    firstDayOfMonth = firstDayOfMonth + (firstDayOfMonth == 0 ? 6 : -1); // Converts so than Monday = 0... Sunday = 6
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    let table = document.getElementById("calendar-body");
    table.innerHTML = ""; // Clears all table cells

    monthAndYear.innerHTML = months[month] + " " + year;

    // Create all calendar cells
    let date = 1; // Keeps track of which date has been processed
    for(let i = 0; i < 6; i++){
        let row = document.createElement("tr"); // Create a new row in the table, one for each week

        for(let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDayOfMonth) { // For each cell on the first row, before the first day of the month
                let cell = document.createElement("td"); // Create new cell
                let cellText = document.createTextNode(""); // Empty string for the cell text
                cell.appendChild(cellText); // Put the text in the cell
                row.appendChild(cell); // Put the cell in the row
            }

            else if (date > daysInMonth) {
                break; // Stop everything if the current processed date exceeds the total number of days in that month
            }

            else {
                let cell = document.createElement("td"); // Create new cell
                let cellText = document.createTextNode(date); // Cell text containing the date (starting at 1)
                if (date === todaysDate.getDate() && year === todaysDate.getFullYear() && month === todaysDate.getMonth()) {
                    cell.style.color = 'red';
                } // Make today's date visible
                cell.appendChild(cellText); // Put the text in the cell
                row.appendChild(cell); // Put the cell in the row
                date++; // Date has been processed. Onto the next one
            }
        }
        
        table.appendChild(row); // Put the newly created row (corresponding a week) in the table
    }
}