<div class="row">
    <div class="col-md-10">
        <h2>Multipoint</h2>
    </div>
</div>

<div class="row">
    <div class="col-md-10">
        <p class="text-primary">
            Copy & paste a CSV file according to id;lat;lon;
        </p>
    </div>
</div>

<div class="row">
    <div class="col-md-10">
        <form method="POST" role="form">
            <div class="form-group">
                <textarea name="csv" rows="15" class="form-control"><?php echo $content; ?></textarea>
            </div>
            <div class="form-group">
                <button type="submit" id="submit-button" class="btn btn-primary">Parse</button>
            </div>
        </form>
    </div>
</div>

<?php
if (isset($coords) && count($coords) > 0) {
    foreach ($coords as $coord) {
        $url = $this->Html->url(array(
                    'controller' => 'pages',
                    'action' => 'display',
                    'index'
                        ), true) . $coord;
        echo "<div class=\"row\"><div class=\"col-md-10\">";
        echo "<a href=\"$url\">$url</a>";
        echo "</div></div>";
    }
}
?>