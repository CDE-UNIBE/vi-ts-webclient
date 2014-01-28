
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <?php
    echo $this->Html->meta('icon');
    echo $this->fetch('css');
    echo $this->fetch('script');
    echo $this->Html->script(array("jquery-1.10.2.min.js","bootstrap-3.0.3/bootstrap.min.js"));
    ?>

    <title>NDVI Time Series based on MODIS</title>

    <!-- Bootstrap core CSS -->
    <?php
    echo $this->Html->css("bootstrap-3.0.3/bootstrap.min.css");
    echo $this->Html->css("font-awesome-4.0.3/font-awesome.min.css");
    ?>
    <!-- Custom styles for this template -->
    <!--<link href="navbar-static-top.css" rel="stylesheet">-->

    <!-- Just for debugging purposes. Don't actually copy this line! -->
    <!--[if lt IE 9]><script src="../../docs-assets/js/ie8-responsive-file-warning.js"></script><![endif]-->

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->
    <style type="text/css">
    body {
        padding-top: 50px;
    }
    .content-template {
        padding: 40px 15px;
        text-align: center;
    }
    </style>
  </head>

  <body>

    <!-- Static navbar -->
    <div class="navbar navbar-default navbar-fixed-top" role="navigation">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="logo navbar-btn pull-left" href="<?php echo $this->Html->url(array("controller" => "pages", "action" => "display", "index"));?>" title="Home">
        <?php echo $this->Html->image("modis-satellite.png", array('alt' => "Home"))?>
      </a>
          <a class="navbar-brand" href="<?php echo $this->Html->url(array("controller" => "pages", "action" => "display", "index"));?>">NDVI Time Series</a>
        </div>
        <div class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
            <li <?php if($title_for_layout == "index"){echo "class=\"active\"";}?>><a href="<?php echo $this->Html->url(array("controller" => "pages", "action" => "display", "index"));?>">Home</a></li>
            <li <?php if($title_for_layout == "about"){echo "class=\"active\"";}?>><a href="<?php echo $this->Html->url(array("controller" => "pages", "action" => "display", "about"));?>">About</a></li>
            <li <?php if($title_for_layout == "contact"){echo "class=\"active\"";}?>><a href="<?php echo $this->Html->url(array("controller" => "pages", "action" => "display", "contact"));?>">Contact</a></li>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </div>


    <div class="container" style="margin-top: 20px;">
      <!-- Main component for a primary marketing message or call to action -->
        <?php echo $this->fetch('content'); ?>
    </div><!-- /container -->


    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->

  </body>
</html>

