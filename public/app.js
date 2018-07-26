/*
 * Frontend Logic for application
 *
 */

// Container for frontend application
var app = {};

// Config
app.config = {
  'sessionToken' : false,
  'sessionCart' : false    
};

// AJAX Client (for RESTful API)
app.client = {}

// Interface for making API calls
app.client.request = function(headers,path,method,queryStringObject,payload,callback){

  // Set defaults
  headers = typeof(headers) == 'object' && headers !== null ? headers : {};
  path = typeof(path) == 'string' ? path : '/';
  method = typeof(method) == 'string' && ['POST','GET','PUT','DELETE'].indexOf(method.toUpperCase()) > -1 ? method.toUpperCase() : 'GET';
  queryStringObject = typeof(queryStringObject) == 'object' && queryStringObject !== null ? queryStringObject : {};
  payload = typeof(payload) == 'object' && payload !== null ? payload : {};
  callback = typeof(callback) == 'function' ? callback : false;

  // For each query string parameter sent, add it to the path
  var requestUrl = path+'?';
  var counter = 0;
  for(var queryKey in queryStringObject){
     if(queryStringObject.hasOwnProperty(queryKey)){
       counter++;
       // If at least one query string parameter has already been added, preprend new ones with an ampersand
       if(counter > 1){
         requestUrl+='&';
       }
       // Add the key and value
       requestUrl+=queryKey+'='+queryStringObject[queryKey];
     }
  }

  // Form the http request as a JSON type
  var xhr = new XMLHttpRequest();
  xhr.open(method, requestUrl, true);
  xhr.setRequestHeader("Content-type", "application/json");

  // For each header sent, add it to the request
  for(var headerKey in headers){
     if(headers.hasOwnProperty(headerKey)){
       xhr.setRequestHeader(headerKey, headers[headerKey]);
     }
  }

  // If there is a current session token set, add that as a header
  if(app.config.sessionToken){
    xhr.setRequestHeader("token", app.config.sessionToken.id);
  }

  // When the request comes back, handle the response
  xhr.onreadystatechange = function() {
      if(xhr.readyState == XMLHttpRequest.DONE) {
        var statusCode = xhr.status;
        var responseReturned = xhr.responseText;

        // Callback if requested
        if(callback){
          try{
            var parsedResponse = JSON.parse(responseReturned);
            callback(statusCode,parsedResponse);
          } catch(e){
            callback(statusCode,false);
          }

        }
      }
  }

  // Send the payload as JSON
  var payloadString = JSON.stringify(payload);
  xhr.send(payloadString);

};

// Bind the logout button
app.bindLogoutButton = function(){
  document.getElementById("logoutButton").addEventListener("click", function(e){

    // Stop it from redirecting anywhere
    e.preventDefault();

    // Log the user out
    app.logUserOut();

  });
};

// Log the user out then redirect them
app.logUserOut = function(redirectUser){
  // Set redirectUser to default to true
  redirectUser = typeof(redirectUser) == 'boolean' ? redirectUser : true;

  // Get the current token id
  var tokenId = typeof(app.config.sessionToken.id) == 'string' ? app.config.sessionToken.id : false;

  // Send the current token to the tokens endpoint to delete it
  var queryStringObject = {
    'id' : tokenId
  };
  app.client.request(undefined,'api/tokens','DELETE',queryStringObject,undefined,function(statusCode,responsePayload){
    // Set the app.config token as false
    app.setSessionToken(false);

    // Send the user to the logged out page
    if(redirectUser){
      window.location = '/session/deleted';
    }

  });
};

