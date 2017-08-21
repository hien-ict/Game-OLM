var round, next = 1,
    vx, vy;
var Preload = {
    preload: function () {
        this.load.tilemap('map1-1', 'Mario/assets/map1-1.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('map1-2', 'Mario/assets/map1-2.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('map1-3', 'Mario/assets/map1-3.json', null, Phaser.Tilemap.TILED_JSON);

        this.load.image('tiles', 'Mario/assets/items2.png');
        this.load.image('tiles2', 'Mario/assets/items3.png');
        this.load.image('cot', 'Mario/assets/cot.png');
        this.load.image('co', 'Mario/assets/co.png');
        this.load.image('cau', 'Mario/assets/cau.png');
        this.load.image('health', 'Mario/assets/health.png');
        this.load.image('finish', 'Mario/assets/finish.png');
        this.load.image('background', 'Mario/assets/background.png');


        this.load.spritesheet('mario', 'Mario/assets/marioSmall.png', 34, 34, 7);
        this.load.spritesheet('goomba', 'Mario/assets/goomba.png', 16, 16, 3);
        this.load.spritesheet('turtle', 'Mario/assets/turtle.png', 17, 24, 3);
        this.load.spritesheet('flower', 'Mario/assets/flower.png', 16, 23, 3);
        this.load.spritesheet('question', 'Mario/assets/question.png', 16, 17, 7);

        this.load.audio('music', 'Mario/assets/music.mp3');
        this.load.audio('music2', 'Mario/assets/Underworld.mp3');
        this.load.audio('jump', 'Mario/assets/smb_jump-super.mp3');
        this.load.audio('mariodie', 'Mario/assets/smb_mariodie.mp3');
        this.load.audio('mariowin', 'Mario/assets/smb_stage_clear.mp3');
        this.load.audio('question', 'Mario/assets/smb_pipe.wav');
        this.load.audio('kick', 'Mario/assets/smb_bump.wav');
        this.load.audio('end', 'Mario/assets/Ending.mp3');
    },

    create: function () {

        Cf.loadScript();

        Phaser.Canvas.setImageRenderingCrisp(game.canvas);

        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.state.start('State1_4');

        this.cursors = game.input.keyboard.createCursorKeys();
        this.runButton = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
    },

    walk: function (player, state1) {
        if (player.body.enable && state == state1) {

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
                round.jump.play();
            }

            if (!player.body.onFloor()) {
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
                player.body.velocity.x = vx;
                player.body.velocity.y = vy;
            } else if (Cf.resq == 0) {
                Cf.popup = 0;
                Cf.waiting = 0;
                Cf.resq = -1;
                console.log(false);
                state = 'live';
                this.body.gravity.y = 700;
                player.body.velocity.x = vx;
                player.body.velocity.y = vy;
            }
        }
    },

    moveGoomba: function (child, arg, player) {
        child.anchor.setTo(0.5);
        if (child.x - player.x < arg && child.body.velocity.x == 0) {
            child.body.velocity.x = -20;
        }
        if (child.body.velocity.x > 0) {

            child.scale.setTo(-1, 1);
        } else {
            child.scale.setTo(1, 1);
        }
    },

    moveBrige: function (child, arg, player) {
        if (child.x - player.x < arg && child.body.velocity.y == 0) {
            child.body.velocity.y = -20;
        }
        if (child.y <= 0) {
            child.y = 256;
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
            round.kick.play();
            score += 2;
            Preload.updateScore();
            round.game.time.events.add(Phaser.Timer.SECOND, function () {
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
            round.star.play();
            Cf.next();
            //            state = 'waiting';
            //            player.body.gravity.y = 0;
            //            vx = player.body.velocity.x ;
            //            vy = player.body.velocity.y ;
            //            player.body.velocity.x = 0;
            //            player.body.velocity.y = 0;
        }

    },

    fiberDeath: function* (player) {
        timer = 0;
        while (timer < 5 * 60) {
            timer++;
            yield
        };
        round.music.resume();
        round.mariodie.stop();
        player.frame = 0;
        player.x -= 35;
        player.y = 50
        health -= 1;
        player.body.enable = true;
        state = 'live';
        round.death = null;
        this.updateHealth();
    },

    checkState: function (player) {
        if (state == 'win' && counter > 0) {
            score++;
            counter--;
            Preload.updateTime();
            Preload.updateScore();
        }

        if (player.y > 240 && state == 'live') {
            player.frame = 1;
            player.body.enable = false;
            player.animations.stop();
            state = 'die';
        };
        //console.log('a');
        if (state == 'die' && health > 0) {
            round.music.pause();
            round.mariodie.play();
            state = 'waiting';
            round.death = round.death || Preload.fiberDeath(player);

        } else {
            if (state == 'die' && health == 0) {
                state = 'finish';
                round.music.stop();
                round.mariodie.play();
                this.printMessage("GAME OVER!", 15);

                round.game.time.events.add(Phaser.Timer.SECOND * 5, function () {
                    game.state.start('State1_4', true, false, 'BẠN ĐÃ DỪNG CUỘC CHƠI\nĐiểm của bạn là: ' + score);
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
        x1 = x || round.mario.x;
        y1 = y || 128;
        this.msg = game.add.text(x1, y1, msg, style);
        this.msg.anchor.setTo(0.5, 0.5);

    },

    updateMessage(msg) {

        this.msg.setText(msg);
    },

    printHealth() {
        this.health = game.add.sprite(20, 20, 'health');
        this.health.fixedToCamera = true;
        this.health.anchor.setTo(0.5);
        var style = {
            font: "bold " + (10) + "pt Arial",
            fill: "#ff0000",
            align: "center",
            stroke: "#ff0000",
            strokeThickness: 0.2
            //backgroundColor: '#5C94FC'
        };
        this.health = game.add.text(40, 22, ' x ' + health, style);
        this.health.anchor.setTo(0.5);
        this.health.fixedToCamera = true;
    },

    updateHealth() {
        this.health.setText(' x ' + health);
    },

    printTime() {
        this.text = game.add.text(220, 22, 'Time: 300', {
            font: "10px Arial",
            fill: "#ffffff",
            align: "center"
        });
        this.text.anchor.setTo(0.5, 0.5);
        this.text.fixedToCamera = true;
    },

    updateTime() {
        if (state != 'win') {
            counter--;
        }
        Preload.text.setText('Time: ' + counter);
    },

    printScore() {
        this.score = game.add.text(128, 22, 'Score: 0', {
            font: "12px Arial",
            fill: "#00ff00",
            align: "center"
        });
        this.score.anchor.setTo(0.5, 0.5);
        this.score.fixedToCamera = true;
    },

    updateScore() {
        this.score.setText('Score ' + score);
    },

    win: function (player, cot) {
        state = 'win';
        cot.enableBody = false;
        round.music.stop();
        round.mariowin.play();
        Preload.printMessage("  WIN", 15);
        game.camera.follow(cot);

        if (next2 == next) {
            next++;
        }
        player.body.velocity.x = 0;
        //        score += counter;
        //        Preload.updateScore();

        round.game.time.events.add(Phaser.Timer.SECOND * 1, function () {
            player.animations.play('walk');
            player.body.velocity.x = 25;
        });

        round.game.time.events.add(Phaser.Timer.SECOND * 5.3, function () {
            player.kill();
            //round.game.paused = true;
        });
        if (round == State1_3) {
            round.game.time.events.add(Phaser.Timer.SECOND * 8.3, function () {


                game.state.start('State1_' + next, true, false, 'CHÚC MỪNG BẠN ĐÃ THẮNG\nĐiểm của bạn là: ' + score);
            });
        } else {
            round.game.time.events.add(Phaser.Timer.SECOND * 8.3, function () {


                game.state.start('State1_' + next);
            });
        }

    },

    win2: function (player, co) {
        if (flag == 1) {
            player.x += 5;
            round.co.setAll('body.gravity.y', 700);
            //round.mario.body.gravity.y = 100;
            health += 1;
            flag = 0;
            Preload.updateHealth();
            //state='win';
        }

    }

}
