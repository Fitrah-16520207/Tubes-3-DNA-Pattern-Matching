function ceksearch(str){
    var regex = new RegExp('\\d+-((1[0-2])|(0[1-9]))-(([0-2][0-9])|[3][0-1])');
    var resultdate= str.match(regex);
    // var resultdate = RegExp(regex).exec(str);
    var input = false;
    var diseaseresult;
    var disease = '';
    var date = '';
    if (resultdate!==null){
        if (resultdate.index == 0 || resultdate.index + resultdate[0].length == str.length) {
            input = true;
            date = resultdate[0];
            diseaseresult = str.replace(date, '');
            if(resultdate.index == 0){
                var arrstring = diseaseresult.split(' ');
                console.log(arrstring)
                for (i = 0; i < arrstring.length; i++) {
                    if (arrstring[i].length > 0 ) {
                        disease += arrstring[i] + ' ';
                    }
                }
            }
        }
    }
    else{
        disease = str
    }
    console.log(disease);
    console.log(date);
}

// ceksearch(" Covid-19 HIV     ANOTHER")
ceksearch("2022-03-11 ")
