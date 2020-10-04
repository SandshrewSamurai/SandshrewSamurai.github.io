let team = [];

function load() {
}

function preload() {
    ballImg = loadImage("Pokeball.PNG");
}

function setup() {
    //frameRate(1);
	createCanvas(750, 450);
}

function draw() {
    background(255, 0, 255);
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
    drawTeam(750, 450);
}

//Handles All Visuals
function drawTeam(w, h) {
	//Calculate Spacing and Size of Images
	let size = w / 4;
	let pad = 20;
	let x = pad / 2;
	let y = pad / 2;
	
	clear();
	background(255, 0, 255);
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