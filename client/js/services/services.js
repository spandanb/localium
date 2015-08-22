"use strict";

angular.module('app.services', [])
.factory('Mock', function(){
    //Factory for mocking data for testing 
    var m = {};
    m.mockClothing = function(){
        var items = [];
        for(var i=1; i<9; i++){
            var item = {price: "2" + i, name: "Retrofit Fairisle Shawl Pullover"};
    
            //Slides for image carousel
            var slides = [];
            for(var j=1; j<=3; j++){
                var ri = Math.floor((Math.random() * 6) + 1); //rand int e [1,6]
                slides.push({img:"img/clothing/sweater" + ri + ".jpg"});       
            }
            item.slides = slides;
            items.push(item);
        }
        return items;
    }
    return m;
});


