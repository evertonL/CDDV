module.exports = function(application){

    application.post("/api/loginAds", function(req, res){

         application.app.controllers.loginAds.loginAds(application, req, res );

    });
    
}    