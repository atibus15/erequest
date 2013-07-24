mc_request_header = 
{
    title: 'EMPLOYEE DETAILS',
    items:
    [
        {
            items:
            [
                {readOnly:true,fieldLabel:'Branch Code', name:'branchcode'},
                {xtype:'box',width:100,html:'&nbsp;'},
                {fieldLabel:'Branch', name:'branchdesc'}
            ]
        },
        {
            items:
            [
                {readOnly:true,fieldLabel:'Badge No.', name:'badgeno'},
                {xtype:'box',width:100,html:'&nbsp;'},
                {readOnly:true,fieldLabel:'Position', name:'position'}
            ]
        },
        {
            items:
            [
                {readOnly:true, fieldLabel:'Name', name:'employee_name'},
                {xtype:'box',width:100,html:'&nbsp;'},
                {readOnly:true,fieldLabel:'Date of Request', name:'req_date'}
            ]
        }
    ]
};


service_unit_dtls =
{
    title : 'SERVICE UNIT DETAILS',
    items:
    [
        {
            items:
            [
                {
                    xtype: 'displayfield', fieldLabel: 'Service Type', name:'service_type', width:600
                }
            ]
        },
        {
            items:
            [
                {xtype:'displayfield',fieldLabel:'Make', name:'make'},
                {xtype:'box',width:100,html:'&nbsp;'},
                {fieldLabel:'Plate No.', name:'plate_no'}
            ]
        },
        {
            items:
            [
                {fieldLabel:'Model', name:'model'},
                {xtype:'box',width:100, html:'&nbsp;'},
                {fieldLabel:'Engine No.', name:'engine_no'}
            ]
        },
        {
            items:
            [
                {fieldLabel:'Date Acquired', name:'acquire_date'},
                {xtype:'box',width:100,html:'&nbsp;'},
                {fieldLabel:'Chassis No.',name:'chassis_no'}
            ]
        },
        {
            items:
            [
                {fieldLabel:'Odometer Reading', name:'odometer_reading'}
            ]
        }
    ]
};

su_eval_dtls =
{
    title       :'SU EVALUATION DETAILS',
    items:[
        {
            items:
            [
                {xtype:'displayfield',fieldLabel:'Last PMS Date', name:'last_pms_date'},
                {xtype:'box',width:100,html:'&nbsp;'},
                {fieldLabel:'Serving Shop', name:'serving_shop'}
            ]
        }
    ]
};

upload_req_panel = {
    title: 'UPLOAD REQUIREMENTS',
    layout:'form',
    items:
    [
        {
            xtype:'box',
            html:'<a href="#">View Picture of MC part/s for Replacement.</a>',
            autoWidth:true
        },
        {
            xtype:'box',
            html:'<a href="#">View Verification from Branch Mechanic.</a>',
            autoWidth:true
        },
                {
            xtype:'box',
            html:'<a href="#">View Picture of MC part/s for Replacement.</a>',
            autoWidth:true
        },
        {
            xtype:'box',
            html:'<a href="#">View Verification from Branch Mechanic.</a>',
            autoWidth:true
        }
    ]
};


