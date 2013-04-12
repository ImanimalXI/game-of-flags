window.HeaderView = Backbone.View.extend({

    id : "header",
    header_labels: "",

    initialize: function(model) {
        var lang = LANG;

        //slå ihop header_labels med modellens värden
        this.model = model.model;
        $.extend(lang, this.model.toJSON() );
        this.template = _.template( tpl.get('headerTpl'), lang );
        /*       this.model.bind('change', this.render);*/
    },

    render: function() {
        //slå ihop header_labels med modellens värden
        /*$.extend(header_labels, this.model.toJSON() );*/

        this.$el.html( this.template );
        return this.el;
    },

    setTitle: function(title) {
        $('#header h2').text(title);
    },

    setStatus: function(status) {
        $('#header .status').text(status).removeClass('spin pulse').delay(500).queue(function (next) {
            $(this).addClass('spin pulse');
            next();
        });
    },

    hideStatus: function() {
        $('#header .status').hide();
    },

    showStatus: function() {
        $('#header .status').show();
    },

    events: {
        
    }

});
