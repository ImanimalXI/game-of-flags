Array.prototype.shuffle = function() {
    var len = this.length;
    var i = len;
    while (i--) {
        var p = parseInt(Math.random()*len);
        var t = this[i];
        this[i] = this[p];
        this[p] = t;
    }
};

String.prototype.addCommas =function (nStr)  {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

function blockMove(e) {
    e.preventDefault() ;
}

tpl = {

    // Hash of preloaded templates for the app
    templates:{},

    // Recursively pre-load all the templates for the app.
    // This implementation should be changed in a production environment. All the template files should be
    // concatenated in a single file.
    loadTemplates:function (names, callback) {

        var that = this;

        var loadTemplate = function (index) {
            var name = names[index];
            console.log('Loading template: ' + name);
            $.get('tpl/' + name + '.html?callback=?', function (data) {
                that.templates[name] = data;
                index++;
                if (index < names.length) {
                    loadTemplate(index);
                } else {
                    callback();
                }
            });
        }

        loadTemplate(0);
    },

    // Get template by name from hash of preloaded templates
    get:function (name) {
        return this.templates[name];
    }

};

Util = {

    // Load lang file
    loadLang:function (lang) {
        $.getScript("lang/" + lang + ".js", function(data, textStatus, jqxhr) {
            console.log(data); //data returned
            console.log(jqxhr.status); //200
            console.log('Lang switch ok.');
        });
    },

    setTitle:function (title) {
        $('head title').text(title);
    },

    // set lang to local storage
    setLang:function (lang) {

    }

};