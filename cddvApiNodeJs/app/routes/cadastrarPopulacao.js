
module.exports = function(application){

    application.post("/api/cadastrarPopulacao", function(req, res){

         application.app.controllers.cadastrarPopulacao.salvaCadastrarPopulacao(application, req, res );

    });

    // application.put("/api/cadastrarPopulacao", function(req, res){

    //     application.app.controllers.cadastrarPopulacao.atualizaCadastrarPopulacao(application, req, res );

    // });

    // application.delete("/api/cadastrarPopulacao/:cpf", function(req, res){

    //     application.app.controllers.cadastrarPopulacao.deletaCadastrarPopulacao(application, req, res );

    // });

    // application.get("/api/cadastrarPopulacao", function(req, res){

    //     application.app.controllers.cadastrarPopulacao.getAllCadastrarPopulacao(application, req, res);

    // });

}