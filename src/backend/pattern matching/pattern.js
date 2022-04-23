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
            solution[1] = Math.max(solution[1],patIdx);
            patIdx = idxStart[patIdx-1];
        }

        else idx++;
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
var string = 'bacbbbabacabcba';
var pattern = 'ababaca';
var idxstart = KMP(string,pattern);
var idxEnd = idxstart[0] + pattern.length -1;
var com = computeFail(pattern);
console.log(string);
console.log(pattern);
console.log(idxstart[0]);
console.log(idxstart[1]);
console.log(idxEnd);
console.log(com);

module.exports.KMP = KMP;