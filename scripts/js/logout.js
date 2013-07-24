/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 * @author  : jrdumayag
 * @date    : 05-29-2010
 */
Ext.onReady(function(){

    var logout = Ext.get('logout');

    if(logout){

        logout.on('click',function(){
            Ext.MessageBox.show({
               msg          : 'Clearing your session...',
               width        : 250,
               wait         : true,
               waitConfig   : {interval:200}
            });

            window.location = "index.php?page=logout&action=logout";
        });
    }


});

