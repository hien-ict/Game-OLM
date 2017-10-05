var Preload = {
    init: function () {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    },

    preload: function () {
        this.load.image('background', 'NumberConundrum/assets/rec.jpg');
        this.load.image('rec', 'NumberConundrum/assets/rec.jpg');
    },

    create: function () {
        game.state.start('GameState');
    }
}
