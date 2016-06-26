$(document).ready(function() {
    console.log("page loaded");

    var canvas = document.getElementById("drawCanvas");
    var context;

    var gw = 940;
    var gh = 779;
    var p  = 10;

    var mousePressed = false;
    var mouseX = 0;
    var mouseY = 0;

    var canvasPosition = [];
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

    var drawBoard = function()
    {
        canvas  = document.getElementById("drawCanvas");
        ctx     = canvas.getContext("2d");
        context = ctx;

        ctx.canvas.width  = gw;
        ctx.canvas.height = gh;

        ctx.lineWidth = 0.5;

        for (x = 0; x <= gw; x += 10) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, gh);
        }

        for (y = 0; y <= gh; y += 10) {
            ctx.moveTo(0, y);
            ctx.lineTo(gw, y);
        }

        ctx.strokeStyle = "gray";
        ctx.stroke();

        canvasPosition = {
            x: $(canvas).offset().left,
            y: $(canvas).offset().top
        };


        var canvasObjects = new hdObjectClass();

        canvasObjects.add("rect1", 200,200,200,200);
        canvasObjects.add("rect2", 100,100,100,100);

    };

    function writeMessage(canvas, message) {
      var context = canvas.getContext('2d');
      //context.clearRect(0, 0, canvas.width, canvas.height);
      context.font = '18pt Calibri';
      context.fillStyle = 'black';
      context.fillText(message, 10, 25);
    }
    function getMousePos(canvas, evt) {
      var rect = canvas.getBoundingClientRect();
      return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
      };
    }


    function prepareWorkPlace(username)
    {
        $("#login_page").hide();
        $("#menu_login").hide();

        $("#left_menupanel").height(300);
        $("#right_menupanel").hide();

        $("#middle_menupanel")
        .height(800)
        .width(962)

        $("#middle_menupanel_inner")
        .html(
        '<canvas id=\"drawCanvas\" width=\"937px\" height=\"774px\" ' +
        'style=\"border:2px solid #000000;\">' +
        '</canvas>')
        .css({ "border-width": "6px",
               "border-color": "black",
               "background-color": "rgb(230,230,230)",
               "left": "10px",
               "top": "10px",
               "width": "940px",
               "height": "779px",
               "position": "absolute"
              });

        $("#page_container").height(1016);
        $("#workplace").height(820);

        drawBoard();
        canvas.addEventListener('mousemove', function(evt) {
           var mousePos = getMousePos(canvas, evt);
           var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
           writeMessage(canvas, message);
         }, false);
    }

    $(".login_page").mouseenter(function() {
        togglemenu($(this));
        return;
    });

    $("#login_page_button").click(function() {
        var UID = $("#login_username").val();
        var IDPASS = $("#login_password").val();
        $.ajax({
            type: "POST",
            url: "login.php",
            data: {user: UID, pass: IDPASS, mode: '0'},
            cache: false,
            success: function(msg)
            {
                if (msg === "info: ok. sel") {
                    prepareWorkPlace(UID);
                }
                else {
                    alert("Falsche Anmeldedaten!")
                }
            },
            error: function(data)         {
                alert("Es ist ein Fehler aufgetretten!\n" + data);
                return;
            }
        });     return;
    });

    $(".menu_item").mouseenter(function() {
        $(this).attr('style', 'background-color:red');
        $(this).fadeOut(100);
        $(this).fadeIn (100);  togglemenu($(this));
    }).mouseleave(function() {
        $(this).attr('style', 'background-color:#00e200');
        $(this).fadeOut(100);
        $(this).fadeIn (100);  togglemenu($(this));
    });


    // ---------------------------------
    // Object class for the desinger ...
    // ---------------------------------
    var hdObjectClass  = function() {};
    hdObjectClass.prototype = {
        _x: 0,
        _y: 0,
        _width: 0,
        _height: 0,
        _name: "0_0",

        _hdObjects: [],

        add: function(name,x,y,width,height) {
            obj = new hdObject(this,name,x,y,width,height);
            this._hdObjects.push(obj);

            console.log(this._hdObjects[0]._name);


        },
    };
    function hdObject(obj, name, x, y, width, height) {
        obj._x = x;
        obj._y = y;
        obj._width = width;
        obj._height = height;
        obj._name = name;

        context.beginPath();
        context.rect(x, y, width, height);
        context.fillStyle = 'yellow';
        context.fill();
        context.lineWidth = 7;
        context.strokeStyle = 'black';
        context.stroke();
    }

    $(hdObjectsArray[0]).on("click", function(e, mouse) {
        var mouse = {
            x: e.pageX - canvasPosition.x,
            y: e.pageY - canvasPosition.y
        }

        //console.log(hdObjectsArray[0]._name);

    });

});
