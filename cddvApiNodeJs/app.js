//Bibliotecas
const app = require("./config/server");

var port = 3000;

//Startando servidor da aplicação
app.listen(port, function(){
    console.log("servidor CddvApiNodeJS ON na porta: "+port);
});