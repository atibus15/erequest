<?php
// @Author  : atibus
// @Date    : 07/22/2013
// @Desc    : RequestFile Controller
// @System  : e-Request
// @Dir     : /application/controller/RequestFile.php

class RequestFile extends ActionController
{
    private $requestmodel;

    private $ajax_result;

    private $required_data_arr;

    private $success_msg;

    private $header_details = array();

    private $request_details = array();

    private $request_items = array();

    public function __construct()
    {
        parent::__construct();
        $this->ajax_result['success'] = false;

        if(!userSession('erequest'))
        {
            $this->ajax_result['errormsg'] = 'Session expired, please relogin';
            exit(json_encode($this->ajax_result));
        }

        $this->success_msg = "Request succeeded.";

        $this->load->helper('sanitizer');
        $this->requestmodel = $this->load->model('RequestModel');
    }

    private function validateData()
    {
        $generic_error_msg = 'Please fill up all fields.';

        if($this->header_details)
        {
            foreach($this->header_details as $key => $value)
            {
                if(!$value and $key != 6)
                {
                    $this->ajax_result['errormsg'] = $generic_error_msg;
                    exit(json_encode($this->ajax_result));
                } 
            }
        }

        if($this->request_details)
        {
            foreach($this->request_details as $key => $value)
            {
                if(!$value and $key != 'remarks')
                {
                    $this->ajax_result['errormsg'] = $generic_error_msg;
                    exit(json_encode($this->ajax_result));
                } 
            }
        }

        if($this->request_items)
        {
            foreach($this->request_items as $item)
            {
                $item_len = count($item);
                for($i=0; $i<$item_len; $i++)
                {
                    if(!$item[$i])
                    {
                        $this->ajax_result['errormsg'] = $generic_error_msg;
                        exit(json_encode($this->ajax_result));
                    }
                }
            }
        }

        return;
    }

    public function execFuelLubricant()
    {
        try
        {   
            $this->header_details     = $this->collectHeaderDetails('ERQ_FL');
            $this->request_details    = $this->collectFuelLubeDtls();

            $this->validateData();

            $this->requestmodel->setHeaderDetails($this->header_details);
            $this->requestmodel->setRequestDetails($this->request_details);

            $this->requestmodel->insertHeader();
            $this->requestmodel->insertDetails('ERQ_FL');

            $current_request_id = $this->requestmodel->getCurrentRequestID();

            $this->requestmodel->setHistoryDetails( array( $current_request_id,1,'',get_post('remarks'),userSession('userid') ) );

            $this->requestmodel->insertHistory();

            $this->requestmodel->commitRequest();

            $this->ajax_result['success'] = true;
            $this->ajax_result['message'] = $this->success_msg;
        }
        catch(Exception $e)
        {
            $this->requestmodel->rollbackRequest();

            $this->ajax_result['errormsg'] = "System error. Request Terminated.";
            $this->load->helper('Logger');
            Logger::write($e);
        }

        echo json_encode($this->ajax_result);
    }

    public function execRepairMaintenance()
    {
        try
        {   
            $this->header_details     = $this->collectHeaderDetails('ERQ_RM');
            $this->request_details    = $this->collectRMDtls();
            $this->request_items      = $this->collectRMItems();
            
            $this->validateData();

            $this->requestmodel->setHeaderDetails( $this->header_details );
            $this->requestmodel->setRequestDetails( $this->request_details );

            $this->requestmodel->insertHeader();
            $this->requestmodel->insertDetails('ERQ_RM');

            foreach($this->request_items as $item)
            {
                $this->requestmodel->setRequestItem($item);
                $this->requestmodel->insertItem("ERQ_RM");
            }

            $current_request_id = $this->requestmodel->getCurrentRequestID();

            $this->requestmodel->setHistoryDetails( array( $current_request_id,1,'',get_post('remarks'),userSession('userid') ) );
            $this->requestmodel->insertHistory();

            $this->uploadRequirements('ERQ_RM', $current_request_id);

            $this->requestmodel->commitRequest();

            $this->ajax_result['success'] = true;
            $this->ajax_result['message'] = $this->success_msg;

        }
        catch(Exception $e)
        {
            $this->requestmodel->rollbackRequest();
            $this->ajax_result['errormsg'] = "System error. Request Terminated.";
            $this->load->helper('Logger');
            Logger::write($e);
        }

        echo json_encode($this->ajax_result);
    }

