function validateSequence(str){
    const regex = /^[AGCT]+$/;  // string minimal mempunyai satu A|G|C|T, dan di awal sampai akhir hanya tersusun atas huruf-huruf ini
    return regex.test(str);
}

function ceksearch(str){
    var regex = new RegExp('\\d+-((1[0-2])|(0[1-9]))-(([0-2][0-9])|[3][0-1])');
    var resultdate= str.match(regex);
    // var resultdate = RegExp(regex).exec(str);
    var input = false;
    var diseaseresult;
    var disease = null;
    var date = null;
    if (resultdate!==null){
        if (resultdate.index == 0 || resultdate.index + resultdate[0].length == str.length) {
            date = '';
            input = true;
            date = resultdate[0];
            diseaseresult = str.replace(date, '');
            var arrstring = diseaseresult.split(' ');
            if(arrstring.length>1){
                disease ='';
                for (i = 0; i < arrstring.length; i++) {
                    if (arrstring[i].length > 0) {
                        disease += arrstring[i];
                        if (i != arrstring.length - 1) {
                            disease += ' '
                        }
                    }
                }
            }
        }
    }
    else{
        disease ='';
        disease = str
    }

    return { disease, date }
}

// ceksearch(" Covid-19 HIV     ANOTHER")
input = ceksearch("2022-12-31")
input1 = ceksearch("COVID-19")
input2 = ceksearch("2022-12-31 Penyakit HIV")
input3 = ceksearch("2022-12-31 COVID-19")
input4 = ceksearch("Covid2022")
input5 = ceksearch("Penyakit HIV 2022-12-31 2022-12-31")
console.log(input);
console.log(input1);
console.log(input2);
console.log(input3);
console.log(input4);
console.log(input5);

module.exports.validateSequence = validateSequence;
module.exports.ceksearch = ceksearch;