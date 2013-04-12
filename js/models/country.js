window.Country = Backbone.Model.extend({

    defaults: {

    },

    initialize : function() {

    },

    validate: function(attribs) {

    }
});

window.CountryCollection = Backbone.Collection.extend({
    model: Country,

    parse : function(response) {
        return response.countrys;
    },

    all: function(selection) {
        return this.filter(function(country) {
            return country;
        });
    },

    getCountryNameByLang: function(country, lang) {
        switch (lang) {
            case  'en':
                return country.get('countryName');
                break
            case 'se':
                return country.get('countryName_se');
                break
            case 'fr' :
                return country.get('countryName_fr');
                break
            default :
                return country.get('countryName');
                break
        }
    },

    getCapitalNameByLang: function(capital, lang) {
        switch (lang) {
            case  'en':
                return capital.get('capital');
                break
            case 'se':
                return capital.get('capital_se');
                break
            case 'fr' :
                return capital.get('capital_fr');
                break
            default :
                return capital.get('capital');
                break
        }
    },

    getContinentByLang: function(continent, lang) {
        if(LANG) {
            var tempName = continent.replace(' ','_');
            return eval("LANG."+tempName);
        } else {
            return continent;
        }

    },

    byContinent: function(selection) {
        return this.filter(function(country) {
            return country.get('continentName')===selection;
        });
    },

    listContinents: function() {
        return _.uniq(this.pluck("continentName"), false, function (continent) {
            return continent;
        });

    },

    continentCount: function(selection)  {
        return this.filter(function(country) {
            return country.get('continentName')===selection;
        }).length;
    }
});