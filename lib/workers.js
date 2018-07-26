/*
 * Worker-related tasks
 *
 */

 // Dependencies
var path = require('path');
var fs = require('fs');
var _data = require('./data');
var https = require('https');
var http = require('http');
var helpers = require('./helpers');
var url = require('url');
var _logs = require('./logs');
var util = require('util');
var debug = util.debuglog('workers');

// Instantiate the worker module object
var workers = {};


// Remove expired tokens
workers.removeExpiredTokens = function(){
    // List all token files
    _data.list('tokens',function(err,tokens){
    if(!err && tokens && tokens.length > 0){
      tokens.forEach(function(tokenName){
        var tokenId = tokenName.replace('.json','');
        // Check token data
        _data.read('tokens',tokenId,function(err,tokenData){
          if(!err && tokenData){
            // Delete expired token
            if(tokenData.expires < Date.now()){
                _data.delete('tokens',tokenId,function(err){
                  if(!err){
                    debug("Successfully deleted expired token: "+tokenId);
                  } else {
                    debug('Error: Could not delete the specified token: '+tokenId);
                  }
                });                
            }
          } else {
            debug('Error: Could not find the specified token.');
          }
        });                  
      });
    } else {
      debug('Error: Could not find any orders');
    }
    });
};

// Timer to remove expired tokens once per day
workers.clearTokensLoop = function(){
  setInterval(function(){
    workers.removeExpiredTokens();
  },1000 * 60 * 60 * 24);
}

// Init script
workers.init = function(){

    // Send to console, in yellow
    console.log('\x1b[33m%s\x1b[0m','Background workers are running');

    //  Call the loop to remove expired tokens
    workers.clearTokensLoop();
    
    // Execute removeExpiredTokens immediately [for testing]
    workers.removeExpiredTokens();
    
};


 // Export the module
 module.exports = workers;
