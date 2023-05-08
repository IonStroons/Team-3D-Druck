const helper = require("../helper.js");
const NewsletterDao = require("../dao/newsletterDao.js");
const express = require("express");
var serviceRouter = express.Router();

console.log('- Service newsletter');

serviceRouter.get("/newsletter/gib/:id", function(request, response) {
    console.log("Service newsletter: Client requested one record, id=" + request.params.id);

    const newsletterDao = new NewsletterDao(request.app.locals.dbConnection);
    try {
        var obj = newsletterDao.loadById(request.params.id);
        console.log("Service newsletter: Record loaded");
        response.status(200).json(obj);
    } catch (ex) {
        console.error("Service newsletter: Error loading record by id. Exception occured: " + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get("/newsletter/alle", function(request, response) {
    console.log("Service newsletter: Client requested all records");

    const newsletterDao = new NewsletterDao(request.app.locals.dbConnection);
    try {
        var arr = newsletterDao.loadAll();
        console.log("Service newsletter: Records loaded, count=" + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error("Service newsletter: Error loading all records. Exception occured: " + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get("/newsletter/existiert/:id", function(request, response) {
    console.log("Service newsletter: Client requested check, if record exists, id=" + request.params.id);

    const newsletterDao = new NewsletterDao(request.app.locals.dbConnection);
    try {
        var exists = newsletterDao.exists(request.params.id);
        console.log("Service newsletter: Check if record exists by id=" + request.params.id + ", exists=" + exists);
        response.status(200).json({'id': request.params.id, 'existiert': exists});
    } catch (ex) {
        console.error("Service newsletter: Error checking if record exists. Exception occured: " + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.post("/newsletter", function(request, response) {
    console.log("Service newsletter: Client requested creation of new record");

    var errorMsgs=[];
    if (helper.isUndefined(request.body.email)) 
        errorMsgs.push("Email fehlt");
    
    if (errorMsgs.length > 0) {
        console.log("Service newsletter: Creation not possible, data missing");
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const newsletterDao = new NewsletterDao(request.app.locals.dbConnection);
    try {
        var obj = newsletterDao.create(request.body.email);
        console.log("Service newsletter: Record inserted");
        response.status(200).json(obj);
    } catch (ex) {
        console.error("Service newsletter: Error creating new record. Exception occured: " + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.put("/newsletter", function(request, response) {
    console.log("Service newsletter: Client requested update of existing record");

    var errorMsgs=[];
    if (helper.isUndefined(request.body.id)) 
        errorMsgs.push("id fehlt");
    if (helper.isUndefined(request.body.email)) 
        errorMsgs.push("Email fehlt");
    
    if (errorMsgs.length > 0) {
        console.log("Service newsletter: Creation not possible, data missing");
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const newsletterDao = new NewsletterDao(request.app.locals.dbConnection);
    try {
        var obj = newsletterDao.update(request.body.id, request.body.email);
        console.log("Service newsletter: Record updated, id=" + request.body.id);
        response.status(200).json(obj);
    } catch (ex) {
        console.error("Service newsletter: Error updating record by id. Exception occured: " + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.delete("/newsletter/:id", function(request, response) {
    console.log("Service newsletter: Client requested deletion of record, id=" + request.params.id);

    const newsletterDao = new NewsletterDao(request.app.locals.dbConnection);
    try {
        var obj = newsletterDao.loadById(request.params.id);
        newsletterDao.delete(request.params.id);
        console.log("Service newsletter: Deletion of record successfull, id=" + request.params.id);
        response.status(200).json({ 'gelöscht': true, 'eintrag': obj });
    } catch (ex) {
        console.error("Service newsletter: Error deleting record. Exception occured: " + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

module.exports = serviceRouter;