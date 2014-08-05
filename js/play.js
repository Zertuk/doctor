var play_state = {
	create: function() {
		doctor = game.add.sprite(5, 150, 'doctor');
		doctor.scale.setTo(1.5, 1.5);
		game.physics.arcade.enable(doctor);
		doctor.body.bounce.y = 0;
		doctor.body.collideWorldBounds = true;

		cursors = game.input.keyboard.createCursorKeys();

		this.timer = this.game.time.events.loop(1000, this.bombLaunch, this);



	},

	update: function() {



		if (cursors.left.isDown) {
			doctor.body.velocity.x = -150;
		}
		else if (cursors.right.isDown) {
			doctor.body.velocity.x = 150;
		}
		else {
			doctor.body.velocity.x = 0;
		}

		if (cursors.up.isDown) {
			doctor.body.velocity.y = -150;
		}
		else if (cursors.down.isDown) {
			doctor.body.velocity.y = 150;
		}
		else {
			doctor.body.velocity.y = 0;
		}

		if (game.time.now - timeCheck > 500 && explosionArray[g - 1]) {
			this.explosionKill();
		}

		game.physics.arcade.overlap(doctor, explosionArray, this.death, null, this);

	},

	bombLaunch: function() {
		var randX = Math.random()*450 + 125;
		var randY = Math.random()*360;
		console.log(randX + ' x');
		console.log(randY + ' y');
		bombArray[j] = game.add.sprite(randX, randY, 'bomb');
		bombArray[j].anchor.setTo(0.5, 0.5);

		if (j > 2) {
			this.bombExplode();
		}
		j = j + 1;
	},

	bombExplode: function() {
		explosionArray[g] = game.add.sprite(bombArray[j - 3].world.x, bombArray[j - 3].world.y, 'explosion');
		explosionArray[g].scale.setTo(0.25, 0.25);
		explosionArray[g].anchor.setTo(0.5, 0.5);
		game.physics.arcade.enable(explosionArray[g]);


		timeCheck = game.time.now;
		g = g + 1;
		bombArray[j - 3].kill();
	},

	explosionKill: function() {
		explosionArray[g - 1].kill();
	},
	death: function() {
		console.log('gg');

	}
}

