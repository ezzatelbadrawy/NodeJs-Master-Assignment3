/*
 * Request Handlers
 *
 */

// Dependencies
var _data = require('./data');
var helpers = require('./helpers');
var config = require('./config');
var util = require('util');
var debug = util.debuglog('handlers');

// Define all the handlers
var handlers = {};


/*=======================================================================================*/ 
// GUI handlers => html pages

// Index
handlers.index = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Home',
      'head.description' : 'We offer delicious pizza',
      'body.class' : 'index'
    };
    // Read in a template as a string
    helpers.getTemplate('index',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Create Account
handlers.accountCreate = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Create an Account',
      'head.description' : 'Signup is easy and only takes a few seconds.',
      'body.class' : 'accountCreate'
    };
    // Read in a template as a string
    helpers.getTemplate('accountCreate',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Create New Session
handlers.sessionCreate = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Login to your account.',
      'head.description' : 'Please enter your email and password to access your account.',
      'body.class' : 'sessionCreate'
    };
    // Read in a template as a string
    helpers.getTemplate('sessionCreate',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Edit Your Account
handlers.accountEdit = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Account Settings',
      'body.class' : 'accountEdit'
    };
    // Read in a template as a string
    helpers.getTemplate('accountEdit',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Session has been deleted
handlers.sessionDeleted = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Logged Out',
      'head.description' : 'You have been logged out of your account.',
      'body.class' : 'sessionDeleted'
    };
    // Read in a template as a string
    helpers.getTemplate('sessionDeleted',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Account has been deleted
handlers.accountDeleted = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Account Deleted',
      'head.description' : 'Your account has been deleted.',
      'body.class' : 'accountDeleted'
    };
    // Read in a template as a string
    helpers.getTemplate('accountDeleted',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Menu (view all menu items)
handlers.menuList = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Menu Delivery',
      'body.class' : 'menuList'
    };
    // Read in a template as a string
    helpers.getTemplate('menuList',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Cart (view cart items)
handlers.cartList = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Cart List',
      'body.class' : 'cartList'
    };
    // Read in a template as a string
    helpers.getTemplate('cartList',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Create a new order
handlers.orderCreate = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Create Order',
      'body.class' : 'orderCreate'
    };
    // Read in a template as a string
    helpers.getTemplate('orderCreate',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Public assets
handlers.public = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Get the filename being requested
    var trimmedAssetName = data.trimmedPath.replace('public/','').trim();
    if(trimmedAssetName.length > 0){
      // Read in the asset's data
      helpers.getStaticAsset(trimmedAssetName,function(err,data){
        if(!err && data){

          // Determine the content type (default to plain text)
          var contentType = 'plain';

          if(trimmedAssetName.indexOf('.css') > -1){
            contentType = 'css';
          }

          if(trimmedAssetName.indexOf('.png') > -1){
            contentType = 'png';
          }

          if(trimmedAssetName.indexOf('.jpg') > -1){
            contentType = 'jpg';
          }

          if(trimmedAssetName.indexOf('.ico') > -1){
            contentType = 'favicon';
          }

          // Callback the data
          callback(200,data,contentType);
        } else {
          callback(404);
        }
      });
    } else {
      callback(404);
    }

  } else {
    callback(405);
  }
};

/*=======================================================================================*/ 


/*=======================================================================================*/ 
// Not-Found
handlers.notFound = function(data,callback){
  callback(404);
};
/*=======================================================================================*/ 


/*=======================================================================================*/ 
// api/Menu 
handlers.menu = function(data,callback){
  var acceptableMethods = ['get'];
  if(acceptableMethods.indexOf(data.method) > -1){
    handlers._menu[data.method](data,callback);
  } else {
    callback(405);
  }
};

// Container for all menu methods
handlers._menu  = {};

// Menu - get
// Required data: none
// Optional data: itemid to return the specified item
handlers._menu.get = function(data,callback){
    // Get optional data
    var itemId = typeof(data.queryStringObject.itemid) == 'string' ? data.queryStringObject.itemid : false;

    // Get token from headers
    var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
    
    // Verify that the given token is valid for the email address
    handlers._tokens.verifyToken2(token,function(tokenIsValid){
      if(tokenIsValid){
        // Lookup menu items
        _data.read('menu','menitems',function(err,data){
          if(!err && data){
              if(itemId){
                  // Return specified item
                  itemId = parseInt(itemId);
                  var menuItems = data.menu.items;
                  if(menuItems){
                      var menuitem = menuItems.find(function(item){ return item.id === itemId; });
                      if(menuitem){
                          callback(200,menuitem);
                      } else {
                          callback(404,{'Error' : 'Could not find menu-item #'+itemId});
                      }                      
                  } else {
                      callback(500,{'Error' : 'Menu data parsing error'});
                  }                  
              } else {
                  // Return all items
                  callback(200,data);
              }                          
          } else {
            callback(404,{'Error' : 'Could not find menu-items'});
          }
        });          
      } else {
        callback(403,{"Error" : "Missing required token in header, or token is invalid."});
      }
    });
};


