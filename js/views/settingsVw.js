window.SettingsView = Backbone.View.extend({

    className: "page cv visible",
    id : "settings",

    initialize: function() {
        this.template = _.template( tpl.get('settingsTpl') );
    },

    render: function() {
        this.$el.html( this.template() );
        return this.el;
    },

    events: {
        "touchstart button" : "set"
    },

    set:function(id) {
        lang = $(id.target).data('lang');
        App.game.get('settings').set({lang: parseInt(lang)});
        Util.loadLang(lang);
        /*$.getScript("lang/" + lang + ".js", function(data, textStatus, jqxhr) {
            console.log(data); //data returned
            console.log(jqxhr.status); //200
            console.log('Lang switch ok.');
        });*/
        localStorage.setItem('lang', lang);
        App.home();

    }


});