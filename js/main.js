Backbone.View.prototype.close = function () {
    console.log('Closing view ' + this);
    if (this.beforeClose) {
        this.beforeClose();
    }
    this.remove();
    this.unbind();
};

var AppRouter = Backbone.Router.extend({

    initialize: function () {
        this.user = new User;
        this.settings = new Settings;
        this.game = new Game;

        this.game.set({user:this.user});
        this.game.set({settings:this.settings});
        /*console.log('USER: '+ this.game.get('user').get('id'));
        console.log(this.game);*/

        //if localstorage lang get and read additional file
        if (localStorage.getItem('lang')) {
            var lang = localStorage.getItem('lang');
            this.game.get('settings').set({lang: lang});
            Util.loadLang(lang);
            Util.setTitle(LANG.title);
        } else {     //else use default lang
        }

        this.headerView = new HeaderView({model: this.game});
        $('body').append(this.headerView.render());

        /*  this.users.create(this.user);*/
        this.countrys = new CountryCollection;
        this.countrys.url=  'data/countrys.json';
        this.countrys.fetch({
            success : function(collection) {
                App.game.set({countries:collection});
                App.home();
            }
        });
    },

    routes: {
        "countrys": "countrys",
        "newgame": "newGame",
        "*other": "home"
    },

    home: function() {
        this.backgroundView = new BackgroundView({collection: App.game.get('countries')});
        $('body').append(this.backgroundView.render());

        this.showView('#content', new HomeView({ }));
        this.headerView.setTitle('');
        this.headerView.hideStatus();
        /*this.footerView.updateNav(["#footer_home"]);*/
    },

    level: function() {
        this.showView('#content', new LevelView({ }));
        this.headerView.setTitle(LANG.level_header);
        this.headerView.hideStatus();
    },

    about: function() {
        this.showView('#content', new AboutView({ }));
        this.headerView.setTitle('');
        this.headerView.hideStatus();
    },


    newGame: function() {
        this.showView('#content', new NewGameView({ }));
        this.headerView.setTitle(LANG.continent);
        this.headerView.hideStatus();
        /*this.footerView.updateNav(["#footer_home"]);*/
    },

    question: function() {
        if(this.game.nextQuestion()){
            var question = this.game.get('questions').models[this.game.get('currentQuestion')-1];
            this.headerView.setStatus(this.game.get('currentQuestion'));
            this.headerView.showStatus();
            /*this.headerView.render();*/
            this.showView('#content', new QuestionView({
                model: question
            }));
            this.headerView.setTitle('');
        } else {
            this.score();
        }
    },

    score: function() {
        this.showView('#content', new ScoreView({
            model: this.game
        }));
        this.headerView.setTitle(LANG.result);
        this.headerView.hideStatus();
    },

    listCountrys: function() {
        this.showView('#content', new CountrysView({collection: App.game.get('countries')}));
    },

    lang: function() {
        this.showView('#content', new SettingsView({ }));
    },

    showView: function(selector, view) {
        if (this.currentView) this.currentView.close();
        $(selector).html(view.render());
        this.currentView = view;
        return view;
    }

});

var templates = [
    'splashTpl',
    'headerTpl',
    'countryTpl',
    'countrysTpl',
    'backgroundTpl',
    'scoreTpl',
    'scoreCapitalTpl',
    'scorePopulationTpl',
    'homeTpl',
    'newGameTpl',
    'levelTpl',
    'settingsTpl',
    'aboutTpl',
    'questionTpl'
]

tpl.loadTemplates(templates, function () {
    App = new AppRouter();
    Backbone.history.start();

});