var GameState = {

    create: function () {
        this.background = game.add.sprite(0, 0, 'background');
        this.levelData = JSON.parse(this.game.cache.getText('level'));
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
            font: '30px Arial',
            fill: '#ff0000',
            align: "center",
            stroke: "#8df51e",
            strokeThickness: 2
        };
        value = this.levelData.lv1;
        this.levelData.block.sort(function (a, b) {
            return (Math.random() - 0.5);
        })
        this.levelData.block.forEach(function (ele) {

            block = this.blocks.create(320, 320, 'frac');
            block.u = ele.x;
            block.v = ele.y;
            block.val = value[Math.floor(count / 3)].ts / value[Math.floor(count / 3)].ms;
            block.state = "wait";
            text = game.add.text(0, 4, value[Math.floor(count / 3)].ts + "/" + value[Math.floor(count / 3)].ms, style);
            text.anchor.setTo(0.5);
            //text.scale.setTo(10);
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
        this.blocks.setAll('scale.x', 0.7);
        this.blocks.setAll('scale.y', 0.7);
        this.blocks.setAll('anchor.x', 0.5);
        this.blocks.setAll('anchor.y', 0.5);
        this.platforms.enableBody = true;

    },

    update: function () {

    },

    onDragStart: function (child) {
        GameState.blocks.bringToTop(child);
        GameState.platforms.forEach(function (plat) {
            if (Phaser.Math.distance(child.x, child.y, plat.x, plat.y) < 100) {
                //child.state = 'install';
            }
        })

    },

    onDragStop: function (child) {
        GameState.platforms.forEach(function (plat) {
            if (child.state == 'wait') {

                if (Phaser.Math.distance(child.x, child.y, plat.x, plat.y) < 100 && plat.child.length < 3) {
                    console.log(Phaser.Math.distance(child.x, child.y, plat.x, plat.y))
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
                    if (Phaser.Math.distance(child.x, child.y, plat.x, plat.y) > 100){
                        plat.child = plat.child.filter(function(ele){
                            return ele!=child;
                        })
                        child.state='wait';
                        game.add.tween(child).to({
                            x: child.u,
                            y: child.v
                        }, 500, "Linear", true);
                        GameState.updatePlatforms();
                    }else{
                        GameState.updatePlatforms();
                    }
                }
            }
        })

    },

    updatePlatforms: function () {
        GameState.platforms.forEach(function (plat) {
            for (i = 0; i < plat.child.length; i++) {
                plat.child[i].state='install';
                game.add.tween(plat.child[i]).to({
                    x: plat.x + GameState.levelData.dis[i].x,
                    y: plat.y + GameState.levelData.dis[i].y
                }, 500, "Linear", true);
            }
        })
    }
}