// Bind the forms
app.bindForms = function(){
  if(document.querySelector("form")){
      
    var allForms = document.querySelectorAll("form");      
    for(var i = 0; i < allForms.length; i++){
        allForms[i].addEventListener("submit", function(e){
            
        // Stop it from submitting
        e.preventDefault();
        var formId = this.id;
        var path = this.action;
        var method = this.method.toUpperCase();
            
        // Hide the error message (if it's currently shown due to a previous error)
        document.querySelector("#"+formId+" .formError").style.display = 'none';

        // Hide the success message (if it's currently shown due to a previous error)
        if(document.querySelector("#"+formId+" .formSuccess")){
          document.querySelector("#"+formId+" .formSuccess").style.display = 'none';
        }


        // Turn the inputs into a payload
        var payload = {};
        var elements = this.elements;
        for(var i = 0; i < elements.length; i++){
          if(elements[i].type !== 'submit'){
            // Determine class of element and set value accordingly
            var classOfElement = typeof(elements[i].classList.value) == 'string' && elements[i].classList.value.length > 0 ? elements[i].classList.value : '';
            var valueOfElement = elements[i].type == 'checkbox' && classOfElement.indexOf('multiselect') == -1 ? elements[i].checked : classOfElement.indexOf('intval') == -1 ? elements[i].value : parseInt(elements[i].value);
            var elementIsChecked = elements[i].checked;
            // Override the method of the form if the input's name is _method
            var nameOfElement = elements[i].name;
            if(nameOfElement == '_method'){
              method = valueOfElement;
            } else {
              // Create an payload field named "method" if the elements name is actually httpmethod
              if(nameOfElement == 'httpmethod'){
                nameOfElement = 'method';
              }
              // Create an payload field named "id" if the elements name is actually uid
              if(nameOfElement == 'uid'){
                nameOfElement = 'id';
              }
              // If the element has the class "multiselect" add its value(s) as array elements
              if(classOfElement.indexOf('multiselect') > -1){
                if(elementIsChecked){
                  payload[nameOfElement] = typeof(payload[nameOfElement]) == 'object' && payload[nameOfElement] instanceof Array ? payload[nameOfElement] : [];
                  payload[nameOfElement].push(valueOfElement);
                }
              } else {
                payload[nameOfElement] = valueOfElement;
              }

            }
          }
        }


        // If the method is DELETE, the payload should be a queryStringObject instead
        var queryStringObject = method == 'DELETE' ? payload : {};

        // Call the API
        app.client.request(undefined,path,method,queryStringObject,payload,function(statusCode,responsePayload){
          // Display an error on the form if needed
          if(statusCode !== 200){

            if(statusCode == 403){
              // log the user out
              app.logUserOut();

            } else {

              // Try to get the error from the api, or set a default error message
              var error = typeof(responsePayload.Error) == 'string' ? responsePayload.Error : 'An error has occured, please try again';

              // Set the formError field with the error text
              document.querySelector("#"+formId+" .formError").innerHTML = error;

              // Show (unhide) the form error field on the form
              document.querySelector("#"+formId+" .formError").style.display = 'block';
            }
          } else {
            // If successful, send to form response processor
            app.formResponseProcessor(formId,payload,responsePayload);
          }

        });
      });
    }
  }
};

// Form response processor
app.formResponseProcessor = function(formId,requestPayload,responsePayload){
  var functionToCall = false;
  // If account creation was successful, try to immediately log the user in
  if(formId == 'accountCreate'){
    // Take the email and password, and use it to log the user in
    var newPayload = {
      'email' : requestPayload.email,
      'password' : requestPayload.password
    };

    app.client.request(undefined,'api/tokens','POST',undefined,newPayload,function(newStatusCode,newResponsePayload){
      // Display an error on the form if needed
      if(newStatusCode !== 200){

        // Set the formError field with the error text
        document.querySelector("#"+formId+" .formError").innerHTML = 'Sorry, an error has occured. Please try again.';

        // Show (unhide) the form error field on the form
        document.querySelector("#"+formId+" .formError").style.display = 'block';

      } else {
        // If successful, set the token and redirect the user
        app.setSessionToken(newResponsePayload);
        window.location = '/menu';
      }
    });
  }
  
  // If login was successful, set the token in localstorage and redirect the user
  if(formId == 'sessionCreate'){
    app.setSessionToken(responsePayload);
    window.location = '/menu';
  }

  // If forms saved successfully and they have success messages, show them
  var formsWithSuccessMessages = ['accountEdit1', 'accountEdit2'];
  if(formsWithSuccessMessages.indexOf(formId) > -1){
    document.querySelector("#"+formId+" .formSuccess").style.display = 'block';
  }

  // If the user just deleted their account, redirect them to the account-delete page
  if(formId == 'accountEdit3'){
    app.logUserOut(false);
    window.location = '/account/deleted';
  }

};

