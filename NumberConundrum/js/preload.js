var Preload = {
    init: function () {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    },

    preload: function () {
        this.load.image('background', 'NumberConundrum/assets/background.jpg');
        this.load.image('rec', 'NumberConundrum/assets/rec.jpg');
        this.load.image('backspace', 'NumberConundrum/assets/backspace.png');
        this.load.image('check', 'NumberConundrum/assets/check.png');
        this.load.image('new', 'NumberConundrum/assets/new.png');
        this.load.image('instruction', 'NumberConundrum/assets/instructions.png');
    },

    create: function () {
        //game.state.start('Home', true, false, "WELCOME");
        game.state.start('Home');
    }
}
