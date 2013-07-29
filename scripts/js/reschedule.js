//  @Author  : atibus
//  @Date    : 07/27/2013
//  @IDE     : Sublime Text 2 for better reviewing...

Ext.require([
    'Ext.form.*',
    'Ext.panel.*',
    'Ext.tip.*'
]);

Ext.tip.QuickTipManager.init();

_request_code = 'ERQ_RES';

request_form =
Ext.create('Ext.form.FormPanel',
{
	title 		:'REQUEST DETAILS',
	autoWidth 	:true,
	autoHeight 	:true,
	frame		:true,
	border 		:true,
	bodyStyle 	:'padding:10px;',
	defaultType :'panel',
	defaults    :
    {
        frame       :false,
        border      :false,
        autoWidth   :true,
        autoHeight  :true,
        bodyStyle   :'background-color:transparent; padding:3px 0 3px 0;',
        layout      :'column',
        defaultType :'mytextfield',
        defaults    :
        {
            readOnly    :false,
            width       :300,
            labelWidth  :115,
            allowBlank:false
        }
    },
    items:
    [
    	{
    		items:
    		[
    			{
                    readOnly:true,
                    fieldLabel:'Branch Code', 
                    name:'requestor_branch_code', 
                    id:'requestor_branch_code'
                },
    			{
    				xtype:'box',
    				width:100,
    				html:'&nbsp;'
    			},
    			{
                    xtype:'datefield',
    				fieldLabel:'Request Date',
    				id:'request_date',
                    readOnly:true,
    				name:'request_date',
    				value:_today
    			}
    		]
    	},
    	{
    		items:
    		[
    			{
    				fieldLabel:'Branch Name',
    				id:'requestor_branch',
    				name:'requestor_branch'
    			},
    			{
    				xtype:'box',
    				width:100,
    				html:'&nbsp;'
    			},
    			{
    				xtype:'datefield',
    				fieldLabel:'Effective Date',
    				editable:false,
    				minValue:_today,
                    value:_today,
    				id:'effective_date',
    				name:'effective_date'
    			}
    		]
    	},
    	{
    		items:
    		[
    			{
    				fieldLabel:'Agreement No.',
    				id:'agreement_no',
    				name:'agreement_no'
    			},
    			{
    				xtype:'box',
    				width:100,
    				html:'&nbsp;'
    			},
    			{
    				fieldLabel:'Agreement Name',
    				id:'agreement_name',
    				name:'agreement_name'
    			}
    		]
    	},
    	{
    		items:
    		[
    			{
    				xtype:'combobox',
    				fieldLabel:'Request Type',
                    name:'request_type',
                    store:dropDownStore('EREQUEST', 'RES_RTYPE'),
                    displayField:'desc',
                    valueField:'code',
                    editable:false
    			}
    		]
    	},
    	{
    		xtype:'fieldset',
    		title:'Old Payment Details',
    		titleWidth:250,
    		border:true,
    		frame:true,
            layout:'form',
    		defaultType:'panel',
    		defaults:{
    			frame:false,
    			border:false,
    			autoHeight:true,
    			autoWidth:true,
    			layout:'column',
    			bodyStyle:'background-color:transparent; padding:3px 0 3px 0;'
    		},
    		items:
    		[
    			{
    				items:
    				[
		    			{
		    				fieldLabel:'Term',
                            name      :'term',
		    				xtype     :'numberfield',
                            maxValue  :36,
                            minValue  :1,
                            value     :0,
		    				labelWidth:105,
		    				width     :290
		    			},
		    			{
		    				xtype         :'box',
		    				width         :90,
		    				html          :'&nbsp;'
		    			},
		    			{
		    				xtype     :'textfield',
                            name      :'monthly_amor',
		    				fieldLabel:'Monthly Amortization',
                            maskRe    :/[0123456789.,]/,
                            enableKeyEvent:true,
		    				labelWidth:125,
		    				width     :310,
                            listeners :{
                                blur:function()
                                {
                                    var formatted_value = Ext.util.Format.number(this.getValue(), '0,000.00');
                                    this.setValue(formatted_value);
                                }
                            }
		    			}
    				]
    			},
    			{
    				items:
    				[
    					{
		    				xtype     :'combobox',
                            name      :'due_day',
		    				fieldLabel:'Due Day',
                            store     :dropDownStore('EREQUEST','RES_DD'),
                            displayField:'desc',
                            valueField:'code',
		    				labelWidth:105,
		    				editable  :false,
		    				width     :290
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
                            labelWidth  :105,
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
    	},
        {
            padding:'15px 0 0 0',
            items:
            [
                {
                    xtype       :'textarea',
                    name        :'remarks',
                    fieldLabel  :'Remarks',
                    labelWidth  :100,
                    maxLength   :150,
                    width       :700,
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
    		xtype:'fieldset',
    		title:'ATTACHMENT',
            id:'attachement_set',
            defaultType:'filefield',
    		titleWidth:250,
    		border:true,
    		frame:true,
    		items:[]
    	},
    	{
    		xtype:'fieldset',
    		title:'CNC Approval',
    		titleWidth:250,
    		border:true,
    		frame:true,
    		items:
    		[
                {
                    fieldLabel:'Approved by',
                    id:'approver_badgeno',
                    name:'approver_badgeno', 
                    emptyText:'Badge No.',
                    width:200
                },
                {
                    name:'approver_name',
                    id:'approver_name',
                    readOnly:true,
                    emptyText:'Name',
                    width:200
                },
                {
                    name    :'approver_position',
                    id      :'approver_position',
                    readOnly:true,
                    emptyText:'Position',
                    width   :200
                },
                {xtype:'box',width:18,html:'&nbsp;'},
                {
                    xtype       : 'datefield',
                    editable    : false, 
                    labelWidth  :125,
                    fieldLabel  :'Date Approved',
                    name        :'approved_date',  
                    maxValue    : _today,
                    value       : _today,
                    width       :280
                }
    		]
    	}
    ],
    buttonAlign:'center',
    buttons:
    [	
        submit_btn,clear_btn,cancel_btn
    ]
});

Ext.onReady(function()
{
	request_form.render('request-form-container');


    getFileRequirements();

    fillFormValue();


//######## LISTENERS #############//

var approver_name       = Ext.getCmp('approver_name'),
    approver_position   = Ext.getCmp('approver_position'),
    approver_badgeno    = Ext.getCmp('approver_badgeno'),
    requested_name       = Ext.getCmp('requested_name'),
    requested_position   = Ext.getCmp('requested_position'),
    requested_badgeno    = Ext.getCmp('requested_badgeno'),
    submit_btn_cmp      = Ext.getCmp('submit-btn');

    approver_badgeno.on('blur',function()
    {
        if(this.isDirty() && this.getValue())
        {
            this.resetOriginalValue();
            var emp_detail = getEmployeeDetails(this.getValue());
            if(emp_detail)
            {
                approver_name.setValue(emp_detail.data.NAME);
                approver_position.setValue(emp_detail.data.POSITIONDESC);
            }
            else
            {
                approver_name.setValue('');
                approver_position.setValue('');
                this.focus();
            }
        }
    });

    submit_btn_cmp.on('click',function(){
        submitRequestForm('reschedule');
    });

//########### END LISTENERS ################//
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
            subcode:'RES'
        },
        callback:function(success, opt, result)
        {
            var response = Ext.JSON.decode(result.responseText);

            if(response.success)
            {
                var upload_set = Ext.getCmp('attachement_set');
                var requirements = response.data;
                var req_len      = requirements.length;
                for(var i=0; i<req_len; i++)
                {
                    var desc        = requirements[i].DESCRIPTION;
                    var req_name    = requirements[i].STREQUIREID;
                    var allow_blank = (requirements[i].ISREQUIRED == 1) ? false : true;

                    upload_set.add({
                        labelWidth  : 300,
                        width       : 690,
                        fieldLabel  :desc, 
                        name        :req_name, 
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