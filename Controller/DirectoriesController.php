<?php

App::uses('Folder', 'Utility');
App::uses('File', 'Utility');

/**
 * Static content controller
 *
 * Override this controller by placing a copy in controllers directory of an application
 *
 * @package       app.Controller
 * @link http://book.cakephp.org/2.0/en/controllers/pages-controller.html
 */
class DirectoriesController extends AppController {

    public function beforeFilter() {
        $this->vits_data_path = getenv("VITS_DATA_PATH");
    }

    public function molt() {
        $path = func_get_args();

        $base = $this->vits_data_path . DS . "MODIS" . DS . "MOLT" . DS;
        $currentDir = $base;
        foreach ($path as $p) {
            $currentDir .= $p;
            $currentDir .= DS;
        }

        $dir = new Folder($currentDir, false);
        $files = $dir->read(true, true);

        $this->set("dir", $dir);
        $this->render("listing");
    }

    public function processed() {
        $path = func_get_args();

        $base = $this->vits_data_path . DS . "MODIS" . DS . "processed" . DS;
        $currentDir = $base;
        foreach ($path as $p) {
            $currentDir .= $p;
            $currentDir .= DS;
        }

        $dir = new Folder($currentDir, false);
        $files = $dir->read(true, true);

        $this->set("dir", $dir);
        $this->render("listing");
    }

}