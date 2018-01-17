turn = 1;
numP = 0;
var GameState = {
    create: function () {
        this.createMapState();

        game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.background = game.add.sprite(0, 2.5, "background");
        this.home = game.add.sprite(605, 80, "home");
        this.home.anchor.setTo(0.5);
        this.home.scale.setTo(0.25);
        this.home.inputEnabled = true;
        this.home.input.useHandCursor = true;
        this.home.events.onInputDown.add(this.resetGame, this);
        this.reset = game.add.sprite(535, 80, "reset");
        this.reset.anchor.setTo(0.5);
        this.reset.scale.setTo(0.25);
        this.reset.inputEnabled = true;
        this.reset.input.useHandCursor = true;
        this.reset.events.onInputDown.add(this.resetGame, this);


        this.board = game.add.sprite(0, 0, "board");
        this.board.inputEnabled = false;
        this.board.events.onInputDown.add(this.placeItem, this);

        this.full = game.add.sprite(615, 480, 'full');
        this.full.anchor.setTo(0.5);
        this.full.scale.setTo(0.15);
        this.full.inputEnabled = true;
        this.full.input.useHandCursor = true;
        this.full.events.onInputDown.add(this.gofull, this);
        this.full.events.onInputOver.add(this.over, this.full);
        this.full.events.onInputOut.add(this.out, this.full);

        this.createPlayer();
    },

    update: function () {

        this.controlHighlight();
        this.showCoordinates();
    },

    createMapState: function () {
        mapState = new Array(32).fill(-1);
        mapState.forEach(function (x, i) {
            mapState[i] = new Array(32).fill(-1);
        });
    },

    play: function (tu, i, j) {
        this.player = game.add.sprite(i * 25 + 12.5, j * 25 + 12.5, 'xo');
        this.player.anchor.setTo(0.5);
        this.player.scale.setTo(0.1);
        this.player.frame = tu % 2;
        mapState[i][j] = tu % 2;
        d1 = 0;
        d2 = 0;
        d3 = 0;
        d4 = 0;
        this.checkMap(i, j);
        if (d1 >= 4 || d2 >= 4 || d3 >= 4 || d4 >= 4) {
            if (turn % 2 != numP - 1) {
                this.printMessage("WIN!", 35, "f", "f", "0");
            } else {
                this.printMessage("LOSE!!", 35);
            }
            //            game.state.start("Preload");
//            connection.connected = false;
        }
        if (turn % 2 == numP - 1) {
            this.showR(i,j);
        } else {
            this.showP(i,j);
        }
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
        while (y > 0 && mapState[x][y - 1] == value) {
            d1++;
            y--;
            console.log(d1);
        }
        var x = i,
            y = j;
        while (y < 20 && mapState[x][y + 1] == value) {
            d1++;
            y++;
            console.log(d1);
        }
        var x = i,
            y = j;
        while (x > 0 && mapState[x - 1][y] == value) {
            d2++;
            x--;
            console.log(d2);
        }
        var x = i,
            y = j;
        while (x < 20 && mapState[x + 1][y] == value) {
            d2++;
            x++;
            console.log(d2);
        }
        var x = i,
            y = j;
        while (x > 0 && y > 0 && mapState[x - 1][y - 1] == value) {
            d3++;
            x--;
            y--;
            console.log(d3);
        }
        var x = i,
            y = j;
        while (x < 20 && y < 20 && mapState[x + 1][y + 1] == value) {
            d3++;
            x++;
            y++;
            console.log(d3);
        }
        var x = i,
            y = j;
        while (x > 0 && y < 20 && mapState[x - 1][y + 1] == value) {
            d4++;
            x--;
            y++;
            console.log(d4);
        }
        var x = i,
            y = j;
        while (x < 20 && y > 0 && mapState[x + 1][y - 1] == value) {
            d4++;
            x++;
            y--;
            console.log(d4);
        }
    },

    sendData: function (tu, x, y) {
        connection.emit('event.data', {
            room: 'room1',
            turn: tu,
            i: x,
            j: y
        });
    },

    printMessage: function (msg, size, r, g, b, x, y) {
        r = r || "f";
        g = g || "f";
        b = b || "f";
        var style = {
            font: "bold " + (size) + "pt Arial",
            fill: "#" + r + g + b,
            align: "center",
            stroke: "#258acc",
            strokeThickness: 6
        };
        x1 = x || 250;
        y1 = y || 250;
        this.msg = game.add.text(x1, y1, msg, style);
        this.msg.anchor.setTo(0.5, 0.5);

    },

    createPlayer: function () {
        var style = {
            font: "bold 16pt Arial",
            align: "center"
        }
        this.showPointer = game.add.sprite(500, 150, "player");
        this.showPointer.frame = 7;
        this.showPointer.scale.setTo(0.7);
        this.ho = game.add.text(540, 167, '');
        this.ve = game.add.text(605, 167, '');

        this.showPlayer = game.add.sprite(500, 250, "player");
        this.showPlayer.scale.setTo(0.7);
        this.showPlayer.animations.add('walk', [0, 1, 2], 1, true);
        this.showPlayer.animations.loop = true;
        this.showPlayer.animations.play('walk');
        this.Px = game.add.text(536, 290, '', style);
        this.Py = game.add.text(601, 290, '', style);

        this.highlightPlayer = game.add.sprite(500, 250, "highlight");
        this.highlightPlayer.scale.setTo(0.7);
        this.highlightPlayer.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 5, true);
        this.highlightPlayer.animations.play('walk');

        this.robot = game.add.sprite(500, 350, "player");
        this.robot.scale.setTo(0.7);
        this.robot.animations.add('walk', [3, 4, 5], 1, true);
        this.robot.animations.loop = true;
        this.robot.animations.play('walk');
        this.Rx = game.add.text(536, 393, '', style);
        this.Ry = game.add.text(601, 393, '', style);
        this.highlightRobot = game.add.sprite(500, 350, "highlight");
        this.highlightRobot.scale.setTo(0.7);
        this.highlightRobot.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 5, true);
        this.highlightRobot.animations.play('walk');
    },

    resetGame: function () {
        game.state.start('Game');
    },

    gofull: function () {
        if (game.scale.isFullScreen) {
            game.scale.stopFullScreen();
            this.full.frame = 0;
            this.full.scale.setTo(0.15);
        } else {
            game.scale.startFullScreen(false);
            this.full.frame = 1;
            this.full.scale.setTo(0.15);
        }
    },

    out() {
        this.scale.setTo(0.15);
    },

    over() {
        this.scale.setTo(0.20);
    },

    showCoordinates: function () {
        var x = game.input.mousePointer.position.x,
            y = game.input.mousePointer.position.y;
        var i = Math.floor(x / 25),
            j = Math.floor(y / 25);
        if (i > 19) i = 19;

        this.ho.setText(i + 1);
        this.ve.setText(j + 1);
    },

    showP: function (x, y) {
        this.Px.setText(x + 1);
        this.Py.setText(y + 1);
    },

    showR: function (x, y) {
        this.Rx.setText(x + 1);
        this.Ry.setText(y + 1);
    },

    controlHighlight: function () {

        if (turn % 2 == numP - 1) {
            this.board.inputEnabled = true;
            this.board.input.useHandCursor = true;
            this.highlightRobot.animations.stop('walk');
            this.highlightRobot.frame = 12;
            this.robot.animations.stop("walk");
            this.robot.frame = 9;

            this.highlightPlayer.animations.play('walk');
            //            this.highlightPlayer.frame = 0;
            this.showPlayer.animations.play('walk');
        } else {
            this.board.inputEnabled = false;
            this.highlightPlayer.animations.stop('walk');
            this.highlightPlayer.frame = 12;
            this.showPlayer.animations.stop("walk");
            this.showPlayer.frame = 6;

            this.highlightRobot.animations.play('walk');
            this.robot.animations.play('walk');
        }
    },

}
