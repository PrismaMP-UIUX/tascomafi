///// FUNCION UTILIZADA PARA DINAMIZAR EL FLUJO /////
///// No tener en cuenta para el desarrollo /////

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
}

function searchToObject() {
  var pairs = window.location.search.substring(1).split("&"),
    obj = {},
    pair,
    i;

  for ( i in pairs ) {
    if ( pairs[i] === "" ) continue;

    pair = pairs[i].split("=");
    obj[ decodeURIComponent( pair[0] ) ] = decodeURIComponent( pair[1] );
  }

  return obj;
}
////////////////////////////////////////////////////////


/* FUNCIÓN PARA LAS TABS */
function openTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

/* FUNCION PARA BOTONES SIGUIENTE Y ANTERIOR DE SLIDER */
var Slider = {
    init : function(){
        //console.log("Inicializando slider...");
        this.$slider = $(".slider");
        this.$arriba = $(".arriba");
        this.$abajo = $(".abajo");
        this.pag_actual = 1;
        this.total_slides = this.$slider.find(".slide").length;
    //    console.log(this.total_slides);
    //    $("#pagina-atual").html(this.pag_actual);
    //    $("#pagina-fin").html(this.total_slides);
        //console.log("El slider tiene {0} slides".format(this.total_slides));
        this.$abajo.click(function() {
        //  SSFramework.initTimeout();
            if(Slider.pag_actual < Slider.total_slides && !Slider.$slider.hasClass("sliding"))
                Slider.slide(1);
        });
        this.$arriba.click(function(){
        //  SSFramework.initTimeout();
            if(Slider.pag_actual > 1 && !Slider.$slider.hasClass("sliding"))
                Slider.slide(-1);
        });
        //console.log("El width actual es: ",$(window).width());
        //this.updateStyles();

        /*$(window).resize(function() {
            Slider.updateStyles();
        });*/

    },

    /*updateStyles : function(){
        var win_width = $(window).width(); //Window Width
        var slide_count = $(".slider .slide").length;
        console.log("Window width: {0}px, slide count: {1}".format(win_width,slide_count));
        $(".slider").css({
            "width" : (win_width * slide_count)+"px",
            "position" : "relative"
        });
        $(".slider .slide").css({"width" : win_width+"px"});
    },*/

    slide : function(direction){
        //console.log("Hola.. deslizando hacia: "+(direction > 0 ? "derecha" : "izquierda"));
        this.$slider.addClass("sliding");
        this.$slider.animate({ "top": (direction > 0 ? "-=300px" : "+=300px") }, "slow", function(){
            //Lo siguiente se ejecuta cuando TERMINA la animacion
            Slider.pag_actual += direction;
        //    $("#pagina-actual").html(Slider.pag_actual);

            if (Slider.pag_actual <= 1 && !Slider.$arriba.hasClass("invisible"))
                Slider.$arriba.addClass("invisible");
            else
                Slider.$arriba.removeClass("invisible");

            if (Slider.pag_actual >= Slider.total_slides && !Slider.$abajo.hasClass("invisible"))
                Slider.$abajo.addClass("invisible");
            else
                Slider.$abajo.removeClass("invisible");

            Slider.$slider.removeClass("sliding");
        });
    }
};


