// @Author  : atibus
// @Date    : 0718/2013
// @desc    : reauthenticate user if loggedin in other systems in scinnova.com 

Ext.onReady(function()
{
    var waitBox =  Ext.MessageBox.show({
          msg          : 'Connecting...',
          progressText : 'Authenticating user account...',
          width        : 250,
          wait         : true,
          waitConfig   : {interval:200}
   });

    Ext.Ajax.on('requestcomplete',function(conn,o,result){
        waitBox.hide()
    })

    Ext.Ajax.on('requestexception',function(conn,o,result){
        waitBox.hide();
    });
    Ext.Ajax.request({
        url     : '?page=user&action=authLoggedinUser',
        method  : 'POST',
        success : function(result){
                    var response = Ext.JSON.decode(result.responseText);
                    
                    if(!response.success){
                        Ext.MessageBox.show({
                            title   : 'e-Request.',
                            msg     : response.errormsg,
                            buttons : Ext.MessageBox.OK,
                            icon    : Ext.MessageBox.WARNING,
                            animEl  : Ext.getBody()
                        });
                    }
                    else
                    {
                        window.location = response.page.redirect;
                    }
        },
        failure     : function(){}
    });
})