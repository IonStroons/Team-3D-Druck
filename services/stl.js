const NodeStl = require("node-stl");
const helper = require('../helper.js');
const MaterialDao = require("../dao/materialDao.js");
const express = require('express');
var serviceRouter = express.Router();

console.log('- Service stl');

serviceRouter.post('/stl/fdm', async(request, objponse) => {
    console.log('FDM Service stl called');

    try {
        //Verbindung zu DB herstellen und Material aus DB lesen
        const materialDao = new MaterialDao(request.app.locals.dbConnection);
        var material = materialDao.loadById(request.body.materialid);

        //Gelesene und Empfangene Daten in Variablen ablegen
        var dichte = material.masse;
        var filling = request.body.filling;
        var filename = request.body.filename;

        filePath = './files/' + filename;

        //Modul zur Berrechnung des Volumens aufrufen
        var stl = new NodeStl(filePath, {density:dichte});

        //Gewicht des Materials berrechnen
        var weight = (stl.weight*filling);

        //Preis des der Übergebenen Datei + Material berechenen
        var price = weight * material.preis;
        var price = price.toFixed(2);

        //Objekt erzeuegn, welches der Sender erhält
        console.log('creating response');
        var obj = {
            'price' : price
        };

        // send objponse
        objponse.status(200).json(obj);

    } catch (err) {
        objponse.status(400).json({'fehler': true, 'nachricht': 'Fehler im Service'});
    }
    
});

serviceRouter.post('/stl/sla', async(request, objponse) => {
    console.log('SLA Service stl called');

    try {
        //Verbindung zu DB herstellen und Material aus DB lesen
        const materialDao = new MaterialDao(request.app.locals.dbConnection);
        var material = materialDao.loadById(request.body.materialid);

        //Gelesene und Empfangene Daten in Variablen ablegen
        var dichte = material.masse;
        var filename = request.body.filename;

        filePath = './files/' + filename;

        //Modul zur Berrechnung des Volumens aufrufen
        var stl = new NodeStl(filePath, {density:dichte});

        //Gewicht des Materials berrechnen
        var weight = stl.weight;

        //Preis des der Übergebenen Datei + Material berechenen
        var price = weight * material.preis;
        var price = price.toFixed(2);

        //Objekt erzeuegn, welches der Sender erhält
        console.log('creating response');
        var obj = {
            'price' : price
        };

        // send objponse
        objponse.status(200).json(obj);

    } catch (err) {
        objponse.status(400).json({'fehler': true, 'nachricht': 'Fehler im Service'});
    }
    
});

serviceRouter.post('/stl/sls', async(request, objponse) => {
    console.log('SLS Service stl called');

    try {
        //Verbindung zu DB herstellen und Material aus DB lesen
        const materialDao = new MaterialDao(request.app.locals.dbConnection);
        var material = materialDao.loadById(request.body.materialid);

        //Gelesene und Empfangene Daten in Variablen ablegen
        var dichte = material.masse;
        var filename = request.body.filename;

        filePath = './files/' + filename;

        //Modul zur Berrechnung des Volumens aufrufen
        var stl = new NodeStl(filePath, {density:dichte});

        //Gewicht des Materials berrechnen
        var weight = stl.weight;

        //Preis des der Übergebenen Datei + Material berechenen
        var price = weight * material.preis;
        var price = price.toFixed(2);

        //Objekt erzeuegn, welches der Sender erhält
        console.log('creating response');
        var obj = {
            'price' : price
        };

        // send objponse
        objponse.status(200).json(obj);

    } catch (err) {
        objponse.status(400).json({'fehler': true, 'nachricht': 'Fehler im Service'});
    }
    
});

module.exports = serviceRouter;