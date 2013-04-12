window.SplashView = Backbone.View.extend({

    className: "page visible",
    id : "splash",

    initialize: function() {
        this.template = _.template( tpl.get('splashTpl') );
        this.close();
    },

    render: function() {
        this.$el.html( this.template() );
        return this.el;
    },



    close: function() {
        setTimeout(function() {
            /*app.navigate('home', true);*/
        }, 3000);

        return false;
    }
});