$(document).ready(function(){

    Slider.init();

    $('.btn-cuenta-propia').on('click', function() {
        $('.btn-cuenta-propia').removeClass('seleccionado');
        $(this).addClass('seleccionado');
        $('.btn-footer.tercero').removeClass('deshabilitado');
    });

    $('.btn-tarjeta-propia').on('click', function() {
        $('.btn-tarjeta-propia').removeClass('seleccionado');
        $(this).addClass('seleccionado');
        $('.btn-footer.tercero').removeClass('deshabilitado');
    });


    //SELECT NUEVO//
    $("ul").on("click", ".init", function(evt) {
        // console.log("primerisimoooo");
        $(this).closest("ul").children('li:not(.init)').toggle();
        evt.stopPropagation();
    });

    var allOptions = $("ul").children('li:not(.init)');
    $("ul").on("click", "li:not(.init)", function(evt) {
        // console.log("primero");
        allOptions.removeClass('selected');
        $(this).addClass('selected');
        $("ul").children('.init').html($(this).html());
        allOptions.toggle();
        evt.stopPropagation();
    });

    $(".cuerpo-container").on("click", function() {
        // console.log("segundo");
        if ($('li[style="display: list-item;"]').length > 0) {
            allOptions.hide();
        }
    });

    $('#modal-elegir-cuenta a.abajo').on('click', function(evt){
        console.log('abajo');
         $(".slide").animate({top: '-305px'});
        evt.preventDefault(); //para que no se cierre el modal
    });

    $('#modal-elegir-cuenta a.arriba').on('click', function(evt){
        console.log('arriba');
         $(".slide").animate({top: '0px'});
        evt.preventDefault(); //para que no se cierre el modal
    });

    //Para que el menu con 4 botones vayan 2 arriba y 2 abajo
    if ($('.btn-menu').length == 4) {
        $('section.menu').css("width", "914px");
    }

    var queries = {};
        $.each(window.location.search.substr(1).split('&'),function(c,q){
        var i = q.split('=');
        queries[i[0].toString()] = i[1].toString();
        });
        console.log(queries);

    ///////////////////////////////////////////////////////////////////
    /////////////////////////  MENU EXTRACCION ////////////////////////
    ///////////////////////////////////////////////////////////////////
    if (queries.menu == "extraccion"){
        $('#login footer a.btn-footer.tercero.login2').attr("href", "../extraer/extraer.html?menu=extraccion");
        //Para cambiar el texto y url del botón ingresar en el LOGIN de EXTRACCION
        $('#login button.tablinks').on("click", function(){
            if ($(this).hasClass("tarjeta")) {
                $('#login footer a.btn-footer.tercero p').text("Introducir tarjeta");
                $('#login footer a.btn-footer.tercero').attr("href", "login-tarjeta.html?menu={menu}");

            } else {
                $('#login footer a.btn-footer.tercero p').text("Ingresar");
                $('#login footer a.btn-footer.tercero').attr("href", "../extraer/extraer.html?menu={menu}");
            }
        });
    ///////////////////////////////////////////////////////////////////
    /////////////////////////  MENU DEPOSITOS /////////////////////////
    ///////////////////////////////////////////////////////////////////
    } else if (queries.menu == "depositos"){
        $('#login footer a.btn-footer.tercero.login2').attr("href", "../depositar/depositar-seleccionar-cuenta-propia.html?menu=depositos&flujo=propia");
        //Para cambiar el texto y url del botón ingresar en el LOGIN de DEPOSITOS
        $('#login button.tablinks').on("click", function(){
            if ($(this).hasClass("tarjeta")) {
                $('#login footer a.btn-footer.tercero p').text("Introducir tarjeta");
                $('#login footer a.btn-footer.tercero').attr("href", "login-tarjeta.html?menu=depositos");

            } else {
                $('#login footer a.btn-footer.tercero p').text("Ingresar");
                $('#login footer a.btn-footer.tercero').attr("href", "../depositar/depositar-seleccionar-cuenta-propia.html?menu=depositos&flujo=propia");
            }
        });
        //Para que si quiere seguir depositando y elegir otra cuenta, vaya a  las cuentas propias si ya se habia logueado. Si no que vaya por el camino de no logueado.
        if (queries.flujo == "propia"){
                $('a.btn-cuerpo[href="depositar-efectivo.html?menu=depositos&flujo=propia"]').attr("href", "depositar-seleccionar-cuenta-propia.html?menu=depositos&flujo=propia");
            } else {
                $('a.btn-cuerpo[href="depositar-efectivo.html?menu=depositos&flujo=propia"]').attr("href", "depositar-efectivo.html?menu=depositos");
            }
    }
    ///////////////////////////////////////////////////////////////////
    ///////////////////////////  MENU PAGOS ///////////////////////////
    ///////////////////////////////////////////////////////////////////
    else if (queries.menu == "pagos"){
        $('#login footer a.btn-footer.tercero.login2').attr("href", "../pagar/pagar-seleccionar-tarjeta-propia.html?menu=pagos&flujo=propia");
        //Para cambiar el texto y url del botón ingresar en el LOGIN de PAGOS
        $('#login button.tablinks').on("click", function(){
            if ($(this).hasClass("tarjeta")) {
                $('#login footer a.btn-footer.tercero p').text("Introducir tarjeta");
                $('#login footer a.btn-footer.tercero').attr("href", "login-tarjeta.html?menu=pagos");
            } else {
                $('#login footer a.btn-footer.tercero p').text("Ingresar");
                $('#login footer a.btn-footer.tercero').attr("href", "../pagar/pagar-seleccionar-tarjeta-propia.html?menu=pagos&flujo=propia");
            }
        });
        //Para que si quiere seguir pagando TC y elegir otra tarjeta, vaya a  las tarjetas propias si ya se habia logueado. Si no que vaya por el camino de no logueado.
        if (queries.flujo == "propia"){
                $('a.btn-cuerpo[href="pagar-tarjetas.html?menu=pagos&flujo=propia"]').attr("href", "pagar-seleccionar-tarjeta-propia.html?menu=pagos&flujo=propia");
            } else {
                $('a.btn-cuerpo[href="pagar-tarjetas.html?menu=pagos&flujo=propia"]').attr("href", "pagar-tarjetas.html?menu=pagos");
            }
        //Para elegir la moneda del pago d ela tarjeta si es que va a pagar una propia o una de terceros (ingresada manualmente)
        if (queries.datos == "manual"){
                $('input#pesos ~ label.radio.moneda').text("Pesos");
                $('input#dolares ~ label.radio.moneda').text("Dólares");
            } else {
                $('input#pesos ~ label.radio.moneda').text("$1.000");
                $('input#dolares ~ label.radio.moneda').text("U$S150");
            }
    } else {
        return
    }


});
