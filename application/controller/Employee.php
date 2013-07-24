<?php

if(!defined('ROOT_DIR')) exit('Direct access is not allowed.');

class Employee extends ActionController
{
    private $empmodel;

    private $ajax_result;
    public function __construct()
    {
        parent::__construct();
        $this->ajax_result['success'] = false;
    }

    // for ajax only;
    public function getFullname()
    {
        $badgeno = get_post('badgeno');
        try
        {
            if(!$badgeno)
            {
                runtimeException('Employee Badge No is required',0);
            }

            $this->empmodel = $this->load->model('EmployeeModel');

            $fullname = $this->empmodel->fetchFullnameByBadgeNo($badgeno);
            if(!$fullname)
            {
                runtimeException('Invalid Badge No.',1);
            }
            
            $this->ajax_result['success'] = true;
            $this->ajax_result['fullname'] = trim($fullname[0]['NAME']);
        }
        catch(Exception $e)
        {
            $this->ajax_result['errormsg'] = $e->getMessage();
        }

        echo json_encode($this->ajax_result);
    }
}
