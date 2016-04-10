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
var previousVal, // keeps track of previous (true or false) image value
    trueCounter = 0, // counts consecutive true values
    falseCounter = 0, // counts consecutive false values
    characterInMorse = "", // tracks the character ID
    output = "", //message to be printed
    lookupTable = { //lookup table contains lower-case letter characters
        ".-": "a",
        "-...": "b",
        "-.-.": "c",
        "-..": "d",
        ".": "e",
        "..-.": "f",
        "--.": "g",
        "....": "h",
        "..": "i",
        ".---": "j",
        "-.-": "k",
        ".-..": "l",
        "--": "m",
        "-.": "n",
        "---": "o",
        ".--.": "p",
        "--.-": "q",
        ".-.": "r",
        "...": "s",
        "-": "t",
        "..-": "u",
        "...-": "v",
        ".--": "w",
        "-..-": "x",
        "-.--": "y",
        "--..": "z",
        "-----": "0",
        ".----": "1",
        "..---": "2",
        "...--": "3",
        "....-": "4",
        ".....": "5",
        "-....": "6",
        "--...": "7",
        "---..": "8",
        "----.": "9",
        "-.--.": "(",
        "-.--.-": ")",
        ".-..-.": "\"",
        "-...-": " = ",
        ".----.": "'",
        "-..-.": "/",
        ".-.-.": "+",
        "---...": ":",
        ".-.-.-": ".",
        "--..--": ",",
        "..--..": "?",
        "-....-": "-",
        ".--.-.": "@",
        "...-..-": "$",
        "..--.-": "_",
        "-.-.--": "!",
        ".-.-": " ",
        ".-.-": "\n",
        "...-.-": "SK" //messageFinished signal
    };

/*function() resets all global variables & clears element tagged "messageField".
*/
document.getElementById("restartButton").addEventListener("click", function() // assign action to restart button being clicked
{
    output = "",
    trueCounter = 0,
    falseCounter = 0,
    characterInMorse = "",
    setMsg(output);
});


/*setMsg takes msg input & prints its text to the message field of the document
* Input : A string of characters to be printed to the message field of the document.
* Output : No returned output. String of characters is printed to element tagged "messageField".
*/
function setMsg(msg)
{
    var msgRef = document.getElementById('messageField');
    msgRef.textContent = msg;
}

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
    var redAmount = 0, //red pixel counter reset after function call
        blueAmount = 0,//blue pixel counter reset after function call
        imageTrueFalse; //saves whether image is on (red) or off (blue) to be returned at end of function

    for (i = 0; i < (data.length) - 1; i += 4)//Call arrays referencing individual pixels to analyse red, green and blue amounts 
    {
        r = data[i] // Red pixel data
        g = data[i+1] // Green pixel data
        b = data[i+2] // Blue pixel data
        if (r > b && r > g) // majority red pixel
        {
            redAmount++;
        }
        else if (r < b && g < b) // majority blue pixel
        {
            blueAmount++;
        }
    }
    if (redAmount > blueAmount) // determine whether image was made up of more red pixels than blue
    {
        imageTrueFalse = true; // value of image to be returned at end of function
    }
    else // determine whether image was made up of more blue pixels than red
    {
        imageTrueFalse = false; // value of image to be returned at end of function
    }

    if (imageTrueFalse == true) // "on" signal is recieved
    {

        if (previousVal == undefined) // prevents errors caused by the first signal not having preceeding value
        {
            previousVal = false;
        }
        if (previousVal == true) // in the process of determining a dot or a dash
        { 
            trueCounter += 1; // add up number of true signals to later determine dot or dash
        }
        else // need to analyse the type of space coming before the new character
        {  
            if (falseCounter == 1 || falseCounter == 2)
            {
                //interelement space - character is still being constructed, so no action necessary
            }
            else if (falseCounter > 2 && falseCounter <= 6) //intercharacter space
            {
                output += lookupTable[characterInMorse]; // analyse character and add to output string
                characterInMorse = ""; // reset character ID for next character to be constructed
            }
            else if (falseCounter > 6) // interword space
            {
                if (characterInMorse == "") // prevent first output being "undefined" due to delay starting signal transmission
                { 
                    output = "" //clear string to prevent printing of "undefined"
                }
                else //analyse character, add to output string, add word space
                {
                    output += lookupTable[characterInMorse] + "  "; // analyse character, add to output string, add word space
                    characterInMorse = ""; // reset character ID for next character to be constructed
                }
            }
            trueCounter = 1; // count true statements to track dots and dashes
            previousVal = true; // set value for previous value
        }
    }
    else  // "off" signal is recieved
    {
        if (previousVal == undefined) // prevents errors caused by the first signal not having preceeding value
        {
            previousVal = false;
        }

        if (previousVal == false) // in process of determining type of space
        { 
            falseCounter += 1; // add up consecutive false signals to determine type of space
        }
        else // analysing new space, need to start new false count
        {
            if (trueCounter == 1 || trueCounter == 2)
            {
                characterInMorse += "."; // add dot to character ID
            }
            else if (trueCounter > 2)
            {
                characterInMorse += "-"; // add dash to character ID
            }
            if (falseCounter > 3 && trueCounter == 0)
            {
                output += lookupTable[characterInMorse]; // add character to output string after prolonged "false" signal (eg. end of transmission)
            }
            if (lookupTable[characterInMorse] === "SK")
            {
                messageFinished(); // run messageFinished() when end of message signal is recieved
            }
            falseCounter = 1; // count false statements to track spaces
            previousVal = false; // set value for previous value
        }
    }
    setMsg(output); //run setMSG function to print output to "msgField"

    if (imageTrueFalse == true)
    {
        return true; // denotes image was mostly red (on)
    }
    else
    {
        return false; // denotes image was mostly blue (off)
    }
}
