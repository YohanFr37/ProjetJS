const express = require('express')
const app = express()

app.use(express.static(__dirname + '/'));
// Endpoints

app.get('/', (req, res) => {
    //res.redirect('login.html') 
})

app.get('/login', (req, res) => {
    res.redirect('login.html') 
})

app.get('/calendar', (req, res) => {
    res.redirect('calendar.html') 
})

// Run the server
app.listen(8080)