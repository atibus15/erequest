// @autho   : atibus
// @Date    : 07/17/2013
// @desc    : Default Request form layout;


Ext.define('Request.form.Panel', {
    extend: 'Ext.form.FormPanel',
    requires: ['Ext.panel.*','Ext.form.*'],
    initComponent: function(){

        Ext.apply(this, {
            id: 'request-form',
            frame:false,
            border:false,
            autoHeight:true,
            autoWidth:true,
            fileUpload:true,
            defaultType:'panel',
            defaults: // my panel defaults
            {
                padding:'10px 10px 10px 10px;',
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
                    bodyStyle   :'background-color:transparent;',
                    padding     :'3px 0 3px 0;',
                    layout      :'column',
                    defaultType :'textfield',
                    defaults    :
                    {
                        readOnly    :false,
                        allowBlank  :false,
                        width       :275,
                        labelWidth  :125
                    }
                }
            },
            items: [],
            buttonAlign:'center',
            buttons:[]
        });
        this.callParent(arguments);
    }
});