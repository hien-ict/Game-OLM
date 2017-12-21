var GameState = {
    create: function () {
        this.board = game.add.sprite(0, 0, "board");
        this.player = game.add.sprite(100, 100, 'xo');
        this.player.anchor.setTo(0.5);
        this.player.scale.setTo(0.1);
    },

    update: function () {

    },

    createMapState: function () {
        mapState = new Array(32).fill(0);
        mapState.forEach(function (x, i) {
            mapState[i] = new Array(32).fill(0);
        });
    },

}
