$(".alert").alert()

var marker;

$("#preview-bfast-button").on("click", function(event){
    $("#preview-bfast-div").fadeToggle(1000);
});

var map = L.map('map').setView([46.5, 8], 8);
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
    maxZoom: 17
}).addTo(map);

map.on('click', function(e) {
    if(map.hasLayer(marker)){
        map.removeLayer(marker);
    }
    var lat = e.latlng.lat;
    var lon = e.latlng.lng;
    var innerHtml = "<div class=\"panel-heading\">Raw Values</div><div><img width=\"100%\" src=\"http://127.0.0.1/cgi-bin/zoo_loader.cgi?ServiceProvider=&metapath=&Service=WPS&Request=Execute&Version=1.0.0&Identifier=ModisTimeSeries&DataInputs=lon=" + lon + ";lat=" + lat + ";epsg=4326;width=800;height=300&RawDataOutput=timeseries@mimeType=image/png\" alt=\"WPS Result\"></img></div>"
    $("#latlng-alert-body").html(innerHtml);
    var header = "<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>";
    header += "<h4>Time serie for latitude " + lat + " longitude " + lon + "</h4>";
    //$("#latlng-alert-header").html(header);
    //$("#latlng-alert").modal();
    $("#raw-values-preview-div").html(innerHtml);
    $("#raw-values-preview-div").fadeIn();
    marker = L.marker(e.latlng);
    marker.on('click', function(e){
        map.removeLayer(marker);
        delete marker;
        $("#raw-values-preview-div").html("");
        $("#raw-values-preview-div").fadeOut();
    });
    marker.addTo(map);
});

$("#add-diagram-button").on("click", function(e){
    console.log(e);

    var innerpanel = "<div id=\"preview-div\" class=\"panel panel-default\">"

    var lon = marker.getLatLng().lng;
    var lat = marker.getLatLng().lat;

    innerpanel += "<div class=\"panel-heading\">Raw Values</div><div><img width=\"100%\" src=\"http://127.0.0.1/cgi-bin/zoo_loader.cgi?ServiceProvider=&metapath=&Service=WPS&Request=Execute&Version=1.0.0&Identifier=ModisTimeSeries&DataInputs=lon=" + lon + ";lat=" + lat + ";epsg=4326;width=800;height=300&RawDataOutput=timeseries@mimeType=image/png\" alt=\"WPS Result\"></img></div>";

    innerpanel += "<button type=\"button\" class=\"btn btn-default\" style=\"margin: 5px;\">Close</button></div>";

    $("#diagram-preview-container").append(innerpanel);

    $("#diagram-preview-container div button").click(function(e){
        var div = $(this).parent();
        div.fadeOut(400, function(){
           div.remove();
        });
    });
});