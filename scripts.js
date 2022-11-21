let todaysDate = new Date(); // Today's date
let currentMonth = todaysDate.getMonth();
let currentYear = todaysDate.getFullYear();
let monthSelect = currentMonth;
let yearSelect = currentYear;
let months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

let dayTable = document.getElementById("day-table");
let weekTable = document.getElementById("week-table");
let calendar = document.getElementById("month-table");
let btnDay = document.getElementById("day");
let btnWeek = document.getElementById("week");
let btnMonth = document.getElementById("month");

let monthAndYear = document.getElementById("monthAndYear");

startDate = new Date(todaysDate.getFullYear(), 0, 1);
let days = Math.floor((todaysDate - startDate) /
(24 * 60 * 60 * 1000));
let weekNumber = Math.ceil(days / 7);
// Display the calculated result       
//alert(weekNumber);

showDay();
showWeek();
showCalendar(currentMonth, currentYear);
function jump(){
monthSelect = +document.getElementById("monthSelect").value;
yearSelect = +document.getElementById("yearSelect").value;
    showCalendar(monthSelect, yearSelect);
}
// Displays next month
function nextMonth() {
    if (monthSelect === 11){ // If currentMonth is December...
        alert(typeof yearSelect);
        yearSelect = yearSelect + 1; //... Increase currentYear number
        alert(yearSelect);
    }
    monthSelect = (monthSelect + 1) % 12; // currentMonth modulo 12. Always between 0 and 11
    showCalendar(monthSelect, yearSelect); // Show new calendar
}

function todaysMonth() {
    monthSelect = todaysDate.getMonth();
    yearSelect = todaysDate.getFullYear();
    showCalendar(todaysDate.getMonth(), todaysDate.getFullYear());
}

// Displays previous month
function previousMonth() {
    if (monthSelect === 0){ // If currentMonth is January...
        yearSelect = yearSelect - 1; //... Decrease currentYear number
        monthSelect = 11; //... currentMonth becomes December
    }
    else{
        monthSelect = monthSelect - 1;
    }
    showCalendar(monthSelect, yearSelect); // Show new calendar
}

// Method to generate and display (fill) the calendar grid
function showCalendar(month, year) {

    btnMonth.disabled = true;
    btnWeek.disabled = false;
    btnDay.disabled = false;
    dayTable.style.display = "none";
    weekTable.style.display = "none";
    calendar.style.display = "";

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
                cell.setAttribute("id", "calendrier");
                let cellText = document.createTextNode(""); // Empty string for the cell text
                cell.appendChild(cellText); // Put the text in the cell
                row.appendChild(cell); // Put the cell in the row
                console.log(i+" "+j);

            }

            else if (date > daysInMonth) {
                break; // Stop everything if the current processed date exceeds the total number of days in that month
            }

            else {
                let cell = document.createElement("td"); // Create new cell
                cell.setAttribute("id", "calendrier");
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
}// Method to generate and display (fill) the calendar grid
function showWeek() {

    btnDay.disabled = false;
    btnWeek.disabled = true;
    btnMonth.disabled = false;
    dayTable.style.display = "none";
    weekTable.style.display = "";
    calendar.style.display = "none";

    let table = document.getElementById("week-body");
    table.innerHTML = ""; // Clears all table cells
    // Create all calendar cells
    for(let i = 0; i < 24; i++){
        let row = document.createElement("tr"); // Create a new row in the table, one for each week

        for(let j = 0; j < 8; j++) {
            if(j===0){
                let cell = document.createElement("td"); // Create new cell
                cell.setAttribute("id", "semaine");
                let cellText = document.createTextNode(i+":00"); // Cell text containing the date (starting at 1)
    
                cell.appendChild(cellText); // Put the text in the cell
                row.appendChild(cell); // Put the cell in the row
            } else {
                let cell = document.createElement("td"); // Create new cell
                cell.setAttribute("id", "semaine");
                let cellText = document.createTextNode(""); // Cell text containing the date (starting at 1)
    
                cell.appendChild(cellText); // Put the text in the cell
                row.appendChild(cell); // Put the cell in the row
            }   
        }      
        table.appendChild(row); // Put the newly created row (corresponding a week) in the table
    }
}


// Method to generate and display (fill) the calendar grid
function showDay() {

    btnDay.disabled = true;
    btnWeek.disabled = false;
    btnMonth.disabled = false;
    dayTable.style.display = "";
    weekTable.style.display = "none";
    calendar.style.display = "none";

    let table = document.getElementById("day-body");
    table.innerHTML = ""; // Clears all table cells
    // Create all calendar cells
    for(let i = 0; i < 24; i++){
        let row = document.createElement("tr"); // Create a new row in the table, one for each week

        for(let j = 0; j < 2; j++) {
            if(j===0){
                let cell = document.createElement("td"); // Create new cell
                cell.setAttribute("id", "jour");
                let cellText = document.createTextNode(i+":00"); // Cell text containing the date (starting at 1)
    
                cell.appendChild(cellText); // Put the text in the cell
                row.appendChild(cell); // Put the cell in the row
            } else {
                let cell = document.createElement("td"); // Create new cell
                cell.setAttribute("id", "jour");
                let cellText = document.createTextNode(""); // Cell text containing the date (starting at 1)
    
                cell.appendChild(cellText); // Put the text in the cell
                row.appendChild(cell); // Put the cell in the row

            }
            
        }
        
        table.appendChild(row); // Put the newly created row (corresponding a week) in the table
    }
}