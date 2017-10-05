var GameState = {
    CN: 6,
    create: function () {
        this.createArr();
        this.rec_play = game.add.group();
        //this.num_play = game.add.group();
        for (i = 0; i < GameState.CN; i++) {
            for (j = 0; j <= i; j++) {
                r_play = this.rec_play.create(320 + 96 * j - 48 * i, 200 + 53 * i, "rec");
                r_play.scale.setTo(0.12, 0.1);
                r_play.anchor.setTo(0.5);
                r_play.inputEnabled = true;
                r_play.input.useHandCursor = true;
                r_play.events.onInputDown.add(this.control, this);
                r_play.u = i;
                r_play.v = j;
            }

        }
        this.ranObj();
        this.createNum();
        this.refresh = game.add.sprite(20, 20, 'rec');
        this.refresh.scale.setTo(0.05);
        this.refresh.anchor.setTo(0.05);
        this.refresh.inputEnabled = true;
        this.refresh.events.onInputDown.add(this.ref, this);
    },

    update: function () {

    },

    createArr: function () {
        f_n = new Array(6).fill(0);
        f_n.forEach(function (x, i) {
            f_n[i] = new Array(i + 1).fill(0);
        });
    },

    ranObj: function () {
        for (i = 0; i < GameState.CN; i++) {
            f_n[5][i] = Math.floor(Math.random() * 10 + 1) / 10;
            for (j = 0; j <= i; j++) {
                console.log(f_n[i][j]);
            }
            console.log("break");
        }
        for (i = 4; i >= 0; i--) {
            for (j = 0; j <= i; j++) {
                f_n[i][j] = Math.floor((f_n[i + 1][j] + f_n[i + 1][j + 1]) * 10) / 10;
            }
        }
    },

    control: function () {

    },

    ref: function () {
        this.ranObj();
        this.updateNum();
    },

    createNum: function () {
        for (i = 0; i < GameState.CN; i++) {
            for (j = 0; j <= i; j++) {
                this.num_play = game.add.text(320 + 96 * j - 48 * i, 200 + 53 * i, f_n[i][j]);
                this.num_play.anchor.setTo(0.5);
                this.num_play.alpha = 0.2;
            }
        }
    },

    updateNum: function () {
        for (i = 0; i < GameState.CN; i++) {
            for (j = 0; j <= i; j++) {
                this.num_play.setText(f_n[i][j]);
            }
        }
    }
}
