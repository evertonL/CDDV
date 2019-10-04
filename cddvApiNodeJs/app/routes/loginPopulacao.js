module.exports = function(application){

    application.post("/api/loginPopulacao", function(req, res){

         application.app.controllers.loginPopulacao.loginPopulacao(application, req, res );

    });
    
}    