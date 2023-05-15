const helper = require('../helper.js');
const express = require('express');
var serviceRouter = express.Router();

console.log('- Service DateiUploadEinzeln');

serviceRouter.post('/dateiuploadeinzeln', async(request, objponse) => {
    console.log('Service DateiUploadEinzeln called');

    try {

        // if no files received, send error
        if (!request.files) {
            console.log('no file transmitted, nothing to do');
            objponse.status(400).json({'fehler': true, 'nachricht': 'Keine Dateien aufgeladen'});
        } else {

            // get handle on file info, in this example is 'myFile' the HTML Field Name
            var myFile = request.files.myFile;
            console.log(myFile);

            // if we want to save the file physically in a directory (/files) on the server, we can use the 'mv' (move) function
            // if target directory is not existent, it is created automatically
            // keep in mind that the files have to use unique file names, otherwise they are overwritten!
            console.log('saving file to target directory on server');

            //Datei in files Ordner ablegen
            myFile.mv('./files/' + myFile.name);

            
            /////////////////////////////////////////////////////////
            // do anything what you want with this data
            /////////////////////////////////////////////////////////


            console.log('creating response');
            var obj = {
                status: true,
                fileSaved: false,
                fileName: myFile.name,
                fileSize: myFile.size,
                fileMimeType: myFile.mimetype,
                fileEncoding: myFile.encoding
            };

            // send objponse
            objponse.status(200).json(obj);
        }
        

    } catch (err) {
        objponse.status(400).json({'fehler': true, 'nachricht': 'Fehler im Service'});
    }
    
});

module.exports = serviceRouter;