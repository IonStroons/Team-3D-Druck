const helper = require("../helper.js");
const DruckerDao = require("../dao/druckerDao.js");
const express = require("express");
var serviceRouter = express.Router();

console.log('- Service drucker');

serviceRouter.get("/drucker/gib/:id", function(request, response) {
    console.log("Service drucker: Client requested one record, id=" + request.params.id);

    const druckerDao = new DruckerDao(request.app.locals.dbConnection);
    try {
        var obj = druckerDao.loadById(request.params.id);
        console.log("Service drucker: Record loaded");
        response.status(200).json(obj);
    } catch (ex) {
        console.error("Service drucker: Error loading record by id. Exception occured: " + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get("/drucker/alle", function(request, response) {
    console.log("Service drucker: Client requested all records");

    const druckerDao = new DruckerDao(request.app.locals.dbConnection);
    try {
        var arr = druckerDao.loadAll();
        console.log("Service drucker: Records loaded, count=" + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error("Service drucker: Error loading all records. Exception occured: " + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get("/drucker/existiert/:id", function(request, response) {
    console.log("Service drucker: Client requested check, if record exists, id=" + request.params.id);

    const druckerDao = new DruckerDao(request.app.locals.dbConnection);
    try {
        var exists = druckerDao.exists(request.params.id);
        console.log("Service drucker: Check if record exists by id=" + request.params.id + ", exists=" + exists);
        response.status(200).json({'id': request.params.id, 'existiert': exists});
    } catch (ex) {
        console.error("Service drucker: Error checking if record exists. Exception occured: " + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.post("/drucker", function(request, response) {
    console.log("Service drucker: Client requested creation of new record");

    var errorMsgs=[];
    if (helper.isUndefined(request.body.typ)) 
        errorMsgs.push("Typ fehlt");
    if (helper.isUndefined(request.body.drucker)) 
        errorMsgs.push("Drucker fehlt");
    
    if (errorMsgs.length > 0) {
        console.log("Service drucker: Creation not possible, data missing");
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const druckerDao = new DruckerDao(request.app.locals.dbConnection);
    try {
        var obj = druckerDao.create(request.body.typ, request.body.drucker);
        console.log("Service drucker: Record inserted");
        response.status(200).json(obj);
    } catch (ex) {
        console.error("Service drucker: Error creating new record. Exception occured: " + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.put("/drucker", function(request, response) {
    console.log("Service drucker: Client requested update of existing record");

    var errorMsgs=[];
    if (helper.isUndefined(request.body.id)) 
        errorMsgs.push("id fehlt");
    if (helper.isUndefined(request.body.typ)) 
        errorMsgs.push("Typ fehlt");
    if (helper.isUndefined(request.body.drucker)) 
        errorMsgs.push("Drucker fehlt");
    
    if (errorMsgs.length > 0) {
        console.log("Service drucker: Creation not possible, data missing");
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const druckerDao = new DruckerDao(request.app.locals.dbConnection);
    try {
        var obj = druckerDao.update(request.body.id, request.body.typ, request.body.drucker);
        console.log("Service drucker: Record updated, id=" + request.body.id);
        response.status(200).json(obj);
    } catch (ex) {
        console.error("Service drucker: Error updating record by id. Exception occured: " + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.delete("/drucker/:id", function(request, response) {
    console.log("Service drucker: Client requested deletion of record, id=" + request.params.id);

    const druckerDao = new DruckerDao(request.app.locals.dbConnection);
    try {
        var obj = druckerDao.loadById(request.params.id);
        druckerDao.delete(request.params.id);
        console.log("Service drucker: Deletion of record successfull, id=" + request.params.id);
        response.status(200).json({ 'gelöscht': true, 'eintrag': obj });
    } catch (ex) {
        console.error("Service drucker: Error deleting record. Exception occured: " + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

module.exports = serviceRouter;