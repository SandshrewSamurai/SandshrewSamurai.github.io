class Pokemon {
	constructor(id, boolIn) {
		this.id = floor(id);
		this.exists = boolIn;
	}
	
	get name() {
		return dex[this.id].Name;
	}
	
	get nat() {
		let minIndex = 0;
		let maxIndex = dex.length;
		let currentIndex;
		let currentElement;
		
		while (minIndex <= maxIndex) {
			currentIndex = (minIndex + maxIndex) / 2 | 0;
			currentElement = dex[currentIndex].Name;
			
			if (currentElement < this.name) {
            	minIndex = currentIndex + 1;
			}
			else if (currentElement > this.name) {
				maxIndex = currentIndex - 1;
			}
			else {
				return dex[currentIndex].Nat;
			}
		}
 	
		return -1;
	}
	
	get image() {
		return ("global-link/" + (this.nat) + ".png");
		//return dex[this.id].Image;
	}
	
	remove() {
		this.exists = false;
	}
	
	search(searchElement) {
		let minIndex = 0;
		let maxIndex = dex.length - 1;
		let currentIndex;
		let currentElement;
		
		while (minIndex <= maxIndex) {
			currentIndex = (minIndex + maxIndex) / 2 | 0;
			currentElement = dex[currentIndex].Name;
			
			if (currentElement < searchElement) {
            	minIndex = currentIndex + 1;
			}
			else if (currentElement > searchElement) {
				maxIndex = currentIndex - 1;
			}
			else {
				return currentIndex;
			}
		}
 	
		return -1;
	}
	
	searchNat(searchElement) {
		let minIndex = 0;
		let maxIndex = dex.length;
		let currentIndex;
		let currentElement;
		
		while (minIndex <= maxIndex) {
			currentIndex = (minIndex + maxIndex) / 2 | 0;
			currentElement = dex[currentIndex].Name;
			
			if (currentElement < searchElement) {
            	minIndex = currentIndex + 1;
			}
			else if (currentElement > searchElement) {
				maxIndex = currentIndex - 1;
			}
			else {
				return dex[currentIndex].Nat - 1;
			}
		}
 	
		return -1;
	}
	
	update(name) {
		if (name) {
			this.id = this.search(name.trim());
			this.exists = true;
		} else {
			this.exists = false;
		}
	}
	
}

