$(".alert").alert()

var marker;

function showAlert(msg){
    var html = "<div id=\"alert-div\" class=\"alert alert-warning alert-dismissable\">";
    html += "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">&times;</button>";
    html += msg;
    html += "</div>";
    $(html).insertBefore("#map");
}

/**
 *
 */
function toggleImageWrapper(){
    var h = $(this).parent().next(".image-wrapper");
    if(h.hasClass("hidden")){
        h.removeClass("hidden");
    } else {
        h.addClass("hidden");
    }
}

/**
 *
 */
function getSeries(lon, lat) {
    if(!map.hasLayer(marker)){
        setLocation(lon, lat);
        map.panTo([lat, lon]);
    }

    var plus = $("<a href=\"#\"><i class=\"fa fa-plus-circle fa-lg pull-right\"></i></a>");
    var minus = $("<a href=\"#\"><i class=\"fa fa-minus-circle fa-lg pull-right\"></i></a>");

    var spin = "<i class=\"fa fa-cog fa-spin pull-right fa-lg\"></i>";
    $(".image-wrapper").detach();
    $(".panel-heading > a, i").detach();
    $(".panel-heading").append(spin);

    $.ajax({
        url: "/cgi-bin/zoo_loader.cgi?RawDataOutput=plot@mimeType=application/json",
        data: {
            "ServiceProvider": "",
            "metapath": "",
            Service: "WPS",
            Request: "Execute",
            Version: "1.0.0",
            Identifier: "PlotNdviRawTimeSeries",
            DataInputs: "lon=" + lon + ";lat=" + lat + ";epsg=4326;width=800;height=300"
        },
        success: function(data, textStatus, jqXHR){
            var p = plus.clone();
            var m = minus.clone();
            p.click(toggleImageWrapper);
            p.click(function(){
                $(this).parent().append(m);
                $(this).detach();

            });
            m.click(toggleImageWrapper);
            m.click(function(){
                $(this).parent().append(p);
                $(this).detach();
            });
            var panel = $("#raw-values-panel");
            var heading = panel.find(".panel-heading");
            heading.find(".fa-cog").detach();
            heading.append(p);
            var imageWrapper = "<div class=\"hidden image-wrapper\"><img width=\"100%\" src=\"" + data['file'] + "\" alt=\"WPS Result\"></img></div>";
            panel.append(imageWrapper);
        }
    });
    
    $.ajax({
        url: "/cgi-bin/zoo_loader.cgi?RawDataOutput=plot@mimeType=application/json",
        data: {
            "ServiceProvider": "",
            "metapath": "",
            Service: "WPS",
            Request: "Execute",
            Version: "1.0.0",
            Identifier: "PlotNdviFittingFunctionTimeSeries",
            DataInputs: "lon=" + lon + ";lat=" + lat + ";epsg=4326;width=1024;height=512"
        },
        success: function(data, textStatus, jqXHR){
            var p = plus.clone();
            var m = minus.clone();
            p.click(toggleImageWrapper);
            p.click(function(){
                $(this).parent().append(m);
                $(this).detach();

            });
            m.click(toggleImageWrapper);
            m.click(function(){
                $(this).parent().append(p);
                $(this).detach();
            });
            var panel = $("#fitting-diagram-panel");
            var heading = panel.find(".panel-heading");
            heading.find(".fa-cog").detach();
            heading.append(p);
            var imageWrapper = "<div class=\"hidden image-wrapper\"><img width=\"100%\" src=\"" + data['file'] + "\" alt=\"WPS Result\"></img></div>";
            panel.append(imageWrapper);

        }
    });

    $.ajax({
        url: "/cgi-bin/zoo_loader.cgi?RawDataOutput=plot@mimeType=application/json",
        data: {
            "ServiceProvider": "",
            "metapath": "",
            Service: "WPS",
            Request: "Execute",
            Version: "1.0.0",
            Identifier: "PlotNdviBfastTimeSeries",
            DataInputs: "lon=" + lon + ";lat=" + lat + ";epsg=4326;width=800;height=300"
        },
        success: function(data, textStatus, jqXHR){
            var p = plus.clone();
            var m = minus.clone();
            p.click(toggleImageWrapper);
            p.click(function(){
                $(this).parent().append(m);
                $(this).detach();

            });
            m.click(toggleImageWrapper);
            m.click(function(){
                $(this).parent().append(p);
                $(this).detach();
            });
            var panel = $("#bfast-diagram-panel");
            var heading = panel.find(".panel-heading");
            heading.find(".fa-cog").detach();
            heading.append(p);
            var imageWrapper = "<div class=\"hidden image-wrapper\"><img width=\"100%\" src=\"" + data['file'] + "\" alt=\"WPS Result\"></img></div>";
            panel.append(imageWrapper);

        }
    });

}

