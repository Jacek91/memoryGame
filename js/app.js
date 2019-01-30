$(function () {
    const images = [
        "./images/jaime.jpg",
        "./images/jaime.jpg",
        "./images/oberyn.jpg",
        "./images/oberyn.jpg",
        "./images/dany.jpg",
        "./images/dany.jpg",
        "./images/bronn.jpg",
        "./images/bronn.jpg",
        "./images/jon.jpg",
        "./images/jon.jpg",
        "./images/ned.jpg",
        "./images/ned.jpg",
        "./images/arya.jpg",
        "./images/arya.jpg",
        "./images/tyrion.jpg",
        "./images/tyrion.jpg"
    ];
    const game = $(".game");
    const movesNum = $(".movesCounter");
    const timeNum = $(".timeCounter");
    const restart = $(".restart");
    const start = $(".start");
    const timeCounter = $(".timeCounter");
    let counter = 30;
    let gameStart = false;
    let matches = 0;
    let moves = 0;
    let opened = [];
    let flag = true;

    shuffle = array => {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    };

    newGame = () => {
        game.empty();
        counter = 30 + " s";
        moves = 0;
        matches = 0;
        timeNum.html(counter);
        movesNum.html(moves);
        game.find(".flip").removeClass("flip notmatch match");
        let cards = shuffle(images);
        for (let i = 0; i < cards.length; i++) {
            game.append(
                $(
                    `<div class="card" data-elem="${cards[i]}"><img src='${
              cards[i]
            }' class='value'></img></div>`
                )
            );
        }
    };

    game.on("click", '.card:not(".match, .flip")', function () {
        if (game.find(".flip").length >= 2 || !gameStart) {
            return false;
        }

        let flipped = $(this).data("elem");
        $(this).addClass("flip");
        opened.push(flipped);

        if (opened.length > 1) {
            if (opened[0] === opened[1]) {
                game.find(".flip").addClass("match");
                setTimeout(() => {
                    game.find(".match").removeClass("flip");
                }, 500);
                matches++;
            } else {
                game.find(".flip").addClass("notmatch");
                setTimeout(() => {
                    game.find(".flip").removeClass("flip notmatch");
                }, 500);
            }
            opened = [];
            moves++;
            movesNum.html(moves);
        }
        if (matches === 8) {
            setTimeout(function () {
                endGame(moves);
            }, 500);
        }
    });

    reset = () => {
        swal({
            allowEscapeKey: false,
            allowOutsideClick: false,
            title: "Are you sure?",
            text: "Your progress will be lost!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#8e793e",
            cancelButtonColor: "#ad974f",
            confirmButtonText: "Yes, Restart Game!"
        }).then(function (isConfirm) {
            if (isConfirm) {
                flag = false;
                newGame();
                timer();
            }
        }).catch(swal.noop);
    };

    endGame = moves => {
        swal({
            allowEscapeKey: false,
            allowOutsideClick: false,
            title: "Congratulations! You Won!",
            text: "With " + moves + " moves!",
            type: "success",
            confirmButtonColor: "#8e793e",
            confirmButtonText: "Play again!"
        }).then(function (isConfirm) {
            if (isConfirm) {
                flag = false;
                newGame();
                timer();
            }
        });
    };

    timer = () => {
        gameStart = true;
        let counter = 30;
        var int = setInterval(() => {
            if (matches === 8 || counter === 0) {
                game.find(".flip").removeClass("flip notmatch");
                gameStart = false;
                clearInterval(int);
                return false;
            } else if (!flag) {
                clearInterval(int);
                flag = true;
            } else {
                counter--;
                timeCounter.text(counter + " s");
            }
        }, 1000);
        newGame();
    };

    start.one("click", timer);
    restart.on("click", reset);

    newGame();
});