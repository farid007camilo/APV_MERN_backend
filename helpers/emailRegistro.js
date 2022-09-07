import nodemailer from "nodemailer";


/* se instalo nodemailer para el envio de emails, tambie cree una cuenta en mailtrap para hacer las pruebas de desarrollo de envio de emails */

//configuramos las credenciales en el archivo .env y las usamos en la funcion de autenticacion de mailtrap
const emailregistro = async (datos) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

    
    const {email, nombre, token} = datos;
    //enviando el email
    const info = await transporter.sendMail({

        from: "APV - Administrador de pacientes de veterinaria", // sender address
        to: email, // list of receivers
        subject: "Comprueba tu cuenta en APV", // Subject line
        text: "Confirma tu cuenta", // plain text body
        html: 
        `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
           <head>
              <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <style type="text/css">
                
                 .ExternalClass {
                 width:100%;
                 }
                
                 .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {
                 line-height: 100%;
                 }
             
                 table { border-collapse: collapse !important; }
                 #outlook a { padding:0; }
                 .ReadMsgBody { width: 100%; }
                 .ExternalClass {width:100%;}
                 .backgroundTable {margin:0 auto; padding:0; width:100% !important;}
                 table td {border-collapse: collapse;}
                 .ExternalClass * {line-height: 115%;}
        
                 td {
                 font-family: Arial, sans-serif;
                 }
                 .hero-bg {
                 background: -webkit-linear-gradient(90deg, #2991bf 0%,#7ecaec 100%);
                 background-color: #4baad4;
                 }
                 .force-full-width {
                 width: 100% !important;
                 }
                 .body-padding {
                 padding: 0 75px;
                 }
                 .force-width-80 {
                 width: 80% !important;
                 }
              </style>
              <style type="text/css" media="screen">
                 @media screen {
                 
                 * {
                 font-family:'Arial', 'sans-serif' !important;
                 }
                 .w280 {
                 width: 280px !important;
                 }
                 }
              </style>
              <style type="text/css" media="only screen and (max-width: 480px)">
               
                 @media only screen and (max-width: 480px) {
                 table[class*="w320"] {
                 width: 320px !important;
                 }
                 td[class*="w320"] {
                 width: 280px !important;
                 padding-left: 20px !important;
                 padding-right: 20px !important;
                 }
                 td[class*="mobile-spacing"] {
                 padding-top: 10px !important;
                 padding-bottom: 10px !important;
                 }
                 *[class*="mobile-hide"] {
                 display: none !important;
                 }
                 .desktop-hide {
                 display: block!important;
                 }
                 *[class*="mobile-br"] {
                 font-size: 12px !important;
                 }
                 td[class*="mobile-w20"] {
                 width: 20px !important;
                 }
                 td[class*="mobile-center"] {
                 text-align: center !important;
                 }
                 table[class*="w100p"] {
                 width: 100% !important;
                 }
                 td[class*="activate-now"] {
                 padding-right: 0 !important;
                 padding-top: 20px !important;
                 }
                 td[class*="mobile-resize"] {
                 font-size: 22px !important;
                 padding-left: 15px !important;
                 }
                 td[class*="mobile-hide"] {
                 display:none;
                 }
                 }
              </style>
           </head>
           <body  offset="0" class="body externalClass" style="padding:0; margin:0; display:block; background:#e8ecf0; -webkit-text-size-adjust:none" bgcolor="#e8ecf0">
              <table align="center" cellpadding="0" cellspacing="0" width="100%" height="100%">
                 <tr>
                    <td align="center" valign="top" style="background-color:#eeebeb" width="100%">
                       <center>
                          <table cellspacing="0" cellpadding="0" width="600" class="w320">
                             <tr>
                                <td align="center" valign="top">
                                   <table class="mobile-hide" style="margin:0 auto;" cellspacing="0" cellpadding="0" width="100%">
                                      <tr>
                                         <td>&nbsp;</td>
                                      </tr>
                                      <tr>
                                         <td>&nbsp;</td>
                                      </tr>
                                   </table>
                                   <table cellspacing="0" cellpadding="0" width="100%">
                                      <tr>
                                         <td class="hero-bg">
                                            <table cellspacing="0" cellpadding="0" width="100%">
                                               <tr>
                                                  <td>&nbsp;</td>
                                               </tr>
                                               <tr>
                                                  <td style="font-size:40px; font-weight: 400; color: #ffffff; text-align:center;">
                                                     <div class="mobile-br">&nbsp;</div>
                                                     Hola <strong>${nombre}</strong> confirma tu cuenta en APV.
                                                     <br>
                                                  </td>
                                               </tr>
                                               <tr>
                                                  <td>&nbsp;</td>
                                               </tr>
                                               <tr>
                                                  <td style="font-size:24px; text-align:center; padding: 0 75px; color:#ffffff;">
                                                     Este es el ultimo paso para confirmar tu cuenta, solo debes dar click en el siguiente enlace
                                                  </td>
                                               </tr>
                                            </table>
                                            <table cellspacing="0" cellpadding="0" width="100%">
                                               <tr>
                                                  <td>
                                                     <p></p>
                                                  </td>
                                               </tr>
                                            </table>
                                         </td>
                                      </tr>
                                   </table>
                                   <table cellspacing="0" cellpadding="0" class="force-full-width" bgcolor="#ffffff" >
                                      <tr>
                                         <td style="background-color:#ffffff;">
                                            <br>
                                        
                                            <table align="center">
                                               <tr>
                                                  <td style="text-align:center; margin:0 auto;">
                                                     <br>
                                                     <table align="center">
                                                        <tr>
                                                           <td>
                                                              <div>
                                                                 <a href="${process.env.FRONTEND_URL}/confirmar/${token}" style="background-color:#80c97a;border:1px solid #80c97a;color:#ffffff;display:inline-block;font-family:sans-serif;font-size:18px;line-height:44px;text-align:center;text-decoration:none;width:150px;-webkit-text-size-adjust:none;border-radius: 10px">Confirmar Cuenta</a>
                                                              </div>
                                                           </td>
                                                        </tr>
                                                     </table>
                                                     <br>
                                                  </td>
                                               </tr>
                                            </table>
                                            <table border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="ffffff" class="force-full-width">
                                               <tr> 
                                                  <p align="center"><strong>Si tu no creaste esta cuenta, puedes ignorar este mensaje</strong></p>
                                               </tr>
                                               <tr> 
                                                 <td>&nbsp;</td> 
                                               </tr>      
                                               <tr> 
                                                <td>&nbsp;</td> 
                                               </tr>      
                                            </table>
                                  
                                         </td>
                                      </tr>
                                   </table>
                                </td>
                             </tr>
                          </table>
                       </center>
                    </td>
                 </tr>
              </table>
           </body>
        </html>

        `, 
    })

    console.log("Mensaje Enviado: %s", info.messageId);
    

}

export default emailregistro;