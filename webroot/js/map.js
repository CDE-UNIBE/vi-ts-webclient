$(".alert").alert()

var marker;

var setLocation = function(lon, lat){
    if(map.hasLayer(marker)){
        map.removeLayer(marker);
    }
    var innerHtml = "<div class=\"panel-heading\">Raw Values</div><div><img width=\"100%\" src=\"/cgi-bin/zoo_loader.cgi?ServiceProvider=&metapath=&Service=WPS&Request=Execute&Version=1.0.0&Identifier=ModisTimeSeries&DataInputs=lon=" + lon + ";lat=" + lat + ";epsg=4326;width=800;height=300&RawDataOutput=timeseries@mimeType=image/png\" alt=\"WPS Result\"></img></div>"
    $("#latlng-alert-body").html(innerHtml);
    var header = "<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>";
    header += "<h4>Time serie for latitude " + lat + " longitude " + lon + "</h4>";
    //$("#latlng-alert-header").html(header);
    //$("#latlng-alert").modal();
    $("#raw-values-preview-div").html(innerHtml);
    $("#raw-values-preview-div").fadeIn();
    marker = L.marker(L.latLng(lat, lon));
    marker.on('click', function(e){
        map.removeLayer(marker);
        delete marker;
        $("#raw-values-preview-div").html("");
        $("#raw-values-preview-div").fadeOut();
    });
    marker.addTo(map);
}

var map = L.map('map').setView([0, 0], 2);
var baselayer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
    maxZoom: 17
});
baselayer.addTo(map)

var modis_tiles = L.tileLayer('http://www.vi-ts.org/tms/1.0.0/modis_tiles/{z}/{x}/{y}.png', {
    tms: true,
    maxZoom: 17
});
modis_tiles.addTo(map)

L.control.layers({"Base Layer": baselayer},{"Available tiles": modis_tiles}).addTo(map);

map.on('click', function(e) {
    var lat = e.latlng.lat;
    var lon = e.latlng.lng;
    setLocation(lon, lat);
    // Update also the input fields
    $("#longitude-input").val(lon);
    $("#latitude-input").val(lat);
});

$("#add-diagram-button").on("click", function(e){

    var innerpanel = "<div id=\"preview-div\" class=\"panel panel-default\">"

    var lon = marker.getLatLng().lng;
    var lat = marker.getLatLng().lat;

    innerpanel += "<div class=\"panel-heading\">Raw Values</div><div><img width=\"100%\" src=\"/cgi-bin/zoo_loader.cgi?ServiceProvider=&metapath=&Service=WPS&Request=Execute&Version=1.0.0&Identifier=ModisTimeSeries&DataInputs=lon=" + lon + ";lat=" + lat + ";epsg=4326;width=800;height=300&RawDataOutput=timeseries@mimeType=image/png\" alt=\"WPS Result\"></img></div>";

    innerpanel += "<button type=\"button\" class=\"btn btn-default\" style=\"margin: 5px;\">Close</button></div>";

    $("#diagram-preview-container").append(innerpanel);

    $("#diagram-preview-container div button").click(function(e){
        var div = $(this).parent();
        div.fadeOut(400, function(){
            div.remove();
        });
    });
});

$("#location-input-button").click(function(e){
    var lon = $("#longitude-input").val();
    var lat = $("#latitude-input").val();
    setLocation(lon, lat);
    map.panTo(L.latLng(lat, lon), {animate: true});
});

