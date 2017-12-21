var Preload = {
    init: function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    },

    preload: function(){
        this.load.image('board', 'Caro/assets/board.png');
        this.load.spritesheet('xo', 'Caro/assets/xo.png',242, 234,2);

    },

    create: function(){
        connection = io.connect('http://doc.olm.vn:1235/game', {
            autoConnect: false
        })
        connection.on('connect', () => {
//            console.log("connected");
            connection.on('event.ojoin', (data) => {
                console.log(data);
            });
            connection.on('event.data', (data) => {
                console.log(data);

            });
            //            connection.emit('room.join', { room : 'room1', msg : 'tab1 da join'});
            //            connection.emit('event.data', { room: 'room1' ,name : 'user1', msg : '1'});
        })
        connection.emit('room.join', { room : 'room1'});
        game.state.start('GameState');
        connection.open();
    }
}
