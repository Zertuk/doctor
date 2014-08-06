var game = new Phaser.Game(600, 360, Phaser.AUTO, 'game_container');
var doctor;
var score = 0;
var bomb;
var civilian;
var child;
var soldier;
var cursors;
var timeCheck = 0;
var bombArray = [];
var explosionArray = [];
var patientArray = [];
var g = 0;
var j = 0;
var p = 1;
var space_key;
var explode;
var explode2;
var explode3;
var safezone;

game.state.add('preload', preload_state);
game.state.add('load', load_state);
game.state.add('menu', menu_state);
game.state.add('play', play_state);
game.state.add('end', end_state);

game.state.start('preload');
