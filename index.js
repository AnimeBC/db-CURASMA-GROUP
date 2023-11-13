const app=require("./conexion")
app.listen((process.env.PORT||9001  ),()=>{
    console.log("Iniciado")
})