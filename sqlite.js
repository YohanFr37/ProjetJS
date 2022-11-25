

/*

      db.all("SELECT * FROM agenda", function(err, rows) {
        rows.forEach(function (row) {
            console.log(row);
        })
	});

db.all("SELECT * FROM agenda", function(err, rows) {
        rows.forEach(function (row) {
            console.log(row);
        })
	});	
*/
   /*
    db.run(sql, languages, function(err) {
        if (err) {
          return console.error(err.message);
        }
        console.log(`Rows inserted ${this.changes}`);
      });*/

/*
export function formulaire(){
      let sqlite3 = require('sqlite3').verbose();
      let file = "agenda.db";
      let db = new sqlite3.Database(file);
      
      let titre = "AC";
      let dateD = "2022-12-14";
      let dateF = "2022-12-14";
      let heureD = "08:00";
      let heureF = "12:00";
      db.run(`INSERT INTO agenda(titre, dateDebut, DateFin) VALUES("${titre}","${dateD} ${heureD}","${dateF} ${heureF}")`, function(err) {
        if (err) {
          return console.log(err.message);
        }
        // get the last insert id
        console.log(`A row has been inserted with rowid ${this.lastID}`);
      });
db.close();
    }*/