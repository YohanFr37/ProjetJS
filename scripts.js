let todaysDate = new Date(); // Today's date
let currentMonth = todaysDate.getMonth();
let currentYear = todaysDate.getFullYear();
let currentHours = todaysDate.getHours();
let monthSelect = currentMonth;
let yearSelect = currentYear;
let daySelect = todaysDate.getDate();
let months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

// Variables permettant de gérer l'affichage des 3 vues
let dayTable = document.getElementById("day-table");
let weekTable = document.getElementById("week-table");
let calendar = document.getElementById("month-table");

// Variables permettant de gérer l'affichage des 3 boutons en haut à gauche de chaque vue
let dayButton = document.getElementById("day-button");
let weekButton = document.getElementById("week-button");
let calendarButton = document.getElementById("month-button");

// Récuère l'ID des 3 boutons en haut à droite parmettant de naviguer entre les vues
let btnDay = document.getElementById("day");
let btnWeek = document.getElementById("week");
let btnMonth = document.getElementById("month");

// Information mis à jour en fonction de la vue
let info = document.getElementById("info");


//let semaine = document.getElementById("semaine");

//Calcule la répartition des semaines sur une année
startDate = new Date(yearSelect, 0, 1);
let days = Math.floor((yearSelect - startDate) /
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
// Fonction renvoyant le mois suivant
function nextMonth() {
    if (monthSelect === 11){ // Si le mois est Décembre
        yearSelect = yearSelect + 1; // Incrémente l'année de 1
    }
    monthSelect = (monthSelect + 1) % 12; // currentMonth modulo 12. Always between 0 and 11
    showCalendar(monthSelect, yearSelect); // Mise à jour de la vue du calendrier
}

// Fonction renvoyant le jour suivant
function nextDay() {
    // Si le jour est le dernier du mois renvoie le mois suivant
    if (daySelect === getDaysInMonth(yearSelect, monthSelect+1)){ 
        daySelect = 0;
        nextMonth();
    }
    daySelect = daySelect + 1;
    showDay(); // Mise à jour de la vue "jour"
}

// Fonction renvoyant le jour actuel
function todaysDay() {
    monthSelect = todaysDate.getMonth();
    daySelect = todaysDate.getDate();
    yearSelect = todaysDate.getFullYear();
    showDay();
}

// Fonction renvoyant le mois actuel
function todaysMonth() {
    monthSelect = todaysDate.getMonth();
    daySelect = todaysDate.getDate();
    yearSelect = todaysDate.getFullYear();
    showCalendar(todaysDate.getMonth(), todaysDate.getFullYear());
}

// Fonction permettant d'obtenir le nombre de jour dans un mois
function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
  }


function previousDay(){
    if (daySelect === 1){ // Si le jour est le premier du mois
        daySelect = getDaysInMonth(yearSelect, monthSelect); // Récupère le nombre de jour dans le mois précedent
        previousMonth(); // Renvoie le mois précedent
    }
    else{
        daySelect = daySelect - 1;
    }
    showDay(); // Show new calendar
}

// Fonction renvoyant au mois précedant
function previousMonth() {
    if (monthSelect === 0){ // Si le mois correspond à janvier
        yearSelect = yearSelect - 1; //Décrémente l'année de 1
        monthSelect = 11; //Le mois correspond à descembre
    }
    else{
        monthSelect = monthSelect - 1;
    }
    showCalendar(monthSelect, yearSelect); //Mis à jour du calendrier
}

