let teamData = [];

function preload() {
    ballImg = loadImage("Pokeball.PNG");
    if (localStorage.getItem("teamData")) {
        teamData = JSON.parse(localStorage.getItem('teamData'));
    }
}

function setup() {
	let canvas = createCanvas(windowWidth, windowHeight);
    drawTeam(windowWidth * 0.9, windowHeight * 0.9);
}

function draw() {
    noLoop();
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
		if (teamData[((i + 1) * 2) - 2] !== "") {
			drawPokemon(x, y, size, teamData[((i + 1) * 2) - 2], teamData[((i + 1) * 2) - 1]);

			if (y == pad / 2){
				y += size + pad;
			} else {
				y = pad / 2;
				x += size + pad;
			}
		}
    }
    
    //Listen for team change
    window.onstorage = () => {
        teamData = JSON.parse(localStorage.getItem('teamData'));
        drawTeam(windowWidth * 0.9, windowHeight * 0.9);
    };
}
    
    //Loads and Displays Images
function drawPokemon(x, y, size, ID, isShiny){
	image(ballImg, x, y, size, size);
	loadImage(getImage(ID, isShiny), img => image(img, x, y, size, size));
}

function getImage(ID, isShiny) {
    if (isShiny) {
        return ("sprites/shiny/" + (ID) + ".png");
    } else {
		return ("Sprites/" + (ID) + ".png");        
    }

}