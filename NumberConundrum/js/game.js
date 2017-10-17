kq = {
    val: "",
    u: 0,
    v: 0
};
state = "new";
var GameState = {
    CN: 6,

    create: function () {
        this.background = game.add.sprite(0, 0, 'background');
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
                r_play.events.onInputDown.add(this.control, r_play);
                block[i][j] = r_play;
                r_play.val = f_n[i][j];
                r_play.u = i;
                r_play.v = j;
            }
        }
        graphics = game.add.graphics(-44.5, -23.5);

        this.createNum();
        this.refresh = game.add.sprite(120, 20, 'new');
        this.refresh.scale.setTo(0.16);
        this.refresh.anchor.setTo(0.05);
        this.refresh.inputEnabled = true;
        this.refresh.events.onInputDown.add(this.newGame, this);
        this.refresh.input.useHandCursor = true;

        this.check = game.add.sprite(400, 20, 'check');
        this.check.scale.setTo(0.15);
        this.check.anchor.setTo(0.05);
        this.check.inputEnabled = true;
        this.check.events.onInputDown.add(this.checkState, this);
        this.check.input.useHandCursor = true;

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
        this.Period = game.input.keyboard.addKey(Phaser.Keyboard.PERIOD);
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
        block = new Array(6).fill('');
        block.forEach(function (x, i) {
            block[i] = new Array(i + 1).fill('');
        });
        text = new Array(6).fill('');
        text.forEach(function (x, i) {
            text[i] = new Array(i + 1).fill('');
        });
    },

    ranObj: function () {
        for (i = 0; i < GameState.CN; i++) {
            f_n[5][i] = Math.floor(Math.random() * 10 + 1) / 10;
            for (j = 0; j <= i; j++) {}

        }
        for (i = 4; i >= 0; i--) {
            for (j = 0; j <= i; j++) {
                f_n[i][j] = Math.round((f_n[i + 1][j] + f_n[i + 1][j + 1]) * 10) / 10;
            }
        }
    },

    control: function (blo) {
        state = "play";
        graphics.lineStyle(2, 0xffffff, 1);
        graphics.drawRect(320 + 96 * kq.v - 48 * kq.u, 200 + 53 * kq.u, 89, 48);
        graphics.beginFill(0xffffff);
        i = blo.u;
        j = blo.v;
        graphics.lineStyle(2, 0x00ff00, 1);
        graphics.drawRect(320 + 96 * j - 48 * i, 200 + 53 * i, 89, 48);
        kq.val = result[i][j];
        kq.u = i;
        kq.v = j;
        console.log(kq.u + "-" + kq.v);
        if (result[i][j] == '') {
            text_result = game.add.text(320 + 96 * blo.v - 48 * blo.u, 200 + 53 * blo.u, '');
            text[i][j] = text_result;
        } else {
            text[i][j].setText(result[i][j]);
        }
        console.log(result[i][j]);
        text_result.anchor.setTo(0.5);
        graphics.lineStyle(0);
        graphics.endFill();
    },

    newGame: function () {
        state = 'new';
        game.state.start("GameState");
    },

    createNum: function () {
        this.createInput(GameState.inputZero, 0);
        this.createInput(GameState.inputOne, 1);
        this.createInput(GameState.inputTwo, 2);
        this.createInput(GameState.inputThree, 3);
        this.createInput(GameState.inputFour, 4);
        this.createInput(GameState.inputFive, 5);
        this.createInput(GameState.inputSix, 6);
        this.createInput(GameState.inputSeven, 7);
        this.createInput(GameState.inputEight, 8);
        this.createInput(GameState.inputNine, 9);
        this.createInput(GameState.inputComma, ".");
        this.createInput(GameState.inputBackspace, "/");

        graphics.beginFill(0x999999);
        i = 0;
        j = 0;
        block[i][j].inputEnabled = false;
        block[i][j].draw = true;
        result[i][j] = f_n[i][j];
        graphics.drawRect(320 + 96 * j - 48 * i, 200 + 53 * i, 89, 48);
        this.num_play = game.add.text(320 + 96 * j - 48 * i, 200 + 53 * i, f_n[i][j]);
        this.num_play.anchor.setTo(0.5);

        i = 4;
        j = 2;
        block[i][j].inputEnabled = false;
        block[i][j].draw = true;
        result[i][j] = f_n[i][j];
        graphics.drawRect(320 + 96 * j - 48 * i, 200 + 53 * i, 89, 48);
        this.num_play = game.add.text(320 + 96 * j - 48 * i, 200 + 53 * i, f_n[i][j]);
        this.num_play.anchor.setTo(0.5);

        type = Math.floor(Math.random() * 3);
        switch (type) {
            case 0:
                i = 2;
                j = 0;
                block[i][j].inputEnabled = false;
                block[i][j].draw = true;
                result[i][j] = f_n[i][j];
                graphics.drawRect(320 + 96 * j - 48 * i, 200 + 53 * i, 89, 48);
                this.num_play = game.add.text(320 + 96 * j - 48 * i, 200 + 53 * i, f_n[i][j]);
                this.num_play.anchor.setTo(0.5);

                i = 3;
                j = 0;
                block[i][j].inputEnabled = false;
                block[i][j].draw = true;
                result[i][j] = f_n[i][j];
                graphics.drawRect(320 + 96 * j - 48 * i, 200 + 53 * i, 89, 48);
                this.num_play = game.add.text(320 + 96 * j - 48 * i, 200 + 53 * i, f_n[i][j]);
                this.num_play.anchor.setTo(0.5);
                i = 3;
                j = 2;
                block[i][j].inputEnabled = false;
                block[i][j].draw = true;
                result[i][j] = f_n[i][j];
                graphics.drawRect(320 + 96 * j - 48 * i, 200 + 53 * i, 89, 48);
                this.num_play = game.add.text(320 + 96 * j - 48 * i, 200 + 53 * i, f_n[i][j]);
                this.num_play.anchor.setTo(0.5);
                i = 5;
                j = 3;
                block[i][j].inputEnabled = false;
                block[i][j].draw = true;
                result[i][j] = f_n[i][j];
                graphics.drawRect(320 + 96 * j - 48 * i, 200 + 53 * i, 89, 48);
                this.num_play = game.add.text(320 + 96 * j - 48 * i, 200 + 53 * i, f_n[i][j]);
                this.num_play.anchor.setTo(0.5);
                break;
            case 1:
                i = 2;
                j = 2;
                block[i][j].inputEnabled = false;
                block[i][j].draw = true;
                result[i][j] = f_n[i][j];
                graphics.drawRect(320 + 96 * j - 48 * i, 200 + 53 * i, 89, 48);
                this.num_play = game.add.text(320 + 96 * j - 48 * i, 200 + 53 * i, f_n[i][j]);
                this.num_play.anchor.setTo(0.5);
                i = 3;
                j = 1;
                block[i][j].inputEnabled = false;
                block[i][j].draw = true;
                result[i][j] = f_n[i][j];
                graphics.drawRect(320 + 96 * j - 48 * i, 200 + 53 * i, 89, 48);
                this.num_play = game.add.text(320 + 96 * j - 48 * i, 200 + 53 * i, f_n[i][j]);
                this.num_play.anchor.setTo(0.5);
                i = 4;
                j = 3;
                block[i][j].inputEnabled = false;
                block[i][j].draw = true;
                result[i][j] = f_n[i][j];
                graphics.drawRect(320 + 96 * j - 48 * i, 200 + 53 * i, 89, 48);
                this.num_play = game.add.text(320 + 96 * j - 48 * i, 200 + 53 * i, f_n[i][j]);
                this.num_play.anchor.setTo(0.5);
                i = 5;
                j = 3;
                block[i][j].inputEnabled = false;
                block[i][j].draw = true;
                result[i][j] = f_n[i][j];
                graphics.drawRect(320 + 96 * j - 48 * i, 200 + 53 * i, 89, 48);
                this.num_play = game.add.text(320 + 96 * j - 48 * i, 200 + 53 * i, f_n[i][j]);
                this.num_play.anchor.setTo(0.5);
                break;
            case 2:
                i = 2;
                j = 2;
                block[i][j].inputEnabled = false;
                block[i][j].draw = true;
                result[i][j] = f_n[i][j];
                graphics.drawRect(320 + 96 * j - 48 * i, 200 + 53 * i, 89, 48);
                this.num_play = game.add.text(320 + 96 * j - 48 * i, 200 + 53 * i, f_n[i][j]);
                this.num_play.anchor.setTo(0.5);
                i = 3;
                j = 1;
                block[i][j].inputEnabled = false;
                block[i][j].draw = true;
                result[i][j] = f_n[i][j];
                graphics.drawRect(320 + 96 * j - 48 * i, 200 + 53 * i, 89, 48);
                this.num_play = game.add.text(320 + 96 * j - 48 * i, 200 + 53 * i, f_n[i][j]);
                this.num_play.anchor.setTo(0.5);
                i = 3;
                j = 3;
                block[i][j].inputEnabled = false;
                block[i][j].draw = true;
                result[i][j] = f_n[i][j];
                graphics.drawRect(320 + 96 * j - 48 * i, 200 + 53 * i, 89, 48);
                this.num_play = game.add.text(320 + 96 * j - 48 * i, 200 + 53 * i, f_n[i][j]);
                this.num_play.anchor.setTo(0.5);
                i = 5;
                j = 2;
                block[i][j].inputEnabled = false;
                block[i][j].draw = true;
                result[i][j] = f_n[i][j];
                graphics.drawRect(320 + 96 * j - 48 * i, 200 + 53 * i, 89, 48);
                this.num_play = game.add.text(320 + 96 * j - 48 * i, 200 + 53 * i, f_n[i][j]);
                this.num_play.anchor.setTo(0.5);
                break;
        }
        graphics.endFill();
    },

    keypress: function () {

        if ((this.Zero.justDown) || (this.Num_0.justDown)) {
            this.inputZero();
        }
        if ((this.One.justDown) || (this.Num_1.justDown)) {
            this.inputOne();
        }
        if ((this.Two.justDown) || (this.Num_2.justDown)) {
            this.inputTwo();
        }
        if ((this.Three.justDown) || (this.Num_3.justDown)) {
            this.inputThree();
        }
        if ((this.Four.justDown) || (this.Num_4.justDown)) {
            this.inputFour();
        }
        if ((this.Five.justDown) || (this.Num_5.justDown)) {
            this.inputFive();
        }
        if ((this.Six.justDown) || (this.Num_6.justDown)) {
            this.inputSix();
        }
        if ((this.Seven.justDown) || (this.Num_7.justDown)) {
            this.inputSeven();
        }
        if ((this.Eight.justDown) || (this.Num_8.justDown)) {
            this.inputEight();
        }
        if ((this.Nine.justDown) || (this.Num_9.justDown)) {
            this.inputNine();
        }
        if ((this.Comma.justDown) || (this.Decimal.justDown) || (this.Period.justDown)) {
            this.inputComma();
        }
        if (this.Backspace.justDown) {
            this.inputBackspace();
        }
    },

    createInput: function (Fun, Val) {
        if (Val == ".") {
            GameState.Obj = game.add.sprite(30 + 50 * 10, 600, "rec");
            GameState.Obj.scale.setTo(0.055, 0.08);
            GameState.Obj.anchor.setTo(0.5);
            GameState.Obj.text = game.add.text(30 + 50 * 10, 605, Val);
            GameState.Obj.text.anchor.setTo(0.5);
            GameState.Obj.inputEnabled = true;
            GameState.Obj.input.useHandCursor = true;
            GameState.Obj.events.onInputDown.add(Fun, this);
        } else {
            if (Val == "/") {
                GameState.Obj = game.add.sprite(45 + 50 * 11, 600, "backspace");
                GameState.Obj.scale.setTo(0.095, 0.08);
                GameState.Obj.anchor.setTo(0.5);
                GameState.Obj.text = game.add.text(40 + 50 * 11, 605, "");
                GameState.Obj.text.anchor.setTo(0.5);
                GameState.Obj.inputEnabled = true;
                GameState.Obj.input.useHandCursor = true;
                GameState.Obj.events.onInputDown.add(Fun, this);
            } else {
                if (Val == 0) {
                    GameState.Obj = game.add.sprite(30 + 50 * 9, 600, "rec");
                    GameState.Obj.scale.setTo(0.055, 0.08);
                    GameState.Obj.anchor.setTo(0.5);
                    GameState.Obj.text = game.add.text(30 + 50 * 9, 605, Val);
                    GameState.Obj.text.anchor.setTo(0.5);
                    GameState.Obj.inputEnabled = true;
                    GameState.Obj.input.useHandCursor = true;
                    GameState.Obj.events.onInputDown.add(Fun, this);
                } else {
                    GameState.Obj = game.add.sprite(30 + 50 * (Val - 1), 600, "rec");
                    GameState.Obj.scale.setTo(0.055, 0.08);
                    GameState.Obj.anchor.setTo(0.5);
                    GameState.Obj.text = game.add.text(30 + 50 * (Val - 1), 605, Val);
                    GameState.Obj.text.anchor.setTo(0.5);
                    GameState.Obj.inputEnabled = true;
                    GameState.Obj.input.useHandCursor = true;
                    GameState.Obj.events.onInputDown.add(Fun, this);
                }

            }
        }

    },

    inputZero: function () {
        if (state == "play") {
            kq.val += "0";
            this.updateResult();
        }
    },

    inputOne: function () {
        if (state == "play") {
            kq.val += '1';
            this.updateResult();
        }
    },

    inputTwo: function () {
        if (state == "play") {
            kq.val += '2';
            this.updateResult();
        }
    },

    inputThree: function () {
        if (state == "play") {
            kq.val += '3';
            this.updateResult();
        }
    },

    inputFour: function () {
        if (state == "play") {
            kq.val += '4';
            this.updateResult();
        }
    },

    inputFive: function () {
        if (state == "play") {
            kq.val += '5';
            this.updateResult();
        }
    },

    inputSix: function () {
        if (state == "play") {
            kq.val += '6';
            this.updateResult();
        }
    },

    inputSeven: function () {
        if (state == "play") {
            kq.val += '7';
            this.updateResult();
        }
    },

    inputEight: function () {
        if (state == "play") {
            kq.val += '8';
            this.updateResult();
        }
    },

    inputNine: function () {
        if (state == "play") {
            kq.val += '9';
            this.updateResult();
        }
    },

    inputComma: function () {
        if (state == "play") {
            kq.val += '.';
            this.updateResult();
        }
    },

    inputBackspace: function () {
        if (state == "play") {
            length = kq.val.length - 1;
            kq.val = kq.val.substr(0, length);
            this.updateResult();
        }
    },

    updateResult: function () {
        text[kq.u][kq.v].setText(kq.val);
        result[kq.u][kq.v] = kq.val;
    },

    checkState: function () {
        d = 0;
        for (i = 0; i < GameState.CN; i++) {
            for (j = 0; j <= i; j++) {
                if (result[i][j] != f_n[i][j] && result[i][j] != '') {
                    graphics.beginFill(0xaa0000);
                    graphics.drawRect(320 + 96 * j - 48 * i, 200 + 53 * i, 89, 48);
                    graphics.endFill();
                }

                if (result[i][j] == f_n[i][j] && !block[i][j].draw || result[i][j] == '') {
                    graphics.beginFill(0xffffff);
                    graphics.drawRect(320 + 96 * j - 48 * i, 200 + 53 * i, 89, 48);
                    graphics.endFill();
                }
                if (result[i][j] == f_n[i][j] && !block[i][j].draw) {
                    d++;
                }
            }
        }
        for (i = 0; i < GameState.CN; i++) {
            for (j = 0; j <= i; j++) {
                if (d >= 15 && !block[i][j].draw) {
                    graphics.beginFill(0x00ff00);
                    graphics.drawRect(320 + 96 * j - 48 * i, 200 + 53 * i, 89, 48);
                    graphics.endFill();
                    game.time.events.add(Phaser.Timer.SECOND * 2, function () {
                        game.state.start('Home', true, false, "Chúc mừng bạn đã qua vòng!");
                    });
                }
            }
        }

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
