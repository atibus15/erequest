<?php

class RequestModel extends Model
{
    private $current_request_id;

    private $header_details_arr;

    private $request_details_arr;

    private $request_item_arr;

    private $history_details_arr;

    public function __construct()
    {
        parent::__construct();
        $this->db = $this->load->database('FINANCEDB');
        $this->db->setTrans(IBASE_DEFAULT);
    }

    public function insertHeader()
    {
        
        

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
    public function insertDetails($request_code)
    {
        $query = "";
        $current_id = $this->current_request_id;
        switch ($request_code) 
        {
            case 'ERQ_RM':
                $query =    "INSERT INTO EREQRM
                            (HEADERID, SUTYPE, MCMAKECODE, MCMODEL, MCPLATENO, MCENGINENO, MCCHASSISNO, ACQUIREDDATE, 
                            ODOMREADING, LASTPMSDATE, SERVINGSHOP, STORE2NAME, STORE3NAME, VERIFIEDBADGENO, VERIFIEDNAME, VERIFIEDPOSITION, VERIFIEDDATE, 
                            RECOMBADGENO, RECOMNAME, RECOMPOSITION, RECOMDATE, REMARKS, CREATEDDATE, CREATEDBY)
                            VALUES('{$current_id}',?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,CURRENT_TIMESTAMP,?)";
                break;

            case 'ERQ_FL':
                $query  =   "INSERT INTO EREQFL
                            (HEADERID,SUTYPE,MCMAKECODE,MCMODEL,MCPLATENO,MCENGINENO,MCCHASSISNO,ACQUIREDDATE,ODOMREADING,
                            LASTPMSDATE,SERVINGSHOP,ITEMCODE,ITEMBRAND,LASTREQDATE,PCIPRICE,STORE2NAME,STORE2PRICE,STORE3NAME,
                            STORE3PRICE,VERIFIEDBADGENO,VERIFIEDNAME,VERIFIEDPOSITION,VERIFIEDDATE,RECOMBADGENO,RECOMNAME,RECOMPOSITION,RECOMDATE,REMARKS,CREATEDDATE,CREATEDBY)
                            VALUES('{$current_id}',?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,CURRENT_TIMESTAMP,?)";
                break;
            case 'ERQ_RES':
                $query =    "INSERT INTO EREQRES
                            (HEADERID,EFFECTDATE,AGREEMENTNO,AGREEMENTNAME,REQTYPECODE,OLDTERM,OLDDUEDAY,OLDMA,
                            CNCAPPROVERBADGENO,CNCAPPROVERNAME,CNCAPPROVERPOSITION,CNCAPPROVERDATE, REMARKS, CREATEDDATE, CREATEDBY)
                            VALUES( '{$current_id}',?,?,?,?,?,?,?,?,?,?,?,?,CURRENT_TIMESTAMP, ?)";
                break;
            case 'ERQ_PRE': 
                $query  =   "INSERT INTO EREQPRE
                            (HEADERID,EFFECTDATE,AGREEMENTNO,AGREEMENTNAME,REMARKS,CREATEDDATE,CREATEDBY)
                            VALUES('{$current_id}',?,?,?,?,CURRENT_TIMESTAMP,?)";
                break;
            case 'ERQ_DOC':
                $query  =   "INSERT INTO EREQDOC
                            (HEADERID,AGREEMENTNO,AGREEMENTNAME,MSIDATE,MCENGINENO,DOCTYPECODE,PURPOSECODE,REMARKS,CREATEDDATE,CREATEDBY)
                            VALUES('{$current_id}',?,?,?,?,?,?,?,CURRENT_TIMESTAMP,?)"; 
                break;
        }
        
        $this->db->prepare($query);

        $this->db->execute($this->request_details_arr);
    }


    public function insertItem($request_code)
    {
        $current_id = $this->current_request_id;
        switch ($request_code) 
        {
            case 'ERQ_RM':
                $query  =   "INSERT INTO EREQRMDTL
                            (HEADERID,ITEMNO,ITEMCODE,ITEMQTY,ITEMBRAND,LASTREQDATE,PCIPRICE,STORE2PRICE,STORE3PRICE,CREATEDDATE,CREATEDBY)
                            VALUES('{current_id}',?,?,?,?,?,?,?,?,CURRENT_TIMESTAMP,?)";
                break;
            
            case 'ERQ_FRM':
                $query  =   "INSERT INTO EREQFRMDTL
                            (HEADERID,ITEMNO,ITEMCODE,CURRPADFROM,CURRPADTO,CURRPADLAST,CURRPADLASTDATE,UNUSEDPADFROM,UNUSEDPADTO,UNUSEDPADNUMBOOK,
                            PERSBADGENO,PERSNAME,PERSPOSITION,PERSREMARKS,CREATEDDATE,CREATEDBY)
                            VALUES('{$current_id}',?,?,?,?,?,?,?,?,?,?,?,?,?,CURRENT_TIMESTAMP,?)";
                break;
        }
        
        $this->db->prepare($query);

        $this->db->execute($this->request_item_arr);
    }

    public function insertRequirements($requirement_dtl=array())
    {
        
        $query  =   "INSERT INTO EREQREQUIRE
                            (HEADERID, STREQUIREID, FILENAME, CREATEDDATE, CREATEDBY)
                    VALUES({$this->current_request_id},?,?,CURRENT_TIMESTAMP,?)";

        $this->db->prepare($query);

        $this->db->execute($requirement_dtl);
    }

    // use in FL AND RM only
    public function fetchLastRequestDate($request_detail)
    {
        $this->db->setTrans(IBASE_READ);
        $query  =   "SELECT FIRST 1 H.FILEDATE FROM EREQUEST H ";
        $query  .=  ($request_detail[0]=='ERQ_FL') ? "INNER JOIN (SELECT HEADERID, ITEMCODE FROM EREQFL)D ON D.HEADERID = H.EREQUESTID " : " ";
        $query  .=  ($request_detail[0]=='ERQ_RM') ? "INNER JOIN (SELECT HEADERID, ITEMCODE FROM EREQRMDTL)D ON D.HEADERID = H.EREQUESTID " : " ";
        $query  .=  "WHERE H.REQUESTCODE = ? AND D.ITEMCODE=? ORDER BY EREQUESTID DESC";

        $this->db->prepare($query);

        $this->db->execute($request_detail);

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


    public function setRequestItem($new_request_item_arr)
    {
        $this->request_item_arr = $new_request_item_arr; 
        return $this;
    }

    public function getRequestItem()
    {
        return $this->request_items_arr;
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