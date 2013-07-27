// Author : atibus
// Date   : 07/11/2013

Ext.require([
    'Ext.form.*',
    'Ext.panel.*'
    ]);

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
            width       :300,
            labelWidth  :115,
            allowBlank  :false
        }
    },
    items:
    [
    	{
    		items:
    		[
    			{
    				fieldLabel:'Branch Code',
    				name:'requestor_branch_code', 
                    id:"requestor_branch_code"
    			},
    			{
    				xtype:'box',
    				width:100,
    				html:'&nbsp;'
    			},
    			{
                    readOnly:true,
                    fieldLabel:'Date of Request', 
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
                    id:'effective_date',
                    editable:false,
                    name:'effective_date',
                    minValue:_today
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
            bodyStyle:'padding-top:25px; background-color:transparent;',
            items:
            [
                {
                    readOnly    :true,
                    xtype       :'mytextfield',
                    fieldLabel  :'Requested by',
                    id          :'requestor_badge_no',
                    name        :'requestor_badge_no', 
                    emptyText   :'Badge No.',
                    // labelWidth  :105,
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
        },
        {
            items:
            [
                {
                    xtype       :'textarea',
                    name        :'remarks',
                    fieldLabel  :'Remarks',
                    maxLength   :150,
                    width       :700,
                    height      :50,
                    emptyText   :'Type your remarks here..',
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
        }
    ],
    buttonAlign:'center',
    buttons:
    [
        submit_btn, clear_btn, cancel_btn
    ]
});

Ext.onReady(function()
{
    request_form.render('request-form-container');

    fillFormValue();

    Ext.getCmp('submit-btn').on('click',function(){
        submitRequestForm('preTermination');
    });
});