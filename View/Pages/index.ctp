<?php
echo $this->Html->script("leaflet-0.6.4/leaflet.js", array('inline' => false));
echo $this->Html->css("leaflet-0.6.4/leaflet.css", array('inline' => false));

if(isset($mlat) && isset($mlon)){
    $script = "var mlat = $mlat, mlon = $mlon;";
    echo $this->Html->scriptBlock($script, array('inline' => false));
}

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

<?php
$date = date_create();
echo $this->Html->script("map.js?_dc=" . date_timestamp_get($date));
?>
