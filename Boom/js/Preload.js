var state = 'live';
var RUN_SPEED = 90;
var mapState, coBomb = 0;
const BombState = 1;
const PlayerState = 2;
const ObjState = 4;
const WallState = 8;
const ItemState = 16;

var Preload = {
    preload: function () {
        this.load.tilemap('map1', 'Boom/assets/map1.json', null, Phaser.Tilemap.TILED_JSON);

        this.load.spritesheet('item_bomb', 'Boom/assets/item_bomb.png', 42, 44, 2);
        this.load.spritesheet('item_bombsize', 'Boom/assets/item_bombsize.png', 45, 45, 2);
        this.load.spritesheet('item_shoe', 'Boom/assets/item_shoe.png', 38, 44, 2);
        this.load.image('item_1', 'Boom/assets/item_1.png');
        this.load.image('item_2', 'Boom/assets/item_2.png');
        this.load.image('item_3', 'Boom/assets/item_3.png');
        this.load.image('background', 'Boom/assets/background.png');
        this.load.image('tiles', 'Boom/assets/item.png');

        this.load.spritesheet('boom', 'Boom/assets/boom.png', 50, 50, 3);
        this.load.spritesheet('bombbang', 'Boom/assets/bombbang.png', 45, 45, 9);
        this.load.spritesheet('bomber', 'Boom/assets/bomber.png', 60, 80, 15);
    },

    create: function () {
        Cf.loadScript();

        Phaser.Canvas.setImageRenderingCrisp(game.canvas);

        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.state.start('State1');

        this.cursors = game.input.keyboard.createCursorKeys();
        this.playButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    },

    createMapState: function () {
        mapState = new Array(20).fill(0);
        mapState.forEach(function (x, i) {
            mapState[i] = new Array(20).fill(0);
        });
    },

    walk: function (player, state1) {
        if (player.body.enable && state == state1) {
            player.body.velocity.x = 0;
            player.body.velocity.y = 0;
            if (this.cursors.left.isDown) {
                player.body.velocity.x = -(RUN_SPEED + 30 * player.shoe);
                player.scale.setTo(0.45, 0.45);
                player.animations.play('left');
            } else if (this.cursors.right.isDown) {
                player.body.velocity.x = (RUN_SPEED + 30 * player.shoe);
                player.scale.setTo(-0.45, 0.45);
                player.animations.play('left');
            } else if (this.cursors.up.isDown) {
                player.body.velocity.y = -(RUN_SPEED + 30 * player.shoe);
                player.animations.play('up');
            } else if (this.cursors.down.isDown) {
                player.body.velocity.y = (RUN_SPEED + 30 * player.shoe);
                player.animations.play('down');
            } else {
                player.animations.stop();
                //player.frame = 0;
            }
        }
    },

    play: function (player, state1) {
        if (player.body.enable && state == state1) {
            if (this.playButton.justDown) {
                tile_u = Math.floor(player.x / 25);
                u = tile_u * 25 + 12.5;
                tile_v = Math.floor((player.y + 10) / 25);
                v = tile_v * 25 + 12.5;
                if ((mapState[tile_u][tile_v] & BombState) || (player.bomb < coBomb)) return;
                mapState[tile_u][tile_v] = mapState[tile_u][tile_v] | BombState;
                bomb = this.boom.create(u, v, 'boom');
                bomb.scale.x = 0.5;
                bomb.scale.y = 0.5;
                bomb.anchor.x = 0.5;
                bomb.anchor.y = 0.5;

                bomb.body.immovable = true;

                bomb.animations.add('bomb', [0, 1, 2], 2, true);
                bomb.animations.play('bomb');

                bomb.bombKiller = this.bombKiller(Preload.boom.children[coBomb], tile_u, tile_v);
                bomb.u = tile_u;
                bomb.v = tile_v;
                bomb.timer = 180;
                bomb.flared = bomb.bombKiller;


                coBomb += 1;
            }
        }
        this.boom.children.forEach(function (bomb) {
            bomb.timer -= 1;
            if (bomb.timer < 1) {
                bomb.bombKiller();
            }
        });
        this.flare.children.forEach(function (flare) {
            flare.flareHandler.next();
        });
    },

    createBomber: function () {

        this.bomber = game.add.sprite(37.5, 37.5, 'bomber');
        this.bomber.scale.setTo(0.4);
        this.bomber.anchor.setTo(0.5);

        this.game.physics.enable(this.bomber);
        this.bomber.body.linearDamping = 1;

        this.bomber.body.collideWorldBounds = true;
        this.bomber.body.fixedRotation = true;

        this.bomber.animations.add('up', [5, 6, 7, 8, 9], 6, true);
        this.bomber.animations.add('down', [0, 1, 2, 3, 4], 6, true);
        this.bomber.animations.add('left', [10, 11, 12, 13, 14], 6, true);
        this.bomber.body.setSize(50, 30, 5, 50);

        this.bomber.bomb = 4;
        this.bomber.size = 5;
        this.bomber.shoe = 2;
    },

    createMap: function () {
        this.map = game.add.tilemap('map1');

        this.map.addTilesetImage('item', 'tiles');

        this.layer = this.map.createLayer('background', 500, 500);
        this.layer.resizeWorld();
        this.layer.wrap = true;

        this.map.setCollisionBetween(1, 8);
        this.map.setCollisionBetween(9, 10);
        this.map.setCollisionBetween(13, 19);

        this.map.setCollisionByIndex(9);
        this.map.setCollisionByIndex(13);
        this.map.setCollisionByIndex(14);

        this.break = game.add.group();
        this.break.enableBody = true;
        this.map.createFromTiles(9, null, 'item_1', 'break', this.break);
        this.map.createFromTiles(13, null, 'item_2', 'break', this.break);
        this.map.createFromTiles(14, null, 'item_3', 'break', this.break);
        this.break.setAll('scale.x', 0.5);
        this.break.setAll('scale.y', 0.5);
        this.break.setAll('body.immovable', true);

        this.break.forEach(function (breakable) {
            u = Math.floor(breakable.x / 25);
            v = Math.floor((breakable.y + 10) / 25);
            mapState[u][v] = mapState[u][v] | ObjState;
            breakable.u = u;
            breakable.v = v;

            if (Math.random() > 0.8) {
                breakable.item = Math.floor((Math.random() * 3) + 1);
            }

        }, this);

        this.map.forEach(function (layer) {
            if (layer.index > -1) {
                u = layer.x;
                v = layer.y;
                mapState[u][v] = mapState[u][v] | WallState;
            }
        });

    },

    createBoom: function () {
        this.boom = game.add.group();
        this.boom.enableBody = true;
    },

    createFlare: function () {
        this.flare = game.add.group();
        this.flare.enableBody = true;
    },

    createItem: function () {
        this.item = game.add.group();
        this.item.enableBody = true;
    },

    bombKiller: function (bomb, u, v) {
        return function () {
            mapState[u][v] = mapState[u][v] & ~BombState;
            Preload.boom.remove(bomb);
            coBomb -= 1;
            Preload.flareMaker(u, v, 0, Preload.bomber.size);
        }
    },

    flareMaker: function (u, v, dir, length) {
        if (u < 0 || u > 19 || v < 0 || v > 19) return false;
        if (mapState[u][v] & WallState) return false;
        flare = Preload.flare.create(u * 25 + 12.5, v * 25 + 12.5, 'bombbang');
        flare.scale.x = flare.scale.y = 25 / 45;
        flare.anchor.x = flare.anchor.y = 0.5;
        flare.body.immovable = true;
        flare.flareHandler = Preload.flareHandler(flare, u, v, dir, length);
        if (dir == 0) {
            Preload.flareMaker(u - 1, v, 4, length - 1);
            Preload.flareMaker(u + 1, v, 6, length - 1);
            Preload.flareMaker(u, v - 1, 8, length - 1);
            Preload.flareMaker(u, v + 1, 2, length - 1);
        } else {
            flare.frame = dir;
        };
        return true;
    },

    flareHandler: function (flare, u, v, dir, length) {
        return function* () {
            timer = 90;
            if (mapState[u][v] & BombState) Preload.boom.forEachAlive(function (bomb) {
                if ((u == bomb.u) && v == bomb.v)
                    bomb.bombKiller();
            }, this);

            if (mapState[u][v] & ItemState)
                Preload.item.forEachAlive(function (item) {
                    if ((u == item.u) && v == item.v) {
                        mapState[u][v] = mapState[u][v] & ~ItemState;
                        item.kill();
                    }
                }, this)

            if (mapState[u][v] & ObjState) {
                length = 0;
                Preload.break.forEachAlive(function (breakable) {
                    if ((u == breakable.u) && v == breakable.v) {

                        Preload.dropItem(breakable, u, v);
                        breakable.kill();
                    }
                }, this)
            }

            //            yield;
            if (length > 0) {
                switch (dir) {
                    case 2:
                        v += 1;
                        break;
                    case 4:
                        u -= 1;
                        break;
                    case 6:
                        u += 1;
                        break;
                    case 8:
                        v -= 1;
                        break;
                };
                if (dir != 0)
                    if (Preload.flareMaker(u, v, dir, length - 1))
                        flare.frame -= 1;
            }
            while (timer > 0) yield timer--;
            Preload.flare.remove(flare);
            mapState[u][v] = mapState[u][v] & ~ObjState;
        }();
    },

    slide: function (player, obj) {
        u = Math.floor(player.x / 25);
        v = Math.floor((player.y + 10) / 25);

        if (Preload.cursors.up.isDown) {

            if (mapState[u][v - 1] == 0 && mapState[u - 1][v - 1] != 0 && (player.x < (u * 25 + 12.5))) {
                player.x += 1.5;
            }
            if (mapState[u][v - 1] == 0 && mapState[u + 1][v - 1] != 0 && (player.x >= (u * 25 + 12.5))) {
                player.x -= 1.5;
            }
        }
        if (Preload.cursors.down.isDown) {

            if (mapState[u][v + 1] == 0 && mapState[u - 1][v + 1] != 0 && (player.x < (u * 25 + 12.5))) {
                player.x += 1.5;
            }
            if (mapState[u][v + 1] == 0 && mapState[u + 1][v + 1] != 0 && (player.x >= (u * 25 + 12.5))) {
                player.x -= 1.5;
            }
        }
    },

    dropItem: function (breakable, u, v) {

        if (breakable.item) {
            switch (breakable.item) {
                case 1:
                    {
                        item = Preload.item.create(u * 25 + 12.5, v * 25 + 12.5, 'item_bomb');
                        item.type = 1;
                        break;
                    }
                case 2:
                    {
                        item = Preload.item.create(u * 25 + 12.5, v * 25 + 12.5, 'item_bombsize');
                        item.type = 2;
                        break;
                    }
                case 3:
                    {
                        item = Preload.item.create(u * 25 + 12.5, v * 25 + 12.5, 'item_shoe');
                        item.type = 3;
                        break;
                    }
            }
            mapState[u][v] = mapState[u][v] | ItemState;
            item.scale.x = item.scale.y = 25 / 45;
            item.anchor.x = item.anchor.y = 0.5;
            item.body.immovable = true;
            item.u = u;
            item.v = v;
            item.animations.add('item', [0, 1], 1, true);
            item.animations.play('item');
        }
    }

}
