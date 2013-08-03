<?php

class Processing extends ActionController
{
    private $ajax_result;

    public function __construct()
    {
        parent::__construct();
        $this->ajax_result['success'] = false;
        $this->processmodel = $this->load->model('ProcessModel');
    }

    public function execGetRequestByType()
    {
        $request_code   = get_post('request_code');
        $date_start     = get_post('date_start');
        $date_end       = get_post('date_end');

        try
        {
            $request_list_arr = $this->processmodel->fetchRequestByType();

            $request_list_len = count($request_list_arr);

            for($i=0; $i<$request_list_len ; $i++)
            {
                $request        = $request_list_arr[$i];
                $request_code   = trim($request['REQUESTCODE']);
                $tr_level       = trim($request['TRLEVEL']);

                $level_incharge_arr = $this->getRequestIncharges($request_code, $tr_level);
                $request_list_arr[$i]['LEVELINCHARGES'] = implode(', ',$level_incharge_arr);
            }

            $this->ajax_result['data'] = $request_list_arr;
            $this->ajax_result['success'] = true;
        }
        catch(Exception $e)
        {
            $this->ajax_result['errormsg'] = "System error. Request Terminated.";
            $this->load->helper('Logger');
            Logger::write($e);
        }

        echo $this->buildJson($this->ajax_result);
    }

    private function getRequestIncharges($request_code, $tr_level)
    {
        return $this->processmodel->fetchRequestIncharges($request_code, $tr_level);
    }
}