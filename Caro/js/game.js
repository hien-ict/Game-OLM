turn=0;
var GameState = {
    create: function () {
        this.createMapState();

        this.board = game.add.sprite(0, 0, "board");
        this.board.inputEnabled = true;
        this.board.events.onInputDown.add(this.placeItem, this);
    },

    update: function () {
        this.play();
    },

    createMapState: function () {
        mapState = new Array(32).fill(0);
        mapState.forEach(function (x, i) {
            mapState[i] = new Array(32).fill(0);
        });
    },

    play: function () {

    },

    placeItem: function (sprite, event) {
        var x = event.position.x,
            y = event.position.y;
        var i = Math.floor(x / 25),
            j = Math.floor(y / 25);
        x = i * 25 + 12.5;
        y = j * 25 + 12.5;
        if (mapState[i][j] == 0) {
            turn++;
            mapState[i][j] = 1;
            this.player = game.add.sprite(x, y, 'xo');
            this.player.anchor.setTo(0.5);
            this.player.scale.setTo(0.1);
            this.player.frame=turn%2;
        }

    }

}