function setLocation(lon, lat){
    if(map.hasLayer(marker)){
        map.removeLayer(marker);
    }

    // Update also the input fields
    $("#longitude-input").val(Math.round(lon*10000)/10000);
    $("#latitude-input").val(Math.round(lat*10000)/10000);
    marker = L.marker(L.latLng(lat, lon));
    marker.on('click', function(e){
        map.removeLayer(marker);
        $(".image-wrapper").detach();
        $(".panel-heading > a, i").detach();
        marker = undefined;
    });
    marker.addTo(map);
}

var mapOnClick = function(event){
    var lat = event.latlng.lat;
    var lon = event.latlng.lng;
    setLocation(lon, lat);
}

var map = L.map('map')
if(typeof lat != 'undefined' && typeof lon != 'undefined' && typeof zoom != 'undefined'){
    map.setView([lat, lon], zoom);
}
else if(typeof mlat != 'undefined' && typeof mlon != 'undefined'){
    map.setView([mlat, mlon], 10);
} else {
    map.setView([0, 0], 2);
}

var baselayer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
    maxZoom: 17
});
baselayer.addTo(map);

var modis_tiles = L.tileLayer('http://www.vi-ts.org/tms/1.0.0/modis_tiles/{z}/{x}/{y}.png', {
    tms: true,
    maxZoom: 17,
    opacity: 0.6
});
modis_tiles.addTo(map);

var globcover_2009 = L.tileLayer('http://www.vi-ts.org/tms/1.0.0/globcover_2009/{z}/{x}/{y}.png', {
    tms: true,
    maxZoom: 17
});

var heatmap = L.tileLayer('http://www.vi-ts.org/tms/1.0.0/access_heatmap/{z}/{x}/{y}.png', {
    tms: true,
    maxZoom: 17
});

var GetCurrentLocationControl = L.Control.extend({
    options: {
        position: 'topright'
    },

    onAdd: function (map) {
        // create the control container with a particular class name
        var container = L.DomUtil.create('div', 'get-location-control');

        //$(".my-custom-control").html("<span>test</span>");
        var link = L.DomUtil.create("a", 'get-location', container);
        link.href = "#";

        L.DomEvent.on(container, "click", function(e){
            map.off("click", mapOnClick);
            if("geolocation" in navigator){
                navigator.geolocation.getCurrentPosition(function(p){
                    var coords = p.coords;
                    map.panTo([coords.latitude, coords.longitude]);
                    setLocation(coords.longitude, coords.latitude);
                }, function(error){
                    showAlert(error.message);
                }, {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 100000
                });
            } else {
                showAlert("Geolocation is not available in your browser");
            }
            
        });

        L.DomEvent.on(container, "mouseout", function(e){
            map.on("click", mapOnClick);
        });

        return container;
    }
});

map.addControl(new GetCurrentLocationControl());

var ShareControl = L.Control.extend({
    options: {
        position: 'topright'
    },

    onAdd: function (map) {
        // create the control container with a particular class name
        var container = L.DomUtil.create('div', 'share-control');
        var link = L.DomUtil.create("a", 'share', container);
        link.href = "#";

        L.DomEvent.on(container, "click", function(e){
            map.off("click", mapOnClick);
            if(typeof marker != 'undefined'){
                var m = marker.getLatLng();
                var encodedCoords = Fgh.encode(m.lat, m.lng, 52);
                var url = encodedCoords;
                document.location.href = url;
            } else {
                showAlert("Add first a location! Click the map to set the location or input coordinates in the form below the map.");
            }
            
        });

        L.DomEvent.on(container, "mouseout", function(e){
            map.on("click", mapOnClick);
        });

        return container;
    }
});

map.addControl(new ShareControl());

