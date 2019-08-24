
module.exports = function(application){

    application.post("/api/cadastrarUbs", function(req, res){
        console.log(req);
        application.app.controllers.cadastrarUbs.salvaCadastrarUbs(application, req, res );

    });

    // application.put("/api/cadastrarUbs", function(req, res){

    //     application.app.controllers.cadastrarUbs.atualizaCadastrarUbs(application, req, res );

    // });

    // application.delete("/api/cadastrarUbs/:id", function(req, res){

    //     application.app.controllers.cadastrarUbs.deletacadastrarUbs(application, req, res );

    // });

    // application.get("/api/cadastrarUbs", function(req, res){

    //     application.app.controllers.cadastrarUbs.getAllcadastrarUbss(application, req, res);

    // });

}