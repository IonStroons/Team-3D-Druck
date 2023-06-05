$(document).ready(function() {
    console.log('Document ready, loading data from Service');

    //Laden aller Drucker und Ausfilter nach Drucktyp
    $.ajax({
        url: 'http://localhost:8000/api/drucker/alle',
        method: 'get',
        contentType: 'application/json; charset=utf-8',
        cache: false,
        dataType: 'json'
    }).done(function (response) {
        console.log('Data loaded successfully');
        console.log(response);
            
        //Selectfeld erstellen
        var select = $('<select id="sls_printer_selection" onchange="calculate_price()">');
        
        //Über komplette Response aller Drucker gehen
        for (i = 0; i < response.length; i++) {
            // Objekt aus array holen
            var obj = response[i];

            //Drucker ausfiltern die zu gesuchtem Typ gehören
            if (obj.typ == "sls"){
                // option erstellen und die id als Value anhängen
                option = $('<option>');
                option.prop('value', obj.id);
                option.text(obj.drucker);
                select.append(option);
            }
        }

        // zusammengesetzen Code / objekt ans dokument anhängen
        $('#sls_printer').append(select);
        
    }).fail(function (jqXHR, statusText, error) {
        console.log('Error occured');
        console.log('Response Code: ' + jqXHR.status + ' - Message: ' + jqXHR.responseText);
        alert(jqXHR.responseText);
    });



    //Laden aller Materialien und Ausfilter nach Drucktyp
    $.ajax({
        url: 'http://localhost:8000/api/material/alle',
        method: 'get',
        contentType: 'application/json; charset=utf-8',
        cache: false,
        dataType: 'json'
    }).done(function (response) {
        console.log('Data loaded successfully');
        console.log(response);
        
        //Selectfeld erstellen
        var select = $('<select id="sls_material_selection" onchange="calculate_price()">');
        
        //Über komplette Response aller Materialien gehen
        for (i = 0; i < response.length; i++) {
            // Objekt aus array holen
            var obj = response[i];

            //Materialien ausfilern die zu gesuchtem Typ gehören
            if (obj.typ == "sls"){
                // option erstellen und die id als Value anhängen
                option = $('<option>');
                option.prop('value', obj.id);
                option.text(obj.material);
                select.append(option);
            }
        }

        // zusammengesetzen Code / objekt ans dokument anhängen
        $('#sls_material').append(select);
        
    }).fail(function (jqXHR, statusText, error) {
        console.log('Error occured');
        console.log('Response Code: ' + jqXHR.status + ' - Message: ' + jqXHR.responseText);
        alert(jqXHR.responseText);
    });

    //Stadtardbild für STLViewer laden
    stl_viewer=new StlViewer
    (
        document.getElementById("stl_cont"),
        {
            models:
            [
                {filename:"example.stl", display:"smooth", animation:{delta:{rotationy:1, msec:1000, loop:true}}},
            ]
        }
    );
});

/* Funktionen für Preis berechnen */
function calculate_price() {
    console.log('change detekted calculation new Price');
    //Hochgeladenene Datei in eine Variable ablegen
    var filePath = document.getElementById('myFile').value;
    var filePathSplitt = filePath.split('\\');
    var fileName = filePathSplitt[(filePathSplitt.length)-1];

    //Ausgewählte optionenen in Variablenen ablegen
    var materialid = document.querySelector("#sls_material_selection").value;
    //console.log(materialid);
    //Objekt erzeuegen mit ausgewählten Optionen für Preisberechnung auf Server
    var obj = {'materialid': materialid, 'filename' : fileName};
    
    //Preisberechungsservice auf Server aufrufen und das erstellte Objekt übergeben
    $.ajax({
        url: 'http://localhost:8000/api/stl/sls',
        method: 'post',
        contentType: 'application/json; charset=utf-8',
        cache: false,
        data: JSON.stringify(obj)
    }).done(function (response) {
        console.log(response);
        //$('#output').html(JSON.stringify(response));
        $('#Preis').html('<label id="preisValue" value="'+ response.price +'">'+ response.price +' €</label>');
    }).fail(function (jqXHR, statusText, error) {
        console.log('Response Code: ' + jqXHR.status + ' - Fehlermeldung: ' + jqXHR.responseText);
        console.log('Ein Fehler ist aufgetreten');
    });
};