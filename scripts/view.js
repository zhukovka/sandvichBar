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

});


