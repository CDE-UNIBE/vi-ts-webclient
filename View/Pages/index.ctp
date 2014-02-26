<?php
echo $this->Html->meta("viewport", "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no");
echo $this->Html->script("leaflet-0.6.4/leaflet.js", array('inline' => false));
echo $this->Html->css(array("leaflet-0.6.4/leaflet", "index.min"), array('inline' => false));

if (isset($mlat) && isset($mlon)) {
    $script = "var mlat = $mlat, mlon = $mlon;";
    echo $this->Html->scriptBlock($script, array('inline' => false));
}
if (isset($lat) && isset($lon) && isset($zoom)) {
    $script = "var lat = $lat, lon = $lon, zoom = $zoom;";
    echo $this->Html->scriptBlock($script, array('inline' => false));
}
?>

<div class="row">
    <div class="col-sm-9">
        <p class="text-info">This tool is designed to provide investigative insights into Terra MODIS
            NDVI time series. To get started, place the cursor anywhere within the
            highlighted areas or enter direct geographic coordinates.</p>
    </div>
    <div class="col-sm-1 hidden-xs">
        <a href="http://www.unibe.ch">
            <?php echo $this->Html->image("unibe-logo.png", array('alt' => "University of Bern", "height" => 32, "width" => 32)); ?>
        </a>
    </div>
</div>

<div class="row">
    <div class="col-md-10">
        <div id="map">

        </div>
    </div>
</div>

<div class="row">
    <div class="col-md-10">
        <form class="form-inline" role="form" style="margin-bottom: 20px;">
            <div class="form-group">
                <label class="sr-only" for="longitude-input">Longitude</label>
                <input type="number" class="form-control" id="longitude-input" placeholder="Longitude">
            </div>
            <div class="form-group">
                <label class="sr-only" for="latitude-input">Latitude</label>
                <input type="number" class="form-control" id="latitude-input" placeholder="Latitude">
            </div>
            <button type="button" id="location-input-button" class="btn btn-primary">Get time series</button>
            <!--button type="button" id="permalink-input-button" class="btn btn-default">Permanent link</button-->
        </form>
    </div>
</div>

<div class="row">
    <div class="col-md-10">
        <div id="diagram-preview-container">
            <div id="raw-values-panel" class="panel panel-default">
                <div class="panel-heading">Raw time series</div>
            </div>
        </div>
    </div>
</div>

<div class="row">
    <div class="col-md-10">
        <div id="bfast-diagram-container">
            <div id="bfast-diagram-panel" class="panel panel-default">
                <div class="panel-heading">Breaks for Additive Season and Trend</div>
            </div>
        </div>
    </div>
</div>

<?php
            $date = date_create();
            if (Configure::read("debug") == 0) {
                echo $this->Html->script("map.js?_dc=" . date_timestamp_get($date));
            } else {
                echo $this->Html->script("map-debug.js?_dc=" . date_timestamp_get($date));
            }
?>
