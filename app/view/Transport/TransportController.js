/*--- Transport controller ---*/

"use strict";

Ext.define('CityApp.view.transport.TransportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.transport-main',
 
    txpMap: null,
    vehicleLayer: null,
    interval: null,
    deployed: false,
 
    init: function(){
        CityApp.app.txpCtrl = this;
        this.control({
            'panel#txp_map_panel': {
                'resize': 'onMapPanelResize'
            },
            'transportview': {
                'boxready': 'initializeView'
            }
        });
    },
    /*---*/


    /*- Refreshes the map when its containing panel is resized -*/
    onMapPanelResize: function(){
        if (this.txpMap){ 
            this.txpMap.updateSize(); 
        };
    },
    /*---*/     
	
	
    /*- Performs initialization actions after the view has been rendered by the browser -*/
    initializeView: function(){
        this.txpMap = CityApp.app.homeCtrl.createMap('brtachtergrondkaartgrijs', 'txp_map_panel');
		this.txpMap.getView().setCenter(CityApp.app.cityCoords);
        this.txpMap.getView().setZoom(8);
		
        var defaultStyle = new ol.style.Style({
            image: new ol.style.Circle({
                radius: 5,
                fill: new ol.style.Fill({
                    color: 'rgba(0, 200, 0, 0.2)'
                }),
                stroke: new ol.style.Stroke({
                    color: '#009900',
                    width: 2
                })
            })
        });
 
        this.vehicleLayer = new ol.layer.Vector({   
            source: new ol.source.Vector({
                features: (new ol.format.GeoJSON())
            }),
            style: defaultStyle
        });
        this.txpMap.addLayer(this.vehicleLayer);
		
        function hoverStyle() {
            return function(feature){
                return new ol.style.Style({
                    image: new ol.style.Circle({
                        radius: 5,
                        fill: new ol.style.Fill({
                            color: 'rgba(255, 0, 102, 0.2)'
                        }),
                        stroke: new ol.style.Stroke({
                            color: '#ff0066',
                            width: 2
                        })
                    }),
                    text: new ol.style.Text({
                        textAlign: 'center',
                        textBaseline: 'middle',
                        font: 'Normal 16px Arial',
                        text: feature.get('route_code') + '\n' + feature.get('route_name'),
                        fill: new ol.style.Fill({color: '#ff0066'}),
                        stroke: new ol.style.Stroke({color: '#fff', width: 3}),
                        offsetX: 0,
                        offsetY: -26,
                        rotation: 0
                    })
                });
            };
        };
        var hoverInteraction = new ol.interaction.Select({
            layers: [this.vehicleLayer],
            condition: ol.events.condition.pointerMove,
            style: hoverStyle()
        });        
        this.txpMap.addInteraction(hoverInteraction); 
		
        this.txpMap.on('moveend', this.refreshVehicleLayer);
    },
    /*---*/	

    /*- Reads a new transit feed */
    getVehiclePositions: function(bboxCoords){
        Ext.Ajax.request({
            url: 'app/api/transitfeed.py?bbox=' + bboxCoords,
            disableCaching: false,
            success: function(response){
                CityApp.app.txpCtrl.updateVehiclePositions(JSON.parse(response.responseText));
            },
            failure: function(response){
                console.log('error: '+response.status);
            }
        });
    },    
    /*---*/
    
    
    /* Updates the features in the vehicle layer with their new positions from the feed -*/
    updateVehiclePositions: function(vehiclePositions){    
        var feature, layerSource, updateTime;
        updateTime = Date.now(); 
        layerSource = this.vehicleLayer.getSource();
        vehiclePositions.features.forEach(function(vehicle){
            feature = layerSource.getFeatureById(vehicle.id);
            if (feature){ /* update geomtery if the feature exists */
                feature.setGeometry(
                    new ol.geom.Point([vehicle.geometry.coordinates[0],vehicle.geometry.coordinates[1]])
                        .transform('EPSG:4326','EPSG:28992')
                );
            } else { /* create new features */
                feature = new ol.Feature();
                feature.setGeometry(
                    new ol.geom.Point([vehicle.geometry.coordinates[0],vehicle.geometry.coordinates[1]])
                        .transform('EPSG:4326','EPSG:28992')
                );
                feature.setId(vehicle.id);
                feature.setProperties(vehicle.properties);
                layerSource.addFeature(feature);
            };
            feature.set('timestamp', updateTime);
        });
        layerSource.forEachFeature(function(feature){ /* remove features that are no longer in the feed */
            if (feature.get('timestamp') < updateTime){ layerSource.removeFeature(feature); };
        });
    },    
    /*---*/    
	
    /*- Reconfigures the interface for the retrieval of vehicle positions -*/
    refreshVehicleLayer: function(){
        CityApp.app.txpCtrl.getVehiclePositions(
            CityApp.app.txpCtrl.txpMap.getView().calculateExtent()
        );
        CityApp.app.txpCtrl.interval = setInterval(
            function(){ 
                CityApp.app.txpCtrl.getVehiclePositions(
                    CityApp.app.txpCtrl.txpMap.getView().calculateExtent()
                ); 
            }, 
            60000
        );    
    }
    /*---*/
});
/*--- ---*/

