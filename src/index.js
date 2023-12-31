var loadInvestorsBtn = $('#load-investors-btn');

let heatmap_data = [];
let coordinates = [];

function load() {
  $.ajax({
    url: "http://localhost:8000/coords",
    type: "GET",
    dataType: "json",
    headers: {
      "Access-Control-Allow-Origin":"*"
    },
    success: function(data) {
      coordinates = jQuery.parseJSON(data);
      
      coordinates.map((ll) => {
        heatmap_data.push(
          new google.maps.LatLng(ll[0], ll[1])
        );
      });
      var map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 39.8283 , lng: -98.5795 },
        zoom: 6,
      });

      
      var heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatmap_data
      });
        const gradient = [
          "rgba(0, 255, 255, 0)",
          "rgba(0, 255, 255, 1)",
          "rgba(0, 191, 255, 1)",
          "rgba(0, 127, 255, 1)",
          "rgba(0, 63, 255, 1)",
          "rgba(0, 0, 255, 1)",
          "rgba(0, 0, 223, 1)",
          "rgba(0, 0, 191, 1)",
          "rgba(0, 0, 159, 1)",
          "rgba(0, 0, 127, 1)",
          "rgba(63, 0, 91, 1)",
          "rgba(127, 0, 63, 1)",
          "rgba(191, 0, 31, 1)",
          "rgba(255, 0, 0, 1)",
        ];
      heatmap.set("opacity", 1);
      heatmap.set("gradient", gradient);
      heatmap.set("radius", 15);
      heatmap.setMap(map);
    }
  });
}

$(document).ready(function() {
  $('#load-investors-btn').on('click', load)
});
