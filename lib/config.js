/*
 * Create and export configuration variables
 *
 */

// Container for all environments
var environments = {};

// Staging (default) environment
environments.staging = {
  'httpPort' : 3000,
  'httpsPort' : 3001,
  'envName' : 'staging',
  'hashingSecret' : 'Z1c0159',
  'stripe' : {
    'secret' : 'sk_test_QLDXSQk3D4lmSxOTdzZPiF39'
  },    
  'mailgun' : {
    'domain' : 'sandboxc1e5294e31464d408bdb5f396ef402a8.mailgun.org',
    'apiKeyBase64' : 'YXBpOmYzNzU2NTdmOThhODY1ZTgxYjczM2ZlOTYxNmZkNGU3LTg4ODkxMjdkLTU4MWQwZWQy',    // Buffer.from(apiKey).toString('base64')
    'fromEmail' : 'mailgun@sandboxc1e5294e31464d408bdb5f396ef402a8.mailgun.org'
  },
  'templateGlobals' : {
    'appName' : 'Hot Pizza !!',
    'companyName' : 'NotARealCompany, Inc.',
    'yearCreated' : '2018',
    'baseUrl' : 'http://localhost:3000/'
  }    
};

// Production environment
environments.production = {
  'httpPort' : 5000,
  'httpsPort' : 5001,
  'envName' : 'production',
  'hashingSecret' : '3zz@t357',
  'strip' : {
    'secret' : 'sk_test_ZC817xZyVcVXjNIOjnfjrzLC'
  },        
  'mailgun' : {
    'domain' : 'sandboxc1e5294e31464d408bdb5f396ef402a8.mailgun.org',
    'apiKeyBase64' : 'YXBpOmYzNzU2NTdmOThhODY1ZTgxYjczM2ZlOTYxNmZkNGU3LTg4ODkxMjdkLTU4MWQwZWQy',    // Buffer.from(apiKey).toString('base64')
    'fromEmail' : 'mailgun@sandboxc1e5294e31464d408bdb5f396ef402a8.mailgun.org'
  },
  'templateGlobals' : {
    'appName' : 'Hot Pizza !!',
    'companyName' : 'NotARealCompany, Inc.',
    'yearCreated' : '2018',
    'baseUrl' : 'http://localhost:5000/'
  }    
};

// Determine which environment was passed as a command-line argument
var currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check that the current environment is one of the environments above, if not default to staging
var environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;

// Export the module
module.exports = environmentToExport;
