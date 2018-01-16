var Game = {
    create: function () {
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.background = game.add.sprite(0, 2.5, "background");
        this.home = game.add.sprite(605, 80, "home");
        this.home.anchor.setTo(0.5);
        this.home.scale.setTo(0.25);
        this.home.inputEnabled = true;
        this.home.input.useHandCursor = true;
        this.home.events.onInputDown.add(this.resetGame, this);
        this.reset = game.add.sprite(535, 80, "reset");
        this.reset.anchor.setTo(0.5);
        this.reset.scale.setTo(0.25);
        this.reset.inputEnabled = true;
        this.reset.input.useHandCursor = true;
        this.reset.events.onInputDown.add(this.resetGame, this);

        boardSize = 20;
        userSq = 1;
        machSq = -1;
        blinkSq = "b-1";
        myTurn = false;
        winningMove = 9999999;
        openFour = 8888888;
        twoThrees = 7777777;
        this.createArray();
        iLastUserMove = 0;
        jLastUserMove = 0;
        this.board = game.add.sprite(0, 0, "board");

        this.board.events.onInputDown.add(this.placeItem, this);
        //        this.board.events.onInputOver.add(this.showCoordinates, this);
        w = new Array(0, 20, 17, 15.4, 14, 10);
        nPos = new Array();
        dirA = new Array();
        this.full = game.add.sprite(615, 480, 'full');
        this.full.anchor.setTo(0.5);
        this.full.scale.setTo(0.15);
        this.full.inputEnabled = true;
        this.full.input.useHandCursor = true;
        this.full.events.onInputDown.add(this.gofull, this);
        this.full.events.onInputOver.add(this.over, this.full);
        this.full.events.onInputOut.add(this.out, this.full);

        this.createPlayer();


    },

    update: function () {
        this.controlHighlight();
        this.showCoordinates();
    },

    createArray: function () {
        f = new Array(20).fill(0);
        f.forEach(function (x, i) {
            f[i] = new Array(20).fill(0);
        });
        s = new Array(20).fill(0);
        s.forEach(function (x, i) {
            s[i] = new Array(20).fill(0);
        });
        q = new Array(20).fill(0);
        q.forEach(function (x, i) {
            q[i] = new Array(20).fill(0);
        });
    },

    createPlayer: function () {
        var style = {
            font: "bold 16pt Arial",
            align: "center"
        }
        this.showPointer = game.add.sprite(500, 150, "player");
        this.showPointer.frame = 7;
        this.showPointer.scale.setTo(0.7);
        this.ho = game.add.text(540, 167, '');
        this.ve = game.add.text(605, 167, '');

        this.showPlayer = game.add.sprite(500, 250, "player");
        this.showPlayer.scale.setTo(0.7);
        this.showPlayer.animations.add('walk', [0, 1, 2], 1, true);
        this.showPlayer.animations.loop = true;
        this.showPlayer.animations.play('walk');
        this.Px = game.add.text(536, 290, '', style);
        this.Py = game.add.text(601, 290, '', style);

        this.highlightPlayer = game.add.sprite(500, 250, "highlight");
        this.highlightPlayer.scale.setTo(0.7);
        this.highlightPlayer.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 5, true);
        this.highlightPlayer.animations.play('walk');

        this.robot = game.add.sprite(500, 350, "player");
        this.robot.scale.setTo(0.7);
        this.robot.animations.add('walk', [3, 4, 5], 1, true);
        this.robot.animations.loop = true;
        this.robot.animations.play('walk');
        this.Rx = game.add.text(536, 393, '', style);
        this.Ry = game.add.text(601, 393, '', style);
        this.highlightRobot = game.add.sprite(500, 350, "highlight");
        this.highlightRobot.scale.setTo(0.7);
        this.highlightRobot.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 5, true);
        this.highlightRobot.animations.play('walk');
    },

    placeItem: function (sprite, event) {
        var x = event.position.x,
            y = event.position.y;
        var i = Math.floor(x / 25),
            j = Math.floor(y / 25);
        this.clk(i, j);

    },

    clk: function (iMove, jMove) {
        if (myTurn) return;
        if (f[iMove][jMove] != 0) {
            alert('This square is not empty! Please choose another.');
            return;
        }
        f[iMove][jMove] = userSq;
        this.drawSquare(iMove, jMove, userSq);
        myTurn = true;
        iLastUserMove = iMove;
        jLastUserMove = jMove;

        dly = 500;

        if (this.winningPos(iMove, jMove, userSq) == winningMove) {
            setTimeout('Game.printMessage("WIN!", 35, "f", "f", "0");', dly);
            //            setTimeout('Game.resetGame();', 1000);
        } else setTimeout("Game.machineMove(iLastUserMove,jLastUserMove);", dly);
    },

    machineMove: function (iUser, jUser) {
        maxS = this.evaluatePos(s, userSq);
        maxQ = this.evaluatePos(q, machSq);

        // alert ('maxS='+maxS+', maxQ='+maxQ);

        if (maxQ >= maxS) {
            maxS = -1;
            for (i = 0; i < boardSize; i++) {
                for (j = 0; j < boardSize; j++) {
                    if (q[i][j] == maxQ && s[i][j] > maxS) {
                        maxS = s[i][j];
                        iMach = i;
                        jMach = j;
                    }
                }
            }
        } else {
            maxQ = -1;
            for (i = 0; i < boardSize; i++) {
                for (j = 0; j < boardSize; j++) {
                    if (s[i][j] == maxS && q[i][j] > maxQ) {
                        maxQ = q[i][j];
                        iMach = i;
                        jMach = j;
                    }
                }
            }
        }

        f[iMach][jMach] = machSq;

        this.drawSquare(iMach, jMach, machSq);

        if (this.winningPos(iMach, jMach, machSq) == winningMove) {
            setTimeout('Game.printMessage("LOSE!!", 35);', 400);
            //            setTimeout('Game.resetGame();', 2000);
        } else setTimeout("myTurn=false;", 500);
    },

    hasNeighbors: function (i, j) {
        if (j > 0 && f[i][j - 1] != 0) return 1;
        if (j + 1 < boardSize && f[i][j + 1] != 0) return 1;
        if (i > 0) {
            if (f[i - 1][j] != 0) return 1;
            if (j > 0 && f[i - 1][j - 1] != 0) return 1;
            if (j + 1 < boardSize && f[i - 1][j + 1] != 0) return 1;
        }
        if (i + 1 < boardSize) {
            if (f[i + 1][j] != 0) return 1;
            if (j > 0 && f[i + 1][j - 1] != 0) return 1;
            if (j + 1 < boardSize && f[i + 1][j + 1] != 0) return 1;
        }
        return 0;
    },

    winningPos: function (i, j, mySq) {
        test3 = 0;

        L = 1;
        m = 1;
        while (j + m < boardSize && f[i][j + m] == mySq) {
            L++;
            m++
        }
        m1 = m;
        m = 1;
        while (j - m >= 0 && f[i][j - m] == mySq) {
            L++;
            m++
        }
        m2 = m;
        if (L > 4) {
            return winningMove;
        }
        side1 = (j + m1 < boardSize && f[i][j + m1] == 0);
        side2 = (j - m2 >= 0 && f[i][j - m2] == 0);

        if (L == 4 && (side1 || side2)) test3++;
        if (side1 && side2) {
            if (L == 4) return openFour;
            if (L == 3) test3++;
        }

        L = 1;
        m = 1;
        while (i + m < boardSize && f[i + m][j] == mySq) {
            L++;
            m++
        }
        m1 = m;
        m = 1;
        while (i - m >= 0 && f[i - m][j] == mySq) {
            L++;
            m++
        }
        m2 = m;
        if (L > 4) {
            return winningMove;
        }
        side1 = (i + m1 < boardSize && f[i + m1][j] == 0);
        side2 = (i - m2 >= 0 && f[i - m2][j] == 0);
        if (L == 4 && (side1 || side2)) test3++;
        if (side1 && side2) {
            if (L == 4) return openFour;
            if (L == 3) test3++;
        }
        if (test3 == 2) return twoThrees;

        L = 1;
        m = 1;
        while (i + m < boardSize && j + m < boardSize && f[i + m][j + m] == mySq) {
            L++;
            m++
        }
        m1 = m;
        m = 1;
        while (i - m >= 0 && j - m >= 0 && f[i - m][j - m] == mySq) {
            L++;
            m++
        }
        m2 = m;
        if (L > 4) {
            return winningMove;
        }
        side1 = (i + m1 < boardSize && j + m1 < boardSize && f[i + m1][j + m1] == 0);
        side2 = (i - m2 >= 0 && j - m2 >= 0 && f[i - m2][j - m2] == 0);
        if (L == 4 && (side1 || side2)) test3++;
        if (side1 && side2) {
            if (L == 4) return openFour;
            if (L == 3) test3++;
        }
        if (test3 == 2) return twoThrees;

        L = 1;
        m = 1;
        while (i + m < boardSize && j - m >= 0 && f[i + m][j - m] == mySq) {
            L++;
            m++
        }
        m1 = m;
        m = 1;
        while (i - m >= 0 && j + m < boardSize && f[i - m][j + m] == mySq) {
            L++;
            m++
        }
        m2 = m;
        if (L > 4) {
            return winningMove;
        }
        side1 = (i + m1 < boardSize && j - m1 >= 0 && f[i + m1][j - m1] == 0);
        side2 = (i - m2 >= 0 && j + m2 < boardSize && f[i - m2][j + m2] == 0);
        if (L == 4 && (side1 || side2)) test3++;
        if (side1 && side2) {
            if (L == 4) return openFour;
            if (L == 3) test3++;
        }
        if (test3 == 2) return twoThrees;
        return -1;
    },

    evaluatePos: function (a, mySq) {
        maxA = -1;
        for (i = 0; i < boardSize; i++) {
            for (j = 0; j < boardSize; j++) {

                // Compute "value" a[i][j] of the (i,j) move

                if (f[i][j] != 0) {
                    a[i][j] = -1;
                    continue;
                }
                if (Game.hasNeighbors(i, j) == 0) {
                    a[i][j] = -1;
                    continue;
                }
                wp = Game.winningPos(i, j, mySq);
                if (wp == winningMove) {
                    a[i][j] = winningMove;
                    return winningMove;
                }
                if (wp >= twoThrees) {
                    a[i][j] = wp;
                    if (maxA < wp) maxA = wp;
                    continue;
                }

                minM = i - 4;
                if (minM < 0) minM = 0;
                minN = j - 4;
                if (minN < 0) minN = 0;
                maxM = i + 5;
                if (maxM > boardSize) maxM = boardSize;
                maxN = j + 5;
                if (maxN > boardSize) maxN = boardSize;

                nPos[1] = 1;
                A1 = 0;
                m = 1;
                while (j + m < maxN && f[i][j + m] != -mySq) {
                    nPos[1]++;
                    A1 += w[m] * f[i][j + m];
                    m++
                }
                if (j + m >= boardSize || f[i][j + m] == -mySq) A1 -= (f[i][j + m - 1] == mySq) ? (w[5] * mySq) : 0;
                m = 1;
                while (j - m >= minN && f[i][j - m] != -mySq) {
                    nPos[1]++;
                    A1 += w[m] * f[i][j - m];
                    m++
                }
                if (j - m < 0 || f[i][j - m] == -mySq) A1 -= (f[i][j - m + 1] == mySq) ? (w[5] * mySq) : 0;

                nPos[2] = 1;
                A2 = 0;
                m = 1;
                while (i + m < maxM && f[i + m][j] != -mySq) {
                    nPos[2]++;
                    A2 += w[m] * f[i + m][j];
                    m++
                }
                if (i + m >= boardSize || f[i + m][j] == -mySq) A2 -= (f[i + m - 1][j] == mySq) ? (w[5] * mySq) : 0;
                m = 1;
                while (i - m >= minM && f[i - m][j] != -mySq) {
                    nPos[2]++;
                    A2 += w[m] * f[i - m][j];
                    m++
                }
                if (i - m < 0 || f[i - m][j] == -mySq) A2 -= (f[i - m + 1][j] == mySq) ? (w[5] * mySq) : 0;

                nPos[3] = 1;
                A3 = 0;
                m = 1;
                while (i + m < maxM && j + m < maxN && f[i + m][j + m] != -mySq) {
                    nPos[3]++;
                    A3 += w[m] * f[i + m][j + m];
                    m++
                }
                if (i + m >= boardSize || j + m >= boardSize || f[i + m][j + m] == -mySq) A3 -= (f[i + m - 1][j + m - 1] == mySq) ? (w[5] * mySq) : 0;
                m = 1;
                while (i - m >= minM && j - m >= minN && f[i - m][j - m] != -mySq) {
                    nPos[3]++;
                    A3 += w[m] * f[i - m][j - m];
                    m++
                }
                if (i - m < 0 || j - m < 0 || f[i - m][j - m] == -mySq) A3 -= (f[i - m + 1][j - m + 1] == mySq) ? (w[5] * mySq) : 0;

                nPos[4] = 1;
                A4 = 0;
                m = 1;
                while (i + m < maxM && j - m >= minN && f[i + m][j - m] != -mySq) {
                    nPos[4]++;
                    A4 += w[m] * f[i + m][j - m];
                    m++;
                }
                if (i + m >= boardSize || j - m < 0 || f[i + m][j - m] == -mySq) A4 -= (f[i + m - 1][j - m + 1] == mySq) ? (w[5] * mySq) : 0;
                m = 1;
                while (i - m >= minM && j + m < maxN && f[i - m][j + m] != -mySq) {
                    nPos[4]++;
                    A4 += w[m] * f[i - m][j + m];
                    m++;
                }
                if (i - m < 0 || j + m >= boardSize || f[i - m][j + m] == -mySq) A4 -= (f[i - m + 1][j + m - 1] == mySq) ? (w[5] * mySq) : 0;

                dirA[1] = (nPos[1] > 4) ? A1 * A1 : 0;
                dirA[2] = (nPos[2] > 4) ? A2 * A2 : 0;
                dirA[3] = (nPos[3] > 4) ? A3 * A3 : 0;
                dirA[4] = (nPos[4] > 4) ? A4 * A4 : 0;

                A1 = 0;
                A2 = 0;
                for (k = 1; k < 5; k++) {
                    if (dirA[k] >= A1) {
                        A2 = A1;
                        A1 = dirA[k]
                    }
                }
                thisA = A1 + A2;

                a[i][j] = thisA;
                if (thisA > maxA) {
                    maxA = thisA;
                }
            }
        }
        return maxA;
    },

    drawSquare: function (x, y, player) {
        if (player == userSq) {
            this.showP(x, y);
            this.player = game.add.sprite(x * 25 + 12.5, y * 25 + 12.5, 'xo');
            this.player.anchor.setTo(0.5);
            this.player.scale.setTo(0.1);
            this.player.frame = 0;
        } else
        if (player == machSq) {
            this.showR(x, y);
            this.player = game.add.sprite(x * 25 + 12.5, y * 25 + 12.5, 'xo');
            this.player.anchor.setTo(0.5);
            this.player.scale.setTo(0.1);
            this.player.frame = 1;
        }
    },

    printMessage: function (msg, size, r, g, b, x, y) {
        r = r || "f";
        g = g || "f";
        b = b || "f";
        var style = {
            font: "bold " + (size) + "pt Arial",
            fill: "#" + r + g + b,
            align: "center",
            stroke: "#258acc",
            strokeThickness: 6
        };
        x1 = x || 250;
        y1 = y || 250;
        this.msg = game.add.text(x1, y1, msg, style);
        this.msg.anchor.setTo(0.5, 0.5);

    },

    resetGame: function () {
        game.state.start('Game');
    },

    controlHighlight: function () {
        if (myTurn == false) {
            this.board.inputEnabled = true;
            this.board.input.useHandCursor = true;
            this.highlightRobot.animations.stop('walk');
            this.highlightRobot.frame = 12;
            this.robot.animations.stop("walk");
            this.robot.frame = 9;

            this.highlightPlayer.animations.play('walk');
            //            this.highlightPlayer.frame = 0;
            this.showPlayer.animations.play('walk');
        } else {
            this.board.inputEnabled = false;
            this.board.input.useHandCursor = false;
            this.highlightPlayer.animations.stop('walk');
            this.highlightPlayer.frame = 12;
            this.showPlayer.animations.stop("walk");
            this.showPlayer.frame = 6;

            this.highlightRobot.animations.play('walk');
            this.robot.animations.play('walk');

        }
    },

    showCoordinates: function () {

        var x = game.input.mousePointer.position.x,
            y = game.input.mousePointer.position.y;
        var i = Math.floor(x / 25),
            j = Math.floor(y / 25);
        if (i > 19) i = 19;

        this.ho.setText(i + 1);
        this.ve.setText(j + 1);
    },

    showP: function (x, y) {
        this.Px.setText(x + 1);
        this.Py.setText(y + 1);
    },

    showR: function (x, y) {
        this.Rx.setText(x + 1);
        this.Ry.setText(y + 1);
    },

    gofull: function () {
        if (game.scale.isFullScreen) {
            game.scale.stopFullScreen();
            this.full.frame = 0;
            this.full.scale.setTo(0.15);
        } else {
            game.scale.startFullScreen(false);
            this.full.frame = 1;
            this.full.scale.setTo(0.15);
        }
    },

    out() {
        this.scale.setTo(0.15);
    },

    over() {
        this.scale.setTo(0.20);
    }
}
