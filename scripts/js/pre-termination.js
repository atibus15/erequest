// Author : atibus
// Date   : 07/11/2013

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
                    readOnly:true,
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
                    id:'effect-date',
                    name:'effectdate',
                    minValue:Ext.Date.format(new Date(),'m/d/Y')
                }
            ]
        },
        {
            items:
            [
                {
                    fieldLabel:'Agreement No.',
                    id:'agree-no',
                    name:'agree_no'
                },
                {
                    xtype:'box',
                    width:100,
                    html:'&nbsp;'
                },
                {
                    fieldLabel:'Agreement Name',
                    id:'agree-name',
                    name:'agree_name'
                }
            ]
        },
        {
            bodyStyle:'padding-top:25px; background-color:transparent;',
            items:
            [
                {
                    fieldLabel:'Requested by',
                    id:'request-by',
                    name:'requestby'
                },
                {
                    xtype:'box',
                    width:100,
                    html:'&nbsp;'
                },
                {
                    fieldLabel:'Position',
                    id:'req-position',
                    name:'reqposition'
                }
            ]
        },
        {
            items:
            [
                {
                    xtype:'textarea',
                    fieldLabel:'Remarks',
                    id:'remarks',
                    width:700,
                    name:'remarks'
                }
            ]
        },
    ],
    buttonAlign:'center',
    buttons:
    [
        {
            text: 'Submit',
            id :'submit-btn',
            name:'submit',
            iconCls:'submit-icon',
            handler:function()
            {
                req_details_form.getForm().submit({
                    url:'test.php',
                    method:'POST'
                })
            }
        },
        {
            text:'Clear',
            id:'clear-btn',
            name:'clear',
            iconCls:'erase-icon',
            handler:function()
            {
                req_details_form.getForm().reset();
            }
        },
        {
            text:'Cancel',
            id:'cancel-btn',
            name:'cancel',
            iconCls:'exit-icon',
            handler:function()
            {
                
            }
        }
    ]
});

Ext.onReady(function()
{
    req_details_form.render('request-form-container');
});