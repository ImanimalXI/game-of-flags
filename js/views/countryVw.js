window.CountryView = Backbone.View.extend({

    className: "cv country",

    initialize: function() {
        this.template = _.template(tpl.get('countryTpl'));
        this.model.bind('change', this.render);
    },

    render: function(eventName) {
        //merge the model json with labels
        /*$.extend(header_labels, this.model.toJSON() );*/

        this.$el.html(this.template(this.model.toJSON()));
        return this.el;
    },

    events: {
         "touchstart .country button" : "next"
    },

    next: function() {
        if(App.game.nextQuestion()){
            this.model = App.game.questions[App.game.currentQuestion];
            App.headerView.render();
            this.render();
        } else {
            console.log('Over')
        }

    }

});

window.CountrysView = Backbone.View.extend({

    className: "cv countrys page",

    initialize: function(collection) {
        this.collection = collection.collection;
        this.template = _.template(tpl.get('countrysTpl'));
    },

    render: function(eventName) {
        $(this.el).html(this.template({}));
        this.renderAll();
        return this.el;
    },

    renderAll: function() {
        this.collection.each(this.renderOne, this)
    },

    renderOne: function(model) {
        var country = new CountryView({model: model});
        country.render();
        this.$el.append(country.el);
    },

    events: {
        "touchstart button" : "back"
    },

    back: function() {
        App.newGame();

    }

});

