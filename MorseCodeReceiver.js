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
var previousVal,
    trueCounter = 0,
    falseCounter = 0,
    letterInMorse = "",
    output = "",
    pixelTF,
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
        ".-..-.": " '' ", 
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
        "...-.-": messageFinished()
    };

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
function decodeCameraImage(data) {
    var redAmount = 0,
        blueAmount = 0;

    //Need to call arrays referencing individual pixels. 
    for (i = 0; i < (data.length) - 1; i = i + 4) {
        if (data[i] > data[i + 2]) {
            redAmount += 1;
        } else if (data[i] <= data[i + 2]) {
            blueAmount += 1;
        }
    }
    if (redAmount > blueAmount) {
        pixelTF = true;
    } else {
        pixelTF = false;
    }

    if (pixelTF == true) {

        if (previousVal == undefined) {
		previousVal = false;
        }

        if (previousVal == true) { //**this means we are in the process of determining a dot or a dash
        	trueCounter += 1;
        } else { //**this means that we are starting to analyse a new character, hence need to start a new true count
            //**now need to analyse the kind of space coming before the new character

            if (falseCounter == 1 || falseCounter == 2) {
                //**interelement space
                //**nothing happens
            }
            else if(falseCounter > 2 && falseCounter < 7) {
                //**intercharacter space
                output += lookupTable[letterInMorse];
            } else {
                //**interword space
                output += " ";
            }
            trueCounter = 1;
            previousVal = true;
        }
    } else {
       if (previousVal == undefined) {
			previousVal = false;
		}

        if (previousVal == false) { //**this means we are determining the type of space
            falseCounter += 1;
        } else { //**this means we are starting to analyse a new space, hence need to start a new false count
            if (trueCounter == 1 || trueCounter == 2) {
                //**need to add dot to letterInMorse
                letterInMorse += ".";
            } else {
                //**need to add dash to letterInMorse
                letterInMorse += "-";
            }
            falseCounter = 1;
            previousVal = false;
        }
    }
    messageField.innerHTML = output;
    if (pixelTF == true) {
		return true;
	}
	else { 
		return false;
	}
}
