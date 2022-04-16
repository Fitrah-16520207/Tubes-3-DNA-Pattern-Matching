const express = require('express');
const router = express.Router();
const pool = require('./dbinstance');

router.post('/addDisease', (req, res) => {
    let data = req.body;
    disease_name = data.disease_name ? data.disease_name.trim() : "";
    disease_dna_sequence = data.disease_dna_sequence ? data.disease_dna_sequence.trim() : "";
    if (disease_name && disease_dna_sequence)
    {
        pool.query("INSERT INTO disease VALUES (?, ?);", [disease_name, disease_dna_sequence], (err, results, fields) =>{
            if (err)
            {
                res.status(400).json({
                    ok: false,
                    error_code: 400,
                    description: err
                });
            } else {
                res.json({
                    ok: true
                });
            }
        });
    }
    // Penanganan nama disease dan sekuens dna yang kosong
    else if (!disease_name)
    {
        res.status(400).json({
            ok: false,
            error_code: 400,
            description: "New disease submission failed! Disease name cannot be empty"
        });
    } else if (!disease_dna_sequence) {
        res.status(400).json({
            ok: false,
            error_code: 400,
            description: "New disease submission failed! Disease DNA sequence cannot be empty"
        });
    }
});

router.get('/searchDisease', (req, res)=>{
    url = new URL(req.url, `${req.protocol}://${req.get('host')}`);
    searchParams = url.searchParams;
    query = searchParams.get("query");
    if(query){
        pool.query(`SELECT * FROM disease WHERE disease_name LIKE ?;`, ['%' + query + '%'], (err, results, fields)=>{
            res.json({ok: true, result: results});
        });
    } else{
        pool.query(`SELECT * FROM disease;`, [], (err, results, fields)=>{
            res.json({ok: true, result: results});
        });
    }
})

router.get('/searchTest', (req, res)=>{
    url = new URL(req.url, `${req.protocol}://${req.get('host')}`);
    searchParams = url.searchParams;
    query = searchParams.get("query");
    if(query){
        pool.query(`SELECT * FROM test WHERE disease_name LIKE ? OR patient_name LIKE ?;`, ['%' + query + '%', '%' + query + '%'], (err, results, fields)=>{
            res.json({ok: true, result: results});
        });
    } else{
        pool.query(`SELECT * FROM test;`, [], (err, results, fields)=>{
            res.json({ok: true, result: results});
        });
    }
})

module.exports = router;