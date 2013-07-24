<?php

class EmployeeModel extends Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function fetchFullnameByBadgeNo($badge_no)
    {
        $this->db = $this->load->database('HRMSDB');

        $this->db->setTrans(IBASE_READ);

        $query = "SELECT NAME FROM EMPLOYEE WHERE BADGENO = ?";
        $this->db->prepare($query);
        $this->db->execute($badge_no);

        $fullname = $this->db->fetchArray();
        
        return $fullname;
    }
}