
var data = $.get( "http://127.0.0.1:3000/test", function( d ) {
      data = d;
    });

console.log(data);
var recipes = {
	chickensandwich : ['chicken', 'white', 'ololo',
				{fillings: ['onion, gherkins, lettuce, 100']}, 
				['thousandIslands']]
};


function parseData(dataFn) {
	return function recur (dataSet) {
		if(!(typeof dataSet === 'string')){
			Object.keys(dataSet).forEach(function (el) {
				return recur(dataSet[el]);
			}, dataSet);
		}else{
			if (dataSet.search(/\s|\W/) != -1) {
				var stringData = dataSet.split(/\s*\W\s*/g);
		    return recur(stringData);
		  } else {
		  	dataFn(dataSet);
		  }
		}
	}
}

function mapToObject (data) {
	var resultObj = {};
	return {
		getValue : function(value) {
			Object.keys(data).forEach(function (el) {
				if(value in this[el]){
					if(!resultObj[el]){
						resultObj[el] = value;
					}else{
						resultObj[el] += ' '+value;
					}
				}
			}, data);
		},
		getObject : function () {
			return resultObj;
		}
	}
}

function dataToObject(rawData, data) {
	var mapping = mapToObject(data);
	parseData(mapping.getValue)(rawData);
	return mapping.getObject();
}

console.log(dataToObject( ['chicken', ["white,white,,  "],'ololo',
    {fillings: ['onion, gherkins, lettuce, 100']}, 
    ['thousandIslands']], data));
