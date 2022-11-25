/*let csvTab = [];
onload = fetch("agenda.csv").then(res => {
    
    return res.text()
}).then(data => {
    
    let result = data.split(/\r?\n|\r/).map(e => {
        return e.split(";")
    })
    result.forEach(e => {
        let m = e.map(e => {
            
            return `<td>${e}</td>`;
        }).join("")
        let ce = document.createElement("tr");
        ce.innerHTML = m;
        if (ce.innerText != "") {
            document.querySelector("table").appendChild(ce);
        }
        console.log(m);

    })
    console.log(result[1][5]);
})

console.log(csvTab);
*/
/*
formulaire();
function formulaire(){
    //const a = "titre";
    
    const dateDebut = document.getElementById("dateDebut").value;
    const dateFin = document.getElementById("dateFin").value;
    const heureDebut = document.getElementById("heureDebut").value;
    const heureFin = document.getElementById("heureFin").value;
    console.log("titre");
    console.log(dateDebut);
    console.log(dateFin);
    console.log(heureDebut);
    console.log(heureFin);
    */
    var data = [['1','a','a','a','a','a']];
    /*var data = [
        ["Alpha", "Beta"],
        ["Charlie", "Delta"],
        ["Echo", "Foxtrot"]
      ];
// (B) WRITE TO FILE
const fs = require("fs");
const stream = fs.createWriteStream("agenda.csv");
for (let i of data) { stream.write(i.join(";") + "\r\n"); }
stream.end();
console.log("Done!");
}*/

/*
'use strict';

const fs = require('fs');

let rawdata = fs.readFileSync('data.json');
let student = JSON.parse(rawdata);
console.log(student);
*/

