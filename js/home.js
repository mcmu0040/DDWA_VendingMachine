var moneyTotal = 0;

$(document).ready(function () {

    resetAll();
    //displayAllItems();

});

function addMoney(moneyIn) {
    moneyTotal += moneyIn;
    moneyTotal = round(moneyTotal,2);
    //console.log(moneyTotal);
    displayMoney();
}

function displayMoney() {
    $('#totalDisplay').empty();
    $('#totalDisplay').val(moneyTotal.toFixed(2));
}

//found function on web, not my idea
function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

function displayItem(item) {
    //$('#vendingDisplay').append('Yo');
    id = item.id;

    var output = '<div style="border: solid" class="itemBox col-md-4" onclick="selectItem(' + id +')">';
    output += id + '<br><center>';
    output += item.name + '<br>';
    output += '$' + item.price.toFixed(2) + '<br>';
    output += 'Quantity Left: ' + item.quantity + '<br>';
    output += '</center></div>';

    $('#vendingDisplay').append(output);
}

function selectItem(id) {
    $('#itemDisplay').val(id);
}

function purchase() {
    var id = $('#itemDisplay').val();

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/money/" + moneyTotal + "/item/" + id,
        success: function (change) {
            //console.log(dataArray.length);
            
            var qtrs = change.quarters;
            var dimes = change.dimes;
            var nickels = change.nickels;
            var pennies = change.pennies;
            
            var output = addChange(qtrs, 'Quarter');
            output += addChange(dimes, 'Dime');
            output += addChange(nickels, 'Nickel');
            output += addChange(pennies, 'Penny');
            
            $('#changeDisplay').val(output);
            $('#messageDisplay').val('Thank You!!!');                  
        },
        error: function (response) {
            var r = jQuery.parseJSON(response.responseText);
            $('#messageDisplay').val(r.message);
        }
    });
}

function displayAllItems() {
    $('#vendingDisplay').empty();

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/items/",
        success: function (dataArray) {
            //console.log(dataArray.length);
            
            $.each(dataArray, function(index, data){
                //console.log(data.name);
                displayItem(data);
            });
        
        },
        error: function (xhr, status) {
            alert('Oops');
        }
    });
}

function addChange(num, coin) {
    if (num != 0) {
        if (num === 1) {
            return num + ' ' + coin + ' ';
        } else {
            if (coin === 'Penny') {
                return num + ' Pennies';
            } else {
                return num + ' ' + coin + 's ';
            }
        }
    }
    return '';
}

function resetAll() {
    $('#messageDisplay').val('');
    $('#itemDisplay').val('');
    $('#changeDisplay').val('');
    $('#totalDisplay').val('');
    moneyTotal = 0;
    displayAllItems();
}