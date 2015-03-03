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
        // template: Mustache.render(stirng, this.model),
        render: function (template,data) {
            this.el.innerHTML = template(data);
        }
    }





    var dataView = Object.create(ViewProto);

    var model = data;

    dataView.init({
        el:'order',
        model: model
    });

    var template = Handlebars.compile($('#template').html());
    dataView.render(template, model);

    var form = document.getElementById('sandwichForm');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var selected = this.querySelectorAll('input[type="checkbox"]:checked');
        // console.log(selected);
        var sandwich = {};
        Array.prototype.forEach.call(selected, function (input) {
            sandwich[input.name] = input.value;
        });
        var orderedSandwich = new Sandwich(sandwich);
        console.log(orderedSandwich);
        var sandichView = Object.create(ViewProto);
        sandichView.init({
            el: 'sandwich',
            model: orderedSandwich
        });

        var template = Handlebars.compile($('#sandwichTemplate').html());
        sandichView.render(template, sandichView.model);
    });
});


