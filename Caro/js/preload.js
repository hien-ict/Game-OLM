var Preload = {
    init: function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    },

    preload: function(){
        this.load.image('board', 'Caro/assets/board.png');
        this.load.image('background', 'Caro/assets/background.png');
        this.load.image('home', 'Caro/assets/home.png');
        this.load.image('reset', 'Caro/assets/reset.png');
        this.load.spritesheet('xo', 'Caro/assets/xo.png',242, 234,2);
        this.load.spritesheet('full', 'Caro/assets/full.png', 256, 256, 2);
        this.load.spritesheet('highlight', 'Caro/assets/highlight.png', 200, 100, 13);
        this.load.spritesheet('player', 'Caro/assets/player.png', 200, 100, 13);
        game.stage.disableVisibilityChange = true;
    },

    create: function(){
        connection = io.connect('http://doc.olm.vn:1235/game', {
            autoConnect: false
        })
        connection.on('connect', () => {
//            console.log("connected");
            connection.on('event.ojoin', (data) => {
                console.log(data);
                numP++;
            });
            connection.on('event.data', (data) => {
                console.log(data);
                turn = data.turn;
                GameState.play(data.turn, data.i, data.j);
            });
            //            connection.emit('room.join', { room : 'room1', msg : 'tab1 da join'});
            //            connection.emit('event.data', { room: 'room1' ,name : 'user1', msg : '1'});
        })
//        connection.emit('room.join', { room : 'room1'});
        game.state.start('Game');
        connection.open();
    }
}
