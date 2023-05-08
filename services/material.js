const helper = require("../helper.js");
const MaterialDao = require("../dao/materialDao.js");
const express = require("express");
var serviceRouter = express.Router();

console.log('- Service material');

serviceRouter.get("/material/gib/:id", function(request, response) {
    console.log("Service material: Client requested one record, id=" + request.params.id);

    const materialDao = new MaterialDao(request.app.locals.dbConnection);
    try {
        var obj = materialDao.loadById(request.params.id);
        console.log("Service material: Record loaded");
        response.status(200).json(obj);
    } catch (ex) {
        console.error("Service material: Error loading record by id. Exception occured: " + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get("/material/alle", function(request, response) {
    console.log("Service material: Client requested all records");

    const materialDao = new MaterialDao(request.app.locals.dbConnection);
    try {
        var arr = materialDao.loadAll();
        console.log("Service material: Records loaded, count=" + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error("Service material: Error loading all records. Exception occured: " + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get("/material/existiert/:id", function(request, response) {
    console.log("Service material: Client requested check, if record exists, id=" + request.params.id);

    const materialDao = new MaterialDao(request.app.locals.dbConnection);
    try {
        var exists = materialDao.exists(request.params.id);
        console.log("Service material: Check if record exists by id=" + request.params.id + ", exists=" + exists);
        response.status(200).json({'id': request.params.id, 'existiert': exists});
    } catch (ex) {
        console.error("Service material: Error checking if record exists. Exception occured: " + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.post("/material", function(request, response) {
    console.log("Service material: Client requested creation of new record");

    var errorMsgs=[];
    if (helper.isUndefined(request.body.typ)) 
        errorMsgs.push("Typ fehlt");
    if (helper.isUndefined(request.body.material)) 
        errorMsgs.push("Material fehlt");
    if (helper.isUndefined(request.body.masse)) 
        errorMsgs.push("Masse fehlt");
    if (helper.isUndefined(request.body.preis)) 
    errorMsgs.push("Masse fehlt");
    
    if (errorMsgs.length > 0) {
        console.log("Service material: Creation not possible, data missing");
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const materialDao = new MaterialDao(request.app.locals.dbConnection);
    try {
        var obj = materialDao.create(request.body.typ, request.body.material, request.body.masse, request.body.preis);
        console.log("Service material: Record inserted");
        response.status(200).json(obj);
    } catch (ex) {
        console.error("Service material: Error creating new record. Exception occured: " + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.put("/material", function(request, response) {
    console.log("Service material: Client requested update of existing record");

    var errorMsgs=[];
    if (helper.isUndefined(request.body.id)) 
        errorMsgs.push("id fehlt");
    if (helper.isUndefined(request.body.typ)) 
        errorMsgs.push("Typ fehlt");
    if (helper.isUndefined(request.body.material)) 
        errorMsgs.push("Material fehlt");
    if (helper.isUndefined(request.body.masse)) 
        errorMsgs.push("Masse fehlt");
    if (helper.isUndefined(request.body.preis)) 
    errorMsgs.push("Masse fehlt");
    
    if (errorMsgs.length > 0) {
        console.log("Service material: Creation not possible, data missing");
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const materialDao = new MaterialDao(request.app.locals.dbConnection);
    try {
        var obj = materialDao.update(request.body.id, request.body.typ, request.body.material, request.body.masse, request.body.preis);
        console.log("Service material: Record updated, id=" + request.body.id);
        response.status(200).json(obj);
    } catch (ex) {
        console.error("Service material: Error updating record by id. Exception occured: " + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.delete("/material/:id", function(request, response) {
    console.log("Service material: Client requested deletion of record, id=" + request.params.id);

    const materialDao = new MaterialDao(request.app.locals.dbConnection);
    try {
        var obj = materialDao.loadById(request.params.id);
        materialDao.delete(request.params.id);
        console.log("Service material: Deletion of record successfull, id=" + request.params.id);
        response.status(200).json({ 'gelöscht': true, 'eintrag': obj });
    } catch (ex) {
        console.error("Service material: Error deleting record. Exception occured: " + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

module.exports = serviceRouter;