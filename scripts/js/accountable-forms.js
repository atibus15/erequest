idgen = 1;
Ext.require(['Ext.panel.*','Ext.form.*', 'Ext.widget.*'])


request_header = 
{
    title: 'Company Information',
    items:
    [
        {
            items:
            [
                {width:300, fieldLabel:'Branch Code',id:'requestor_branch_code',name:'requestor_branch_code'},
                {xtype:'box',width:35,html:'&nbsp;'},
                {labelWidth: 100,fieldLabel:'Branch Name', id:'requestor_branch', name:'requestor_branch'},
                {xtype:'box',width:35,html:'&nbsp;'},
                {labelWidth: 100,fieldLabel:'Company', name:'company'},
            ]
        },
        {
            items:
            [
                {width:300,fieldLabel:'Request Date', readOnly:true, name:'request_date', value:_today}
            ]
        }
    ]
};

request_detail = 
{
    title: 'Request Details' ,
    id : 'req-detail-panel',
    items:
    [
        {
            xtype:'fieldset',
            padding:'5px 10px 0px 20px',
            frame:true,
            border:true,
            collapsible:true,
            title:'Request 1',
            defaultType:'fieldset',
            layout:'column',
            defaults:
            {
                layout:'column',
                style:'padding:5px',
                defaultType:'textfield',
                defaults:{labelAlign:'top', style:'margin-right:5px;'},
            },
            items:
            [
                {
                    title:'Current Pad Series',
                    items:
                    [
                        {
                            xtype:'combobox',
                            fieldLabel:'Type',
                            name:'type[]',
                            store:dropDownStore('EREQUEST','FRM_TYPE'),
                            displayField:'desc',
                            valueField:'code',
                            width:200
                        },
                        {
                            fieldLabel:'From',
                            name:'cps_from[]',
                            width:105
                        },
                        {
                            fieldLabel:'To',
                            name:'cps_to[]',
                            width:105
                        },
                        {
                            fieldLabel:'Last Series Used',
                            name:'lastseriesused[]',
                            width:105
                        }
                    ]
                },
                {
                    title:'Unused Series of Pads/Boxes',
                    style:'margin-left:25px; padding:5px;',
                    items:
                    [
                        {
                            fieldLabel:'From',
                            name:'usp_from[]',
                            width:105
                        },
                        {
                            fieldLabel:'To',
                            name:'usp_to[]',
                            width:105
                        },
                        {
                            fieldLabel:'No. of Booklet',
                            name:'no_booklet',
                            width:105
                        }
                    ]
                },
                {
                    title:'Accountable Personnel',
                    items:
                    [
                        {
                            fieldLabel:'Badge No.',
                            name:'badgeno'
                        },
                        {
                            fieldLabel:'Name',
                            name:'name[]',
                            width:250
                        },
                        {
                            fieldLabel:'Remarks',
                            name:'remarks[]',
                            width:488
                        }
                    ]
                }
            ]
        },
        {
            items:
            [
                {
                    xtype:'button',
                    align:'right',
                    width:75,
                    id : 'add-btn',
                    text:'Add',
                    iconCls:'add-icon',
                    handler:function()
                    {
                        addRequestItem();
                    }
                }
            ]

        },
//########## FOOTER ##############///        
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
};


Ext.onReady(function(){

    request_form = Ext.create('Request.form.Panel');
    request_form.add([request_header,request_detail]);
    request_form.down('toolbar').add(submit_btn, clear_btn, cancel_btn);
    request_form.render('request-form-container');

    fillFormValue();

});


function addRequestItem()
{
    idgen++;

    if(idgen <= 10)
    {
        var new_id      = 'req_detail-'+idgen;

        var index       = idgen - 1;

        var new_fieldset_title = 'Request '+idgen;

        var detail_panel = Ext.getCmp('req-detail-panel');

        var new_fieldset = detail_panel.getComponent(0).cloneConfig({id:new_id, title: new_fieldset_title});

        //insert close button..
        new_fieldset.insert(0, 
            {
                xtype:'button',
                iconCls:'close-icon',
                style:'position:absolute; top: 0px; right: 10px',
                handler:function()
                {
                        this.findParentByType('fieldset').destroy();
                        idgen--;
                }
            });
                       

        detail_panel.insert(index, new_fieldset);

        if(idgen==10)
        {
            Ext.getCmp('add-btn').disable(true);
        }

        return this;
    }
    else
    {
        messageBox('Maximum allowed item is ten (10).');
        return false;
    }
}