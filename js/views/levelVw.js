window.LevelView = Backbone.View.extend({

    className: "page visible bg1",
    id : "level",

    initialize: function() {
        this.template = _.template( tpl.get('levelTpl') );
        $('.background').hide();
    },

    render: function() {
        this.$el.html( this.template(),LANG );
        return this.el;
    },

    events: {
        "touchstart .level" : "level",
        "touchstart .nav button" : "nav"
    },

    level:function(id) {
        var nav =  $(id.target);
        App.game.set({level: parseInt($(id.target).data('level'))});
        this.$el.find('button').addClass('button transparent');
        this.$el.find('.guide').hide();
        switch($(id.target).data('level')) {
            case 1:
                $('.level1').show(100);
                nav.removeClass('transparent').addClass('b4 c1');
                break
            case 2:
                $('.level2-1, .level2-2,').show(100);
                nav.removeClass('transparent').addClass('b3 c1');
                break
            case 3:
                $('.level3-1,.level3-2, .level3').show(100);
                nav.removeClass('transparent').addClass('b5 c1');
                break
        }
        App.game.set({totalQuestions: 12});
        this.$el.find('.nav .arrow').addClass('right');
        this.$el.find('.submit').removeClass('transparent c3').addClass('b3 c1').show();

        //Pilen animeras inte längre
        /*setTimeout(function() {
            //TODO Stoppa intervallet när vyn stängs
            setInterval(function() {
                $('.nav .arrow.right').addClass('point');
            }, 10000);

            setInterval(function() {
                $('.nav .arrow.right').removeClass('point');
            }, 12000);
        }, 2000);*/
    },

    nav: function() {
        /*App.game.set({level: parseInt($(id.target).data('level'))});*/
        App.newGame();
    }
});