    public function execReschedule()
    {
        try
        {   

            $this->header_details     = $this->collectHeaderDetails('ERQ_RES');
            $this->request_details    = $this->collectRESDtls();
            
            $this->validateData();
            
            $this->requestmodel->setHeaderDetails( $this->header_details );
            $this->requestmodel->setRequestDetails( $this->request_details );

            $this->requestmodel->insertHeader();
            $this->requestmodel->insertDetails('ERQ_RES');

            $current_request_id = $this->requestmodel->getCurrentRequestID();

            $this->requestmodel->setHistoryDetails( array( $current_request_id,1,'',get_post('remarks'),userSession('userid') ) );
            $this->requestmodel->insertHistory();

            $this->uploadRequirements('ERQ_RES', $current_request_id);

            $this->requestmodel->commitRequest();

            $this->ajax_result['success'] = true;
            $this->ajax_result['message'] = $this->success_msg;

        }
        catch(Exception $e)
        {
            $this->requestmodel->rollbackRequest();
            $this->ajax_result['errormsg'] = "System error. Request Terminated.";
            $this->load->helper('Logger');
            Logger::write($e);
        }

        echo json_encode($this->ajax_result);       
    }

    public function execPreTermination()
    {
        try
        {   

            $this->header_details     = $this->collectHeaderDetails('ERQ_PRE');
            $this->request_details    = $this->collectPreTermDtls();
            
            $this->validateData();

            $this->requestmodel->setHeaderDetails( $this->header_details );
            $this->requestmodel->setRequestDetails( $this->request_details );

            $this->requestmodel->insertHeader();
            $this->requestmodel->insertDetails('ERQ_PRE');

            $current_request_id = $this->requestmodel->getCurrentRequestID();

            $this->requestmodel->setHistoryDetails( array( $current_request_id,1,'',get_post('remarks'),userSession('userid') ) );
            $this->requestmodel->insertHistory();

            $this->requestmodel->commitRequest();

            $this->ajax_result['success'] = true;
            $this->ajax_result['message'] = $this->success_msg;

        }
        catch(Exception $e)
        {
            $this->requestmodel->rollbackRequest();
            $this->ajax_result['errormsg'] = "System error. Request Terminated.";
            $this->load->helper('Logger');
            Logger::write($e);
        }

        echo json_encode($this->ajax_result);   
    }

    public function execDocument()
    {
        try
        {   

            $this->header_details     = $this->collectHeaderDetails('ERQ_DOC');
            $this->request_details    = $this->collectDocumentDtls();
            
            $this->validateData();

            $this->requestmodel->setHeaderDetails( $this->header_details );
            $this->requestmodel->setRequestDetails( $this->request_details );

            $this->requestmodel->insertHeader();
            $this->requestmodel->insertDetails('ERQ_DOC');

            $current_request_id = $this->requestmodel->getCurrentRequestID();

            $this->requestmodel->setHistoryDetails( array( $current_request_id,1,'',get_post('remarks'),userSession('userid') ) );
            $this->requestmodel->insertHistory();

            $this->requestmodel->commitRequest();

            $this->ajax_result['success'] = true;
            $this->ajax_result['message'] = $this->success_msg;

        }
        catch(Exception $e)
        {
            $this->requestmodel->rollbackRequest();
            $this->ajax_result['errormsg'] = "System error. Request Terminated.";
            $this->load->helper('Logger');
            Logger::write($e);
        }

        echo json_encode($this->ajax_result); 
    }


