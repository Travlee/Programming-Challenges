
#   Caesar Cipher - Sub Cipher
#   Python 3.4.3
#   06/27/15 - 06/30/15
#       - Key:          Rotating Int(1-25); Wrapping A-Z, Z-A
#       - Valid Input:  [a-z, A-Z, 0-9] (Ignores special characters)


#   Character-Values
LOWER_MIN = 97; LOWER_MAX = 122 # Lowercase
UPPER_MIN = 65; UPPER_MAX = 90  # Uppercase
NUM_MIN = 48; NUM_MAX = 57      # Numbers

def encode(text):
    key = 1; encoded_text = ''

    for char in text:

        #   Converts Char to Int
        temp = ord(char)

        #   If Char is Uppercase
        if(UPPER_MIN <= temp <= UPPER_MAX):
            temp += key

            #   Less-Than Max-Value for Uppercase.
            if(temp <= UPPER_MAX):
                encoded_text += chr(temp)

            #   Else wrap around back to A
            else:
                encoded_text += chr(UPPER_MIN + (temp - UPPER_MAX))

        #   If Char is Lowercase
        elif(LOWER_MIN <= temp <= LOWER_MAX):
            temp += key

            #   Less-Than Max-Value for Lowercase.
            if(temp <= LOWER_MAX):
                encoded_text += chr(temp)

            #   Else wrap around back to A
            else:
                encoded_text += chr(LOWER_MIN + (temp - LOWER_MAX))
        
        #   Encode Numbers, Ignore Special Characters
        else:

            #   If Char is numeric
            if(NUM_MIN <= temp <= NUM_MAX):

                #   Works finally. Wooo
                #   First tried: temp += (key % 10)
                #   However 9s wouldn't encode/decode. Came out as 0s. 
                #   (temp + key) % 10 seems to fix things  
                temp = int(char)
                temp = (temp + key) % 10

                #   Less-Than 9: Add as encoded output
                if(temp <= 9):
                    encoded_text += str(temp)

                #   Wrap back to 0
                else:
                    encoded_text += str(temp - 9)
                
            #   Ignore everything else.
            else:
                encoded_text += chr(temp)
                continue

        #   Increments Key; Max 25
        if(key < 25): key += 1
        else: key = 1;

    return encoded_text

def decode(text):
    key = 1; decoded_text = ''

    for char in text:

        #   Converts Char to Int
        temp = ord(char)

        #   If Char is Uppercase
        if(UPPER_MIN <= temp <= UPPER_MAX):
            temp -= key

            #   If Char + Key is Greater-Than Min-Value for Uppercase.
            if(temp >= UPPER_MIN):
                decoded_text += chr(temp)

            #   Else wrap around back to Z
            else:
                decoded_text += chr(UPPER_MAX - (UPPER_MIN - temp))

        #   If Char is Lowercase
        elif(LOWER_MIN <= temp <= LOWER_MAX):
            temp -= key

            #   If Char + Key is Greater-Than Min-Value for Lowercase.
            if(temp >= LOWER_MIN):
                decoded_text += chr(temp)

            #   Else wrap around back to Z
            else:
                decoded_text += chr(LOWER_MAX - (LOWER_MIN - temp))

        #   Deocde Numbers, Ignore Special Characters
        else:

            #   If Char is numeric
            if(NUM_MIN <= temp <= NUM_MAX):

                #   This took a bit to get it to work right.
                temp = int(char)
                temp = (temp - key) % 10


                #   Greater than 0: Add as decoded
                if(temp >= 0):
                    decoded_text += str(temp)

                #   Wrap to 9
                else:
                    decoded_text += str(9 - (0 - temp))

            #   If any other character, ignore
            else:
                decoded_text += chr(temp)
                continue

        #   Resets Key at 25
        if(key < 25): key += 1
        else: key = 1;

    return decoded_text

def main():
    plaintxt = "Encrypt This Text and then some. (Yeah that will show them.) 012345678901234567890 234"
    encoded = encode(plaintxt)
    decoded = decode(encoded)

    print("Input:   {0} \nEncoded: {1}\nDecoded: {2}".format(
        plaintxt, encoded, decoded))

main() 