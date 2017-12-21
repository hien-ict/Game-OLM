turn = 1; numP=0;
var GameState = {
    create: function () {
        this.createMapState();

        this.board = game.add.sprite(0, 0, "board");
        this.board.inputEnabled = false;
        this.board.events.onInputDown.add(this.placeItem, this);
    },

    update: function () {
        if (turn%2==numP-1){
            this.board.inputEnabled = true;
        }
        else{
            this.board.inputEnabled = false;
        }
    },

    createMapState: function () {
        mapState = new Array(32).fill(-1);
        mapState.forEach(function (x, i) {
            mapState[i] = new Array(32).fill(-1);
        });
    },

    play: function (tu, i, j) {
        if (tu%2==numP-1){
            this.board.inputEnabled = true;
        }
        mapState[i][j] = tu % 2;
        this.player = game.add.sprite(i * 25 + 12.5, j * 25 + 12.5, 'xo');
        this.player.anchor.setTo(0.5);
        this.player.scale.setTo(0.1);
        this.player.frame = tu % 2;
    },

    placeItem: function (sprite, event) {
        var x = event.position.x,
            y = event.position.y;
        var i = Math.floor(x / 25),
            j = Math.floor(y / 25);
        if (mapState[i][j] == -1) {
            turn++;
            GameState.sendData(turn, i, j);
        }

    },

    sendData: function (tu, x, y) {
        connection.emit('event.data', {
            room: 'room1',
            turn: tu,
            i: x,
            j: y
        });
    }

}
