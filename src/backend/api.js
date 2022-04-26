const express = require('express');
const router = express.Router();
const pool = require('./dbinstance');
const pattern = require('./pattern matching/pattern');

router.post('/addDisease', (req, res) => {
    let data = req.body;
    let disease_name = data.disease_name ? data.disease_name.trim() : "";
    let disease_dna_sequence = data.disease_dna_sequence ? data.disease_dna_sequence.trim() : "";
    if (disease_name && disease_dna_sequence)
    {
        pool.query("INSERT INTO disease VALUES (?, ?);", [disease_name, disease_dna_sequence], (err, results, fields) =>{
            if (err)
            {
                if(!data.overwrite_existing)
                {
                    res.status(400).json({
                        ok: false,
                        error_code: 400,
                        description: "New disease submission failed: Disease name already exists"
                    });
                } else {
                    pool.query(`UPDATE disease SET disease_dna_sequence=? WHERE disease_name=?;`, [disease_dna_sequence,disease_name], (err, results, fields)=>{
                        res.json({
                            ok: true,
                            description: "Disease updated"
                        });
                    });
                }
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
            description: "New disease submission failed: Disease name cannot be empty"
        });
    } else if (!disease_dna_sequence) {
        res.status(400).json({
            ok: false,
            error_code: 400,
            description: "New disease submission failed: Disease DNA sequence cannot be empty"
        });
    }
});

router.post('/deleteDisease', (req, res)=>{
    let data = req.body;
    let disease_name = data.disease_name;
    if(disease_name){
        pool.query('DELETE FROM disease WHERE disease_name=?', [disease_name], (err, results, fields)=>{
            if(err){
                res.status(400).json({
                    ok: false,
                    error_code: 400,
                    description: err
                });
            } else{
                res.json({
                    ok: true
                });
            }
        });
    }
})

router.post('/testDisease', (req, res)=>{
    let data = req.body;
    let patient_name = data.patient_name ? data.patient_name.trim() : "";
    let disease_name = data.disease_name ? data.disease_name.trim() : "";
    let patient_dna_sequence = data.patient_dna_sequence ? data.patient_dna_sequence.trim() : "";
    if(patient_name && disease_name && patient_dna_sequence){
        pool.query(`SELECT * FROM disease WHERE disease_name = ?;`, [disease_name], (err, results, fields)=>{
            if(err){
                res.status(400).json(
                    {ok: false,
                     error_code: 400,
                     description: err});
                return;
            }
            if(results.length == 0){
                res.status(400).json(
                    {ok: false,
                     error_code: 400,
                     description: "Test Failed: no disease with that name"});
                return;
            }
            let disease_dna_sequence = results[0].disease_dna_sequence;
            if(patient_dna_sequence.length < disease_dna_sequence.length){
                res.status(400).json(
                    {ok: false,
                     error_code: 400,
                     description: "Test Failed: patient DNA is shorter than the disease DNA"});
                return;
            }

            let tanggalTest = new Date();
            let solution = pattern.KMP(patient_dna_sequence, disease_dna_sequence);
            console.log(solution);
            let startIdx = solution[0];
            let similarity = solution[0]/disease_dna_sequence.length*100;
            let positive = startIdx == -1 ? false : true;
            pool.query(`INSERT INTO test VALUES (?, ?, ?, ?, ?, ?);`, [
                null,
                `${tanggalTest.getFullYear()}-${tanggalTest.getMonth()}-${tanggalTest.getDay()}`,
                patient_name,
                disease_name,
                positive,
                similarity
            ], (err, results, fields)=>{console.log(err, results, fields)});

            res.json({
                ok: true,
                result: {
                    test_date: tanggalTest,
                    patient_name: patient_name,
                    disease_name: disease_name,
                    positive: positive,
                    similarity: similarity
                }
            });
        });
    } else if(!patient_name){
        res.status(400).json(
            {ok: false,
             error_code: 400,
             description: "DNA Test Failed: Patient name cannot be empty"});
    } else if(!disease_name){
        res.status(400).json(
            {ok: false,
             error_code: 400,
             description: "DNA Test Failed: Disease name cannot be empty"});
    } else{
        res.status(400).json(
            {ok: false,
             error_code: 400,
             description: "DNA Test Failed: Patient DNA sequence name cannot be empty"});
    }
});

router.get('/searchDisease', (req, res)=>{
    url = new URL(req.url, `${req.protocol}://${req.get('host')}`);
    searchParams = url.searchParams;
    query = searchParams.get("query");
    if(query){
        pool.query(`SELECT * FROM disease WHERE disease_name LIKE ?;`, ['%' + query + '%'], (err, results, fields)=>{
            if(results.length > 0){
                res.json({ok: true, result: results});
            } else{
                res.json({ok: true, result: null});
            }
        });
    } else{
        pool.query(`SELECT * FROM disease;`, [], (err, results, fields)=>{
            res.json({ok: true, result: results});
        });
    }
});


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
});

module.exports = router;