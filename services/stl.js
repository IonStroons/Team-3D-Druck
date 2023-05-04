const NodeStl = require("node-stl");
const helper = require('../helper.js');
const express = require('express');
var serviceRouter = express.Router();

console.log('- Service stl');

serviceRouter.get('/stl', async(request, objponse) => {
    console.log('Service stl called');

    try {

        var stl = new NodeStl('./files/Benchy.stl', {density: 1.04});


        console.log('creating response');
        var obj = {
            volume: stl.volume + 'cm^3',
            weight: stl.weight + 'gm',
            boundingbox: stl.boundingBox,
            area: stl.area,
            centerofmass: stl.centerOfMass,
            iswatertight: stl.isWatertight
        };

        // send objponse
        objponse.status(200).json(obj);

    } catch (err) {
        objponse.status(400).json({'fehler': true, 'nachricht': 'Fehler im Service'});
    }
    
});

module.exports = serviceRouter;