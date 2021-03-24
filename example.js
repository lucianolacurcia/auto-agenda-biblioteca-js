const puppeteer = require('puppeteer');
const { PendingXHR } = require('pending-xhr-puppeteer');    // https://www.npmjs.com/package/pending-xhr-puppeteer

(async () => {
    const browser = await puppeteer.launch();   // agregar lo de headless...
    const page = await browser.newPage();
    const pendingXHR = new PendingXHR(page);

    // Ir a la pagina inicial y seleccionar el lugar y el tramite
    await page.goto('https://agendaweb.udelar.edu.uy');
    await pendingXHR.waitForAllXhrFinished();
    await page.select("#formSeleccion\\:agendas", "FING")   //  HAY QUE ESCAPAR A LOS CARACTERES ESPECIALES LPM "\"
    await pendingXHR.waitForAllXhrFinished();
    await page.select("#formSeleccion\\:recursos > select", "BibliotecaSalaDeLectura")
    await pendingXHR.waitForAllXhrFinished();
    await page.click("#formSeleccion\\:linkAgendarReserva")

    await pendingXHR.waitForAllXhrFinished();
    //  Seleccionar el siguiente día disponible para agendarse.
    const data = await page.evaluate(() => {
        var tds = [];
        for (var i = 0; i < 29; i++) {
            var diaCalendario = '#calendarioDayCell' + i
            console.log(diaCalendario)
            tds.push(document.querySelectorAll(diaCalendario))   
        }
        return tds.map(td => td.innerText)
    });

    //You will now have an array of strings
    //[ 'One', 'Two', 'Three', 'Four' ]
    console.log(data);
    //One
    console.log(data[0]);
    await browser.close();


    await page.screenshot({ path: 'example.png' });



    await browser.close();
})();
