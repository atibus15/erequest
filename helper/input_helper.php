<?php 

/**
 *@Author : atibus
 *@date : 06/13/2013
 *Description : Input helper.. 
 **/ 
if(!function_exists('get_post'))
{
    function get_post($input_name='_all')
    {
        if($input_name=='_all')
        {
            return $_REQUEST;
        }
        else if(isset($_REQUEST[$input_name]))
        {
            return trim($_REQUEST[$input_name]);
        }
        else
        {
            return false;
        }
    }
}

if(!function_exists('post'))
{
    function post($input_name)
    {
        if(isset($_POST[$input_name]))
        {
            return trim($_POST[$input_name]);
        }
        else
        {
            return false;
        }
    }
}

if(!function_exists('get'))
{
    function get($input_name)
    {
        if(isset($_GET[$input_name]))
        {
            return trim($_GET[$input_name]);
        }
        else
        {
            return false;
        }
    }
}

?>