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
    title: 'Attachment' ,
    items:
    [
        {
            items:
            [
                {xtype:'filefield', width:850, labelWidth:325,fieldLabel:'Upload Scan Copy of TIN ID/Form 1906', name:'file_tin_id'}
            ]
        },
        {
            items:
            [
                {xtype:'filefield', width:850, labelWidth:325,fieldLabel:'Upload Scan Copy of Agent Application Form', name:'agent_app_form'}
            ]
        }
    ]
};


Ext.onReady(function(){
    request_form = Ext.create('Request.form.Panel');
    request_form.add([request_header,agent_profile,attachment]);
    request_form.down('toolbar').add(submit_btn, clear_btn, cancel_btn);
    request_form.render('request-form-container');
})