$( document ).ready(function() {
    var billboard = $(".billboard.dark");
    var IMAGES = ["billboard.jpg", "billboard2.jpg"];
    var PATH = "./img/"; 
    var idx = 1;
    //Loop every 10s
    setInterval(function(){
        idx = (idx + 1 ) % IMAGES.length;
        
        /* 
        //Approach 1
        billboard.fadeOut(500, function() {
            var value = "url(" + PATH + IMAGES[idx] + ")";
            billboard.css("background", value );                
            billboard.fadeIn(500);
        });
        */
        //Approach 2
        var value = "url(" + PATH + IMAGES[idx] + ")";
        billboard.fadeTo(400, 0.7, function(){
            $(this).css('background-image', value);
        }).fadeTo(900, 1);
        /*
        //Approach 3
        billboard.slideUp(400, "linear", function(){
            $(this).css('background-image', value);
        }).slideDown(400, "linear");
        */
    },7000);

    
});
