let team = [];
let shiny = [];
let dropdownData = [];

function load() {
}

function preload() {
    ballImg = loadImage("Pokeball.PNG");
}

function setup() {
	let canvas = createCanvas(750, 450);
    canvas.parent('sketch-holder');
}

function draw() {
    noLoop();
}

function updateTeam(){
    team = [];
    shiny = [];
    for (let i = 0; i < 6; i++) {
        let pkmn = document.getElementById("pokemon-dropdown-" + i);
        dropdownData[i] = pkmn.options[pkmn.selectedIndex].value;
        let ID = pkmn.options[pkmn.selectedIndex].value;
        if (ID == "Choose Pokémon"){
            team.push("");
        } else {
            team.push(ID);
        }
        if (document.getElementById("shiny-" + i).checked){
            shiny.push(true);
        } else {
            shiny.push(false);
        }
    }
    drawTeam(750, 450);
}

function saveTeam(){
    localStorage.setItem('dropdownData', JSON.stringify(dropdownData));
}

function loadTeam(){
    if (localStorage.getItem("dropdownData")) {
        dropdownData = JSON.parse(localStorage.getItem('dropdownData'));
        for (let i = 0; i < 6; i++) {
            let element = document.getElementById("pokemon-dropdown-" + i);
            element.value = dropdownData[i];
        }
        updateTeam();
    }
}

//Handles All Visuals
function drawTeam(w, h) {
	//Calculate Spacing and Size of Images
	let size = w / 4;
	let pad = 20;
	let x = pad / 2;
	let y = pad / 2;
	
	clear();
	//Load and Draw Required Pokemon
	for (let i = 0; i < 6; i++) {
		if (team[i] !== "") {
			drawPokemon(x, y, size, team[i], shiny[i]);

			if (y == pad / 2){
				y += size + pad;
			} else {
				y = pad / 2;
				x += size + pad;
			}
		}
	}
    
    //Loads and Displays Images
    function drawPokemon(x, y, size, ID, isShiny){
	//if (poke.exists) {
		image(ballImg, x, y, size, size);
		loadImage(getImage(ID, isShiny), img => image(img, x, y, size, size));
	//}

    }
}

function getImage(ID, isShiny) {
    if (isShiny) {
        return ("sprites/shiny/" + (ID) + ".png");
    } else {
		return ("Sprites/" + (ID) + ".png");        
    }

}