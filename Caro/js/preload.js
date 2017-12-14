var Preload = {
    init: function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    },

    preload: function(){


    },

    create: function(){
        connection = io.connect('http://doc.olm.vn:1235/game', {
            autoConnect: false
        })
        connection.on('connect', () => {
//            console.log("connected");
            connection.on('event.ojoin', (data) => {
//                console.log(data);
            });
            connection.on('event.data', (data) => {
                console.log(data);

            });
            //            connection.emit('room.join', { room : 'room1', msg : 'tab1 da join'});
            //            connection.emit('event.data', { room: 'room1' ,name : 'user1', msg : '1'});
        })
        connection.emit('room.join', { room : 'room1'});
        game.state.start('Home');
        connection.open();
    }
}
