var basket = [];

//Funktion um einen Wert der mit . geschrieben wird in ein , Wert umzuwandeln mit 2 Nachkomma stellen
function formatToEuro(val) {
    if (val === null || val === undefined) 
        val = 0.0;
    var asString = val.toFixed(2).toString();
    return asString.replace('.', ',') + " €";
}

//Funktion um einen Wert der mit . geschrieben wird in ein , Wert umzuwandeln der aus der Datenbank kommt
function formatToEuroData(val) {
    if (val === null || val === undefined) 
        val = 0.0;
    var asString = val.toString();
    return asString.replace('.', ',') + " €";
}

//Funktion welche die Korrekten Parameter zum Warenkorb hinzufügt
function addToElementBasket(type) {
    //Typ FDM Druck
    if (type == 'fdm'){
        //Ausgewählter Drucker und Material in Variable ablegen
        var printerid = document.getElementById('fdm_printer_selection').value;
        var materialid = document.getElementById('fdm_material_selection').value;

        //Dateinamen in Variable ablegen
        var filePath = document.getElementById('myFile').value;
        var filePathSplitt = filePath.split('\\');
        var filename = filePathSplitt[(filePathSplitt.length)-1];

        //Berechneter Preis in Variable ablegen
        var price = document.getElementById('preisValue').getAttribute('value');

        //Füllung in Variable ablegen
        var filling = document.getElementById('fdm_filling').value;

        //Variablen in Funktion zum Warenkorb hinzufügen übergeben
        addToBasket(printerid,materialid,filename,price,filling);
    }
    //Typ SLA Druck
    if (type == 'sla'){
        //Ausgewählter Drucker und Material in Variable ablegen
        var printerid = document.getElementById('sla_printer_selection').value;
        var materialid = document.getElementById('sla_material_selection').value;

        //Dateinamen in Variable ablegen
        var filePath = document.getElementById('myFile').value;
        var filePathSplitt = filePath.split('\\');
        var filename = filePathSplitt[(filePathSplitt.length)-1];

        //Berechneter Preis in Variable ablegen
        var price = document.getElementById('preisValue').getAttribute('value');

        //Füllung in Variable ablegen, hier 1 da SLA Drucke immer Voll sind, wie 100%
        var filling = 1;

        //Variablen in Funktion zum Warenkorb hinzufügen übergeben
        addToBasket(printerid,materialid,filename,price,filling);
    }
    //Typ SLS Druck
    if (type == 'sls'){
        //Ausgewählter Drucker und Material in Variable ablegen
        var printerid = document.getElementById('sls_printer_selection').value;
        var materialid = document.getElementById('sls_material_selection').value;

        //Dateinamen in Variable ablegen
        var filePath = document.getElementById('myFile').value;
        var filePathSplitt = filePath.split('\\');
        var filename = filePathSplitt[(filePathSplitt.length)-1];

        //Berechneter Preis in Variable ablegen
        var price = document.getElementById('preisValue').getAttribute('value');

        //Füllung in Variable ablegen, hier 1 da SLS Drucke immer Voll sind, wie 100%
        var filling = 1;

        //Variablen in Funktion zum Warenkorb hinzufügen übergeben
        addToBasket(printerid,materialid,filename,price,filling);
    }
}

function addToBasket(printerid,materialid,filename,price,filling) {
    // load printer from api by id
    var printerCall = $.ajax({
            url: 'http://localhost:8000/api/drucker/gib/' + printerid,
            method: 'get',
            contentType: 'application/json; charset=utf-8',
            cache: false,
            dataType: 'json'
        }).done(function (response) {
            //printerToAdd = response;
        }).fail(function (jqXHR, statusText, error) {
            console.log('Response Code: ' + jqXHR.status + ' - Fehlermeldung: ' + jqXHR.responseText);
            alert('Ein Fehler ist aufgetreten');
        });
    // load material from api by id
    var materialCall = $.ajax({
        url: 'http://localhost:8000/api/material/gib/' + materialid,
        method: 'get',
        contentType: 'application/json; charset=utf-8',
        cache: false,
        dataType: 'json'
    }).done(function (response) {
        //materialToAdd = response;
    }).fail(function (jqXHR, statusText, error) {
        console.log('Response Code: ' + jqXHR.status + ' - Fehlermeldung: ' + jqXHR.responseText);
        alert('Ein Fehler ist aufgetreten');
    });

    //Ausführen sobald beide Antworten vom Server gekommen sind für Drucker und Material
    $.when(printerCall, materialCall).done(function(responsePrinterCall, responseMaterialCall){
        //Ausgewählten Durcker in Variable ablegen (aus Response)
        var printerToAdd = responsePrinterCall[0];
        //console.log(printerToAdd);

        //Ausgewähltes Material in Variable ablegen (aus Response)
        var materialToAdd = responseMaterialCall[0];
        //console.log(materialToAdd);

        //Objekt mit Daten erzuegen
        var productToAdd = {
            printer: printerToAdd,
            material: materialToAdd,
            filename: filename,
            price: price,
            filling: filling,
        }
        

        console.log('trying to add to basket, product =' + productToAdd);

        // get basket data from session
        if (existsSessionItem('shoppingBasket')) 
        basket = getJSONSessionItem('shoppingBasket');

        // check if product in basket
        var posInBasket = -1;
        //Über alle Eigenschaften laufen und falls diese Gleich sind, wird die Variable posInBasket geändert
        for (i = 0; i < basket.length; i++) {
            if (basket[i].product.printer.id == productToAdd.printer.id) {
                if (basket[i].product.material.id == productToAdd.material.id){
                    if (basket[i].product.filename == productToAdd.filename){
                        if(basket[i].product.price == productToAdd.price){
                            if(basket[i].product.filling == productToAdd.filling){
                                posInBasket = i;
                                break;
                            }
                        }
                    }
                }
            }
        }

        // if not, add it or otherwise just increase amount
        if (posInBasket == -1) {
            console.log('product not in basket, creating new position');
            basket.push({
                product: productToAdd,
                amount: 1
            });
        } else {
            console.log('product found in basket, increasing amount');
            basket[posInBasket].amount++;
        }

        // remember changes in localStorage
        setJSONSessionItem('shoppingBasket', basket);

        // inform user
        alert('Produkt wurde zum Warenkorb hinzugefügt');

    });
}

