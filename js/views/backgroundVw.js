window.BackgroundView = Backbone.View.extend({

    className: "cv background page",

    initialize: function(collection) {
        this.collection = collection.collection;
        this.template = _.template(tpl.get('backgroundTpl'));
    },

    render: function() {
        $(this.el).html(this.template({}));
        this.renderAll();
        window.setTimeout(function(){
            $('.background').addClass('end');
        },500);
        return this.el;
    },

    renderAll: function() {
        this.collection.each(this.renderOne, this) ;
    },

    renderOne: function(model) {
        var country = new CountryView({model: model});
        country.render();
        this.$el.find('.wrapper').append(country.el);
    },

    events: {
    }



});

