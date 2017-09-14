var Home = {
    create: function () {
        this.background = game.add.sprite(0, 0, 'background');


    },

    update: function () {

    },

    actionOnClick: function () {
        game.state.start('GameState');
    }
}
