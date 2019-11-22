module.exports = function(application){

    application.get("/api/relatorio/:cnes", function(req, res){

        application.app.controllers.relatorio.getRelatorio(application, req, res);
    });

}