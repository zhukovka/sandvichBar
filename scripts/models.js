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



var s1 = new Sandwich({bread: 'dark', meat:'salmon', fillings: ['onion', 'tomato','cheese','lettuce']});


var arr = {topRef:['chicken', 'white', 'ololo',
    {fillings: ['onion,asdasda,1,cetchup', 'gherkins', 'lettuce', 100]},
    ['thousandIslands'],{a:1,b:"lettuce"},,,3.14,'white']}



function normalizeData(obj,data){
    if(typeof obj === 'undefined' || obj === null || Object.keys(obj) == 0)
        return [];

    return (isObject(obj)) ? processObj(obj) : processString(obj)


    function isPropertyPresent(currentElement) {
        var res = false;
        +function innerClosure(d){
            Object.keys(d).forEach(function(property){
                if(typeof d[property] == "object"){
                    innerClosure(d[property]);
                } else if(property === currentElement) {
                    res = true;
                }
            })}(data);
        return res;
    }

    function processObj(obj){
        var res = [];
        +function innerClosure(obj){
            Object.keys(obj).forEach(function(property){
                if (obj.hasOwnProperty(property)) {
                    if (isObject(obj[property])) {
                        innerClosure(obj[property]);
                    } else if(typeof obj[property] === 'string') {
                        res = res.concat(processString(obj[property]));
                    }
                }
            })}(obj);
        return res;
    }



    function processString(str){
        return str.split(/[, | ]+/).filter(isPropertyPresent);
    }


    function isObject(el) {
        return (el !== null && typeof el === 'object')
    }

}

console.log(normalizeData(arr,data))