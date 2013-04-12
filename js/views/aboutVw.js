window.AboutView = Backbone.View.extend({

    className: "page cv visible",
    id : "about",

    initialize: function() {
        this.template = _.template( tpl.get('aboutTpl') );
    },

    render: function() {
        this.$el.html( this.template(), LANG );
        return this.el;
    },

    events: {
        "touchstart button" : "nav"
    },

    nav: function(id) {
        App.home();
    }

});