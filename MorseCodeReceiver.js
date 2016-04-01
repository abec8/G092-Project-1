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
        pastTwo = previousVal + true
        previousVal = true
    }
    else {
        return false;
        pastTwo = previousVal + false
        previousVal = false
    }
    

 
 
 /* need to run through this after every image is analised, maybe it goes after the initial call?
 if decodeCameraImage(data) == true
 **run again
 **keep doing this until false
 **if there was 1 true, = "."
 **if there were 3 true, = "-"
 **if there is then 1 false, run again for new character
 **if there is then 3 false, parse through lookup table & run again for new letter
 **if there is then 7 false, = " " & run again for new word
 }
 
    this is how we define characters, which must come after the "decode image" function as the true & false statements are concatenated
    this output is then parsed through the lookup table by searching "lookupTable[<dot & dash arrangement>]" to determine what the letter is
 output += decodeCameraImage(data), though different characters have to be separated
    
    "."  = true
    "-"  = true + true + true
    letterSpace = false + false + false
    wordSpace = false + false + false + false + false + false + false
 */
 
/* var lookupTable = {
    "." + “-” + letterSpace : "a",
    “-” + "." + "." + "." + letterSpace : "b",
    “-” + "." + “-” + "." + letterSpace : "c",
    “-” + "." + "." + letterSpace : "d",
    "." + letterSpace : "e",
    "." + "." + “-” + "." + letterSpace : "f",
    “-” + “-” + "." + letterSpace : "g",
    "." + "." + "." + "." + letterSpace : "h",
    "." + "." + letterSpace : "i",
    "." + “-” + “-” + “-” + letterSpace : "j",
    “-” + "." + “-” + letterSpace : "k",
    “.” + “-” + “.” + “.” + letterSpace : "l",
    “-” + “-” + letterSpace : "m",
    “-” + “.” + letterSpace : "n",
    “-” + “-” + “-” + letterSpace : "o",
    “.” + “-” + “-” + “.” + letterSpace : "p",
    “-” + “-” + “.” + “-” + letterSpace : "q",
    “.” + “-” + “.” + letterSpace : "r",
    “.” + “.” + “.” + letterSpace : "s",
    “-” + letterSpace : "t",
    “.” + “.” + “-” + letterSpace : "u",
    “.” + “.” + “.” + “-” + letterSpace : "v",
    “.” + “-” + “-” + letterSpace : "w",
    “-” + “.” + “.” + “-” + letterSpace : "x",
    “-” + “.” + “-” + “-” + letterSpace : "y",
    “-” + “-” + “.” + “.” + letterSpace : "z",
    “-” + “-” + “-” + “-” + “-” + letterSpace : "0",
    “.” + “-” + “-” + “-” + “-” + letterSpace : "1",
    “.” + “.” + “-” + “-” + “-” + letterSpace : "2",
    “.” + “.” + “.” + “-” + “-” + letterSpace : "3",
    “.” + “.” + “.” + “.” + “-” + letterSpace : "4",
    “.” + “.” + “.” + “.” + “.” + letterSpace : "5",
    “-” + “.” + “.” + “.” + “.” + letterSpace : "6",
    “-” + “-” + “.” + “.” + “.” + letterSpace : "7",
    “-” + “-” + “-” + “.” + “.” + letterSpace : "8",
    “-” + “-” + “-” + “-” + “.” + letterSpace : "9",
    “-” + “.” + “-” + “-” + “.” + letterSpace : "(",
    “-” + “.” + “-” + “-” + “.” + “-” + letterSpace : ")",
    “.” + “-” + “.” + “.” + “-” + “.” + letterSpace : """,
    “-” + “.” + “.” + “.” + “-” + letterSpace : "=",
    “.” + “-” + “-” + “-” + “-” + “.” + letterSpace : "'",
    “-” + “.” + “.” + “-” + “.” + letterSpace : "/",
    “.” + “-” + “.” + “-” + “.” + letterSpace : "+",
    “-” + “-” + “-” + “.” + “.” + “.” + letterSpace : ":",
    “.” + “-” + “.” + “-” + “.” + “-” + letterSpace : ".",
    “-” + “-” + “.” + “.” + “-” + “-” + letterSpace : ",",
    “.” + “.” + “-” + “-” + “.” + “.” + letterSpace : "?",
    “-” + “.” + “.” + “.” + “.” + “-” + letterSpace : "-",
    “.” + “-” + “-” + “.” + “-” + “.” + letterSpace : "@",
    “.” + “.” + “.” + “-” + “.” + “.” + “-” + letterSpace : "$",
    “.” + “.” + “-” + “-” + “.” + “-” + letterSpace : "_",
    “-” + “.” + “-” + “.” + “-” + “-” + letterSpace : "!",
    “.” + “-” + “.” + “-” + letterSpace : "<br/>",
    “.” + “.” + “.” + “-” + “.” + “-” + letterSpace : "End of Transmission"

};
*/
}
