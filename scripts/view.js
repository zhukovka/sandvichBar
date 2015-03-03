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
            this.el.innerHTML = templating(this.model);
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

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var selected = this.querySelectorAll('input[type="checkbox"]:checked');
        // console.log(selected);
        var sandwich = {};
        Array.prototype.forEach.call(selected, function (input) {
            sandwich[input.name] = input.value;
        });
        var orderedSandwich = new Sandwich(sandwich);
        var sandichView = Object.create(ViewProto);
        sandichView.init({
            el: 'sandwich',
            model: orderedSandwich,
            template: '#sandwichTemplate'
        });
        sandichView.render();
    });
});


