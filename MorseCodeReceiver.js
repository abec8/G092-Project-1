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
    lookupTable = {
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

//needs function description
document.getElementById("restartButton").addEventListener("click", function()
{
    output = "",
        trueCounter = 0,
        falseCounter = 0,
        characterInMorse = "",
        setMsg(output);
});


//needs function description
function setMsg(msg)
{
    console.log('set SMg' + msg);
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
 //needs function description
function decodeCameraImage(data)
{
    var redAmount = 0, //red pixel counter reset after function call
        blueAmount = 0,//blue pixel counter reset after function call
        imageTrueFalse; //saves whether image is on (red) or off (blue) to be returned at end of function

    for (i = 0; i < (data.length) - 1; i += 4)//Call arrays referencing individual pixels to analyse red, green and blue amounts 
    {
        r = data[i]
        g = data[i+1]
        b = data[i+2]
        if (r > b && r > g)
        {
            redAmount++;
        }
        else if (r < b && g < b)
        {
            blueAmount++;
        }
    }
    if (redAmount > blueAmount)
    {
        imageTrueFalse = true; // returned at end of function
    }
    else
    {
        imageTrueFalse = false; // returned at end of function
    }

    if (imageTrueFalse == true)
    {

        if (previousVal == undefined)
        {
            previousVal = false;
        }

        if (previousVal == true)
        { //this means we are in the process of determining a dot or a dash
            trueCounter += 1;
        }
        else
        { //this means that we are starting to analyse a new character, hence need to start a new true count
            //now need to analyse the kind of space coming before the new character

            if (falseCounter == 1 || falseCounter == 2)
            {
                //interelement space
                //nothing happens
            }
            else if (falseCounter > 2 && falseCounter <= 6)
            {
                //intercharacter space
                output += lookupTable[characterInMorse];
                characterInMorse = "";
            }
            else if (falseCounter > 6)
            {
                //**interword space
                if (characterInMorse == "")
                { //prevent first output being "undefined"
                    output = ""
                }
                else
                {
                    output += lookupTable[characterInMorse] + "  ";
                    characterInMorse = "";
                }
            }
            trueCounter = 1;
            previousVal = true;
        }
    }
    else
    {
        if (previousVal == undefined)
        {
            previousVal = false;
        }

        if (previousVal == false)
        { //**this means we are determining the type of space
            falseCounter += 1;
        }
        else
        { //**this means we are starting to analyse a new space, hence need to start a new false count
            if (trueCounter == 1 || trueCounter == 2)
            {
                //need to add dot to characterInMorse
                characterInMorse += ".";
            }
            else if (trueCounter > 2)
            {
                //**need to add dash to characterInMorse
                characterInMorse += "-";
            }

            if (falseCounter > 3 && trueCounter == 0)
            {
                output += lookupTable[characterInMorse];
            }

            if (lookupTable[characterInMorse] === "SK")
            {
                messageFinished();
            }
            falseCounter = 1;
            previousVal = false;
        }
    }
    setMsg(output);

    if (imageTrueFalse == true)
    {
        return true;
    }
    else
    {
        return false;
    }
}
