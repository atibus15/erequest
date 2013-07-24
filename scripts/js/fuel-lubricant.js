// Author : atibus
// Date   : 07/11/2013
// Desc   : FUEL & LUBRICANT REQUEST FORM

Ext.require([
    'Ext.panel.*',
    'Ext.form.*',
    'Ext.tip.*'
]);

Ext.tip.QuickTipManager.init();

idgen = 1;

_request_code = 'ERQ_FL';

// req_dtls_panel  = Ext.create('Ext.panel.Panel',);


upload_req_panel = Ext.create('Ext.panel.Panel',{
    title: 'UPLOAD REQUIREMENTS',
    items:
    [

    ]
});


Ext.onReady(function()
{
    request_form = Ext.create('Ext.form.FormPanel',
    {
        frame:false,
        border:false,
        autoHeight:true,
        renderTo:'request-form-container',
        autoWidth:true,
        fileUpload:true,
        defaultType:'panel',
        defaults: // my panel defaults
        {
            bodyStyle: 'padding:10px 10px 0 10px;',
            autoWidth: true,
            autoHeight:true,
            frame : true,
            border:true,
            defaultType:'panel',
            defaults: // defaults for form field wrapper
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
                    labelWidth  :115,
                    allowBlank  :false
                }
            }
        },
        items:
        [
            {
                title: 'EMPLOYEE DETAILS',
                items:
                [
                    {
                        items:
                        [
                            {
                                readOnly:true,
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
                                fieldLabel:'Branch', 
                                name:'requestor_branch', 
                                id:"requestor_branch"
                            }
                        ]
                    },
                    {
                        items:
                        [
                            {
                                readOnly:true,
                                fieldLabel:'Badge No.', 
                                name:'requestor_badge_no', 
                                id:"requestor_badge_no"
                            },
                            {
                                xtype:'box',
                                width:100,
                                html:'&nbsp;'
                            },
                            {
                                readOnly:true,
                                fieldLabel:'Position', 
                                name:'requestor_position', 
                                id:"requestor_position"
                            }
                        ]
                    },
                    {
                        items:
                        [
                            {
                                readOnly:true, 
                                fieldLabel:'Name', 
                                name:'requestor_name', 
                                id:"requestor_name"
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
                                value:Ext.Date.format(new Date(), 'm/d/Y')
                            }
                        ]
                    }
                ]
            },
            {
                title : 'SERVICE UNIT DETAILS',
                items:
                [
                    {
                        items:
                        [
                            {
                                xtype: 'combobox', 
                                fieldLabel: 'Service Type', 
                                name:'service_type', 
                                editable:false,
                                store: dropDownStore('EREQUEST','SUTYPE'),
                                triggerAction:'all',
                                valueField:'code',
                                displayField:'desc'
                            }
                        ]
                    },
                    {
                        items:
                        [
                            {
                                xtype:'combobox',
                                fieldLabel:'Make', 
                                id:'make',
                                name:'make',
                                store:dropDownStore('GENERIC','MCMAKE'),
                                triggerAction:'all',
                                valueField:'code',
                                displayField:'desc'
                            },
                            {
                                xtype:'box',
                                width:100,
                                html:'&nbsp;'
                            },
                            {
                                fieldLabel:'Plate No.', 
                                name:'plate_no',
                                value:'PLT785' //clear me later
                            }
                        ]
                    },
                    {
                        items:
                        [
                            {
                                fieldLabel:'Model', 
                                name:'model',
                                value:'Mod785' //clear me later
                            },
                            {
                                xtype:'box',
                                width:100, 
                                html:'&nbsp;'
                            },
                            {
                                fieldLabel:'Engine No.', 
                                name:'engine_no',
                                value:'ENG785' //clear me later
                            }
                        ]
                    },
                    {
                        items:
                        [
                            {
                                fieldLabel:'Date Acquired', 
                                xtype:'datefield',
                                editable:false, 
                                name:'date_acquired',
                                value:_today,
                                maxValue:_today
                            },
                            {
                                xtype:'box',
                                width:100,
                                html:'&nbsp;'},
                            {
                                fieldLabel:'Chassis No.',
                                name:'chassis_no',
                                value:'CHA785' //clear me later
                            }
                        ]
                    },
                    {
                        items:
                        [
                            {
                                xtype:'numberfield',
                                maxValue:99999,
                                fieldLabel:'Odometer Reading', 
                                name:'odometer_reading',
                                value:1524 //clear me later
                            }
                        ]
                    }
                ]
            },
            {
                title       :'SU EVALUATION DETAILS',
                items:[
                    {
                        items:
                        [
                            {
                                xtype:'datefield',
                                maxValue:_today,
                                format:'m/d/Y',
                                fieldLabel:'Last PMS Date', 
                                name:'last_pms_date',
                                value:_today //clear me later
                            },
                            {
                                xtype:'box',
                                width:100,
                                html:'&nbsp;'
                            },
                            {
                                fieldLabel:'Serving Shop', 
                                name:'serving_shop',
                                value:'Cagayan Apps' //clear me later
                            }
                        ]
                    }
                ]
            },
            {
                title       :'REQUEST DETAILS',
                items:
                [
                    {
                        bodyStyle:'background-color:transparent;',
                        defaultType:'box',
                        defaults:
                        {
                            margin:'margin:0 3px 0 3px;'
                        },
                        items:
                        [
                            {html:'No.',            width:45},
                            {html:'QTY.',           width:45},
                            {html:'Description',    width:200},
                            {html:'Brand Name',     width:100},
                            {html:'Date of Last Request',width:135},
                            {html:'Canvassed Price',width:350}
                        ]
                    },
                    {
                        defaults:{style:'margin:0 3px 0 3px;'},
                        items:
                        [
                            {
                                xtype:'box',       
                                width:550,  
                                html:'&nbsp;'
                            },
                            {
                                xtype:'displayfield',
                                width:99, value:'PCI', 
                                name:'pci_store'
                            },
                            {
                                xtype:'textfield',
                                allowBlank:false, 
                                width:100, 
                                name:'store2_name',
                                value:'Rusi' //clear me later
                            },
                            {
                                xtype:'textfield',
                                allowBlank:false, 
                                width:100, 
                                name:'store3_name',
                                value:'Honda Market' //clear me later
                            }
                        ]
                    },

                    {
                        defaults:{
                            style:'margin:0 3px 0 3px;',
                            enableKeyEvents:true
                        },
                        items:
                        [
                            {
                                xtype :'textfield',
                                allowBlank:false, 
                                name:'request_number',
                                readOnly:true,      
                                width:45, 
                                value:idgen
                            },
                            {
                                xtype :'textfield',
                                allowBlank:false, 
                                value:1,
                                readOnly:true,
                                name:'item_quantity',     
                                width:45
                            },
                            {
                                xtype :'combobox', 
                                allowBlank:false, 
                                name:'item_code',      
                                width:200,
                                store:dropDownStore('EREQUEST','FL_ITEM'),
                                valueField:'code',
                                displayField:'desc',
                                autoScroll:true,
                                listConfig:{
                                    maxHeight:265
                                }
                            },
                            {
                                xtype :'combobox',
                                allowBlank:false, 
                                name:'item_brand',
                                id:'item_brand',
                                store:dropDownStore('GENERIC','MCMAKE'), 
                                width:100,
                                triggerAction:'all',
                                valueField:'code',
                                displayField:'desc'
                             },
                            {
                                xtype :'datefield',
                                allowBlank:false, 
                                name:'last_request_date', 
                                width:135, 
                                maxValue:_today,
                                editable:false, 
                                readOnly:true,
                                format:'m/d/Y',
                                value:getLastRequestDate(_request_code)
                            },
                            {
                                xtype :'numberfield',
                                allowBlank:false, 
                                name:'pci_item_price', 
                                id:'pci_item_price',
                                width:100,
                                value: 1524
                            },
                            {
                                xtype :'numberfield',
                                allowBlank:false, 
                                id:'store2_item_price',
                                name:'store2_item_price', 
                                width:100,
                                value:8524
                            },
                            {
                                xtype :'numberfield',
                                allowBlank:false, 
                                id:'store3_item_price',
                                name:'store3_item_price', 
                                width:100,
                                value:1245
                            }
                        ]
                    },
                    {
                        padding:'15px 0 0 0',
                        items:
                        [
                            {
                                xtype:'textarea',
                                name:'remarks',
                                fieldLabel:'Remarks',
                                labelWidth:100,
                                width: 870,
                                height:50,
                                emptyText:'Type your remarks here..',
                                allowBlank:true
                            }
                        ]
                    },
                    {
                        defaultType :'textfield',
                        padding:'30px 0 3px 0',
                        items:
                        [
                            {
                                fieldLabel:'Verified by', 
                                name:'verifier_badgeno', 
                                id:'verifier_badgeno',
                                emptyText:'Badge No.',
                                width:200
                            },
                            {
                                name:'verifier_name',
                                id:'verifier_name',
                                emptyText:'Service Mechanic',
                                readOnly:true,
                                width:200
                            },
                            {xtype:'box',width:18,html:'&nbsp;'},
                            {
                                xtype: 'datefield',
                                editable: false, 
                                labelWidth:100,
                                fieldLabel:'Date Verified',
                                name:'verified_date',  
                                maxValue: _today,
                                value : _today
                            }
                        ]
                    },
                    {
                        defaultType:'textfield',
                        items:
                        [
                            {
                                fieldLabel:'Recommended by', 
                                id:'recommend_badgeno',
                                name:'recommend_badgeno', 
                                emptyText:'Badge No.',
                                width:200
                            },
                            {
                                name:'recommend_name',
                                id:'recommend_name',
                                readOnly:true,
                                emptyText:'Branch Manager',
                                width:200
                            }
                        ]
                    }
                ]
            }
        ],
        buttonAlign:'center',
        buttons:
        [
            {
                text: 'Submit',
                id :'submit-btn',
                name:'submit',
                iconCls:'submit-icon',
                formBind:true,
                handler:function()
                {
                    submitRequestForm();
                }
            },
            {
                text:'Clear',
                id:'clear-btn',
                name:'clear',
                iconCls:'erase-icon',
                handler:function()
                {
                    request_form.getForm().reset();
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



//#################### LISTENERS FUNCTIONS ###############################//


var verifier_badgeno  = Ext.getCmp('verifier_badgeno'),
verifier_name     = Ext.getCmp('verifier_name'),
recommend_badgeno = Ext.getCmp('recommend_badgeno'),
recommend_name = Ext.getCmp('recommend_name');
 

verifier_badgeno.on('blur',function()
{
    if(this.isDirty() && this.getValue())
    {
        this.resetOriginalValue();
        var fullname = getEmpFullname(this.getValue());
        if(fullname)
        {
            verifier_name.setValue(fullname);
        }
        else
        {
            verifier_name.setValue('');
            this.focus();
        }
        
    }
});

recommend_badgeno.on('blur',function()
{
    if(this.isDirty() && this.getValue())
    {
        this.resetOriginalValue();
        var fullname = getEmpFullname(this.getValue());
        if(fullname)
        {
            recommend_name.setValue(fullname);
        }
        else
        {
            recommend_name.setValue('');
            this.focus();
        }
        
    }
});

Ext.getCmp('make').on('collapse',function(){
    var item_brand_cmp = Ext.getCmp('item_brand');
    item_brand_cmp.getStore().load();
    item_brand_cmp.setValue(this.getValue());
});

//########################## END LISTENERS ################################///



fillFormValue();

});




function submitRequestForm()
{
    var form = request_form.getForm();

    var form_fields = form._fields;

    var first_invalid_field = false;

    form_fields.each(function(field){
        if(!field.isValid())
        {
            first_invalid_field = field;
            return false;
        }
    })

    // console.log(first_invalid_field);
    if(first_invalid_field)
    {
        first_invalid_field.focus(); 
        return false;
    }
    

    if(form.isValid())
    {

        form.submit({
            url:'?_page=fuelLubricant&_action=sendRequest',
            method:'POST',
            waitMsg:'Sending request...',
            success:function(form, action)
            {
                Ext.Msg.alert('e-Request', action.result.message,function(){window.location = '?_page=user&_action=homepage';});
            },
            failure:function(form, action)
            {
                Ext.Msg.alert('e-Request', action.result.errormsg);
            }
        });
    }
}