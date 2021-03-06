/** 
    Etude13 326
    @author Elbert Alcantara

    A. Given a base b and an integer n finds the longest block of integers all having
    repeated digits in base b that are less than n. The output should be the first
    integer of the block (in normal decimal representation) and the length of the
    block (if there is more than one block of the same length, the first one should
    be given.)
    
    B. Given two bases, b and c, finds the smallest integer n which has repeated
    digits in both bases.
 */

const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin });
const regexA = /^[A]\s{1}\d+\s{1}\d+$/;
const regexB = /^[B]\s{1}\d+\s{1}\d+$/;

/*
readline module is used to take input from stdin, we use 'on' to wait for event 'line' from
stdin, and when there is a line, the function (second argument of 'on') will be executed.
*/
rl.on("line", function(line) {
    if (regexA.test(line)) {
        var inputArray = line.match(/\d+/g);
        var abIn = inputArray[0];
        var anIn = inputArray[1];
        partA(abIn, anIn);
    } else if (regexB.test(line)) {
        var inputArray = line.match(/\d+/g);
        var bbIn = inputArray[0];
        var bcIn = inputArray[1];
        partB(bbIn, bcIn);
    } else {
        console.log("Bad line: " + line);
    }
});

/**
 * This function takes a number and converts it to the given base.
 *
 * @param {*} numx the number to convert
 * @param {*} basex numx gets converted to this base
 * @return {*} the converted number
 */
function baseConvert(numx, basex) {
    var inverted = [];
    var end = false;

    // Converts the input max value to the input base,
    // however the method used gives us the number in that
    // base, but inverted.
    while (!end) {
        if (numx >= basex) {
            var result = numx % basex;
            inverted.push(result.toString());
            numx = parseInt(numx / basex);
        } else {
            inverted.push(numx.toString());
            end = true;
        }
    }
    return inverted;
}

/**
 * Check whether argument number has repeated digits.
 *
 * @param {*} numx
 */
function repeatedNumCheck(numx, theBase) {
    var arrayCheck = new Array(theBase);
    for (var i = 0; i < theBase; i++) {
        arrayCheck[i] = 0;
    }

    for (var i = 0; i < numx.length; i++) {
        if (arrayCheck[numx[i]] == 0) {
            arrayCheck[numx[i]] = 1;
        } else {
            return true;
        }
    }
    return false;
}

/**
 * This function does Part A of the Etude, problem description above.
 *
 * @param {*} abInput base
 * @param {*} anInput max Int
 */
function partA(abInput, anInput) {
    var ab = parseInt(abInput);
    var an = parseInt(anInput);

    var bestBlock = 0;
    var bestBlockSize = 0;
    var testBlock = 0;
    var testBlockSize = 0;

    for (var i = 0; i < an; i++) {
        // Checks if the current int i has repeated digits in the given base.
        if (repeatedNumCheck(baseConvert(i, ab), ab)) {
            if (testBlockSize == 0) {
                testBlock = i;
            }
            testBlockSize++;
        } else if (testBlockSize != 0) {
            // If new block is larger, we make it the best.
            if (testBlockSize > bestBlockSize) {
                bestBlock = testBlock;
                bestBlockSize = testBlockSize;
            }
            testBlockSize = 0;
        }
    }
    if (testBlockSize > bestBlockSize) {
        bestBlock = testBlock;
        bestBlockSize = testBlockSize;
    }

    if (bestBlock == 0) {
        console.log("Bad line: " + ab + " " + an);
    } else {
        console.log(bestBlock + " " + bestBlockSize);
    }
}

/**
 * This function does Part B of the Etude, problem description above.
 *
 * @param {*} bbInput base one
 * @param {*} bcInput base two
 */
function partB(bbInput, bcInput) {
    var bb = parseInt(bbInput);
    var bc = parseInt(bcInput);

    // Checks whether input values are valid.
    if (bb > 1 && bc > 1) {
        var currentInt = 0;
        if (bb > bc) {
            currentInt = bb + 1;
        } else {
            currentInt = bc + 1;
        }

        while (true) {
            var bbNum = baseConvert(currentInt, bb);
            var bcNum = baseConvert(currentInt, bc);

            if (repeatedNumCheck(bbNum, bb)) {
                if (repeatedNumCheck(bcNum, bc)) {
                    break;
                }
            }
            currentInt++;
        }
        console.log(currentInt);
    } else {
        console.log("Bad line: " + bb + " " + bc);
    }
}