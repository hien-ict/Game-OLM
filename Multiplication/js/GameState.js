resultA = 1, resultB = 1; result = new Array(4);t=0;
block_speed = 50;
state = 'play';
max = 6;
var GameState = {
    create: function () {
        this.background = game.add.sprite(0, 0, 'background');

        this.createBlock();
        this.createMapState();
        this.updateMapState();
        this.createResult();
        this.play();
    },

    update: function () {
        this.updateResult();
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
                mapState[i][j] = Math.floor(Math.random() * 9 + 1);
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
            }
        }
    },

    control: function (f) {
        if()
        result[t]=child;
        resultB *= (child.val);
        console.log(child.u + "-" + child.v);
        //child.kill();
        for (i = child.v + 1; i <= mapState[child.u][0]; i++) {
            if (mapState[child.u][i] != 0) {
                for (j = 0; j < 36; j++) {
                    if (GameState.block.children[j].u == child.u && GameState.block.children[j].v == i) {
                        a = GameState.block.children[j]
                    }
                }
                console.log(mapState[child.u][i])
                mapState[child.u][i - 1] = mapState[child.u][i];
                a.v -= 1;
                tween = game.add.tween(a);
                tween.to({
                    y: 430 - (i - 1) * 50
                }, 300, "Linear");
                tween.start();

            }

        }
        mapState[child.u][mapState[child.u][0]] = 0;
        mapState[child.u][0] -= 1;

    },

    createResult: function () {
        this.resultBlock = game.add.sprite(560, 30, 'block');
        this.resultBlock.frame = 12;
        this.resultBlock.scale.setTo(0.5);
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

    updateResult: function () {
        this.resultText.setText(resultA);
    },

    play: function () {
        do {
            x = Math.floor(Math.random() * 6 + 1);
            y = Math.floor(Math.random() * 6 + 1);
        } while (mapState[x][y] == 0);
        resultA *= mapState[x][y];
        console.log(resultA + ':' + x + '-' + y);
        t = 0;
        do {
            a = Math.floor(Math.random() * 4 + 1);
            switch (a) {
                case 1:
                    if (mapState[x - 1][y] != 0) t = mapState[x - 1][y];
                    break;
                case 2:
                    if (x < 6) {
                        if (mapState[x + 1][y] != 0) t = mapState[x + 1][y];
                    }

                    break;
                case 3:
                    if (mapState[x][y - 1] != 0) t = mapState[x][y - 1];
                    break;
                case 4:
                    if (y < 6) {
                        if (mapState[x][y + 1] != 0) t = mapState[x][y + 1];
                    }
                    break;
            }
        } while (t === 0)
        resultA *= t;
        this.updateResult();
    }
}
