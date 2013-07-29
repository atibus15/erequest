request_header = 
{
    title: 'Request Details',
    items:
    [
        {
            items:
            [
                {xtype:'displayfield',width:300, fieldLabel:'Branch Code', name:'branchcode', value:'414'},
                {xtype:'box',width:35,html:'&nbsp;'},
                {xtype:'displayfield',labelWidth: 100,fieldLabel:'Branch Name', name:'branchdesc', value:'UCFC Head Office'},
                {xtype:'box',width:35,html:'&nbsp;'},
                {xtype:'displayfield',labelWidth: 100,fieldLabel:'Request Date', name:'req_date', value:Ext.Date.format(new Date(), 'm/d/Y')}
            ]
        }
    ]
};

agent_profile = 
{
    title: 'Agent\'s Profile' ,
    items:
    [
        {
            items:
            [
                {fieldLabel:'Last Name', width:300, name:'lastname'},
                {xtype:'box',width:35,html:'&nbsp;'},
                {fieldLabel:'First Name',labelWidth: 100, name:'firstname'},
                {xtype:'box',width:35,html:'&nbsp;'},
                {fieldLabel:'Middle Name',labelWidth: 100, name:'middlename'}
            ]
        },
        {
            items:
            [
                {fieldLabel:'Tax Identification No.',width:300, name:'tin'}
            ]
        },
        {
            items:
            [
                {readOnly:true,fieldLabel:'Requested by',width:300,  name:'req_by', value:'Melchor Isidro'},
                {xtype:'box',width:35,html:'&nbsp;'},
                {readOnly:true,fieldLabel:'Position',labelWidth: 100, name:'req_position', value:'SA/QA Manager'}
            ]
        }
    ]
};


attachment =
{
    title: 'Attachment',
    id  :'upload_panel',
    defaultType:'filefield',
    defaults:{
        width:820,
        labelWidth:300,
    },
    items:[]
};


Ext.onReady(function(){
    request_form = Ext.create('Request.form.Panel');
    request_form.add([request_header,agent_profile,attachment]);
    request_form.down('toolbar').add(submit_btn, clear_btn, cancel_btn);
    request_form.render('request-form-container');

    request_form.down('toolbar').getComponent(0).on('click',function()
    {
        submitRequestForm('newSalesAgent');
    });

    getFileRequirements();
});


function getFileRequirements()
{
    var wait_box = Ext.Msg.wait('Loading requirements...','e-Request');

    Ext.Ajax.on('requestcomplete',function(){wait_box.hide();});
    Ext.Ajax.on('requestexception',function(){wait_box.hide();})

    Ext.Ajax.request({
        url:'?_page=lookUp&_action=getRequirements',
        method:'POST',
        params:{
            appcode:'EREQUEST',
            subcode:'SA'
        },
        callback:function(success, opt, result)
        {
            var response = Ext.JSON.decode(result.responseText);

            if(response.success)
            {
                var upload_panel = Ext.getCmp('upload_panel');
                var requirements = response.data;
                var req_len      = requirements.length;
                for(var i=0; i<req_len; i++)
                {
                    var desc        = requirements[i].DESCRIPTION;
                    var req_name    = requirements[i].STREQUIREID;
                    var allow_blank = (requirements[i].ISREQUIRED == 1) ? false : true;

                    upload_panel.add({
                        fieldLabel  :desc, 
                        name       :req_name,
                        id        :req_name, 
                        allowBlank  :allow_blank
                    });
                }
                
            }
            else
            {
                messageBox(response.errormsg,Ext.getBody(),Ext.MessageBox.WARNING);
            }
        }
    })
}