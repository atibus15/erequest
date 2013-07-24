// Author : atibus
// Date   : 07/11/2013

Ext.require([
		'Ext.panel.*',
		'Ext.form.*'
	]);

request_panel =
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
    				id:'branchcode',
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
    				value:Ext.Date.format(new Date(), 'm/d/Y'),
    				readOnly:true
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
    				xtype:'datefield',
    				fieldLabel:'MSI Date',
    				id:'msi-date',
    				editable:false,
    				name:'msidate'
    			}
    		]
    	},
    	{
    		items:
    		[
    			{
    				fieldLabel:'Agreement Name',
    				id:'agreement-name',
    				name:'agreementname'
    			},
    			{
    				xtype:'box',
    				width:100,
    				html:'&nbsp;'
    			},
    			{
    				fieldLabel:'Engine No.',
    				id:'engine-no',
    				name:'engineno'
    			}
    		]
    	},
    	{
    		items:
    		[
    			{
    				xtype:'combobox',
    				fieldLabel:'Document Type',
    				id:'doc-type', 
    				name:'doctype'
    			},
    			{
    				xtype:'box',
    				width:100,
    				html:'&nbsp;'
    			},
    			{
    				xtype:'combobox',
    				fieldLabel:'Purpose of Request', 
    				id:'req-purpose', 
    				name:'reqpurpose'
    			}
    		]
    	},
    	{
    		bodyStyle:'padding-top:50px; background-color:transparent;',
    		items:
    		[
    			{
    				xtype:'displayfield', 
    				fieldLabel:'Requested by', 
    				id:'req-by',
    				name:'reqby'
    			},
    			{
    				xtype:'box',	
    				width:100,	
    				html:'&nbsp;'
    			},
    			{
    				xtype:'displayfield',
    				fieldLabel:'Position',
    				id:'position',
    				name:'position'
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
	request_panel.render('request-form-container');
});