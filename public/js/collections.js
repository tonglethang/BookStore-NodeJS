
//filter price
var price_discount = $('.price-none' ).text();
var price = price_discount.split(" ");
var product = document.getElementsByClassName("product");

$('input[type=radio][name=filter-price]').on('change', function() {
  switch ($(this).val()) {
    case 'all':
      for(var i = 0; i < product.length; i++) {
        product[i].style.display = "inline-block";
      }
      break;
    case '1-100':
      for(var i = 0; i < price.length; i++) {
        if(parseInt(price[i]) < 100000){
          product[i].style.display = "inline-block";
        }
        else{
          product[i].style.display = "none";
        }
      }
      break;
    case '100-200':
        for(var i = 0; i < price.length; i++) {
          if(parseInt(price[i]) >= 100000 && parseInt(price[i])  < 200000){
            product[i].style.display = "inline-block";
          }
          else{
            product[i].style.display = "none";
          }
        }
        break;
    case '200-300':
      for(var i = 0; i < price.length; i++) {
        if(parseInt(price[i]) >= 200000 && parseInt(price[i]) < 300000){
          product[i].style.display = "inline-block";
        }
        else{
          product[i].style.display = "none";
        }
      }
      break;
    case '300-400':
      for(var i = 0; i < price.length; i++) {
        if(parseInt(price[i]) >= 300000 && parseInt(price[i]) < 400000){
          product[i].style.display ="inline-block";
        }
        else{
          product[i].style.display = "none";
        }
      }
      break;
    case '400-500':
      for(var i = 0; i < price.length; i++) {
        if(parseInt(price[i]) >= 400000 && parseInt(price[i]) < 500000){
          product[i].style.display = "inline-block";
        }
        else{
          product[i].style.display = "none";
        }
      }
      break;
    case '500':
        for(var i = 0; i < price.length; i++) {
          if(parseInt(price[i]) >= 500000){
            product[i].style.display = "inline-block";
          }
          else{
            product[i].style.display = "none";
          }
        }
        break;
  }
});