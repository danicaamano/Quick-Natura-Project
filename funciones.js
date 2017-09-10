///////////////////////////////////
//FUNCIONES DE CONTROL DE LA PAGINA
///////////////////////////////////

//carga de paginas no index
$(document).ready(function () {
    var location = window.location.href;
    var indalmo = location.indexOf("#");
    if (indalmo > 0) {
        location = location.substring(0, location.indexOf("#"));
    }
    var index = location.lastIndexOf("/")+1;
    var res = location.substring(index, location.length);
    var key = location.includes("index.html");
    //para que solo lo hagan las paginas que no son index
    if (!key & !res=="") {
        $.ajax({
            type: "GET",
            //te quedas loco cabron, no iba por que era una llamada asyncrona, engineeerrrrrr debuggerrrrrrrrr
            async: false,
            url: "index.html",
            dataType: "html",
            success: function (data) {
                //se coge el header de index
                var index1 = data.indexOf("<header");
                var index2 = data.indexOf("</header>");
                var header = data.substring(index1, index2 + 10);
                $("body").prepend(header);
                //se coge el pie de index
                index1 = data.indexOf("<footer");
                index2 = data.indexOf("</footer>");
                var index3 = data.indexOf("<footer", index2);
                var index4 = data.indexOf("</footer>", index3);
                var footer = data.substring(index1, index2 + 10);
                var footer2 = data.substring(index3, index4 + 10);
                $("#corte").append(footer + footer2);
            },
            error: function () {
                alert("Error");
            }
        })
    }
});

////////////////////////////////////
///// Control de plantas y rutas //
///////////////////////////////////

function arranque(letra, tipo) {
    if(tipo==0){


        ////////////////////////////////////////////////////
        /*Aqui es donde se carga el nombre de la flor     */
        /*Automaticamente se genera enlace a pagina flor */
        /*Automaticamente se carga la imagen si existe   */
        /*La imagen tiene q ser .jpg en carpeta  plantas */
        /*La pagina tiene que llamarse como la imagen   */
        ///////////////////////////////////////////////////
        preloadF = [
        "Albizia julibrissin",
        "Brachychiton populneus",
        "Celtis australis",
        "Ceratonia siliqua",
        "Cupressus sempervirens",
        "Cycas revoluta",
        "Eriobotrya japonica",
        "Ginkgo biloba",
        "Grevillea robusta",
        "Hedera helix",
        "Jacaranda mimosifolia",
        "Juniperus sabina",
        "Lantana camara",
        "Melia azedarach",
        "Monstera deliciosa",
        "Olea europaea",
        "Pinus canariensis",
        "Platanus x hispanica",
        "Ruscus aculeatus",
        "Sophora japonica",
        "Teucrium fruticans",
        "Yucca elephantipes"
        ]

        //////////////////////////////////////////////////
        //////////////////////////////////////////////////

            var images = new Array();
            for (i = 0; i < preloadF.length; i++) {
                if(letra===preloadF[i].charAt(0) | letra=="#"){
                    images[i] = new Image();
                    images[i].src = "plantas/" + preloadF[i] + ".jpg";
                    images[i].name = preloadF[i];
                    images[i].alt = preloadF[i] + ".html";
                }
            }
            cargarflores(images);
            motrarFlores();

    }
    if(tipo==1) {
        ////////////////////////////////////////////////////
        /*Aqui es donde se carga el nombre de la ruta     */
        /*Automaticamente se genera enlace a pagina ruta */
        /*Automaticamente se carga la imagen si existe   */
        /*La imagen tiene q ser .jpg en carpeta  rutas */
        /*La pagina tiene que llamarse como la imagen   */
        ///////////////////////////////////////////////////
        var preloadR = [
            "Facultad Magisterio",
            "Lluís Vives"
            ]
        
        //////////////////////////////////////////////////
        //////////////////////////////////////////////////

            var images = new Array();
            for (i = 0; i < preloadR.length; i++) {
                if (letra === preloadR[i].charAt(0) | letra == "#") {
                    images[i] = new Image();
                    images[i].src = "rutas/" + preloadR[i] + ".jpg";
                    images[i].name = preloadR[i];
                    images[i].alt = preloadR[i] + ".html";
                }
            }
            cargarRutas(images);
    }

}

