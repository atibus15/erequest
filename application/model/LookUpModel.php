<?php 

class LookUpModel extends Model
{
    public function __construct()
    {
        parent::__construct();
        $this->db = $this->load->database('FINANCEDB');
        $this->db->setTrans(IBASE_READ);
    }

    public function fetchGenDtlBySubCode($app_code,$sub_code)
    {

        $query  = "SELECT DTLCODE, DESCRIPTION FROM LKGENDTL WHERE APPCODE=? AND SUBAPPCODE=? AND ISACTIVE=1 ";
        $query .= "ORDER BY SEQNO ASC";

        $this->db->prepare($query);
        $this->db->execute(array($app_code,$sub_code));

        $gen_dtl_arr = $this->db->fetchArray();
        return $gen_dtl_arr;
    }

    public function fetchRequirements($app_code,$sub_code)
    {
        $query  =   "SELECT STREQUIREID, DESCRIPTION, ISREQUIRED FROM STREQUIRE ";
        $query  .=  "WHERE APPCODE = ? AND SUBAPPCODE = ? AND ISACTIVE = 1 ";
        $query  .=  "ORDER BY SEQNO";

        $this->db->prepare($query);
        $this->db->execute(array($app_code,$sub_code));

        $requirements_arr = $this->db->fetchArray();
        return $requirements_arr;
    }

    public function fetchRequestTypes()
    {
        $query  =   "SELECT MASTERCODE,DESCRIPTION FROM LKGENMASTER ORDER BY SEQNO ASC";
        $this->db->prepare($query);
        $this->db->execute();

        $request_types_arr = $this->db->fetchArray();
        return $request_types_arr;
    }

}