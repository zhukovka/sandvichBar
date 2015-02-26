var ViewProto = {
    init:function(obj){
      for(var key in obj){
		    this[key] = obj[key];
	    }

      if(this.el && document){
        this.el = document.getElementById(this.el);
      }
    },
    // template: Mustache.render(stirng, this.model),
    render: function (html) {
      this.el.innerHTML = Mustache.render(html, this.model);
    }
}

var dataView = Object.create(ViewProto);
var model = { letters: ['a','b','c']};
dataView.init({
	el:'order',
	model: model,
});

dataView.render(document.querySelector('#content').innerHTML);




// function templator(string, obj){    
//     function assignName(match){
//          match = match.slice(1,-1);
//          if(match.indexOf('.') == -1 && typeof obj[match] != 'object'){               
//               return obj[Object.keys(obj).filter(function(property){ return     obj[property].hasOwnProperty(match)})][match]
//         } else { 
//          return (obj[match.split('.')[0]][match.split('.')[1]]);   
//         }
//     }   
//     return string.replace(/{.+?}/g, assignName)
// }