L.control.layers({},{
    "Global landcover": globcover_2009,
    "Available countries": modis_tiles,
    "Requested locations": heatmap
}).addTo(map);

// Check if an inital marker is set. If yes, set the marker and fill in the
// coordinates input fields
if(typeof mlat != 'undefined' && typeof mlon != 'undefined'){
    setLocation(mlon, mlat);
}

map.on('click', mapOnClick);

$("#location-input-button").click(function(e){
    var lon = $("#longitude-input").val();
    var lat = $("#latitude-input").val();
    if(lat != '' && lon != ''){
        getSeries(lon, lat);
        map.panTo(L.latLng(lat, lon), {
            animate: true
        });
    } else {
        showAlert("Add first a location! Click the map to set the location or input coordinates in the form below the map.");
    }
    
});

/* (C) 2009 Ivan Boldyrev <lispnik@gmail.com>
 *
 * Fgh is a fast GeoHash implementation in JavaScript.
 *
 * Fgh is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * Fgh is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this software; if not, see <http://www.gnu.org/licenses/>.
 */
(function () {
    var _tr = "0123456789bcdefghjkmnpqrstuvwxyz";
    /* This is a table of i => "even bits of i combined".  For example:
     * #b10101 => #b111
     * #b01111 => #b011
     * #bABCDE => #bACE
     */
    var _dm = [0, 1, 0, 1, 2, 3, 2, 3, 0, 1, 0, 1, 2, 3, 2, 3,
    4, 5, 4, 5, 6, 7, 6, 7, 4, 5, 4, 5, 6, 7, 6, 7];

    /* This is an opposit of _tr table: it maps #bABCDE to
     * #bA0B0C0D0E.
     */
    var _dr = [0, 1, 4, 5, 16, 17, 20, 21, 64, 65, 68, 69, 80,
    81, 84, 85, 256, 257, 260, 261, 272, 273, 276, 277,
    320, 321, 324, 325, 336, 337, 340, 341];

    function _cmb (str, pos) {
        return (_tr.indexOf(str.charAt(pos)) << 5) | (_tr.indexOf(str.charAt(pos+1)));
    }

    function _unp(v) {
        return _dm[v & 0x1F] | (_dm[(v >> 6) & 0xF] << 3);
    }

    function _sparse (val) {
        var acc = 0, off = 0;

        while (val > 0) {
            low = val & 0xFF;
            acc |= _dr[low] << off;
            val >>= 8;
            off += 16;
        }
        return acc;
    }

    window['Fgh'] = {
        decode: function (str) {
            var L = str.length, i, w, ln = 0.0, lt = 0.0;

            // Get word; handle odd size of string.
            if (L & 1) {
                w = (_tr.indexOf(str.charAt(L-1)) << 5);
            } else {
                w = _cmb(str, L-2);
            }
            lt = (_unp(w)) / 32.0;
            ln = (_unp(w >> 1)) / 32.0;
            
            for (i=(L-2) & ~0x1; i>=0; i-=2) {
                w = _cmb(str, i);
                lt = (_unp(w) + lt) / 32.0;
                ln = (_unp(w>>1) + ln) / 32.0;
            }
            return {
                lat:  180.0*(lt-0.5),
                lon: 360.0*(ln-0.5)
            };
        },
        
        encode: function (lat, lon, bits) {
            lat = lat/180.0+0.5;
            lon = lon/360.0+0.5;
            
            /* We generate two symbols per iteration; each symbol is 5
             * bits; so we divide by 2*5 == 10.
             */
            var r = '', l = Math.ceil(bits/10), hlt, hln, b2, hi, lo, i;

            for (i = 0; i < l; ++i) {
                lat *= 0x20;
                lon *= 0x20;

                hlt = Math.min(0x1F, Math.floor(lat));
                hln = Math.min(0x1F, Math.floor(lon));
                
                lat -= hlt;
                lon -= hln;
                
                b2 = _sparse(hlt) | (_sparse(hln) << 1);
                
                hi = b2 >> 5;
                lo = b2 & 0x1F;

                r += _tr.charAt(hi) + _tr.charAt(lo);
            }
            
            r = r.substr(0, Math.ceil(bits/5));
            return r;
        },
    
        checkValid: function(str) {
            return !!str.match(/^[0-9b-hjkmnp-z]+$/);
        }
    }
})();