    public function execAccountableForms()
    {
        try
        {   
            $this->header_details     = $this->collectHeaderDetails('ERQ_FRM');
            $this->request_items      = $this->collectAccountableFormItems();
            $this->request_details    = array( post('remarks'), userSession('userid') );

            $this->validateData();
            
            $this->requestmodel->setHeaderDetails( $this->header_details );
            $this->requestmodel->setRequestDetails( $this->request_details );

            $this->requestmodel->insertHeader();

            $this->requestmodel->insertDetails('ERQ_FRM');

            foreach($this->request_items as $item)
            {
                $this->requestmodel->setRequestItem($item);
                $this->requestmodel->insertItem("ERQ_FRM");
            }

            $current_request_id = $this->requestmodel->getCurrentRequestID();

            $this->requestmodel->setHistoryDetails( array( $current_request_id,1,'',get_post('remarks'),userSession('userid') ) );
            $this->requestmodel->insertHistory();

            $this->requestmodel->commitRequest();

            $this->ajax_result['success'] = true;
            $this->ajax_result['message'] = $this->success_msg;

        }
        catch(Exception $e)
        {
            $this->requestmodel->rollbackRequest();
            $this->ajax_result['errormsg'] = "System error. Request Terminated.";
            $this->load->helper('Logger');
            Logger::write($e);
        }

        echo json_encode($this->ajax_result);
    }


    //validate file and check for require files;
    private function uploadRequirements($app_code, $new_dir)
    {
        $files = array();

        $sub_app_code = str_replace('ERQ_','',$app_code);

        $this->lookupmodel = $this->load->model('LookUpModel'); 

        $requirements_arr = $this->lookupmodel->fetchRequirements('EREQUEST',$sub_app_code);

        foreach($requirements_arr as $req)
        {
            if($req['ISREQUIRED'] and !http_file($req['STREQUIREID']))
            {
                // rollback db transaction and exit process;
                $this->requestmodel->rollbackRequest();
                $this->ajax_result['errormsg'] = $req->DESCRIPTION." is required.";
                exit($this->ajax_result);
            }

            $files[] = array('id'=>$req['STREQUIREID'],'description'=>$req['DESCRIPTION']);
        }
        
        $this->load->library('Uploader');

        $uploader = new Uploader();

        $uploader->setFiles( $files );
        $uploader->setAppCode( $app_code );
        $uploader->setNewDirectory( $new_dir );
        $uploader->saveAttachement();

        $uploaded_files = $uploader->getFiles();

        foreach($uploaded_files as $file)
        {
            $file_detail = array(
                    $file['id'], 
                    $file['newfilename'],
                    userSession('userid')
                );
            
            $this->requestmodel->insertRequirements($file_detail);
        }

        return true;
    }

    private function collectHeaderDetails($new_request_code)
    {        
        $request_code       = $new_request_code;
        $request_name_suffix= userSession('namesuffix') ? userSession('namesuffix') : NULL;
        $trans_level        = 1;

        return $this->header_details_arr = array(
            userSession('badgeno'), 
            $request_code, 
            post('request_date'),
            userSession('lastname'),
            userSession('firstname'),
            userSession('middlename'),
            userSession('namesuffix'),
            userSession('hiredate'),
            userSession('bucode'),
            userSession('budesc'),
            userSession('sapbucode'),
            post('requestor_branch_code'),     // get the form value: the requestor might transfered to other branch: 
            post('requestor_branch'),     // get the form value: the requestor might transfered to other branch: 
            userSession('departmentcode'),
            userSession('departmentdesc'),
            userSession('positioncode'),
            userSession('positiondesc'),
            $trans_level,
            userSession('userid')
        );
    }


    private function collectFuelLubeDtls()
    {
        return array(
            post('service_type'),
            post('make'),
            post('model'),
            post('plate_no'),
            post('engine_no'),
            post('chassis_no'),
            post('date_acquired'),
            post('odometer_reading'),
            post('last_pms_date'),
            post('serving_shop'),
            post('item_code'),
            post('item_brand'),
            post('last_request_date'),

            sanitize_money( post('pci_item_price') ),

            post('store2_name'),
            sanitize_money( post('store2_item_price') ),

            post('store3_name'),
            sanitize_money( post('store3_item_price') ),

            post('verifier_badgeno'),
            post('verifier_name'),
            post('verifier_position'),
            post('verified_date'),
            post('recommend_badgeno'),
            post('recommend_name'),
            post('recommend_position'),
            post('recommended_date'),
            post('remarks'),
            userSession('userid')
        );
    }


