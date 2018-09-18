$(document).ready(function() {
    var form = $("#transForm");
    var ticker = $("#ticker");
    var quantity = $("#quantity");


    form.on("submit", function(event) {
        event.preventDefault();
        var tickerValue = ticker.val().trim();
        // if(ticker.val().length === 0 || isNaN(ticker.val())) {
        //     return;
        // };
        var currentPrice;
        var query = `https://api.iextrading.com/1.0/stock/${tickerValue}/price`
        $.ajax({url: query, success: function(result){
            currentPrice = result;
            console.log('here')
        }}).then(function() {
            var total = currentPrice * quantity.val();
            var bsChoice = $("#bsChoice").val();
            console.log(bsChoice);
            var bsquantity = $("#quantity").val();
            if(bsChoice === "Sell") {
                bsquantity *= -1;
            }
            var transaction = {
                ticker: ticker.val().trim(),
                quantity: bsquantity,
                price: currentPrice,
                total_price: total  
            }
            $.post("/api/transaction", transaction).then(
                function(error){
                  if(error) throw error;
            })
        });

        
});

});
