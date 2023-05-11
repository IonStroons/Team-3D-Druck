/* Funktionen für Bestellformular */
$('#bestellen').click(function() {
    console.log('button bestellen clicked');

    var name = document.querySelector("#name").value;
    var vorname = document.querySelector("#first_name").value;
    var email = document.querySelector("#email").value;
    var land = document.querySelector("#country").value;
    var ort = document.querySelector("#city").value;
    var strasse_hausnummer = document.querySelector("#street").value;
    var tel = document.querySelector("#tel").value;
    var plz = document.querySelector("#postcode").value;
    var hinweis = document.querySelector("#message").value;
    
    var obj = { 'name': name, 'vorname': vorname, 'email': email, 'land': land, 'ort': ort, 'strasse_hausnummer': strasse_hausnummer, 'tel': tel, 'plz': plz, 'hinweis': hinweis };
    
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
        setTimeout("location.href = 'danke.html';", 2000);
    }).fail(function (jqXHR, statusText, error) {
        console.log('Response Code: ' + jqXHR.status + ' - Fehlermeldung: ' + jqXHR.responseText);
        $('#output').html('Ein Fehler ist aufgetreten');
    });
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
        //Preis für hochgeladenene Datei berechnen
        calculate_price();
        //Hochgeladenes Modell in STLViewer laden
        stl_viewer.clean();
        stl_viewer.add_model({local_file:document.getElementById('myFile').files[0]});
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

    var ext = file.value.match(/\.([^\.]+)$/)[1];
        switch (ext) {
            case 'stl':
            case 'STL':
                //Show Upload Button
                document.getElementById ("upload_button").style.visibility ="visible";
                break;
            default:
                //Meldung für falsches Dateiformat
                alert('Bitte gültige Datei auswählen!! (.stl,.STL)');
        };
}

/* Show Parameter Selection */
function showParameterSelection(){
    const nodeList = document.querySelectorAll(".parameter_selection");
    for (let i = 0; i < nodeList.length; i++) {
        nodeList[i].style.visibility = "visible"
    }
}

/* Funktionen für Newsletter */
$('#newsletter_submit').click(function() {
    console.log('button newsletter_submit clicked');

    var email = document.querySelector("#newsletter_input").value;

    if(email == ""){
        alert("E-Mail nicht vorhanden!");
    }else{  
        var obj = {'email': email};
        
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

