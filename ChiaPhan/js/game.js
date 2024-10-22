var GameState = {
    level: 1,
    create: function () {
        style2 = {
            font: '25px Arial',
            fill: '#ee00ee',
            align: "center",
            stroke: "#eeee00",
            strokeThickness: 2
        };
        this.background = game.add.sprite(0, 0, 'background');
        this.levelData = JSON.parse(this.game.cache.getText('level'));

        this.txt = game.add.text(30,120,"LEVEL: "+GameState.level,style2);


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

        this.platforms = game.add.group();
        this.levelData.data.forEach(function (element) {
            platforms = this.platforms.create(element.x, element.y, 'frac1');
            platforms.val = 0;
            platforms.child = new Array();
        }, this);
        this.platforms.setAll('scale.x', 0.27);
        this.platforms.setAll('scale.y', 0.27);
        this.platforms.setAll('anchor.x', 0.5);
        this.platforms.setAll('anchor.y', 0.5);

        this.blocks = game.add.group();
        this.blocks.enableBody = true;
        count = 0;
        style = {
            font: '25px Arial',
            fill: '#ee0000',
            align: "center",
            stroke: "#8df51e",
            strokeThickness: 2
        };

        value = this.levelData['lv' + GameState.level];
        this.levelData.block.sort(function (a, b) {
            return (Math.random() - 0.5);
        })
        this.levelData.block.forEach(function (ele) {

            block = this.blocks.create(320, 320, 'frac');
            block.u = ele.x;
            block.v = ele.y;
            block.val = value[Math.floor(count / 3)].ts / value[Math.floor(count / 3)].ms;
            block.state = "wait";
            switch (count % 3) {
                case 0:
                    {
                        text = game.add.text(0, 4, value[Math.floor(count / 3)].ts + "/" + value[Math.floor(count / 3)].ms, style);
                        break;
                    }
                case 1:
                    {
                        l = Math.floor(Math.random() * 4 + 2);
                        text = game.add.text(0, 4, l * value[Math.floor(count / 3)].ts + "/" + l * value[Math.floor(count / 3)].ms, style);
                        break;
                    }
                case 2:
                    {
                        text = game.add.graphics(0, 0);
                        start = 0;
                        text.lineStyle(2, 0x000000);
                        text.drawCircle(0, 0, 60);
                        start = 0;
                        arg = 360.0 / (value[Math.floor(count / 3)].ms);
                        for (i = 0; i < (value[Math.floor(count / 3)].ts); i++) {
                            text.beginFill(0x0000ff);
                            start += arg;
                            text.arc(0, 0, 30, game.math.degToRad(360 - start), game.math.degToRad(358 - (start + arg)), true);
                        }
                        for (i = value[Math.floor(count / 3)].ts; i < (value[Math.floor(count / 3)].ms); i++) {
                            text.beginFill(0x00bff3, 0.4);
                            start += arg;
                            text.arc(0, 0, 30, game.math.degToRad(360 - start), game.math.degToRad(358 - (start + arg)), true);
                        }
                        break;
                    }
            }

            text.anchor.setTo(0.5);
            block.addChild(text);
            count++;
            block.inputEnabled = true;
            block.input.useHandCursor = true;
            block.input.pixelPerfectClick = true;
            block.input.pixelPerfectOver = true;
            block.input.enableDrag();
            block.events.onDragStart.add(this.onDragStart, block);
            block.events.onDragStop.add(this.onDragStop, block);
            game.add.tween(block).to({
                x: block.u,
                y: block.v
            }, 500, "Linear", true);

        }, this);
        this.blocks.setAll('scale.x', 0.8);
        this.blocks.setAll('scale.y', 0.8);
        this.blocks.setAll('anchor.x', 0.5);
        this.blocks.setAll('anchor.y', 0.5);
        this.platforms.enableBody = true;

        //        game.input.onDown.add(this.gofull, this);
    },

    update: function () {

    },

    onDragStart: function (child) {
        GameState.blocks.bringToTop(child);
        if (GameState.text) {
            GameState.text.setText('');
            GameState.text.alpha = 0;
        }
    },

    onDragStop: function (child) {
        GameState.platforms.forEach(function (plat) {
            if (child.state == 'wait') {

                if (Phaser.Math.distance(child.x, child.y, plat.x, plat.y) < 100 && plat.child.length < 3) {
                    plat.child.push(child);
                    GameState.updatePlatforms();
                } else {
                    if (Phaser.Math.distance(child.x, child.y, plat.x, plat.y) > 100 || plat.child.length > 3) {
                        game.add.tween(child).to({
                            x: child.u,
                            y: child.v
                        }, 500, "Linear", true);
                    }
                    GameState.updatePlatforms();
                }

            } else {
                if (child.state == 'install') {
                    if (Phaser.Math.distance(child.x, child.y, plat.x, plat.y) > 100) {
                        plat.child = plat.child.filter(function (ele) {
                            return ele != child;
                        })
                        child.state = 'wait';
                        game.add.tween(child).to({
                            x: child.u,
                            y: child.v
                        }, 500, "Linear", true);
                        GameState.updatePlatforms();
                    } else {
                        GameState.updatePlatforms();
                    }
                }
            }
        })

    },

    updatePlatforms: function () {
        GameState.platforms.forEach(function (plat) {
            for (i = 0; i < plat.child.length; i++) {
                plat.child[i].state = 'install';
                game.add.tween(plat.child[i]).to({
                    x: plat.x + GameState.levelData.dis[i].x,
                    y: plat.y + GameState.levelData.dis[i].y
                }, 500, "Linear", true);
            }
        })
    },

    newGame: function () {
        game.state.start("Home");
    },

    checkState: function () {
        var style2 = {
            font: '35px Arial',
            fill: '#fff',
            align: "center",
            stroke: "#ff0000",
            strokeThickness: 2,
            backgroundColor: 'rgba(0,0,0,0.5)'
        };
        if (this.checkBlock()) {
            if (this.checkPlatforms()) {
                GameState.level += 1;
                if (GameState.level <= 10) {
                    game.state.start("Home", true, false, "Chúc mừng bạn qua level " + (GameState.level - 1) + "\n Hãy cố gắng để vượt qua mọi thử thách nhé!");
                } else {
                    game.state.start("Home", true, false, "THẬT TUYỆT! \n BẠN ĐÃ VƯỢT QUA MỌI THỬ THÁCH\nBẠN CÓ MUỐN CHƠI LẠI KHÔNG?");
                }

            } else {
                this.text = game.add.text(320, 350, "Sai rồi!\n Hãy làm lại nào.", style2);
                this.text.anchor.setTo(0.5);
            }
        } else {
            this.text = game.add.text(320, 350, "Bạn chưa làm xong!\n Hãy làm tiếp nào.", style2);
            this.text.anchor.setTo(0.5);
        }
    },

    checkBlock: function () {
        var flag = true;
        GameState.blocks.forEach(function (child) {
            if (child.state == 'wait') flag = false;
        }, this)
        return flag;
    },

    checkPlatforms: function () {
        var flag = true;
        GameState.platforms.forEach(function (plat) {
            gt = plat.child[0].val;
            plat.child.forEach(function (ele) {
                if (ele.val != gt) flag = false;
            })
        }, this)
        return flag;
    },

    gofull: function () {

        if (game.scale.isFullScreen) {
            game.scale.stopFullScreen();
        } else {
            game.scale.startFullScreen(false);
        }

    }
}