//aqui se construyen los cartelotes de las flores
function cargarflores(images) {
    $('#barraflor').empty();
    for (i = 0; i < images.length; i++) {
        var array = images[i].name.split(" ");
        var corto = array[0];
        var corto2 = array[1];
         if (corto2.length < 2) { corto = corto + " " + array[1]; corto2 = array[2] }
        var cartel =  corto+"\n"+corto2;
        var pie = "<figcaption style=position:relative;top:100px;left:9px;color:white;><font size=2 style=background-color:rgba(0,0,0,0.6);border-radius:7px><i>" + corto + "</i></font></figcaption>"
        var pie2 = "<figcaption style=position:relative;top:100px;left:9px;color:white;><font size=2 style=background-color:rgba(0,0,0,0.6);border-radius:7px><i>" + corto2 + "</i></font></figcaption>"
        var nom = "<div style=display:inline-block>"+pie+pie2+"<img src= " + images[i].src + " onmouseover = playOver() id=" + images[i].name + " width=100 height=95 class=floritem img-responsive></div>";
        var pest = "<li><i>"+ images[i].name + "</i></li>";
        $('#glosario').append(
            $('<a />', { href: images[i].alt, html: nom}
          ).hide().delay(i * 150).fadeIn("slow"));
        $('#barraflor').append(
            $('<a />', { href: images[i].alt, html: pest }
          ));
    } delete (images)
};

function cargarRutas(images) {
    $('#barraflor').empty();
    for (i = 0; i < images.length; i++) {
        var array = images[i].name.split(" ");
        var corto = array[0];
        var corto2 = array[1];
        if (corto2.length < 2) { corto = corto + " " + array[1]; corto2 = array[2] }
        var cartel = corto + "\n" + corto2;
        var pie = "<figcaption style=position:relative;top:100px;left:9px;color:white;><font size=2 style=background-color:rgba(0,0,0,0.6);border-radius:7px><i>" + corto + "</i></font></figcaption>"
        var pie2 = "<figcaption style=position:relative;top:100px;left:9px;color:white;><font size=2 style=background-color:rgba(0,0,0,0.6);border-radius:7px><i>" + corto2 + "</i></font></figcaption>"
        var nom = "<div style=display:inline-block>" + pie + pie2 + "<img src= " + images[i].src + " onmouseover = playOver() id=" + images[i].name + " width=100 height=95 class=floritem img-responsive></div>";
        var pest = "<li><i>" + images[i].name + "</i></li>";
        $('#glosario').append(
            $('<a />', { href: images[i].alt, html: nom }
          ).hide().delay(i * 150).fadeIn("slow"));
        $('#barraflor').append(
            $('<a />', { href: images[i].alt, html: pest }
          ));
    } delete (images)
};

//para que se filtren las imagenes
function filtrar(letra, tipo) {
    $("#collapse1").collapse('hide');
    //var lista = document.getElementsByClassName("floritem");
    // for (i = 0; lista.length; i++) { lista[i].delete(); }
    $('#glosario').empty();
    arranque(letra, tipo);
}

//////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////





//cambio de pagina a inicio
$(document).ready(function () {
    $("#ini").click(function () {
        $("body").hide().delay(200).fadeIn("slow");
        $("html").load("index.html");
    });

});

//cambio de pagina a proyecto
$(document).ready(function () {
    $("#proyecto").click(function () {
        $("figcaption").empty();
        $("#seccion").hide().delay(200).fadeIn("slow").load("proyecto.html");
        $("#visor").hide().delay(200).fadeIn("slow").attr("src", "media/sergioexplor.jpg");
        $("#visor2").hide().delay(200).fadeIn("slow").attr("src", "media/silene.jpg");
        $("#myNavbar").collapse('hide');
        $('#botonglosario').attr("style", "visibility: hidden")
        window.location.hash = $(this).attr("id");
        flagRedi();
        $("nav ul li").removeClass("active");
        $(this).parent().addClass("active");
        setTimeout(function () {
            //idioma
            var cookie = document.cookie;
            var ind = cookie.indexOf("lang=");
            var lang = cookie.substring(ind + 5, ind + 7);
            changeLang(lang);
        }, 100);
    });
});

