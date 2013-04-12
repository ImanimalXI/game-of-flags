window.HomeView = Backbone.View.extend({

    className: "page cv visible",
    id : "home",

    initialize: function() {
        this.template = _.template( tpl.get('homeTpl') );
        //Show the scrolling flag background
        $('.background').show();
    },

    render: function() {
        this.$el.html( this.template(), LANG );
        return this.el;
    },

    events: {
        "touchstart a" : "nav"
    },

    nav: function(id) {

        switch(id.target.id) {
            case 'home_newGame':
                App.level();
                break;
            case 'home_countrys':
                App.listCountrys();
                break;
            case 'home_settings':
                App.lang();
                break;
            case 'home_about':
                App.about();
                break;
            default:

        }
        return false;
    }
});