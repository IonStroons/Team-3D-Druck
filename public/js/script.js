/* Funktionen für Bestellformular */
$('#bestellen').click(function() {
    console.log('button bestellen clicked');

    //Zu Sendende Daten in Variable ablegen
    var name = document.querySelector("#name").value;
    var vorname = document.querySelector("#first_name").value;
    var email = document.querySelector("#email").value;
    var land = document.querySelector("#country").value;
    var ort = document.querySelector("#city").value;
    var strasse_hausnummer = document.querySelector("#street").value;
    var tel = document.querySelector("#tel").value;
    var plz = document.querySelector("#postcode").value;
    var hinweis = document.querySelector("#message").value;
    var basket = getJSONSessionItem('shoppingBasket');

    //Objekt erzeuegn in dem die zu sendenen Daten liegnen
    var obj = { 'name': name, 'vorname': vorname, 'email': email, 'land': land, 'ort': ort, 'strasse_hausnummer': strasse_hausnummer, 'tel': tel, 'plz': plz, 'hinweis': hinweis, 'basket': JSON.stringify(basket) };

    //Objekt Bestellformular an Server übertgaen und in Datenbank schreiben
    $.ajax({
        url: 'http://localhost:8000/api/bestellformular',
        method: 'post',
        contentType: 'application/json; charset=utf-8',
        cache: false,
        data: JSON.stringify(obj)
    }).done(function (response) {
        console.log(response);
        //$('#output').html(JSON.stringify(response));
        $('#output').html('<p>Informationen erfolgreich gesendet</p>');
        emptyBasket();
        setTimeout(function(){
            location.href = 'danke.html';
        }, 3000);
    }).fail(function (jqXHR, statusText, error) {
        console.log('Response Code: ' + jqXHR.status + ' - Fehlermeldung: ' + jqXHR.responseText);
        $('#output').html('Ein Fehler ist aufgetreten, probleme mit Bestellformular');
    });
});

/* Funktion Button zur Kasse */
$('#zur_kasse').click(function() {
    console.log('button zur Kasse clicked');
    // Pruefen ob Basket existiert
    if (existsSessionItem('shoppingBasket')) {
        location.href = 'kasse.html';
    }
    else {
        alert('Kein Item im Warenkorb!');
    }
}); 

/* Funktionen für Dateiupload */
$('#uploadForm').submit(function(event) {
    console.log("form submit called");

    // disable default event
    event.preventDefault();

    // convert data of form to object
    var formData = new FormData(this);

    console.log(formData);

    // send form with ajax
    $.ajax({
        url: 'http://localhost:8000/api/dateiuploadeinzeln',
        type: 'POST',
        data: formData,
        contentType: false,
        cache: false,
        processData: false,
        dataType: 'json'
    })
    .done(function(response) {
        console.log('response received');
        //console.log(response);
        $('#output').html('<p>Datei erfolgreich hochgeladen</p>');
        //Freischalen von Paramterauswahl
        showParameterSelection();
        //Hochgeladenes Modell in STLViewer laden und die zuvor geladene Datei entfernen
        stl_viewer.clean();
        stl_viewer.add_model({local_file:document.getElementById('myFile').files[0]});
        //Preis für hochgeladenene Datei berechnen
        setTimeout(function(){
            calculate_price();
        }, 3000);
        //$('#output').append('<p>Nachricht: ' + JSON.stringify(response) + '</p>');
    })
    .fail(function(xhr) {
        console.log('error received');
        console.log(xhr);
        $('#output').html('<p>Es ist ein Fehler aufgetreten</p>');
        //$('#output').append('<p>Status: ' + xhr.status + '</p>');
        //$('#output').append('<p>Nachricht: ' + xhr.responseText + '</p>');
    });
});

/* Show Upload Button */
function showUploadButton(){
    //Check File
    var file = document.getElementById('myFile');

    // Dateiendung auf "stl" überprüfen
    var ext = file.value.match(/\.([^\.]+)$/)[1];
        switch (ext) {
            case 'stl':
            case 'STL':
                //Nur falls richtiges Dateiformat wird der Uploadbutton sichtbar
                document.getElementById ("upload_button").style.visibility ="visible";
                break;
            default:
                //Meldung für falsches Dateiformat
                alert('Bitte gültige Datei auswählen!! (.stl,.STL)');
        };
}

/* Show Parameter Selection */
function showParameterSelection(){
    //Auswahl der Klasse die Sichtbar gemacht werden soll
    const nodeList = document.querySelectorAll(".parameter_selection");
    //Über alle Unterpunkte laufen und deren Sichbarkeit ändern
    for (let i = 0; i < nodeList.length; i++) {
        nodeList[i].style.visibility = "visible"
    }
}

/* Funktionen für Newsletter */
$('#newsletter_submit').click(function() {
    console.log('button newsletter_submit clicked');

    //Newsletter Email in Variable legen
    var email = document.querySelector("#newsletter_input").value;

    //Schauen ob Variable nicht leer ist
    if(email == ""){
        alert("E-Mail nicht vorhanden!");
    }else{  
        //Objekt erstellen welches zum Server geschickt wird
        var obj = {'email': email};
        //Objekt an Server übertragen und in Newsletter Datenbank ablegen
        $.ajax({
            url: 'http://localhost:8000/api/newsletter',
            method: 'post',
            contentType: 'application/json; charset=utf-8',
            cache: false,
            data: JSON.stringify(obj)
        }).done(function (response) {
            console.log(response);
            //$('#output').html(JSON.stringify(response));
            $('#output_newsletter').html('<p>Informationen erfolgreich gesendet</p>');
        }).fail(function (jqXHR, statusText, error) {
            console.log('Response Code: ' + jqXHR.status + ' - Fehlermeldung: ' + jqXHR.responseText);
            $('#output_newsletter').html('Ein Fehler ist aufgetreten');
        });
    }
});

