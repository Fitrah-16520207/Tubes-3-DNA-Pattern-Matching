const express = require('express');

const app = express();
var cors = require('cors');
const PORT = process.env.PORT || 3001;

// Parse JSON data
app.use(express.json());
//use cors
app.use(cors());
// Handling request api
app.use('/api', require('./api'));

app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`);
})