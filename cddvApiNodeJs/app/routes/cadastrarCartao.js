
module.exports = function(application){

    application.post("/api/cadastrarCartao", function(req, res){

         application.app.controllers.cadastrarCartao.salvaCadastrarCartao(application, req, res );

    });

    application.put("/api/cadastrarCartao", function(req, res){

        application.app.controllers.cadastrarCartao.atualizaCadastrarCartao(application, req, res );

    });

    application.delete("/api/cadastrarCartao/:cartao_sus", function(req, res){

        application.app.controllers.cadastrarCartao.deletaCadastrarCartao(application, req, res );

    });

    application.get("/api/cadastrarCartao", function(req, res){

        application.app.controllers.cadastrarCartao.getAllCadastrarCartao(application, req, res);

    });

}