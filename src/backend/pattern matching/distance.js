
//Javascript program to find Edit Distance (when only two
// operations are allowed, insert and delete) using LCS.
	
function Levesnshtein(string,pattern)
{
	// Find LCS
	let curr = new Array(string.length + 1);
	for(let i=0;i<curr.length;i++)curr[i]=new Array(pattern.length+1);
	for (let i = 0; i <= string.length; i++) {
		for (let j = 0; j <=pattern.length; j++) {
			if (i == 0 || j == 0) {
				curr[i][j] = 0;
			} else if (string[i-1] == pattern[j-1]) {
				curr[i][j] = curr[i - 1][j - 1] + 1;
			} else {
				if(curr[i-1][j] > curr[i][j-1]) {
                    curr[i][j] = curr[i-1][j];
                }
                else {
                    curr[i][j] = curr [i][j-1];
                }
			}
		}
	}
	// Edit distance is delete operations +
	// insert operations.
	return (string.length - curr[string.length][pattern.length]) + (pattern.length - curr[string.length][pattern.length]);
}


function lcs (string,pattern){
    let lenStr= string.length;
    let lenPtn = pattern.length;
    var cur = new Array(lenStr+1);
    for (let i=0;i<lenStr+1;i++) cur[i] = new Array(lenPtn+1);
    for (let i =0;i<lenStr+1;i++){
        for(let j=0;j<lenPtn+1;j++){
            if(i==0 || j==0){
                cur[i][j]=0;
            }
            else if (string[i-1] == pattern[j-1]){
                cur[i][j] = cur[i-1][j-1] + 1;
            }
            
            else{
                if(cur[i-1][j] > cur[i][j-1]) {
                    cur[i][j] = cur[i-1][j];
                }
                else {
                    cur[i][j] = cur [i][j-1];
                }
            }
        }

    }
    return cur[lenStr][lenPtn];
}
/* Driver program to test above function */
var string = 'bacbababadbcba';
var pattern = 'ababaca';
var pattern1 = 'ababbdb';
var string1 = 'bacbababacabcb';
console.log(Levesnshtein(string, pattern));

