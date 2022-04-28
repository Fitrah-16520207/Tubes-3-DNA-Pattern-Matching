const express = require('express');
const router = express.Router();
const pool = require('./dbinstance');
const pattern = require('./pattern_matching/pattern');
const { validateSequence, ceksearch } = require('./pattern_matching/search');

router.post('/addDisease', (req, res) => {
    let data = req.body;
    let disease_name = data.disease_name ? data.disease_name.trim() : "";
    let disease_dna_sequence = data.disease_dna_sequence ? data.disease_dna_sequence.trim() : "";

    // Penanganan nama disease dan sekuens dna yang kosong
    if (!disease_name){
        res.status(400).json({
            ok: false,
            error_code: 400,
            description: "New disease submission failed: Disease name cannot be empty"
        });
        return;
    } else if (!disease_dna_sequence) {
        res.status(400).json({
            ok: false,
            error_code: 400,
            description: "New disease submission failed: Disease DNA sequence cannot be empty"
        });
        return;
    } else if(!validateSequence(disease_dna_sequence)){ // validasi dengan regular expression
        res.status(400).json({
            ok: false,
            error_code: 400,
            description: "New disease submission failed: Disease DNA sequence invalid! Must only contain AGCT (no other character; whitespaces and lowercase letters are also not allowed)"
        });
        return;
    }
    else if (disease_name && disease_dna_sequence)
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
        return;
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

    if(!patient_name){
        res.status(400).json(
            {ok: false,
             error_code: 400,
             description: "DNA Test Failed: Patient's name cannot be empty"});
        return;
    } else if(!disease_name){
        res.status(400).json(
            {ok: false,
             error_code: 400,
             description: "DNA Test Failed: Disease's name cannot be empty"});
        return;
    } else if (!patient_dna_sequence){
        res.status(400).json(
            {ok: false,
             error_code: 400,
             description: "DNA Test Failed: Patient's DNA sequence cannot be empty"});
        return;
    } else if(!validateSequence(patient_dna_sequence)){
        res.status(400).json({
            ok: false,
            error_code: 400,
            description: "DNA Test Failed: Patient's DNA sequence invalid! Must only contain AGCT (no other character; whitespaces and lowercase letters are also not allowed)"
        });
        return;
    } else if(patient_name && disease_name && patient_dna_sequence){
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
                     description: "DNA Test Failed: no disease with that name"});
                return;
            }

            let disease_dna_sequence = results[0].disease_dna_sequence;
            if(patient_dna_sequence.length < disease_dna_sequence.length){
                res.status(400).json(
                    {ok: false,
                     error_code: 400,
                     description: "DNA Test Failed: patient's DNA is shorter than the disease's DNA"});
                return;
            }
            
            let solution = pattern.KMP(patient_dna_sequence, disease_dna_sequence);
            let similarity = Math.round(solution[1] / disease_dna_sequence.length * 100);   // similarity disimpan dalam persen (integer)
            let positive = solution[0] != -1 || similarity >= 80;
            let now = new Date();
            let tanggalTest = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
            
            pool.query(`INSERT INTO test VALUES (?, ?, ?, ?, ?, ?);`, [
                null,
                tanggalTest,
                patient_name,
                disease_name,
                positive,
                similarity
            ]);
            
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
    }
});

router.get('/searchDisease', (req, res)=>{
    let url = new URL(req.url, `${req.protocol}://${req.get('host')}`);
    let searchParams = url.searchParams;
    let query = searchParams.get("query");
    
    if(query){
        pool.query(`SELECT * FROM disease WHERE disease_name LIKE ?;`, ['%' + query + '%'], (err, results, fields)=>{
            if(results.length > 0){
                res.json({ok: true, result: results});
            } else{
                res.json({ok: true, result: null});
            }
        });
    } else{ // kalau query empty tampilkan semua disease
        pool.query(`SELECT * FROM disease;`, [], (err, results, fields)=>{
            res.json({ok: true, result: results});
        });
    }
});


router.get('/searchTest', (req, res)=>{
    let url = new URL(req.url, `${req.protocol}://${req.get('host')}`);
    let searchParams = url.searchParams;
    let query = searchParams.get("query");

    query = query ? query.trim() : "";

    if(!query){
        // kalau query empty tampilkan semua test
        pool.query(`SELECT * FROM test ORDER BY test_id DESC;`, [], (err, results, fields)=>{
            res.json({ok: true, result: results});
        });
        return;
    }

    let {disease, date} = ceksearch(query);
    
    if(disease && date){
        pool.query(`SELECT * FROM test WHERE test_date = ? AND
                    (disease_name LIKE CONCAT("%", ?, "%") OR ? LIKE CONCAT("%", disease_name, "%")) ORDER BY test_id DESC;`,
                    [date, disease, disease], (err, results, fields)=>{
            res.json({ok: true, result: results});
        });
    } else if(date){
        pool.query(`SELECT * FROM test WHERE test_date = ? ORDER BY test_id DESC;`,
                    [date], (err, results, fields)=>{
            res.json({ok: true, result: results});
        });
    } else if(disease){
        pool.query(`SELECT * FROM test WHERE disease_name LIKE CONCAT("%", ?, "%") OR ? LIKE CONCAT("%", disease_name, "%") ORDER BY test_id DESC;`,
                    [disease, disease], (err, results, fields)=>{
            res.json({ok: true, result: results});
        });
    }
});

module.exports = router;