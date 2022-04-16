

var KMP = function(text, pattern ){
    var n = text.length;
    var m = pattern.length;
    var fail = computeFail(pattern);
    var i=0;
    var j=0;
    while (i<n){
        if(pattern.charAt(j) == text.charAt(i)){
            if(j == m-1) return i -m + 1;
            i++;
            j++;
        }
        else if(j>0) j = fail[j-1]
        else i++;
    }
    return -1;

}
var computeFail = function(pattern){
    var fail = [];
    fail[0] = 0;
    var m = pattern.length;
    var j = 0;
    var i = 1;
    while (i< m){
        if (pattern.charAt(j) == pattern.charAt(i)){
            fail[i] = j+1;
            i++;
            j++;
        }
        else if (j>0) j = fail[j-1];
        else {
            fail[i] =0;
            i++;
        }
    }
    return fail;
}
var string = 'bacbababaabcba';
var pattern = 'ababaca';
console.log(string);
console.log(pattern);
console.log(KMP(string,pattern));