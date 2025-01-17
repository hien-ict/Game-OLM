function createGame(game) {
    var gameOptions = {
            bestScore: 0,
            tileSize: 100,
            colors: {
                0: 0xeee4da,
                2: 0xeee4da,
                4: 0xede0c8,
                8: 0xf2b179,
                16: 0xf59563,
                32: 0xf67c5f,
                64: 0xf65e3b,
                128: 0xedcf72,
                256: 0xedcc61,
                512: 0xedc850,
                1024: 0xedc53f,
                2048: 0xedc22e,
                4096: 0xFF4444,
                8192: 0xFF3333,
                16384: 0xFF2222,
                32768: 0xFF1111,
                65536: 0xFF0000
            },
            tweenSpeed: 30
        },
        score, stage, addTweenACT;
    var oldX, oldY, newX, newY;
    var style = {
        font: '35px Arial',
        fill: '#fff',
        align: "center",
        stroke: "#ff0000",
        strokeThickness: 2,
        backgroundColor: 'rgba(0,0,0,0.5)'
    };
    return {
        //        self = this,
        preload: function () {
            game.load.image("tile", "2048/assets/tile.png");
            game.load.image("background", "2048/assets/background.png");
            game.load.image("newgame", "2048/assets/newgame.png");
        },
        create: function () {
            self = this;
            score = 0;
            game.scale.pageAlignHorizontally = true;
            game.scale.pageAlignVertically = true;
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            game.stage.backgroundColor = 0x444444;
            this.newGame();

            this.background.inputEnabled = true;
            this.background.events.onInputDown.add(this.inputDown, this);
            this.background.events.onInputUp.add(this.inputUp, this);

            if ((newX - oldX) > (newY - oldY)) {

                this.fieldGroup.sort("x", Phaser.Group.SORT_ASCENDING);
                this.handleMove(0, -1);
            }

            this.wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
            this.wKey.onDown.add(this.handleKey, this);
            this.sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
            this.sKey.onDown.add(this.handleKey, this);
            this.aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
            this.aKey.onDown.add(this.handleKey, this);
            this.dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
            this.dKey.onDown.add(this.handleKey, this);

            this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
            this.upKey.onDown.add(this.handleKey, this);
            this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
            this.downKey.onDown.add(this.handleKey, this);
            this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
            this.leftKey.onDown.add(this.handleKey, this);
            this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
            this.rightKey.onDown.add(this.handleKey, this);
        },
        addBox: function () {
            var emptyTiles = [];
            //            console.log(emptyTiles);
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 4; j++) {
                    if (this.fieldArray[i][j].tileValue == 0) {
                        emptyTiles.push({
                            row: i,
                            col: j
                        })
                    }
                }
            }
            var choosenTile = Phaser.ArrayUtils.getRandomItem(emptyTiles);
            var value = Math.random() < 0.9 ? 2 : 4;
            if (value == 2) {
                this.fieldArray[choosenTile.row][choosenTile.col].tileValue = 2;
                this.fieldArray[choosenTile.row][choosenTile.col].tileSprite.visible = true;
                this.fieldArray[choosenTile.row][choosenTile.col].tileSprite.children[0].text = "2";
            } else {
                this.fieldArray[choosenTile.row][choosenTile.col].tileValue = 4;
                this.fieldArray[choosenTile.row][choosenTile.col].tileSprite.visible = true;
                this.fieldArray[choosenTile.row][choosenTile.col].tileSprite.children[0].text = "4";
            }

            var fadeIn = game.add.tween(this.fieldArray[choosenTile.row][choosenTile.col].tileSprite);
            fadeIn.to({
                alpha: 1
            }, gameOptions.tweenSpeed, Phaser.Easing.Linear.None, true);
            fadeIn.onComplete.add(function () {
                this.canMove = true;
            }, this);
        },
        handleKey: function (e) {
            if (stage == true && this.canMove && this.checkStage()) {
                switch (e.keyCode) {
                    case Phaser.Keyboard.A, Phaser.Keyboard.LEFT:
                        this.fieldGroup.sort("x", Phaser.Group.SORT_ASCENDING);
                        this.handleMove(0, -1);
                        break;
                    case Phaser.Keyboard.D, Phaser.Keyboard.RIGHT:
                        this.fieldGroup.sort("x", Phaser.Group.SORT_DESCENDING);
                        this.handleMove(0, 1);
                        break;
                    case Phaser.Keyboard.W, Phaser.Keyboard.UP:
                        this.fieldGroup.sort("y", Phaser.Group.SORT_ASCENDING);
                        this.handleMove(-1, 0);
                        break;
                    case Phaser.Keyboard.S, Phaser.Keyboard.DOWN:
                        this.fieldGroup.sort("y", Phaser.Group.SORT_DESCENDING);
                        this.handleMove(1, 0);
                        break;
                }
            }
        },
        handleMove: function (deltaRow, deltaCol) {
            this.canMove = false;
            var somethingMoved = false;
            this.movingTiles = 0;
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 4; j++) {
                    var colToWatch = deltaCol == 1 ? (4 - 1) - j : j;
                    var rowToWatch = deltaRow == 1 ? (4 - 1) - i : i;
                    var tileValue = this.fieldArray[rowToWatch][colToWatch].tileValue;
                    if (tileValue != 0) {
                        var colSteps = deltaCol;
                        var rowSteps = deltaRow;
                        while (this.isInsideBoard(rowToWatch + rowSteps, colToWatch + colSteps) && this.fieldArray[rowToWatch + rowSteps][colToWatch + colSteps].tileValue == 0) {
                            colSteps += deltaCol;
                            rowSteps += deltaRow;
                        }
                        if (this.isInsideBoard(rowToWatch + rowSteps, colToWatch + colSteps) && (this.fieldArray[rowToWatch + rowSteps][colToWatch + colSteps].tileValue == tileValue) && this.fieldArray[rowToWatch + rowSteps][colToWatch + colSteps].canUpgrade && this.fieldArray[rowToWatch][colToWatch].canUpgrade) {
                            this.fieldArray[rowToWatch + rowSteps][colToWatch + colSteps].tileValue = tileValue * 2;
                            score += tileValue;
                            this.updateScore();
                            this.fieldArray[rowToWatch + rowSteps][colToWatch + colSteps].canUpgrade = false;
                            this.fieldArray[rowToWatch][colToWatch].tileValue = 0;
                            this.moveTile(this.fieldArray[rowToWatch][colToWatch].tileSprite, rowToWatch + rowSteps, colToWatch + colSteps, Math.abs(rowSteps + colSteps), true);
                            somethingMoved = true;
                        } else {
                            colSteps = colSteps - deltaCol;
                            rowSteps = rowSteps - deltaRow;
                            if (colSteps != 0 || rowSteps != 0) {
                                this.fieldArray[rowToWatch + rowSteps][colToWatch + colSteps].tileValue = tileValue;
                                this.fieldArray[rowToWatch][colToWatch].tileValue = 0;
                                this.moveTile(this.fieldArray[rowToWatch][colToWatch].tileSprite, rowToWatch + rowSteps, colToWatch + colSteps, Math.abs(rowSteps + colSteps), false);
                                somethingMoved = true;
                            }
                        }
                    }
                }
            }
            if (!somethingMoved) {
                this.canMove = true;
            }
        },
        moveTile: function (tile, row, col, distance, changeNumber) {
            this.movingTiles++;
            var moveTween = game.add.tween(tile).to({
                x: col * gameOptions.tileSize + gameOptions.tileSize / 2,
                y: row * gameOptions.tileSize + gameOptions.tileSize / 2
            }, gameOptions.tweenSpeed * distance, Phaser.Easing.Linear.None, true);
            moveTween.onComplete.add(function () {
                this.movingTiles--;
                if (changeNumber) {
                    this.movingTiles++;
                    tile.children[0].text = this.fieldArray[row][col].tileValue.toString();
                    tile.tint = gameOptions.colors[this.fieldArray[row][col].tileValue];
                    var growTween = game.add.tween(tile.scale).to({
                        x: (gameOptions.tileSize + 10) / 200,
                        y: (gameOptions.tileSize + 10) / 200
                    }, gameOptions.tweenSpeed, Phaser.Easing.Cubic.InOut, true, 0, 1, true);
                    growTween.onComplete.add(function () {
                        this.movingTiles--;
                        if (this.movingTiles == 0) {

                            this.addBox();
                            this.resetTiles();
                        }
                    }, this)
                }
                if (this.movingTiles == 0) {

                    this.addBox();
                    this.resetTiles();
                }
            }, this);
        },
        resetTiles: function () {
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 4; j++) {
                    this.fieldArray[i][j].canUpgrade = true;
                    this.fieldArray[i][j].tileSprite.x = j * gameOptions.tileSize + gameOptions.tileSize / 2;
                    this.fieldArray[i][j].tileSprite.y = i * gameOptions.tileSize + gameOptions.tileSize / 2;
                    if (this.fieldArray[i][j].tileValue > 0) {
                        this.fieldArray[i][j].tileSprite.alpha = 1;
                        this.fieldArray[i][j].tileSprite.visible = true;
                        this.fieldArray[i][j].tileSprite.children[0].text = this.fieldArray[i][j].tileValue.toString();
                    } else {
                        this.fieldArray[i][j].tileValue = 0;
                        this.fieldArray[i][j].tileSprite.alpha = 0;
                        this.fieldArray[i][j].tileSprite.visible = false;
                    }
                    this.fieldArray[i][j].tileSprite.tint = gameOptions.colors[this.fieldArray[i][j].tileValue];
                }
            }
        },
        isInsideBoard: function (row, col) {
            return (row >= 0) && (col >= 0) && (row < 4) && (col < 4);
        },
        createScore: function () {
            this.score = game.add.text(469, 85, 0000, {
                font: "bold 32px Arial",
                align: "center",
                fill: "#ffffff"
            });
            this.score.anchor.setTo(0.5);
            this.bestScore = game.add.text(469, 176, gameOptions.bestScore, {
                font: "bold 32px Arial",
                align: "center",
                fill: "#ffffff"
            });
            this.bestScore.anchor.setTo(0.5);
        },
        updateScore: function () {
            if (gameOptions.bestScore < score) gameOptions.bestScore = score;
            this.score.setText(score);
            this.bestScore.setText(gameOptions.bestScore);
        },
        newGame: function () {
            score = 0;
            this.background = game.add.sprite(0, 0, 'background');
            this.fieldArray = [];
            this.fieldGroup = game.add.group();
            for (var i = 0; i < 4; i++) {
                this.fieldArray[i] = [];
                for (var j = 0; j < 4; j++) {
                    var two = game.add.sprite(j * gameOptions.tileSize + gameOptions.tileSize / 2, i * gameOptions.tileSize + gameOptions.tileSize / 2, "tile");
                    two.anchor.set(0.5);
                    two.scale.set(gameOptions.tileSize / 200);
                    var text = game.add.text(0, 0, "", {
                        font: "bold 64px Arial",
                        align: "center"
                    });
                    text.anchor.set(0.5);
                    two.addChild(text);
                    two.alpha = 0;
                    two.visible = false;
                    this.fieldArray[i][j] = {
                        tileValue: 0,
                        tileSprite: two,
                        canUpgrade: true
                    }
                    this.fieldGroup.add(two);
                }
            }
            this.canMove = false;
            this.addBox();
            this.addBox();

            this.createScore();
            stage = true;
            this.newGameBtn = game.add.sprite(469, 300, 'newgame');
            this.newGameBtn.inputEnabled = true;
            this.newGameBtn.input.priorityID = 1;
            this.newGameBtn.input.useHandCursor = true;
            this.newGameBtn.anchor.setTo(0.5);
            this.newGameBtn.input.pixelPerfectClick = true;
            this.newGameBtn.input.pixelPerfectOver = true;
            this.newGameBtn.events.onInputDown.add(this.newGame, this);
        },
        checkStage: function () {
            var flag = false;
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 4; j++) {
                    //                    console.log(this);
                    if (this.fieldArray[i][j].tileValue > 0) {
                        if ((i < 3) && (this.fieldArray[i][j].tileValue == this.fieldArray[i + 1][j].tileValue)) {
                            flag = true;
                        }
                        if ((j < 3) && (this.fieldArray[i][j].tileValue == this.fieldArray[i][j + 1].tileValue)) {
                            flag = true;
                        }
                        if ((i > 0) && (this.fieldArray[i][j].tileValue == this.fieldArray[i - 1][j].tileValue)) {
                            flag = true;
                        }
                        if ((j > 0) && (this.fieldArray[i][j].tileValue == this.fieldArray[i][j - 1].tileValue)) {
                            flag = true;
                        }
                    } else {
                        return true;
                    }

                }
            }
            if (flag == false) {
                this.text = game.add.text(270, 200, "GAME OVER!", style);
                this.text.anchor.setTo(0.5);
                stage = false;
                this.addTween();
                return false;
            };
            return true;
        },
        addTween: function () {
            console.log("add");
            self.newGameBtn.scale.setTo(1);
            addTweenACT = game.add.tween(self.newGameBtn.scale).to({
                x: 1.1,
                y: 1.1
            }, 500, Phaser.Easing.Cubic.InOut, true, 0, 1, true);
            if (stage == false) addTweenACT.onComplete.addOnce(self.addTween);
        },
        inputDown: function (sprite, event) {
            console.log(event.position.x);
            oldX = event.position.x;
            oldY = event.position.y;
        },
        inputUp: function (sprite, event) {
            newX = event.position.x;
            newY = event.position.y;
            console.log((newX - oldX) + "--" + (newY - oldY));
            if (stage == true && this.canMove && this.checkStage()) {
                if (Math.abs(newX - oldX) > Math.abs(newY - oldY) && Math.abs(newX - oldX) > 100) {
                    if (newX > oldX) {
                        this.fieldGroup.sort("x", Phaser.Group.SORT_DESCENDING);
                        this.handleMove(0, 1);
                    } else {
                        this.fieldGroup.sort("x", Phaser.Group.SORT_ASCENDING);
                        this.handleMove(0, -1);
                    }

                }
                if (Math.abs(newX - oldX) < Math.abs(newY - oldY) && Math.abs(newY - oldY) > 100) {
                    if (newY > oldY) {
                        this.fieldGroup.sort("y", Phaser.Group.SORT_DESCENDING);
                        this.handleMove(1, 0);
                    } else {
                        this.fieldGroup.sort("y", Phaser.Group.SORT_ASCENDING);
                        this.handleMove(-1, 0);
                    }

                }
            }

        },

    }

}
