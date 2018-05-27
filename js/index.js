

window.onload = init;

function init() {

    // var dictionary = [
    //     "lusts", "luter", 'trues', "rusts", "sluse",
    //     "suers", "rests", "sluts", "slues", "lures",
    //     "sures", "truss", "trues", "tress", "users",
    //     "rusts", "tules", "rules", "slurs", "ruses",
    //     "lutes", "set", "rule", "lut", "luts"
    // ];

    var result = [
        "lusts", "luter", 'trues', "rusts", "sluse",
        "suers", "rests", "sluts", "slues", "lures",
        "sures", "truss", "trues", "tress", "users",
        "rusts", "tules", "rules", "slurs", "ruses",
        "lutes", "set", "rule", "lut", "luts"
    ];

    var houses = [
        "hose", "shoe", "shoes", "sou", "she", "house"
    ]

    var relief = [
        "feel", "lie", "file", "ref", "reef", "free", "flee",
        "flier", "relie"
    ]


    // var tiles = [
    //     "result","change","houses","savers","insect","spaces","relief","belief"
    // ]
    var bitter = [
        "bit", "bite", "rite", "rib", "rit", "tier", "bet"
    ]

    var wordKey = ["result", "houses", "relief", "bitter"];

    var tiles = {
        "result": result,
        "houses": houses,
        "relief": relief,
        "bitter": bitter
    }
    var bgColor = ["", "", ""]

    var stage = 1; var maxWordsPerStage = 5; var wordsPerStage = 0; var currentDictionary = "";
    var wordsCompleted = 0;

    function determineStage() {
        return stage;
    }

    // determineStage() 

    function fillTiles() {
        stage = determineStage();

        var buttons = document.getElementsByClassName('letter');

        for (var i = 0; i < buttons.length; i++) {
            buttons[i].innerText = wordKey[stage - 1][i].toUpperCase();
        }


    }

    function clearAllFields() {
        wordEntered = ""; keepAccount = [];
        score = 0, highScore = 0, wordsCompleted = 0;
        /*reset all input tags removing their disabled attribute so that the inputs are writable for
        the next stage*/
        for (var j = 0; j < globalKeeper.length; j++) {
            globalKeeper[j].style.background = '#808080';
            globalKeeper[j].value = "";
            globalKeeper[j].disabled = false;

        }
    }

    fillTiles();
    var dictionary = getDictionary();


    // var el = document.getElementById('getDiv');


    // function pickRandomProp() {
    //     var result,count=0;
    //     for(var prop in dtiles)
    //     if(Math.random() <1/++count) result = prop;
    //     return result;
    // }

    function incrementStage() {
        stage++;
        return stage;
    }

    function callSetTimeout(inputField) {
        setTimeout(function () {
            answer.classList.remove('animated', 'fadeOut', 'wrong');
            answer.innerText = "";
            console.log(inputField)
            inputField.parentElement.classList.remove('animated', 'wobble');
        }, 1000)
    }

    function moveToNextStage(currentStage) {
        // alert(currentStage)
        if (currentStage == 3) {
            alert("congrats you have passed the last stage");
            return;
        }
        document.getElementById('main').style.background = '#295396';
        clearAllFields();
        var board = document.getElementsByClassName("letter");

        for (var i = 0; i < wordKey[currentStage - 1].length; i++) {
            board[i].innerText = wordKey[currentStage - 1][i].toUpperCase();
        }
        // document.getElementsByClassName("one")[0].parentElement.firstChild.focus();
    }

    function placeCursorInNextField(theElement) {
        console.log(theElement.classList[0])
        switch (theElement.classList[0]) {
            case "one":
                // console.log(document.getElementsByClassName("two")[0])
                document.getElementsByClassName("two")[0].parentElement.firstChild.focus();
                break;
            case "two":
                document.getElementsByClassName("three")[0].parentElement.firstChild.focus();
                break;
            case "three":
                document.getElementsByClassName("four")[0].parentElement.firstChild.focus();
                break;
            case "four":
                document.getElementsByClassName("five")[0].parentElement.firstChild.focus();
                break;

        }


    }

    function clearField() {
        for (var k = 0; k < keepAccount.length; k++) {

            keepAccount[k].value = "";
        }
    }


    /*define function checkword */

    function getDictionary() {

        currentDictionary = tiles[wordKey[stage - 1]];
        return currentDictionary;
    }

    function checkWord(dWord, dictionary) {

        return dictionary.filter(function (value) {
            return dWord !== value.toUpperCase();
        })
    }

    function checkIfFilled(inputTag) {


        count = inputTag.parentElement.childElementCount;

        for (var i = 0; i < count; i++) {
            if ((inputTag.previousElementSibling.value == null) || (inputTag.previousElementSibling.value == "")) {
                inputTag.previousElementSibling.focus();
                return false;
            }
            if (inputTag.previousElementSibling.tagName != "input") {
                break;
            }
            inputTag = inputTag.previousElementSibling;
            console.log(inputTag.previousElementSibling)

        }
        return true;

    }
    /* end defination*/

    /*focuse code*/
    var blurred, focused, wordEntered = ""; var keepAccount = [], globalKeeper = [];
    var score = 0, highScore = 0;
    


    /* Reset Game */
    function resetGame() {
        showScore = document.getElementById('score');
        showScore.innerText = "Score";

        clearAllFields();
        init();
    }
    startGame();

    /*End Reset Game */
function startGame() {
        var test = document.getElementsByClassName('letter');
        for (var i = 0; i < test.length; i++) {

        test[i].addEventListener('click', function (e) {

            blurred.value = e.target.innerText;
            wordEntered = wordEntered + e.target.innerText;
            next = blurred;

            if (next.tagName.toLowerCase() == 'input') {
                keepAccount.push(next);
                globalKeeper.push(next);
            }

            if (next.nextElementSibling == null) {

                full = checkIfFilled(next);
                if (!full) return;
                var answer = document.getElementById('answer');
                
                wordList = checkWord(wordEntered, dictionary);
                if (wordList.length == dictionary.length) {

                    next.parentElement.classList.add('animated', 'wobble');
                    answer.innerText = "Wrong!";
                    answer.classList.add('wrong');

                    next.parentElement.firstChild.focus();


                    //setTimeout(function () {
                    answer.classList.add('animated', 'fadeOut');
                    //}, 100);
                    console.log(next)
                    callSetTimeout(next)
                    clearField();


                }
                else {
                    dictionary = wordList;
                    wordsCompleted++;
                    placeCursorInNextField(next)
                    answer.innerText = "Correct!";
                    answer.classList.add('right');
                    score += 5;
                    highScore += 5;
                    showScore = document.getElementById('score');
                    showScore.innerText = "Score: " + score;


                    for (var k = 0; k < keepAccount.length; k++) {
                        keepAccount[k].style.background = "#4caf50";
                        // keepAccount[k].classList.add('good');
                        keepAccount[k].disabled = true;
                    }

                    answer.classList.add('animated', 'fadeOut');

                    setTimeout(function () {
                        answer.classList.remove('animated', 'fadeOut', 'right');
                        answer.innerText = "";
                    }, 1000)

                }
                wordEntered = "";
                keepAccount = [];
                if (wordsCompleted == maxWordsPerStage) {
                    nextStage = incrementStage();

                    moveToNextStage(nextStage);
                    document.getElementsByClassName("one")[0].parentElement.firstChild.focus();
                    return;
                }

            }
            //this piece of code does the moving of cursor
            while (next = next.nextElementSibling) {
                if (next == null) {
                    break;
                }
                if (next.tagName.toLowerCase() === "input") {

                    next.focus();
                    break;
                }
            }

        })

    }
}

//the below code gives an eventListener for all inputs and gives us the input htat ha been blurred
    var els = document.querySelectorAll('input');
    Array.prototype.forEach.call(els, function (el) {
        el.addEventListener('blur', function () {
            blurred = this;
            //   console.log('blurred',blurred)
            //   console.log(blurred.value);
            // blurred.value = "r"
        });
        // el.addEventListener('focus', function () {
        //     focused = this;
        //     var last = blurred;
        //     //console.log('focused', focused)
        //     //setTimeout(function () { console.log('previous: ' + (last ? last.name : 'none')) }, 0);
        // });
    });


    var restartGame = document.getElementById('restart-game');
    restartGame.addEventListener('click', function () {
        console.log('restart')
        resetGame();

    })
}