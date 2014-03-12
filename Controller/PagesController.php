<?php

/**
 * Static content controller.
 *
 * This file will render views from views/pages/
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
 * @package       app.Controller
 * @since         CakePHP(tm) v 0.2.9
 * @license       http://www.opensource.org/licenses/mit-license.php MIT License
 */
App::uses('AppController', 'Controller');

include 'geohash.class.php';

/**
 * Static content controller
 *
 * Override this controller by placing a copy in controllers directory of an application
 *
 * @package       app.Controller
 * @link http://book.cakephp.org/2.0/en/controllers/pages-controller.html
 */
class PagesController extends AppController {

    /**
     * This controller does not use a model
     *
     * @var array
     */
    public $uses = array();

    /**
     * Displays a view
     *
     * @param mixed What page to display
     * @return void
     * @throws NotFoundException When the view file could not be found
     * 	or MissingViewException in debug mode.
     */
    public function display() {
        $path = func_get_args();

        $count = count($path);
        if (!$count) {
            return $this->redirect('/');
        }
        $page = $subpage = $title_for_layout = null;

        if (!empty($path[0])) {
            $page = $path[0];
        }
        if (!empty($path[1])) {
            $subpage = $path[1];
        }
        if (!empty($path[$count - 1])) {
            //$title_for_layout = Inflector::humanize($path[$count - 1]);
            $title_for_layout = $path[$count - 1];
        }
        $this->set(compact('page', 'subpage', 'title_for_layout'));

        try {
            $this->render(implode('/', $path));
        } catch (MissingViewException $e) {
            if (Configure::read('debug')) {
                throw $e;
            }
            throw new NotFoundException();
        }
    }

    public function location() {

        $location = $this->request->params['location'];

        $geohash = new Geohash();
        $coords = $geohash->decode($location);

        // Read the URL parameters and
        // set corresponding initial map coordinates and
        // zoom and marker if requested
        $this->set("mlat", $coords[0]);
        $this->set("mlon", $coords[1]);

        $this->render('index');
    }

    public function redirecturl() {
        if (isset($this->request->query['u'])) {
            $externalUrl = $this->request->query['u'];
            $this->redirect($externalUrl, 303, true);
        } else {
            $this->redirect(array('controller' => 'pages', 'action' => 'display', 'index'));
        }
    }

    public function multi() {
        $content = "";
        $listEncodedCoords = array();
        if (count($this->request->data) > 0) {
            $content = $this->request->data['csv'];
            $lines = explode("\n", $content);
            $geohash = new Geohash();
            foreach ($lines as $line) {
                $comps = explode(";", $line);
                if (count($comps) >= 3) {
                    $encodedCoords = $geohash->encode($comps[1], $comps[2]);
                    array_push($listEncodedCoords, array('name' => $comps[0], 'coords' => $encodedCoords));
                }
            }
        }
        $this->set("content", $content);
        $this->set("list", $listEncodedCoords);
    }

    public function country($id) {

        switch ($id) {
            case "switzerland":
                $this->set("lat", 46.83);
                $this->set("lon", 8.29);
                $this->set("zoom", 7);
                break;

            case "liberia":
                $this->set("lat", 6.51);
                $this->set("lon", -9.37);
                $this->set("zoom", 7);
                break;

            case "ethiopia":
                $this->set("lat", 8.49);
                $this->set("lon", 39.58);
                $this->set("zoom", 5);
                break;

            case "kenya":
                $this->set("lat", 0.61);
                $this->set("lon", 37.95);
                $this->set("zoom", 6);
                break;

            case "tanzania":
                $this->set("lat", -6.09);
                $this->set("lon", 35.11);
                $this->set("zoom", 5);
                break;

            case "laos":
                $this->set("lat", 18.38);
                $this->set("lon", 103.95);
                $this->set("zoom", 6);
                break;

            default:
                break;
        }
        $this->render("index");
    }

}
