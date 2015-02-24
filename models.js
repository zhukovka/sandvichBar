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
    Object.keys(this).forEach(dataKeys,this);

    //(el)is the key property (current element) being processed in the array.
    function dataKeys(elem){
        if(Array.isArray(this[elem])){
            this[elem].forEach(elementPrice(elem));
        }else{
            price += data[elem][this[elem]];
        }
    }

    function elementPrice(elem) {
        return function (innerElem) {
            price += data[elem][innerElem];
        }
    }

    return price;
}


function normalizeData(obj,data){

    if(typeof obj === "string"){
        return obj.split(/[, | ]+/).filter(isPropertyPresent);
    } else{
    }

    function isPropertyPresent(currentElement) {
        var res =  false;

        (function innerClosure(d){
            Object.keys(d).forEach(function(propName){
                if(typeof d[propName] == "object"){
                    innerClosure(d[propName]);
                }
                else if(propName === currentElement) {
                    res = true;
                }
            })
        })(data);
        return res;
    }
}

var s1 = new Sandwich({bread: 'dark', meat:'salmon', fillings: ['onion', 'tomato','cheese','lettuce']});

//console.log(s1.getPrice());

//function Sandwich (obj) {
//    for(var key in obj){
//        this[key] = obj[key];
//    }
//}
//
//
//Sandwich.prototype.getPrice = function () {
//    var obj = this;
//    var price = 0;
//    function getFillings(previous,current){
//        console.log(obj[previous]);
//        price += Array.isArray(obj[previous]) ? 1 : data[previous][obj[previous]];
//        return price;
//    }
//
//    return Object.keys(data).reduce(getFillings);
//}
//
//
//var s1 = new Sandwich({bread: 'white', meat:'ham'})// fillings: ['onion', 'tomato']});
//
//console.log(s1.getPrice());