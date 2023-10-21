let map, heatmap, geocoder;

function initMap() {
  var heatmap_data = [];
  geocoder = new google.maps.Geocoder();
  var raw_zips = require('../data/harborcap.csv');
  for (const rz of raw_zips) {
    var zip = parseInt(rz['zipcode']);
    if (!isNaN(zip)) {
      if (zip.toString().length === 5) {
        geocoder
          .geocode({ 'address': 'zipcode '+ zip })
          .then(( {results }) => {
            heatmap_data.push(results[0].geometry.location);
            return heatmap_data;
          })
          .catch(e => console.log(e));
      }
    }
  };
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 39.8283 , lng: -98.5795 },
    zoom: 6,
  });


  heatmap = new google.maps.visualization.HeatmapLayer({
    data: heatmap_data
  });
  heatmap.setMap(map);
}

initMap();
