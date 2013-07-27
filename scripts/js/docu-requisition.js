// Author : atibus
// Date   : 07/11/2013

Ext.require([
		'Ext.panel.*',
		'Ext.form.*'
	]);

request_form =
Ext.create('Ext.form.FormPanel',
{
	title 		:'Request Details',
	autoWidth	:true,
	autoHeight	:true,
	bodyStyle	:'padding:10px',
	frame 		:true,
	border 		:true,
	defaultType	:'panel',
	layout 		:'form',
    defaults    :
    {
        frame       :false,
        border      :false,
        autoWidth   :true,
        autoHeight  :true,
        bodyStyle   :'background-color:transparent;',
        layout      :'column',
        defaultType :'mytextfield',
        defaults    :
        {
            readOnly    :false,
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
    				id:'requestor_branch_code',
    				name:'requestor_branch_code'
    			},
    			{
    				xtype:'box',
    				width:100,
    				html:'&nbsp;'
    			},
    			{
    				fieldLabel:'Request Date',
    				name:'request_date',
    				value:_today,
    				readOnly:true
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
    				fieldLabel:'MSI Date',
    				editable:false,
    				name:'msi_date',
                    maxValue:_today
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
                    fieldLabel:'Engine No.',
                    id:'engine_no',
                    name:'engine_no'
                },
    			{
    				xtype:'box',
    				width:100,
    				html:'&nbsp;'
    			},
                {
                    xtype:'combobox',
                    fieldLabel:'Document Type',
                    store:dropDownStore('EREQUEST','DOC_TYPE'),
                    displayField:'desc',
                    valueField:'code',
                    id:'document_type', 
                    name:'document_type'
                }
    		]
    	},
        {
            items:
            [
                {
                    xtype:'combobox',
                    fieldLabel:'Purpose of Request', 
                    store:dropDownStore('EREQUEST','DOC_PURP'),
                    displayField:'desc',
                    valueField:'code',
                    editable:false,
                    width:400,
                    id:'purpose', 
                    name:'purpose'
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
        },
    	{
    		bodyStyle:'padding-top:50px; background-color:transparent;',
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
        submitRequestForm('document');
    });
});