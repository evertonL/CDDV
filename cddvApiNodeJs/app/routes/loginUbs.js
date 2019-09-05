module.exports = function(application){

    application.post("/api/loginUbs", function(req, res){

         application.app.controllers.login.loginUbs(application, req, res );
    });
}    