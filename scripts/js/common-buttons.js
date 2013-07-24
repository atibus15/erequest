var submit_btn = 
{
    text:'Submit',
    id : 'submit-btn',
    iconCls:'submit-icon'
};

var clear_btn =
{
    text:'Clear',
    id:'clear_btn',
    iconCls:'erase2-icon',
    handler:function()
    {
        this.findParentByType('form').getForm().reset();
    }
};

var cancel_btn =
{
    text:'Cancel',
    id:'cancel_btn',
    iconCls:'close-icon',
    handler:function()
    {
        window.location = '?page=request&action=maintenance';
    }
};

var approve_btn =
{
    text: 'Approved',
    id :'approve-btn',
    name:'approve',
    iconCls:'approve-icon'
};

var disapprove_btn =
{
    text: 'Disapproved',
    name:'disapprove',
    id :'disapprove_btn',
    iconCls:'disapprove-icon'
};
var back_btn =
{
    text:'Back to List',
    id:'back-btn',
    name:'back',
    iconCls:'back-icon'  
};