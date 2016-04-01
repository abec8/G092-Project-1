/*
 * Morse Code receiver app information:
 *
 * Function: messageFinished(): stops the capturing process
 *
 *     You can call this function to let the app know that the 
 *     end-of-transmission signal has been received.
 *
 * -------------------------------------------------------
 *
 * ID: messageField: id of the message text area
 *
 *     This will be a textarea element where you can display
 *     the recieved message for the user.
 * 
 * -------------------------------------------------------
 *
 * ID: restartButton: id of the Restart button
 *
 *     This is a button element.  When clicked this should 
 *     cause your app to reset its state and begin recieving
 *     a new message.
 *
 */

// ADD YOUR ADDITIONAL FUNCTIONS AND GLOBAL VARIABLES HERE

/*
 * This function is called once per unit of time with camera image data.
 * 
 * Input : Image Data. An array of integers representing a sequence of pixels.
 *         Each pixel is representing by four consecutive integer values for 
 *         the 'red', 'green', 'blue' and 'alpha' values.  See the assignment
 *         instructions for more details.
 * Output: You should return a boolean denoting whether or not the image is 
 *         an 'on' (red) signal.
 */
function decodeCameraImage(data)
{

var redAmount = 0, blueAmount = 0;

    //Need to call arrays referencing individual pixels. 
for(i=0;i<(data.length)-1;i=i+4){
        if (data[i] > data[i+2]){
        redAmount += 1;
        } else if (data[i] < data[i+2]) {
        blueAmount += 1;
        }
}
    if (redAmount > blueAmount){
        return true;
    }
    else {
        return false;
    }
    output = "";

 
 /* this is how we define characters, which must come after the "decode image" function as the true & false statements are concatenated
    this output is then parsed through the lookup table by searching "lookupTable[<dot & dash arrangement>]" to determine what the letter is
 output += decodeCameraImage(data), though different characters have to be separated
    
    dot  = true
    dash  = true + true + true
    charSpace = false
    letterSpace = false + false + false
    wordSpace = false + false + false + false + false + false + false
 */
 
/* var lookupTable = {
    dot + charSpace + dash + letterSpace : "a",
    dash + charSpace + dot + charSpace + dot + charSpace + dot + letterSpace : "b",
    dash + charSpace + dot + charSpace + dash + charSpace + dot + letterSpace : "c",
    dash + charSpace + dot + charSpace + dot + letterSpace : "d",
    dot + letterSpace : "e",
    dot + charSpace + dot + charSpace + dash + charSpace + dot + letterSpace : "f",
    dash + charSpace + dash + charSpace + dot + letterSpace : "g",
    dot + charSpace + dot + charSpace + dot + charSpace + dot + letterSpace : "h",
    dot + charSpace + dot + letterSpace : "i",
    dot + charSpace + dash + charSpace + dash + charSpace + dash + letterSpace : "j",
    dash + charSpace + dot + charSpace + dash + letterSpace : "k",
    dot + charSpace + dash + charSpace + dot + charSpace + dot + letterSpace : "l",
    dash + charSpace + dash + letterSpace : "m",
    dash + charSpace + dot + letterSpace : "n",
    dash + charSpace + dash + charSpace + dash + letterSpace : "o",
    dot + charSpace + dash + charSpace + dash + charSpace + dot + letterSpace : "p",
    dash + charSpace + dash + charSpace + dot + charSpace + dash + letterSpace : "q",
    dot + charSpace + dash + charSpace + dot + letterSpace : "r",
    dot + charSpace + dot + charSpace + dot + letterSpace : "s",
    dash + letterSpace : "t",
    dot + charSpace + dot + charSpace + dash + letterSpace : "u",
    dot + charSpace + dot + charSpace + dot + charSpace + dash + letterSpace : "v",
    dot + charSpace + dash + charSpace + dash + letterSpace : "w",
    dash + charSpace + dot + charSpace + dot + charSpace + dash + letterSpace : "x",
    dash + charSpace + dot + charSpace + dash + charSpace + dash + letterSpace : "y",
    dash + charSpace + dash + charSpace + dot + charSpace + dot + letterSpace : "z",
    dash + charSpace + dash + charSpace + dash + charSpace + dash + charSpace + dash + letterSpace : "0",
    dot + charSpace + dash + charSpace + dash + charSpace + dash + charSpace + dash + letterSpace : "1",
    dot + charSpace + dot + charSpace + dash + charSpace + dash + charSpace + dash + letterSpace : "2",
    dot + charSpace + dot + charSpace + dot + charSpace + dash + charSpace + dash + letterSpace : "3",
    dot + charSpace + dot + charSpace + dot + charSpace + dot + charSpace + dash + letterSpace : "4",
    dot + charSpace + dot + charSpace + dot + charSpace + dot + charSpace + dot + letterSpace : "5",
    dash + charSpace + dot + charSpace + dot + charSpace + dot + charSpace + dot + letterSpace : "6",
    dash + charSpace + dash + charSpace + dot + charSpace + dot + charSpace + dot + letterSpace : "7",
    dash + charSpace + dash + charSpace + dash + charSpace + dot + charSpace + dot + letterSpace : "8",
    dash + charSpace + dash + charSpace + dash + charSpace + dash + charSpace + dot + letterSpace : "9",
    dash + charSpace + dot + charSpace + dash + charSpace + dash + charSpace + dot + letterSpace : "(",
    dash + charSpace + dot + charSpace + dash + charSpace + dash + charSpace + dot + charSpace + dash + letterSpace : ")",
    dot + charSpace + dash + charSpace + dot + charSpace + dot + charSpace + dash + charSpace + dot + letterSpace : """,
    dash + charSpace + dot + charSpace + dot + charSpace + dot + charSpace + dash + letterSpace : "=",
    dot + charSpace + dash + charSpace + dash + charSpace + dash + charSpace + dash + charSpace + dot + letterSpace : "'",
    dash + charSpace + dot + charSpace + dot + charSpace + dash + charSpace + dot + letterSpace : "/",
    dot + charSpace + dash + charSpace + dot + charSpace + dash + charSpace + dot + letterSpace : "+",
    dash + charSpace + dash + charSpace + dash + charSpace + dot + charSpace + dot + charSpace + dot + letterSpace : ":",
    dot + charSpace + dash + charSpace + dot + charSpace + dash + charSpace + dot + charSpace + dash + letterSpace : ".",
    dash + charSpace + dash + charSpace + dot + charSpace + dot + charSpace + dash + charSpace + dash + letterSpace : ",",
    dot + charSpace + dot + charSpace + dash + charSpace + dash + charSpace + dot + charSpace + dot + letterSpace : "?",
    dash + charSpace + dot + charSpace + dot + charSpace + dot + charSpace + dot + charSpace + dash + letterSpace : "-",
    dot + charSpace + dash + charSpace + dash + charSpace + dot + charSpace + dash + charSpace + dot + letterSpace : "@",
    dot + charSpace + dot + charSpace + dot + charSpace + dash + charSpace + dot + charSpace + dot + charSpace + dash + letterSpace : "$",
    dot + charSpace + dot + charSpace + dash + charSpace + dash + charSpace + dot + charSpace + dash + letterSpace : "_",
    dash + charSpace + dot + charSpace + dash + charSpace + dot + charSpace + dash + charSpace + dash + letterSpace : "!",
    dot + charSpace + dash + charSpace + dot + charSpace + dash + letterSpace : "<br/>",
    dot + charSpace + dot + charSpace + dot + charSpace + dash + charSpace + dot + charSpace + dash + letterSpace : "End of Transmission",
};
*/
}
