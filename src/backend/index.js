const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;

// Parse JSON data
app.use(express.json());

// Handling request api
app.use('/api', require('./api'));

app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`);
})