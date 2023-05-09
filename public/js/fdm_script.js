$(document).ready(function() {
    console.log('Document ready, loading data from Service');

    $.ajax({
        url: 'http://localhost:8000/api/drucker/alle',
        method: 'get',
        contentType: 'application/json; charset=utf-8',
        cache: false,
        dataType: 'json'
    }).done(function (response) {
        console.log('Data loaded successfully');
        console.log(response);
            
        // unterobjekte erstellen
        var select = $('<select id="fdm_printer_selection" onchange="calculate_price()">');
            
        for (i = 0; i < response.length; i++) {
            // Objekt aus array holen
            var obj = response[i];

            if (obj.typ == "fdm"){
                // option erstellen
                option = $('<option>');
                option.prop('value', obj.id);
                option.text(obj.drucker);
                select.append(option);
            }
        }

        // zusammengesetzen Code / objekt ans dokument anhängen
        $('#fdm_printer').append(select);
        
    }).fail(function (jqXHR, statusText, error) {
        console.log('Error occured');
        console.log('Response Code: ' + jqXHR.status + ' - Message: ' + jqXHR.responseText);
        alert(jqXHR.responseText);
    });



    //Laden der Materialien
    $.ajax({
        url: 'http://localhost:8000/api/material/alle',
        method: 'get',
        contentType: 'application/json; charset=utf-8',
        cache: false,
        dataType: 'json'
    }).done(function (response) {
        console.log('Data loaded successfully');
        console.log(response);
            
        var select = $('<select id="fdm_material_selection" onchange="calculate_price()">');
            
        for (i = 0; i < response.length; i++) {
            // Objekt aus array holen
            var obj = response[i];

            if (obj.typ == "fdm"){
                // option erstellen
                option = $('<option>');
                option.prop('value', obj.id);
                option.text(obj.material);
                select.append(option);
            }
        }

        // zusammengesetzen Code / objekt ans dokument anhängen
        $('#fdm_material').append(select);
        
    }).fail(function (jqXHR, statusText, error) {
        console.log('Error occured');
        console.log('Response Code: ' + jqXHR.status + ' - Message: ' + jqXHR.responseText);
        alert(jqXHR.responseText);
    });
});

/* Funktionen für Preis berechnen */
function calculate_price() {
    console.log('change detekted calculation new Price');
    var filePath = document.getElementById('myFile').value;
    var filePathSplitt = filePath.split('\\');
    var fileName = filePathSplitt[(filePathSplitt.length)-1];

    var materialid = document.querySelector("#fdm_material_selection").value;
    var filling = document.querySelector("#fdm_filling").value;
    //console.log(materialid);
    var obj = {'materialid': materialid, 'filling' : filling, 'filename' : fileName};
    
    $.ajax({
        url: 'http://localhost:8000/api/stl/fdm',
        method: 'post',
        contentType: 'application/json; charset=utf-8',
        cache: false,
        data: JSON.stringify(obj)
    }).done(function (response) {
        console.log(response);
        //$('#output').html(JSON.stringify(response));
        $('#Preis').html('<label id="Preis">'+ response.price +' €</label>');
        
    }).fail(function (jqXHR, statusText, error) {
        console.log('Response Code: ' + jqXHR.status + ' - Fehlermeldung: ' + jqXHR.responseText);
        console.log('Ein Fehler ist aufgetreten');
    });
};