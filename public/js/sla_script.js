/*

$(document).ready(function() {
    console.log('Document ready, loading data from Service');

    $.ajax({
        url: 'http://localhost:8000/api/mehrwertsteuer/alle',
        method: 'get',
        contentType: 'application/json; charset=utf-8',
        cache: false,
        dataType: 'json'
    }).done(function (response) {
        console.log('Data loaded successfully');
        console.log(response);

        // die Idee bei diesem Prinzip ist, dass HTML Elemente als Objekte angesehen werden
        //    welche mit existierenden Methoden mit Daten und Attributen usw. versorgt werden können.
        
            
        // HTML Element anlegen
        var div = $('<div>');

        // object mit weiterem Inhalt und Code vervollständigen
        div.append('Folgende Daten wurden geladen:<br><br>');
        
            // unterobjekte erstellen
            var table = $('<table>');
            var tr = null;
            var td = null;
            table.prop('style', 'width:80%;border:1px solid black');
            table.append('<tr><th>ID</th><th>Bezeichnung</th><th>Steuersatz</th></tr>');
                
            for (i = 0; i < response.length; i++) {
                // Objekt aus array holen
                var obj = response[i];

                // zeile erstellen
                tr = $('<tr>');

                    // zellen erstellen, mit Daten bestücken und der Zeile hinzufügen
                    td = $('<td>');
                    td.text(obj.id);
                    tr.append(td);

                    td = $('<td>');
                    td.text(obj.bezeichnung);
                    tr.append(td);

                    td = $('<td>');
                    td.text(obj.steuerSatz.toFixed(2) + ' %');
                    tr.append(td);

                // zeile der Tabelle hinzufügen
                table.append(tr);
            }

        // tabelle dem div hinzufügen
        div.append(table);

        // zusammengesetzen Code / objekt ans dokument anhängen
        $('BODY').append(div);
        
    }).fail(function (jqXHR, statusText, error) {
        console.log('Error occured');
        console.log('Response Code: ' + jqXHR.status + ' - Message: ' + jqXHR.responseText);
        alert(jqXHR.responseText);
    });
});


*/