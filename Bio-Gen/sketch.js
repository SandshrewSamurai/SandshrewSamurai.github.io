let bg;
let pkmnID = 39;
let pkmnImage;
let typeImageOne;
let typeImageTwo;
let pokemonData;
let baseStats = [];
let baseColours;
let statNames = ["HP", "Attack", "Defense", "Sp.Attack", "Sp.Defense", "Speed"];
let abilOne;
let abilOneData;
let abilTwo;
let abilTwoData;
let name;
let pokemonSpeciesData;
let evoChainData;
let stages = 0;
let bottomEvo = false;

function load() {
    bg = loadImage("JohtoMapBG.png");
    pkmnImage = loadImage(pokemonData.sprites.other.dream_world.front_default);
    
    name = pokemonData.species.name;
    
    getEvoChain(pokemonSpeciesData.evolution_chain.url);
    
    //Load type Images
    let typeOne;
    
    if (pokemonData.past_types.length > 0 && pokemonData.past_types[0].generation.name != 'generation-i') {
        typeOne = pokemonData.past_types[0].types[0].type.name.toUpperCase();
    } else {
        typeOne = pokemonData.types[0].type.name.toUpperCase();
    }
    typeImageOne = loadImage(`Types/${typeOne}.png`);
    
    try {
        let typeTwo;
        if (pokemonData.past_types.length > 0 && pokemonData.past_types[0].generation.name != 'generation-i') {
            typeTwo = pokemonData.past_types[0].types[1].type.name.toUpperCase();
        } else {
            typeTwo = pokemonData.types[1].type.name.toUpperCase();
        }
        typeImageTwo = loadImage(`Types/${typeTwo}.png`);
    } catch {
        typeImageTwo = false;
    }
    
    //Get abilities      
    abilOne = pokemonData.abilities[0].ability.name;
    getAbilityOne(pokemonData.abilities[0].ability.url);
    
    try {
        if (pokemonData.abilities[1].is_hidden){
            abilTwo = false;
        } else {
            abilTwo = pokemonData.abilities[1].ability.name;
            getAbilityTwo(pokemonData.abilities[1].ability.url);
        }
    } catch {
        abilTwo = false;
    }
    
    //Get base stats
    for (let i = 0; i < 6; i++){
        baseStats.push(pokemonData.stats[i].base_stat);
    }
    
}

function preload() {
    pkmnID = floor(random(1,649));
    getPokemon(pkmnID, getPokemonSpecies);
}

function setup() {
    frameRate(1);
	createCanvas(1920, 1080);
    baseColours = [color(193,48,40), color(239,128,48), color(248,165,0), color(104,143,239), color(121,200,80), color(209,74,115)];
}

function draw() {
    try {
        background(bg);
        visuals();
        noLoop();
    }
    catch {
        bottomEvo = false;
        stages = 0;
    }
}

function visuals() {
    noStroke();
    
    //Left pokemon data
    push();
        translate(30, 30);
        //Grey rectangle
        fill(51, 51, 51, 180);
        rect(0, 0, 780, 1010, 12, 12, 12, 12);
    
        //Evolution Chain
        push();
            textSize(42);
            textAlign(LEFT, CENTER);
            drawEvoChain(evoChainData.chain);    
        pop();
    
    pop();
    
    //Abilities
    push();
        translate(850, 30);
        fill(255);
        rect(0, 0, 600, 100, 12, 12, 12, 12);
    
        textSize(42);
        textAlign(CENTER, CENTER);
        fill(0);
        text("Abilities", 0, 0, 600, 100);
    
        translate(0, 150);
        fill(51, 51, 51, 180);
        rect(0, 0, 600, 200, 12, 12, 12, 12);
        fill(255);
        rect(0, 0, 600, 75, 12, 12, 0, 0);
        
        fill(0);
        textAlign(LEFT, CENTER);
        text(textFormat(abilOne), 10, 0, 600, 100);
    
        push();
            fill(255);
            textSize(38);
            let flavourText = getFlavourText(abilOneData.flavor_text_entries);
            text(abilOneData.flavor_text_entries[flavourText].flavor_text, 10, 55, 600, 100);
        pop();
            
    
        translate(0, 250);
        fill(51, 51, 51, 180);
        rect(0, 0, 600, 200, 12, 12, 12, 12);
        fill(255);
        rect(0, 0, 600, 75, 12, 12, 0, 0);
        
    
        fill(0);
        textAlign(LEFT, CENTER);
        if (abilTwo){
            text(textFormat(abilTwo), 10, 0, 600, 100);
            
            push();
                textSize(38);
                fill(255);
                flavourText = getFlavourText(abilTwoData.flavor_text_entries);
                text(abilTwoData.flavor_text_entries[flavourText].flavor_text, 10, 55, 600, 100);
            pop();
        }else{
            text("N/A", 10, 0, 600, 100);
            push();
                textSize(38);
                fill(255);
                text("No second ability", 10, 55, 600, 100);
            pop();
        }
    
    
    pop();
    
    //Gameplay top right
    push();
        translate(1480, 30);
        fill(51, 51, 51, 180);
        rect(0, 0, 400, 600, 12, 12, 12, 12);
    pop();
    
    //Base Stats and Other misc info.
    push();
        //Grey rectangle
        translate(850, 660);
        fill(51, 51, 51, 180);
        rect(0, 0, 1030, 380, 12, 12, 12, 12);
        
        //Catch Rate
        push();
            textAlign(CENTER);
            textSize(38);
            fill(255);
            text("Catch Rate", 0, 45, 250, 100);
            text(String(pokemonSpeciesData.capture_rate).concat("/255"), 0, 100, 250, 100);
        
            //Gender
            text("Gender", 0, 180, 250, 100);
            let gender = pokemonSpeciesData.gender_rate;
            if (gender == -1) {
                text("N/A", 0, 230, 250, 100);
            } else {
                gender /= 8;
                let m = (1 - gender) * 100;
                let f = gender * 100;
                fill(150, 150, 255);
                text(m + "% ♂", 0, 230, 250, 100);
                fill(255, 150, 150)
                text(f + "% ♀", 0, 270, 250, 100);
            }
        pop();
    
    
        //Brown Base Stats Section
        translate(230, 0);
        fill(112,88,73)
        rect(5, 5, 790, 370, 12, 12, 12, 12);
    
        for (let i = 0; i < 6; i++){
            fill(baseColours[i]);
            rect(10, 9 + i * 61, baseStats[i] * 3, 55, 8, 8, 8, 8);
            
            push();
                textSize(32);
                textAlign(LEFT, CENTER);
                fill(255);
                text(statNames[i], 18, 10 + i * 61, 780, 61);
                
                textAlign(RIGHT, CENTER);
                text(baseStats[i], 0, 10 + i * 61, 790, 61);
            pop();
            
            //Check if last bar
            if (i==5){break;}
            //Draw lines Under each bar but the last
            push()
                stroke(51, 51, 51, 100);
                strokeWeight(1);
                line(5, 66 + i * 61, 790, 66 + i * 61)
            pop();
        }
    pop();
}

