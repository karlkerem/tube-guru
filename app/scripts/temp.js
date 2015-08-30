'use strict';
/**
 * Created by karlkerem on 16/08/15.
 */

//setTimeout(function() {



  var items = $(".roundel,.station");

  var output = {};
  for(var n = 0 ; n < items.length ; n++) {

    var id = items[n].id ;
    var html = items[n].childNodes[0] ;

    if(html) {


      output[id] = {
        name: items[n].innerText,
        html: html.innerHTML
      };
    }

  }
  //console.log(JSON.stringify(output));


//}, 1000);