req_dtls_panel = Ext.create('Ext.panel.Panel',{
    title       :'REQUEST DETAILS',
    bodyStyle   :'padding:10px;',
    autoWidth   :true,
    autoHeight  :true,
    frame       :true,
    border      :true,
    layout      :'form',
    defaultType :'panel',
    defaults    :
    {
        frame       :false,
        border      :false,
        autoWidth   :true,
        autoHeight  :true,
        bodyStyle   :'background-color:transparent;',
        layout      :'column',
        defaultType :'displayfield',
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
                    fieldLabel: 'Type',
                    name:'req-type'
                }
            ]
        },
        {
            bodyStyle:'padding:15px 0 0 0; background-color:transparent;',
            defaultType:'box',
            defaults:
            {
                style:'font-weight:bolder; margin:0 3px 0 3px;'
            },
            items:
            [
                {html:'No.',            width:45},
                {html:'QTY.',           width:45},
                {html:'Description',    width:100},
                {html:'Brand Name',     width:100},
                {html:'Date of Last Request',width:200},
                {html:'Canvassed Price',width:400}
            ]
        },
        {
            defaults:{style:'margin:0 3px 0 3px;'},
            items:
            [
                {xtype:'box',       width:515,  html:'&nbsp;'},
                {xtype:'displayfield',width:99, value:'PCI', name:'store1_name'},
                {xtype:'displayfield', width:100, value:'Motortrade', name:'store2_name'},
                {xtype:'displayfield', width:100, value:'Gentrade', name:'store3_name'}
            ]
        },

        {
            defaults:{
                style:'margin:0 3px 0 3px;'
            },
            items:
            [
                {xtype :'displayfield', value:'1',    name:'no_field[]',      width:45},
                {xtype :'displayfield', value:'1',    name:'qty_field[]',     width:45},
                {xtype :'displayfield', value:'testvalue only',     name:'desc_cmb[]',      width:100},
                {xtype :'displayfield', value:'testvalue only',    name:'brand_field[]',   width:100},
                {xtype :'displayfield', value:'testvalue only',     name:'last_req_date[]', width:200},
                {xtype :'displayfield', value:'657.00',    name:'store1_amount[]', width:100},
                {xtype :'displayfield', value:'675.90',    name:'store2_amount[]', width:100},
                {xtype :'displayfield', value:'1,298.00',    name:'store3_amount[]', width:100}
            ]
        },
        {
            id:'total-panel',
            defaultType :'displayfield',
            defaults:{
                style:'margin:3px;',
                readOnly:true
            },
            items:
            [
                {xtype:'box',width:515,style:'text-align:right; margin:3px;',html:'<b>TOTAL:</b>'},
                {width:100, name:'store1_total', value:'657.00'},
                {width:100, name:'store2_total', value:'675.90'},
                {width:100, name:'store3_total', value:'1,298.00'}
            ]
        },
        {
            padding:'25px 0 0 0',
            items:
            [
                {
                    xtype:'textfield', 
                    fieldLabel:'AVAILABLE R&M BALANCE',
                    maskRe:/[0-9.,]/,
                    labelWidth:160,
                    name:'rm_balance', 
                    id:'rm-balance'
                }
            ]
        },
        {
            defaultType :'displayfield',
            items:
            [
                {fieldLabel:'Verified by', name:'verfier_name'},
                {xtype:'box',width:100,html:'&nbsp;'},
                {fieldLabel:'Date Verified',name:'verified_date'}
            ]
        },
        {
            items:
            [
                {xtype:'displayfield',fieldLabel:'Recommended by', name:'recommend_name'},
            ]
        }
    ]
});


Ext.define('Detail.form.Panel', {
    extend: 'Ext.form.FormPanel',
    requires: ['Ext.panel.*','Ext.grid.*','Ext.form.*','Ext.PagingToolbar'],

    getButtons: function(){
        return [{
            xtype: 'button',
            type: 'button',
            handler: function(e, target, header, tool){
                // var portlet = header.ownerCt;
                // portlet.setLoading('Loading...');
                // Ext.defer(function() {
                //     portlet.setLoading(false);
                // }, 2000);
            }
        }];
    },

    initComponent: function(){

        Ext.apply(this, {
            id: 'my-detail-form',
            frame:false,
            border:false,
            autoHeight:true,
            autoWidth:true,
            id :'detail_form_panel',
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
                    defaultType :'displayfield',
                    defaults    :
                    {
                        readOnly    :false,
                        width       :300,
                        labelWidth  :115
                    }
                }
            },
            items: [mc_request_header,service_unit_dtls,su_eval_dtls,req_dtls_panel,upload_req_panel],
            buttonAlign:'center',
            buttons:[]
        });
        this.callParent(arguments);
    }
});