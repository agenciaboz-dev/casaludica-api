import { User } from "../../class/User"

export const novaContaClienteString = (user: User) =>
    `
Olá ${user.name},
Estamos super empolgados em te dar as boas-vindas à Casa Lúdica! Sua conta foi criada com sucesso e agora você faz parte da nossa comunidade de entusiastas e aventureiros em busca das melhores experiências.
Aqui na Casa Lúdica, você encontrará tudo o que precisa para tornar cada dia mais especial e divertido. De brinquedos a livros, garantimos que há sempre algo novo para explorar.
Para começar sua jornada, por que não dar uma olhada em nossas novidades?
https://lojas.casaludica.com.br
Se tiver alguma dúvida ou precisar de ajuda, estamos aqui para você. Basta nos enviar uma mensagem!
`

export const novaContaCliente = (user: User) =>
    `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Bem-Vindo à Casa Lúdica!</title>
<style type="text/css">
	/* FONTS  */
	@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
	/* CSS  */
	body {
		margin: 0;
	}
	table {
		border-spacing: 0;
	}
	td {
		padding: 0;
	}
	img {
		border: 0;
	}
	body{
		background-color: #363775;
	}
	.wrapper{
		width: 100%;
		table-layout: fixed;
		padding: 60px 0px;
	}
	.main{
		width: 100%;
		max-width: 600px;
		background-color: #fff;
		font-family: 'Poppins', sans-serif;
		color: #282828;
		border-radius:15px;
		overflow: hidden;
		text-align: center;
		box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
	}
	.social{
		width: 55px;
	}
	.social-media{
		padding: 15% 0px 15% 62px;
	}
	.two-columns{
		font-size: 0;
		text-align: center;
	}
	.two-columns .column{
		width: 100%;
		max-width: 300px;
		display: inline-block;
		vertical-align: top;
	}
	.product-column .product-img{

	}
	.product-column .product-info{

	}
	h3{
		font-family: 'Poppins', sans-serif;
		font-size: 28px;
		font-weight: 500!important;
		margin: 0 0 15px;
		text-align: left;
	}
	h4{
		font-family: 'Poppins', sans-serif;
		font-size: 17px;
		font-weight: 500!important;
		margin: 0;
		text-align: left;
		text-overflow: ellipsis!important;
	}
	h5{
		font-family: 'Poppins', sans-serif;
		font-size: 14px;
		font-weight: 500!important;
		margin: 0;
	}
	p{
		line-height: 23px;
		font-size: 15px;
		padding: 5px 0 1px;
		text-align: justify;
	}
	span{
		line-height: 18px;
		font-size: 12px;
		padding: 0;
		text-align: left;
	}
	.button{
		background-color: #282828;
		font-family: 'Poppins', sans-serif;
		color: #fff!important;
		text-decoration: none;
		padding: 10px 15px;
	}
	a{
		color: #363775!important;
		font-weight: 600;
	}
	.footer{
		background-color: #fff;
		font-size: 0;
	}
	.img-logo{
		width: 120px;
	}
	.product-table-header {
		padding:0;
		vertical-align: top;
		text-align: center;
	}
	.product-table{
		vertical-align: middle;
		padding:10px 0px;
	}
	@media only screen and (max-width: 650px) {
		.social-media{
			padding: 0px  25px;
		}
		.img-logo{
			width: 220px;
			padding: 0;
			margin: 0;
		}
	}

</style>
</head>
<body>

	<center class="wrapper">

		<table class="main" width="100%">
		
		<!-- LOGO & SOCIAL MEDIA SECTION -->
			<tr>
				<td style="padding: 14px 0 4px;">
					<table width="100%">

						<tr>
							<td class="two-columns">

								<table class="column">
									<tr>
										<td style="padding: 10px 22px 10px;">
											<a href="https://casaludica.com.br/"><img src="https://casaludica.com.br/wp-content/uploads/2022/10/logo.png" alt="Casa Lúdica - Logo" title="Casa Lúdica" class="img-logo"></a>
										</td>
									</tr>
								</table>

								<table class="column">
									<tr>
										<td class="social-media">
											<a href="https://api.whatsapp.com/send?phone=5547991684299&text=Ol%C3%A1,%20Casa%20L%C3%BAdica!" target="_blank">
												<img class="social" src="https://casaludica.com.br/wp-content/uploads/2024/04/whatsapp.png" alt="WhatsApp">
											</a>	
								   
											<a href="https://www.instagram.com/casaludica" target="_blank">
												<img class="social" src="https://casaludica.com.br/wp-content/uploads/2024/04/instagram.png" alt="Instagram">
											</a>	
								   
											<a href="https://www.facebook.com/casaludica.com.br" target="_blank">
												<img class="social" src="https://casaludica.com.br/wp-content/uploads/2024/04/facebook.png" alt="Facebook">
											</a>	
									 
											<a href="https://www.youtube.com/@casaludica6482" target="_blank">
												<img class="social" src="https://casaludica.com.br/wp-content/uploads/2024/04/youtube.png" alt="Youtube">
											</a>
										</td>
									</tr>
								</table>
							</td>
						</tr>

					</table>
				</td>
			</tr>
					
		<!-- BANNER IMAGE -->

		<!-- TITLE, TEXT & BUTTON -->
			
			<tr>
				<td style="padding: 20px 35px 0px;">
					<table width="100%">

						<tr>
							<td>
								<h3>Bem-Vindo à Casa Lúdica!</h3>
								<p style="text-align: left;">
									Olá ${user.name},
								</p>
								<p>
									Estamos super empolgados em te dar as boas-vindas à Casa Lúdica! Sua conta foi criada com sucesso e agora você faz parte da nossa comunidade de entusiastas e aventureiros em busca das melhores experiências.
								</p>
								<p>
									Aqui na Casa Lúdica, você encontrará tudo o que precisa para tornar cada dia mais especial e divertido. De brinquedos a livros, garantimos que há sempre algo novo para explorar.
								</p>
								<p>
									Para começar sua jornada, por que não dar uma olhada em nossas novidades? <a href="https://lojas.casaludica.com.br">Acesse agora!</a>
								</p>
								<p>
									Se tiver alguma dúvida ou precisar de ajuda, estamos aqui para você. Basta nos enviar uma mensagem!
								</p>
							</td>
						</tr>	
						<tr>
							<td>
								<p>
									Agradecemos por se juntar a nós. Prepare-se para descobertas incríveis!
								</p>
								<p>
									Atenciosamente,<br>
									Equipe Casa Lúdica
								</p>
							</td>
						</tr>	
					</table>
				</td>
			</tr>

		<!-- BORDER -->
					
		<!-- THREE COLUMN SECTION -->
					
		<!-- BORDER -->
					
		<!-- TWO COLUMN SECTION -->
					
		<!-- FOOTER SECTION -->

			<tr>
				<td class="footer">
					<table width="100%">

						<td style="padding: 45px 20px;">
							<a href="https://casaludica.com.br/"><img src="https://casaludica.com.br/wp-content/uploads/2022/10/logo.png" alt="Casa Lúdica - Logo" title="Casa Lúdica" width="160"></a>
								<p style="text-align: center; font-size: 10px;">
									Somos uma loja de brinquedos que ama o que faz, especializada em Brinquedos Educativos, Instrumentos Musicais, Playgrounds e Mobiliários, Materiais Pedagógicos, Jogos e Desafios, Espumados Babys
								</p>	
								<p style="text-align: center; font-size: 10px;">
									Rua 1950, número 720, sala 02 Centro - Balneário Camboriú - SC, 88330-474
								</p>	
							<a href="https://api.whatsapp.com/send?phone=5547991684299&text=Ol%C3%A1,%20Casa%20L%C3%BAdica!" target="_blank">
								<img class="social" src="https://casaludica.com.br/wp-content/uploads/2024/04/whatsapp.png" alt="WhatsApp">
							</a>	
				   
							<a href="https://www.instagram.com/casaludica/" target="_blank">
								<img class="social" src="https://casaludica.com.br/wp-content/uploads/2024/04/instagram.png" alt="Instagram">
							</a>	
				   
							<a href="https://www.facebook.com/casaludica.com.br" target="_blank">
								<img class="social" src="https://casaludica.com.br/wp-content/uploads/2024/04/facebook.png" alt="Facebook">
							</a>	
					 
							<a href="https://www.youtube.com/@casaludica6482" target="_blank">
								<img class="social" src="https://casaludica.com.br/wp-content/uploads/2024/04/youtube.png" alt="Youtube">
							</a>
							
						</td>

					</table>
				</td>
			</tr>

			

		</table> <!-- End Main Class -->

	</center> <!-- End Wrapper -->

</body>
</html>
`
