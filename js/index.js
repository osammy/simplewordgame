

window.onload = init;

function init() {

    var dictionary = [
        "lusts", "luter", 'trues', "rusts", "sluse",
        "suers", "rests", "sluts", "slues", "lures",
        "sures", "truss", "trues", "tress", "users",
        "rusts", "tules", "rules", "slurs", "ruses",
        "lutes","set","rule","lut","luts"
    ];


    var check = document.getElementById('check');



    var container = document.getElementById('inner-top-left')
    console.log(container);
    container.onkeyup = function (e) {
        // alert('er')
        var target = e.srcElement || e.target;
        var maxLength = parseInt(target.attributes["maxlength"].value, 10);
        var myLength = target.value.length;
        if (myLength >= maxLength) {

            var next = target;

            while (next = next.nextElementSibling) {
                if (next == null) {

                    break;
                }

                if (next.tagName.toLowerCase() === "input") {
                    next.focus();
                    break;
                }
            }
        }
        // Move to previous field if empty (user pressed backspace)
        else if (myLength === 0) {
            var previous = target;
            while (previous = previous.previousElementSibling) {
                if (previous == null)
                    break;
                if (previous.tagName.toLowerCase() === "input") {
                    previous.focus();
                    break;
                }
            }
        }
    }

    /*define function checkword */

    function checkWord(dWord) {
        return dictionary.filter(function (value) {
            return dWord !== value.toUpperCase();
        })
    }
    /* end defination*/







    /*focuse code*/
    var blurred, focused, wordEntered = ""; var keepAccount = [], globalKeeper = [];
    var score = 0, highScore = 0;
    var test = document.getElementsByClassName('letter');


    /* Reset Game */
    function resetGame() {
        showScore = document.getElementById('score');
        showScore.innerText = "Score";

        for (var j = 0; j < globalKeeper.length; j++) {
            globalKeeper[j].style.background = '#808080';
            globalKeeper[j].value = "";
            globalKeeper[j].disabled = false;

        }
        init();
    }
    /*End Reset Game */

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
                console.log(wordEntered);
                var answer = document.getElementById('answer');

                wordList = checkWord(wordEntered);
                if (wordList.length == dictionary.length) {
                    next.parentElement.classList.add('animated', 'wobble');
                    answer.innerText = "Wrong!";
                    answer.classList.add('wrong');

                    //setTimeout(function () {
                        answer.classList.add('animated', 'fadeOut');
                    //}, 100);

                    setTimeout(function () {
                        answer.classList.remove('animated', 'fadeOut', 'wrong');
                        answer.innerText = "";
                        next.parentElement.classList.remove('animated', 'wobble');
                    }, 1000)

                    for (var k = 0; k < keepAccount.length; k++) {

                        keepAccount[k].value = "";
                    }

                }
                else {
                    dictionary = wordList;
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
                return;
            }
            while (next = next.nextElementSibling) {
                if (next == null) {
                    // alert('here')
                    // checkValue() 
                    alert('null o');

                    break;
                }

                if (next.tagName.toLowerCase() === "input") {
                    // alert('het')
                    // console.log(container);
                    // console.log(container[0]);
                    // if(next.attributes["name"].value = "last")
                    next.focus();
                    break;
                }
            }

        })

    }

    var els = document.querySelectorAll('input');
    Array.prototype.forEach.call(els, function (el) {
        el.addEventListener('blur', function () {
            blurred = this;
            //   console.log('blurred',blurred)
            //   console.log(blurred.value);
            // blurred.value = "r"
        });
        el.addEventListener('focus', function () {
            focused = this;
            var last = blurred;
            console.log('focused', focused)
            setTimeout(function () { console.log('previous: ' + (last ? last.name : 'none')) }, 0);
        });
    });


    var restartGame = document.getElementById('restart-game');
    restartGame.addEventListener('click', function () {
        console.log('restart')
        resetGame();

    })
}