// Create Order
app.createOrder = function(){
    var errDiv = document.querySelector("#orderCreate .formError");
    if(errDiv.style != null){
        // Hide the form error field on the form
        errDiv.style.display = 'none';        
    }

    // Get input values
    var cartId = typeof(app.config.sessionCart.cartId) == 'string' ? app.config.sessionCart.cartId : false;
    var cardNo = document.getElementById('cardNo').value;
    cardNo = typeof(cardNo) == 'string' && cardNo.length == 16 ? cardNo : false;
    var opts = document.getElementById('cardBrand');
    var cardBrand;
    if(opts){
        cardBrand = opts.options[opts.selectedIndex].value;
    }
    cardBrand = typeof(cardBrand) == 'string' && cardBrand.length > 0 ? cardBrand : false;

    // Verify input values
    if(cartId && cardNo && cardBrand){
        // Create payload
        var newPayload = {
            'cartId' : cartId,
            'cardNo' : cardNo,
            'cardBrand' : cardBrand
        };

        document.getElementById('ordProcessing').style.display = 'block';
        
        // Send api request
        app.client.request(undefined,'api/orders','POST',undefined,newPayload,function(newStatusCode,newResponsePayload){
            // Get response -> Hide please wait message
            document.getElementById('ordProcessing').style.display = 'none';
            
            // Check response
            if(newStatusCode !== 200){
                // Display an error on the form
                var errMsg = newResponsePayload.Error;
                if(errMsg){
                    errDiv.innerHTML = errMsg;
                } else {
                    errDiv.innerHTML = 'Sorry, an error has occured. Please try again.';                    
                }
                errDiv.style.display = 'block';
            } else {
                // Success
                document.getElementById('ordModal').style.display = 'block';                
            }
            });        
    } else {
        // Display an error on the form
        errDiv.innerHTML = 'Error: Invalid input parameters. Please try again.';
        errDiv.style.display = 'block';        
    }    
};

// Get the session token from localstorage and set it in the app.config object
app.getSessionToken = function(){
  var tokenString = localStorage.getItem('token');
  if(typeof(tokenString) == 'string'){
    try{
      var token = JSON.parse(tokenString);
      app.config.sessionToken = token;
      if(typeof(token) == 'object'){
        app.setLoggedInClass(true);
      } else {
        app.setLoggedInClass(false);
      }
    }catch(e){
      app.config.sessionToken = false;
      app.setLoggedInClass(false);
    }
  }
};

// Set (or remove) the loggedIn class from the body
app.setLoggedInClass = function(add){
  var target = document.querySelector("body");
  if(add){
    target.classList.add('loggedIn');
  } else {
    target.classList.remove('loggedIn');
  }
};

// Set the session token in the app.config object as well as localstorage
app.setSessionToken = function(token){
  app.config.sessionToken = token;
  var tokenString = JSON.stringify(token);
  localStorage.setItem('token',tokenString);
  if(typeof(token) == 'object'){
    app.setLoggedInClass(true);
  } else {
    app.setLoggedInClass(false);
  }
};

// Renew the token
app.renewToken = function(callback){
  var currentToken = typeof(app.config.sessionToken) == 'object' ? app.config.sessionToken : false;
  if(currentToken){
    // Update the token with a new expiration
    var payload = {
      'id' : currentToken.id,
      'extend' : true,
    };
    app.client.request(undefined,'api/tokens','PUT',undefined,payload,function(statusCode,responsePayload){
      // Display an error on the form if needed
      if(statusCode == 200){
        // Get the new token details
        var queryStringObject = {'id' : currentToken.id};
        app.client.request(undefined,'api/tokens','GET',queryStringObject,undefined,function(statusCode,responsePayload){
          // Display an error on the form if needed
          if(statusCode == 200){
            app.setSessionToken(responsePayload);
            callback(false);
          } else {
            app.setSessionToken(false);
            callback(true);
          }
        });
      } else {
        app.setSessionToken(false);
        callback(true);
      }
    });
  } else {
    app.setSessionToken(false);
    callback(true);
  }
};

