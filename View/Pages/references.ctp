<?php
$date = date_create();
if (Configure::read("debug") == 0) {
    echo $this->Html->css(array("references.min"), array('inline' => false));
} else {
    echo $this->Html->css(array("references"), array('inline' => false));
}
?>

<div class="row">
    <div class="col-md-10">
        <h1>References</h1>
    </div>
</div>

<div class="row start-citation">
    <div class="col-md-10">
        Beck, P., Atzberer, C., Høgda, K., Johansen, B., & Skidmore, A. (2006).
        Improved monitoring of vegetation dynamics at very high latitudes:
        A new method using MODIS NDVI. Remote Sensing of Environment, 100, 321−334.
    </div>
</div>
<div class="row doi-link">
    <div class="col-md-10">
        <a href="http://dx.doi.org/10.1016/j.rse.2005.10.021" class="external">
            http://dx.doi.org/10.1016/j.rse.2005.10.021
        </a>
    </div>
</div>

<div class="row start-citation">
    <div class="col-md-10">
        Huete, A., Li, H. Q., Batchily, K. & Van Leeuwen, W. (1997). A comparison
        of vegetation indices of global set of TM images for EO-MODIS. Remote Sensing
        of Environment,  59, 440-451.
    </div>
</div>
<div class="row doi-link">
    <div class="col-md-10">
        <a href="http://dx.doi.org/10.1016/S0034-4257(96)00112-5" class="external">
            http://dx.doi.org/10.1016/S0034-4257(96)00112-5
        </a>
    </div>
</div>

<div class="row start-citation">
    <div class="col-md-10">
        Huete, A., Justice, C., Van Leeuwen, W. (1999). MODIS Vegetation Index:
        Algorithm Theoretical Basis document ATBD. Version 3.0.
    </div>
</div>
<div class="row doi-link">
    <div class="col-md-10">
        <a href="http://modis.gsfc.nasa.gov/data/atbd/atbd_mod13.pdf" class="external">
            http://modis.gsfc.nasa.gov/data/atbd/atbd_mod13.pdf
        </a>
    </div>
</div>

<div class="row start-citation">
    <div class="col-md-10">
        Jönsson, P., & Eklundh, L. (2002). Seasonality extraction by function-fitting
        to time series of satellite sensor data. IEEE Transactions on Geoscience
        and Remote Sensing, 40, 1824−1832.
    </div>
</div>
<div class="row doi-link">
    <div class="col-md-10">
        <a href="http://dx.doi.org/10.1109/TGRS.2002.802519" class="external">
            http://dx.doi.org/10.1109/TGRS.2002.802519
        </a>
    </div>
</div>

<div class="row start-citation">
    <div class="col-md-10">
        Jönsson, P. and Eklundh, L., 2004, TIMESAT - a program for analysing time-series
        of satellite sensor data, Computers and Geosciences, 30, 833-845.
    </div>
</div>
<div class="row doi-link">
    <div class="col-md-10">
        <a href="http://dx.doi.org/10.1016/j.cageo.2004.05.006" class="external">
            http://dx.doi.org/10.1016/j.cageo.2004.05.006
        </a>
    </div>
</div>

<div class="row start-citation">
    <div class="col-md-10">
        Solano, R., Didan, K., Jacobson, A., Huete, A. (2013). MODIS Vegetation
        Indices (MOD13) C5 – User’s Guide. Terrestrial Biophysica and Remote Sensing Lab.
        University of Arizona. Arizona.
    </div>
</div>
<!--div class="row doi-link">
    <div class="col-md-10">

    </div>
</div-->

<div class="row start-citation">
    <div class="col-md-10">
        Verbesselt J, Hyndman R, Newnham G, Culvenor D (2010). Detecting Trend and
        Seasonal Changes in Satellite Image Time Series. Remote Sensing of Environment,
        114 (1), 106–115.
    </div>
</div>
<div class="row doi-link">
    <div class="col-md-10">
        <a href="http://dx.doi.org/10.1016/j.rse.2009.08.014" class="external">
            http://dx.doi.org/10.1016/j.rse.2009.08.014
        </a>
    </div>
</div>

<div class="row start-citation">
    <div class="col-md-10">
        Verbesselt J, Hyndman R, Zeileis A, Culvenor D (2010). Phenological Change
        Detection while Accounting for Abrupt and Gradual Trends in Satellite Image
        Time Series. Remote Sensing of Environment, 114 (12), 2970–2980.
    </div>
</div>
<div class="row doi-link">
    <div class="col-md-10">
        <a href="http://dx.doi.org/10.1016/j.rse.2010.08.003">
            http://dx.doi.org/10.1016/j.rse.2010.08.003
        </a>
    </div>
</div>

<a href="#" class="external">link</a>

<?php
$date = date_create();
if (Configure::read("debug") == 0) {
    echo $this->Html->script("references.min");
} else {
    echo $this->Html->script("references.js?_dc=" . date_timestamp_get($date));
}
?>