module.exports = function(application){

    application.get("/api/workSpaceAds/:cartao_sus", function(req, res){

        application.app.controllers.workSpaceAds.getCartaoDaPopulacao(application, req, res);
    });
    
}