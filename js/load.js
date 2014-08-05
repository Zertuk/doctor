var load_state = {
	preload: function() {
		game.load.image('sky', 'assets/sky.png');
		game.load.spritesheet('doctor', 'assets/cat4.png', 32, 32);
		game.load.audio('noise', 'assets/noise.wav');
		game.load.image('bomb', 'assets/yarn.png');
		game.load.image('explosion', 'assets/explosion.png');
		game.load.spritesheet('patient', 'assets/yarn 3.png');
	},

	create: function() {
		mainMusic = game.add.audio('music', 1, true);
		this.game.state.start('play');

	}
}