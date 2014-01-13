$(".alert").alert()

var marker;

var setLocation = function(lon, lat){
    if(map.hasLayer(marker)){
        map.removeLayer(marker);
    }
    var innerHtml = "<div class=\"panel-heading\">Raw Values</div><div><img width=\"100%\" src=\"/cgi-bin/zoo_loader.cgi?ServiceProvider=&metapath=&Service=WPS&Request=Execute&Version=1.0.0&Identifier=ModisTimeSeries&DataInputs=lon=" + lon + ";lat=" + lat + ";epsg=4326;width=800;height=300&RawDataOutput=timeseries@mimeType=image/png\" alt=\"WPS Result\"></img></div>"
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

var map = L.map('map')
if(typeof mlat != 'undefined' && typeof mlon != 'undefined'){
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

L.control.layers({
    "Base Layer": baselayer
},{
    "Global landcover": globcover_2009,
    "Available countries": modis_tiles
}).addTo(map);

// Check if an inital marker is set. If yes, set the marker and fill in the
// coordinates input fields
if(typeof mlat != 'undefined' && typeof mlon != 'undefined'){
    setLocation(mlon, mlat);
    // Update also the input fields
    $("#longitude-input").val(mlon);
    $("#latitude-input").val(mlat);
}

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
    map.panTo(L.latLng(lat, lon), {
        animate: true
    });
});

$("#permalink-input-button").click(function(e){
    //var zoom = map.getZoom();
    //var center = map.getCenter();
    var m = marker.getLatLng();
    var encodedCoords = Fgh.encode(m.lat, m.lng, 52);
    /*var url = "?zoom=" + zoom + "&lat=" + center.lat + "&lon=" + center.lng;
    if(marker){
        var m = marker.getLatLng();
        url += "&mlat=" + m.lat + "&mlon=" + m.lng;
    }*/
    var url = encodedCoords;
    document.location.href = url;
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
