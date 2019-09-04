module.exports = function(application){

    application.get("/api/workSpaceUbsAllAgentes/:cnes", function(req, res){

        application.app.controllers.workSpaceUbs.getAllAdsPorUbs(application, req, res);
    });

    //arumar pois esta consulatando todos os agentes no BD e n so o da Ubs
    application.get("/api/workSpaceUbsAgentePorNome/:nome", function(req, res){

        application.app.controllers.workSpaceUbs.getAgentePeloNome(application, req, res);
    });

    //arumar pois esta consulatando todos os agentes no BD e n so o da Ubs
    application.get("/api/workSpaceUbsAgentePorCpf/:cpf", function(req, res){

        application.app.controllers.workSpaceUbs.getAgentePeloCpf(application, req, res);
    });
    

}