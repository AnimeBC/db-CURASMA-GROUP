const {Router}=require("express")
const rutas=Router("/");
const control=require("../controladores/controladores")
/**/
rutas.get("/correos",control.correos)
rutas.get("/numeros",control.numeros)
rutas.post("/validarRegistro",control.validarRegistro)
rutas.post("/codigo",control.codigo)

module.exports=rutas;