function renderBasket(parentNode) {
    // get basket data from session
    if (existsSessionItem('shoppingBasket')) 
        basket = getJSONSessionItem('shoppingBasket');

    // empty parentNode
    $(parentNode).empty();

    // show message if no basket positions
    if (basket.length == 0) {
        console.log("no positions in basket");
        console.log(parentNode);
        $(parentNode).append('<tr><td colspan="6" id="missingData">Der Warenkorb ist leer</td></tr>');
    } else {
        var sum = 0.0;
        var totalSum = 0.0;

        $(basket).each(function (idx, item) {
            // calc position sum
            sum = item.product.price * item.amount;

            // add up totals
            totalSum += sum;

            // create node
            var node = $('<tr>');
           
            node.append($('<td>').text(idx + 1));
            node.append($('<td>').text(item.product.filename));
            node.append($('<td>').text(item.product.printer.drucker));
            node.append($('<td>').text(formatToEuroData(item.product.price)));
            node.append(
                $('<td>')
                .text(item.amount + ' Stk ')
                .append($('<button>')
                    .attr('type', 'button')
                    .attr('class', 'button_1')
                    .attr('onClick', 'decrementPosition(' + idx + ')')
                    .text('-')
                )
                .append($('<button>')
                .attr('type', 'button')
                .attr('class', 'button_1')
                .attr('onClick', 'incrementPosition(' + idx + ')')
                .text('+')
                )
            );
            node.append($('<td>').text(formatToEuro(sum)));
            node.append(
                $('<td>')
                    .append($('<button>')
                        .attr('type', 'button')
                        .attr('class', 'button_1')
                        .attr('onClick', 'removeBasketPosition(' + idx + ')')
                        .text('🗑')
                    )
            );

            // output node
            $(parentNode).append(node);
        });

        $(parentNode)
            .append('<tr><td colspan="7">&nbsp;</td></tr>')
            .append('<tr><td colspan="5">Gesamtsumme: </td><td class="bold">' + formatToEuro(totalSum) + '</td></tr>')
    }
}

function removeBasketPosition(idx) {
    console.log('removing basket position at idx=' + idx);
    
    // remove position at idx or empty basket completely
    if (basket.length > 1) {
        // remove position at idx
        basket.splice(idx, 1);

        // remember changes in localStorage
        setJSONSessionItem('shoppingBasket', basket);
    } else {
        // clear local variable
        basket = [];
        // clear session variable
        removeSessionItem('shoppingBasket');
    }

    // redraw basket
    renderBasket('#warenkorb > tbody');
}

function incrementPosition(idx) {
    console.log('increment basket position at idx=' + idx);
        // increment position at idx
        newAmount = basket[idx].amount + 1;
        basket[idx].amount = newAmount;
        // remember changes in localStorage
        setJSONSessionItem('shoppingBasket', basket);
    // redraw basket
    renderBasket('#warenkorb > tbody');
}

function decrementPosition(idx) {
    console.log('removing basket position at idx=' + idx);
        // decrement position at idx
        newAmount = basket[idx].amount - 1;
        if (newAmount == 0){
            removeBasketPosition(idx);
        }else{
            basket[idx].amount = newAmount;
            // remember changes in localStorage
            setJSONSessionItem('shoppingBasket', basket);
        }
    // redraw basket
    renderBasket('#warenkorb > tbody');
}

function emptyBasket() {
    console.log('emptying basket');

    // clear local variable
    basket = [];

    // clear session variable
    removeSessionItem('shoppingBasket');
    
    // redraw basket
    renderBasket('#basket > tbody');
}