// Load data on the page
app.loadDataOnPage = function(){
  // Get the current page from the body class
  var bodyClasses = document.querySelector("body").classList;
  var primaryClass = typeof(bodyClasses[0]) == 'string' ? bodyClasses[0] : false;

  // Logic for account settings page
  if(primaryClass == 'accountEdit'){
    app.loadAccountEditPage();
  }

  // Logic for menu page
  if(primaryClass == 'menuList'){
    app.loadMenuListPage();
  }

  // Get cart from localStorage
  app.getSessionCart();
    
  // Logic for cart page
  if(primaryClass == 'cartList'){
    app.loadCartListPage();
  }

  // Logic for order page
  if(primaryClass == 'orderCreate'){
    app.getCartItemsTotal(function(totalPrice){
        if(totalPrice > 0){
            var e = document.getElementById('chargedAmount');
            if(e){
                e.innerHTML = totalPrice;
            }            
        }
    });
  }
    
  // Update cart items counter
  var cartId = typeof(app.config.sessionCart.cartId) == 'string' ? app.config.sessionCart.cartId : false;
  if(cartId){
    app.updateCartItemsCounter(cartId);
  }
};

// Load the account edit page specifically
app.loadAccountEditPage = function(){
  // Get the email address from the current token, or log the user out if none is there
  var email = typeof(app.config.sessionToken.email) == 'string' ? app.config.sessionToken.email : false;
  if(email){
    // Fetch the user data
    var queryStringObject = {
      'email' : email
    };
    app.client.request(undefined,'api/users','GET',queryStringObject,undefined,function(statusCode,responsePayload){
      if(statusCode == 200){
        // Put the data into the forms as values where needed
        document.querySelector("#accountEdit1 .firstNameInput").value = responsePayload.firstName;
        document.querySelector("#accountEdit1 .lastNameInput").value = responsePayload.lastName;
        document.querySelector("#accountEdit1 .addressInput").value = responsePayload.address;
        document.querySelector("#accountEdit1 .displayEmailInput").value = responsePayload.email;

        // Put the hidden email field into both forms
        var hiddenEmailInputs = document.querySelectorAll("input.hiddenEmailInput");
        for(var i = 0; i < hiddenEmailInputs.length; i++){
            hiddenEmailInputs[i].value = responsePayload.email;
        }

      } else {
        // If the request comes back as something other than 200, log the user our (on the assumption that the api is temporarily down or the users token is bad)
        app.logUserOut();
      }
    });
  } else {
    app.logUserOut();
  }
};

// Load the menu page specifically
app.loadMenuListPage = function(){
  // Get the email address from the current token, or log the user out if none is there
  var email = typeof(app.config.sessionToken.email) == 'string' ? app.config.sessionToken.email : false;
  if(email){
    // Fetch the user data
    var queryStringObject = {
      'email' : email
    };
    app.client.request(undefined,'api/menu','GET',queryStringObject,undefined,function(statusCode,responsePayload){
      if(statusCode == 200){

        // Get menu items
        var menuItems = typeof(responsePayload.menu.items) == 'object' && responsePayload.menu.items instanceof Array && responsePayload.menu.items.length > 0 ? responsePayload.menu.items : [];
        if(menuItems.length > 0){

          // Show each menu item as a new row in the table
          menuItems.forEach(function(mItem){
            // Add menu-item data into a table row
            var table = document.getElementById("menuListTable");
            var tr = table.insertRow(-1);
            tr.classList.add('menuItemRow');
            var td0 = tr.insertCell(0);
            var td1 = tr.insertCell(1);
            var td2 = tr.insertCell(2);
              
            var prices = '';
            var r1Checked = 'checked';
            mItem.prices.forEach(function(iPrice){
                prices += '<div class="menu-item"><label><input name="Radio_'+mItem.id+'" type="radio" '+r1Checked+' itemsize="'+iPrice.size+'" itemprice="'+iPrice.price+'" /> Size : '+iPrice.size+' ......... Price : $'+iPrice.price +'</label></div>';
                r1Checked = '';     // only make first radio checked
            });
            var qty = '<div "menu-item"><label>Quantity : </label><select id="Select_'+mItem.id+'">';
            for(var i=1; i<=mItem.availableQuantity; i++){
                qty += '<option value="'+i+'">'+i+'</option>';
            }
            qty += '</select><div>';

            td0.innerHTML = '<figure><img src="'+ mItem.image+'"><figcaption><br>'+mItem.name+'<br>&nbsp;</span></figure>';                          
            td1.innerHTML = '<div class="item-description">'+mItem.description+'</div><br>'+prices+'<br>'+qty;
            td2.innerHTML = '<button class="my-cart-b" id="btn_'+mItem.id+'" onclick="app.addCartItem('+mItem.id+');">Add to Cart</button>';            
          });

        } else {
          // Show 'you have no menu-items' message
          document.getElementById("noMenuMessage").style.display = 'table-row';
        }
      } else {
        // If the request comes back as something other than 200, log the user our (on the assumption that the api is temporarily down or the users token is bad)
        app.logUserOut();
      }
    });
  } else {
    app.logUserOut();
  }
};

