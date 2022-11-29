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
let mainContainer = document.getElementById("myData");
for (let i = 0; i < data.length; i++) {
    let div = document.createElement("div");
    div.innerHTML = 'ID : ' + data[i].id + ' Date Debut : ' + data[i].dateDebut+ ' Date Fin : '+ data[i].dateFin;
    //Création d'un formulaire pour la suppression d'un bouton
    let formDelete = document.createElement("form");
    formDelete.setAttribute("id", "delete");
    formDelete.setAttribute("action", "/calendrier/delete");
    formDelete.setAttribute("method", "POST");
    //Création du bouton update ouvrant un formulaire pour modifer un RDV
    let buttonUpdate = document.createElement("button");
    buttonUpdate.setAttribute("type", "button");
    buttonUpdate.setAttribute("value", data[i].id);
    buttonUpdate.setAttribute("onclick", "buttonUpdate("+data[i].id+",'"+data[i].titre+"','"+data[i].dateDebut+"','"+data[i].dateFin+"',"+i+")");
    //Création du bouton delete pour supprimer un RDV
    let buttonDelete = document.createElement("button");
    buttonDelete.setAttribute("type", "submit");
    buttonDelete.setAttribute("id", "buttonDelete");
    buttonDelete.setAttribute("value", i);
    //Permet de récupérer le numéro bon de ligne du fichier JSON pour modifier le bon RDV
    let numberUpdate = document.createElement("input");
    numberUpdate.setAttribute("type", "number");
    numberUpdate.setAttribute("name", "nombre");
    numberUpdate.setAttribute("id", "nombre");
    numberUpdate.setAttribute("value", data[i].id);
    numberUpdate.style.visibility = "hidden";
    //Permet de récupérer le numéro bon de ligne du fichier JSON pour supprimer le bon RDV
    let numberDelete = document.createElement("input");
    numberDelete.setAttribute("type", "number");
    numberDelete.setAttribute("id", "numberDelete");
    numberDelete.setAttribute("name", "numberDelete");
    numberDelete.setAttribute("value", i);
    numberDelete.style.visibility = "hidden";
    buttonUpdate.textContent = data[i].id;
    buttonDelete.textContent = i;
    div.appendChild(buttonUpdate);
    div.appendChild(numberUpdate);
    div.appendChild(formDelete);
    formDelete.appendChild(buttonDelete);
    formDelete.appendChild(numberDelete);
    mainContainer.appendChild(div);
}
}

//Fonction affichant la formulaire pour modifier le RDV avec les données déjà insérer
function buttonUpdate(id,titre, debut,fin,i){
    let title = titre;
    let dateDebut = debut.slice(0,10);
    let dateFin = fin.slice(0,10);
    let heureDebut = debut.slice(-5);
    let heureFin = fin.slice(-5);

    //Recupère les données depuis le JSON
    document.getElementById("id").setAttribute("value", id); 
    document.getElementById("titre").setAttribute("value", title); 
    document.getElementById("dateDebut").setAttribute("value", dateDebut);
    document.getElementById("dateFin").setAttribute("value", dateFin);  
    document.getElementById("heureDebut").setAttribute("value", heureDebut); 
    document.getElementById("heureFin").setAttribute("value", heureFin); 
    document.getElementById("nb").setAttribute("value", i); 
    let update = document.getElementById("update");
    update.style.display = "";
}

//Retire l'affichage de l'interface pour modifier un RDV
function Annuler(){
    let update = document.getElementById("update");
    update.style.display = "none";
}