window.ScoreView = Backbone.View.extend({

    className: "page cv score",
    id : "score",
    animStep : 1,

    initialize: function(model) {
        this.model = model.model;
        this.template = _.template( tpl.get('scoreTpl') );
        //TODO S�tt en timeout som laddar homeVw efter en viss tid
    },

    render: function() {
        $(this.el).html(this.template({
            score: this.model.get('score'),
            total: this.model.get('totalQuestions')
        }));

        this.renderWrongAnswers();
        this.renderCorrectAnswers();
        if(App.game.get('level')===2)  {
            this.renderCapitalAnswers();
        }
        if(App.game.get('level')===3)  {
            this.renderPopulationAnswers();
        }
        window.setTimeout(function() {
                $('.score.selected').removeClass('selected');
            },2000
        );

        // Bug scrollen i population vyn scrollar fel, hoppar �ver huvudstad
        if(!window.scoreRotate) {

            if(!$('.page .score')) {
                window.scoreRotate = null;
            }

            var scoreRotate = setInterval(function() {
                var step = parseInt($('.rotate').data('step'));
                if(!step) {
                    step=0;
                }
                if(step===App.game.get('level')) {
                    step=1;
                } else {
                    step++;
                }
                var el=$('.score .wrapper');
                switch (step) {
                    case 1:
                        el.css({left:0});
                        break;
                    case 2:
                        el.css({left:'-100%'});
                        break;
                    case 3:
                        el.css({left:'-200%'});
                        break;
                }
                $('.rotate').data('step',step);
            }, 5000);
            window.scoreRotate = scoreRotate;
        }

        //go back to start page after inactivity
        window.setTimeout(function() {
                App.home();
            },60000
        );
        return this.el;
    },

    close: function(){
        /*this.model.unbind("change", this.render);*/
        window.scoreRotate = null;
    },

    renderWrongAnswers: function() {
        var wrong = App.game.get('questions').wrongAnswers();

        if(wrong) {
            for(i=0; i<wrong.length; i++) {
                this.renderWrong(wrong[i]);
            }
        }
    },

    renderCorrectAnswers: function() {
        var correct = App.game.get('questions').correctAnswers();

        if(correct) {
            for(i=0; i<correct.length; i++) {
                this.renderCorrect(correct[i]);
            }
        }
    },

    renderCorrect: function(model) {
        var flag = model.get('correctAnswer').flag;
        var img = "<img src='img/flags/"+model.get('flag').replace(' ','_')+".png' class='flag'>";
        this.$el.find('ul.correct').append("<li>"+flag+img+"</li>");
    },

    renderWrong: function(model) {
        var flag = model.get('correctAnswer').flag;
        var img = "<img src='img/flags/"+model.get('flag').replace(' ','_')+".png' class='flag'>";
        this.$el.find('ul.wrong').append("<li>"+model.get('correctAnswer').flag+"</li>");
    },

    //Score Capitals
    //Refactor separera mot egna vyer
    renderCapitalAnswers: function() {
        var template = _.template( tpl.get('scoreCapitalTpl') );
        $(this.el).find('.wrapper').append(template({
            score: this.model.get('score'),
            total: this.model.get('totalQuestions')
        }));
        this.renderCorrectCapitalAnswers();
        this.renderWrongCapitalAnswers();
    },

    renderWrongCapitalAnswers: function() {
        var wrong = App.game.get('questions').wrongAnswers();

        if(wrong) {
            for(i=0; i<wrong.length; i++) {
                this.renderCapitalWrong(wrong[i]);
            }
        }
    },

    renderCorrectCapitalAnswers: function() {
        var correct = App.game.get('questions').correctAnswers();

        if(correct) {
            for(i=0; i<correct.length; i++) {
                this.renderCapitalCorrect(correct[i]);
            }
        }
    },

    renderCapitalCorrect: function(model) {
        this.$el.find('.capital ul.correct').append("<li>"+model.get('correctAnswer').capital+"</li>");
    },

    renderCapitalWrong: function(model) {
        this.$el.find('.capital ul.wrong').append("<li>"+model.get('correctAnswer').capital+"</li>");
    },

    //Score Population
    //Refactor separera mot egna vyer
    renderPopulationAnswers: function() {
        var template = _.template( tpl.get('scorePopulationTpl') );
        $(this.el).find('.wrapper').append(template({
            score: this.model.get('score'),
            total: this.model.get('totalQuestions')
        }));
        this.renderCorrectPopulationAnswers();
        this.renderWrongPopulationAnswers();
    },


    //Bug listan �ver population �r tom
    renderWrongPopulationAnswers: function() {
        var wrong = App.game.get('questions').wrongAnswers();

        if(wrong) {
            for(i=0; i<wrong.length; i++) {
                this.renderPopulationWrong(wrong[i]);
            }
        }
    },

    renderCorrectPopulationAnswers: function() {
        var correct = App.game.get('questions').correctAnswers();

        if(correct) {
            for(i=0; i<correct.length; i++) {
                this.renderPopulationCorrect(correct[i]);
            }
        }
    },

    renderPopulationCorrect: function(model) {
        this.$el.find('.population ul.correct').append("<li>"+model.get('correctAnswer').caption+"</li>");
    },

    renderPopulationWrong: function(model) {
        this.$el.find('.population ul.wrong').append("<li>"+model.get('correctAnswer').capital+"</li>");
    },


    events: {
         "touchstart button" : "new"
    },

    new: function() {
        App.level();
    }

});