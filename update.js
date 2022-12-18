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
}
}

//Fonction affichant la formulaire pour modifier le RDV avec les données déjà insérer
function buttonUpdate(id,titre, debut,fin,i,u){
    let title = titre;
    let dateDebut = debut.slice(0,10);
    let dateFin = fin.slice(0,10);
    let heureDebut = debut.slice(-5);
    let heureFin = fin.slice(-5);
    console.log(id);
    console.log(titre);
    console.log(debut);
    console.log(fin);
    console.log(i);
    //Recupère les données depuis le JSON
    document.getElementById("idUpdate").setAttribute("value", id); 
    document.getElementById("titreUpdate").setAttribute("value", title); 
    document.getElementById("dateDebutUpdate").setAttribute("value", dateDebut);
    document.getElementById("dateFinUpdate").setAttribute("value", dateFin);  
    document.getElementById("heureDebutUpdate").setAttribute("value", heureDebut); 
    document.getElementById("heureFinUpdate").setAttribute("value", heureFin); 
    document.getElementById("nbUpdate").setAttribute("value", i);     
    document.getElementById("idDelete").setAttribute("value", i); 
    document.getElementById("buttonDelete").setAttribute("value", i); 

    document.getElementById("idUpdateDay").setAttribute("value", id); 
    document.getElementById("titreUpdateDay").setAttribute("value", title); 
    document.getElementById("dateDebutUpdateDay").setAttribute("value", dateDebut);
    document.getElementById("dateFinUpdateDay").setAttribute("value", dateFin);  
    document.getElementById("heureDebutUpdateDay").setAttribute("value", heureDebut); 
    document.getElementById("heureFinUpdateDay").setAttribute("value", heureFin); 
    document.getElementById("nbUpdateDay").setAttribute("value", i); 
    document.getElementById("idDeleteDay").setAttribute("value", i); 
    document.getElementById("buttonDeleteDay").setAttribute("value", i); 

    document.getElementById("idUpdateWeek").setAttribute("value", id); 
    document.getElementById("titreUpdateWeek").setAttribute("value", title); 
    document.getElementById("dateDebutUpdateWeek").setAttribute("value", dateDebut);
    document.getElementById("dateFinUpdateWeek").setAttribute("value", dateFin);  
    document.getElementById("heureDebutUpdateWeek").setAttribute("value", heureDebut); 
    document.getElementById("heureFinUpdateWeek").setAttribute("value", heureFin); 
    document.getElementById("nbUpdateWeek").setAttribute("value", i);     
    document.getElementById("idDeleteWeek").setAttribute("value", i); 
    document.getElementById("buttonDeleteWeek").setAttribute("value", i); 

    let update = document.getElementById("update");
    let updateWeek = document.getElementById("updateWeek");
    let updateDay = document.getElementById("updateDay");
    if(u ==0){
        update.style.display = "";
    } else if (u==1){
        updateWeek.style.display = "";
    } else{
        updateDay.style.display = "";
    }
}

//Retire l'affichage de l'interface pour modifier un RDV
function Annuler(u){
    let update = document.getElementById("update");
    let updateWeek = document.getElementById("updateWeek");
    let updateDay = document.getElementById("updateDay");
    if(u ==0){
        update.style.display = "none";
    } else if (u==1){
        updateWeek.style.display = "none";
    } else{
        updateDay.style.display = "none";
    }
}