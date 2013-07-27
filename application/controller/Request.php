<?php
// @Author  : atibus
// @Date    : 07/15/2013
// @Desc    : Request Controller
// @System  : e-Request
// @Dir     : /application/controller/Request.php

if(!defined('ROOT_DIR'))exit('Direct access not allowed..');


class Request extends ActionController
{

    public function __construct()
    {
        parent::__construct();

        if(userSession('bimsaccount') and !userSession('erequest'))
        {
            $this->forward('user','authPage'); exit; 
        }
        if(!userSession('bimsaccount') and !userSession('erequest'))
        {
            $this->forward('user','loginpage'); exit;
        }


        $this->load->css('ext-bootstrap-fix-conflict');

    }

    private function checkUserPrivilege()
    {
        $user_module = unserialize(userSession('serialized_user_module'));

        $request_module = $this->getName().$this->getAction();

        if(!in_array($request_module, $user_module))
        {
            $this->forward('ErrorPage', 'forbidden'); exit;
        }
    }

    public function fuelLubricant()
    {
        $this->checkUserPrivilege();
        $data['form_title'] = "Fuel & Lubricant";
        $this->load->js('scripts/js/common-form-functions');
        $this->load->js('scripts/js/fuel-lubricant');
        $this->load->completeView('request/generic_view', $data);
    }

    public function maintenance()
    {  
        $this->checkUserPrivilege();
        $data['form_title'] = "Repair & Maintenance";
        $this->load->js('scripts/js/common-form-functions');
        $this->load->js('scripts/js/repair-maintenance');
        $this->load->completeView('request/generic_view', $data);
    }

    public function reSchedule()
    {
        $this->checkUserPrivilege();
        $data['form_title'] = "Rescheduling";
        $this->load->js('scripts/js/common-form-functions');
        $this->load->js('scripts/js/reschedule');
        $this->load->completeView('request/generic_view', $data);
    }

    public function document()
    {
        $this->checkUserPrivilege();
        $data['form_title'] = "Document Requisition";
        $this->load->js('scripts/js/common-form-functions');
        $this->load->js('scripts/js/docu-requisition');
        $this->load->completeView('request/generic_view', $data);
    }

    public function preTermination()
    {
        $this->checkUserPrivilege();
        $data['form_title'] = "Pre-termination";
        $this->load->js('scripts/js/common-form-functions');
        $this->load->js('scripts/js/pre-termination');
        $this->load->completeView('request/generic_view', $data);
    }

    public function newSalesAgent()
    {
        $this->checkUserPrivilege();
        $data['form_title'] = "New Sales Agent";
        $this->load->js('scripts/js/common-form-functions');
        $this->load->js('scripts/js/request-form');
        $this->load->js('scripts/js/new-sales-agent');
        $this->load->completeView('request/generic_view',$data);
    }

    public function accountableForms()
    {
        $this->checkUserPrivilege();
        $data['form_title'] = "Accountable Forms";
        $this->load->js('scripts/js/common-form-functions');
         $this->load->js('scripts/js/request-form');
        $this->load->js('scripts/js/accountable-forms');
        $this->load->completeView('request/generic_view',$data);
    }

    public function processing()
    {
        $this->checkUserPrivilege();
        $data['form_title'] = "Action Screen";
        $this->load->js('scripts/js/mc-request-inc');
        $this->load->js('scripts/js/r_and_m_admin2');
        $this->load->js('scripts/js/request-processing');
        $this->load->completeView('request/processing', $data);
    }
}
