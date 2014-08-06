var play_state = {
	create: function() {
		var safezone = game.add.image(0, 0, 'safezone');
		var ground = game.add.image(100, 0, 'ground');
		//player character
		doctor = game.add.sprite(5, 150, 'doctor');
		doctor.scale.setTo(1.5, 1.5);
		game.physics.arcade.enable(doctor);
		doctor.body.bounce.y = 0;
		doctor.body.collideWorldBounds = true;

		//spawns the first patient at a random location
		var randX = Math.random()*450 + 125;
		var randY = Math.random()*360;
		patientArray[0] = game.add.sprite(randX, randY, 'patient');
		game.physics.arcade.enable(patientArray[0]);
		patientArray[0].body.collideWorldBounds = true;



		//initiate cursor keys
		cursors = game.input.keyboard.createCursorKeys();

		//timers for bombLaunch and patientSpawn functions
		this.timer = this.game.time.events.loop(1000, this.bombLaunch, this);
		this.patientTimer = this.game.time.events.loop(5000, this.patientSpawn, this);

		space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

	},

	update: function() {
		//movement commands & animations
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

		//if an explosion has existed for 500ms, kill it
		if (game.time.now - timeCheck > 500 && explosionArray[g - 1]) {
			this.explosionKill();
		}

		//collision detection
		game.physics.arcade.overlap(doctor, explosionArray, this.death, null, this);
		game.physics.arcade.overlap(patientArray, explosionArray, this.patientDeath, null, this);
		game.physics.arcade.overlap(doctor, patientArray, this.grabPatient, null, this);

	},

	grabPatient: function() {
		if (space_key.isDown) {
			patientArray[0].body.velocity.x = doctor.body.velocity.x;
			patientArray[0].body.velocity.y = doctor.body.velocity.y;
		}
		else {
			patientArray[0].body.velocity.x = 0;
			patientArray[0].body.velocity.y = 0;

		}
	},

	bombLaunch: function() {
		//add a target at a random location, +125 to account for no safe zone bombs, add it to the bomb array
		var randX = Math.random()*450 + 125;
		var randY = Math.random()*360;
		bombArray[j] = game.add.sprite(randX, randY, 'bomb');
		bombArray[j].anchor.setTo(0.5, 0.5);
		bombArray[j].animations.add('countdown', [0, 1, 2], 10, true);
		if (j > 0) {
			bombArray[j - 1].frame = 1;
		}
		if (j > 1) {
			bombArray[j - 2].frame = 2;
		}

		//after the 3rd bomb explode the oldest bomb every time a new one is added
		if (j > 2) {
			this.bombExplode();
		}
		j = j + 1;
	},

	bombExplode: function() {
		//once a bomb explodes, add an explosion in the same coordinates to the explosion array
		explosionArray[g] = game.add.sprite(bombArray[j - 3].world.x, bombArray[j - 3].world.y, 'explosion');
		explosionArray[g].scale.setTo(0.25, 0.25);
		explosionArray[g].anchor.setTo(0.5, 0.5);
		game.physics.arcade.enable(explosionArray[g]);

		//take down the time so that the explosion can be killed after 500ms
		timeCheck = game.time.now;
		g = g + 1;
		//kill the bomb underneath the explosion
		bombArray[j - 3].kill();
	},

	explosionKill: function() {
		//kills the explosion, called after 500ms
		explosionArray[g - 1].kill();
	},
	death: function() {
		//called if player hits an explosion, goes to end state
		this.game.state.start('end');
	},
	patientSpawn: function() {
		//spawns a patient randomly, +125 to account for safe zone, then add it to the patient array
		var randX = Math.random()*450 + 125;
		var randY = Math.random()*360;
		patientArray[p] = game.add.sprite(randX, randY, 'patient');
		game.physics.arcade.enable(patientArray[p]);
		patientArray[p].body.collideWorldBounds = true;

		p = p + 1;
	},
	patientDeath: function() {
		//called when a patient and an explosion overlap, kills the patient
		console.log('ded');
	}
}

