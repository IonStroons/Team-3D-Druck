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
    
    
    
    var obj = { 'name': name, 'vorname': vorname, 'email': email, 'land': land, 'ort': ort, 'strasse_hausnummer': strasse_hausnummer, 'tel': tel, 'plz': plz, 'hinweis': hinweis, };
    
    $.ajax({
        url: 'http://localhost:8000/api/bestellformular',
        method: 'post',
        contentType: 'application/json; charset=utf-8',
        cache: false,
        data: JSON.stringify(obj)
    }).done(function (response) {
        console.log(response);
        $('#output').html(JSON.stringify(response));
    }).fail(function (jqXHR, statusText, error) {
        console.log('Response Code: ' + jqXHR.status + ' - Fehlermeldung: ' + jqXHR.responseText);
        $('#output').html('Ein Fehler ist aufgetreten');
    });
});