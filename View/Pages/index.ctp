<?php
echo $this->Html->script("leaflet-0.6.4/leaflet.js", array('inline' => false));
?>
<h1>NDVI Time Series</h1>
Zis is it!

<div id="map" style="height: 400px; margin-bottom: 20px;">

</div>
<div class="panel panel-default">
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
            <?php echo $this->Html->image('seasonalbreak_TreeMort.jpg', array('width' => '100%', 'alt' => 'BFast')); ?>
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
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
<?php
            $date = date_create();
            echo $this->Html->script("map.js?_dc=" . date_timestamp_get($date));
?>
