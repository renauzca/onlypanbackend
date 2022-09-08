const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const {
  DB_HOST,
  PORT,
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
  REFRESH_TOKEN
} = process.env;

module.exports = function async(cualNotificacion, nombre, email, mensaje) {
  // Validación de google Oauth2
 
  const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
  );
  oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
  // Validación de google Oauth2

  // Notificaciones
  // 0. Notificación de formulario de contacto - administrador.
  // 1. Notificación de formulario de contacto - cliente.

  // Notificaciones
  console.log(nombre);
  let notificaciones = [
    {
      subject: "Nuevo formulario de contacto enviado",
      titulo: "Nuevo formulario enviado",
      notificacion: `Hola administrador. Un nuevo formulario de contacto se ha enviado. Con el siguiente correo ${email}`,
    },
    {
      subject: "Hemos recibido tu mensaje",
      titulo: "Gracias por confiar en Only Pan",
      notificacion:
        "Hola estimad@ " +
        nombre +
        ". Nos comunicamos con usted para informarle que se ha procesado su registro de forma existosa.",
    },
  ];

  // Plantilla de correo
  let mensajeHtml = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
        <style>
            p, a, h1, h2, h3, h4, h5, h6 {font-family: 'Roboto', sans-serif !important;}
            h1{ font-size: 30px !important;}
            h2{ font-size: 25px !important;}
            h3{ font-size: 18px !important;}
            h4{ font-size: 16px !important;}
            p, a{font-size: 15px !important;}
    
            .claseBoton{
                width: 30%;
                    background-color: #fcae3b;
                    border: 2px solid #fcae3b;
                    color: black; 
                    padding: 16px 32px;
                    text-align: center;
                    text-decoration: none;
                    font-weight: bold;
                    display: inline-block;
                    font-size: 16px;
                    margin: 4px 2px;
                    transition-duration: 0.4s;
                    cursor: pointer;
            }
            .claseBoton:hover{
                background-color: #000000;
                color: #ffffff;
            }
            .imag{
                width: 20px;
                height: 20px;
            }
            .contA{
                margin: 0px 5px 0 5px;
            }
            .afooter{
                color: #ffffff !important; 
                text-decoration: none;
                font-size: 13px !important;
            }
        </style>
    </head>
    <body>
        <div style="width: 100%; background-color: #e3e3e3;">
            <div style="padding: 20px 10px 20px 10px;">
                <!-- Imagen inicial -->
                <div style="background-color: #000000; padding: 10px 0px 10px 0px; width: 100%; text-align: center;">
                    <img src="cid:descargar" alt="profile" style="width: 200px; height: 100px;">
                </div>
                <!-- Imagen inicial -->
    
                <!-- Contenido principal -->
                <div style="background-color: #ffffff; padding: 20px 0px 5px 0px; width: 100%; text-align: center;">
                    <h1>${notificaciones[cualNotificacion].titulo}</h1>
                    <p>${notificaciones[cualNotificacion].notificacion}</p>
    
                    <!-- Gracias -->
                    <p>Gracias por su tiempo.</p>
                    <p style="margin-bottom: 50px;"><i>Atentamente:</i><br>Equipo Only Pan</p>
    
                </div>
                <!-- Contenido principal -->
    
                <!-- Footer -->
                <div style="background-color: #282828; color: #ffffff; padding: 5px 0px 0px 0px; width: 100%; text-align: center;">
    
                    <h4>Soporte</h4>
                    <p style="font-size: 13px; padding: 0px 20px 0px 20px;">
                        Comunícate con nosotros por los siguientes medios:<br>
                        Correo: <a class="afooter" href="mailto:onlypanarg1999@gmail.com">onlypanarg1999@gmail.com</a><br>
                        Whatsapp: <a class="afooter" href="https://wa.me/51978087988">+51 978 087 988</a><br>
                    </p>
                    <p style="background-color: black; padding: 10px 0px 10px 0px; font-size: 12px !important;">
                        © 2022 Only Pan, todos los derechos reservados.
                    </p>
                </div>
                <!-- Footer -->
    
    
    
            </div>
        </div>
    </body>
    </html>`;
  // Plantilla de correo

  // Configurar el correo electrónico
  const accessToken = async () => await oAuth2Client.getAccessToken();
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // con gmail: smtp.gmail.com
    port: 465, // con gmail 465
    // secure: true, // con gmail: true
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "facufernandez5481@gmail.com",
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });
  // Configurar el correo electrónico

  // Notificar o enviar correo

  transporter
    .sendMail({
      from: "website", // sender address
      to: email, // list of receivers
      subject: notificaciones[cualNotificacion].subject, // Subject line
      text: notificaciones[cualNotificacion].notificacion, // plain text body
      html: mensajeHtml, // html body
      attachments: [
        {
          filename: "descargar.jpg",
          path: "../api/src/img/descargar.jpg",
          cid: "descargar",
        },
      ],
    })
    .then((info) => {
      console.log({ info });
    })
    .catch(console.error);
  // Notificar o enviar correo
};
