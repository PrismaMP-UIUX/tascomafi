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
        $('.btn-siguiente').removeClass('deshabilitado');
    });

});
