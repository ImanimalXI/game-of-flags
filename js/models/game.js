window.Game = Backbone.Model.extend({

    defaults: {
        "id":null,
        "name": "",
        "user": "",
        "location": "",
        "level": 1,
        "question": "",
        "score": "",
        "currentQuestion": 0,
        "totalQuestions": 20,
        "questions": ""
    },

    initialize : function(countries) {
        this.set({countries:countries});
        this.on("error", function(model,error) {

        }),
        this.on("change:name", function(){

        });
    },

    validate: function(attribs) {

    },


    newGame: function(settings) {
            this.set({score:0});
        if(settings.totalQuestions) {
            this.set({totalQuestions:settings.totalQuestions});
        } else if(!this.get('totalQuestions')) {
            //Refactor fallback f�r settings om de inte �r definierade r�tt
            this.set({totalQuestions:20});
        } else {
        }
        this.set({currentQuestion:0});
        if(settings.continent) {
            this.set({continent:settings.continent});
        } else {
            this.set({continent:'all'});
        }
        this.generateQuestions();
    },

    nextQuestion: function() {
        var current = parseInt(this.get('currentQuestion'));
        current++;
        if(this.get('currentQuestion')<this.get('totalQuestions')) {
            this.set({currentQuestion:current});
            return true;
        } else {
            return false;
        }
    },

    setQuestionAlternative: function(country) {
        /*
         * Level 1 - 3 alternatives only flags
         * Level 2 - 3 alternatives, flags and capital
         * Level 3 - 4 alternatives, flags, capital and population
         * */
        var level = this.get('level'),
            language = App.game.get('settings').get('language');

        // Append alternative depending on level (country + capital + population)
        var alternative = {};
        var flag = App.game.get('countries').getCountryNameByLang(country,language);
        /*alternative.push(flag);*/
        alternative.flag = flag;
        //flag + capital
        if(level>1)  {
            /*alternative += ','+ App.game.get('countries').getCapitalNameByLang(country,language);*/
            var capital = App.game.get('countries').getCapitalNameByLang(country,language);
            /*alternative.push(capital);*/
            alternative.capital = capital;
        }
        //flag, capital and population
        if(level>2)  {
            /*alternative += ','+ country.get('population');*/
            var population = country.get('population');
            /*alternative.push(population);*/
            alternative.population = population;
        }
        return alternative;
    },

    //prevent the total nr of questions to be larger than the available collection
    setQuestionsLength: function(collection) {
        if(parseInt(this.get('totalQuestions'))>collection.length){
            return collection.length;
        } else {
            return parseInt(this.get('totalQuestions'));
        }
    },

    setQuestionNumberOfAlternatives: function() {
        /*
         * Level 1 - 3 alternatives only flags
         * Level 2 - 3 alternatives, flags and capital
         * Level 3 - 4 alternatives, flags, capital and population
         * */
        //set level, altNr number of alternatives generated per question
        var level = this.get('level');
        switch(level) {
            case 1 :
                //Refactor altNR to proper name
                var altNr=3;
                break;
            case 2 :
                var altNr=3;
                break;
            case 3 :
                var altNr=4;
                break;
            default :
                var altNr=3;
        }
        return altNr;
    },

    //Filter questions to continent setting
    setQuestionsCollection: function() {
        //Filter questions to continent setting
        if(this.get('continent')!='all') {
            var collection = this.get('countries').byContinent(this.get('continent'));
        } else {
            var collection =  this.get('countries').all();
        }
        return collection;
    },

    //Filter questions to continent setting
    generateQuestion: function() {


        return question;
    },

    generateQuestions: function() {
        //init questionsArray
        var questionsArray = [''];

        //Filter questions to continent setting
        var collection = this.setQuestionsCollection();

        //prevent the total nr of questions to be larger than the available collection
        var nrOfQuestions = this.setQuestionsLength(collection);

        //total nr of available questions
        var length = collection.length;

        //set level, altNr number of alternatives generated per question
        var altNr = this.setQuestionNumberOfAlternatives();

        //prevent number of alternatives to be larger than the list of alternatives
        if(length<3) {
            altNr=2;
        }

        if(collection) {
            //init the collection of questions
            this.set({questions : new QuestionCollection() });

            //loop question generate to set totalQuestions
            for(var i=0; i<nrOfQuestions   ; i++) {

                //this.generateQuestion();

                //random nr to fetch a value from collection
                var rNr=Math.floor(Math.random()*length);
                //check if rNr value already taken
                if(questionsArray.indexOf(rNr) > -1) {
                    i--;
                } else {

                    // reset question alternatives
                    var alternatives = [];
                    //set answer
                    var correctAnswer = this.setQuestionAlternative(collection[rNr]);

                    alternatives.push(correctAnswer);

                    //loop alternatives and add to question alternatives
                    for(var j=0; j<(altNr-1); j++) {
                        var rNr2=Math.floor(Math.random()*length);
                        if(questionsArray.indexOf(rNr2)> -1 || rNr2===rNr) {
                            j--;
                        } else {
                            //set alternative
                            var alternative = this.setQuestionAlternative(collection[rNr2]);
                            alternatives.push(alternative);
                        }
                    }
                    //randomize alternatives
                    alternatives.shuffle();
                    // create and init Question
                    var question = new Question({
                        flag:collection[rNr].get('countryName'),
                        correctAnswer:correctAnswer,
                        alternatives:alternatives
                    });
                    //store question to questions collection
                    this.get('questions').add(question);
                    questionsArray.push(rNr);
                }
            }
            //return the final list of questions
            return this.get('questions');
        } else {
            console.log('empty list not able to generate questions');
            return false;
        }

    }
});

window.UsersCollection = Backbone.Collection.extend({
    model: Game
    /*url: "user/"*/
});