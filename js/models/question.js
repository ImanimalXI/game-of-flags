window.Question = Backbone.Model.extend({

    defaults: {
        "flag": "",
        "score": '',
        "correctAnswer": "",
        "answer": "",
        "alternatives": []
    },

    initialize : function() {

    },

    validate: function(attribs) {

    },

    checkAnswer: function() {
        var correctAnswer = '';

        if(this.get('correctAnswer').flag) {
            correctAnswer = this.get('correctAnswer').flag.toLowerCase();
        }
        if(this.get('correctAnswer').capital) {
            correctAnswer += ',' + this.get('correctAnswer').capital.toLowerCase();
        }
        if(this.get('correctAnswer').population) {
            correctAnswer += ',' + this.get('correctAnswer').population;
        }

        if(correctAnswer===this.get('answer').toLowerCase()) {
            this.set({score:1});
            return true;
        } else {
            this.set({score:0});
            return false;
        }
    },

    generateCountryAlternatives: function() {

    },

    generatePopulationAlternatives: function() {

    },

    generateCapitalAlternatives: function() {

    }


});

window.QuestionCollection = Backbone.Collection.extend({
    model: Question,

    correctAnswers: function() {
        return this.filter(function(question) {
            return question.get('score')===1;
        });
    },

    wrongAnswers: function() {
        var wrong = this.filter(function(question) {
            return question.get('score')===0;
        });
        return wrong;
    },

    unanswered: function() {
        return this.filter(function(question) {
            return question.get('score')==='';
        });
    }


});