//cambio de pagina a BD
$(document).ready(function () {
    $("#flor").click(function () {
        $("figcaption").empty();
        $("#seccion").unload("rutas.html");
        $("#seccion").hide().delay(200).fadeIn("slow").load("BD.html");
        $("#visor").hide().delay(200).fadeIn("slow").attr("src", "media/manohelechobuena.jpg");
        $("#visor2").hide().delay(200).fadeIn("slow").attr("src", "media/camp.jpg");
        $("#myNavbar").collapse('hide');
        $('#botonglosario').attr("style", "visibility: visible")
        window.location.hash = $(this).attr("id");
        flagRedi();
        $("nav ul li").removeClass("active");
        $(this).parent().addClass("active");
        setTimeout(function () {
            //idioma
            var cookie = document.cookie;
            var ind = cookie.indexOf("lang=");
            var lang = cookie.substring(ind + 5, ind + 7);
            changeLang(lang);
        }, 100);
    });
});

//accion de boton volver desde flora
$(document).ready(function () {
    $("#volver").click(function () {
        $("figcaption").empty();
        $("#seccion").unload("rutas.html");
        $("#seccion").hide().delay(200).fadeIn("slow").load("BD.html");
        $("#visor").hide().delay(200).fadeIn("slow").attr("src", "media/img-20160510-wa0003.jpg");
        window.location.hash = $(this).attr("id");
        flagRedi();
        $("nav ul li").removeClass("active");
        $(this).parent().addClass("active");
        setTimeout(function () {
            //idioma
            var cookie = document.cookie;
            var ind = cookie.indexOf("lang=");
            var lang = cookie.substring(ind + 5, ind + 7);
            changeLang(lang);
        }, 100);
    });
});

//cambio de pagina a rutas
$(document).ready(function () {
    $("#rutas").click(function () {
        $("figcaption").empty();
        $("#seccion").unload("BD.html");
        $("#seccion").hide().delay(200).fadeIn("slow").load("rutas.html");
        $("#visor").hide().delay(200).fadeIn("slow").attr("src", "media/explicacion.jpg");
        $("#visor2").hide().delay(200).fadeIn("slow").attr("src", "media/rutas.jpg");
        $("#myNavbar").collapse('hide');
        $('#botonglosario').attr("style", "visibility: visible")
        window.location.hash = $(this).attr("id");
        flagRedi();
        $("nav ul li").removeClass("active");
        $(this).parent().addClass("active");
        setTimeout(function () {
            //idioma
            var cookie = document.cookie;
            var ind = cookie.indexOf("lang=");
            var lang = cookie.substring(ind + 5, ind + 7);
            changeLang(lang);
        }, 100);
    });
});

//cambio de pagina a contacto
$(document).ready(function () {
    $("#contac").click(function () {
        $("figcaption").empty();
        $("#seccion").hide().delay(200).fadeIn("slow").load("contacto.html");
        $("#visor").hide().delay(200).fadeIn("slow").attr("src", "media/yo-redondo2.png");
        $("#visor2").hide().delay(200).fadeIn("slow").attr("src", "media/foto-olga-redonda.png");
        $("#myNavbar").collapse('hide');
        $('#botonglosario').attr("style", "visibility: hidden")
        window.location.hash = $(this).attr("id");
        flagRedi();
        $("nav ul li").removeClass("active");
        $(this).parent().addClass("active");
        setTimeout(function () {
            //idioma
            var cookie = document.cookie;
            var ind = cookie.indexOf("lang=");
            var lang = cookie.substring(ind + 5, ind + 7);
            changeLang(lang);
        }, 100);
    });
});


//para que los botones suenen
function playOver() {
     audio = document.getElementById("gotita");
     audio.play();
}

//accion de mostsrar mapa modal
$(document).ready(function () {
    $("#maps").click(function () {
        $("#myModal").attr("align", "middle");
        $("#myModal iframe").attr("src", "https://www.google.com/maps/d/embed?mid=12SleMIc3btMOoWAjjUHQerH5458");
        $("#myModal iframe").attr("width", $(document).width()/2-30);
        $("#myModal iframe").attr("height", $(document).height()-50);
        $("#myModal").modal();
    });
});

