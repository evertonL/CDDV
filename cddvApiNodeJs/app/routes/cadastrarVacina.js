
module.exports = function(application){

    application.post("/api/cadastrarVacina", function(req, res){

         application.app.controllers.cadastrarVacina.salvaCadastrarVacina(application, req, res );

    });

    // application.put("/api/cadastrarVacina", function(req, res){

    //     application.app.controllers.cadastrarVacina.atualizaCadastrarVacina(application, req, res );

    // });

    // application.delete("/api/cadastrarVacina/:id_vacina", function(req, res){

    //     application.app.controllers.cadastrarVacina.deletaCadastrarVacina(application, req, res );

    // });

    // application.get("/api/cadastrarVacina", function(req, res){

    //     application.app.controllers.cadastrarVacina.getAllCadastrarVacina(application, req, res);

    // });

}