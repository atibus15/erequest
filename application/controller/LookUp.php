<?php

class LookUp extends ActionController
{
    private $ajax_result;

    public function __construct()
    {
        parent::__construct();
        $this->ajax_result['success'] = false;
    }

    //ajax only
    //@sub_code = passed through ajax post or get; 
    //@values = FL_ITEM, MCMAKE, FL_SUTYPE etc depend on the subappcode in LKGENDTL TABLE
    public function execGetGenDtl()
    {
        $app_code = get_post('appcode');
        $sub_code = get_post('subappcode');
        try
        {
            if(!$app_code or !$sub_code)
            {
                $this->ajax_result['errormsg'] = "Application and Sub-Application code is required.";
                exit(json_encode($this->ajax_result));
            }
                

            $gen_dtl_final = array();

            
            $this->lookupmodel = $this->load->model('LookUpModel');
            $gen_dtl = $this->lookupmodel->fetchGenDtlBySubCode($app_code,$sub_code);

            foreach($gen_dtl as $dtl)
            {
                $gen_dtl_final[] = array('code'=>$dtl['DTLCODE'],'desc'=>$dtl['DESCRIPTION']);
            }

            $this->ajax_result['success'] = true;
            $this->ajax_result['data'] = $gen_dtl_final;            
        }
        catch(Exception $e)
        {
            $this->ajax_result['errormsg'] = "System error. Request Terminated.";
            $this->load->helper('Logger');
            Logger::write($e);
        }

        echo json_encode($this->ajax_result);
    }



    public function execGetLastRequestDate()
    {
        $request_code   = get_post('requestcode');
        $item_code      = get_post('itemcode');
        
        try
        {
            if(!$request_code or !$item_code) 
            {
                $this->ajax_result['errormsg'] = "Request and Item code is required.";
                exit(json_encode($this->ajax_result)); 
            }

            $this->requestmodel = $this->load->model('RequestModel');

            $last_request_date = $this->requestmodel->fetchLastRequestDate(array($request_code,$item_code));

            $this->ajax_result['success'] = true;
            $this->ajax_result['last_request_date'] = $last_request_date;
        }
        catch(Exception $e)
        {
            $this->ajax_result['errormsg'] = "System error. Request Terminated.";
            $this->load->helper('Logger');
            Logger::write($e);
        }
        echo json_encode($this->ajax_result);
    }

    public function execGetRequirements()
    {
        $app_code = get_post('appcode');
        $sub_code = get_post('subcode');

        try
        {
            if(!$app_code or !$sub_code)
            {
                $this->ajax_result['errormsg'] = "App Code and Sub App. Code is required.";
                exit(json_encode($this->ajax_result));
            }

            $this->lookupmodel  = $this->load->model('LookUpModel');

            $requirement_arr    = $this->lookupmodel->fetchRequirements($app_code, $sub_code);

            $this->ajax_result['success'] = true;
            $this->ajax_result['data'] = $requirement_arr;
        }
        catch(Exception $e)
        {
            $this->ajax_result['errormsg'] = "System error. Request Terminated.";
            $this->load->helper('Logger');
            Logger::write($e);
        }
        echo json_encode($this->ajax_result);
    }
}