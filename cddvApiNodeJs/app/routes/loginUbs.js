module.exports = function(application){

    application.post("/api/loginUbs", function(req, res){

         application.app.controllers.loginUbs.loginUbs(application, req, res );
    });
}    