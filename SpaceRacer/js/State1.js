var state1 = 0,
    state = '',
    lx = 0,
    length = 0,
    state2 = 'play',
    result = '',
    resultLeft = 0,
    resultRight = 0,
    Loop = 6,
    Vel = 80;

var style = {
    font: "bold " + 30 + "pt Arial",
    fill: "#ff0000",
    align: "center",
    stroke: "#ff0000",
    strokeThickness: 0.2
    //backgroundColor: '#5C94FC'
};
var State1 = {

    create: function () {
        score = 0;
        state = 'play';
        state1 = 0;
        state2 = 'play';
        Loop = 400;
        Vel = 80;
        this.background = this.add.tileSprite(0, 0, 420, 640, 'background');
        this.background.autoScroll(0, 30);

        this.asteroids = game.add.group();
        this.asteroids.enableBody = true;

        this.background = game.add.sprite(0, 0, 'background2');

        this.player = game.add.sprite(210, 450, 'ship');
        this.player.anchor.setTo(0.5);
        this.player.scale.setTo(0.6);
        this.player.loc = 2;
        game.physics.arcade.enable(this.player);
        this.player.explosion = this.createExplosion();

        this.textLeft = game.add.text(116, 537, 'x', style);
        this.textLeft.anchor.setTo(0.5);
        this.textRight = game.add.text(305, 537, 'x', style);
        this.textRight.anchor.setTo(0.5);
        this.textCenter = game.add.text(210, 537, result, style);
        this.textCenter.anchor.setTo(0.5);
        this.score = game.add.text(210, 616, score, style);
        this.score.anchor.setTo(0.5);

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
        this.Num_Enter = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_ENTER);

        this.music = game.add.audio('music');
        this.explosionSound = game.add.audio('explosionSound');
        this.music.play();

        this.printMessage();
        this.game.time.events.add(Phaser.Timer.SECOND * 4, this.updateMessage, this);
    },

    update: function () {
        state1++;

        if (state1 >= Loop) {
            state1 = 0;
            this.ranObj();
        }
        this.asteroids.forEach(this.kill, this, true, 600);

        this.game.physics.arcade.collide(this.player, this.asteroids, this.killPlayer);

        if (state2 == 'play') {
            state2 = 'waiting';
            this.updateQuestion();
        }
        this.play();
    },

    ranObj: function () {
        var a = 0,
            b = 0;
        if (state == 'play') {
            score++;
            this.updateScore();
        }

        while (a == b) {
            a = Math.floor(Math.random() * 3 + 1);

            b = Math.floor(Math.random() * 3 + 1);
        }

        //state1 = 'play';
        Loop -= 5;

        if (Loop <= 200) {
            Loop = 200;
        }
        if (Vel >= 200) {
            Vel = 200;
        }
        Vel += 5;

        obj = this.asteroids.create(a * 140 - 70, 0, 'obj');
        a = Math.floor(Math.random() * 4);
        obj.frame = a;
        obj.anchor.setTo(0.5);
        obj.scale.setTo(0.6);
        obj.body.velocity.y = Vel;

        obj2 = this.asteroids.create(b * 140 - 70, 0, 'obj');
        b = Math.floor(Math.random() * 4);
        obj2.frame = b;
        obj2.anchor.setTo(0.5);
        obj2.scale.setTo(0.6);
        obj2.body.velocity.y = Vel;
    },

    kill: function (child, arg) {
        if (child.y > arg) {
            State1.asteroids.remove(child);
        }
    },

    killPlayer: function (player, asteroid) {
        State1.explosionSound.stop();
        State1.explosionSound.play();

        player.explosion.x = player.x;
        player.explosion.y = player.y;
        player.explosion.animations.play('boom', 50, false);
        player.kill();
        asteroid.kill();
        State1.updateMessage('GAME OVER!!');
        state = 'gameover';
        game.time.events.add(Phaser.Timer.SECOND * 5, function () {
            game.state.start('Home');
            State1.music.stop();

        });
    },

    updateQuestion: function () {
        do {
            a = Math.floor(Math.random() * 9 + 1);
            b = Math.floor(Math.random() * 9 + 1);
            c = Math.floor(Math.random() * 9 + 1);
            d = Math.floor(Math.random() * 9 + 1);
        } while (a * b == c * d)

        h = Math.floor(Math.random() * 2);
        k = Math.floor(Math.random() * 2);
        if (h == 0) {
            this.textLeft.setText(a * b + ':' + b);
            resultLeft = a;
        } else {
            this.textLeft.setText(a + 'x' + b);
            resultLeft = a * b;
        }
        if (k == 0) {
            this.textRight.setText(c * d + ':' + d);
            resultRight = c;
        } else {
            this.textRight.setText(c + 'x' + d);
            resultRight = c * d;
        }
        if (resultLeft == resultRight) {
            this.updateQuestion();
        }
    },

    play: function () {
        if (length < 2) {
            if ((this.Zero.justDown) || (this.Num_0.justDown)) {
                result += 0;
                State1.updateResult();
                length++;
            }
            if ((this.One.justDown) || (this.Num_1.justDown)) {
                result += 1;
                State1.updateResult();
                length++;
            }
            if ((this.Two.justDown) || (this.Num_2.justDown)) {
                result += 2;
                State1.updateResult();
                length++;
            }
            if ((this.Three.justDown) || (this.Num_3.justDown)) {
                result += 3;
                State1.updateResult();
                length++;
            }
            if ((this.Four.justDown) || (this.Num_4.justDown)) {
                result += 4;
                State1.updateResult();
                length++;
            }
            if ((this.Five.justDown) || (this.Num_5.justDown)) {
                result += 5;
                State1.updateResult();
                length++;
            }
            if ((this.Six.justDown) || (this.Num_6.justDown)) {
                result += 6;
                State1.updateResult();
                length++;
            }
            if ((this.Seven.justDown) || (this.Num_7.justDown)) {
                result += 7;
                State1.updateResult();
                length++;
            }
            if ((this.Eight.justDown) || (this.Num_8.justDown)) {
                result += 8;
                State1.updateResult();
                length++;
            }
            if ((this.Nine.justDown) || (this.Num_9.justDown)) {
                result += 9;
                State1.updateResult();
                length++;
            }

        }
        if (this.Backspace.justDown) {
            length--;
            result = result.substr(0, length);
            State1.updateResult();
        }

        if ((this.Enter.justDown) || (this.Num_Enter.justDown)) {

            if ((result == resultLeft) || (result == resultRight)) {
                lx = this.player.x;
                if (result == resultLeft) {
                    if (this.player.loc > 1) {
                        this.player.loc--;
                        this.player.angle = -30;
                        this.player.body.velocity.x = -300;
                    }
                }
                if (result == resultRight) {
                    if (this.player.loc < 3) {
                        this.player.loc++;
                        this.player.angle = 30;
                        this.player.body.velocity.x = 300;
                    }
                }
                state2 = 'play';
                result = '';
                length = 0;
                State1.updateResult();
            }
        }

        if (Math.abs(this.player.x - lx) >= 140) {
            this.player.angle = 0;
            this.player.body.velocity.x = 0;
        }
    },

    updateResult: function (a) {
        this.textCenter.setText(result);
    },

    printMessage() {
        this.text = game.add.text(210, 320, 'START', {
            font: "50px Arial",
            fill: "#ffffff",
            align: "center",
            stroke: "#ff0000",
            strokeThickness: 5
        });
        this.text.anchor.setTo(0.5, 0.5);
    },

    updateMessage(name) {
        name = name || '';
        this.text.setText(name);
    },

    updateScore() {
        this.score.setText(score);
    },

    createExplosion: function () {
        explosion = game.add.sprite(this.player.x, -this.player.y, 'expl');
        explosion.animations.add('boom');
        explosion.anchor.x = 0.5;
        explosion.anchor.y = 0.5;
        return explosion;
    },


}
