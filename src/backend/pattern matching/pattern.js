var checkHamming=function(text,pattern,patIdx,textIdx,distance){
    for(let i = patIdx ;i<pattern.length;i++){
        if(text.charAt(textIdx) == pattern.charAt(i)){
            distance++;
        }
        patIdx++;
        textIdx++;

    }
    return distance;
}



var KMP = function(text, pattern ){
    var solution = new Array(2);
    var patternLen = pattern.length;
    var idxStart = computeFail(pattern);
    var idx=0;
    var patIdx=0;
    solution[1] = 0;
    while (idx<text.length){
        if(pattern.charAt(patIdx) == text.charAt(idx)){
            if(patIdx == patternLen-1) {
                solution[0] = idx -patternLen + 1
                solution[1] = patternLen;
                return solution;
            }
            idx++;
            patIdx++;
            solution[1] = Math.max(solution[1],patIdx);
        }
        else if(patIdx>0) {
            solution[1] = Math.max(solution[1],checkHamming(text,pattern,patIdx,idx,patIdx));
            patIdx = idxStart[patIdx-1];
        }

        else {
            solution[1] = Math.max(solution[1],checkHamming(text,pattern,patIdx,idx,patIdx));
            idx++;
        }
    }
    solution[0] = -1;
    return solution;

}
var computeFail = function(pattern){
    var arrPrefix = [];
    arrPrefix[0] = 0;
    var arrStart = 0;
    var idx = 1;
    while (idx< pattern.length){
        if (pattern.charAt(arrStart) == pattern.charAt(idx)){
            arrPrefix[idx] = arrStart+1;
            idx++;
            arrStart++;
        }
        else if (arrStart>0) arrStart = arrPrefix[arrStart-1];
        else {
            arrPrefix[idx] =0;
            idx++;
        }
    }
    return arrPrefix;
}

var BoyerMoore = function(text,pattern){
    var last = buildLast(pattern);
    var n = text.length;
    var m = pattern.length;
    var i = m-1;
    if(i> n-1) return -1;
    var j = m-1;
    do {
        if (pattern.charAt(j) == text.charAt(i)){
            if(j==0) return i;
            else {
                i--;
                j--;
            }
        }
        else{
            var lo = last[text.charAt(i)];
            i = i+m - Math.min(j, 1 + lo);
            j = m-1;
        }
    } while(i<=n-1);
    return -1;
}

var buildLast = function(pattern){
    var last = new Array(128);
    for(let i=0;i<128;i++) last[i] = -1;
    for(let i=0;i<pattern.length;i++) last[pattern.charAt(i)] = i;
    return last;
}
var string = 'bacbbbabacabcba';
var pattern = 'ababaca';
var string1 = "sajbhsalaqsclahsagahsalehsalahaku";
var pola = "salah";
var idxstart = KMP(string1,pola);
var idxEnd = idxstart[0] + pattern.length -1;
var com = computeFail(pattern);
console.log(string);
console.log(pattern);
console.log(idxstart[0]);
console.log(idxstart[1]);
console.log(idxEnd);
console.log(com);

module.exports.KMP = KMP;