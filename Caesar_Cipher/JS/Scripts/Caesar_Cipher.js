
//  Ceaser Cipher
//  07/29/15 - 08/02/15
//  Subsitution cipher with rotating (1-25) key, with numeric encoding by (key % 10).
//  Ported from Python.
//      
//      Notes:
//      - Issue with 'keydown' event, doesn't fire all the time with key presses.
//          Going to switch to a RAF loop for encoding/decoding.
//      - The error with numeric encoding/decoding seems to be only with decoding, 
//          leaves the decoding output -1 off of the plaintext input.
//              - SOLVED The error came from JS's remainder operator, which should 
//                  be a Mod op, but no, JS hates puppies.

var Cipher = {

    LOWER_MIN: 97,
    LOWER_MAX: 122,
    UPPER_MIN: 65,
    UPPER_MAX: 90,
    NUM_MIN: 48,
    NUM_MAX: 57,

    Encode: function(text){
        var encoded = "",
            key = 1;

        for(var chr in text){

            //  Converts char to ASCII value
            var temp = text.charCodeAt(chr);

            //  Uppercase Character
            if(this.UPPER_MIN <= temp && temp <= this.UPPER_MAX){
                temp += key;

                //  <= Max-Value for Uppercase.
                if(temp <= this.UPPER_MAX){
                    
                    encoded += String.fromCharCode(temp);

                } else { // Else wrap back to A
                    
                    encoded += String.fromCharCode(this.UPPER_MIN + (temp - this.UPPER_MAX));
                }

            //  Lowercase Character
            } else if(this.LOWER_MIN <= temp && temp <= this.LOWER_MAX){
                temp += key;

                //  <=  Max-Value for Lowercase.
                if(temp <= this.LOWER_MAX){

                    encoded += String.fromCharCode(temp);

                } else { // Else wrap around back to a

                    encoded += String.fromCharCode(this.LOWER_MIN + (temp - this.LOWER_MAX));
                }

            //  Numbers & Special Characters
            } else {

                //  Numeric Charcter 0-9
                if(this.NUM_MIN <= temp && temp <= this.NUM_MAX){

                    //  Works finally. Wooo
                    //  First tried: temp += (key % 10)
                    //  However 9s wouldn't encode/decode. Came out as 0s. 
                    //  (temp + key) % 10 seems to fix things  
                    temp = (parseInt(text[chr]) + key) % 10;

                    //  <= 9: Add as encoded output
                    if(temp <= 9){

                        encoded += temp;

                    } else { // Wrap back to 0

                        encoded += temp - 9;
                    }
                    
                //  Ignore everything else.
                } else {
                    encoded += text[chr];
                    continue;
                }
            }
            if(key < 25) key++;
            else key = 1;
        }

        return encoded;
    },
    Decode: function(text){
        var decoded = "",
            key = 1;

        for(var chr in text){

            //  Converts char to ASCII value
            var temp = text.charCodeAt(chr);

            //  Uppercase Character
            if(this.UPPER_MIN <= temp && temp <= this.UPPER_MAX){
                temp -= key;

                //  >= Min-Value for Uppercase.
                if(temp >= this.UPPER_MIN){
                    
                    decoded += String.fromCharCode(temp);

                } else { // Else wrap back to Z
                    
                    decoded += String.fromCharCode(this.UPPER_MAX - (this.UPPER_MIN - temp));
                }

            //  Lowercase Character
            } else if(this.LOWER_MIN <= temp && temp <= this.LOWER_MAX){
                temp -= key;

                //  >= Min-Value for Lowercase.
                if(temp >= this.LOWER_MIN){

                    decoded += String.fromCharCode(temp);

                } else { // Else wrap around back to z

                    decoded += String.fromCharCode(this.LOWER_MAX - (this.LOWER_MIN - temp));
                }

            //  Numbers or Special Characters
            } else {

                //  If Char is numeric
                if(this.NUM_MIN <= temp && temp <= this.NUM_MAX){

                    //  First tried: temp += (key % 10)
                    //  However 9s wouldn't encode/decode. Came out as 0s. 
                    //  (temp - key) % 10 seems to fix things
                    //  OK, so, fuck JS and it's remainder operator. Basically,
                    //  the remainder operator doesn't work as intended for 
                    //  negative numbers due to magic or something. Took me far 
                    //  too long to figure that out.
                    temp = mod(text[chr] - key, 10);

                    //  >= 0: Add as decoded output
                    if(temp >= 0){

                        decoded += temp;

                    } else { // Wrap back to 9
                        
                        decoded += 9 - Math.abs(temp);

                    }
                    
                //  Ignore everything else.
                } else {
                    decoded += text[chr];
                    continue;
                }
            }
            //  Resets Key to 25
            if(key < 25) key++;
            else key = 1;
        }

        return decoded;
    }
};

function mod(num, modu) {
    var remain = num % modu;
    return Math.floor(remain >= 0 ? remain : remain + modu);
}

//  Main App Logic
function Main(){
    
    //  Tests..
    var test = [
        "Encrypt This Text and then some. (Yeah that will show them.) 0123456789 234"
    ];
    var _last = null; 

    //  Named, Self-Invoking Function: for constant polling for changes to  
    //      #plaintext. First used both onchange & keydown events, 
    //      however that lead to inconsistent event-triggers, unsure why.
    //      I'm not trying for max-efficiency, RAF polling it is. 
    (function update(){

        var plain_text = document.getElementById('plaintext').value || test[0];

        //  Only run if changed
        if(_last !== plain_text){
            var encoded = Cipher.Encode(plain_text),
            decoded = Cipher.Decode(encoded);

            document.getElementById('plaintext').value  = plain_text;
            document.getElementById('encoded').value  = encoded;
            document.getElementById('decoded').value  = decoded;

            _last = plain_text;
        }
        
        requestAnimationFrame(update);
    }());  
};

(function(){
    if(!window.requestAnimationFrame){
        console.error('No RAF');
    } else {
        if(document.readyState === 'complete') Main();
        else document.addEventListener('DOMContentLoaded', Main, false);
    }
})();