// Menu-Item validation
handlers._menu.validateItem = function(menuData,selectedItem){
    // Type validation
    var itemId = typeof(selectedItem.itemId) == 'number' && selectedItem.itemId % 1 === 0 && selectedItem.itemId > 0 ? selectedItem.itemId : false;   
    var size = typeof(selectedItem.size) == 'string' && ['small','medium','large'].indexOf(selectedItem.size.toLowerCase()) > -1 ? selectedItem.size.toLowerCase() : false;    
    var price = typeof(selectedItem.price) == 'number' && selectedItem.price % 1 === 0 && selectedItem.price > 0 ? selectedItem.price : false;        
    var quantity = typeof(selectedItem.quantity) == 'number' && selectedItem.quantity % 1 === 0 && selectedItem.quantity > 0 ? selectedItem.quantity : false;        
    if(!(itemId && size && price && quantity)){
        return {'Error': `This item (itemId: ${itemId}) is invalid`};
    } else {
        // Existence Validation
        var menuitem = menuData.menu.items.find(function(item){ return item.id === itemId; });
        if(typeof(menuitem) == 'object'){
            if(menuitem.availableQuantity >= quantity){
                var priceObj = menuitem.prices.find(function(item){ return item.size === size; });
                if(typeof(priceObj) == 'object'){
                    if(priceObj.price == price){
                        return false;     // No errors => success                        
                    } else {
                        return {'Error:' : `The price of selected size for this item (itemId: ${itemId}) is invalid.`};    
                    }
                } else {
                    return {'Error:' : `The selected size for this item (itemId: ${itemId}) does not exit.`};
                }
            } else {
                return {'Error:' : `The selected quantity for this item (itemId: ${itemId}) not availabel.`};
            }
        } else {
            return {'Error:' : `This Item (itemIdd: ${itemId}) does not exist.`};
        }            
    }          
};
/*=======================================================================================*/ 


/*=======================================================================================*/ 
// api/Users
handlers.users = function(data,callback){
  var acceptableMethods = ['post','get','put','delete'];
  if(acceptableMethods.indexOf(data.method) > -1){
    handlers._users[data.method](data,callback);
  } else {
    callback(405);
  }
};

// Container for all the users methods
handlers._users  = {};

// Users - post
// Required data: firstName, lastName, email, address, password, tosAgreement
// Optional data: none
handlers._users.post = function(data,callback){
  // Check that all required fields are filled out
  var firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
  var lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
  var email = typeof(data.payload.email) == 'string' && data.payload.email.trim().length > 0 && helpers.validateEmail(data.payload.email.trim()) ? data.payload.email.trim() : false;
  var address = typeof(data.payload.address) == 'string' && data.payload.address.trim().length > 0 ? data.payload.address.trim() : false;
  var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
  var tosAgreement = typeof(data.payload.tosAgreement) == 'boolean' && data.payload.tosAgreement == true ? true : false;
       
  if(firstName && lastName && email && address && password && tosAgreement){
    // Make sure the user doesnt already exist
    _data.read('users',email,function(err,data){
      if(err){
        // Hash the password
        var hashedPassword = helpers.hash(password);

        // Create the user object
        if(hashedPassword){
          var userObject = {
            'firstName' : firstName,
            'lastName' : lastName,
            'email' : email,
            'address' : address,              
            'hashedPassword' : hashedPassword,
            'tosAgreement' : true
          };

          // Store the user
          _data.create('users',email,userObject,function(err){
            if(!err){
              callback(200);
            } else {
              callback(500,{'Error' : 'Could not create the new user'});
            }
          });
        } else {
          callback(500,{'Error' : 'Could not hash the user\'s password.'});
        }

      } else {
        // User alread exists
        callback(400,{'Error' : 'A user with that email address already exists'});
      }
    });

  } else {
    callback(400,{'Error' : 'Missing or invalid required fields'});
  }

};

