window.statuses = [];

// Load the SDK asynchronously
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

window.fbAsyncInit = function() {
  FB.init({
    appId      : 'YOUR-APP-ID',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.1' // use version 2.1
  });

  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
};

// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
    var elements = document.getElementsByClassName('welcome-message');
    if(elements.length > 0){
      elements[0].innerHTML = "We're fetching statuses for you, plese wait for a moment.";  
    }
    fetchStatuses();      
  } else if (response.status === 'not_authorized') {
    // The person is logged into Facebook, but not your app.
    var elements = document.getElementsByClassName('welcome-message');
    if(elements.length > 0){
      elements[0].innerHTML = 'Please log into this app.';
    }
  } else {
    // The person is not logged into Facebook, so we're not sure if
    // they are logged into this app or not.
    var elements = document.getElementsByClassName('welcome-message');
    if(elements.length > 0){
      elements[0].innerHTML = 'Please log into Facebook.';
    }
    //display login button
    var elements = document.getElementsByClassName('my-fb-login-btn');
    if(elements.length > 0){
      elements[0].style.display = 'block';
    }
  }
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

function fetchStatuses(){
  FB.api('me/statuses', function(response){
    processBatch(response);
  });
}

function processBatch(response) {
  response.data.forEach(function(status){
    window.statuses.push(status);
  });
  if(response.paging && response.paging.next){
    FB.api(response.paging.next + '&offset=' + window.statuses.length , function(response) {
      processBatch(response);
    });
  } else {
    console.log(window.statuses); 
    var statuses = new EJS({url: "js-templates/statuses.ejs"}).render({statuses: window.statuses});
    var elements = document.getElementsByClassName("welcome-message")
    elements[0].innerHTML = 'Your FB statuses:';
    document.getElementById("statuses").innerHTML = statuses;
  }
}




