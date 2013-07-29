_item_number = 1;
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
                {width:280,fieldLabel:'Request Date', readOnly:true, name:'request_date', value:_today}
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
            padding:'5px 0px 0px 20px',
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
                defaults:{labelAlign:'top', style:'margin-right:5px;',allowBlank:false},
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
                            name:'type['+_item_number+']',
                            store:dropDownStore('EREQUEST','FRM_TYPE'),
                            displayField:'desc',
                            valueField:'code',
                            width:200
                        },
                        {
                            fieldLabel:'From',
                            maskRe  :/[1234567890]/,
                            name:'cps_from['+_item_number+']',
                            width:75
                        },
                        {
                            fieldLabel:'To',
                            maskRe  :/[1234567890]/,
                            name:'cps_to['+_item_number+']',
                            width:75
                        },
                        {
                            fieldLabel:'Last series used',
                            maskRe  :/[1234567890]/,
                            name:'last_series_used['+_item_number+']',
                            width:100
                        },
                        {
                            xtype:'datefield',
                            fieldLabel:'Last date of series used',
                            maskRe  :/[1234567890]/,
                            name:'last_date_series_used['+_item_number+']',
                            width:135
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
                            maskRe  :/[1234567890]/,
                            name:'usp_from['+_item_number+']',
                            width:75
                        },
                        {
                            fieldLabel:'To',
                            maskRe  :/[1234567890]/,
                            name:'usp_to['+_item_number+']',
                            width:75
                        },
                        {
                            fieldLabel:'No. of Booklet',
                            maskRe  :/[1234567890]/,
                            name:'no_booklet['+_item_number+']',
                            width:90
                        }
                    ]
                },
                {
                    title:'Accountable Personnel',
                    items:
                    [
                        {
                            xtype       :'textfield',
                            name        :'ap_badge_no['+_item_number+']',
                            emptyText   :'Badge No.',
                            width       :75,
                            enableKeyEvents:true,
                            listeners   : {
                                blur:function(){
                                    if(this.isDirty() && this.getValue())
                                    {
                                        this.resetOriginalValue();
                                        var emp_detail = getEmployeeDetails(this.getValue());
                                        if(emp_detail)
                                        {
                                            this.findParentByType('fieldset').getComponent(1).setValue(emp_detail.data.NAME);
                                            this.findParentByType('fieldset').getComponent(2).setValue(emp_detail.data.POSITIONDESC);
                                        }
                                        else
                                        {
                                            this.findParentByType('fieldset').getComponent(1).setValue('');
                                            this.findParentByType('fieldset').getComponent(2).setValue('');
                                            this.focus();
                                        }   
                                    }
                                }
                            }
                        },
                        {
                            readOnly    :true,
                            xtype       :'mytextfield',
                            name        :'ap_name['+_item_number+']',
                            readOnly    :true,
                            emptyText   :'Name',
                            width       :200
                        },
                        {
                            readOnly    :true,
                            xtype       :'mytextfield',
                            name        :'ap_position['+_item_number+']',
                            readOnly    :true,
                            emptyText   :'Position',
                            width       :200
                        },
                        {
                            name:'ap_remarks['+_item_number+']',
                            emptyText:'Remarks',
                            width:407
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
        {
            padding:'15px 0 15px 0',
            items:
            [
                {
                    xtype       :'textarea',
                    name        :'remarks',
                    fieldLabel  :'Remarks',
                    // labelWidth  :100,
                    maxLength   :150,
                    width       :923,
                    height      :50,
                    
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

    request_form.down('toolbar').getComponent(0).on('click',function()
    {
        submitRequestForm('accountableForms');
    });
});


function addRequestItem()
{
    _item_number++;

    if(_item_number <= 10)
    {
        var new_id      = 'req_detail-'+_item_number;

        var index       = _item_number - 1;

        var new_fieldset_title = 'Request '+_item_number;

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
                        _item_number--;
                }
            });

        //override new fieldset component names

        var inner_fieldset1 = new_fieldset.getComponent(1);
        var inner_fieldset2 = new_fieldset.getComponent(2);
        var inner_fieldset3 = new_fieldset.getComponent(3);

        inner_fieldset1.getComponent(0).name = 'type['+_item_number+']';
        inner_fieldset1.getComponent(1).name = 'cps_from['+_item_number+']';
        inner_fieldset1.getComponent(2).name = 'cps_to['+_item_number+']';
        inner_fieldset1.getComponent(3).name = 'last_series_used['+_item_number+']';
        inner_fieldset1.getComponent(4).name = 'last_date_series_used['+_item_number+']';

        inner_fieldset2.getComponent(0).name = 'usp_from['+_item_number+']';
        inner_fieldset2.getComponent(1).name = 'usp_to['+_item_number+']';
        inner_fieldset2.getComponent(2).name = 'no_booklet['+_item_number+']';
        
        inner_fieldset3.getComponent(0).name = 'ap_badge_no['+_item_number+']';
        inner_fieldset3.getComponent(1).name = 'ap_name['+_item_number+']';
        inner_fieldset3.getComponent(2).name = 'ap_position['+_item_number+']';
        inner_fieldset3.getComponent(3).name = 'ap_remarks['+_item_number+']';
                       

        detail_panel.insert(index, new_fieldset);

        if(_item_number==10)
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