    private function collectRMItems()
    {
        $this->request_items = array();

        $item_number        = post('item_number');
        $item_quantity      = post('item_quantity');
        $item_code          = post('item_code');
        $item_brand         = post('item_brand');
        $last_request_date  = post('last_request_date');
        $pci_item_price     = post('pci_item_price');
        $store2_item_price  = post('store2_item_price');
        $store3_item_price  = post('store3_item_price');
        $items_len           = count($item_number);

        for($i = 1; $i<=$items_len; $i++)
        {
            $this->request_items[] = array(
                $item_number[$i],
                $item_code[$i],
                $item_quantity[$i],
                $item_brand[$i],
                $last_request_date[$i],

                sanitize_money( $pci_item_price[$i] ),

                sanitize_money( $store2_item_price[$i] ),

                sanitize_money( $store3_item_price[$i] ),

                userSession('userid')
            );  
        }

        return $this->request_items;
    }

    private function collectAccountableFormItems()
    {
        $this->request_items = array();

        $item_codes = post('type');
        $cps_from   = post('cps_from');
        $cps_to     = post('cps_to');
        $last_series= post('last_series_used');
        $last_series_date= post('last_date_series_used');
        $usp_from   = post('usp_from');
        $usp_to     = post('usp_to');
        $no_booklet = post('no_booklet');
        $ap_badge_no= post('ap_badge_no');
        $ap_name    = post('ap_name');
        $ap_position= post('ap_position');
        $ap_remarks = post('ap_remarks');  
        $userid     = userSession('userid');

        $items_len  = count($item_codes);

        for($i=1; $i<=$items_len; $i++)
        {
            $this->request_items[] = array(
                $i,
                $item_codes[$i],
                $cps_from[$i], 
                $cps_to[$i], 
                $last_series[$i],
                $last_series_date[$i], 
                $usp_from[$i],
                $usp_to[$i],
                $no_booklet[$i], 
                $ap_badge_no[$i],
                $ap_name[$i],
                $ap_position[$i],
                $ap_remarks[$i],
                $userid
            );
        }

        return $this->request_items;
    }

    private function collectRMDtls()
    {
        return array(
            post('service_type'),
            post('make'),
            post('model'),
            post('plate_no'),
            post('engine_no'),
            post('chassis_no'),
            post('date_acquired'),
            post('odometer_reading'),
            post('last_pms_date'),
            post('serving_shop'),
            post('store2_name'),
            post('store3_name'),
            post('verifier_badgeno'),
            post('verifier_name'),
            post('verifier_position'),
            post('verified_date'),
            post('recommend_badgeno'),
            post('recommend_name'),
            post('recommend_position'),
            post('recommended_date'),
            post('remarks'),
            userSession('userid')
        );
    }

    private function collectRESDtls()
    {
        return array(
            post('effective_date'),
            post('agreement_no'),
            post('agreement_name'),
            post('request_type'),
            post('term'),
            post('due_day'),
            sanitize_money( post('monthly_amor') ),
            post('approver_badgeno'),
            post('approver_name'),
            post('approver_position'),
            post('approved_date'),
            post('remarks'),
            userSession('userid')
        );
    }

    private function collectPreTermDtls()
    {
        return array(
            post('effective_date'),
            post('agreement_no'),
            post('agreement_name'),
            post('remarks'),
            userSession('userid')
        );
    }

    private function collectDocumentDtls()
    {
        return array(
            post('agreement_no'),
            post('agreement_name'),
            post('msi_date'),
            post('engine_no'),
            post('document_type'),
            post('purpose'),
            post('remarks'),
            userSession('userid')
        );
    }
}