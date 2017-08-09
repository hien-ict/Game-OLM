var state = 'live';
var death = null;
var self = State1_1 = {
    create: function () {
        this.stage.backgroundColor = '#5C94FC';

        this.map = game.add.tilemap('map1-1');
        this.map.addTilesetImage('items', 'tiles');

        this.layer = this.map.createLayer('background');
        this.layer.resizeWorld();
        this.layer.wrap = true;
        this.map.setCollisionBetween(14, 16);
        this.map.setCollisionBetween(21, 22);
        this.map.setCollisionBetween(27, 28);
        this.map.setCollisionByIndex(13);
        this.map.setCollisionByIndex(40);

        this.mario = game.add.sprite(50, 50, 'mario');
        this.mario.scale.setTo(0.47, 0.47);
        this.mario.anchor.setTo(0.5);

        this.game.physics.enable(this.mario);
        this.mario.body.gravity.y = 700;
        this.mario.body.bounce.y = 0;
        this.mario.body.linearDamping = 1;
        this.mario.body.collideWorldBounds = true;
        this.mario.body.fixedRotation = true;

        this.mario.animations.add('walk', [2, 4, 5], 6, true);

        this.goombas = game.add.group();
        this.goombas.enableBody = true;
        this.map.createFromTiles(41, null, 'goomba', 'goomba', this.goombas);
        this.goombas.callAll('animations.add', 'animations', 'walk', [0, 1], 2, true);
        this.goombas.callAll('animations.play', 'animations', 'walk');
        this.goombas.setAll('body.bounce.x', 1);
        this.goombas.setAll('body.gravity.y', 500);

        this.questions = game.add.group();
        this.questions.enableBody = true;
        this.map.createFromTiles(14, null, 'question', 'question', this.questions);
        this.questions.callAll('animations.add', 'animations', 'spin', [0, 0, 1, 2, 3, 4, 5], 4, true);

        this.mario.x = 3050;
        this.cot = game.add.group();
        this.cot.enableBody = true;
        this.map.createFromTiles(17, null, 'cot', 'finish', this.cot);

        this.co = game.add.group();
        this.co.enableBody = true;
        this.map.createFromTiles(9, null, 'co', 'finish', this.co);

        this.music = game.add.audio('music');
        this.jump = game.add.audio('jump');
        this.mariodie = game.add.audio('mariodie');
        this.mariowin = game.add.audio('mariowin');
        this.kick = game.add.audio('kick');
        this.star = game.add.audio('question');
        this.music.play();

        this.game.camera.follow(this.mario);
        this.cursors = game.input.keyboard.createCursorKeys();
        this.runButton = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
    },

    update: function () {
        if (this.music.currentTime > 29000 && state == 'live') {
            this.music.stop();
            this.music.play();
        };
        if (this.mario.y > 240 && state == 'live') {
            this.mario.frame = 1;
            this.mario.body.enable = false;
            this.mario.animations.stop();
            state = 'die';
        };
        this.loadQuestion();
        this.checkState(this.mario);

        this.game.physics.arcade.collide(this.mario, this.layer);
        this.game.physics.arcade.collide(this.goombas, this.layer);
        this.game.physics.arcade.collide(this.cot, this.layer);
        this.game.physics.arcade.collide(this.co, this.layer);


        this.walk(this.mario, 'live');

        this.goombas.forEach(this.moveGoomba, this, true, 128, this.mario);
        this.questions.forEach(this.playQuestion, this, true, 128, this.mario, this);
        if (state == 'live') {
            this.game.physics.arcade.overlap(this.mario, this.goombas, this.kill);
            this.game.physics.arcade.overlap(this.mario, this.questions, this.showQuestion);
            this.game.physics.arcade.collide(this.mario, this.cot, this.win);
        };
        if (this.death && !this.death.done) this.death.next();

    },

    walk: function (player, state) {
        if (player.body.enable && state == state) {

            if (this.cursors.left.isDown) {
                player.scale.setTo(-0.4, 0.4);
                if (player.body.velocity.x > 0) {
                    player.frame = 3;
                } else {
                    player.animations.play('walk');
                }
                player.body.velocity.x -= 5;
                if (this.runButton.isDown) {
                    if (player.body.velocity.x < -160) {
                        player.body.velocity.x = -160;
                    }
                } else {
                    if (player.body.velocity.x < -120) {
                        player.body.velocity.x = -120;
                    }
                }


            } else if (this.cursors.right.isDown) {
                player.scale.setTo(0.4, 0.4);
                if (player.body.velocity.x < 0) {
                    player.frame = 3;
                } else {
                    player.animations.play('walk');
                }
                player.body.velocity.x += 5;
                if (this.runButton.isDown) {
                    if (player.body.velocity.x > 160) {
                        player.body.velocity.x = 160;
                    }
                } else {
                    if (player.body.velocity.x > 120) {
                        player.body.velocity.x = 120;
                    }
                }


            } else {
                if (player.body.velocity.x > 10) {
                    //mario.sprite.body.acceleration.x = 10;
                    player.body.velocity.x -= 10;
                } else if (player.body.velocity.x < -10) {
                    //mario.sprite.body.acceleration.x = -10;
                    player.body.velocity.x += 10;
                } else {
                    //mario.sprite.body.acceleration.x = 0;
                    player.body.velocity.x = 0;
                }
                player.animations.stop();
                player.frame = 0;
            }

            if (this.cursors.up.isDown && player.body.onFloor()) {
                player.body.velocity.y = -310;
                player.animations.stop();
                this.jump.play();
            }

            if (player.body.velocity.y != 0) {
                if (player.y < 224) {
                    player.frame = 6;
                } else {
                    player.frame = 1;
                }
            }
        }
    },

    loadQuestion() {
        if (Cf.popup == 1) Cf.waiting = 1;
        if (Cf.waiting == 1) {
            if (Cf.resq == 1) {
                Cf.popup = 0;
                Cf.waiting = 0;
                Cf.resq = -1;
                console.log(true);
                state = 'live';
                this.mario.body.gravity.y = 700;
            } else if (Cf.resq == 0) {
                Cf.popup = 0;
                Cf.waiting = 0;
                Cf.resq = -1;
                console.log(false);
                state = 'live';
                this.body.gravity.y = 700;
            }
        }
    },

    moveGoomba: function (child, arg, player) {
        if (child.x - player.x < arg && child.body.velocity.x == 0) {
            child.body.velocity.x = -20;
        }
    },

    playQuestion: function (child, arg, player) {
        if (child.x - player.x < arg && child.body.enable) {
            child.animations.play('spin');
        }
    },

    kill: function (player, goomba) {
        if (player.body.touching.down) {
            goomba.animations.stop();
            goomba.frame = 2;
            goomba.body.enable = false;
            player.body.velocity.y = -80;
            self.kick.play();
            self.game.time.events.add(Phaser.Timer.SECOND, function () {
                goomba.kill();
            });
        } else {
            player.frame = 1;
            player.body.enable = false;
            player.animations.stop();
            state = 'die';

        }
    },

    showQuestion(player, question) {
        if (player.body.touching.up) {
            question.animations.stop();
            question.frame = 6;
            question.body.enable = false;
            self.star.play();
            Cf.next();
            //            state = 'waiting';
            //            player.body.gravity.y = 0;
            //            player.body.velocity.x = 0;
        }

    },

    fiberDeath: function* (player) {
        timer = 0;
        while (timer < 5 * 60) {
            timer++;
            yield
        };
        self.music.resume();
        self.mariodie.stop();
        player.frame = 0;
        player.x -= 25;
        player.y = 50
        console.log(health);;
        health -= 1;
        player.body.enable = true;
        state = 'live';
        this.death = null;
    },

    checkState: function (player) {
        if (state == 'die' && health > 0) {
            self.music.pause();
            self.mariodie.play();
            state = 'waiting';
            this.death = this.death || this.fiberDeath(player);

        } else {
            if (state == 'die' && health == 0) {
                state = 'finish';
                this.music.stop();
                this.mariodie.play();
                this.printMessage("GAME OVER!", 15);
                self.game.time.events.add(Phaser.Timer.SECOND * 5, function () {
                    self.game.paused = true;
                });
            }

        }
    },

    printMessage: function (msg, size, x, y) {
        var style = {
            font: "bold " + (size) + "pt Arial",
            fill: "#ffffff",
            align: "center",
            stroke: "#258acc",
            strokeThickness: 8
        };
        x1 = x || this.game.world.centerX;
        y1 = y || 128;
        s = game.add.text(x1, y1, msg, style);
        s.anchor.setTo(0.5, 0.5);
    },

    win: function (player, cot) {
        self.music.stop();
        self.mariowin.play();
        self.printMessage("  WIN", 15);

        state = 'win';
        player.body.velocity.x = 0;


        self.game.time.events.add(Phaser.Timer.SECOND * 1, function () {
            player.body.velocity.x = 25;
            console.log(state);
        });

        self.game.time.events.add(Phaser.Timer.SECOND * 5.3, function () {
            player.kill();
            game.paused = true;
        });
    }
}
