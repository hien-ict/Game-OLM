var Preload = {
    init: function () {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    },

    preload: function () {
        this.load.image('background', 'Duaxe/assets/background.png');
        this.load.image('quay', 'Duaxe/assets/quay.png');
        this.load.image('button', 'Duaxe/assets/button.png');
        this.load.spritesheet('player', 'Duaxe/assets/bomber.png', 60, 80);
        this.load.spritesheet('full', 'Duaxe/assets/full.png', 256, 256, 2);
        this.load.text('map', 'Duaxe/assets/map.json');
    },

    create: function () {
        //game.state.start('Home', true, false, "WELCOME");
        connection = io.connect('http://doc.olm.vn:1235/game')
        connection.on('connect', () => {
            connection.on('event.ojoin', (data) => {console.log(data)});
            connection.on('event.data', (data) => {console.log(data)});
//            connection.emit('room.join', {name : 'room1', msg : 'tab1 da join'});
        })
        game.state.start('Home');
    }
}
