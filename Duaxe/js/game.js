var style = {
    font: '105px Arial',
    fill: '#fff',
    align: "center",
    stroke: "#ff0000",
    strokeThickness: 2,
    //backgroundColor: 'rgba(0,0,0,0.5)'
};
state = 'new';
spe = 30;
var player = new Array(4);
var GameState = {

    create: function () {

        co = 0;
        this.background = game.add.sprite(0, 0, "background");
        this.background.alpha = 0.8;
        this.text = game.add.text(759, 825, "QUAY", style);
        this.text.anchor.setTo(0.5);
        //        this.background.scale.setTo(0.5);
        this.createSnd();
        //        this.sndQuay.play();
        this.quay = game.add.sprite(492, 838, 'quay');
        this.quay.anchor.setTo(0.5);
        this.quay.scale.setTo(0.5);
        this.quay.inputEnabled = true;
        this.quay.events.onInputDown.add(this.show, this);
        this.quay.events.onInputUp.add(this.play, this);
        this.quay.input.useHandCursor = true;
        this.quay.input.pixelPerfectClick = true;
        this.quay.input.pixelPerfectOver = true;

        game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.levelData = JSON.parse(this.game.cache.getText('map'));
        //        game.input.onDown.add(this.gofull, this);
        this.createPlayer();
        //        GameState.move(60);
        //i = 0;
        //this.levelData.map.forEach(function (ele) {
        //    game.add.text(ele.x, ele.y, i);
        //    i++;
        //})
        //})
        this.full = game.add.sprite(1240, 1240, 'full');
        this.full.anchor.setTo(0.5);
        this.full.scale.setTo(0.25);
        this.full.inputEnabled = true;
        this.full.input.useHandCursor = true;
        this.full.events.onInputDown.add(this.gofull, this);
        this.full.events.onInputOver.add(this.over, this.full);
        this.full.events.onInputOut.add(this.out, this.full);
    },

    update: function () {
        if (state == 'play') co++;
        if (state != 'win') this.checkState();
    },

    show: function () {
        if (state == "new") {
            this.quay.alpha = 0.8;
            state = 'play'
        }
    },

    play: function () {
        if (state == "play") {
            this.quay.alpha = 1;
            state = 'wait';
            GameState.sndQuay.play('part2');
            game.add.tween(this.quay).to({
                angle: 360 * 20 + co * 15 + 5
            }, 6000 + co * 20, Phaser.Easing.Quadratic.Out, true);
            val = Math.floor(((360 * 30 + co * 15) / 60) % 6);
            this.wait();
            GameState.game.time.events.add(6000 + co * 20, function () {
                GameState.display(val);
                GameState.sndQuay.stop();
                GameState.move(player[numPlayer-1],val + 1);
                GameState.move(player[0],2);
                GameState.move(player[1],3);
            });
        }
    },

    move: function (player, value) {
        go = 'ok';
        if (player.count == 8 && (value == 2 || value == 4 || value == 6)) {
            value = 0;
            player.count--;
            console.log('8: Dung chan chua dc di');
        }
        if (player.count == 18 && (value == 3 || value == 6)) {
            value = 0;
            player.count = 25;
            console.log('18: Nhay coc');
        }
        if (player.count == 28 && (value == 1 || value == 2)) {
            console.log('28: Duong tat');
            go = 'notok';
            game.add.tween(player).to({
                x: GameState.levelData.map[59].x,
                y: GameState.levelData.map[59].y - 25
            }, 1000, Phaser.Easing.Quadratic.Out, true);
            if (value == 2) {
                game.time.events.add(Phaser.Timer.SECOND * 1, function () {
                    game.add.tween(player).to({
                        x: GameState.levelData.map[60].x,
                        y: GameState.levelData.map[60].y - 25
                    }, 1000, Phaser.Easing.Quadratic.Out, true);
                }, this);
                player.count = 60;
            } else {
                player.count = 59;
            }
            state = "new";
        }
        if (player.count == 60) {
            player.count = 38;
        }
        if (player.count == 59 && value > 1) {
            game.add.tween(player).to({
                x: GameState.levelData.map[60].x,
                y: GameState.levelData.map[60].y - 25
            }, 1000, Phaser.Easing.Quadratic.Out, true);
            game.time.events.add(Phaser.Timer.SECOND * 1, function () {
                player.count = 38;
            }, this);
        }
        if (player.count == 39 && (value == 4 || value == 5 || value == 6)) {
            go = 'notok';
            console.log('39: Quay lại');
            player.loop = GameState.game.time.events.loop(1000, function () {
                player.count--;
                value--;
                game.add.tween(player).to({
                    x: GameState.levelData.map[player.count].x,
                    y: GameState.levelData.map[player.count].y - 25
                }, 1000, Phaser.Easing.Quadratic.Out, true);
                if (value <= 0) {
                    GameState.game.time.events.remove(player.loop);
                    state = "new";
                }
            }, this)
        }
        if (player.count == 44 && (value == 4 || value == 5 || value == 6)) {
            value = 0;
            player.count--;
            console.log('44: Dung chan chua dc di');
        }
        if (go == "ok") {
            player.loop = GameState.game.time.events.loop(1000, function () {
                player.count++;
                value--;
                console.log(value);
                game.add.tween(player).to({
                    x: GameState.levelData.map[player.count].x,
                    y: GameState.levelData.map[player.count].y - 25
                }, 1000, Phaser.Easing.Quadratic.Out, true);
                if (player.count == 8 || player.count == 18 || player.count == 28 || player.count == 39 || player.count == 44) {
                    value = 0;
                }
                if (value == 0) {
                    GameState.sndStop.play();
                }
                if (value <= 0) {
                    GameState.game.time.events.remove(player.loop);
                    state = "new";
                }
            }, this)
        }
    },

    display: function (val) {
        switch (val) {
            case 0:
                {
                    this.text.setText(1);
                    break;
                }
            case 1:
                {
                    this.text.setText(2);
                    break;
                }
            case 2:
                {
                    this.text.setText(3);
                    break;
                }
            case 3:
                {
                    this.text.setText(4);
                    break;
                }
            case 4:
                {
                    this.text.setText(5);
                    break;
                }
            case 5:
                {
                    this.text.setText(6);
                    break;
                }
        }
    },

    wait: function () {
        GameState.game.time.events.add(500, function () {
            GameState.text.setText(".");
        });
        GameState.game.time.events.add(1500, function () {
            GameState.text.setText("..");
        });
        GameState.game.time.events.add(2500, function () {
            GameState.text.setText("...");
        });
    },

    checkState: function () {
        if (player.count == 58) {
            console.log("win");
            state = "win";
            this.printMessage("Bạn đã thắng!!")
            GameState.game.time.events.remove(player.loop);
            this.stage.backgroundColor = 'rgba(0,0,0,0.5)';
            this.sndWin.play();
        }
    },

    render: function () {
        game.debug.inputInfo(32, 32, style);
    },

    gofull: function () {
        if (game.scale.isFullScreen) {
            game.scale.stopFullScreen();
            this.full.frame = 0;
            this.full.scale.setTo(0.25);
        } else {
            game.scale.startFullScreen(false);
            this.full.frame = 1;
            this.full.scale.setTo(0.25);
        }
    },

    out() {
        this.scale.setTo(0.25);
    },

    over() {
        this.scale.setTo(0.31);
    },

    printMessage: function (text) {
        var style = {
            font: '60px Arial',
            fill: '#ff0000',
            align: "center",
            stroke: "#8df51e",
            strokeThickness: 4,
            backgroundColor: 'rgba(0,0,0,0.5)'
        };
        this.text = game.add.text(640, 640, text, style)
        this.text.anchor.setTo(0.5);
        this.text.scale.setTo(1);
    },

    createSnd: function () {
        var audioJSON = {
            spritemap: {
                'part1': {
                    start: 1,
                    end: 20,
                    loop: false
                },
                'part2': {
                    start: 21,
                    end: 60,
                    loop: false
                }
            }
        };
        this.sndClick = game.add.audio('click');
        this.sndStop = game.add.audio('stop');
        this.sndWin = game.add.audio('ting');
        this.sndQuay = game.add.audioSprite('sndquay');
    },

    createPlayer: function () {
        for (i=0;i<numPlayer;i++){
//            playerX="player"+i;
            player[i] = game.add.sprite(this.levelData.map[0].x, this.levelData.map[0].y - 25, 'player');
            player[i].anchor.setTo(0.5, 0.6);
            player[i].scale.setTo(0.6);
            player[i].frame = i*3+Math.floor(Math.random()*3);
            player[i].count=0;
        }
    },

    sendData: function () {

    },

    receiveData: function () {

    }
}
