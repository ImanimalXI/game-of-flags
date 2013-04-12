window.FooterView = Backbone.View.extend({

    id: "footer",
    initialize: function() {
        var footer_labels = {
            footer_home: "Home",
            footer_rate: "Rate",
            footer_lockLogo: "Lock Logo",
            footer_lockCategory: "Lock Category",
            footer_logos: "Logos",
            footer_rankings: "Rankings",
            footer_filter: "Filter",
            footer_settings: "Settings",
            footer_profile: "Profile",
            footer_list: "List",
            footer_grid: "Grid",
            footer_random: "Random",
            footer_about: "About" };
        this.template = _.template( tpl.get('footerTpl'), footer_labels );
    },

    render: function() {
        this.$el.html( this.template );
        return this.el;
    },

    events: {
        "touchstart #footer div" : "nav"
    },

    hide: function(){
        $('#footer div').css('opacity','.3') ;
    },

    updateNav: function(elements) {
      this.hide();
      if(elements) {
        for (var i = 0; i < elements.length; i++) {
            $(elements[i]).css('opacity','1');
        }
      }
    },

    nav: function(id) {

        switch(id.target.id) {
            case 'footer_home':
                App.navigate('home', true);
                break;
            case 'footer_settings':
                App.navigate('settings', true);
                break;
            case 'footer_rankings':
                App.navigate('rankings', true);
                break;
            case 'footer_logos':
                App.navigate('logos', true);
                break;
            case 'footer_rate':
                App.navigate('rate', true);
                break;
            case 'footer_profile':
                App.navigate('profile', true);
                break;
            default:

        }

        return false;
    }

});
