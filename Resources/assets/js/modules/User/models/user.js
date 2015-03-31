define([
  'app',
  'config'], function(App, Config){

  return App.module('User', function(User, App, Backbone, Marionette, $, _){

    var currentUser;

    User.UserModel = Backbone.Model.extend({
      url : Config.apiUrl + '/desk/users/current',
      validate: function(attrs, options){
        var errors = {},
            required = _.omit(attrs, Object.keys(options.ignore));
        if(!attrs.email) {
          errors.email = "Can't be blank";
        }
        if(_.indexOf(options.ignore, 'password') === -1){
          if(!attrs.password) {
            errors.password = "Can't be blank";
          } else if(attrs.password.length < 6) {
            errors.password = 'Must be at least six (6) symbols';
          }
        }
        if(!_.isEmpty(errors)){
          return errors;
        }
      }
    });

    var API = {
      getCurrentUserModel: function(){
        var user = new User.UserModel(),
            defer = $.Deferred();
        if(currentUser){
          defer.resolve(currentUser);
        } else {
          user.fetch({
            success : function(data){
              currentUser = user.clone();
              defer.resolve(data);
            },
            error : function(data){
              defer.reject(data);
            }
          });
        }
        return defer.promise();
      }
    };

    App.reqres.setHandler('user:model:current', function(){
      return API.getCurrentUserModel();
    });

  });

});

