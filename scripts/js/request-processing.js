// Author : atibus
// Date   : 07/11/2013
// Desc   : REQUEST PROCESSING FORM FOR ADMIN.

Ext.require([
    'Ext.panel.*',
    'Ext.grid.*',
    'Ext.form.*',
    'Ext.PagingToolbar'
]);


//####################### MODEL HERE ########################//

Ext.define('Request',
{
    extend:'Ext.data.Model',
    fields:
    [
        {name:'FILEDATE',           type:'string'},
        {name:'STATUS_ASOF',        type:'string'},
        {name:'CURR_LEVEL',         type:'int'},
        {name:'CURR_LEVEL_INCHARGE',type:'string'},
        {name:'LAST_ACTION',        type:'string'},
        {name:'REMARKS',            type:'string'}
    ]
});

Ext.define('History',
{
    extend:'Ext.data.Model',
    fields:
    [
        {name:'REFID',      type:'string'},
        {name:'LEVEL',      type:'string'},
        {name:'LAST_ACTION',type:'int'},
        {name:'STATUS_DATE',type:'string'},
        {name:'USERNAME',   type:'string'}
    ]
});


//###################### END MODEL DECLARATION ###############//


//######################### STORE HERE ########################//

request_grid_store = Ext.create('Ext.data.Store',
{
    model:'Request',
    proxy :
    {
        type:'ajax',
        url:'to_store.php',
        reader:
        {
            type:'json',
            root:'data',
            totalProperty:'totalrequest'
        }
    },
    autoLoad:true
});

history_grid_store = Ext.create('Ext.data.Store',
{
    model:'History',
    proxy :
    {
        type:'ajax',
        url:'to_store.php',
        reader:
        {
            type:'json',
            root:'data',
            totalProperty:'totalhistory'
        }
    },
    autoLoad:true
});






//#################### END STORE DECLARATION #############################//



//##################### VIEW COMPONENT HERE ############################////
request_filter_panel = 
Ext.create('Ext.panel.Panel',
{
    bodyStyle:'background-color:transparent;',
    autoWidth:true,
    autoHeight:true,
    border:false,
    frame:false,
    layout:'column',
    defaults:
    {
        style:'margin:5px;'
    },
    items:
    [
        {
            id:'status',
            xtype:'combobox',
            store:[['P','Pending'],['C','Close']],
            fieldLabel:'Status',
            value:'P',
            labelWidth:50,
            width:175
        },
        {
            id:'req-type',
            xtype:'combobox',
            // store:type_store,
            valueField:'code',
            displayField:'desc',
            fieldLabel:'Request Type',
            labelWidth:85,
            width:250
        },
        {
            id:'date-range-start',
            xtype:'datefield',
            editable:false,
            fieldLabel:'Date From',
            labelWidth:65,
            width:200
        },
        {
            id:'date-range-end',
            xtype:'datefield',
            editable:false,
            fieldLabel:'Date To',
            labelWidth:60,
            width:200
        },
        {
            xtype:'button',
            text:'Show',
            style:'margin-top:8px;',

            iconCls:'search-icon',
            autoWidth:true,
            handler:function()
            {
                alert('show');
                return this;
            }
        }
    ]
});


request_grid = 
Ext.create('Ext.grid.Panel',
{
    title:'e-Request',
    store:request_grid_store,
    autoWidth:true,
    height:250,
    tbar:
    [
        {
            xtype:'button',
            text:'Process/View Details',
            autoWidth:true,
            iconCls:'view-icon',
            handler:function()
            {
                showRequestDetails();
            }
        }
    ],
    columns:
    [
        {text:'File Date',      dataIndex:'FILEDATE', width:100},
        {text:'Status as of',   dataIndex:'STATUS_ASOF', width:100},
        {text:'Current Level',  dataIndex:'CURR_LEVEL',width:100},
        {text:'Current Level Incharge', dataIndex:'CURR_LEVEL_INCHARGE',width:250},
        {text:'Last Action',    dataIndex:'LAST_ACTION', width:250}
    ]
});

remarks_form_panel = 
Ext.create('Ext.form.FormPanel',{
    width:225,
    height:250,
    bodyStyle:'padding-top:0;',
    frame:false,
    border:false,
    layout:'vbox',
    items:
    [
        {
            xtype:'box',
            html:'<div class="x-grid-header-ct x-grid-header-ct-default x-docked-top x-grid-header-ct-default-docked-top x-box-layout-ct x-column-header-inner" style="height: auto; padding-top: 3px;">'
                +'<span class="x-column-header-text">Remarks</span>'
                +'</div>',
            width:250
        },
        {
            xtype:'textarea',
            name:'REMARKS',
            id :'remarks-field',
            autoScroll:true,
            width:228,
            height:227
        }
    ]
});




history_grid = 
Ext.create('Ext.grid.Panel',
{
    title:'History',
    store:history_grid_store,
    width:750,
    height:250,
    columns:
    [
        {text:'Reference ID',dataIndex:'REFID',         width:100},
        {text:'Level',       dataIndex:'LEVEL',         width:100},
        {text:'Last Action', dataIndex:'LAST_ACTION',   width:100},
        {text:'Status Date', dataIndex:'STATUS_DATE',   width:100},
        {text:'Username',    dataIndex:'USERNAME',      width:250}
    ]
});

history_main_panel = 
Ext.create('Ext.panel.Panel',
{
    layout:'column',
    frame:false,
    border:true,
    autoHeight:true,
    autoWidth:true,
    items:
    [
        history_grid,
        remarks_form_panel
    ],
    bbar:Ext.create('Ext.PagingToolbar', {
        store:request_grid_store,
        displayInfo: true,
        displayMsg: 'Displaying systems {0} - {1} of {2}',
        emptyMsg: "No system to display"
    })
});
//################### END OF VIEW COMP DECLARATION##############//


//#################### VIEW LAYOUT ############################//
Ext.onReady(function()
{
    processing_panel = Ext.create('Ext.panel.Panel',
    {
        frame:false,
        border:false,
        renderTo:'request-container',
        autoHeight:true,
        autoWidth:true,
        items:
        [
            request_filter_panel,
            request_grid,
            history_main_panel
        ]
    });
 
});
//#################### END VIEW LAYOUTING ####################//