// Users - get
// Required data: email
// Optional data: none
handlers._users.get = function(data,callback){
  // Check that email address is valid
  var email = typeof(data.queryStringObject.email) == 'string' && data.queryStringObject.email.trim().length > 0 && helpers.validateEmail(data.queryStringObject.email.trim()) ? data.queryStringObject.email.trim() : false;
  if(email){

    // Get token from headers
    var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
    // Verify that the given token is valid for the email address
    handlers._tokens.verifyToken(token,email,function(tokenIsValid){
      if(tokenIsValid){
        // Lookup the user
        _data.read('users',email,function(err,data){
          if(!err && data){
            // Remove the hashed password from the user user object before returning it to the requester
            delete data.hashedPassword;
            callback(200,data);
          } else {
            callback(404,{'Error' : 'Could not find the specified user'});
          }
        });
      } else {
        callback(403,{"Error" : "Missing required token in header, or token is invalid for specified email."})
      }
    });
  } else {
    callback(400,{'Error' : 'Missing or invalid required field(s)'})
  }
};

// Users - put
// Required data: email
// Optional data: firstName, lastName, address, password (at least one must be specified)
handlers._users.put = function(data,callback){
  // Check for required field
  var email = typeof(data.payload.email) == 'string' && data.payload.email.trim().length > 0 && helpers.validateEmail(data.payload.email.trim()) ? data.payload.email.trim() : false;

  // Check for optional fields
  var firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
  var lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
  var address = typeof(data.payload.address) == 'string' && data.payload.address.trim().length > 0 ? data.payload.address.trim() : false;    
  var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;

  // Error if email is invalid
  if(email){
    // Error if nothing is sent to update
    if(firstName || lastName || address || password){

      // Get token from headers
      var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;

      // Verify that the given token is valid for the email address
      handlers._tokens.verifyToken(token,email,function(tokenIsValid){
        if(tokenIsValid){

          // Lookup the user
          _data.read('users',email,function(err,userData){
            if(!err && userData){
              // Update the fields if necessary
              if(firstName){
                userData.firstName = firstName;
              }
              if(lastName){
                userData.lastName = lastName;
              }
              if(address){
                userData.address = address;
              }                
              if(password){
                userData.hashedPassword = helpers.hash(password);
              }
              // Store the new updates
              _data.update('users',email,userData,function(err){
                if(!err){
                  callback(200);
                } else {
                  callback(500,{'Error' : 'Could not update the user.'});
                }
              });
            } else {
              callback(400,{'Error' : 'Specified user does not exist.'});
            }
          });
        } else {
          callback(403,{"Error" : "Missing required token in header, or token is invalid for specified email."});
        }
      });
    } else {
      callback(400,{'Error' : 'Missing fields to update.'});
    }
  } else {
    callback(400,{'Error' : 'Missing or invalid required field.'});
  }

};