// Method to generate and display (fill) the calendar grid
function showCalendar(month, year) {


    //Désactive tous les éléments des vues jour et semaines, active celle du mois
    btnMonth.disabled = true;
    btnWeek.disabled = false;
    btnDay.disabled = false;
    dayTable.style.display = "none";
    weekTable.style.display = "none";
    calendar.style.display = "";
    dayButton.style.display = "none";
    weekButton.style.display = "none";
    calendarButton.style.display = "";

    let firstDayOfMonth = (new Date(year, month)).getDay(); // Gets the first day of the month number ID
    firstDayOfMonth = firstDayOfMonth + (firstDayOfMonth == 0 ? 6 : -1); // Converts so than Monday = 0... Sunday = 6
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    let table = document.getElementById("calendar-body");
    table.innerHTML = ""; // Clears all table cells

    info.innerHTML = months[month] + " " + year;

    // Création du calendrier 
    let date = 1; // Keeps track of which date has been processed
    for(let i = 0; i < 6; i++){
        let row = document.createElement("tr"); // Create a new row in the table, one for each week

        for(let j = 0; j < 7; j++) {
            // Création des cellules vides
            if (i === 0 && j < firstDayOfMonth) { 
                let cell = document.createElement("td"); // création d'une nouvelle cellule
                cell.setAttribute("id", "calendrier");
                let cellText = document.createTextNode("");
                cell.appendChild(cellText); // Insère le texte dans la case
                row.appendChild(cell);
                console.log(i+" "+j);

            }

            else if (date > daysInMonth) {

                let cell = document.createElement("td"); // création d'une nouvelle cellule
                cell.setAttribute("id", "calendrier");
                let cellText = document.createTextNode("");
                cell.appendChild(cellText); // Insère le texte dans la case
                row.appendChild(cell);
                console.log(i+" "+j);
                }

            else {
                let cell = document.createElement("td");
                cell.setAttribute("id", "calendrier");
                let cellText = document.createTextNode(date);
                if (date === todaysDate.getDate() && year === todaysDate.getFullYear() && month === todaysDate.getMonth()) {
                    cell.style.color = 'red'; // Met le jour actuel en rouge
                } 
                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
            }
        }
        
        table.appendChild(row); //Ajoute tout le tableau
    }
}

//Affiche la vue "semaine"
function showWeek() {

    //Désactive tous les éléments des vues jour et mois, active celle de "semaine"
    btnDay.disabled = false;
    btnWeek.disabled = true;
    btnMonth.disabled = false;
    dayTable.style.display = "none";
    weekTable.style.display = "";
    calendar.style.display = "none";
    dayButton.style.display = "none";
    weekButton.style.display = "";
    calendarButton.style.display = "none";

    let table = document.getElementById("week-body");
    table.innerHTML = ""; // Clears all table cells
    info.innerHTML = "Semaine";

    // Création du tableau 24x8 de la semaine (1ère colonne : heure, 2nd à 8e : jour de la semaine)
    for(let i = 0; i < 24; i++){
        let row = document.createElement("tr");

        // Création des cellules pour les heures
        for(let j = 0; j < 8; j++) {
            if(j===0){
                let cell = document.createElement("td");
                cell.setAttribute("id", "semaine");
                let cellText = document.createTextNode(i+":00");
    
                cell.appendChild(cellText);
                row.appendChild(cell);
            // Création des cellules pour chaque jours de la semaine
            } else {
                let cell = document.createElement("td");
                cell.setAttribute("id", "semaine");
                let cellText = document.createTextNode("");
    
                cell.appendChild(cellText);
                row.appendChild(cell);
            }   
        }      
        table.appendChild(row);
    }
}

//Idem mais avec "jour"
function showDay() {

    //Désactive tous les éléments des vues semaine et mois, active celle de "jour"
    btnDay.disabled = true;
    btnWeek.disabled = false;
    btnMonth.disabled = false;
    dayTable.style.display = "";
    weekTable.style.display = "none";
    calendar.style.display = "none";
    dayButton.style.display = "";
    weekButton.style.display = "none";
    calendarButton.style.display = "none";

    
    let table = document.getElementById("day-body");
    table.innerHTML = ""; // Clears all table cells
    
    //Affiche en haut et au centre de la page les informations concernant le jour, mois et année
    info.innerHTML = daySelect + "/" + Number(monthSelect+1) + "/" + yearSelect;

    //Création d'un tableau de 24x2 (1ère colonne: heures, 2nd colonne: agenda)
    for(let i = 0; i < 24; i++){
        let row = document.createElement("tr"); // Création d'un tableau

        for(let j = 0; j < 2; j++) {
            if(j===0){
                // Création des cellules pour les heures
                let cell = document.createElement("td");
                cell.setAttribute("id", "jour");
                let cellText = document.createTextNode(i+":00"); //Insère le texte pour les heure ex "08:00"

                cell.appendChild(cellText);
                row.appendChild(cell);
            } else {
                // Création des cellules pour la partie agenda
                let cell = document.createElement("td");
                cell.setAttribute("id", "jour");
                let cellText = document.createTextNode("");
    
                cell.appendChild(cellText);
                row.appendChild(cell);

            }
            
        }
        
        table.appendChild(row);
    }
}

function test() {
      document.location.href="test";

  }