var preload_state = {
	create: function() {
		var style = {font: "20px Arial", fill: "#ffffff"};

		var x = game.world.width/2, y = game.world.height/2;

		var text = this.game.add.text(240, y -50, ' Loading!', style);
		this.game.state.start('load');


	}
}