const datosPersonales = require('./datos.json');
const puppeteer = require('puppeteer');
const { PendingXHR } = require('pending-xhr-puppeteer');    // https://www.npmjs.com/package/pending-xhr-puppeteer

module.exports = () => {
	(async () => {
		console.log("en el modulo");
		const browser = await puppeteer.launch( { executablePath: '/usr/bin/chromium' });   // agregar lo de headless...

		const page = await browser.newPage();
		const pendingXHR = new PendingXHR(page);

		// Ir a la pagina inicial y seleccionar el lugar y el tramite
		await page.goto('https://agendaweb.udelar.edu.uy');
		await pendingXHR.waitForAllXhrFinished();
		await page.select("#formSeleccion\\:agendas", "FING")   //  HAY QUE ESCAPAR A LOS CARACTERES ESPECIALES LPM "\"
		await pendingXHR.waitForAllXhrFinished();
		await page.select("#formSeleccion\\:recursos > select", "BibliotecaSalaDeLectura")
		await pendingXHR.waitForAllXhrFinished();
		await Promise.all([
			page.waitForNavigation(),
			page.click("#formSeleccion\\:linkAgendarReserva")
		])
		await pendingXHR.waitForAllXhrFinished();

		// traigo todos los elementos que tienen la clase diaConCupo (o sea son días del calendario disponibles)
		let texts = await page.evaluate(() => {
			let data = [];
			let elements = document.getElementsByClassName('diaConCupo');
			for (var element of elements) {
				var datos = { id: element.id, contenido: parseInt(element.textContent) };
				data.push(datos);
			}
			return data;
		});
		texts.forEach(dia => console.log("id: " + dia.id + " contenido: " + dia.contenido ));
		// acá busco el dia disponible mas cercano (la agenda no disponibiliza días ya pasados)
		var contenido = texts.reduce((min, p) => p.contenido < min ? p.contenido : min, texts[0].contenido);
		var res = "#" + texts.find(element => element.contenido = contenido).id;
		console.log(res);

		await Promise.all([
			page.waitForNavigation(),
			await page.click(res)
		])
		await pendingXHR.waitForAllXhrFinished();


		// elijo opción matutina:
		await Promise.all([
			page.waitForNavigation(),
			await page.click("#tablaMatutina\\:0\\:linkReservarMatutina")
		])

		await pendingXHR.waitForAllXhrFinished();
		//	ingreso mis datos:
		console.log(datosPersonales);
		await page.type("#ci", datosPersonales.CedulaSinDigito);
		await page.type("#digito", datosPersonales.DigitoVerificador);
		await page.type("#ape", datosPersonales.Apellido);
		await page.type("#nom", datosPersonales.Nombre);
		await page.type("#tel", datosPersonales.Telefono);
		await page.type("#mail", datosPersonales.Email);
		await page.type("#horario", datosPersonales.Horario);

		await page.click("#botonConfirmar")
		await pendingXHR.waitForAllXhrFinished();

		await page.screenshot({ path: "evidencia.jpg" });
		await browser.close();
	})();
};
