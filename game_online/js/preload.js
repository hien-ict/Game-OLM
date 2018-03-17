function createPreload(game_online, connection) {
    return {
        init: function () {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
        },

        preload: function () {
            this.load.image('background', 'game_online/assets/background.png');
            this.load.image('createRoom', 'game_online/assets/createRoom.png');
            this.load.image('popup', 'game_online/assets/popup.png');
            this.load.image('huy', 'game_online/assets/huy.png');
            this.load.image('xacnhan', 'game_online/assets/xacnhan.png');
            this.load.image('cursor', 'game_online/assets/cursor.png');


            game_online.stage.disableVisibilityChange = true;
        },

        create: function () {
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
            game_online.state.start('Home');
        }
    }
}
