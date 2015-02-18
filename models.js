function Sandwich (obj) {
	for(var key in obj){
		this[key] = obj[key];
	}
}


Sandwich.prototype.getPrice = function () {
	var price = 0;

    // Object.keys() method returns an array of a given object's own enumerable properties
    // forEach() method executes a provided function (callback) once per array element.
    // bind() method creates a new function that, when called, has its this keyword set to the provided value
	Object.keys(this).forEach(dataKeys.bind(this));


    //(el) is the currentValue (current element) being processed in the array.
	function dataKeys(el){
			if(Array.isArray(this[el])){
				this[el].forEach(elementPrice(el));
			}else{
				price += data[el][this[el]];
			}
	}

	function elementPrice (el) {
		return function (elt) {
			price += data[el][elt];
		}
	}

	return price;
}



var s1 = new Sandwich({bread: 'white', meat:'ham', fillings: ['onion', 'tomato']});

console.log(s1.getPrice());
