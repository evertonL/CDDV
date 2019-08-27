module.exports = function(application){

    application.post("/api/cadastrarUbs", function(req, res){
        
        application.app.controllers.cadastrarUbs.salvaCadastrarUbs(application, req, res );

    });
    
    application.put("/api/cadastrarUbs", function(req, res){

        application.app.controllers.cadastrarUbs.atualizaCadastrarUbs(application, req, res );
        console.log("aqui1");
    });

    application.delete("/api/cadastrarUbs/:cnes", function(req, res){

        application.app.controllers.cadastrarUbs.deletaCadastrarUbs(application, req, res );

    });

    // //nao testei
    // application.get("/api/cadastrarUbs", function(req, res){

    //     application.app.controllers.cadastrarUbs.getAllCadastrarUbs(application, req, res);

    // });

}