// Add cart-item
app.addCartItem = function(id){
    var radios = document.getElementsByName('Radio_'+id);
    var rdo;
    for(var i=0; i<radios.length; i++){
        if(radios[i].checked){        
            rdo = radios[i];
            break;
        }
    }
    if(rdo){
        var size = rdo.getAttribute('itemsize');
        var price = parseInt(rdo.getAttribute('itemprice'));        
        var opts = document.getElementById('Select_'+id);
        if(opts){
            var qty = parseInt(opts.options[opts.selectedIndex].value);
            //alert(size+' - '+price+' - '+qty);            

            // Get cartId from app.config and check if it for same user
            var cartId = typeof(app.config.sessionCart.cartId) == 'string' ? app.config.sessionCart.cartId : false;
            var cartEmail = typeof(app.config.sessionCart.email) == 'string' ? app.config.sessionCart.email : false;            
            var tokenEmail = typeof(app.config.sessionToken.email) == 'string' ? app.config.sessionToken.email : false;
            if(cartId && cartEmail == tokenEmail){
                // Add/Update item to existing cart
                var newPayload ={ 
                    'id' : cartId,
                    'cartItems' : [{
                        'itemId' : id,
                        'size' : size,
                        'price': price,
                        'quantity': qty
                    }]
                };
                app.client.request(undefined,'api/carts','PUT',undefined,newPayload,function(newStatusCode,newResponsePayload){
                    if(newStatusCode == 200){
                        app.updateCartItemsCounter(cartId);
                    } else {
                        console.log('Add to Cart Error: '+ JSON.stringify(newResponsePayload));
                    }
                });                
            } else {
                if(cartId){
                    // Delete old cart
                    var queryStringObject = {'id' : cartId, 'forced' : true};
                    app.client.request(undefined,'api/carts','DELETE',queryStringObject,undefined,function(newStatusCode,newResponsePayload){
                        if(newStatusCode == 200){                            
                            console.log('Old cart #'+cartId+' deleted successfully');
                        } else {
                            console.log('Deleting old cart #'+cartId+' failed -> res: '+JSON.stringify(newResponsePayload));
                        }
                    });
                }
                
                // Create new cart
                var newPayload = [{
                    'itemId' : id,
                    'size' : size,
                    'price': price,
                    'quantity': qty
                }];
                app.client.request(undefined,'api/carts','POST',undefined,newPayload,function(newStatusCode,newResponsePayload){
                    if(newStatusCode == 200){
                        // Save cartId on localStorage
                        app.config.sessionCart = newResponsePayload;
                        localStorage.setItem('cart',JSON.stringify(newResponsePayload));
                        // Set cart items counter to ONE after adding first item 
                        var e = document.getElementById('cartCounter');
                        if(e){
                            e.setAttribute('cartItems',1);
                            e.innerHTML = 1;
                        }                        
                    } else {
                        console.log('Add to Cart Error: '+ JSON.stringify(newResponsePayload));
                    }
                });
            }
        }
    }
};

