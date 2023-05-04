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
        var select = $('<select>');
        select.prop('id', 'fdm_printer_selection');
            
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
            
        var select = $('<select>');
        select.prop('id', 'fdm_material_selection');
            
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