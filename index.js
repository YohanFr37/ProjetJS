const sqlite3 = require('sqlite3')
const express = require('express')
const app = express()
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let file = "agenda.db";
let db = new sqlite3.Database(file);

app.use(express.static(__dirname + '/'));
// Endpoints

app.get('/', (req, res) => {
    //res.redirect('login.html') 
})

app.get('/test', (req, res) => {
    res.redirect('test.html') 
})

app.get('/calendar', (req, res) => {
    res.redirect('calendar.html') 
})

const HTTP_PORT = 8080
app.listen(HTTP_PORT, () => {
    console.log("Server is listening on port " + HTTP_PORT);
});

app.get("/agenda/:id", (req, res) => {
    var params = [req.params.id]
    db.get(`SELECT * FROM agenda where id = ?`, [req.params.id], (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.status(200).json(row);
      });
});

app.get("/agenda", (req, res) => {
    db.all("SELECT * FROM agenda", [], (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.status(200).json({rows});
      });
});
// View
/*
app.post('/view', function(req,res){
    db.serialize(()=>{
      db.each('SELECT id ID, name NAME FROM emp WHERE id =?', [req.body.id], function(err,row){     //db.each() is only one which is funtioning while reading data from the DB
        if(err){
          res.send("Error encountered while displaying");
          return console.error(err.message);
        }
        res.send(` ID: ${row.ID},    Name: ${row.NAME}`);
        console.log("Entry displayed successfully");
      });
    });
  });*/

  /*// Insert
app.post('/add', function(req,res){
  db.serialize(()=>{
    db.run('INSERT INTO emp(id,name) VALUES(?,?)', [req.body.id, req.body.name], function(err) {
      if (err) {
        return console.log(err.message);
      }
      console.log("New employee has been added");
      res.send("New employee has been added into the database with ID = "+req.body.id+ " and Name = "+req.body.name);
    });
});
});*/

/*
app.post('/calendrier/add',bodyParser, (req, res) => {
    //let reqBody = re.body;
    //const titre = req.body.titre
    //const dateDebut = req.body.dateDebut
    //const dateFin = req.body.dateFin
    db.serialize(()=>{

    db.run(`INSERT INTO agenda(titre, dateDebut, dateFin) VALUES (?,?,?)`, 
        [req.body.titre, req.body.dateDebut, req.body.dateFin],
        function (err) {
            if (err) {
                res.status(400).json({ "error": err.message })
                return;
            }
            console.log("New employee has been added");
            res.send("New employee has been added into the database with ID = "+req.titre+ " and Name = "+req.dateDebut + req.dateFin);
        });
    });
});*/

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
      res.json({
          "message": "success",
          "data": data,
          "id" : this.lastID
      })
  });
})

app.patch("/agenda/", (req, res, next) => {
    var reqBody = re.body;
    db.run(`UPDATE agenda set titre = ?, dateDebut = ?, detaFin = ? WHERE id = ?`,
        [reqBody.titre, reqBody.dateDebut, reqBody.detaFin, reqBody.id],
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.status(200).json({ updatedID: this.changes });
        });
});

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
});