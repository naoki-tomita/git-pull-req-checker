var request = require( "request" ),
    requestWrapper;

requestWrapper = function( options ) {
  return new Promise( function( resolve, reject ) {
    request( options, function( error, response, data ) {
      if ( error ) {
        reject( error );
      } else {
        resolve( data );
      }
    } );
  } );
};


module.exports = requestWrapper;
