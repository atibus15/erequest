//@author   :atibus
//@date     :07/29/2013
//@system   :e-Request

request_header = 
{
    title: 'Request Details',
    items:
    [
        {
            items:
            [
                {xtype:'textfield',width:300, fieldLabel:'Branch Code', readOnly:true, name:'requestor_branch_code', id:'requestor_branch_code'},
                {xtype:'box',width:35,html:'&nbsp;'},
                {xtype:'textfield',labelWidth: 100,fieldLabel:'Branch Name', readOnly:true, name:'requestor_branch', id:'requestor_branch'},
                {xtype:'box',width:35,html:'&nbsp;'},
                {xtype:'textfield',labelWidth: 100,fieldLabel:'Request Date', readOnly:true, name:'request_date', id:'request_date', value:_today}
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
                {xtype:'mytextfield',fieldLabel:'Last Name', width:300, name:'agent_lastname'},
                {xtype:'box',width:35,html:'&nbsp;'},
                {xtype:'mytextfield',fieldLabel:'First Name',labelWidth: 100, name:'agent_firstname'},
                {xtype:'box',width:35,html:'&nbsp;'},
                {xtype:'mytextfield',fieldLabel:'Middle Name',labelWidth: 100, name:'agent_middlename'}
            ]
        },
        {
            items:
            [
                {xtype:'mytextfield',fieldLabel:'Tax Identification No.',width:300, name:'agent_tin', maskRe:/[0123456789]/}
            ]
        },
        {
            padding:'15px 0 15px 0',
            items:
            [
                {
                    xtype       :'textarea',
                    name        :'remarks',
                    fieldLabel  :'Remarks',
                    maxLength   :150,
                    width       :923,
                    height      :50,
                    allowBlank  :true,
                    enableKeyEvents:true,
                    listeners   :{
                        keypress:function(f,e)
                        {
                            if((this.getValue().length >= this.maxLength) && e.getKey() != 8)
                            {
                                e.stopEvent();
                            }
                        }
                    }
                }
            ]
        },
        {
            items:
            [
                {
                    readOnly    :true,
                    xtype       :'mytextfield',
                    fieldLabel  :'Requested by',
                    id          :'requestor_badge_no',
                    name        :'requestor_badge_no', 
                    emptyText   :'Badge No.',
                    width       :200
                },
                {
                    readOnly    :true,
                    xtype       :'mytextfield',
                    name        :'requestor_name',
                    id          :'requestor_name',
                    readOnly    :true,
                    emptyText   :'Name',
                    width       :200
                },
                {
                    readOnly    :true,
                    xtype       :'mytextfield',
                    name        :'requestor_position',
                    id          :'requestor_position',
                    readOnly    :true,
                    emptyText   :'Position',
                    width       :200
                }
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
    fillFormValue();
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