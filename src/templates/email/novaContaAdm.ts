import { User } from "../../class/User"

export const novaContaAdmString = (user: User) =>
    `
    Olá equipe Casa Lúdica, temos novidades boas! Uma nova conta foi criada em nosso marketplace. Isso significa mais uma pessoa pronta para embarcar nas aventuras que só a Casa Lúdica pode oferecer.
    Detalhes da Conta:
    Nome: ${user.name} ${user.lastname},
    Endereço: ${user.address},
    Bairro: ${user.district},
    Cidade: ${user.city},
    CEP: ${user.postcode},
    E-mail: ${user.email},
    Telefone: ${user.phone}.
    É um ótimo momento para assegurar que tudo esteja perfeito para receber nosso novo membro. Vamos continuar trabalhando para fazer da Casa Lúdica o melhor lugar para nossos clientes encontrarem o que amam.
`

export const novaContaAdm = (user: User) =>`
<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
  <title>
  </title>
  <!--[if !mso]><!-->
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <!--<![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style type="text/css">
    #outlook a {
      padding: 0;
    }

    body {
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }

    table,
    td {
      border-collapse: collapse;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }

    img {
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
      -ms-interpolation-mode: bicubic;
    }

    p {
      display: block;
      margin: 13px 0;
    }
  </style>
  <!--[if mso]>
    <noscript>
    <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
    </xml>
    </noscript>
    <![endif]-->
  <!--[if lte mso 11]>
    <style type="text/css">
      .mj-outlook-group-fix { width:100% !important; }
    </style>
    <![endif]-->
  <!--[if !mso]><!-->
  <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" type="text/css">
  <style type="text/css">
    @import url(https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap);
  </style>
  <!--<![endif]-->
  <style type="text/css">
    @media only screen and (min-width:480px) {
      .mj-column-per-100 {
        width: 100% !important;
        max-width: 100%;
      }

      .mj-column-px-300 {
        width: 300px !important;
        max-width: 300px;
      }
    }
  </style>
  <style media="screen and (min-width:480px)">
    .moz-text-html .mj-column-per-100 {
      width: 100% !important;
      max-width: 100%;
    }

    .moz-text-html .mj-column-px-300 {
      width: 300px !important;
      max-width: 300px;
    }
  </style>
  <style type="text/css">
    @media only screen and (max-width:480px) {
      table.mj-full-width-mobile {
        width: 100% !important;
      }

      td.mj-full-width-mobile {
        width: auto !important;
      }
    }
  </style>
  <style type="text/css">
  </style>
</head>

<body style="word-spacing:normal;background-color:#363775;">
  <div style="background-color:#363775;">
    <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="#363775" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="background:#363775;background-color:#363775;margin:0px auto;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#363775;background-color:#363775;width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                  <tbody>
                    <tr>
                      <td style="font-size:0px;word-break:break-word;">
                        <div style="height:20px;line-height:20px;">&#8202;</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="#ffffff" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;border-radius:25px 25px 0px 0px;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;border-radius:25px 25px 0px 0px;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:middle;width:300px;" ><![endif]-->
              <div class="mj-column-px-300 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:middle;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:middle;" width="100%">
                  <tbody>
                    <tr>
                      <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                          <tbody>
                            <tr>
                              <td style="width:120px;">
                                <a href="https://casaludica.com.br/" target="_blank">
                                  <img height="auto" src="https://casaludica.com.br/wp-content/uploads/2022/10/logo.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="120" />
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td><td class="" style="vertical-align:middle;width:300px;" ><![endif]-->
              <div class="mj-column-px-300 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:middle;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:middle;" width="100%">
                  <tbody>
                    <tr>
                      <td align="center" style="font-size:0px;padding:0px;word-break:break-word;">
                        <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" ><tr><td><![endif]-->
                        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                          <tbody>
                            <tr>
                              <td style="padding:4px;vertical-align:middle;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:3px;width:55px;">
                                  <tbody>
                                    <tr>
                                      <td style="font-size:0;height:55px;vertical-align:middle;width:55px;">
                                        <a href="https://api.whatsapp.com/send?phone=5547991684299&text=Ol%C3%A1,%20Casa%20L%C3%BAdica!" target="_blank">
                                          <img height="55" src="https://casaludica.com.br/wp-content/uploads/2024/04/whatsapp.png" style="border-radius:3px;display:block;" width="55" />
                                        </a>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <!--[if mso | IE]></td><td><![endif]-->
                        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                          <tbody>
                            <tr>
                              <td style="padding:4px;vertical-align:middle;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:3px;width:55px;">
                                  <tbody>
                                    <tr>
                                      <td style="font-size:0;height:55px;vertical-align:middle;width:55px;">
                                        <a href="https://www.instagram.com/casaludica" target="_blank">
                                          <img height="55" src="https://casaludica.com.br/wp-content/uploads/2024/04/instagram.png" style="border-radius:3px;display:block;" width="55" />
                                        </a>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <!--[if mso | IE]></td><td><![endif]-->
                        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                          <tbody>
                            <tr>
                              <td style="padding:4px;vertical-align:middle;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:3px;width:55px;">
                                  <tbody>
                                    <tr>
                                      <td style="font-size:0;height:55px;vertical-align:middle;width:55px;">
                                        <a href="https://www.facebook.com/casaludica.com.br" target="_blank">
                                          <img height="55" src="https://casaludica.com.br/wp-content/uploads/2024/04/facebook.png" style="border-radius:3px;display:block;" width="55" />
                                        </a>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <!--[if mso | IE]></td><td><![endif]-->
                        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                          <tbody>
                            <tr>
                              <td style="padding:4px;vertical-align:middle;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:3px;width:55px;">
                                  <tbody>
                                    <tr>
                                      <td style="font-size:0;height:55px;vertical-align:middle;width:55px;">
                                        <a href="https://www.youtube.com/@casaludica6482" target="_blank">
                                          <img height="55" src="https://casaludica.com.br/wp-content/uploads/2024/04/youtube.png" style="border-radius:3px;display:block;" width="55" />
                                        </a>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <!--[if mso | IE]></td></tr></table><![endif]-->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="#ffffff" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                  <tbody>
                    <tr>
                      <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <div style="font-family:Poppins,Helvetica;font-size:15px;line-height:30px;text-align:center;color:#282828;">
                          <h1>Nova Conta Criada no Marketplace</h1>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <div style="font-family:Poppins,Helvetica;font-size:15px;line-height:30px;text-align:left;color:#282828;">Olá equipe Casa Lúdica,</div>
                      </td>
                    </tr>
                    <tr>
                      <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <div style="font-family:Poppins,Helvetica;font-size:15px;line-height:30px;text-align:left;color:#282828;">Temos novidades boas! Uma nova conta foi criada em nosso marketplace. Isso significa mais uma pessoa pronta para embarcar nas aventuras que só a Casa Lúdica pode oferecer.</div>
                      </td>
                    </tr>
                    <tr>
                      <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <div style="font-family:Poppins,Helvetica;font-size:15px;line-height:30px;text-align:left;color:#282828;">
                          <h3>Detalhes da Conta</h3> Nome: ${user.name} ${user.lastname}<br> Endereço: ${user.address}<br> Bairro: ${user.district}<br> Cidade: ${user.city}<br> CEP: ${user.postcode}<br> E-mail: ${user.email}<br> Telefone: ${user.phone}<br>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <div style="font-family:Poppins,Helvetica;font-size:15px;line-height:30px;text-align:left;color:#282828;">É um ótimo momento para assegurar que tudo esteja perfeito para receber nosso novo membro. Vamos continuar trabalhando para fazer da Casa Lúdica o melhor lugar para nossos clientes encontrarem o que amam.</div>
                      </td>
                    </tr>
                    <tr>
                      <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <div style="font-family:Poppins,Helvetica;font-size:15px;line-height:30px;text-align:left;color:#282828;">Agradecemos por fazerem parte desta jornada conosco!</div>
                      </td>
                    </tr>
                    <tr>
                      <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <div style="font-family:Poppins,Helvetica;font-size:15px;line-height:30px;text-align:left;color:#282828;">Atenciosamente,</br> Equipe Casa Lúdica</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="#ffffff" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:0px;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:middle;width:600px;" ><![endif]-->
              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:middle;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:middle;" width="100%">
                  <tbody>
                    <tr>
                      <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                          <tbody>
                            <tr>
                              <td style="width:160px;">
                                <a href="https://casaludica.com.br/" target="_blank">
                                  <img height="auto" src="https://casaludica.com.br/wp-content/uploads/2022/10/logo.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="160" />
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="#ffffff" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:0px;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                  <tbody>
                    <tr>
                      <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <div style="font-family:Poppins,Helvetica;font-size:10px;line-height:20px;text-align:center;color:#282828;">Somos uma loja de brinquedos que ama o que faz, especializada em Brinquedos Educativos, Instrumentos Musicais, Playgrounds e Mobiliários, Materiais Pedagógicos, Jogos e Desafios, Espumados Babys</div>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <div style="font-family:Poppins,Helvetica;font-size:10px;line-height:30px;text-align:center;color:#282828;">Rua 1950, número 720, sala 02 Centro - Balneário Camboriú - SC, 88330-474</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="#ffffff" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;border-radius:0px 0px 25px 25px;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;border-radius:0px 0px 25px 25px;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:0px;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:middle;width:600px;" ><![endif]-->
              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:middle;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:middle;" width="100%">
                  <tbody>
                    <tr>
                      <td align="center" style="font-size:0px;padding:0px 0px 25px 0px;word-break:break-word;">
                        <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" ><tr><td><![endif]-->
                        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                          <tbody>
                            <tr>
                              <td style="padding:4px;vertical-align:middle;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:3px;width:55px;">
                                  <tbody>
                                    <tr>
                                      <td style="font-size:0;height:55px;vertical-align:middle;width:55px;">
                                        <a href="https://api.whatsapp.com/send?phone=5547991684299&text=Ol%C3%A1,%20Casa%20L%C3%BAdica!" target="_blank">
                                          <img height="55" src="https://casaludica.com.br/wp-content/uploads/2024/04/whatsapp.png" style="border-radius:3px;display:block;" width="55" />
                                        </a>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <!--[if mso | IE]></td><td><![endif]-->
                        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                          <tbody>
                            <tr>
                              <td style="padding:4px;vertical-align:middle;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:3px;width:55px;">
                                  <tbody>
                                    <tr>
                                      <td style="font-size:0;height:55px;vertical-align:middle;width:55px;">
                                        <a href="https://www.instagram.com/casaludica" target="_blank">
                                          <img height="55" src="https://casaludica.com.br/wp-content/uploads/2024/04/instagram.png" style="border-radius:3px;display:block;" width="55" />
                                        </a>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <!--[if mso | IE]></td><td><![endif]-->
                        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                          <tbody>
                            <tr>
                              <td style="padding:4px;vertical-align:middle;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:3px;width:55px;">
                                  <tbody>
                                    <tr>
                                      <td style="font-size:0;height:55px;vertical-align:middle;width:55px;">
                                        <a href="https://www.facebook.com/casaludica.com.br" target="_blank">
                                          <img height="55" src="https://casaludica.com.br/wp-content/uploads/2024/04/facebook.png" style="border-radius:3px;display:block;" width="55" />
                                        </a>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <!--[if mso | IE]></td><td><![endif]-->
                        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                          <tbody>
                            <tr>
                              <td style="padding:4px;vertical-align:middle;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:3px;width:55px;">
                                  <tbody>
                                    <tr>
                                      <td style="font-size:0;height:55px;vertical-align:middle;width:55px;">
                                        <a href="https://www.youtube.com/@casaludica6482" target="_blank">
                                          <img height="55" src="https://casaludica.com.br/wp-content/uploads/2024/04/youtube.png" style="border-radius:3px;display:block;" width="55" />
                                        </a>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <!--[if mso | IE]></td></tr></table><![endif]-->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="#363775" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="background:#363775;background-color:#363775;margin:0px auto;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#363775;background-color:#363775;width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                  <tbody>
                    <tr>
                      <td style="font-size:0px;word-break:break-word;">
                        <div style="height:20px;line-height:20px;">&#8202;</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><![endif]-->
  </div>
</body>

</html>
`