//accion de mostrar imagenes modales
$(document).ready(function () {
    $("#secciones img").click(function () {
        $("#myModal").attr("align", "middle");
        $("#myModal iframe").attr("src", $(this).attr("src"));
        $("#myModal iframe").load(function(){

            //callback de load
            //esto para controlar el tamaño de las imagenes q vienen y el iframe
            var imgW = $('#myModal iframe').contents().find('img').width();
            var imgH = $('#myModal iframe').contents().find('img').height();

            var ratio = imgH >= imgW;

            //depende si es vertical/horizontal
            if (ratio) {
                //se ajusta a la altura
                $('#myModal iframe').contents().find('img').attr("height", $(document).height() - 60);
               
            } else {
                //se ajusta a la anchura
                $('#myModal iframe').contents().find('img').attr("width", $(document).width()/1.5 - 60);

            }

            //el iframe igual q la imagen
            $("#myModal iframe").attr("width", $('#myModal iframe').contents().find('img').width()+5);
            $("#myModal iframe").attr("height", $('#myModal iframe').contents().find('img').height() + 5);
            //y se lanza la ventana modal
            $("#myModal").modal();
        });

    });
});

//control tamaño seccion
$(document).ready(function () {
    ajusteSeccion();
    controlBordes();
    window.addEventListener("resize", function () {
        ajusteSeccion();
        controlBordes();
    });

})

//efecto para refresco de pagina
$(document).ready(function () {
    $("body").hide().delay(250).fadeIn("slow");
})

//efecto para header random
$(document).ready(function () {
    var op = Math.floor((Math.random() * 10) + 1);
    switch(op){
        case 1:
        case 2:
			$("#cabecera").css("background", "url(media/header5.jpg) round space");
            break;
        case 3:
        case 4:
        case 5:
        case 6:$("#cabecera").css("background", "url(media/header4b.jpg) round space");
            break;
        case 7:
        case 8:
        case 9:
        case 10:
            $("#cabecera").css("background", "url(media/header2.jpg) round space");
            break;
    }
})

//efecto google ocultar barra
var wheelkey = true;
var lastScrollTop = 0;
$(document).ready(function () {
    $('#seccion').bind('scroll', function (e) {
        if (window.innerWidth < 768) {
            st = $(this).scrollTop();
            if (st > lastScrollTop) {
                //scroll down
                if (wheelkey) {
                    $("html, body").animate({ scrollTop: 52 }, 500);
                    wheelkey = false;
                }
            } else {
                //scroll up
                if (!wheelkey) {
                    $("html, body").animate({ scrollTop: -52 }, 500);
                    wheelkey = true;
                }
            }
            lastScrollTop = st;
        }

        //prevent page fom scrolling
        // return false;
    });

});

function motrarFlores() {
    var myTimeout;
    var myTimeout2;
    var antes2 = null;
    var antes3 = null;
    $(document).ready(function () {
        $(".floritem").mouseenter(function () {
            if (window.innerWidth >= 1200) {
                clearTimeout(myTimeout2);
                if (antes2 == null) {
                    antes2 = $('#seccion2').html();
                    antes3 = $('#seccion3').html();
                }
                var height = $("#seccion2").height();
                var link = $(this).attr('src');
                var link = $(this).attr('src');
                var name = $(this).attr("id");
                link = link.split(" ").join("%20");
                var page = $(this).parent().parent().attr('href');
                var texto;
                //para coger el texto de la planta que toca
                $.ajax({
                    type: "GET",
                    async: false,
                    url: page,
                    dataType: "html",
                    success: function (data) {
                        //se coge el titulo y el primer parrafo
                        var ind = data.indexOf("<article");
                        var ind2 = data.indexOf("<i", ind);
                        var ind3 = data.indexOf("</i>", ind);

                        var ind4 = data.indexOf("<p", ind);
                        var ind5 = data.indexOf("</p>", ind);

                        if (window.innerWidth < 1400) {
                            texto = "<font size=3 style=background-color:rgba(0,0,0,0.6);>" + data.substring(ind2, ind3) + "</font>";
                        } else {
                            texto = "<font size=6 style=background-color:rgba(0,0,0,0.6);>" + data.substring(ind2, ind3) + "</font>";
                        }
                        texto += "</br></br>" + data.substring(ind4, ind5);
                    },
                    error: function () {
                        alert("La flor que busca todavia no está disponible");
                    }
                })


                myTimeout = setTimeout(function () {
                    $("#seccion2").fadeOut("fast");
                    $("#seccion3").fadeOut("fast");
                    $("#seccion2").hide();
                    $("#seccion3").hide();

                    if (window.innerWidth < 1400) {
                        var pie = "<figcaption  style=position:absolute;left:50px;top:40px;color:white><font size=2 style=background-color:rgba(0,0,0,0.6);border-radius:7px><i>" + texto + "</i></font></figcaption>"
                    } else {
                        var pie = "<figcaption  style=position:absolute;left:50px;top:40px;color:white><font size=3 style=background-color:rgba(0,0,0,0.6);border-radius:7px><i>" + texto + "</i></font></figcaption>"
                    }

                    $("#seccion2").html("<div class=responsive height=" + height + ">" + pie + "<img id=pagequick class=responsive height=" + height + ">");
                    $("#seccion3").html("");
                    $("#pagequick").attr("src", link);
                    $("#seccion2").fadeIn("fast");
                    $("#seccion3").fadeIn("fast");
                    var width = $("#pagequick").attr('width');
                    // $("#seccion2 figcaption").css({width: width})
                    $("#seccion2 figcaption").hide().delay(1000).fadeIn(800);
                }, 300)
            }
        })
        $(".floritem").mouseleave(function () {
            if (window.innerWidth >= 1200) {
                clearTimeout(myTimeout);
                myTimeout2 = setTimeout(function () {
                    $("#seccion2").fadeOut("fast");
                    $("#seccion3").fadeOut("fast");
                    $("#seccion2").html(antes2);
                    $("#seccion3").html(antes3);
                    $("#seccion2").fadeIn(300);
                    $("#seccion2").load();
                    $("#seccion3").load();
                }, 300)
            }
        })
    })
}