// Load the cart list page specifically
app.loadCartListPage = function(){
  // Get the cartId from the current cart, or return empty list
  var cartId = typeof(app.config.sessionCart.cartId) == 'string' ? app.config.sessionCart.cartId : false;
  if(cartId){
    // Fetch the user data
    var queryStringObject = {
      'id' : cartId
    };
    app.client.request(undefined,'api/carts','GET',queryStringObject,undefined,function(statusCode,responsePayload){
      if(statusCode == 200){
        // Get cart items
        var cartItems = typeof(responsePayload.cartItems) == 'object' && responsePayload.cartItems instanceof Array && responsePayload.cartItems.length > 0 ? responsePayload.cartItems : [];
        if(cartItems.length > 0){
          var totalPrice = 0;
              
          // Show each cart item as a new row in the table
          cartItems.forEach(function(cItem){
            totalPrice += cItem.price * cItem.quantity;
              
            // Add cart-item data into a table row
            var table = document.getElementById("cartListTable");
            var tr = table.insertRow(-1);
            tr.setAttribute('id','TR_'+cItem.itemId);
            tr.classList.add('cartItemRow');
            var td0 = tr.insertCell(0);
            var td1 = tr.insertCell(1);
            var td2 = tr.insertCell(2);
            
            // Get menu-item image and decription
            queryStringObject = {'itemid' : cItem.itemId};
            app.client.request(undefined,'api/menu','GET',queryStringObject,undefined,function(statusCode,responsePayload){
                if(statusCode == 200){
                    var price = '<div class="menu-item"><label>Size : '+cItem.size+' ......... Price : $'+cItem.price+'</label></div>';
                    var qty = '<div "menu-item"><label>Quantity : '+cItem.quantity+'</label></div>';                    
                    var mItem = responsePayload;
                    td0.innerHTML = '<figure><img src="'+ mItem.image+'"><figcaption><br>'+mItem.name+'<br>&nbsp;</span></figure>';                          
                    td1.innerHTML = '<div class="item-description">'+mItem.description+'</div><br>'+price+'<br>'+qty;
                    td2.innerHTML = '<button class="my-cart-x" id="btn_'+cItem.itemId+'" onclick="app.deleteCartItem('+cItem.itemId+');" title="Delete cart-item">X</button>';                                
                    tr.setAttribute('price',cItem.price);
                    tr.setAttribute('qty',cItem.quantity);
                } else {
                    console.log('Error during loading cartItem #'+cItem.itemId);
                }
            });
              
            // Show total price:
            document.getElementById('cartTotal').innerHTML = totalPrice;
            document.getElementById('createOrder').style.display = 'block';              
          });

        } else {
          // Show 'you have no cart-items' message
          document.getElementById("noCartMessage").style.display = 'table-row';
        }
      } else {
        // Show 'you have no cart-items' message
        document.getElementById("noCartMessage").style.display = 'table-row';
      }
    });
  } else {
    // Show 'you have no cart-items' message
    document.getElementById("noCartMessage").style.display = 'table-row';
  }
};

// Delete cart-item
app.deleteCartItem = function(itemId){
    var tokenId = typeof(app.config.sessionToken.id) == 'string' ? app.config.sessionToken.id : false;
    var cartId = typeof(app.config.sessionCart.cartId) == 'string' ? app.config.sessionCart.cartId : false;
    if(tokenId && cartId){
        var queryStringObject = {'id' : cartId, 'itemid' : itemId};
        // Delete specified cart item
        app.client.request(undefined,'api/carts','DELETE',queryStringObject,undefined,function(statusCode,responsePayload){
            if(statusCode == 200){
                // Get row which we need to remove
                var r = document.getElementById('TR_'+itemId);
                if(r){
                    // Remove item row
                    document.getElementById("cartListTable").deleteRow(r.rowIndex);
                    
                    // Decrease total price after deleting item
                    var t = document.getElementById("cartTotal")
                    if(t){
                        var total = parseInt(t.innerHTML);
                        var iPrice = parseInt(r.getAttribute('price')) * parseInt(r.getAttribute('qty'));
                        total -= iPrice;
                        t.innerHTML = total;
                    }                        
                    
                    // Decrease cart items counter after deleting item 
                    var e = document.getElementById('cartCounter');
                    if(e){
                        var c = e.getAttribute('cartItems');
                        e.innerHTML = c - 1;
                        e.setAttribute('cartItems',c - 1)
                        if(c == 1){
                            // Last row was deleted => Cart page become empty
                            document.getElementById("noCartMessage").style.display = 'table-row';
                            document.getElementById('createOrder').style.display = 'none';
                        }
                    }                                            
                } else {
                    console.log('Delete Cart Item Error: Could not find TR !');
                }
            } else {
                console.log('Delete Cart Item Error: '+ JSON.stringify(newResponsePayload));    
            }
        });            
    } else {
        console.log('Delete Cart Item Error: Invalid tokenId or cartId');
    }
};

