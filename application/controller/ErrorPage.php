<?php

class ErrorPage extends ActionController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function forbidden()
    {
        $this->load->view('error/forbidden');
    }
}