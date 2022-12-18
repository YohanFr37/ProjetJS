let todaysDate = new Date(); // Today's date
let currentMonth = todaysDate.getMonth();
let currentYear = todaysDate.getFullYear();
let currentHours = todaysDate.getHours();
let currentDay = todaysDate.getDate();
let monthSelect = currentMonth;
let yearSelect = currentYear;
let daySelect = currentDay;
console.log(daySelect);
let months = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
let englishMonths = ["january", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

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
showDay();
showWeek();
showCalendar(currentMonth, currentYear);
function jump() {
    monthSelect = +document.getElementById("monthSelect").value;
    yearSelect = +document.getElementById("yearSelect").value;
    showCalendar(monthSelect, yearSelect);
}


// Fonction renvoyant le mois suivant
function nextMonth() {
    if (monthSelect === 11) { // Si le mois est Décembre
        yearSelect = yearSelect + 1; // Incrémente l'année de 1
    }
    monthSelect = (monthSelect + 1) % 12; // currentMonth modulo 12. Always between 0 and 11
    showCalendar(monthSelect, yearSelect); // Mise à jour de la vue du calendrier
}

// Fonction renvoyant le jour suivant
function nextDay() {
    // Si le jour est le dernier du mois renvoie le mois suivant
    if (daySelect === getDaysInMonth(yearSelect, monthSelect + 1)) {
        daySelect = 0;
        nextMonth();
    }
    daySelect = daySelect + 1;
    showDay(); // Mise à jour de la vue "jour"
}

// Fonction renvoyant la semaine suivante
function nextWeek() {
    if (daySelect + 7 >= getDaysInMonth(yearSelect, monthSelect + 1)) {
        daySelect = daySelect - getDaysInMonth(yearSelect, monthSelect + 1)
        nextMonth();
    }
    daySelect = daySelect + 7;
    showWeek();
}

// Fonction renvoyant le jour actuel
function todaysDay() {
    monthSelect = todaysDate.getMonth();
    daySelect = todaysDate.getDate();
    yearSelect = todaysDate.getFullYear();
    showDay();
}
// Fonction renvoyant le jour actuel
function todaysWeek() {
    monthSelect = todaysDate.getMonth();
    daySelect = todaysDate.getDate();
    yearSelect = todaysDate.getFullYear();
    showWeek();
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

function previousDay() {
    if (daySelect === 1) { // Si le jour est le premier du mois
        daySelect = getDaysInMonth(yearSelect, monthSelect); // Récupère le nombre de jour dans le mois précedent
        previousMonth(); // Renvoie le mois précedent
    }
    else {
        daySelect = daySelect - 1;
    }
    showDay(); // Show new calendar
}

function previousWeek() {
    if (daySelect <= 7) { // si il est necessaire de reculer de mois
        daySelect = getDaysInMonth(yearSelect, monthSelect) - (7 - daySelect); // Rémet le bon jour dans le mois précedent
        previousMonth();
    }
    else {
        daySelect = daySelect - 7;
    }
    showWeek();
}

// Fonction renvoyant au mois précedant
function previousMonth() {
    if (monthSelect === 0) { // Si le mois correspond à janvier
        yearSelect = yearSelect - 1; //Décrémente l'année de 1
        monthSelect = 11; //Le mois correspond à descembre
    }
    else {
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
    for (let i = 0; i < 6; i++) {
        let k = i + 1;
        let row = document.createElement("tr"); // Create a new row in the table, one for each week
        row.setAttribute("id", "calendar");
        for (let j = 0; j < 7; j++) {
            // Création des cellules vides
            if (i === 0 && j < firstDayOfMonth) {
                let cell = document.createElement("td"); // création d'une nouvelle cellule
                cell.setAttribute("id", `calendrier`);
                let cellText = document.createTextNode("");
                cell.appendChild(cellText); // Insère le texte dans la case
                row.appendChild(cell);
                //console.log(i + " " + j);
            }

            else if (date > daysInMonth) {

                let cell = document.createElement("td"); // création d'une nouvelle cellule
                cell.setAttribute("id", `calendrier`);
                let cellText = document.createTextNode("");
                //buttonUpdate.setAttribute("onclick", "buttonUpdate(" + data[i].id + ",'" + data[i].titre + "','" + data[i].dateDebut + "','" + data[i].dateFin + "'," + i + ")");
                cell.appendChild(cellText); // Insère le texte dans la case
                row.appendChild(cell);
                //console.log(i + " " + j);
            }

            else {
                let cell = document.createElement("td");
                let div = document.createElement("div");
                cell.setAttribute("id", `calendrier`);
                cell.setAttribute("value", date);
                    var t = document.getElementById(`calendrier`); // This have to be the ID of your table, not the tag
                let numeroJourCalendrier = 7*i+j-firstDayOfMonth+1;
                let divText = document.createTextNode(date);
                if (date === todaysDate.getDate() && year === todaysDate.getFullYear() && month === todaysDate.getMonth()) {
                    cell.style.color = 'red'; // Met le jour actuel en rouge
                }
                
                //Affiche les rendez-vous sous forme de bouton sur le calendrier
                const test = fetch('data.json')
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        appendData(data);
                    })
                    .catch(function (err) {
                        console.log('error: ' + err);
                    });
                //Création d'une cellule du calendrier
                div.appendChild(divText);
                cell.appendChild(div);
                row.appendChild(cell);
                function appendData(data) {
                    for (let k = 0; k < data.length; k++) {
                        //Récupère les données du JSON
                        let dateDebut = data[k].dateDebut;
                        let dateFin = data[k].dateFin;
                        //Création des variables récupérant le jour, le mois et l'année
                        let dayDebut = dateDebut.slice(8, 10);
                        let monthDebut = dateDebut.slice(5, 7);
                        let yearDebut = dateDebut.slice(0, 4);
                        //Condition permettant d'afficher un rendez-vous à la bonne journée, au bon mois et à la bonne année
                        if (numeroJourCalendrier == dayDebut && month + 1 == monthDebut && year == yearDebut) {
                            //Affichage de chaque rendez-vous enregistrer depuis le fichier JSON
                            btnData();
                            function btnData(){
                                let buttonUpdate = document.createElement("button");
                                let div = document.createElement("div");
                                buttonUpdate.setAttribute("type", "button");
                                buttonUpdate.setAttribute("id", "buttonUpdate");
                                buttonUpdate.setAttribute("class", "btn btn-primary");
                                buttonUpdate.setAttribute("value", data[k].id);
                                buttonUpdate.setAttribute("onclick", "buttonUpdate("+data[k].id+",'"+data[k].titre+"','"+data[k].dateDebut+"','"+data[k].dateFin+"',"+k+","+0+")");
                                buttonUpdate.textContent = data[k].titre.slice(0,10);
                                //Met des pointillet si le tire fait plus de 10 caractères
                                if(data[k].titre.length > 10){
                                    buttonUpdate.textContent += "...";
                                }
                                //Ajout du RDV sous forme de bouton sur le calendrier
                                cell.appendChild(div);
                                div.appendChild(buttonUpdate);
                            }
                        }
                    }
                }
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

    const tmpDays = new Date(daySelect + englishMonths[monthSelect] + yearSelect);
    //daySelect = daySelect - tmpDays.getDay() + 1;
    // Affichage des chiffres des jours sur la ligne des jours, afin d'avoir une meilleurs visu
    let dayWeek;
    let currentDayWeek = daySelect;
    for (const dayS of ["week-day-lun", "week-day-mar", "week-day-mer", "week-day-jeu", "week-day-ven", "week-day-sam", "week-day-dim"]) {
        dayWeek = document.getElementById(dayS);
        currentDayWeek = currentDayWeek % getDaysInMonth(yearSelect, monthSelect + 1);
        if (currentDayWeek == 0)
            currentDayWeek++;
        dayWeek.innerHTML = currentDayWeek;
        currentDayWeek++;
    }

    let table = document.getElementById("week-body");
    table.innerHTML = ""; // Clears all table cells
    info.innerHTML = months[monthSelect] + " " + yearSelect;

    // Création du tableau 24x8 de la semaine (1ère colonne : heure, 2nd à 8e : jour de la semaine)
    for (let i = 0; i < 24; i++) {
        let row = document.createElement("tr");
        // Création des cellules pour les heures
        for (let j = 0; j < 8; j++) {
            if (j === 0) {
                let cell = document.createElement("td");
                cell.setAttribute("id", "semaine");
                let cellText = document.createTextNode(i + ":00");
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
    info.innerHTML = daySelect + " " + months[monthSelect] + " " + yearSelect;
    //Création d'un tableau de 24x2 (1ère colonne: heures, 2nd colonne: agenda)
    for (let i = 0; i < 24; i++) {
        let row = document.createElement("tr"); // Création d'un tableau
        for (let j = 0; j < 2; j++) {
            if (j === 0) {
                // Création des cellules pour les heures
                let cell = document.createElement("td");
                cell.setAttribute("id", "jour");
                let cellText = document.createTextNode(i + ":00"); //Insère le texte pour les heure ex "08:00"
                cell.appendChild(cellText);
                row.appendChild(cell);
            } else {
                // Création des cellules pour la partie agenda
                let cell = document.createElement("td");
                cell.setAttribute("id", "jour");
                let cellText = document.createTextNode("");
                let numeroJour = daySelect;
                let year = yearSelect;
                let month = monthSelect;
                cell.appendChild(cellText);
                row.appendChild(cell);
                //Affiche les rendez-vous sous forme de bouton sur le calendrier
                const test = fetch('data.json')
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        appendData(data);
                    })
                    .catch(function (err) {
                        console.log('error: ' + err);
                    });
                function appendData(data) {
                    for (let k = 0; k < data.length; k++) {
                        //Récupère les données du JSON
                        let dateDebut = data[k].dateDebut;
                        let dateFin = data[k].dateFin;
                        //Création des variables récupérant le jour, le mois et l'année
                        let dayDebut = dateDebut.slice(8, 10);
                        let monthDebut = dateDebut.slice(5, 7);
                        let yearDebut = dateDebut.slice(0, 4);
                        let heureDebut = dateDebut.slice(11, 13);
                        //console.log(dayDebut+" "+ numeroJour+ " "+monthDebut+" "+ month +" "+year+" "+yearDebut+" "+i+" "+heureDebut);
                        //Condition permettant d'afficher un rendez-vous à la bonne journée, au bon mois et à la bonne année
                        if (i == heureDebut && month + 1 == monthDebut && year == yearDebut && numeroJour == dayDebut) {
                            console.log("coucou");
                            //Affichage de chaque rendez-vous enregistrer depuis le fichier JSON
                            btnDataDay();
                            function btnDataDay(){
                                console.log(k);
                                let buttonUpdate = document.createElement("button");
                                let div = document.createElement("div");
                                buttonUpdate.setAttribute("type", "button");
                                buttonUpdate.setAttribute("id", "buttonUpdate");
                                buttonUpdate.setAttribute("class", "btn btn-primary");
                                buttonUpdate.setAttribute("value", data[k].id);
                                buttonUpdate.setAttribute("onclick", "buttonUpdate("+data[k].id+",'"+data[k].titre+"','"+data[k].dateDebut+"','"+data[k].dateFin+"',"+k+","+2+")");
                                buttonUpdate.textContent = data[k].titre.slice(0,30);
                                //Met des pointillet si le tire fait plus de 10 caractères
                                if(data[k].titre.length > 30){
                                    buttonUpdate.textContent += "...";
                                }
                                //Ajout du RDV sous forme de bouton sur le calendrier
                                cell.appendChild(div);
                                div.appendChild(buttonUpdate);
                            }
                        }
                    }
                }
            }
        }
        table.appendChild(row);
    }
}

function update() {
    //document.location.href = "update";
}


