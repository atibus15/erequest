// Author : atibus
// Date   : 07/11/2013
approver_dtl_panel =
{
    title       :'APPROVER DETAILS',
    items:[
        {
            items:
            [
                {xtype:'displayfield',fieldLabel:'REVIEWED BY', name:'reviewedby'},
                {xtype:'box',html:'&nbsp;',width:100},
                {xtype:'textfield',fieldLabel:'R&M ALLOW DEDUCTION', name:'allowed_deduction',width:350, labelWidth:165}
            ]
        },
        {
            items:
            [
                {xtype:'displayfield',fieldLabel:'POSITION', name:'reviewposition'},
                {xtype:'box',html:'&nbsp;',width:100},
                {xtype:'textfield',fieldLabel:'TOTAL APPROVED AMOUNT', name:'approved_amount',width:350, labelWidth:165}
            ]
        },
        {
            items:
            [
                {xtype:'displayfield',fieldLabel:'DATE REVIEWED', name:'date_reviewed'},
                {xtype:'box',html:'&nbsp;',width:100},
                {xtype:'textfield',fieldLabel:'ATOE DEDUCTION', name:'atoe_deduction',width:350, labelWidth:165}
            ]
        },
        {
            padding:'20px 0 0 0',
            items:
            [
                {xtype:'textarea',fieldLabel:'REMARKS', name:'remarks', width:750},
            ]
        }
    ]
};
mypanel = Ext.create('Detail.form.Panel');

function showRequestDetails()
{
    processing_panel.hide();
    console.log(mypanel.isHidden());
    if(mypanel.isHidden())
    {
        mypanel.show();
    }
    else
    {

    mypanel.add(approver_dtl_panel);

    mypanel.down('toolbar').add([
            {
                text: 'Approved',
                id :'forward-btn',
                name:'approve',
                iconCls:'approve-icon',
                handler:function()
                {
                    this.findParentByType('form').getForm().submit({
                        url:'test.php',
                        method:'POST',
                        params:{
                            approve:true
                        }
                    })
                }
            },
            {
                text: 'Disapproved',
                name:'disapprove',
                iconCls:'disapprove-icon',
                handler:function()
                {
                    this.findParentByType('form').getForm().submit({
                        url:'test.php',
                        method:'POST',
                        params:{
                            disapprove:true
                        }
                    })
                }
            },
            {
                text:'Clear',
                iconCls:'erase2-icon',
                handler:function()
                {
                    this.findParentByType('form').getForm().reset();
                }
            },
            {
                text:'Back to List',
                id:'back-btn',
                name:'back',
                iconCls:'back-icon',
                handler:function()
                {
                    processing_panel.show();
                    mypanel.hide();
                }   
            }
        ]);
        mypanel.render('request-details-container');
    }
}