var request = require( "./request-wrapper.js" ),
    query = require( "querystring" ),
    merge = require( "merge" ),
    GitHubAPIClient;

/**
 * github api client.
 * @class GitHubAPIClient
 * @param {Object} options
 *  @param {String} token access token for github api.
 *  @param {String} author a auther name for repogitry.
 *  @param {String} repos a github repogitry name.
 *  @param {Object} requestOptions a options for request.
 */
module.exports = GitHubAPIClient = function( options ) {
  this.headers = {
    "Authorization": "token " + options.token,
    "User-Agent": "GitHubAPIClient"
  }
  this.baseUrl = "https://api.github.com";
  this.author = options.author;
  this.repos = options.repos;
  this.request = function( req ) {
    return request( merge( options.requestOptions, req ) );
  }
  /**
   * github api client.
   * @method get
   * @param {String} type a type for get data. like pull, issues
   *  @param {String} author a auther name for repogitry.
   *  @param {String} repos a github repogitry name.
   */
  this.get = function( type, data ) {
    var url = this.baseUrl + "/repos/" + this.author + "/" + this.repos + "/" + type;
    if ( data ) {
      url += "?" + query.stringify( data );
    }
    return this.request( {
      url: url,
      method: "GET",
      headers: this.headers,
      json: true
    } );
  };

  this.post = function( url, headers, data ) {

  };

  this.getPullRequest = function() {
    return this.get( "pulls" );
  };

  this.getMilestones = function() {
    return this.get( "milestones" );
  };
};
