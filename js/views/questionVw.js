window.QuestionView = Backbone.View.extend({

    className: "c question page stripes",

    initialize: function(model) {
        //console.log(this.model.get('alternatives'));
        this.model = model.model;
        this.template = _.template(tpl.get('questionTpl'));
        //Hide the scrolling flag background
        $('.background').hide();
        /*this.model.bind('change', this.render);*/
    },

    render: function() {
        //merge the model json with labels
        /*$.extend(header_labels, this.model.toJSON() );*/

        $(this.el).html(this.template({
            action:  this.model.get('alternatives'),
            capital:  this.model.get('alternatives'),
            population:  this.model.get('alternatives'),
            flag: this.model.get('flag')
        }),LANG);

        $('.nav').addClass('bp stripes').delay(50000).queue(function (next) {
            $(this).removeClass('bp stripes');
            next();
        });

        return this.el;
    },

    events: {
        "touchstart .question .button" : "setAnswer",
        "touchend .question .button" : "press"
    },

    setAnswer: function(id) {
        //trigger press animation
        this.press(id);
        //set answer to question
        //fetch and store the corrent question model in local variable
        var current = App.game.get('questions').models[App.game.get('currentQuestion')-1];
        // temp storage for answer
        var answer = "";

        function next(step)  {
            var el=$('.question .nav');
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
        }

        switch(App.game.get('level')) {
            case 1:
                current.set({answer:id.target.innerText});
                this.checkAnswer(id);
                break;
            case 2:
                if($(id.target).hasClass('level1')) {
                    current.set({answer:id.target.innerText});
                    next(2);
                } else {
                    answer = current.get('answer') + ',' + id.target.innerText;
                    current.set({answer:answer});
                    this.checkAnswer(id);
                }
                break;
            case 3:
                if($(id.target).hasClass('level1')) {
                    current.set({answer:id.target.innerText});
                    next(2);
                } else if($(id.target).hasClass('level2')) {
                    answer = current.get('answer') + ',' + id.target.innerText;
                    next(3);
                } else {
                    answer = current.get('answer') + ',' + $(id.target).data('population');
                    current.set({answer:answer});
                    this.checkAnswer(id);
                }
                break;
        }
    },

    checkAnswer: function(id) {

        //check if correct answer
        if(App.game.get('questions').models[App.game.get('currentQuestion')-1].checkAnswer()){
           //update score
           var newScore = App.game.get('score');
           newScore++;
           App.game.set({score:newScore});
        }
        //go to next question
        this.next();
    },


    press: function(id) {
        if($(id.target).hasClass('pressed')){
            $(id.target).removeClass('pressed');
        } else {
            $(id.target).addClass('pressed');
        }
    },

    next: function() {
        App.question();
    }

});

