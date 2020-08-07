/*--- Home View ---*/
Ext.define('CityApp.view.home.HomeView', {
    extend: 'Ext.container.Viewport',
 
    requires: [
        'CityApp.view.home.HomeController',
        'CityApp.view.statistics.StatisticsView',
        'CityApp.view.transport.TransportView'
    ],        
    
    controller: 'home-main',
    
    itemId: 'home_view',
    id: 'home_view',
 
    padding: 2,
    layout: 'fit',
    
    items: [{
        xtype: 'tabpanel',
        activeTab: 1,        
        items: [{
            xtype: 'panel',
            html: 'Planning...',
            title: '&nbsp;&nbsp;Participatory&nbsp;Planning&nbsp;&nbsp;'
        },{
            xtype: 'transportview',
            title: '&nbsp;&nbsp;Public&nbsp;Transport&nbsp;&nbsp;'
        },{
            xtype: 'statisticsview',
            title: '&nbsp;&nbsp;Basic Statistics&nbsp;&nbsp;'
        }]
    }]
});
/*--- ---*/