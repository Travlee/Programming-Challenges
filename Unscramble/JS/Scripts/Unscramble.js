
//  Unscramble Words
//  07/19/15 - 07/29/15
//  Unscrambles words by comparing against wordlist
//      
//      Notes:
//      - 
//      
//      ToDo:
//      - [x] Fix the formatting of strings, for better fit in textareas
//      - [x] Add unscramble timing(performance.now()) 
     
var WORDLIST_FILE = "/Pages/Projects/Text/Unscramble/Files/wordlist.txt";
var SCRAMBLED_FILE = "/Pages/Projects/Text/Unscramble/Files/scrambled.txt";
var WORDLIST = null;
var SCRAMBLED = null;

//  Unscramble Library
var Unscramble = {
    _start: null,
    _end: null,

    _CompareWords: function(x, y){
        //  Compares the length of both the scrambled and wordlist:word
        if(x.length !== y.length) return false;

            x = x.split("");
            y = y.split("");
            x.sort();
            y.sort();

            for(var index in x){
                if(x[index] !== y[index]){
                    return false;
                }
            }
            return true;
    },
    Run: function(wordlist, scrambled){

        //  Log start time 
        this._start = performance.now();

        var solved = [];
        scrambled = scrambled.trim().split("\n");
        wordlist = wordlist.trim().split("\n");

        for(var x in scrambled){
            for(var y in wordlist){
                if(this._CompareWords(scrambled[x].trim(), wordlist[y].trim())) solved.push(wordlist[y]);
            }
       }

        //   Log end time; return
        this._end = performance.now();
        var run_time = Math.round(this._end - this._start) / 1000;
        var element = document.getElementById('Solved');
        element.innerText += ' (' + run_time + 's)';
        return solved;
    }
};

function format(str){
    return str.trim().replace(/\n/g, "").replace(/\r/g, ", ");
}

//  Once Loaded: Pushes Data to Containers -> Runs Unscrambler
function Main(){
    var div_wordlist = document.getElementById('wordlist'),
        div_scrambled = document.getElementById('scrambled'),
        div_solved = document.getElementById('solved');
    div_wordlist.value = format(WORDLIST);
    div_scrambled.value = format(SCRAMBLED);

    var solved = Unscramble.Run(WORDLIST, SCRAMBLED);
    div_solved.value = format(solved.join(""));
}

//  Loads files -> Waits til loaded -> Calls Main()
function _Boot(){
    //  States for loading
    var loading = false, 
        loaded = false;

    // Named, Self-Invoking function for waiting for files to load
    (function loop(){
        if(loaded)return;
        if(loading === false){
            // Load_File(WORDLIST_FILE, function(){WORDLIST = this.responseText;});
            // Load_File(SCRAMBLED_FILE, function(){SCRAMBLED = this.responseText;});
            Site.Load_File(WORDLIST_FILE, function(){WORDLIST = this.responseText;});
            Site.Load_File(SCRAMBLED_FILE, function(){SCRAMBLED = this.responseText;});

            loading = true;
        } else {
            if(WORDLIST && SCRAMBLED){
                // Once files are loaded, call main logic
                Main();

                loaded = true;
            }
        }
        requestAnimationFrame(loop);
    }());
}

(function(){
    if(!window.requestAnimationFrame){
        console.error('No RAF');
    } else {
        if(document.readyState === 'complete') _Boot();
        else document.addEventListener('DOMContentLoaded', _Boot, false);
    }
})();