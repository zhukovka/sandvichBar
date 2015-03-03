function Sandwich (obj) {
	for(var key in obj){
		this[key] = obj[key];
	}
}

Sandwich.prototype.getPrice = function () {
	var price = 0;

	Object.keys(this).forEach(elementPrice(), this);

	function elementPrice(elt) {
		return function dataKeys(el){
			if(Array.isArray(this[el])){
				this[el].forEach(elementPrice(el));
			}else{
				var field = elt || el;
				var value = this[el] || el;
				price += data[field][value];
			}
		}
	}

	return price;
}

var s1 = new Sandwich({bread: 'white',
meat:'ham', fillings: ['onion', 'tomato']});

function ChickenSandwich () {
	var recipe = {bread: 'white',
meat:'chicken', fillings: ['onion', 'tomato']};
	Sandwich.call(this, recipe);
	Object.defineProperties(this, {
			  'bread': {
			    value: this.bread,
			    writable: false,
			    enumerable: true
			  },
			  'meat': {
			    value: this.meat,
			    writable: false,
			    enumerable: true
			  }
			});
}

ChickenSandwich.prototype = Object.create(Sandwich.prototype);

var cs = new ChickenSandwich();