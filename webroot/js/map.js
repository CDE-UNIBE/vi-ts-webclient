$(".alert").alert();var marker;var showAlert=function(b){var a='<div id="alert-div" class="alert alert-warning alert-dismissable">';a+='<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>';a+=b;a+="</div>";$(a).insertBefore("#map")};var setLocation=function(d,b){if(map.hasLayer(marker)){map.removeLayer(marker);$(".hidden-at-start").addClass("hidden")}var a='<div class="panel-heading">Data are being processed ...</div><div style="text-align: center;"><img width="200" height="200" src="img/spinner.gif" alt="Loading ..."></img></div>';var c=$("#raw-values-preview-div");c.html(a);c.parents(".row").removeClass("hidden");$(".bfast-button-row").removeClass("hidden");$("#longitude-input").val(Math.round(d*10000)/10000);$("#latitude-input").val(Math.round(b*10000)/10000);marker=L.marker(L.latLng(b,d));marker.on("click",function(f){map.removeLayer(marker);$("#raw-values-preview-div").html("");$("#raw-values-preview-div").fadeOut();$("#longitude-input").val("");$("#latitude-input").val("");marker=undefined});marker.addTo(map);$.ajax({url:"/cgi-bin/zoo_loader.cgi?RawDataOutput=plot@mimeType=application/json",data:{ServiceProvider:"",metapath:"",Service:"WPS",Request:"Execute",Version:"1.0.0",Identifier:"TimeSeries",DataInputs:"lon="+d+";lat="+b+";epsg=4326;width=800;height=300"},success:function(g,h,f){var e='<div class="panel-heading">Time Series<a href="#"><i class="pull-right fa fa-info-circle">&nbsp;</i></a></div><div><img width="100%" src="'+g.file+'" alt="WPS Result"></img></div>';$("#raw-values-preview-div").html(e)}})};var mapOnClick=function(a){var b=a.latlng.lat;var c=a.latlng.lng;setLocation(c,b)};var map=L.map("map");if(typeof mlat!="undefined"&&typeof mlon!="undefined"){map.setView([mlat,mlon],10)}else{map.setView([0,0],2)}var baselayer=L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',maxZoom:17});baselayer.addTo(map);var modis_tiles=L.tileLayer("http://www.vi-ts.org/tms/1.0.0/modis_tiles/{z}/{x}/{y}.png",{tms:true,maxZoom:17,opacity:0.6});modis_tiles.addTo(map);var globcover_2009=L.tileLayer("http://www.vi-ts.org/tms/1.0.0/globcover_2009/{z}/{x}/{y}.png",{tms:true,maxZoom:17});var heatmap=L.tileLayer("http://www.vi-ts.org/tms/1.0.0/access_heatmap/{z}/{x}/{y}.png",{tms:true,maxZoom:17});var GetCurrentLocationControl=L.Control.extend({options:{position:"topright"},onAdd:function(c){var a=L.DomUtil.create("div","get-location-control");var b=L.DomUtil.create("a","get-location",a);b.href="#";L.DomEvent.on(a,"click",function(d){c.off("click",mapOnClick);if("geolocation" in navigator){navigator.geolocation.getCurrentPosition(function(f){var e=f.coords;c.panTo([e.latitude,e.longitude]);setLocation(e.longitude,e.latitude)},function(e){showAlert(e.message)},{enableHighAccuracy:true,timeout:10000,maximumAge:100000})}else{showAlert("Geolocation is not available in your browser")}});L.DomEvent.on(a,"mouseout",function(d){c.on("click",mapOnClick)});return a}});map.addControl(new GetCurrentLocationControl());var ShareControl=L.Control.extend({options:{position:"topright"},onAdd:function(c){var a=L.DomUtil.create("div","share-control");var b=L.DomUtil.create("a","",a);b.href="#";L.DomEvent.on(a,"click",function(h){c.off("click",mapOnClick);if(typeof marker!="undefined"){var d=marker.getLatLng();var g=Fgh.encode(d.lat,d.lng,52);var f=g;document.location.href=f}else{showAlert("Add first a location! Click the map to set the location or input coordinates in the form below the map.")}});L.DomEvent.on(a,"mouseout",function(d){c.on("click",mapOnClick)});return a}});map.addControl(new ShareControl());L.control.layers({"Base Layer":baselayer},{"Global landcover":globcover_2009,"Available countries":modis_tiles,"Requested locations":heatmap}).addTo(map);if(typeof mlat!="undefined"&&typeof mlon!="undefined"){setLocation(mlon,mlat)}map.on("click",mapOnClick);$("#add-diagram-button").on("click",function(c){var a='<div id="preview-div" class="panel panel-default">';var d=marker.getLatLng().lng;var b=marker.getLatLng().lat;a+='<div class="panel-heading">Raw Values</div><div><img width="100%" src="/cgi-bin/zoo_loader.cgi?ServiceProvider=&metapath=&Service=WPS&Request=Execute&Version=1.0.0&Identifier=ModisTimeSeries&DataInputs=lon='+d+";lat="+b+';epsg=4326;width=800;height=300&RawDataOutput=timeseries@mimeType=image/png" alt="WPS Result"></img></div>';a+='<button type="button" class="btn btn-default" style="margin: 5px;">Close</button></div>';$("#diagram-preview-container").append(a);$("#diagram-preview-container div button").click(function(f){var g=$(this).parent();g.fadeOut(400,function(){g.remove()})})});$("#location-input-button").click(function(b){var c=$("#longitude-input").val();var a=$("#latitude-input").val();setLocation(c,a);map.panTo(L.latLng(a,c),{animate:true})});$("#bfast-button").click(function(d){var b='<div class="panel-heading">Data are being processed ...</div><div style="text-align: center;"><img width="200" height="200" src="img/spinner.gif" alt="Loading ..."></img></div>';var a=$("#bfast-diagram-panel");a.html(b);a.parents(".row").removeClass("hidden");var c=marker.getLatLng();$.ajax({url:"/cgi-bin/zoo_loader.cgi?RawDataOutput=plot@mimeType=application/json",data:{ServiceProvider:"",metapath:"",Service:"WPS",Request:"Execute",Version:"1.0.0",Identifier:"NDVIBfast",DataInputs:"lon="+c.lng+";lat="+c.lat+";epsg=4326;width=800;height=300"},success:function(g,h,f){var e='<div class="panel-heading">Breaks for Additive Season and Trend<a href="#"><i class="pull-right fa fa-info-circle">&nbsp;</i></a></div><div><img width="100%" src="'+g.file+'" alt="WPS Result"></img></div>';a.html(e)}})});(function(){var a="0123456789bcdefghjkmnpqrstuvwxyz";var d=[0,1,0,1,2,3,2,3,0,1,0,1,2,3,2,3,4,5,4,5,6,7,6,7,4,5,4,5,6,7,6,7];var b=[0,1,4,5,16,17,20,21,64,65,68,69,80,81,84,85,256,257,260,261,272,273,276,277,320,321,324,325,336,337,340,341];function f(g,h){return(a.indexOf(g.charAt(h))<<5)|(a.indexOf(g.charAt(h+1)))}function c(g){return d[g&31]|(d[(g>>6)&15]<<3)}function e(i){var g=0,h=0;while(i>0){low=i&255;g|=b[low]<<h;i>>=8;h+=16}return g}window.Fgh={decode:function(m){var h=m.length,k,j,l=0,g=0;if(h&1){j=(a.indexOf(m.charAt(h-1))<<5)}else{j=f(m,h-2)}g=(c(j))/32;l=(c(j>>1))/32;for(k=(h-2)&~1;k>=0;k-=2){j=f(m,k);g=(c(j)+g)/32;l=(c(j>>1)+l)/32}return{lat:180*(g-0.5),lon:360*(l-0.5)}},encode:function(p,h,s){p=p/180+0.5;h=h/360+0.5;var g="",m=Math.ceil(s/10),t,k,q,j,o,n;for(n=0;n<m;++n){p*=32;h*=32;t=Math.min(31,Math.floor(p));k=Math.min(31,Math.floor(h));p-=t;h-=k;q=e(t)|(e(k)<<1);j=q>>5;o=q&31;g+=a.charAt(j)+a.charAt(o)}g=g.substr(0,Math.ceil(s/5));return g},checkValid:function(g){return !!g.match(/^[0-9b-hjkmnp-z]+$/)}}})();