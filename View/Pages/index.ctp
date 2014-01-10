<?php
echo $this->Html->script("leaflet-0.6.4/leaflet.js", array('inline' => false));
echo $this->Html->css("leaflet-0.6.4/leaflet.css", array('inline' => false));

// Read the URL parameters and set corresponding initial map coordinates and
// zoom and marker if requested
$lat = 0;
$lon = 0;
$zoom = 2;
if(isset($_GET['lat'])){
    $lat = $_GET['lat'];
}
if(isset($_GET['lon'])){
    $lon = $_GET['lon'];
}
if(isset($_GET['zoom'])){
    $zoom = $_GET['zoom'];
}
if(isset($_GET['mlat'])){
    $mlat = $_GET['mlat'];
}
if(isset($_GET['mlon'])){
    $mlon = $_GET['mlon'];
}

$script = "
var initLat = $lat, initLon = $lon, initZoom = $zoom;";

if(isset($mlon) && isset ($mlat)) {
    $script .= "var initMarkerLat = $mlat, initMarkerLon = $mlon;
";
}


echo $this->Html->scriptBlock($script, array('inline' => false));

?>

<div id="map" style="height: 400px; margin-bottom: 20px; margin-top: 20px;">

</div>

<form class="form-inline" role="form" style="margin-bottom: 20px;">
  <div class="form-group">
    <label class="sr-only" for="longitude-input">Longitude</label>
    <input type="number" class="form-control" id="longitude-input" placeholder="Longitude">
  </div>
  <div class="form-group">
    <label class="sr-only" for="latitude-input">Latitude</label>
    <input type="number" class="form-control" id="latitude-input" placeholder="Latitude">
  </div>
  <button type="button" id="location-input-button" class="btn btn-default">Set location</button>
  <button type="button" id="permalink-input-button" class="btn btn-default">Permanent link</button>
</form>

<div id="diagram-preview-container">
    <div id="raw-values-preview-div" class="panel panel-default" style="display: none;">
    </div>
</div>

<div class="btn-group">
    <div class="btn-group">
        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
            Dropdown
            <span class="caret"></span>
        </button>
        <ul class="dropdown-menu">
            <li><a href="#">Dropdown link</a></li>
            <li><a href="#">Dropdown link</a></li>
        </ul>
    </div>
    <button id="add-diagram-button" type="button" class="btn btn-default">Add Diagram</button>
</div>

<!--div class="panel panel-default">
    <div class="panel-body">
        <div>Get values as comma-separated values (csv)</div>
        <div class="btn-group" data-toggle="buttons">
            <label class="btn btn-primary">
                <input type="checkbox"> Raw
            </label>
            <label class="btn btn-primary">
                <input type="checkbox"> Smooth
            </label>
            <label class="btn btn-primary">
                <input type="checkbox"> Corrected
            </label>
        </div>
        <div class="btn-group">
            <button type="button" class="btn btn-default">Download</button>
        </div>
    </div>
</div>



<div class="panel panel-default">
    <div class="panel-body">
        <div>Get diagrams</div>
        <div class="btn-group" data-toggle="buttons">
            <label class="btn btn-primary">
                <input type="checkbox"> Raw
            </label>
            <label class="btn btn-primary">
                <input type="checkbox"> Smooth
            </label>
            <label class="btn btn-primary">
                <input type="checkbox"> Corrected
            </label>
        </div>
        <div class="btn-group">
            <button type="button" class="btn btn-default" id="preview-bfast-button">Preview</button>
        </div>
        <div id="preview-bfast-div" style="display: none;">
            <div class="btn-group">
                <button type="button" class="btn btn-default" id="download-bfast-button">Download</button>
            </div>
        </div>
    </div>
</div>
<div class="panel panel-default">
    <div class="panel-body">
        <div>Get BFast diagram</div>
        <div class="btn-group" data-toggle="buttons">
            <label class="btn btn-primary">
                <input type="checkbox"> Raw
            </label>
            <label class="btn btn-primary">
                <input type="checkbox"> Smooth
            </label>
            <label class="btn btn-primary">
                <input type="checkbox"> Corrected
            </label>
        </div>
        <div class="btn-group">
            <button type="button" class="btn btn-default">Preview</button>
        </div>
    </div>
</div>

<div id="latlng-alert" class="modal fade">
    <div class="modal-dialog">
        <div class="modal-content">
            <div id="latlng-alert-header" class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title">Modal title</h4>
            </div>
            <div id="latlng-alert-body" class="modal-body">
                <p>One fine body&hellip;</p>
            </div>
        </div>
    </div>
</div> /.modal -->
<?php
$date = date_create();
echo $this->Html->script("map.js?_dc=" . date_timestamp_get($date));
?>
