var map, infoWindow;
var markersArray = [];

function initMap() {
       map = new google.maps.Map(document.getElementById('map'), {
          zoom: 13,
          center: {lat: 41.378736, lng: 2.179882}
        });

var geocoder = new google.maps.Geocoder();
infoWindow = new google.maps.InfoWindow;


// Try HTML5 geolocation.
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    var pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };

    infoWindow.setPosition(pos);
    infoWindow.setContent('Location found.');
    infoWindow.open(map);
    map.setCenter(pos);
   
  }, function() {
    handleLocationError(true, infoWindow, map.getCenter());
    });
} else {
  // Browser doesn't support Geolocation
  handleLocationError(false, infoWindow, map.getCenter());
}


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

$.ajax({
      url: "http://localhost:3000/customers/search/json",
      type: "get",
      success: function(response){
        response.forEach(function(chef, i){
          let position = {
            lat: chef.location.coordinates[1],
            lng: chef.location.coordinates[0]
          };
          
        //  Remove marker
        //  marker.setMap(null);
        markersArray.push(new google.maps.Marker({position,map}))
        //let marker = new google.maps.Marker({position,map});
 
        let vendorHtml = `<article id="marker-${i}" class="vendor-results ${chef.cuisine} row">
          <div class="vendor-img"> </div>
          <div class="vendor-description">
            <h5 class="vendor-name">${chef.name}</h5>
            <p class="cuisine">${chef.cuisine}</p>
          </div>
            <a href="#" class="button get-result"> Show more</a>
        </article>`;
        
        //show all of the vendors
        $("#vendorList").append(vendorHtml);

        //get the info on click on the page
    //     google.maps.event.addListener(marker, 'click', function() {
    //       infoWindow.open(map,marker);
    // })
        });
      },
       error: function(error){console.log(error)}
     })
};


//hide all the vendors on healthy cuisine click
$(document).on('click', '.cuisine-logos', function(evt){

  var cuisineName = $(this).attr('id').split('-')[0];                                                                                
  var chefCards   = $(".vendor-results");
  var takeId, idNumber;


  chefCards.removeClass('hidden');
  chefCards.each(function(){
    if (!$(this).hasClass(cuisineName)) {

      takeId = $(this).attr('id');
      idNumber = takeId.split('marker-')[1];

      console.log('ID to set marker to null', idNumber);

      markersArray[idNumber].setMap(null);
      $(this).toggleClass('hidden');

    } 
  });
});
