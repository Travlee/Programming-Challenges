
//  Pig Latin
//  08/12/15 - 
//      - Rule 1: If first 2 chars = consonant/vowel: first char followed by 'ay'
//      - Rule 2: If first 2 chars = 2 consonants: first 2 chars followed by 'ay' 
//      - Rule 3: If first char = vowel: add 'way' onto end


var PigLatin = {
    
    VOWELS: ['a', 'e', 'i', 'o', 'u' ],

    Is_Vowel: function(chr){
        for(var vowel in PigLatin.VOWELS){
            if(chr.toLowerCase() === PigLatin.VOWELS[vowel]) return true;
        }
        return false;
    },

    //  RETURNS: <Array>
    Process: function(input){
        var result = [];

        for(var word in input){

            //  Store first 2 characters of the word
            var chrs = input[word].substr(0, 2);

            //  Rule 1: If first char is vowel
            if(PigLatin.Is_Vowel(chrs[0])){
                result.push(input[word] + 'way');
            }

            //  Rule 2: First 2 chars are cons
            else if(!PigLatin.Is_Vowel(chrs[0]) && !PigLatin.Is_Vowel(chrs[1])){
                result.push(input[word] + chrs[0] + chrs[1] + 'ay');
            }

            //  Rule 3: If the first char is a cons
            else{
                result.push(input[word] + chrs[0] + 'ay');
            }
        }
        
        //  <Array>
        return result;
    }
};

function Main(){

    //  Word list for Piggy
    var Test = ['Apple', 'Eat', 'Jesus', 'Face', 'Zeus', 'Hermes', 'Child'],
        _last = null;
    
    (function update_loop(){
        
        var input_div = document.getElementById('input'),
            output_div = document.getElementById('output'),
            output = null,
            process = null;
        
        //  On-Load Update
        if(!input_div.value){
            //  Updates Input Div with Test
            input_div.value = Test.join(', ');
            
            process = Test;
        
        //  
        } else {
            process = input_div.value.split(", ");
        }
        
        //  Only run on new Input
        if(_last !== input_div.value){
            _last = input_div.value;

            output = PigLatin.Process(process);
            output_div.value = output.join(', ');
        }
        
        requestAnimationFrame(update_loop);
    })();
};


(function (){
    if(!window.sessionStorage){
        console.error('ERROR: window.sessionStorage not supported!');
    } else if(!window.requestAnimationFrame){
        console.error('ERROR: window.requestAnimationFrame not supported!');        
    } else {
        //  Waits for DocumentState:Ready 
        if(document.readyState === 'complete') Main();
        else document.addEventListener('DOMContentLoaded', Main, false);
    }
})();