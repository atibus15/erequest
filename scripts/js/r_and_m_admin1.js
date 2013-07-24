// Author : atibus
// Date   : 07/11/2013

Ext.require([
    'Ext.panel.*',
    'Ext.form.*',
    '*'
]);


function showRequestDetails()
{
    processing_panel.hide();
    
    detail_form_panel.render('request-details-container');
}