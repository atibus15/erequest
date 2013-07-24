<?php

class RequestModel extends Model
{
    private $current_request_id;

    private $header_details_arr;

    private $request_details_arr;

    private $history_details_arr;

    public function __construct()
    {
        parent::__construct();
        $this->db = $this->load->database('FINANCEDB');
    }

    public function insertHeader()
    {
        
        $this->db->setTrans(IBASE_DEFAULT);

        $query  =   "INSERT INTO EREQUEST
                            (BADGENO,REQUESTCODE,FILEDATE,LASTNAME,FIRSTNAME,MIDDLENAME,NAMESUFFIX,HIREDATE,
                            BUCODE,BUDESC,SAPBUCODE,BRANCHCODE,BRANCHDESC,DEPARTMENTCODE,DEPARTMENTDESC,
                            POSITIONCODE,POSITIONDESC,TRLEVEL,CREATEDDATE,CREATEDBY)
                    VALUES(?,?,?,?,?,?,?,?,
                            ?,?,?,?,?,?,?,
                            ?,?,?,CURRENT_TIMESTAMP,?)";
        
        $this->db->prepare($query);

        $this->db->execute($this->header_details_arr);

        $this->current_request_id = $this->db->gen_id('EREQUEST_GEN',0);
    }

    public function insertHistory()
    {
        $query  = "INSERT INTO EREQHIST(HEADERID, TRLEVEL, LASTACTION, REMARKS, CREATEDDATE, CREATEDBY) ";
        $query .= "VALUES(?,?,?,?,CURRENT_TIMESTAMP,?)";

        $this->db->prepare($query);

        $this->db->execute($this->history_details_arr);
    }


    // Execute insertHeader first before executing this; 
    public function insertFuelLubricantDetails()
    {
        $query  =   "INSERT INTO EREQFL
                            (HEADERID,SUTYPE,MCMAKECODE,MCMODEL,MCPLATENO,MCENGINENO,MCCHASSISNO,ACQUIREDDATE,ODOMREADING,
                            LASTPMSDATE,SERVINGSHOP,ITEMCODE,ITEMBRAND,LASTREQDATE,PRICEPCI,STORE1NAME,STORE1PRICE,STORE2NAME,
                            STORE2PRICE,VERIFIEDBADGENO,VERIFIEDNAME,VERIFIEDDATE,RECOMBADGENO,RECOMNAME,REMARKS,CREATEDDATE,CREATEDBY)
                    VALUES('{$this->current_request_id}',?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,CURRENT_TIMESTAMP,?)";

        $this->db->prepare($query);

        $this->db->execute($this->request_details_arr);
    }


    public function fetchLastRequestDate($request_code)
    {
        $this->db->setTrans(IBASE_READ);
        $query  =   "SELECT FIRST 1 FILEDATE FROM EREQUEST WHERE REQUESTCODE = ? ORDER BY EREQUESTID DESC";

        $this->db->prepare($query);

        $this->db->execute($request_code);

        $request_arr = $this->db->fetchArray();

        if($request_arr)
        {
            return $request_arr[0]['FILEDATE'];
        }
        else
        {
            return date('m/d/Y',time());
        }
    }


    public function commitRequest()
    {
        $this->db->commitTrans();
    }

    public function rollbackRequest()
    {
        $this->db->rollbackTrans();
    }

    public function setHeaderDetails($new_header_details_arr)
    {
        $this->header_details_arr = $new_header_details_arr;
        return $this;
    }

    public function getHeaderDetails()
    {
        return $this->header_details_arr;
    }

    public function setRequestDetails($new_request_details_arr)
    {
        $this->request_details_arr = $new_request_details_arr;
        return $this;
    }

    public function getRequestDetails()
    {  
        return $this->request_details_arr;
    }

    public function setHistoryDetails($new_history_details_arr)
    {
        $this->history_details_arr = $new_history_details_arr;
        return $this;
    }

    public function getHistoryDetails()
    {  
        return $this->history_details_arr;
    }

    public function setCurrentRequestID($request_id)
    {
        $this->current_request_id = $request_id;
        return $this;
    }

    public function getCurrentRequestID()
    {
        return $this->current_request_id;
    }
}