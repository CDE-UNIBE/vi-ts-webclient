$(".alert").alert()

$("#preview-bfast-button").on("click", function(event){
    $("#preview-bfast-div").fadeToggle(1000);
});

var map = L.map('map').setView([9.1, 38.1], 8);
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
    maxZoom: 17
}).addTo(map);

map.on('click', function(e) {
    var lat = e.latlng.lat;
    var lon = e.latlng.lng;
    var innerHtml = "<p><img width=\"100%\" src=\"http://127.0.0.1/cgi-bin/zoo_loader.cgi?ServiceProvider=&metapath=&Service=WPS&Request=Execute&Version=1.0.0&Identifier=ModisTimeSeries&DataInputs=lon=" + lon + ";lat=" + lat + ";epsg=4326&RawDataOutput=timeseries@mimeType=image/png\" alt=\"WPS Result\"></img>"
    $("#latlng-alert-body").html(innerHtml);
    var header = "<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>";
    header += "<h4>Time serie for latitude " + lat + " longitude " + lon + "</h4>";
    $("#latlng-alert-header").html(header);
    $("#latlng-alert").modal();
});

