var end_state = {
	create: function() {
		var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
			space_key.onDown.add(this.start, this);

		var style = {font: "20px Arial", fill: "white"};

		var text = this.game.add.text(150, 150, 'Press space to play Again', style);

	},

	start: function() {
		this.game.state.start('play');
	}
}