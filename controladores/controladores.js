const accountSid = 'AC5ec91c1479174322d5fa0af749aed9e5';
const authToken = 'cc4ab2a2006dfb6105b83823a80c5428';
const urlEmpresa="http://localhost:3000/"
/**/
const mariadb = require("mariadb");
const client = require('twilio')(accountSid, authToken);
const nodemailer = require('nodemailer');

const conexion = mariadb.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "123456",
  port: 3306,
  database: "constructora",
});
/** */
exports.correos = async (req, res) => {
  let estado;
  try {
    estado = await conexion.getConnection();
    const correos = await estado.query("select correo from correos");
    return res.json(correos);
  } catch (err) {
    throw err;
  } finally {
    if (estado) return estado.end();
  }
};
exports.numeros = async (req, res) => {
  let estado;
  try {
    estado = await conexion.getConnection();
    const correos = await estado.query("select numero from numeros");
    return res.json(correos);
  } catch (err) {
    throw err;
  } finally {
    if (estado) return estado.end();
  }
};
exports.validarRegistro = async (req, res) => {
  console.log("estamos aqui")
  let estado;
  try {
    estado = await conexion.getConnection();
    const [existeC] = await estado.query(
      "select correo from correos where correo=(?)",
      req.body.email
    );
    const [existeN] = await estado.query(
      "select numero from numeros where numero=(?)",
      req.body.telefono
    );
    try {
      if (existeC.length !== 0 || existeC !== null) {
        return res.redirect(
          302,
          `${urlEmpresa}registro/registro/error?error=existeC&valor?${req.body.email}`
        );
      } else if (existeN.length !== 0 || existeN !== null) {
        return res.redirect(
          302,
          `${urlEmpresa}registro/registro/error?error=existeN&valor?${req.body.telefono}`
        );
      }
    } catch (error) {
      function objetoDeParametros(objeto) {
        var pares = Object.entries(objeto);
        var paresConRepe = [].concat.apply(
          [],
          pares.map(([key, val]) =>
            val instanceof Array
              ? val.map((v) => [`${key}[]`, v])
              : val && val.toJSON
              ? [[key, val.toJSON()]]
              : val instanceof Object
              ? objeto.entries(val).map(([k, v]) => [`${key}[${k}]`, v])
              : [[key, val]]
          )
        );
        var up = new URLSearchParams(paresConRepe);
        return up.toString();
      }
      const datos=objetoDeParametros(req.body)
      return res.redirect(302, `${urlEmpresa}registro/crear?${datos}`);
    }
  } catch (err) {
    res.redirect(
      302,
      `${urlEmpresa}registro/registro/error?error=existeN&valor?${err}a`
    );
    throw err;
  } finally {
    if (estado) return estado.end();
  }
};
/** */
exports.codigo = async (req, res) => {
  function envio(estado,codigo) {
    switch (estado) {
      case 1:
                
      // Configura el transporte SMTP
      const transporter = nodemailer.createTransport({
        service: 'Gmail', // Cambia a tu servicio de correo electrónico (ejemplo: 'Outlook')
        secure: true,
        auth: {
          user: 'brayanjhoancurasmaespinoza@gmail.com',
          pass: 'quys wrmp jmmb gejw',
        },
      });

      // Define el mensaje de correo electrónico
      const mailOptions = {
        from: 'brayanjhoancurasmaespinoza@gmail.com',
        to: req.body.correo,
        subject: 'Codigo de verificacion Empresa AUT',
        text: codigo,
      };

      // Envía el correo electrónico
      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.error('Error al enviar el correo:', error);
        } else {
          
        }
      });
        break;
        case 2:
        
        break;
        case 3:
        
        break;
    
      default:
        break;
    }
  }
  let estado;
  try {
    estado = await conexion.getConnection();
    function generarCodigoAlfanumerico(length) {
      const caracteres = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let codigo = '';
      for (let i = 0; i < length; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
        codigo += caracteres.charAt(indiceAleatorio);
      }
      return codigo;
    }
    let codigo=generarCodigoAlfanumerico(6);
    const datos = await estado.query("select * from token");
    if(datos.filter(a=>a.codigo===codigo).length===0){
      if(datos.filter(a=>a.correo===req.body.correo).length===0&&datos.filter(a=>a.numero===req.body.correo).length===0){
        estado.query(
          "insert into token(correo,numero,codigo) values (?,?,?)",
          [req.body.correo,req.body.numero,codigo]
        ).then(()=>envio(req.body.estado,codigo));
          return res.status(200).json(codigo)
      }else{
        estado.query(
          "update token set codigo=(?) where correo=(?) and numero=(?)",
          [codigo,req.body.correo,req.body.numero]
        ).then(()=>envio(req.body.estado,codigo));
        return res.status(200).json(codigo)
      }
    }else{
      codigo=generarCodigoAlfanumerico(6);
    }
  } catch (err) {
    throw err;
  } finally {
    if (estado) return estado.end();
  }
};