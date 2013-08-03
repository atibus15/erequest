<?php

/** Author  : atibus
  * Date    : 07/30/2013
  * Desc    : Request Processing;
  * System  : e-Request
  **/ 


class ProcessModel extends Model
{
    public function __construct()
    {
        parent::__construct();

        $this->db = $this->load->database('FINANCEDB');

        $this->db->setTrans(IBASE_READ);
    }


    public function getLevelFunctions($request_code, $level_role, $level_no, $role_no)
    {
        $query  = "SELECT FUNCTIONID, FUNCTIONDESC, FUNCTIONNAME FROM STROUTE ";
        $query .= "WHERE MASTERCODE=? AND LEVELROLE=? AND ISACTIVE=1 AND (LEVELNO=? OR ROLENO=?)";

        $this->db->prepare($query);

        $this->db->execute(array($request_code, $level_rol, $level_no, $role_no));

        $level_functions = $this->db->fetchArray();

        return $level_functions;
    }


    public function fetchRequestByType()
    {
        $query  =   "SELECT DISTINCT r.EREQUESTID,r.REQUESTCODE, r.BADGENO, r.FIRSTNAME, r.FILEDATE, r.TRLEVEL,h.LASTACTION, h.CREATEDDATE FROM EREQUEST r 
                    JOIN EREQHIST h on h.HEADERID = r.EREQUESTID and h.TRLEVEL = r.TRLEVEL ORDER BY r.FILEDATE DESC, r.EREQUESTID DESC";

        $this->db->prepare($query);

        $this->db->execute();

        $request_list = $this->db->fetchArray();

        return $request_list;
    }

    public function fetchRequestIncharges($request_code, $tr_level)
    {
        $incharge_arr = array();

        $query  =   "SELECT DISTINCT u.USERID from STROUTE r , USERROLE u WHERE u.ROLECODE = r.LEVELROLE and r.MASTERCODE=? and r.LEVELNO=? and u.ISACTIVE=1";
        $this->db->prepare($query);
        $this->db->execute(array($request_code, $tr_level));
        $incharge = $this->db->fetchArray();

        foreach($incharge as $val)
        {
            $incharge_arr[] = $val['USERID'];
        }
        return $incharge_arr;
    }
}