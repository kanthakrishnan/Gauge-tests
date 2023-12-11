# Shopping Cart Testing
This scenario file has steps to place an order in automationexercise.com
To execute this specification, use
	npm test

This is a context step that runs before every scenario
* Open shopping application


## Place order
* Login as user "kanthakrishnan@gmail.com" "welcome123"
* Click link "Products"
* Add Product "Men Tshirt"
* Add Product "Blue Top"
* Click link "Cart"
* Verify cart for row "1" "Men Tshirt" "400" "1"
* Verify cart for row "2" "Blue Top" "500" "1"
* Checkout
* Place order
* Confirm order
  
 
