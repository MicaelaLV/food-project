var map, infoWindow;
var markersArray = [];

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: {
      lat: 41.378736,
      lng: 2.179882
    }
  });

  var geocoder = new google.maps.Geocoder();
  infoWindow = new google.maps.InfoWindow;


  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      infoWindow.open(map);
      map.setCenter(pos);

    }, function () {
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
    url: "/customers/search/json",
    type: "get",
    success: function (response) {
      response.forEach(function (chef, i) {
        let position = {
          lat: chef.location.coordinates[1],
          lng: chef.location.coordinates[0]
        };

        //  Remove marker
        //  marker.setMap(null);
        markersArray.push(new google.maps.Marker({
          position,
          map
        }))
        //let marker = new google.maps.Marker({position,map});

        let vendorHtml = `
        <form id="marker-${i}" class="vendor-results ${chef.cuisine} row" action="/orders/newOrder" method="POST">
            <img class="vendor-img" src="../images/${chef.cuisine}.png">
            <div class="vendor-description">
              <h5 class="vendor-name">${chef.name}</h5>
              <h6 class="cuisine">${chef.cuisine}</h6>
              <p class="dish">${chef.dish.dishName}</p> 
              <span class="dish">${chef.dish.dishPrice} &euro;</span> 

            </div>
            <input type="hidden" name="chefId" value="${chef._id}">
            <input type="hidden" name="orderedItem" value="${chef.dish._id}">

              <button type="submit" class="button get-result">Order now</button>
          </form>`;

        //show all of the vendors
        $("#vendorList").append(vendorHtml);

        //get the info on click on the page
            google.maps.event.addListener(markersArray, 'click', function() {
              infoWindow.open(map,markersArray);
        })
      });
    },
    error: function (error) {
      console.log(error)
    }
  })
};


//hide all the vendors on healthy cuisine click
$(document).on('click', '.cuisine-logos', function (evt) {

  var cuisineName = $(this).attr('id').split('-')[0];
  var chefCards = $(".vendor-results");
  var takeId, idNumber;

  $(this).toggleClass('active')

  if ($(this).hasClass('active')) {
    chefCards.removeClass('hidden');
    chefCards.each(function () {
      if (!$(this).hasClass(cuisineName)) {

        console.log(this);

        takeId = $(this).attr('id');
        idNumber = takeId.split('marker-')[1];

        console.log('nulling marker # ', idNumber);

        markersArray[idNumber].setMap(null);
        $(this).toggleClass('hidden');

        console.log(markersArray);
        // markersArray[idNumber].setMap(map);

      }
    });
  } else {
    markersArray.forEach(function (marker) {
      marker.setMap(map);
    })

    chefCards.each(function (card) {
      $(this).removeClass('hidden');
    })
  }



});

$(document).ready(function(){
  initMap()
})