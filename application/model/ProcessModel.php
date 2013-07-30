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
        $query  =   "SELECT r.EREQUESTID,r.REQUESTCODE, r.BADGENO, r.FIRSTNAME, r.FILEDATE, r.TRLEVEL,h.LASTACTION, h.CREATEDDATE FROM EREQUEST r 
                    JOIN EREQHIST h on h.HEADERID = r.EREQUESTID and h.TRLEVEL = r.TRLEVEL ORDER BY r.FILEDATE DESC, r.EREQUESTID DESC";

        $this->db->prepare($query);

        $this->db->execute();

        $request_list = $this->db->fetchArray();

        return $request_list;
    }
    
}