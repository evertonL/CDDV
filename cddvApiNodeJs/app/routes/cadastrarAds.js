
module.exports = function(application){

    application.post("/api/cadastrarAds", function(req, res){

         application.app.controllers.cadastrarAds.salvaCadastrarAds(application, req, res );

    });

    // application.put("/api/cadastrarAds", function(req, res){

    //     application.app.controllers.cadastrarAds.atualizaCadastrarAds(application, req, res );

    // });

    // application.delete("/api/cadastrarAds/:id", function(req, res){

    //     application.app.controllers.cadastrarAds.deletaCadastrarAds(application, req, res );

    // });

    // application.get("/api/cadastrarAds", function(req, res){

    //     application.app.controllers.cadastrarAds.getAllCadastrarAdss(application, req, res);

    // });

}