window.User = Backbone.Model.extend({

    defaults: {
        "id":null,
        "name": "",
        "location": ""
    },

    initialize : function() {
        this.generateID();
        this.on("error", function(model,error) {
            console.log('Error in User model, ' + error);
        }),
        this.on("change:name", function(){
                console.log('Name changed to '+ this.get('name'));
        });
    },

    validate: function(attribs) {
        if(attribs.name===undefined || attribs.name===''){
            return "Name mandatory for User";
        }
    },

    generateID: function() {
        if(!this.get('id') || this.get('id')===""){
            var nr=0;
            var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
            var string_length = 24;
            var randomstring = '';
            for (var i=0; i<string_length; i++) {
                var rnum = Math.floor(Math.random() * chars.length);
                randomstring += chars.substring(rnum,rnum+1);
            }
            this.set({id:randomstring});
            return this.get('id');
        }
    }
});

window.UsersCollection = Backbone.Collection.extend({
    model: User
    /*url: "user/"*/
});