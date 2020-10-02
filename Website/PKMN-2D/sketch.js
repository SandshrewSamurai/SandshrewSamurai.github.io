let dex;
let teamText = [];
let oldTeamText = [];
let pokemon = [];
let ballImg;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function unloadScrollBars() {
    document.documentElement.style.overflow = 'hidden';
}

function preload() {
	loadDex("dex7.csv");
	ballImg = loadImage("Pokeball.PNG");
	//teamText = readTextFile();
}

function setup() {
	unloadScrollBars();
	createCanvas(windowWidth, windowHeight);
	frameRate(1);
	
	//Create pokemon array
	for (let i = 0; i < 6; i++){
		pokemon.push(new Pokemon(53, true));
	}
	
	// Sort alphabetically
	dex.sort((a, b) => {
		if (a.Name > b.Name) {
			return 1;
		} else if (a.Name < b.Name) {
			return -1;
		}
	});
}

function draw() {
	//Update the Team Text File
	readTextFile();
}

function teamChanged(team) {
	if (JSON.stringify(teamText) !== JSON.stringify(oldTeamText)){
		updateTeam(teamText);
		drawTeam(pokemon, windowWidth, windowHeight);
		oldTeamText = teamText;
	}
}

//Updates the pokemon Array to Match the Txt File
function updateTeam(team) {
	for (let i = 0; i < 6; i++) {
		if (team[i]) {
			pokemon[i].update(team[i]);
		} else {
			pokemon[i].remove();
		}
	}
}

//Loads and Displays Images
function drawPokemon(x, y, size, poke){
	//if (poke.exists) {
		image(ballImg, x, y, size, size);
		loadImage(poke.image, img => image(img, x, y, size, size));
	//}

}

//Handles All Visuals
function drawTeam(team, w, h) {
	//Calculate Spacing and Size of Images
	let size = w / 3.5;
	let pad = 20;
	let x = pad / 2;
	let y = pad / 2;
	
	clear();
	
	//Load and Draw Required Pokemon
	for (let i = 0; i < team.length; i++) {
		if (pokemon[i].exists) {
			drawPokemon(x, y, size, pokemon[i]);

			if (y == pad / 2){
				y += size + pad;
			} else {
				y = pad / 2;
				x += size + pad;
			}
		}
	}
}

//Loads the Pokedex
function loadDex(url) {
	d3.csv(url, function (error, data) {
		dex = data;
	});
}

//Loads the Txt File
function readTextFile() {
	teamText = loadStrings('team.txt', teamChanged);
}


