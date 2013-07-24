<?php
 // error_reporting(0);
class FuelLubricant extends ActionController
{
    private $requestmodel;

    private $ajax_result;

    private $required_data_arr;


    public function __construct()
    {
        parent::__construct();
        $this->ajax_result['success'] = false;

        $this->requestmodel = $this->load->model('RequestModel');
    }

    public function sendRequest()
    {
        try
        {   
            $header_details = $this->collectHeaderDetails('ERQ_FL');

            $this->requestmodel->setHeaderDetails($header_details);

            $this->requestmodel->insertHeader();

            $request_details = $this->collectRequestDetails();

            $this->requestmodel->setRequestDetails($request_details);

            $this->requestmodel->insertFuelLubricantDetails();

            $this->requestmodel->setHistoryDetails(
                                    array(
                                        $this->requestmodel->getCurrentRequestID(),
                                        1,
                                        '',
                                        get_post('remarks'),
                                        userSession('userid')
                                        )
                                    );

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

    private function collectHeaderDetails($new_request_code)
    {        
        $request_code       = $new_request_code;
        $request_name_suffix= userSession('namesuffix') ? userSession('namesuffix') : NULL;
        $trans_level        = 1;

        $header_details_arr = array(
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

        return $header_details_arr;
    }

    private function collectRequestDetails()
    {
        $request_details_arr = array(
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
                post('pci_item_price'),
                post('store1_name'),
                post('store1_item_price'),
                post('store2_name'),
                post('store2_item_price'),
                post('verifier_badgeno'),
                post('verifier_name'),
                post('verified_date'),
                post('recommend_badgeno'),
                post('recommend_name'),
                post('remarks'),
                userSession('userid')
            );

        return $request_details_arr;
    }
}