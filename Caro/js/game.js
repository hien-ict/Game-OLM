turn = 1;
numP = 0;
var GameState = {
    create: function () {
        this.createMapState();

        this.board = game.add.sprite(0, 0, "board");
        this.board.inputEnabled = false;
        this.board.events.onInputDown.add(this.placeItem, this);
    },

    update: function () {
        if (turn % 2 == numP - 1) {
            this.board.inputEnabled = true;
        } else {
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
        mapState[i][j] = tu % 2;
        d1 = 0;
        d2 = 0;
        d3 = 0;
        d4 = 0;
        this.checkMap(i, j);
        if (d1 == 4 || d2 == 4 || d3 == 4 || d4 == 4) console.log('Win');
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

    checkMap: function (i, j) {
        value = mapState[i][j];
        var x = i,
            y = j;
        while (mapState[x][y - 1] == value) {
            d1++;
            y--;
            console.log(d1);
        }
        var x = i,
            y = j;
        while (mapState[x][y + 1] == value) {
            d1++;
            y++;
            console.log(d1);
        }
        var x = i,
            y = j;
        while (mapState[x - 1][y] == value) {
            d2++;
            x--;
            console.log(d2);
        }
        var x = i,
            y = j;
        while (mapState[x + 1][y] == value) {
            d2++;
            x++;
            console.log(d2);
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
