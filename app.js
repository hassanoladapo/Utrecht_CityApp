/*--- CityApp - Application launcher script ---*/

"use strict";

Ext.application({
    name: 'CityApp',
    extend: 'CityApp.Application',

    requires: [
        'CityApp.view.home.HomeView'
    ],

    /* The class name of the View that will be lauched when the applicatin starts. */
    mainView: 'CityApp.view.home.HomeView'
});
/*--- ---*/