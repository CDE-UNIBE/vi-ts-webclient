<div class="row">
    <div class="col-md-10">
        <h2>Contact</h2>
    </div>
</div>

<div itemscope itemtype="http://schema.org/EducationalOrganization">
    <div class="row">
        <div class="col-md-10">
            <div itemprop="name">University of Bern</div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-10">
            <div itemprop="department" itemscope itemtype="http://schema.org/EducationalOrganization">
                <span itemprop="name">Centre for Development and Environment</span>
                <div itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
                    <div itemprop="streetAddress">Hallerstrasse 10</div>
                    <div>
                        <span itemprop="addressCountry">CH</span>-<span itemprop="postalCode">3012</span>
                        <span itemprop="addressLocality">Bern</span>
                    </div>
                    <div>
                        <a itemprop="url" href="http://www.cde.unibe.ch" class="external">
                            http://www.cde.unibe.ch
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row" style="margin-top: 10px;">
        <div class="col-sm-2">Office location:</div>
        <div class="col-sm-8">
            <?php
            $url = $this->Html->url(array(
                        "controller" => "pages",
                        "action" => "location",
                        "location" => "u0m715qntj2"), true);
            echo "<a href=\"$url\">$url</a>";
            ?>
        </div>
    </div>
    <div class="row" style="margin-top: 10px;">
        <div class="col-md-10">
            <div><strong>Point of contact:</strong></div>
        </div>
    </div>
    <div itemprop="employee" itemscope itemtype="http://schema.org/Person">
        <div class="row">
            <div class="col-sm-2">
                <div itemprop="name">Elias Hodel</div>
            </div>
            <div class="col-sm-8">
                <div itemprop="email">elias.hodel&nbsp;<i>at</i>&nbsp;cde.unibe.ch</div>
            </div>
        </div>
    </div>
</div>