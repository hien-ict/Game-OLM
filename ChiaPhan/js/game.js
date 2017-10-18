var GameState = {

    create: function () {
        this.background = game.add.sprite(0, 0, 'background');
        this.levelData = JSON.parse(this.game.cache.getText('level'));
        this.platforms = game.add.group();
        this.levelData.data.forEach(function (element) {
            this.platforms.create(element.x, element.y, 'frac1');
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
        this.levelData.block.sort(function(a,b){
            return (Math.random()-0.5);
        })
        this.levelData.block.forEach(function (ele) {
            block = this.blocks.create(ele.x, ele.y, 'frac');
            block.u=ele.x;
            block.v=ele.y;
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
            block.events.onDragStart.add(this.onDragStart, this);
            block.events.onDragStop.add(this.onDragStop, this);
        }, this);
        this.blocks.setAll('scale.x', 0.7);
        this.blocks.setAll('scale.y', 0.7);
        this.blocks.setAll('anchor.x', 0.5);
        this.blocks.setAll('anchor.y', 0.5);
        this.platforms.enableBody = true;

    },

    update: function () {

    },

    onDragStart: function(child){
        this.blocks.bringToTop(child);
    },

    onDragStop: function(child){

        game.add.tween(child).to( { x: child.u,y: child.v }, 500, "Linear", true);
    }
}
