//  @Author  : atibus
//  @Date    : 07/11/2013
//  @IDE     : Sublime Text 2 for better reviewing...

Ext.require([
    'Ext.form.*',
    'Ext.panel.*'
]);

req_details_form =
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
        defaultType :'textfield',
        defaults    :
        {
            readOnly    :false,
            width       :300,
            labelWidth  :115
        }
    },
    items:
    [
    	{
    		items:
    		[
    			{
    				fieldLabel:'Branch Code',
    				id:'branch-code',
    				name:'branchcode'
    			},
    			{
    				xtype:'box',
    				width:100,
    				html:'&nbsp;'
    			},
    			{
    				fieldLabel:'Request Date',
    				id:'req-date',
    				name:'reqdate',
    				value:Ext.Date.format(new Date(),'m/d/Y')
    			}
    		]
    	},
    	{
    		items:
    		[
    			{
    				fieldLabel:'Branch Name',
    				id:'branch-name',
    				name:'branchname'
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
    				minValue:new Date(),
    				id:'effect-date',
    				name:'effectdate'
    			}
    		]
    	},
    	{
    		items:
    		[
    			{
    				fieldLabel:'Agreement No.',
    				id:'agreement-no',
    				name:'agreementno'
    			},
    			{
    				xtype:'box',
    				width:100,
    				html:'&nbsp;'
    			},
    			{
    				fieldLabel:'Agreement Name',
    				id:'agreement-name',
    				name:'agreementname'
    			}
    		]
    	},
    	{
    		items:
    		[
    			{
    				xtype:'radiogroup',
    				fieldLabel:'Request Type',
    				id:'req-type-rbg',
    				width:600,
    				items:
    				[
    					{
    						name:'req_type',
    						boxLabel:'Addition DP',
    						value:'ADP',
    						inputValue:'ADP'
    					},
    					{
    						name:'req_type',
    						boxLabel:'Change Due Date',
    						value:'ADP',
    						inputValue:'ADP'
    					},
    					{
    						name:'req_type',
    						boxLabel:'Conversion',
    						value:'ADP',
    						inputValue:'ADP'
    					}
    				]
    			}
    		]
    	},
    	{
    		xtype:'fieldset',
    		title:'Old Payment Details',
    		titleWidth:250,
    		border:true,
    		frame:true,
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
		    				xtype:'textfield',
		    				labelWidth:105,
		    				width:290
		    			},
		    			{
		    				xtype:'box',
		    				width:90,
		    				html:'&nbsp;'
		    			},
		    			{
		    				xtype:'textfield',
		    				fieldLabel:'Monthly Amortization',
		    				labelWidth:125,
		    				width:310
		    			}
    				]
    			},
    			{
    				items:
    				[
    					{
		    				xtype:'datefield',
		    				fieldLabel:'Due Date',
		    				labelWidth:105,
		    				editable:false,
		    				width:290
		    			}
    				]
    			},
    			{
    				items:
    				[
		    			{
		    				fieldLabel:'Requested by',
		    				xtype:'textfield',
		    				labelWidth:105,
		    				width:290
		    			},
		    			{
		    				xtype:'box',
		    				width:90,
		    				html:'&nbsp;'
		    			},
		    			{
		    				xtype:'textfield',
		    				fieldLabel:'Position',
		    				labelWidth:125,
		    				width:310
		    			}
    				]
    			}
    		]
    	},
    	{
    		xtype:'fieldset',
    		title:'ATTACHMENT',
    		titleWidth:250,
    		border:true,
    		frame:true,
    		items:
    		[
    			{
    				fieldLabel:'Testing',
    				xtype:'filefield'
    			}
    		]
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
    				fieldLabel:'Financing Manager/Supervisor',
    				xtype:'textfield'
    			}
    		]
    	}
    ],
    buttonAlign:'center',
    buttons:
    [
    	{
    		text:'Submit',
    		iconCls:'submit-icon',
    		autoWidth:true,
    		handler:function()
    		{
    			return this;
    		}
    	},
    	{
    		text:'Clear',
    		iconCls:'erase-icon',
    		autoWidth:true,
    		handler:function()
    		{
    			req_details_form.getForm().reset();
    			return this;
    		}
    	},
    	{
	    	text:'Cancel',
	    	iconCls:'exit-icon',
	    	autoWidth:true,
	    	handler:function()
	    	{
	    		return this;
	    	}
	    }
    ]
});

Ext.onReady(function()
{
	req_details_form.render('request-form-container');
})