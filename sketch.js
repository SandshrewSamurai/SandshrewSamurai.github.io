let teamData = [];
let layout;

function preload() {
    ballImg = loadImage("Pokeball.PNG");
    if (localStorage.getItem("teamData")) {
        teamData = JSON.parse(localStorage.getItem('teamData'));
    }
    if (localStorage.getItem("layout")) {
        layout = localStorage.getItem('layout');
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
	let size;
    switch (layout){
        case "h1":
            size = w / 6.5;
            break;
        case "h2":
            size = w / 3.5;
            break;
        case "v1":
            size = h / 6.5;
            break;
        case "v2":
            size = h / 3.5;
            break;
    }
	let pad = 20;
	let x = pad / 2;
	let y = pad / 2;
	
	clear();
	//Load and Draw Required Pokemon
	for (let i = 0; i < 6; i++) {
		if (teamData[((i + 1) * 2) - 2] !== "") {
			drawPokemon(x, y, size, teamData[((i + 1) * 2) - 2], teamData[((i + 1) * 2) - 1]);
            
            switch (layout){
                case "h1":
                    x += size + pad;
                    break;
                case "h2":
                    if (y == pad / 2){
                        y += size + pad;
                    }else {
                        y = pad / 2;
                        x += size + pad;
                    }
                    break;
                case "v1":
                    y += size + pad;
                    break;
                case "v2":
                    if (x == pad / 2){
                        x += size + pad;
                    }else {
                        x = pad / 2;
                        y += size + pad;
                    }
                    break;
            }
        }
    }
    
    //Listen for team change
    window.onstorage = () => {
        teamData = JSON.parse(localStorage.getItem('teamData'));
        layout = localStorage.getItem('layout');
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