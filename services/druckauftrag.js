const helper = require("../helper.js");
const DruckauftragDao = require("../dao/druckauftragDao.js");
const express = require("express");
var serviceRouter = express.Router();

console.log('- Service druckauftrag');

serviceRouter.get("/druckauftrag/gib/:id", function(request, response) {
    console.log("Service druckauftrag: Client requested one record, id=" + request.params.id);

    const druckauftragDao = new DruckauftragDao(request.app.locals.dbConnection);
    try {
        var obj = druckauftragDao.loadById(request.params.id);
        console.log("Service druckauftrag: Record loaded");
        response.status(200).json(obj);
    } catch (ex) {
        console.error("Service druckauftrag: Error loading record by id. Exception occured: " + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get("/druckauftrag/alle", function(request, response) {
    console.log("Service druckauftrag: Client requested all records");

    const druckauftragDao = new DruckauftragDao(request.app.locals.dbConnection);
    try {
        var arr = druckauftragDao.loadAll();
        console.log("Service druckauftrag: Records loaded, count=" + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error("Service druckauftrag: Error loading all records. Exception occured: " + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get("/druckauftrag/existiert/:id", function(request, response) {
    console.log("Service druckauftrag: Client requested check, if record exists, id=" + request.params.id);

    const druckauftragDao = new DruckauftragDao(request.app.locals.dbConnection);
    try {
        var exists = druckauftragDao.exists(request.params.id);
        console.log("Service druckauftrag: Check if record exists by id=" + request.params.id + ", exists=" + exists);
        response.status(200).json({'id': request.params.id, 'existiert': exists});
    } catch (ex) {
        console.error("Service druckauftrag: Error checking if record exists. Exception occured: " + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.post("/druckauftrag", function(request, response) {
    console.log("Service druckauftrag: Client requested creation of new record");

    var errorMsgs=[];
    if (helper.isUndefined(request.body.kundenid)) 
        errorMsgs.push("Kundenid fehlt");
    if (helper.isUndefined(request.body.basket)) 
        errorMsgs.push("Basket fehlt");
    
    if (errorMsgs.length > 0) {
        console.log("Service druckauftrag: Creation not possible, data missing");
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const druckauftragDao = new DruckauftragDao(request.app.locals.dbConnection);
    try {
        var obj = druckauftragDao.create(request.body.kundenid, request.body.basket);
        console.log("Service druckauftrag: Record inserted");
        response.status(200).json(obj);
    } catch (ex) {
        console.error("Service druckauftrag: Error creating new record. Exception occured: " + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.put("/druckauftrag", function(request, response) {
    console.log("Service druckauftrag: Client requested update of existing record");

    var errorMsgs=[];
    if (helper.isUndefined(request.body.kundenid)) 
        errorMsgs.push("Kundenid fehlt");
    if (helper.isUndefined(request.body.basket)) 
        errorMsgs.push("Basket fehlt");
    
    if (errorMsgs.length > 0) {
        console.log("Service druckauftrag: Creation not possible, data missing");
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const druckauftragDao = new DruckauftragDao(request.app.locals.dbConnection);
    try {
        var obj = druckauftragDao.update(request.body.id, request.body.kundenid, request.body.basket);
        console.log("Service druckauftrag: Record updated, id=" + request.body.id);
        response.status(200).json(obj);
    } catch (ex) {
        console.error("Service druckauftrag: Error updating record by id. Exception occured: " + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.delete("/druckauftrag/:id", function(request, response) {
    console.log("Service druckauftrag: Client requested deletion of record, id=" + request.params.id);

    const druckauftragDao = new DruckauftragDao(request.app.locals.dbConnection);
    try {
        var obj = druckauftragDao.loadById(request.params.id);
        druckauftragDao.delete(request.params.id);
        console.log("Service druckauftrag: Deletion of record successfull, id=" + request.params.id);
        response.status(200).json({ 'gelöscht': true, 'eintrag': obj });
    } catch (ex) {
        console.error("Service druckauftrag: Error deleting record. Exception occured: " + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

module.exports = serviceRouter;