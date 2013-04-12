window.NewGameView = Backbone.View.extend({

    className: "new page",

    initialize: function() {
        this.template = _.template( tpl.get('newGameTpl') );
        this.adjustBackground();
    },

    render: function() {
        this.$el.html( this.template );
        this.renderContinentSelect();
        return this.el;
    },


    events: {
        "touchstart .nav button" : "start",
        "touchstart #continents_all" : "setContinent",
        "touchstart .continents button" : "setContinent"
    },

    adjustBackground: function() {
        var position = Math.floor(Math.random()*38700); ;
        $('.background .wrapper').css({marginTop:'-'+ position +'px'});
        $('.background').removeClass('end').show();
    },

    renderContinentSelect: function () {
        var filter = this.$el.find(".alternatives");
            div = $("<div class='continents selected'/>");

        filter.append("<button id='continents_all' class='button b4 c1'>"+LANG.all+"</button>");
        _.each(App.game.get('countries').listContinents(), function (alt) {
            var button = $("<button/>", {
                value: alt,
                class: 'button transparent c1',
                text: App.game.get('countries').getContinentByLang(alt)
            }).appendTo(div);
        });
        filter.append(div);
    },

    setContinent: function(id) {
        if(id.target.id==='continents_all') {
            $(id.target).removeClass('c3').addClass('b4 c1');
            $('.continents button').removeClass('b3').addClass('transparent');
            $('.continents').addClass('selected');
            this.adjustBackground();
        } else {
            $('.continents').removeClass('selected');
            $('.continents button').removeClass('transparent c4').addClass('b3 c1');
            $(id.target).removeClass('b4 c1').addClass('c4');
            $('.background').hide();
        }
    },

    start: function() {
        App.game.newGame({
            continent:$('.new button.c4').attr('value')
        });
        App.question();
    }

});

