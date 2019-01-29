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
    let counter = 30;
    let moves = 0;
    

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
    newGame()
});