// Users - delete
// Required data: email
// Cleanup all carts and orders associated with the user
handlers._users.delete = function(data,callback){
  // Check that email address is valid
  var email = typeof(data.queryStringObject.email) == 'string' && data.queryStringObject.email.trim().length > 0 && helpers.validateEmail(data.queryStringObject.email.trim()) ? data.queryStringObject.email.trim() : false;
  if(email){

    // Get token from headers
    var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;

    // Verify that the given token is valid for the email address
    handlers._tokens.verifyToken(token,email,function(tokenIsValid){
      if(tokenIsValid){
        // Lookup the user
        _data.read('users',email,function(err,userData){
          if(!err && userData){
            // Delete the user's data
            _data.delete('users',email,function(err){
              if(!err){
                // Delete each of the carts associated with the user
                var userCarts = typeof(userData.carts) == 'object' && userData.carts instanceof Array ? userData.carts : [];
                var cartsToDelete = userCarts.length;
                if(cartsToDelete > 0){
                  var cartsDeleted = 0;
                  var deletionErrors = false;
                  // Loop through the carts
                  userCarts.forEach(function(cartId){
                    // Delete the cart
                    _data.delete('carts',cartId,function(err){
                      if(err){
                        deletionErrors = true;
                      }
                      cartsDeleted++;
                      if(cartsDeleted == cartsToDelete){
                        if(!deletionErrors){                                                        
                            // Delete each of the orders associated with the user
                            var userOrders = typeof(userData.orders) == 'object' && userData.orders instanceof Array ? userData.orders : [];
                            var ordersToDelete = userOrders.length;
                            if(ordersToDelete > 0){
                                var ordersDeleted = 0;
                                var deletionErrors2 = false;
                                // Loop through the orders
                                userOrders.forEach(function(orderId){
                                    // Delete the order
                                    _data.delete('orders',orderId,function(err){
                                        if(err){
                                            deletionErrors2 = true;
                                        }
                                        ordersDeleted++;
                                        if(ordersDeleted == ordersToDelete){
                                            if(!deletionErrors2){
                                                callback(200);                                                
                                            } else {
                                                callback(500,{'Error' : "Errors encountered while attempting to delete all of the user's orders. All orders may not have been deleted from the system successfully."});    
                                            }
                                        }
                                    });
                                });
                                
                            } else {
                                callback(200);
                            }                                                      
                        } else {
                          callback(500,{'Error' : "Errors encountered while attempting to delete all of the user's carts. All carts may not have been deleted from the system successfully."})
                        }
                      }
                    });                      
                  });
                } else {
                  callback(200);
                }
              } else {
                callback(500,{'Error' : 'Could not delete the specified user'});
              }
            });
          } else {
            callback(400,{'Error' : 'Could not find the specified user.'});
          }
        });
      } else {
        callback(403,{"Error" : "Missing required token in header, or token is invalid for specified email."});
      }
    });
  } else {
    callback(400,{'Error' : 'Missing or invalid required field(s)'})
  }
};
/*=======================================================================================*/ 


/*=======================================================================================*/ 
// api/Tokens
handlers.tokens = function(data,callback){
  var acceptableMethods = ['post','get','put','delete'];
  if(acceptableMethods.indexOf(data.method) > -1){
    handlers._tokens[data.method](data,callback);
  } else {
    callback(405);
  }
};

// Container for all the tokens methods
handlers._tokens  = {};

// Tokens - post
// Required data: email, password
// Optional data: none
handlers._tokens.post = function(data,callback){
  var email = typeof(data.payload.email) == 'string' && data.payload.email.trim().length > 0 && helpers.validateEmail(data.payload.email.trim()) ? data.payload.email.trim() : false;
  var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
  if(email && password){
    // Lookup the user who matches that email address
    _data.read('users',email,function(err,userData){
      if(!err && userData){
        // Hash the sent password, and compare it to the password stored in the user object
        var hashedPassword = helpers.hash(password);
        if(hashedPassword == userData.hashedPassword){
          // If valid, create a new token with a random name. Set an expiration date 1 hour in the future.
          var tokenId = helpers.createRandomString(20);
          var expires = Date.now() + 1000 * 60 * 60;
          var tokenObject = {
            'email' : email,
            'id' : tokenId,
            'expires' : expires
          };

          // Store the token
          _data.create('tokens',tokenId,tokenObject,function(err){
            if(!err){
              callback(200,tokenObject);
            } else {
              callback(500,{'Error' : 'Could not create the new token'});
            }
          });
        } else {
          callback(400,{'Error' : 'Password did not match the specified user\'s stored password'});
        }
      } else {
        callback(400,{'Error' : 'Could not find the specified user.'});
      }
    });
  } else {
    callback(400,{'Error' : 'Missing or invalid required field(s).'})
  }
};

