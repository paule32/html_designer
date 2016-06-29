$(document).ready(function() {
    console.log("page loaded");

    var myemail = "'jkallup@web.de'";

    // template class with email's
    // can be filled in application
    var emails = [
         {
          email_to        : "jkallup@web.de",
          email_data_start: "<html><head><title>test email</title></head><body>",
          email_data_body : "<h1>test mail an: tester</h1>",
          email_data_end  : "</body></html>",
         }
    ];

    $("#send_email").click(function(e) {
        var dataString =
        "emailto="     + emails[0].email_to  +
        "&emailfrom="  + myemail +
        "&emailbody='" + emails[0].email_data_body + "'";

        $.ajax({
            type: "POST",
            url: "emailtest.php",
            data: dataString,
            success: function(respond_text) {
                alert(respond_text);
                $("#send_email").append(respond_text);
                return true;
            },
            error: function() {
                alert("fehler augetretten.");
            }
        });
        return false
    });
});
