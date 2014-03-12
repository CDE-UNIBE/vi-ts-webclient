<div class="row">
    <div class="col-md-10">
        <h2>Multipoint</h2>
    </div>
</div>

<div class="row">
    <div class="col-md-10">
        <p class="text-primary">
            Copy and paste a CSV file according to name;lat;lon;
        </p>
        <p>
            Use the below example to getting started:
        </p>
        <pre>CDE main office;46.9526;7.4352;
Phu Kham Copper-Gold operation;18.868;102.888;</pre>
    </div>
</div>

<div class="row">
    <div class="col-md-10">
        <form method="POST" role="form">
            <div class="form-group">
                <textarea name="csv" rows="12" class="form-control"><?php echo $content; ?></textarea>
            </div>
            <div class="form-group">
                <button type="submit" id="submit-button" class="btn btn-primary">Parse</button>
            </div>
        </form>
    </div>
</div>

<?php
if (isset($list) && count($list) > 0) {
    echo "<div class=\"row\"><div class=\"col-md-10\">";
    echo "<table class=\"table table-striped\">";
    echo "<tr><th>Name</th><th>Direct link</th></tr>";
    foreach ($list as $item) {
        $url = $this->Html->url(array(
                    'controller' => 'pages',
                    'action' => 'display',
                    'index'
                        ), true) . $item['coords'];
        $name = $item['name'];
        echo "<tr><td>$name</td><td><a href=\"$url\">$url</a></td></tr>";
    }
    echo "</table></div></div>";
}
?>