<?php

function formatBytes($bytes) {
    if ($bytes < 1024)
        return $bytes . 'B';
    elseif ($bytes < 1048576)
        return round($bytes / 1024, 2) . 'KB';
    else
        return round($bytes / 1048576, 2) . 'MB';
}

function lastModified($ts) {
    return date("d-M-Y H:i", $ts);
}

echo "<table class=\"table table-striped\">";
echo "<tr><th>Name</th><th>Last modified</th><th>Size</th></tr>";


$pass = $this->request->params['pass'];

$urlArray = array("controller" => $this->request->params['controller'],
    "action" => $this->request->params['action']);

for ($i = 0; $i < (count($pass) - 1); $i++) {
    $urlArray[] = $pass[$i];
}

$parentUrl = $this->Html->url($urlArray);

if (count($pass) > 0) {
    echo "<tr><td colspan=\"3\"><a href=\"$parentUrl/\">Parent Directory</a></td></tr>";
}

$content = $dir->read(true, true);

foreach ($content[0] as $d) {
    $u = array("controller" => $this->request->params['controller'],
        "action" => $this->request->params['action']);
    foreach ($pass as $p) {
        $u[] = $p;
    }
    $u[] = $d;
    echo "<tr><td colspan=\"3\"><a href=\"" . $this->Html->url($u) . DS . "\">$d</a></td></tr>";
}
foreach ($content[1] as $file) {
    $f = new File($dir->pwd() . DS . $file);
    echo "<tr><td>$file</td><td>" . lastModified($f->lastChange()) . "</td><td>" . formatBytes($f->size()) . "</td></tr>";
    $f->close();
}

echo "</table>";
?>