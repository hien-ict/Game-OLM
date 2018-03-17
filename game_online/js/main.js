(function () {
    var connection = io.connect('localhost:8080/game', {
        autoConnect: false
    })
    var game_online = new Phaser.Game(960, 720, Phaser.AUTO, 'game-area');
    var preload = createPreload(game_online, connection);
    var Home = createHome(game_online, connection);
    connection.open();
    connection.on('lobby.listgame', function (games) {
        Home.games = games;
    })

    game_online.state.add('Preload', preload);
    game_online.state.add('Home', Home);
    game_online.state.add('Room', Room);

    game_online.state.start('Preload');
})();
