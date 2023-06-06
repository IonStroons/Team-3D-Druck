const helper = require("../helper.js");
const BestellformularDao = require("../dao/bestellformularDao.js");
const express = require("express");
var serviceRouter = express.Router();

console.log('- Service bestellformular');

serviceRouter.get("/bestellformular/gib/:id", function(request, response) {
    console.log("Service bestellformular: Client requested one record, id=" + request.params.id);

    const bestellformularDao = new BestellformularDao(request.app.locals.dbConnection);
    try {
        var obj = bestellformularDao.loadById(request.params.id);
        console.log("Service bestellformular: Record loaded");
        response.status(200).json(obj);
    } catch (ex) {
        console.error("Service bestellformular: Error loading record by id. Exception occured: " + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get("/bestellformular/alle", function(request, response) {
    console.log("Service bestellformular: Client requested all records");

    const bestellformularDao = new BestellformularDao(request.app.locals.dbConnection);
    try {
        var arr = bestellformularDao.loadAll();
        console.log("Service bestellformular: Records loaded, count=" + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error("Service bestellformular: Error loading all records. Exception occured: " + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get("/bestellformular/existiert/:id", function(request, response) {
    console.log("Service bestellformular: Client requested check, if record exists, id=" + request.params.id);

    const bestellformularDao = new BestellformularDao(request.app.locals.dbConnection);
    try {
        var exists = bestellformularDao.exists(request.params.id);
        console.log("Service bestellformular: Check if record exists by id=" + request.params.id + ", exists=" + exists);
        response.status(200).json({'id': request.params.id, 'existiert': exists});
    } catch (ex) {
        console.error("Service bestellformular: Error checking if record exists. Exception occured: " + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.post("/bestellformular", function(request, response) {
    console.log("Service bestellformular: Client requested creation of new record");

    var errorMsgs=[];
    if (helper.isUndefined(request.body.name)) {
        errorMsgs.push("Nachname fehlt");
    } else if (request.body.name == '') {
        errorMsgs.push("Nachname fehlt");
    }

    if (helper.isUndefined(request.body.vorname)) {
        errorMsgs.push("Vorname fehlt");
    } else if (request.body.vorname == '') {
        errorMsgs.push("Vorname fehlt");
    }

    if (helper.isUndefined(request.body.email)) {
        errorMsgs.push("E-Mail fehlt");
    } else if (request.body.email == '') {
        errorMsgs.push("E-Mail fehlt");
    }
       
    if (helper.isUndefined(request.body.land)) {
        errorMsgs.push("Land fehlt");
    } else if (request.body.land == '') {
        errorMsgs.push("Land fehlt");
    }
        
    if (helper.isUndefined(request.body.ort)) {
        errorMsgs.push("Ort fehlt");
    } else if (request.body.ort == '') {
        errorMsgs.push("Ort fehlt");
    }
        
    if (helper.isUndefined(request.body.strasse_hausnummer)) {
        errorMsgs.push("Strasse/Hausnummer fehlt");
    } else if (request.body.strasse_hausnummer == '') {
        errorMsgs.push("Strasse/Hausnummer fehlt");
    }
       

    if (helper.isUndefined(request.body.tel)) {
        errorMsgs.push("tel fehlt");
    } else if (!helper.isNumeric(request.body.tel)) {
        errorMsgs.push("tel muss eine Zahl sein");
    } else if (request.body.tel <= 0) {
        errorMsgs.push("tel muss eine Zahl > 0 sein");
    } else if (request.body.tel == '') {
        errorMsgs.push("tel fehlt");
    }

    if (helper.isUndefined(request.body.plz)) {
        errorMsgs.push("plz fehlt");
    } else if (!helper.isNumeric(request.body.plz)) {
        errorMsgs.push("plz muss eine Zahl sein");
    } else if (request.body.plz <= 0) {
        errorMsgs.push("plz muss eine Zahl > 0 sein");
    } else if (request.body.plz == '') {
        errorMsgs.push("plz fehlt");
    }

    if (helper.isUndefined(request.body.basket)) 
        errorMsgs.push("Basket fehlt");
    
    if (errorMsgs.length > 0) {
        console.log("Service bestellformular: Creation not possible, data missing");
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const bestellformularDao = new BestellformularDao(request.app.locals.dbConnection);
    try {
        var obj = bestellformularDao.create(request.body.name, request.body.vorname, request.body.email, request.body.land, request.body.ort, request.body.strasse_hausnummer, request.body.tel, request.body.plz, request.body.hinweis, request.body.basket);
        console.log("Service bestellformular: Record inserted");
        response.status(200).json(obj);
    } catch (ex) {
        console.error("Service bestellformular: Error creating new record. Exception occured: " + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.put("/bestellformular", function(request, response) {
    console.log("Service bestellformular: Client requested update of existing record");

    var errorMsgs=[];
    if (helper.isUndefined(request.body.id)) {
        errorMsgs.push("id fehlt");
    }
    
    if (helper.isUndefined(request.body.name)) {
        errorMsgs.push("Nachname fehlt");
    } else if (request.body.name == '') {
        errorMsgs.push("Nachname fehlt");
    }

    if (helper.isUndefined(request.body.vorname)) {
        errorMsgs.push("Vorname fehlt");
    } else if (request.body.vorname == '') {
        errorMsgs.push("Vorname fehlt");
    }

    if (helper.isUndefined(request.body.email)) {
        errorMsgs.push("E-Mail fehlt");
    } else if (request.body.email == '') {
        errorMsgs.push("E-Mail fehlt");
    }
        
    if (helper.isUndefined(request.body.land)) {
        errorMsgs.push("Land fehlt");
    } else if (request.body.land == '') {
        errorMsgs.push("Land fehlt");
    }
        
    if (helper.isUndefined(request.body.ort)) {
        errorMsgs.push("Ort fehlt");
    } else if (request.body.ort == '') {
        errorMsgs.push("Ort fehlt");
    }
        
    if (helper.isUndefined(request.body.strasse_hausnummer)) {
        errorMsgs.push("Strasse/Hausnummer fehlt");
    } else if (request.body.strasse_hausnummer == '') {
        errorMsgs.push("Strasse/Hausnummer fehlt");
    }
        

    if (helper.isUndefined(request.body.tel)) {
        errorMsgs.push("tel fehlt");
    } else if (!helper.isNumeric(request.body.tel)) {
        errorMsgs.push("tel muss eine Zahl sein");
    } else if (request.body.tel <= 0) {
        errorMsgs.push("tel muss eine Zahl > 0 sein");
    } else if (request.body.tel == '') {
        errorMsgs.push("tel fehlt");
    }

    if (helper.isUndefined(request.body.plz)) {
        errorMsgs.push("plz fehlt");
    } else if (!helper.isNumeric(request.body.plz)) {
        errorMsgs.push("plz muss eine Zahl sein");
    } else if (request.body.plz <= 0) {
        errorMsgs.push("plz muss eine Zahl > 0 sein");
    } else if (request.body.plz == '') {
        errorMsgs.push("plz fehlt");
    }

    if (helper.isUndefined(request.body.basket)) 
        errorMsgs.push("Basket fehlt");
    
    if (errorMsgs.length > 0) {
        console.log("Service bestellformular: Creation not possible, data missing");
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const bestellformularDao = new BestellformularDao(request.app.locals.dbConnection);
    try {
        var obj = bestellformularDao.update(request.body.id, request.body.name, request.body.vorname, request.body.email, request.body.land, request.body.ort, request.body.strasse_hausnummer, request.body.tel, request.body.plz, request.body.hinweis, request.body.basket);
        console.log("Service bestellformular: Record updated, id=" + request.body.id);
        response.status(200).json(obj);
    } catch (ex) {
        console.error("Service bestellformular: Error updating record by id. Exception occured: " + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.delete("/bestellformular/:id", function(request, response) {
    console.log("Service bestellformular: Client requested deletion of record, id=" + request.params.id);

    const bestellformularDao = new BestellformularDao(request.app.locals.dbConnection);
    try {
        var obj = bestellformularDao.loadById(request.params.id);
        bestellformularDao.delete(request.params.id);
        console.log("Service bestellformular: Deletion of record successfull, id=" + request.params.id);
        response.status(200).json({ 'gelöscht': true, 'eintrag': obj });
    } catch (ex) {
        console.error("Service bestellformular: Error deleting record. Exception occured: " + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

module.exports = serviceRouter;