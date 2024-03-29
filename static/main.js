var map = L.map('map').setView([50.83906, 4.35308], 13);
L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 18,
  id: 'c4ptaincrunch.ka5engdh',
  accessToken: 'pk.eyJ1IjoiYzRwdGFpbmNydW5jaCIsImEiOiJUdWVRSENNIn0.qssi5TBLeBinBsXkZKiI6Q'
}).addTo(map);

var json_markers = [];
var markers_group = new L.FeatureGroup();
var shown_subcat = [];
var categories = {};


map.addLayer(markers_group);

$.ajax({
  url: "/api/markers"
}).done(function(response) {
  json_markers = response;
});


$.ajax({
  url: "/api/categories"
}).done(function(response) {
  for (var i = 0; i < response.length; i++) {
    var cat = response[i];
    categories[cat.id] = cat;
    $('.category[data-id=' + cat.id + ']').click(function() {
      show_cat($(this).attr('data-id'));
      return false;
    });
    for (var j =  0; j < cat.subcategories.length; j++) {
      cat.subcategories[j].color = cat.color;
    };
  }
});


$('#subcatcheck input').hide()
$('#subcatcheck label').hide()
$('select[name=category]').change(update_selected_cat_form)
update_selected_cat_form();

$('#errorsuggest').click(error_suggest)

$('#addpoint').submit(submit_form)
