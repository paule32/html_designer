$(document).ready(function() {
    console.log("page loaded");

    var menuitem_flag = false;
    function togglemenu (menu_item) {
        var item = menu_item.text();
        menu_item.click(function() {
            if (item === "Anmelden") {
                $("#login_page").toggle();
                return;
            }

            if (menuitem_flag == false) {
                menuitem_flag = true;
                if (item === "Hilfe") {
                    $(".menu_help").toggle();
                }
            }
            else {
                menuitem_flag = false;
                if (item === "Hilfe") {
                    $(".menu_help").toggle();
                }
            }
        });
    }

    $(".login_page").mouseenter(function() {
        togglemenu($(this));
        return;
    });

    $("#login_page_button").click(function() {
        var UID = $("#login_username").val();
        var IDPASS = $("#login_password").val();
        var dataString = 'user=' + UID + '&pass=' + IDPASS;
        $.ajax({
            type: "POST",
            url: "login.php",
            data: dataString,
            cache: false,
            success: function(html)
            {
                alert(html);
            },
            error: function(data)
            {
                alert("Es ist ein Fehler aufgetretten!");
                return;
            }
        });     return;
    });

    $(".menu_item").mouseenter(function() {
        $(this).attr('style', 'background-color', 'red');
        $(this).fadeOut(100);
        $(this).fadeIn (100);  togglemenu($(this));
    }).mouseleave(function() {
        $(this).attr('style', 'background-color', '#00e200');
        $(this).fadeOut(100);
        $(this).fadeIn (100);  togglemenu($(this));
    });
});
