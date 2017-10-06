kq = {
    val: "",
    u: 0,
    v: 0
};
var GameState = {
    CN: 6,
    create: function () {
        this.createArr();
        this.rec_play = game.add.group();
        this.ranObj();
        //this.num_play = game.add.group();
        for (i = 0; i < GameState.CN; i++) {
            for (j = 0; j <= i; j++) {
                r_play = this.rec_play.create(320 + 96 * j - 48 * i, 200 + 53 * i, "rec");
                r_play.scale.setTo(0.12, 0.1);
                r_play.anchor.setTo(0.5);
                r_play.inputEnabled = true;
                r_play.input.useHandCursor = true;
                r_play.events.onInputDown.add(this.control, this);
                r_play.u = i;
                r_play.v = j;
                r_play.val = f_n[i][j];
                console.log(r_play.val);
            }
            console.log("break");
        }

        this.createNum();
        this.refresh = game.add.sprite(20, 20, 'rec');
        this.refresh.scale.setTo(0.05);
        this.refresh.anchor.setTo(0.05);
        this.refresh.inputEnabled = true;
        this.refresh.events.onInputDown.add(this.ref, this);

        this.Zero = game.input.keyboard.addKey(Phaser.Keyboard.ZERO);
        this.One = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
        this.Two = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
        this.Three = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
        this.Four = game.input.keyboard.addKey(Phaser.Keyboard.FOUR);
        this.Five = game.input.keyboard.addKey(Phaser.Keyboard.FIVE);
        this.Six = game.input.keyboard.addKey(Phaser.Keyboard.SIX);
        this.Seven = game.input.keyboard.addKey(Phaser.Keyboard.SEVEN);
        this.Eight = game.input.keyboard.addKey(Phaser.Keyboard.EIGHT);
        this.Nine = game.input.keyboard.addKey(Phaser.Keyboard.NINE);
        this.Comma = game.input.keyboard.addKey(Phaser.Keyboard.COMMA);
        this.Enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.Backspace = game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);

        this.Num_0 = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_0);
        this.Num_1 = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_1);
        this.Num_2 = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_2);
        this.Num_3 = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_3);
        this.Num_4 = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_4);
        this.Num_5 = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_5);
        this.Num_6 = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_6);
        this.Num_7 = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_7);
        this.Num_8 = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_8);
        this.Num_9 = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_9);
        this.Decimal = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_DECIMAL);
        this.Num_Enter = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_ENTER);
    },

    update: function () {
        this.keypress();
        if (this.checkState()) this.win();
    },

    createArr: function () {
        f_n = new Array(6).fill(0);
        f_n.forEach(function (x, i) {
            f_n[i] = new Array(i + 1).fill(0);
        });
        result = new Array(6).fill('');
        result.forEach(function (x, i) {
            result[i] = new Array(i + 1).fill('');
        });
    },

    ranObj: function () {
        for (i = 0; i < GameState.CN; i++) {
            f_n[5][i] = Math.floor(Math.random() * 10 + 1) / 10;
            for (j = 0; j <= i; j++) {}

        }
        for (i = 4; i >= 0; i--) {
            for (j = 0; j <= i; j++) {
                f_n[i][j] = Math.floor((f_n[i + 1][j] + f_n[i + 1][j + 1]) * 10) / 10;
            }
        }
    },

    control: function (block) {
        i = block.u;
        j = block.v;
        kq.val = result[i][j];
        kq.u = i;
        kq.v = j;
        GameState.result = game.add.text(320 + 96 * block.v - 48 * block.u, 200 + 53 * block.u, '');
        console.log(result[i][j]);
        GameState.result.anchor.setTo(0.5);
    },

    ref: function () {
        game.state.start("GameState");
    },

    createNum: function () {
        for (i = 0; i < GameState.CN; i++) {
            for (j = 0; j <= i; j++) {
                this.num_play = game.add.text(320 + 96 * j - 48 * i, 200 + 53 * i, f_n[i][j]);
                this.num_play.anchor.setTo(0.5);
                this.num_play.alpha = 0.2;
            }
        }
    },

    keypress: function () {
        if ((this.Zero.justDown) || (this.Num_0.justDown)) {
            kq.val += "0";
            this.updateResult();
        }
        if ((this.One.justDown) || (this.Num_1.justDown)) {
            kq.val += '1';
            this.updateResult();
        }
        if ((this.Two.justDown) || (this.Num_2.justDown)) {
            kq.val += '2';
            this.updateResult();
        }
        if ((this.Three.justDown) || (this.Num_3.justDown)) {
            kq.val += '3';
            this.updateResult();
        }
        if ((this.Four.justDown) || (this.Num_4.justDown)) {
            kq.val += '4';
            this.updateResult();
        }
        if ((this.Five.justDown) || (this.Num_5.justDown)) {
            kq.val += '5';
            this.updateResult();
        }
        if ((this.Six.justDown) || (this.Num_6.justDown)) {
            kq.val += '6';
            this.updateResult();
        }
        if ((this.Seven.justDown) || (this.Num_7.justDown)) {
            kq.val += '7';
            this.updateResult();
        }
        if ((this.Eight.justDown) || (this.Num_8.justDown)) {
            kq.val += '8';
            this.updateResult();
        }
        if ((this.Nine.justDown) || (this.Num_9.justDown)) {
            kq.val += '9';
            this.updateResult();
        }
        if ((this.Comma.justDown) || (this.Decimal.justDown)) {
            kq.val += '.';
            this.updateResult();
        }
        if (this.Backspace.justDown) {
            kq.val = '';
            this.updateResult();
        }
    },

    updateResult: function () {
        GameState.result.setText(kq.val);
        result[kq.u][kq.v] = kq.val;
    },

    checkState: function () {
        for (i = 0; i < GameState.CN; i++) {
            for (j = 0; j <= i; j++) {
                if (result[i][j] != f_n[i][j]) return false;
            }
        }
        return true;
    },

    win: function () {

        this.text = game.add.text(320, 320, 'WIN', {
            font: "50px Arial",
            fill: "#ffffff",
            align: "center",
            stroke: "#ff0000",
            strokeThickness: 5
        });
        this.text.anchor.setTo(0.5, 0.5);
    },
}
