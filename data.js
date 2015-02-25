var data = {
	bread: {
		white: 10,
		dark: 15,
		ciabatta: 30
	},
	meat: {
		ham: 40,
		chicken: 30,
		turkey: 35,
		salmon: 50
	},
	fillings:{
		onion: 5,
		gherkins: 5,
		tomato: 8,
		cheese: 7,
		lettuce: 6
	},
	sause:{
		cetchup: 5,
		mayonnaise: 5,
		mustard: 5,
		thousandIslands: 15
	}
}

var str = {topRef:['chicken', 'white', 'ololo',
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

console.log(normalizeData(str,data))