function drawEvoChain(chain){
    countStages(chain, 0);
    let picZone = 980 - stages * 70; 
    
    nameRectangle(chain.species.name, 0, picZone);

    if (chain.evolves_to.length > 0) {      
        for (let i = 0; i < chain.evolves_to.length; i++){           
            nameRectangle(chain.evolves_to[i].species.name, 25, picZone);
            
            if (chain.evolves_to[i].evolves_to.length > 0) {               
                for (let j = 0; j < chain.evolves_to[i].evolves_to.length; j++){            
                    nameRectangle(chain.evolves_to[i].evolves_to[j].species.name, 50, picZone);
                }
            }
        }
    }
    
    //Bottom white rectangle
    if (findLastInChain(chain) == name){
        translate(0, -70);
        fill(255);
        rect(0, 0, 780, 100, 0, 0, 12, 12);
    }
}

function nameRectangle(ident, xOff, spacing){
    let spacingBool = ident === name;
    ident = textFormat(ident);
    let a;
    let b;
    
    //Round only top corners if it's the bio pokemon
    if (spacingBool){
        a = 12;
        b = 0;
        bottomEvo = true;
    } else if (bottomEvo) {
        a = 0;
        b = 12;
    } else {
        a = 12;
        b = 12;
    }
    
    
    fill(250);
    rect(0, 0, 780, 100, a, a, b, b);
    fill(0);
    text(textFormat(ident), 50 + xOff, 0, 600, 100);
    
    if (spacingBool){
        push();
            //Dex Number
            push();
                textSize(42);
                textAlign(LEFT, CENTER);
                fill(255);
                text("#" + pkmnID, 25, 100, 600, 100);
            pop();
        
            //Pokémon Image
            let multiplier = spacing / (pkmnImage.height * 2);
            
            imageMode(CENTER);
            image(pkmnImage, 380, spacing / 2 + 70, pkmnImage.width * multiplier, pkmnImage.height * multiplier);
        
        
            //Type Images
            if (typeImageTwo){
                image(typeImageOne, 650, spacing - 170, 200, 100);
                image(typeImageTwo, 650, spacing - 60, 200, 100);
            } else {
                image(typeImageOne, 650, spacing - 60, 200, 100);
            }

        pop();
    }
    
    translate(0, 70 + spacing * spacingBool)
}

function countStages(chain){
    stages++
    return chain.evolves_to.forEach(countStages);
}

function findLastInChain(chain){
    if (typeof(chain) == 'string'){
        return chain;
    } else {
        if (chain.evolves_to.length == 0){
            return chain.species.name;
        } else {
            return findLastInChain(chain.evolves_to[chain.evolves_to.length - 1]);
        }
    }
}

function getPokemon(id, callback) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(function (response) {
        response.json()
        .then(function (pokemon) {
            pokemonData = pokemon;
            callback(id, load);
        })
    })
    
}

function getPokemonSpecies(id, callback) {
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
    .then(function (response) {
        response.json()
        .then(function (data) {
            pokemonSpeciesData = data;
            callback();
        })
    })
    
}

function getEvoChain(url) {
    fetch(url)
    .then(function (response) {
        response.json()
        .then(function (data) {
            evoChainData = data;
        })
    })
    
}

function getAbilityOne(ability) {
    fetch(ability)
    .then(function (response) {
        response.json()
        .then(function (data) {
            abilOneData = data;
        })
    })
    
}

function getAbilityTwo(ability) {
    fetch(ability)
    .then(function (response) {
        response.json()
        .then(function (data) {
            abilTwoData = data;
        })
    })
    
}

function getFlavourText(arr) {
    for (i in arr) {
        if (arr[i].language.name === "en") {
            return i;
        }
    }
}


function textFormat(text) {
    switch(text) {
        case "power-of-alchemy":
            return "Power of Alchemy";
            break;
        case "rks-system":
            return "RKS System";
            break;
        case "soul-heart":
            return "Soul-Heart";
            break;
        case "nidoran-m":
            return "Nidoran ♂";
            break;
        case "nidoran-f":
            return "Nidoran ♀";
            break;
        case "mr-mime":
            return "Mr. Mime";
            break;
        case "mr-rime":
            return "Mr. Rime";
            break;
        default:
            text = text.toLowerCase()
                .split('-')
                .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                .join(' ');
            return text;
    }     
}