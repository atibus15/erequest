<?php

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

        $this->db->execute($request_code, $level_rol, $level_no, $role_no);

        $level_functions = $this->db->fetchArray();

        return $level_functions;
    }
}