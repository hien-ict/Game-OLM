var GameState = {

    create: function () {
        this.background = game.add.sprite(0, 0, 'background');
        this.levelData = JSON.parse(this.game.cache.getText('level'));
    },

    update: function () {

    }
}