function controlBordes() {
    if (window.innerWidth < 768) {
        $("#secciones").css({ "padding": "0px" });
        $("#secciones .container-fluid").css({ "padding left": "0px" });
        $("#secciones .container-fluid").css({ "padding right": "0px" });
        $("seccion").css("padding", "0px");
        $("seccion h1").css("padding", "0px");
        $("seccion h2").css("padding", "0px");

    } else {
        $("#secciones").css({ "padding": "20px" });
        $("#secciones .container-fluid").css({ "padding left": "15px" });
        $("#secciones .container-fluid").css({ "padding right": "15px" });
        $("seccion").css("padding", "0px");
        $("seccion h1").css({ "padding": "5px" });
        $("seccion h2").css({ "padding": "5px" });
    }

}

function ajusteSeccion() {
    var pos = $(".navbar").position().top;
    var pos2 = window.innerHeight;
    var tam = $("#cabecera").height();
    $('#seccion').css('max-height', pos2 - pos - tam);
}

//control de flag para redireccion
var flagredi = false;
function flagRedi() {

    flagredi = true;
    setTimeout(function () {
        flagredi = false;
    }, 100);
}

//control redireccion para hash
$(document).ready(function () {
    window.addEventListener('popstate', function () {
        setTimeout(function () {
            if (flagredi == false) {
                switch (window.location.hash) {
                    case "#proyecto":
                        $("#proyecto").click();
                        break;
                    case "#flor":
                        $("#flor").click();
                        break;
                    case "#rutas":
                        $("#rutas").click();
                        break;
                    case "#contac":
                        $("#contac").click();
                        break;
                    default:
                        location.reload();
                }
            }
        }, 50)
    })
})

//control redireccion para carga de pagina
$(document).ready(function () {
    window.addEventListener('load', function () {
        switch (window.location.hash) {
            case "#proyecto":
                $("#proyecto").click();
                break;
            case "#flor":
                $("#flor").click();
                break;
            case "#rutas":
                $("#rutas").click();
                break;
            case "#contac":
                $("#contac").click();
                break;
        }
    })
})

/////////////////////////////////////
/////////Cambio de idioma////////////
////////////////////////////////////

//clicks de los botones
$(document).ready(function () {
    $(".language1").click(function () {
        changeLang("es");
        changeLangStatic("es");
        document.cookie = "lang=es";
    });
    $(".language2").click(function () {
        changeLang("en");
        changeLangStatic("en");
        document.cookie = "lang=en";
    });
    $(".language3").click(function () {
        changeLang("va");
        changeLangStatic("va");
        document.cookie = "lang=va";
    });
});

//control de carga de pagina y cookie
$(window).load(function () {
    setTimeout(function () {
        var cookie = document.cookie;
        var ind = cookie.indexOf("lang=");
        if (ind >= 0) {
            var lang = cookie.substring(ind + 5, ind + 7);
            changeLang(lang);
            changeLangStatic(lang);
        } else {
            document.cookie = "lang=es";
            changeLang("es");
            changeLangStatic("es");
        }
    }, 10);
});

