let express = require('express')
let app = express()
app.use(express.static(__dirname + "/"));
// Simulate a mouse click:
//
// Basic HTTP authentication middleware
app.use((req, res, next) => {
    
    // If 'Authorization' header not present
    if(!req.get('Authorization')){
        var err = new Error('Not Authenticated!')
        // Set status code to '401 Unauthorized' and 'WWW-Authenticate' header to 'Basic'
        res.status(401).set('WWW-Authenticate', 'Basic')
        next(err)
    }
    // If 'Authorization' header present
    else{
        // Decode the 'Authorization' header Base64 value
        let credentials = Buffer.from(req.get('Authorization').split(' ')[1], 'base64')
        // <Buffer 75 73 65 72 6e 61 6d 65 3a 70 61 73 73 77 6f 72 64>
        .toString()
        // username:password
        .split(':')
        // ['username', 'password']

        let username = credentials[0]
        let password = credentials[1]
        
        // If credentials are not valid
        if(!(username === 'admin' && password === 'admin123')){
            var err = new Error('Not Authenticated!')
            // Set status code to '401 Unauthorized' and 'WWW-Authenticate' header to 'Basic'
            res.status(401).set('WWW-Authenticate', 'Basic')
            next(err)
        } 
        
        res.status(200)
        res.redirect('main.html')
        next()
            
    }
})

// Endpoints
app.get('/', (req, res) => {
    res.send('Protected route with Basic HTTP Authentication!')  
})

// Run the server
app.listen(8080)