// Tokens - get
// Required data: id
// Optional data: none
handlers._tokens.get = function(data,callback){
  // Check that id is valid
  var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
  if(id){
    // Lookup the token
    _data.read('tokens',id,function(err,tokenData){
      if(!err && tokenData){
        callback(200,tokenData);
      } else {
        callback(404,{'Error' : 'Could not find the specified token'});
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required field, or field invalid'})
  }
};

// Tokens - put
// Required data: id, extend
// Optional data: none
handlers._tokens.put = function(data,callback){
  var id = typeof(data.payload.id) == 'string' && data.payload.id.trim().length == 20 ? data.payload.id.trim() : false;
  var extend = typeof(data.payload.extend) == 'boolean' && data.payload.extend == true ? true : false;
  if(id && extend){
    // Lookup the existing token
    _data.read('tokens',id,function(err,tokenData){
      if(!err && tokenData){
        // Check to make sure the token isn't already expired
        if(tokenData.expires > Date.now()){
          // Set the expiration an hour from now
          tokenData.expires = Date.now() + 1000 * 60 * 60;
          // Store the new updates
          _data.update('tokens',id,tokenData,function(err){
            if(!err){
              callback(200);
            } else {
              callback(500,{'Error' : 'Could not update the token\'s expiration.'});
            }
          });
        } else {
          callback(400,{"Error" : "The token has already expired, and cannot be extended."});
        }
      } else {
        callback(400,{'Error' : 'Specified user does not exist.'});
      }
    });
  } else {
    callback(400,{"Error": "Missing required field(s) or field(s) are invalid."});
  }
};

// Tokens - delete
// Required data: id
// Optional data: none
handlers._tokens.delete = function(data,callback){
  // Check that id is valid
  var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
  if(id){
    // Lookup the token
    _data.read('tokens',id,function(err,tokenData){
      if(!err && tokenData){
        // Delete the token
        _data.delete('tokens',id,function(err){
          if(!err){
            callback(200);
          } else {
            callback(500,{'Error' : 'Could not delete the specified token'});
          }
        });
      } else {
        callback(400,{'Error' : 'Could not find the specified token.'});
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required field'})
  }
};

// Verify if a given token id is currently valid for a given user
handlers._tokens.verifyToken = function(id,email,callback){
  // Lookup the token
  _data.read('tokens',id,function(err,tokenData){
    if(!err && tokenData){
      // Check that the token is for the given user and has not expired
      if(tokenData.email == email && tokenData.expires > Date.now()){
        callback(true);
      } else {
        callback(false);
      }
    } else {
      callback(false);
    }
  });
};

// Verify if a given token id is currently valid (without any given user)
handlers._tokens.verifyToken2 = function(id,callback){
  // Lookup the token
  _data.read('tokens',id,function(err,tokenData){
    if(!err && tokenData){
      // Check that the token has not expired
      if(tokenData.expires > Date.now()){
        callback(true);
      } else {
        callback(false);
      }
    } else {
      callback(false);
    }
  });
};
/*=======================================================================================*/ 


/*=======================================================================================*/ 
// api/Carts
handlers.carts = function(data,callback){
  var acceptableMethods = ['post','get','put','delete'];
  if(acceptableMethods.indexOf(data.method) > -1){
    handlers._carts[data.method](data,callback);
  } else {
    callback(405);
  }
};

// Container for all the carts methods
handlers._carts  = {};


// carts - post
// Required data: array object each item contain itemId, size, price, quantity
// Optional data: none
handlers._carts.post = function(data,callback){
  // Validate inputs
  var cartItems = typeof(data.payload) == 'object' && data.payload instanceof Array ? data.payload : [];
        
  if(cartItems && cartItems.length > 0){
    // Get token from headers
    var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
      
    // Lookup the user email by reading the token
    _data.read('tokens',token,function(err,tokenData){
      if(!err && tokenData){
          var userEmail = tokenData.email;

          // Check that the token has not expired
          if(tokenData.expires < Date.now()){
            callback(403,{"Error" : "Invalid or expired token."});
          } else {
            // Lookup the user data
            _data.read('users',userEmail,function(err,userData){
            if(!err && userData){
                var usercarts = typeof(userData.carts) == 'object' && userData.carts instanceof Array ? userData.carts : [];

                // Create random id for cart
                var cartId = helpers.createRandomString(20);
              
                // Create cart object including useremail
                var cartObject = {
                    'id' : cartId,
                    'useremail' : userEmail,
                    'cartItems' : []
                };

                // Lookup menu items data
                _data.read('menu','menitems',function(err,mData){
                    if(!err && mData){
                        // Parsing menu items string data to JSON object
                        if(mData.menu && mData.menu.items){
                            var errMsgs = [];
                            cartItems.forEach(function(sItem){
                                var xRet = handlers._menu.validateItem(mData,sItem);
                                if(xRet){
                                    errMsgs.push(xRet);
                                } else {
                                    cartObject.cartItems.push(sItem);
                                }                            
                            });
                            
                            // Check if any error exist in cartItems list or not
                            if(errMsgs && errMsgs.length > 0) {
                                callback(400,{'Errors': errMsgs});
                            } else {
                                // Save cart object
                                _data.create('carts',cartId,cartObject,function(err){
                                    if(!err){
                                      // Add cart id to the user's object
                                      userData.carts = usercarts;
                                      userData.carts.push(cartId);

                                      // Update user data with new cartId
                                      _data.update('users',userEmail,userData,function(err){
                                        if(!err){
                                          // Return the id of the new cart and also userEmail which will be needed in some verification at frontend
                                          callback(200,{'cartId' : cartId, 'email' : userEmail});
                                        } else {
                                          callback(500,{'Error' : 'Could not update the user with the new cart.'});
                                        }
                                      });
                                    } else {
                                      callback(500,{'Error' : 'Could not create the new cart'});
                                    }
                                });                                            
                            } 
                        } else {
                            callback(400, {'Error:' : 'Cannot parse menu-items object.'});
                        }
                    } else {
                        callback(400, {'Error:' : 'Cannot read menu-items data.'});
                    }
                });               
            } else {
                callback(400,{'Error' : 'Could not find the specified user.'});
            }                        
          });

          }          
      } else {
        callback(400,{'Error' : 'Specified user does not exist.'});
      }        
    });
  } else {
    callback(400,{'Error' : 'Missing required inputs, or inputs are invalid'});
  }
};

// carts - get
// Required data: id
// Optional data: none
handlers._carts.get = function(data,callback){
  // Check that id is valid
  var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
  if(id){
    // Lookup the cart
    _data.read('carts',id,function(err,cartData){
      if(!err && cartData){
        // Get the token that sent the request
        var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
        // Verify that the given token is valid and belongs to the user who created the cart
        handlers._tokens.verifyToken(token,cartData.useremail,function(tokenIsValid){
          if(tokenIsValid){
            // Return cart data
            callback(200,cartData);
          } else {
            callback(403,{"Error" : "Invalid or expired token."});
          }
        });
      } else {
        callback(404,{'Error' : 'Cart ID did not exist'});
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required field, or field invalid'})
  }
};

// carts - put
// Required data: id
// Optional data: array object each item contain itemId, size, quantity (one item must be sent)
handlers._carts.put = function(data,callback){
  // Check for required field
  var id = typeof(data.payload.id) == 'string' && data.payload.id.trim().length == 20 ? data.payload.id.trim() : false;

  // Check for optional array object
  var cartItems = typeof(data.payload.cartItems) == 'object' && data.payload.cartItems instanceof Array ? data.payload.cartItems : [];
    
  // Error if id is invalid
  if(id){
    // Error if nothing is sent to update
    if(cartItems.length > 0){
      // Lookup the cart
      _data.read('carts',id,function(err,cartData){
        if(!err && cartData){
          // Get the token that sent the request
          var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
          // Verify that the given token is valid and belongs to the user who created the cart
          handlers._tokens.verifyToken(token,cartData.useremail,function(tokenIsValid){
            if(tokenIsValid){

                // Lookup the user data
                _data.read('users',cartData.useremail,function(err,userData){
                if(!err && userData){
                    var usercarts = typeof(userData.carts) == 'object' && userData.carts instanceof Array ? userData.carts : [];

                    // Lookup menu items data
                    _data.read('menu','menitems',function(err,mData){
                        if(!err && mData){
                            // Parsing menu items string data to JSON object
                            if(mData.menu && mData.menu.items){
                                var errMsgs = [];
                                cartItems.forEach(function(sItem){
                                    var xRet = handlers._menu.validateItem(mData,sItem);
                                    if(xRet){
                                        errMsgs.push(xRet);
                                    }                            
                                });

                                // Check if any error exist in cartItems list or not
                                if(errMsgs && errMsgs.length > 0) {
                                    callback(400,{'Errors': errMsgs});
                                } else {
                                    // Update cart data
                                    cartItems.forEach(function(sItem){
                                        var cItem = cartData.cartItems.find(function(item){ return item.itemId === sItem.itemId; });
                                        if(cItem){
                                            // Update cartData
                                            var idx = cartData.cartItems.indexOf(cItem);
                                            cartData.cartItems[idx] =sItem;                                                                                        
                                        } else {
                                            // Add new cartitem to cartData & its itemId to userData
                                            cartData.cartItems.push(sItem);
                                            userData.carts.push(sItem.itemId);
                                        }
                                    });
                                    
                                    // Store the new updates
                                    _data.update('carts',id,cartData,function(err){
                                        if(!err){
                                            // Return the id of updated cart
                                            callback(200,{'cartId' : id});                                            
                                        } else {
                                            callback(500,{'Error' : 'Could not update the cart.'});
                                        }
                                    });
                                } 
                            } else {
                                callback(400, {'Error:' : 'Cannot parse menu-items object.'});
                            }
                        } else {
                            callback(400, {'Error:' : 'Cannot read menu-items data.'});
                        }
                    });               
                } else {
                    callback(400,{'Error' : 'Could not find the specified user.'});
                }                        
              });                                
            } else {
              callback(403,{"Error" : "Invalid or expired token."});
            }
          });
        } else {
          callback(400,{'Error' : 'Cart ID did not exist.'});
        }
      });
    } else {
      callback(400,{'Error' : 'Missing fields to update.'});
    }
  } else {
    callback(400,{'Error' : 'Missing required field.'});
  }
};


// carts - delete
// Required data: id
// Optional data: itemid => delete this item only, forced => if true then ignore token check
handlers._carts.delete = function(data,callback){
  // Get required parameter
  var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
  // Get optional parameter
  var itemId = typeof(data.queryStringObject.itemid) == 'string' && data.queryStringObject.itemid.trim().length > 0 ? data.queryStringObject.itemid : false;   
  var forced = typeof(data.queryStringObject.forced) == 'string' && data.queryStringObject.forced.toLowerCase() == 'true' ? true : false;
    
  // Check required data
  if(id){
    // Lookup the cart
    _data.read('carts',id,function(err,cartData){
      if(!err && cartData){
        // Get the token that sent the request
        var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
        // Verify that the given token is valid and belongs to the user who created the cart
        handlers._tokens.verifyToken(token,cartData.useremail,function(tokenIsValid){
          if(tokenIsValid || forced){
            // Check optional data
            if(itemId){
                // Delete the cart item only
                itemId = parseInt(itemId);
                var cItem = cartData.cartItems.find(function(item){ return item.itemId === itemId; });
                if(cItem){
                    var idx = cartData.cartItems.indexOf(cItem);
                    //console.log('idx: '+idx);
                    cartData.cartItems.splice(idx,1);
                    
                    // Store the new updates
                    _data.update('carts',id,cartData,function(err){
                        if(!err){
                            // Return the id of updated cart
                            callback(200,{'cartId' : id});                                            
                        } else {
                            callback(500,{'Error' : 'Could not update the cart.'});
                        }
                    });                    
                } else {
                    callback(400,{'Error' : 'Cart Item ID did not exist.'});    
                }                
            } else {
                // Delete the cart data
                _data.delete('carts',id,function(err){
                  if(!err){
                    // Lookup the user's object to get all their carts
                    _data.read('users',cartData.useremail,function(err,userData){
                      if(!err){
                        var usercarts = typeof(userData.carts) == 'object' && userData.carts instanceof Array ? userData.carts : [];

                        // Remove the deleted cart from their list of carts in userData
                        var cartPosition = usercarts.indexOf(id);
                        if(cartPosition > -1){
                          usercarts.splice(cartPosition,1);
                          // Re-save the user's data
                          userData.carts = usercarts;
                          _data.update('users',cartData.useremail,userData,function(err){
                            if(!err){
                              callback(200);
                            } else {
                              callback(500,{'Error' : 'Could not update the user.'});
                            }
                          });
                        } else {
                          callback(500,{"Error" : "Could not find the cart on the user's object, so could not remove it."});
                        }
                      } else {
                        callback(500,{"Error" : "Could not find the user who created the cart, so could not remove the cart from the list of carts on their user object."});
                      }
                    });
                  } else {
                    callback(500,{"Error" : "Could not delete the cart data."})
                  }
            });                
            }
          } else {
            callback(403,{"Error" : "Invalid or expired token."});
          }
        });
      } else {
        callback(400,{"Error" : "The cart ID specified could not be found"});
      }
    });
  } else {
    callback(400,{"Error" : "Missing valid id"});
  }
};
/*=======================================================================================*/ 


/*=======================================================================================*/ 
// api/Orders
handlers.orders = function(data,callback){
  var acceptableMethods = ['post','get'];
  if(acceptableMethods.indexOf(data.method) > -1){
    handlers._orders[data.method](data,callback);
  } else {
    callback(405);
  }
};

// Container for all the orders methods
handlers._orders  = {};


// orders - post
// Required data: cartId
// Optional data: none
handlers._orders.post = function(data,callback){
  // Validate inputs
  var cartId = typeof(data.payload.cartId) == 'string' && data.payload.cartId.trim().length == 20 ? data.payload.cartId.trim() : false;
  if(cartId){
        // Get token from headers
        var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;

        // Lookup the cart data
        _data.read('carts',cartId,function(err,cartData){
        if(!err && cartData){
            var userEmail = cartData.useremail;

            // Verify that the given token is valid and belongs to the user who created the cart
            handlers._tokens.verifyToken(token,userEmail,function(tokenIsValid){
              if(tokenIsValid){
                // Calculate order total cost
                var totalCost = 0;
                cartData.cartItems.forEach(function(cItem){
                    totalCost += cItem.price * cItem.quantity
                });

                // Lookup the user data
                _data.read('users',userEmail,function(err,userData){
                  if(!err && userData){
                      var userOrders = typeof(userData.orders) == 'object' && userData.orders instanceof Array ? userData.orders : [];

                      // Create random id for order
                      var orderId = helpers.createRandomString(20);

                      // Create order object including userEmail
                      var orderObject = {
                        'id' : orderId,
                        'useremail' : userEmail,
                        'orderItmes' : cartData.cartItems,
                        'price' : totalCost,                          
                        'date' : Date.now(),
                        'paymentStatus' : 'Processing',                  
                      };

                      // Payment process
                      helpers.doPayment(totalCost,orderId,function(err){
                          if(!err){
                            // Payment process completed successfully
                             orderObject.paymentStatus = 'DONE';

                            // Save the new order
                            _data.create('orders',orderId,orderObject,function(err){
                                if(!err){
                                    // Add order id to the user's object
                                    userData.orders = userOrders;
                                    userData.orders.push(orderId);

                                    var secondaryErrs = [];

                                    // Delete cart data after saving order
                                    _data.delete('carts',cartId,function(err){
                                        if(!err){
                                            // Remove the deleted cart from their list of carts in userData
                                            var cartPosition = userData.carts.indexOf(cartId);
                                            if(cartPosition > -1){
                                                userData.carts.splice(cartPosition,1);
                                            } else {
                                                secondaryErrs.push('Could not find the cart on the user\'s object to remove it (cleanup issue).');
                                            }
                                        } else {
                                            secondaryErrs.push('Could not delete the cart data (cleanup issue).');
                                        }
                                    });

                                    // Update user data with the new order id
                                    _data.update('users',userEmail,userData,function(err){
                                        if(!err){
                                            // Send email notification to client
                                            var msg = `Your order (${orderId}) has been paid`;
                                            helpers.sendEmailNotification(userEmail,msg,function(err){
                                                if(!err){
                                                    debug('Email notification for order '+orderId)+' sent successfully';
                                                } else {
                                                    secondaryErrs.push('Error happen during sending email notification. Rx-Err:'+err);
                                                }
                                            });

                                            // Return the data about the new order
                                            if(secondaryErrs.length > 0){
                                                callback(200,{'orderId' : orderId, 'SecondaryErrors' : secondaryErrs});                                                                                                
                                            } else {
                                                callback(200,{'orderId' : orderId});                                                
                                            }
                                            
                                        } else {
                                            secondaryErrs.push('Could not update user data with the new order.');
                                            callback(200,{'orderId' : orderId, 'SecondaryErrors' : secondaryErrs});
                                        }
                                    });
                                } else {
                                    callback(500,{'Error' : 'Could not create the new order'});
                                }
                            });

                          } else {
                            callback(402,{'Error' : 'Payment process error: '+err});
                          }
                      });
                  } else {
                    callback(500,{"Error" : "Could not find the user who created the cart of this order."});
                  }
                });                                      
              } else {
                callback(403,{"Error" : "Invalid or expired token."});
              }
            });
        } else {
            callback(500,{"Error" : "Could not find the specified cart."});
        }
    });          
  } else {
    callback(400,{'Error' : 'Missing required inputs, or inputs are invalid'});
  }
};

// orders - get
// Required data: id
// Optional data: none
handlers._orders.get = function(data,callback){
  // Check that id is valid
  var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
  if(id){
    // Lookup the order
    _data.read('orders',id,function(err,orderData){
      if(!err && orderData){
        // Get the token that sent the request
        var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
        // Verify that the given token is valid and belongs to the user who created the order
        handlers._tokens.verifyToken(token,orderData.useremail,function(tokenIsValid){
          if(tokenIsValid){
            // Return order data
            callback(200,orderData);
          } else {
            callback(403,{"Error" : "Invalid or expired token."});
          }
        });
      } else {
        callback(404,{'Error' : 'Order ID did not exist'});
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required field, or field invalid'})
  }
};
/*=======================================================================================*/ 


// Export the handlers
module.exports = handlers;
