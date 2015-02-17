function Sandwich (obj) {
	for(var key in obj){
		this[key] = obj[key];
	}
}

Sandwich.prototype.getPrice = function () {
	var price = 0;

	Object.keys(this).forEach(dataKeys.bind(this));

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

var s1 = new Sandwich({bread: 'white',
meat:'ham', fillings: ['onion', 'tomato']});