//control de los elementos html q se cambian en idioma
function changeLang(lang) {
    $("h1:lang(es)").hide();
    $("h2:lang(es)").hide();
    $("p:lang(es)").hide();
    $("figcaption:lang(es)").hide();

    $("h1:lang(en)").hide();
    $("h2:lang(en)").hide();
    $("p:lang(en)").hide();
    $("figcaption:lang(en)").hide();

    $("h1:lang(va)").hide();
    $("h2:lang(va)").hide();
    $("p:lang(va)").hide();
    $("figcaption:lang(va)").hide();

    switch (lang) {
        case "en":
            $("h1:lang(en)").fadeIn("slow");
            $("h2:lang(en)").fadeIn("slow");;
            $("p:lang(en)").fadeIn("slow");;
            $("figcaption:lang(en)").fadeIn("slow");
            break;
        case "es":
            $("h1:lang(es)").fadeIn("slow");
            $("h2:lang(es)").fadeIn("slow");
            $("p:lang(es)").fadeIn("slow");
            $("figcaption:lang(es)").fadeIn("slow");
            break;
        case "va":
            $("h1:lang(va)").show();
            $("h2:lang(va)").show();
            $("p:lang(va)").show();
            $("figcaption:lang(va)").show();
            break;
    }
}
//elementos estaticos del idioma
function changeLangStatic(lang) {
    $(".language1").animate({
        top: '5px',
        opacity: '0.5'
    });
    $(".language2").animate({
        top: '5px',
        opacity: '0.5'
    });
    $(".language3").animate({
        top: '5px',
        opacity: '0.5'
    });
    switch (lang) {
        case "en":
            $("#proyecto").text("Project");
            $("#flor").text("Flora");
            $("#rutas").text("Routes");
            $("#contac").text("Contact");
            $("#botonglosario").text("List");
            $("#ini").text("Home");
            $(".infolang").text("English");
            $(".language2").animate({
                opacity: '1'
            });
            break;
        case "es":
            $("#proyecto").text("Projecto");
            $("#flor").text("Flora");
            $("#rutas").text("Rutas");
            $("#contac").text("Contacto");
            $("#botonglosario").text("Listado");
            $("#ini").text("Inicio");
            $(".infolang").text("Español");
            $(".language1").animate({
                opacity: '1'
            });
            break;
        case "va":
            $("#proyecto").text("Projecte");
            $("#flor").text("Flora");
            $("#rutas").text("Rutes");
            $("#contac").text("Contacte");
            $("#botonglosario").text("Listat");
            $("#ini").text("Inici");
            $(".infolang").text("Valencià");
            $(".language3").animate({
                opacity: '1'
            });
            break;
    }

}

//////////////////////////////////////////////////

//control de carga de pagina y cookie
$(window).load(function () {
    setTimeout(function () {
        var cookie = document.cookie;
        var ind = cookie.indexOf("lang=");
        if (ind >= 0) {
            ind = ind + 4;
            var lang = cookie.substring(ind + 1, ind + 3);
            changeLang(lang);
        } else {
            document.cookie = "lang=es";
            changeLang("es");
        }
    }, 10);
});

//control de los elementos html q se cambian en idioma
function changeLang(lang) {
    $("h1:lang(es)").hide();
    $("h2:lang(es)").hide();
    $("p:lang(es)").hide();
    $("figcaption:lang(es)").hide();
    $("h1:lang(en)").hide();
    $("h2:lang(en)").hide();
    $("p:lang(en)").hide();
    $("figcaption:lang(en)").hide();
    $("h1:lang(va)").hide();
    $("h2:lang(va)").hide();
    $("p:lang(va)").hide();
    $("figcaption:lang(va)").hide();
    switch (lang) {
        case "en":
            $("h1:lang(en)").fadeIn("slow");
            $("h2:lang(en)").fadeIn("slow");;
            $("p:lang(en)").fadeIn("slow");;
            $("figcaption:lang(en)").fadeIn("slow");;
            break;
        case "es":
            $("h1:lang(es)").fadeIn("slow");
            $("h2:lang(es)").fadeIn("slow");
            $("p:lang(es)").fadeIn("slow");
            $("figcaption:lang(es)").fadeIn("slow");
            break;
        case "va":
            $("h1:lang(va)").show();
            $("h2:lang(va)").show();
            $("p:lang(va)").show();
            $("figcaption:lang(va)").show();
            break;
    }
}

//////////////////////////////////////////////////