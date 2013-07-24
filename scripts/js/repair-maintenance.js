// Author : atibus
// Date   : 07/11/2013
// Desc   : REPAIR AND MAINTENANCE REQUEST FORM

_request_code = 'ERQ_RM';
_init_brand_name = '';
_item_number = 1;

Ext.require([
    'Ext.panel.*',
    'Ext.form.*',
    'Ext.tip.*'
]);

Ext.tip.QuickTipManager.init();


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
                    labelWidth  :115
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
                title   :'REQUEST DETAILS',
                id      :'request_detail_panel',
                items   :
                [    
                    {
                        defaultType:'box',
                        items:
                        [
                            {html:'&nbsp;',width:650},
                            {html:'<b>Canvassed Price</b>',width:150}
                        ]
                        
                    }, 
                    {
                        defaults:{style:'margin:0 3px 0 3px;'},
                        items:
                        [
                            {
                                xtype       :'box',       
                                width       :495,  
                                html        :'&nbsp;'
                            },
                            {
                                xtype       :'textfield',
                                width       :125, 
                                readOnly    :true,
                                value       :'PCI', 
                                name        :'pci_store'
                            },
                            {
                                xtype       :'textfield',
                                allowBlank  :false, 
                                width       :125, 
                                name        :'store2_name',
                                emptyText   :'Store Name',
                                value       :'Rusi' //clear me later
                            },
                            {
                                xtype       :'textfield',
                                allowBlank  :false, 
                                width       :125, 
                                name        :'store3_name',
                                emptyText   :'Store Name',
                                value       :'Honda Market' //clear me later
                            }
                        ]
                    },

                    {
                        defaultType:'box',
                        defaults:
                        {
                            margin:'margin:0 3px 0 3px;'
                        },
                        items:
                        [
                            {html:'No.',            width:25},
                            {html:'QTY.',           width:45},
                            {html:'Description',    width:200},
                            {html:'Brand Name',     width:100},
                            {html:'Last Req. Date', width:100},
                            {html:'Unit Price',     width:60},
                            {html:'Total',          width:60},
                            {html:'Unit Price',     width:60},
                            {html:'Total',          width:60},
                            {html:'Unit Price',     width:60},
                            {html:'Total',          width:60}
                        ]
                    },

                    {
                        defaults:{
                            style:'margin:0 3px 0 3px;',
                            enableKeyEvents:true,
                            allowBlank  :false,
                        },
                        items:
                        [
                            {
                                xtype       :'textfield',
                                name        :'item_number['+_item_number+']',
                                readOnly    :true,      
                                width       :25, 
                                value       :_item_number
                            },
                            {
                                xtype       :'numberfield',
                                name        :'item_quantity['+_item_number+']',  
                                value       :1,
                                maxValue    :2,
                                minValue    :1,   
                                width       :45,
                                listeners   :{
                                    blur:function()
                                    {
                                        calculateAllStoreItemSubTotals(this);
                                        calculateGrandTotal('PCI');
                                        calculateGrandTotal('STORE2');
                                        calculateGrandTotal('STORE3');
                                    }
                                }
                            },
                            {
                                xtype       :'combobox', 
                                name        :'item_code['+_item_number+']',      
                                width       :200,
                                store       :dropDownStore('EREQUEST','FL_ITEM'),
                                valueField  :'code',
                                displayField:'desc',
                                triggerAction:'all',
                                editable    :false,
                                autoScroll  :true,
                                listConfig  :
                                {
                                    maxHeight:265
                                }
                            },
                            {
                                xtype       :'combobox',
                                name        :'item_brand['+_item_number+']',
                                store       :dropDownStore('GENERIC','MCMAKE'), 
                                width       :100,
                                editable    :false,
                                valueField  :'code',
                                displayField:'desc',
                                triggerAction:'all',
                             },
                            {
                                xtype       :'datefield',
                                name        :'last_request_date['+_item_number+']', 
                                width       :100, 
                                maxValue    :_today,
                                readOnly    :true,
                                value       :getLastRequestDate(_request_code)
                            },
                            {
                                xtype       :'numberfield',
                                name        :'pci_item_price['+_item_number+']', 
                                emptyText   :'Unit Price',
                                maxValue    :99999,
                                minValue    :1,
                                decimalPrecision:2,
                                hideTrigger :true,
                                keyNavEnabled:false,
                                mouseWheelEnabled:false,
                                fieldStyle  :'text-align:right;',
                                width       :60,
                                listeners   :{
                                    blur:function()
                                    {
                                        calculateSubTotal(this,'PCI-UNITPRICE');
                                    }
                                }

                            },
                            {
                                xtype       :'numberfield',
                                name        :'pci_item_sub_total['+_item_number+']', 
                                emptyText   :'Total',
                                readOnly    :true,
                                decimalPrecision:2,
                                hideTrigger :true,
                                keyNavEnabled:false,
                                mouseWheelEnabled:false,
                                fieldStyle  :'text-align:right;',
                                width       :60,
                                listeners   :{
                                    change :function()
                                    {
                                        calculateGrandTotal('PCI');
                                    }
                                }
                            },
                            {
                                xtype       :'textfield',
                                name        :'store2_item_price['+_item_number+']', 
                                emptyText   :'Unit Price',
                                maxValue    :99999,
                                minValue    :1,
                                decimalPrecision:2,
                                hideTrigger :true,
                                keyNavEnabled:false,
                                mouseWheelEnabled:false,
                                fieldStyle  :'text-align:right;',
                                width       :60,
                                listeners   :{
                                    blur:function()
                                    {
                                        calculateSubTotal(this,'STORE2-UNITPRICE');
                                    }
                                }
                            },
                            {
                                xtype       :'numberfield',
                                name        :'store2_item_sub_total['+_item_number+']', 
                                emptyText   :'Total',
                                readOnly    :true,
                                decimalPrecision:2,
                                hideTrigger :true,
                                keyNavEnabled:false,
                                mouseWheelEnabled:false,
                                fieldStyle  :'text-align:right;',
                                width       :60,
                                listeners   :{
                                    change:function()
                                    {
                                        calculateGrandTotal('STORE2');
                                    }
                                }
                            },
                            {
                                xtype       :'textfield',
                                name        :'store3_item_price['+_item_number+']', 
                                emptyText   :'Unit Price',
                                maxValue    :99999,
                                minValue    :1,
                                decimalPrecision:2,
                                hideTrigger :true,
                                keyNavEnabled:false,
                                mouseWheelEnabled:false,
                                fieldStyle  :'text-align:right;',
                                width       :60,
                                listeners   :{
                                    blur:function()
                                    {
                                        calculateSubTotal(this,'STORE3-UNITPRICE');
                                    }
                                }
                            },
                            {
                                xtype       :'numberfield',
                                name        :'store3_item_sub_total['+_item_number+']', 
                                emptyText   :'Total',
                                readOnly    :true,
                                decimalPrecision:2,
                                hideTrigger :true,
                                keyNavEnabled:false,
                                mouseWheelEnabled:false,
                                fieldStyle  :'text-align:right;',
                                width       :60,
                                listeners   :{
                                    change:function()
                                    {
                                        calculateGrandTotal('STORE3');
                                    }
                                }
                            }
                        ]
                    },
                    {
                        defaults:{
                            style:'margin:0 3px 0 3px;'
                        },
                        items:
                        [,
                            {
                                xtype   :'button',
                                id      :'add-row-btn',
                                iconCls :'add-icon',
                                text    :'Add',
                                tooltip :'Click to add new request row.',
                                width   :95,
                                handler :function()
                                {
                                    addRequestItem();
                                }
                            },
                            {
                                xtype   :'box',
                                width   :400,
                                style   :'text-align:right;',
                                html    :'<b>TOTAL:</b>'
                            },
                            {
                                width   :125, 
                                readOnly:true,
                                name    :'pci_item_grand_total_price',
                                id      :'pci_item_grand_total_price',
                                fieldStyle  :'text-align:right;',
                                value   :'0.00'
                            },
                            {
                                width   :125, 
                                readOnly:true,
                                name    :'store2_item_grand_total_price',
                                id      :'store2_item_grand_total_price',
                                fieldStyle  :'text-align:right;',
                                value   :'0.00'
                            },
                            {
                                width   :125, 
                                readOnly:true,
                                name    :'store3_item_grand_total_price',
                                id      :'store3_item_grand_total_price',
                                fieldStyle  :'text-align:right;',
                                value   :'0.00'
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
                                width       :890,
                                height      :50,
                                emptyText   :'Type your remarks here..',
                                allowBlank  :true
                            }
                        ]
                    },
                    {
                        defaultType :'textfield',
                        padding     :'30px 0 3px 0',
                        items:
                        [
                            {
                                fieldLabel  :'Verified by', 
                                name        :'verifier_badgeno', 
                                id          :'verifier_badgeno',
                                emptyText   :'Badge No.',
                                width       :200
                            },
                            {
                                name        :'verifier_name',
                                id          :'verifier_name',
                                emptyText   :'Service Mechanic',
                                readOnly    :true,
                                width       :200
                            },
                            {xtype:'box',width:18,html:'&nbsp;'},
                            {
                                xtype       : 'datefield',
                                editable    : false, 
                                labelWidth  :100,
                                fieldLabel  :'Date Verified',
                                name        :'verified_date',  
                                maxValue    : _today,
                                value       : _today
                            }
                        ]
                    },
                    {
                        defaultType:'textfield',
                        items:
                        [
                            {
                                fieldLabel  :'Recommended by', 
                                id          :'recommend_badgeno',
                                name        :'recommend_badgeno', 
                                emptyText   :'Badge No.',
                                width       :200
                            },
                            {
                                name        :'recommend_name',
                                id          :'recommend_name',
                                readOnly    :true,
                                emptyText   :'Branch Manager',
                                width       :200
                            }
                        ]
                    }
                ]
            },
            {
                title:'UPLOAD REQUIREMENTS',
                id :'upload-panel',
                defaultType:'filefield',
                defaults:{
                    labelWidth:300,
                    width     :800
                },
                items:[]
            }
        ],
        buttonAlign:'center',
        buttons:
        [
            {
                text    : 'Submit',
                id      :'submit-btn',
                name    :'submit',
                iconCls :'submit-icon',
                handler :function()
                {
                    request_form.getForm().submit({
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

    fillFormValue();
    getFileRequirements();
//############## FORM FIELD LISTENERS #################///

var item_brand_cmp = Ext.getCmp('request_detail_panel').getComponent(3).getComponent(3);
var su_maker    = Ext.getCmp('make');

su_maker.on('collapse',function(cmb){
    item_brand_cmp.store.load();
    item_brand_cmp.setValue(cmb.getValue());
})


//######### END DECLARATION OF LISTENERS ##############///
});


function addRequestItem()
{
    _item_number++;

    

    if(_item_number <= 10)
    {
        var request_detail_panel= Ext.getCmp('request_detail_panel'),
        index                   = (_item_number - 1) + 3,
        new_request_row         = request_detail_panel.getComponent(3).cloneConfig(),
        item_number_cmp         = new_request_row.items.items[0],
        item_quantity_cmp       = new_request_row.items.items[1],
        item_code_cmp           = new_request_row.items.items[2],
        item_brand_cmp          = new_request_row.items.items[3],
        last_request_date_cmp   = new_request_row.items.items[4],
        pci_item_price_cmp      = new_request_row.items.items[5],
        pci_item_sub_total_cmp  = new_request_row.items.items[6],
        store2_item_price_cmp   = new_request_row.items.items[7],
        store2_item_sub_total_cmp=new_request_row.items.items[8],   
        store3_item_price_cmp   = new_request_row.items.items[9],
        store3_item_sub_total_cmp=new_request_row.items.items[10]; 


        item_number_cmp.name        = 'item_number['+_item_number+']';
        item_quantity_cmp.name      = 'item_quantity['+_item_number+']';
        item_code_cmp.name          = 'item_code['+_item_number+']';
        item_brand_cmp.name         = 'item_brand['+_item_number+']';
        last_request_date_cmp.name  = 'last_request_date['+_item_number+']';
        pci_item_price_cmp.name     = 'pci_item_price['+_item_number+']';
        pci_item_sub_total_cmp.name = 'pci_item_sub_total['+_item_number+']';
        store2_item_price_cmp.name  = 'store2_item_price['+_item_number+']';
        store3_item_sub_total_cmp.name='store3_item_sub_total['+_item_number+']';
        store3_item_price_cmp.name  = 'store3_item_price['+_item_number+']';
        store3_item_sub_total_cmp.name='store3_item_sub_total['+_item_number+']';

        item_brand_cmp.store.load();
        item_brand_cmp.setValue(Ext.getCmp('make').getValue());

        item_number_cmp.setValue(_item_number);

        new_request_row.insert(11,{
            xtype:'button',
            iconCls:'close-icon',
            tooltip:'Destroy request row.',
            handler:function(){
                this.findParentByType('panel').destroy();
                _item_number--;
            }
        });

        request_detail_panel.insert(index, new_request_row);

        if(_item_number==10)
        {
            Ext.getCmp('add-row-btn').disable(true);
        }

        return this;
    }
    else
    {
        messageBox('Maximum allowed item is ten (10).');
        return false;
    }
}


//@ param current_row_cmp = the current component triggering this function
//@ param column          = the current column either PCI-UNITPRICE, STORE2-UNITPRICE OR STORE3-UNITPRICE
function calculateSubTotal(current_row_cmp, column)
{
    var current_row_panel   = current_row_cmp.findParentByType('panel');
    var qty                 = current_row_panel.getComponent(1).getValue();
    var unit_price          = current_row_cmp.getValue();
    if (unit_price > 0)
    {
        var sub_total           = eval(unit_price) * eval(qty);

        switch(column)
        {
            case 'PCI-UNITPRICE':
                var sub_total_cmp = current_row_panel.getComponent(6);
                break;

            case 'STORE2-UNITPRICE':
                var sub_total_cmp = current_row_panel.getComponent(8);
                break;

            case 'STORE3-UNITPRICE':
                var sub_total_cmp = current_row_panel.getComponent(10);
                break;
            default:
                return false;
        }

        return sub_total_cmp.setValue(sub_total); 
    }
}

function calculateAllStoreItemSubTotals(quantity_cmp)
{
    var current_row_panel       = quantity_cmp.findParentByType('panel'),
    quantity                    = parseInt(quantity_cmp.getValue()),

    pci_item_unit_price         = eval(current_row_panel.getComponent(5).getValue()),
    store2_item_unit_price      = eval(current_row_panel.getComponent(7).getValue()),
    store3_item_unit_price      = eval(current_row_panel.getComponent(9).getValue()),

    pci_item_sub_total_cmp      = current_row_panel.getComponent(6),
    store2_item_sub_total_cmp   = current_row_panel.getComponent(8),
    store3_item_sub_total_cmp   = current_row_panel.getComponent(10),

    item_sub_total = 0;

    if(pci_item_unit_price)
    {
        item_sub_total = pci_item_unit_price * quantity;

        pci_item_sub_total_cmp.setValue(item_sub_total);
    }
    if(store2_item_unit_price)
    {
        item_sub_total = store2_item_unit_price * quantity;

        store2_item_sub_total_cmp.setValue(item_sub_total);
    }
    if(store3_item_unit_price)
    {
        item_sub_total = store3_item_unit_price * quantity;

        store3_item_sub_total_cmp.setValue(item_sub_total);
    }
    return;
}

function calculateGrandTotal(store_key)
{

    var pci_item_price_arr = $("input[name*=pci_item_sub_total]"),
    store2_item_price_arr  = $("input[name*=store2_item_sub_total]"),
    store3_item_price_arr  = $("input[name*=store3_item_sub_total]"),
    items_grand_total_price = 0;

    switch(store_key)
    {
        case 'PCI' : 
            $.each(pci_item_price_arr,function(){
                items_grand_total_price += parseFloat($(this).val());
            });

            Ext.getCmp('pci_item_grand_total_price').setValue(items_grand_total_price);
        break;

        case 'STORE2':
            $.each(store2_item_price_arr,function(){
                items_grand_total_price += parseFloat($(this).val());
            });

            Ext.getCmp('store2_item_grand_total_price').setValue(items_grand_total_price);
        break;

        case 'STORE3':
            $.each(store3_item_price_arr,function(){
                items_grand_total_price += parseFloat($(this).val());
            });

            Ext.getCmp('store3_item_grand_total_price').setValue(items_grand_total_price);
        break;

        default:
            return false;
    }

    return;
}


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
            subcode:'RM'
        },
        callback:function(success, opt, result)
        {
            var response = Ext.JSON.decode(result.responseText);

            if(response.success)
            {
                var upload_panel = Ext.getCmp('upload-panel');
                var requirements = response.data;
                var req_len      = requirements.length;
                for(var i=0; i<req_len; i++)
                {
                    var desc        = requirements[i].DESCRIPTION;
                    var req_name    = requirements[i].STREQUIREDID;
                    var allow_blank = (requirements[i].ISREQUIRED == 1) ? false : true;

                    upload_panel.add({
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