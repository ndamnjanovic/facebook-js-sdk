<!DOCTYPE html>
<html>
  <head>
    <title>Fetching FB statuses Example</title>
    <meta charset="UTF-8">
    <link rel="stylesheet" type="text/css" href="css/custom.css">
  </head>
<body>

  <div class="container">
    <div class="welcome-message"></div>

    <div class="content">
      <fb:login-button scope="public_profile,email,user_status" onlogin="checkLoginState();" 
        class="my-fb-login-btn">
      </fb:login-button>

      <div id="statuses" class="statuses">
       
      </div>
    </div>
  </div>

  <script type="text/javascript" src="js/ejs-production.js"></script>
  <script type="text/javascript" src="js/fb-api.js"></script>
</body>
</html>