

var KMP = function(text, pattern ){
    var patternLen = pattern.length;
    var idxStart = computeFail(pattern);
    var idx=0;
    var patIdx=0;
    while (idx<text.length){
        if(pattern.charAt(patIdx) == text.charAt(idx)){
            if(patIdx == patternLen-1) return idx -patternLen + 1;
            idx++;
            patIdx++;
        }
        else if(patIdx>0) patIdx = idxStart[patIdx-1]
        else idx++;
    }
    return -1;

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
var string = 'bacbababacabcba';
var pattern = 'ababaca';
var idxstart = KMP(string,pattern);
var idxEnd = idxstart + pattern.length -1;
var com = computeFail(pattern);
console.log(string);
console.log(pattern);
console.log(idxstart);
console.log(idxEnd);
console.log(com);