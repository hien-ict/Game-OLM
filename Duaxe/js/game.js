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
var GameState = {

    create: function () {
        count = 59;
        co = 0;
        this.background = game.add.sprite(0, 0, "background");
        this.text = game.add.text(759, 825, "QUAY", style);
        this.text.anchor.setTo(0.5);
        //        this.background.scale.setTo(0.5);
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
        this.player = game.add.sprite(this.levelData.map[count].x, this.levelData.map[count].y - 25, 'player');
        this.player.anchor.setTo(0.5);
        //        GameState.move(60);
        i = 0;
        this.levelData.map.forEach(function (ele) {
            game.add.text(ele.x, ele.y, i);
            i++;
        })
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
            game.add.tween(this.quay).to({
                angle: 360 * 20 + co * 15 + 5
            }, 3000 + co * 20, Phaser.Easing.Quadratic.Out, true);
            val = Math.floor(((360 * 30 + co * 15) / 60) % 6);
            this.wait();
            GameState.game.time.events.add(3000 + co * 20, function () {
                GameState.display(val);
                GameState.move(val + 1);
            });
        }
    },

    move: function (value) {
        go = 'ok';
        if (count == 8 && (value == 2 || value == 4 || value == 6)) {
            value = 0;
            count--;
            console.log('8: Dung chan chua dc di');
        }
        if (count == 18 && (value == 3 || value == 6)) {
            value = 0;
            count = 25;
            console.log('18: Nhay coc');
        }
        if (count == 28 && (value == 1 || value == 2)) {
            count = 58;
            console.log('28: Duong tat');
        }
        if (count == 60) {
            count = 38;
        }
        if (count == 59 && value > 1) {
            game.add.tween(GameState.player).to({
                x: GameState.levelData.map[60].x,
                y: GameState.levelData.map[60].y - 25
            }, 1000, Phaser.Easing.Quadratic.Out, true);
             game.time.events.add(Phaser.Timer.SECOND * 1, function(){
                 count=38;
             }, this);
        }
        if (count == 39 && (value == 4 || value == 5 || value == 6)) {
            go = 'notok';
            console.log('39: Quay lại');
            this.Loop = GameState.game.time.events.loop(1000, function () {
                count--;
                value--;
                game.add.tween(GameState.player).to({
                    x: GameState.levelData.map[count].x,
                    y: GameState.levelData.map[count].y - 25
                }, 1000, Phaser.Easing.Quadratic.Out, true);
                if (value <= 0) {
                    GameState.game.time.events.remove(this.Loop);
                    state = "new";
                }
            }, this)
        }
        if (go == "ok") {
            this.Loop = GameState.game.time.events.loop(1000, function () {
                count++;
                value--;
                game.add.tween(GameState.player).to({
                    x: GameState.levelData.map[count].x,
                    y: GameState.levelData.map[count].y - 25
                }, 1000, Phaser.Easing.Quadratic.Out, true);
                if (count == 8 || count == 18 || count == 28 || count == 39 || count == 44) {
                    value = 0;
                }
                if (value <= 0) {
                    GameState.game.time.events.remove(this.Loop);
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
    }

}
