resultA = 1, resultB = 1;
result = new Array(4).fill(0);
t_a = 0;
block_speed = 40;
block_stop = 450;
state = 1;
var GameState = {

    create: function () {
        time = 90;
        this.background = game.add.sprite(0, 0, 'background');
        this.createTime();
        this.createBlockDead();
        this.createBlock();
        this.createMapState();
        this.updateMapState();
        this.play();
        this.createResult();
        this.game.time.events.loop(Phaser.Timer.SECOND, this.updateTime, this);
        this.createSnd();

    },

    update: function () {
        this.updateBlockResult();
        this.updateMap();
    },

    createBlock: function () {
        this.block = game.add.group();
        this.block.enableBody = true;
    },

    createMapState: function () {
        mapState = new Array(7).fill(0);
        mapState.forEach(function (x, i) {
            mapState[i] = new Array(7).fill(0);
        });

        for (i = 1; i <= 6; i++) {
            for (j = 1; j <= 6; j++) {
                mapState[i][j] = Math.floor(Math.random() * 8 + 2);
            }
        }
        for (i = 1; i <= 6; i++) {
            mapState[i][0] = 6;
        }
    },

    updateMapState: function () {
        for (i = 1; i <= 6; i++) {
            for (j = 1; j <= 6; j++) {
                block = this.block.create(150 + i * 50, 430 - j * 50, 'block');
                block.scale.setTo(0.5);
                block.anchor.setTo(0.5);
                block.inputEnabled = true;
                block.input.useHandCursor = true;
                if (mapState[i][j] != 0) {
                    block.frame = mapState[i][j] - 1;
                } else {
                    block.frame = 12;
                }

                block.events.onInputDown.add(this.control, this);
                block.u = i;
                block.v = j;
                block.val = mapState[i][j];
                block.select = false;
                block.selected = this.createSelect();
            }
        }
    },

    control: function (child) {
        this.snd2.play();
        if (t_a == 0 && child.select == false) {
            result[t_a] = child;
            child.select = true;
            t_a++;
            resultB *= (child.val);
        }

        if (t_a > 0 && child.select == false) {
            if ((Math.abs(child.u - result[t_a - 1].u) == 1 && (child.v == result[t_a - 1].v)) || (Math.abs(child.v - result[t_a - 1].v) == 1 && (child.u == result[t_a - 1].u))) {
                child.select = true;
                result[t_a] = child;
                t_a++;
                resultB *= (child.val);

                if (resultB == resultA) {
                    this.snd4.play();
                    for (k = 0; k < t_a; k++) {
                        result[k].kill();
                        result[k].select = false;

                        for (i = result[k].v + 1; i <= mapState[result[k].u][0]; i++) {
                            if (mapState[result[k].u][i] != 0) {

                                for (j = 0; j < 36; j++) {
                                    if (GameState.block.children[j].u == result[k].u && GameState.block.children[j].v == i) {
                                        a = GameState.block.children[j]
                                    }
                                }
                                mapState[result[k].u][i - 1] = mapState[result[k].u][i];
                                a.v -= 1;
                                tween = game.add.tween(a);
                                tween.to({
                                    y: 430 - (i - 1) * 50
                                }, 300, "Linear");
                                tween.start();
                            }
                        }


                        mapState[result[k].u][mapState[result[k].u][0]] = 0;
                        mapState[result[k].u][0] -= 1;
                    }

                    for (h = 1; h < 5; h++) {
                        if (mapState[h][1] == 0 && mapState[h + 1][1] == 0 && mapState[h + 2][1] != 0) {
                            for (y = 1; y <= mapState[h + 2][0]; y++) {
                                for (o = 0; o < 36; o++) {
                                    if (GameState.block.children[o].u == h + 2 && GameState.block.children[o].v == y) {
                                        r = GameState.block.children[o]
                                    }
                                };
                                tween = game.add.tween(r);
                                tween.to({
                                    x: 150 + (h) * 50
                                }, 300, "Linear");
                                tween.start();
                                r.u -= 2;
                                mapState[h][y] = mapState[h + 2][y];
                                mapState[h + 2][y] = 0;
                            }
                            mapState[h][0] = mapState[h + 2][0];
                            mapState[h + 2][0] = 0;
                        }
                    }
                    for (h = 1; h < 6; h++) {
                        while (mapState[h][1] == 0 && mapState[h + 1][1] != 0) {
                            for (y = 1; y <= mapState[h + 1][0]; y++) {
                                for (o = 0; o < 36; o++) {
                                    if (GameState.block.children[o].u == h + 1 && GameState.block.children[o].v == y) {
                                        r = GameState.block.children[o]
                                    }
                                };
                                tween = game.add.tween(r);
                                tween.to({
                                    x: 150 + (h) * 50
                                }, 300, "Linear");
                                tween.start();
                                r.u -= 1;
                                mapState[h][y] = mapState[h + 1][y];
                                mapState[h + 1][y] = 0;
                            }
                            mapState[h][0] = mapState[h + 1][0];
                            mapState[h + 1][0] = 0;
                        }
                    }


                    t_a = 0;
                    resultA = 1;
                    resultB = 1;
                    if (this.checkState()) {
                        this.killResult();
                        this.play();
                        this.createResult();
                    } else {
                        this.win();
                    }


                }
            } else {
                for (i = 0; i < t_a; i++) {
                    result[i].select = false;
                }
                result[0] = child;
                child.select = true;
                t_a = 1;
                resultB = child.val;
            }
        }
    },

    createResult: function () {

        this.resultBlock = game.add.sprite(560, 30, 'block');
        this.resultBlock.frame = 12;
        this.resultBlock.scale.setTo(0.6);
        this.resultBlock.anchor.setTo(0.5);
        this.game.physics.enable(this.resultBlock);
        this.resultBlock.body.velocity.y = block_speed;

        this.resultText = game.add.text(560, 30, resultA, {
            font: "30px Arial",
            fill: "#00ff00",
            align: "center"
        });
        this.resultText.anchor.setTo(0.5);
        this.game.physics.enable(this.resultText);
        this.resultText.body.velocity.y = block_speed;
    },

    killResult: function () {
        this.resultBlock.kill();
        this.resultText.kill();
    },

    updateBlockResult: function () {

        if (block_stop <= 30) {
            console.log('game over');
            game.state.start('Home');
        } else {
            if (GameState.resultBlock.y >= block_stop) {
                this.snd5.play();
                GameState.resultBlock.body.velocity.y = 0;
                block_stop -= 50;
                GameState.resultText.kill();
                this.play();
                this.createResult();
            }
        }
    },

    play: function () {
        do {
            x = Math.floor(Math.random() * 6 + 1);
            y = Math.floor(Math.random() * 6 + 1);
        } while (mapState[x][y] == 0);
        resultA = mapState[x][y];
        console.log(resultA + ':' + x + '-' + y);
        t = 0;
        while (t == 0) {
            l = Math.floor(Math.random() * 4 + 1);
            switch (l) {
                case 1:
                    if (x > 1) {
                        if (mapState[x - 1][y] != 0) t = mapState[x - 1][y];
                        console.log(t + ':' + (x - 1) + '-' + y);
                    }
                    break;
                case 2:
                    if (x < 6) {
                        if (mapState[x + 1][y] != 0) t = mapState[x + 1][y];
                        console.log(t + ':' + (x + 1) + '-' + y);
                    }
                    break;
                case 3:
                    if (y > 1) {
                        if (mapState[x][y - 1] != 0) t = mapState[x][y - 1];
                        console.log(t + ':' + x + '-' + (y - 1));
                    }
                    break;
                case 4:
                    if (y < 6) {
                        if (mapState[x][y + 1] != 0) t = mapState[x][y + 1];
                        console.log(t + ':' + x + '-' + (y + 1));
                    }
                    break;
            }
        }
        resultA *= t;

    },

    updateMap: function () {



        for (i = 0; i < 36; i++) {
            if (GameState.block.children[i].select == true) {
                c_d = GameState.block.children[i];
                c_d.selected.x = c_d.x;
                c_d.selected.y = c_d.y;
                c_d.selected.animations.play('select');
            } else {
                c_d = GameState.block.children[i];
                c_d.selected.x = c_d.x;
                c_d.selected.y = c_d.y;
                c_d.selected.animations.play('no');
            }
        }
    },

    createSelect: function () {
        selected = game.add.sprite(-20, -20, 'select');
        selected.animations.add('select', [1, 2], 2, true);
        selected.animations.add('no', [0], 2, false);
        selected.anchor.setTo(0.5);
        selected.scale.setTo(0.5);

        return selected;
    },

    checkState: function () {
        for (i = 1; i < 7; i++) {
            for (j = 1; j < 7; j++) {
                if (mapState[i][j] != 0) return true;
            }
        }
        return false;
    },

    win: function () {
        game.state.start('State');
    },

    createBlockDead: function () {
        if (block_stop < 450) {
            n = (450 - block_stop) / 50;
            for (i = 0; i < n; i++) {
                this.deadBlock = game.add.sprite(560, 450 - i * 50, 'block');
                this.deadBlock.frame = 12;
                this.deadBlock.scale.setTo(0.6);
                this.deadBlock.anchor.setTo(0.5);
            }
        }
    },

    createTime: function () {
        console.log("time");
        style = {
            font: '25px Times New Roman',
            fill: '#fff',
            align: "center",
            stroke: "#ff0000",
            strokeThickness: 2
        }
        style2 = {
            font: '25px Times New Roman',
            fill: '#0f0',
            align: "center",
            stroke: "#ff0000",
            strokeThickness: 2
        }
        this.level = game.add.text(20, 30, "LEVEL: ", style2);
        this.level = game.add.text(120, 30, state, style);
        this.time = game.add.text(20, 80, "TIME:", style2);
        this.time = game.add.text(100, 80, "1:30", style);
    },

    updateTime() {
        time--;
        if (time >= 60) {
            if (time - 60 >= 10) {
                this.time.setText("1:" + (time - 60));
            } else {
                this.time.setText("1:0" + (time - 60));
            }
        } else {
            if (time >= 10) {
                if (time == 10) this.snd6.play();
                this.time.setText("0:" + (time));
            } else {

                this.time.setText("0:0" + (time));
            }

        }
        if (time < 0) {
            game.time.events.add(Phaser.Timer.SECOND * 2, function () {
                game.state.start('Home');
            });

        }
    },

    createSnd: function () {
        this.snd1 = game.add.audio('snd1');
        this.snd2 = game.add.audio('snd2');
        this.snd3 = game.add.audio('snd3');
        this.snd4 = game.add.audio('snd4');
        this.snd5 = game.add.audio('snd5');
        this.snd6 = game.add.audio('snd6');
        this.snd7 = game.add.audio('snd7');
    }
}
