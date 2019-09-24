module.exports = function(application){

    application.get("/api/workSpaceAds/:cartao_sus", function(req, res){

        application.app.controllers.workSpaceAds.getCartaoDaPopulacao(application, req, res);
    });

    application.get("/api/checarPopulacao/:cartao_sus", function(req, res){

        application.app.controllers.workSpaceAds.getChecarPopulacao(application, req, res);

    });
    
}