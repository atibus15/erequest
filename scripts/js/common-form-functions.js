Ext.require(['Ext.data.*']);


var userid      = Ext.get('userid').getValue(),
badgeno         = Ext.get('badgeno').getValue(),
lastname        = Ext.get('lastname').getValue(),
firstname       = Ext.get('firstname').getValue(),
middlename      = Ext.get('middlename').getValue(),
fullname        = Ext.get('name').getValue(),
locationcode    = Ext.get('locationcode').getValue(),
emailaddress    = Ext.get('emailaddress').getValue(),
bucode          = Ext.get('bucode').getValue(),
sapbucode       = Ext.get('sapbucode').getValue(),
budesc          = Ext.get('budesc').getValue(),
deptcode        = Ext.get('deptcode').getValue(),
groupcode       = Ext.get('groupcode').getValue(),
positioncode    = Ext.get('positioncode').getValue(),
hiredate        = Ext.get('hiredate').getValue(),
branchcode      = Ext.get('branchcode').getValue(),
birthdate       = Ext.get('birthdate').getValue(),
department_code = Ext.get('departmentcode').getValue(),
emp_status_code = Ext.get('empstatuscode').getValue(),
position_desc   = Ext.get('positiondesc').getValue(),
branch          = Ext.get('branchdesc').getValue(),
department_desc = Ext.get('departmentdesc').getValue();

_today = Ext.Date.format(new Date(),'m/d/Y');


Ext.define('Dropdown',
{
    extend:'Ext.data.Model',
    fields:[{name:'code'},{name:'desc'}]
});



function dropDownStore(appcode, subappcode)
{
    return Ext.create('Ext.data.ArrayStore',
    {
        model:'Dropdown',
        proxy :
        {
            type:'ajax',
            url:'?_page=lookUp&_action=execGetGenDtl&appcode='+appcode+'&subappcode='+subappcode,
            reader:{root:'data'}
        },
        autoLoad:false
    });
}

function getEmpFullname(badge_no)
{
    var wait_box = Ext.Msg.wait('Getting name...','e-Request');

    Ext.Ajax.on('requestcomplete',function(){wait_box.hide();});
    Ext.Ajax.on('requestexception',function(){wait_box.hide();});

    var request = $.ajax({
        url:'?_page=employee&_action=getFullname',
        method:'post',
        async:false,
        data:{
            badgeno:badge_no
        }
    });

    var response = $.parseJSON(request.responseText);

    if(!response.success)
    {
        messageBox(response.errormsg);
        return false;
    }
    
    return response.fullname;
}

function getLastRequestDate(request_code)
{
    var wait_box = Ext.Msg.wait('Getting last request date...','e-Request');

    Ext.Ajax.on('requestcomplete',function(){wait_box.hide();});
    Ext.Ajax.on('requestexception',function(){wait_box.hide();});

    var request = $.ajax({
        url:'?_page=lookUp&_action=getLastRequestDate',
        method:'post',
        async:false,
        data:{
            requestcode : request_code
        }
    });

    var response = $.parseJSON(request.responseText);
    if(!response.success)
    {
        messageBox(response.errormsg);
        return false;
    }

    return response.last_request_date;
}


function fillFormValue()
{

    setCmpValue('requestor_branch_code', branchcode);
    setCmpValue('requestor_badge_no', badgeno);
    setCmpValue('requestor_name', fullname);
    setCmpValue('requestor_branch', branch);
    setCmpValue('requestor_position', position_desc);

}

