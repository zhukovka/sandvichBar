/**
 * Created by rteresch on 27.02.2015.
 */

$(function() {
    var ViewProto = {
        init: function (obj) {
            for (var key in obj) {
                this[key] = obj[key];
            }

            if (this.el && document) {
                this.el = document.getElementById(this.el);
            }
        },
        render: function () {
            var templating = Handlebars.compile($(this.template).html());
            var elt = document.createElement('div');
            // elt.id = this.id;
            elt.innerHTML = templating(this.model);
            this.el.appendChild(elt);
            return elt;
        }
    }




    var dataView = Object.create(ViewProto);

    var model = data;

    dataView.init({
        el:'order',
        model: model,
        template: '#template'
    });

    dataView.render();



    var form = document.getElementById('sandwichForm');
    var allOrderedSandwiches = [];

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var selected = this.querySelectorAll('input[type="checkbox"]:checked');
        var sandwich = {};
        Array.prototype.forEach.call(selected, function (input) {
            sandwich[input.name] = input.value;
        });
        var orderedSandwich = new Sandwich(sandwich);
        allOrderedSandwiches.push(orderedSandwich);
        var sandichView = Object.create(ViewProto);

        sandichView.init({
            el: 'sandwich',
            model: orderedSandwich,
            template: '#sandwichTemplate'
        });

        sandichView.render().addEventListener('click', function () {
            this.classList.add('selected');
        });
        $('.myCheckbox').prop('checked', false);
    });


    form.addEventListener('submit', addDelete);

    function addDelete(e) {
        e.preventDefault();
        var deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = 'Delete selected';
        deleteBtn.addEventListener('click', function(){
            var myNodeList = document.querySelectorAll(".selected");
            for (var i = 0; i < myNodeList.length; ++i) {
                var item = myNodeList[i];
                item.parentNode.removeChild(item);
            }
        })
        document.getElementById('sandwichBar').appendChild(deleteBtn);
        form.removeEventListener('submit', addDelete);
    }


    $('.Send_sandwich_form').on('click', function(e){
        e.preventDefault();
        var ajax = new XMLHttpRequest();
        var data = {"address" : "Kiev,Krasnozovadaska street 2/13", "time" : new Date(), "data" : allOrderedSandwiches};
        ajax.open('POST', 'http://127.0.0.1:3000/test', true);
        ajax.setRequestHeader('Content-type', 'application/json');
        ajax.send(JSON.stringify(data));
        ajax.onreadystatechange = function() {
            if (ajax.readyState === 4) {
                $("body").append(ajax.response);
            }
        }
    });

});


