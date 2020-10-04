let team = [];

function load() {
}

function preload() {
    ballImg = loadImage("Pokeball.PNG");
}

function setup() {
    //frameRate(1);
	createCanvas(1600, 900);
}

function draw() {
    noLoop();
}

function updateTeam(){
    team = [];
    for (let i = 0; i < 6; i++) {
        let pkmn = document.getElementById("pokemon-dropdown-" + i);
        let ID = pkmn.options[pkmn.selectedIndex].value;
        if (ID == "Choose Pokémon"){
            team.push("");
        } else {
            team.push(ID);
        }
    }
    drawTeam(1600, 900);
}

//Handles All Visuals
function drawTeam(w, h) {
	//Calculate Spacing and Size of Images
	let size = w / 7;
	let pad = 20;
	let x = pad / 2;
	let y = pad / 2;
	
	clear();
	
	//Load and Draw Required Pokemon
	for (let i = 0; i < 6; i++) {
		if (team[i] !== "") {
			drawPokemon(x, y, size, team[i]);

			if (y == pad / 2){
				y += size + pad;
			} else {
				y = pad / 2;
				x += size + pad;
			}
		}
	}
    
    //Loads and Displays Images
    function drawPokemon(x, y, size, ID){
	//if (poke.exists) {
		image(ballImg, x, y, size, size);
		loadImage(getImage(ID), img => image(img, x, y, size, size));
	//}

    }
}

function getImage(ID) {
		return ("global-link/" + (ID) + ".png");
}