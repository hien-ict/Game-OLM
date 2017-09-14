result = 1;
max = 6;
var GameState = {
    create: function () {
        this.background = game.add.sprite(0, 0, 'background');

        this.createBlock();
        this.createMapState();

    },

    update: function () {

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
                block = this.block.create(150 + i * 50, 430 - j * 50, 'block');
                mapState[i][j] = block;
                block.scale.setTo(0.5);
                block.anchor.setTo(0.5);

                block.inputEnabled = true;
                block.input.useHandCursor = true;
                block.frame = Math.floor(Math.random() * 9 + 1) - 1;
                block.events.onInputDown.add(this.play, this);
                block.val = block.frame + 1;
                if (j == 6) {
                    block.end = true;
                } else{
                    block.end = false;
                }
                block.u = i;
                block.v = j;

                this.game.physics.enable(block);
            }
        }


    },

    updateMapState: function () {
        for (i = 1; i <= 6; i++) {
            for (j = 1; j <= 6; j++) {

            }
        }
    },

    play: function (child) {
        result *= child.val;
        console.log(child.u + "-" + child.v);
        console.log(mapState[child.u][child.u]);
        child.kill();
        for (i = child.v + 1; i <= 6; i++) {
            if (mapState[child.u][i].alive) {
                mapState[child.u][i].v -= 1;
                console.log(mapState[child.u][i]);
                if (mapState[child.u][i].end) {
                    mapState[child.u][i].alive = false;
                }
                mapState[child.u][i - 1] = mapState[child.u][i];
                tween = game.add.tween(mapState[child.u][i]);
                tween.to({
                    y: 430 - (i - 1) * 50
                }, 300, "Linear");
                tween.start();
                //                mapState[child.u][i].body.velocity.y = 20;
            }

        }

    },

    render: function () {

    }
}