// Update cart items counter
app.updateCartItemsCounter = function(id){
    var tokenId = typeof(app.config.sessionToken.id) == 'string' ? app.config.sessionToken.id : false;
    var tokenEmail = typeof(app.config.sessionToken.email) == 'string' ? app.config.sessionToken.email : false;
    var cartEmail = typeof(app.config.sessionCart.email) == 'string' ? app.config.sessionCart.email : false;
    if(tokenId && tokenEmail == cartEmail){
        var queryStringObject = {'id' : id};
        app.client.request(undefined,'api/carts','GET',queryStringObject,undefined,function(statusCode,responsePayload){
            if(statusCode == 200){
                var c = responsePayload.cartItems.length;
                var e = document.getElementById('cartCounter');
                if(e){
                    e.setAttribute('cartItems',c);
                    e.innerHTML = c;                                    
                }
            } else {
                if(statusCode == 404){
                    // Cart ID did not exist => Remove cart from localStorage
                    app.config.sessionCart = false;
                    localStorage.setItem('cart',false);
                }
                console.log('Get Cart Counters Error: '+ JSON.stringify(responsePayload));    
            }
        });            
    } else {
        var e = document.getElementById('cartCounter');
        if(e){
            e.setAttribute('cartItems',0);
            e.innerHTML = 0;                                    
        }        
    }
};

// Get total price
app.getCartItemsTotal = function(callback){
    var tokenId = typeof(app.config.sessionToken.id) == 'string' ? app.config.sessionToken.id : false;
    var tokenEmail = typeof(app.config.sessionToken.email) == 'string' ? app.config.sessionToken.email : false;
    var cartId = typeof(app.config.sessionCart.cartId) == 'string' ? app.config.sessionCart.cartId : false;
    var cartEmail = typeof(app.config.sessionCart.email) == 'string' ? app.config.sessionCart.email : false;
    if(tokenId && cartId && tokenEmail == cartEmail){
        var queryStringObject = {'id' : cartId};
        app.client.request(undefined,'api/carts','GET',queryStringObject,undefined,function(statusCode,responsePayload){
            if(statusCode == 200){                
                // Get cart items
                var cartItems = typeof(responsePayload.cartItems) == 'object' && responsePayload.cartItems instanceof Array && responsePayload.cartItems.length > 0 ? responsePayload.cartItems : [];
                if(cartItems.length > 0){
                    var totalPrice = 0;
                    // Loop through cart-items to calculate total price
                    cartItems.forEach(function(cItem){
                        totalPrice += cItem.price * cItem.quantity;
                    });
                    callback(totalPrice);
                } else {
                    console.log('Get Total Price: Empty Cart List !!');    
                    callback(0);                    
                }
            } else {
                console.log('Get Total Price Error: '+ JSON.stringify(responsePayload));    
                callback(0);
            }
        });            
    } else {
        console.log('Get Total Price Error: Invalid Parameters');
        callback(0);
    }
};

// Get the session cart from localstorage and set it in the app.config object
app.getSessionCart = function(){
  var cartString = localStorage.getItem('cart');
  if(typeof(cartString) == 'string'){
    try{
      var cart = JSON.parse(cartString);
      app.config.sessionCart = cart;
    }catch(e){
      app.config.sessionCart = false;
    }
  }
};

// Loop to renew token often befor expiration
app.tokenRenewalLoop = function(){
  setInterval(function(){
    app.renewToken(function(err){
      if(!err){
        console.log("Token renewed successfully @ "+Date.now());
      }
    });
  },1000 * 58);
};

// Init (bootstrapping)
app.init = function(){

  // Bind all form submissions
  app.bindForms();

  // Bind logout logout button
  app.bindLogoutButton();

  // Get the token from localstorage
  app.getSessionToken();

  // Renew token
  app.tokenRenewalLoop();

  // Load data on page
  app.loadDataOnPage();

};

// Call the init processes after the window loads
window.onload = function(){
  app.init();
};
