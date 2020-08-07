/* Colors store */
Ext.define('CityApp.store.Colors', {
    extend: 'Ext.data.Store',

    alias: 'store.colors',
    storeId: 'colors',

    model: 'CityApp.model.Color',

    data : [{
        group: 'g1',
        stroke: '#d41811', /*red*/
        fill: '#ec1a13',
        tints: ['#f9bab8', '#f47671', '#f15854', '#ec1a13']
    },{
        group: 'g2',
        stroke: '#e65c00', /*orange*/
        fill: '#ff6600',
        tints: ['#ffc299', '#ffa366', '#ff8533', '#ff6600']
    },{
        group: 'g3',
        stroke: '#734d26', /*brown*/
        fill: '#996633',
        tints: ['#e6ccb3', '#d9b38c', '#cc9966', '#bf8040'] 
    },{
        group: 'g4',
        stroke: '#33cc00', /*light-green*/
        fill: '#39e600',
        tints: ['#d9ffcc', '#8cff66', '#53ff1a', '#39e600'] 
    },{
        group: 'g5',
        stroke: '#e6b800', /*yellow*/
        fill: '#ffcc00',
        tints: ['#fff5cc', '#ffeb99', '#ffdb4d', '#ffcc00'] 
    },{
        group: 'g6',
        stroke: '#3c9043', /*green*/
        fill: '#4bb454',
        tints: ['#c9e8cc', '#a5d9a9', '#6fc376', '#4bb454'] 
    },{
        group: 'g7',
        stroke: '#005fb3', /*blue*/
        fill: '#0088ff',
        tints: ['#e6f3ff', '#99cfff', '#4dacff', '#0088ff']      
    },{
        group: 'g8',
        stroke: '#00b3b3', /*cyan*/
        fill: '#00cccc',
        tints: [ ]
    },{
        group: 'g9',
        stroke: '#b034b2', /*purple*/
        fill: '#c94dcb',
        tints: [ ]  
    }]
});