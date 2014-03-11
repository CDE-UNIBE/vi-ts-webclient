<?php

/**
 * Routes configuration
 *
 * In this file, you set up routes to your controllers and their actions.
 * Routes are very important mechanism that allows you to freely connect
 * different URLs to chosen controllers and their actions (functions).
 *
 * CakePHP(tm) : Rapid Development Framework (http://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 * @link          http://cakephp.org CakePHP(tm) Project
 * @package       app.Config
 * @since         CakePHP(tm) v 0.2.9
 * @license       http://www.opensource.org/licenses/mit-license.php MIT License
 */
/**
 * Here, we are connecting '/' (base path) to controller called 'Pages',
 * its action called 'display', and we pass a param to select the view file
 * to use (in this case, /app/View/Pages/home.ctp)...
 */
Router::connect('/', array('controller' => 'pages',
            'action' => 'display',
            'index'));
/**
 * ...and connect the rest of 'Pages' controller's URLs.
 */
Router::connect('/about', array('controller' => 'pages',
            'action' => 'display',
            'about'));

Router::connect('/multi', array('controller' => 'pages',
            'action' => 'multi'));

Router::connect('/contact', array('controller' => 'pages',
            'action' => 'display',
            'contact'));

Router::connect('/MODIS/processed/*', array('controller' => 'directories',
            'action' => 'processed'));

Router::connect('/MODIS/MOLT/*', array('controller' => 'directories',
            'action' => 'molt'));

Router::connect('/references', array('controller' => 'pages',
            'action' => 'display',
            'references'));

Router::connect('/redirect', array('controller' => 'pages',
            'action' => 'redirecturl'));

// Add direct links to pilot countries
Router::connect('/switzerland', array('controller' => 'pages',
            'action' => 'country', "switzerland"));

Router::connect('/liberia', array('controller' => 'pages',
            'action' => 'country', "liberia"));

Router::connect('/laos', array('controller' => 'pages',
            'action' => 'country', "laos"));

Router::connect('/tanzania', array('controller' => 'pages',
            'action' => 'country', "tanzania"));

Router::connect('/kenya', array('controller' => 'pages',
            'action' => 'country', "kenya"));

Router::connect('/ethiopia', array('controller' => 'pages',
            'action' => 'country', "ethiopia"));

// Add a route to get the Geohash shortcuts URL
Router::connect('/:location', array('controller' => 'pages',
            'action' => 'location'),
                array('location' => '[a-z0-9]+'));

#    Router::connect('/pages/*', array('controller' => 'pages', 'action' => 'display'));

/**
 * Load all plugin routes. See the CakePlugin documentation on
 * how to customize the loading of plugin routes.
 */
CakePlugin::routes();

/**
 * Load the CakePHP default routes. Only remove this if you do not want to use
 * the built-in default routes.
 */
#    require CAKE . 'Config' . DS . 'routes.php';
