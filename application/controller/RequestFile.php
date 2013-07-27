<?php
 // error_reporting(0);
class RequestFile extends ActionController
{
    private $requestmodel;

    private $ajax_result;

    private $required_data_arr;


    public function __construct()
    {
        parent::__construct();
        $this->ajax_result['success'] = false;
        $this->load->helper('sanitizer');
        $this->requestmodel = $this->load->model('RequestModel');
    }

    public function fuelLubricant()
    {
        try
        {   
            $header_details     = $this->collectHeaderDetails('ERQ_FL');
            $request_details    = $this->collectFuelLubeDtls();

            $this->requestmodel->setHeaderDetails($header_details);
            $this->requestmodel->setRequestDetails($request_details);

            $this->requestmodel->insertHeader();
            $this->requestmodel->insertDetails('ERQ_FL');

            $current_request_id = $this->requestmodel->getCurrentRequestID();

            $this->requestmodel->setHistoryDetails( array( $current_request_id,1,'',get_post('remarks'),userSession('userid') ) );

            $this->requestmodel->insertHistory();

            $this->requestmodel->commitRequest();

            $this->ajax_result['success'] = true;

            $this->ajax_result['message'] = 'Request succeeded.';
        }
        catch(Exception $e)
        {
            $this->requestmodel->rollbackRequest();
            $this->ajax_result['errormsg'] = $e->getMessage();
        }

        echo json_encode($this->ajax_result);
    }

    public function repairMaintenance()
    {
        try
        {   
            $header_details = $this->collectHeaderDetails('ERQ_RM');
            $r_m_details    = $this->collectRMDtls();
            $r_m_items      = $this->collectRMItems();
            
            $this->requestmodel->setHeaderDetails( $header_details );
            $this->requestmodel->setRequestDetails( $r_m_details );

            $this->requestmodel->insertHeader();
            $this->requestmodel->insertDetails('ERQ_RM');

            foreach($r_m_items as $item)
            {
                $this->requestmodel->setRequestItem($item);
                $this->requestmodel->insertItem();
            }

            $current_request_id = $this->requestmodel->getCurrentRequestID();

            $this->requestmodel->setHistoryDetails( array( $current_request_id,1,'',get_post('remarks'),userSession('userid') ) );

            $this->requestmodel->insertHistory();

            $this->uploadRequirements('ERQ_RM', $current_request_id);

            $this->requestmodel->commitRequest();

            $this->ajax_result['success'] = true;

            $this->ajax_result['message'] = 'Request succeeded.';

        }
        catch(Exception $e)
        {
            $this->requestmodel->rollbackRequest();
            $this->ajax_result['errormsg'] = $e->getMessage();
        }

        echo json_encode($this->ajax_result);
    }

    public function reschedule()
    {
        try
        {   

            $header_details = $this->collectHeaderDetails('ERQ_RES');
            $res_details    = $this->collectRESDtls();
            
            $this->requestmodel->setHeaderDetails( $header_details );
            $this->requestmodel->setRequestDetails( $res_details );

            $this->requestmodel->insertHeader();
            $this->requestmodel->insertDetails('ERQ_RES');

            $current_request_id = $this->requestmodel->getCurrentRequestID();

            $this->requestmodel->setHistoryDetails( array( $current_request_id,1,'',get_post('remarks'),userSession('userid') ) );

            $this->requestmodel->insertHistory();

            $this->uploadRequirements('ERQ_RES', $current_request_id);

            $this->requestmodel->commitRequest();

            $this->ajax_result['success'] = true;

            $this->ajax_result['message'] = 'Request succeeded.';

        }
        catch(Exception $e)
        {
            $this->requestmodel->rollbackRequest();
            $this->ajax_result['errormsg'] = $e->getMessage();
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
                throw new Exception($req->DESCRIPTION." is required.", 1);
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

        return $header_details_arr = array(
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
        $request_details = array();

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
            $request_details[] = array(
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

        return $request_details;
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
}