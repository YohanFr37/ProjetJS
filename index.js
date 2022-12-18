const sqlite3 = require('sqlite3')
const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const { json } = require('body-parser');
const e = require('express');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let file = "agenda.db";
let db = new sqlite3.Database(file);

app.use(express.static(__dirname + '/'));
// Endpoints

app.get('/', (req, res) => {
    //res.redirect('login.html') 
})

app.get('/update', (req, res) => {
    res.redirect('update.html') 
})

app.get('/calendar', (req, res) => {
    res.redirect('calendar.html') 
})

const HTTP_PORT = 8080
app.listen(HTTP_PORT, () => {
    console.log("Server is listening on port " + HTTP_PORT);
});


//Requête d'insertion de données sous JSON
app.post("/calendrier/add/", (req, res, next) => {
  var errors=[]
  if (errors.length){
      res.status(400).json({"error":errors.join(",")});
      return;
  }
  let data = {
      titre: req.body.titre,
      dateDebut: req.body.dateDebut+' '+req.body.heureDebut,
      dateFin : req.body.dateFin+' '+req.body.heureFin
  }
  let sql ='INSERT INTO agenda (titre, dateDebut, dateFin) VALUES (?,?,?)'
  let params =[data.titre, data.dateDebut, data.dateFin]
  db.run(sql, params, function (err, result) {
      if (err){
          res.status(400).json({"error": err.message})
          return;
      }
      const fs = require("fs")
fs.readFile("./data.json", "utf8",(err,data)=>{
  if(err){
    console.log(`Erreur:${err.message}`);
  } else {
    const information = JSON.parse(data);
    let newData = {
      id: this.lastID,
      titre: params[0],
      dateDebut: params[1],
      dateFin: params[2],
    };
    information.push(newData);
    fs.writeFile("./data.json", JSON.stringify(information),(err)=>{
      if(err){
        console.log(`${err.message}`);
      }else {
        console.log('Writefile reussit');
      }
    })
  }
})
res.redirect('../calendar.html');
  });

})

//Met à jour un RDV
app.post("/calendrier/update/", (req, res, next) => {
  //Récupère la position du RDV à changer par rapport au fichier JSON
  let n = req.body.nbUpdate;
  const fs = require("fs")
  fs.readFile("./data.json", "utf8",(err,data)=>{
    if(err){
      res.status(400).json({"error":err.message});

      console.log(`Erreur:${err.message}`);
    } else {
      const information = JSON.parse(data);
      
      let newData = {
        id: parseInt(params[3]),
        titre: params[0],
        dateDebut: params[1],
        dateFin: params[2],
      };
      //Récupère les nouvelles informations
      information[n].titre = params[0];
      information[n].dateDebut = params[1];
      information[n].dateFin = params[2];
      //Met à jour le JSON
      fs.writeFileSync("./data.json", JSON.stringify(information, null, 2),(err)=>{
        if(err){
          console.log(`${err.message}`);
        }else {
          console.log('Writefile reussit');
        }
      })
    }
  })
  var errors=[]
  if (errors.length){
      res.status(400).json({"error":errors.join(",")});
      return;
  }
  let data = {
      titre: req.body.titreUpdate,
      dateDebut: req.body.dateDebutUpdate+' '+req.body.heureDebutUpdate,
      dateFin : req.body.dateFinUpdate+' '+req.body.heureFinUpdate,
      id: req.body.idUpdate
  }
  let sql =`UPDATE agenda set titre = ?, dateDebut = ?, dateFin = ? WHERE id = ?`
  let params =[data.titre, data.dateDebut, data.dateFin, data.id]
  db.run(sql, params, function (err, result) {
      if (err){
          res.status(400).json({"error": err.message})
          return;
      }res.redirect('../calendar.html');
      
  });
})

//Supprimer un RDV un RDV
app.post("/calendrier/delete/", (req, res, next) => {
  //Récupère la position du RDV à changer par rapport au fichier JSON
  let n = req.body.idDelete;
  const fs = require("fs")
  fs.readFile("./data.json", "utf8",(err,data)=>{
    if(err){
      res.status(400).json({"error":err.message});
      console.log(`Erreur:${err.message}`);
    } else {
      //Recupère le contenu du JSON
      const information = JSON.parse(data);
      //Supprime le RDV enregistré dans le JSON
      information.splice(n, 1);
      //Met à jour le JSON en supprimant les données du RDV
      fs.writeFileSync("./data.json", JSON.stringify(information, null, 2),(err)=>{
        if(err){
          console.log(`${err.message}`);
        }else {
          console.log('Writefile reussit');
        }
      })
    }
  })
  var errors=[]
  if (errors.length){
      res.status(400).json({"error":errors.join(",")});
      return;
  }
  let data = {
      titre: req.body.titre,
      dateDebut: req.body.dateDebut+' '+req.body.heureDebut,
      dateFin : req.body.dateFin+' '+req.body.heureFin,
      id: req.body.id
  }
  let sql =`DELETE FROM agenda WHERE id = ?`
  let params =[data.id]
  db.run(sql, params, function (err, result) {
      if (err){
          res.status(400).json({"error": err.message})
          return;
      }res.redirect('../calendar.html');
      
  });
})

app.patch("/agenda/:id", (req, res, next) => {
    var reqBody = re.body;
    db.run(`UPDATE agenda set titre = ?, dateDebut = ?, dateFin = ? WHERE id = ?`,
        [reqBody.titre, reqBody.dateDebut, reqBody.dateFin, reqBody.id],
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.status(200).json({ updatedID: this.changes });
        });
});

app.get("/agenda/:id", (req, res) => {
    var params = [req.params.id]
    db.get(`SELECT * FROM agenda where id = ?`, [req.params.id], (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        //res.render('test',{output: params})
        res.status(200).json(row);
      });
});

app.get("/agenda", (req, res) => {
    db.all("SELECT * FROM agenda", [], (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        //res.data();
        res.status(200).json({rows});
        
      });
});

app.get('/agenda/:id', (req, res, next)=>{
  fs.readFile('data.json', (err, data)=>{
   if (err) throw err
   res.send(data);
  })
});

app.delete('/agenda/:id', function (req, res) {
  fs.readFile(__dirname + "/" + "data.json", 'utf8', function (err, data) {
      data = JSON.parse(data);
      delete data["user" + req.params.id];
      console.log(data);
      fs.writeFile('data.json', JSON.stringify(data), function (err) {
          if(err){return console.log(err);}
      });
  });
});
/*
app.delete("/agenda/:id", (req, res, next) => {
  db.run(`DELETE FROM agenda WHERE id = ?`,
      req.params.id,
      function (err, result) {
          if (err) {
              res.status(400).json({ "error": res.message })
              return;
          }
          res.status(200).json({ deletedID: this.changes })
      });
});*/