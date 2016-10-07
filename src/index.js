var GitHubAPIClient = require( "./git-api-client.js" ),
    client;

client = new GitHubAPIClient( {
  token: "",
  author: "ricoh",
  repos: "si-apps",
  requestOptions: {
    proxy: "http://ricollabo.src.ricoh.co.jp:3128"
  }
} );

client.getPullRequest()
.then( function( response ) {
  var curPull;
  for ( var i in response ) {
    curPull = response[ i ];
    if ( curPull.assignees.length === 0 ) {
      continue;
    }
    if ( !isMilestoneThisWeek( curPull ) ) {
      continue;
    }
    console.log( curPull.title )
    for ( var j in curPull.assignees ) {
      console.log( " → " + curPull.assignees[ j ].login );
    }
  }
} )
.catch( function( e ) {
  console.log( e );
} );

function isMilestoneThisWeek( pull ) {
  var due = new Date( pull.milestone.due_on ), friday, diff;
  friday = getThisFriday();
  diff = ( due.getTime() - friday.getTime() ) / ( 1000 * 60 * 60 * 24 );
  if ( diff > 0 && diff < 6  ) {
    return true;
  }
  return false;
};

function getThisFriday() {
  var date = new Date(), diff;
  diff = 5 - date.getDay();
  date.setDate( date.getDate() + diff );
  return date;
};
