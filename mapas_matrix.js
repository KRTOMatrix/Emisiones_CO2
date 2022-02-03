///////////Creación variable mapa/////////// 
var map = L.map('map', {
		zoomControl: false,
		center: [40, -3],
		zoom: 6,
		minZoom: 3,
		maxZoom: 20,
		maxBounds: [
			[20, -50],
			[50, 50]
			],
	});



///////////Funcionalidades estructura del visor///////////

//Layers on top

map.createPane('límites');
// This pane is above markers but below popups
map.getPane('límites').style.zIndex = 650;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('límites').style.pointerEvents = 'none';
//Labels on top
map.createPane('labels');
// This pane is above markers but below popups
map.getPane('labels').style.zIndex = 800;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('labels').style.pointerEvents = 'none';
//bindTooltip on top
map.createPane('popups');
// el popup aparece al arrastar encima de todo pero debajo del popup que aparece al clicar
map.getPane('popups').style.zIndex = 1000;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('popups').style.pointerEvents = 'none';
//bindPopup on top
map.createPane('popups1');
// aparece por encima de todas las capas
map.getPane('popups1').style.zIndex = 1500;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('popups1').style.pointerEvents = 'none';



//Barra de interacción de capas	tantas sidebar como grupos de capas


var sidebar = L.control.sidebar('sidebar', { closeButton:true, position: 'left' });
	map.addControl(sidebar);
	sidebar.hide();			
	sidebar.show();
	sidebar.toggle();
var visible = sidebar.isVisible();
var button = new L.Control.Button(L.DomUtil.get('helpbutton'), { toggleButton: 'active', position: 'topleft'});
	button.addTo(map);
	button.on('click', function () {
	 if (button.isToggled()) {
			sidebar.hide();
		} else {
			sidebar.show();
		}
	});
var sidebar2 = L.control.sidebar('sidebar2', { closeButton:true, position: 'right' });
	map.addControl(sidebar2);
	sidebar2.hide();			
	sidebar2.show();
	sidebar2.toggle();
var visible2 = sidebar.isVisible();

//Buscador
var geocoder = L.Control.geocoder({ position: 'topleft',
	//defaultMarkGeocode: false
	}).addTo(map);

///////////Diseño caracteriticas basicas del visor///////////
//Título
var title2 = L.control({position: 'topright'});
	title2.onAdd = function (map) {
var div = L.DomUtil.create('div', 'info2');
	 div.innerHTML +=
	 'VISOR CARTOGRÁFICO<h3>Emisiones difusas de CO<sub>2</sub> en España';
	 return div;
	};
	title2.addTo(map);

//Logo Matrix	
var title1 = L.control({position: 'bottomright'});
	title1.onAdd = function (map) {
var div = L.DomUtil.create('div', 'info1');
	 div.innerHTML +=
	 '<a href="https://www.fundacionmatrix.es"><img src="images/matrix_nuevo.png" width="90px" height="55px"></img></a>';
	 return div;
	};
	title1.addTo(map);
		//Logo proyecto

var title4 = L.control({position: 'bottomright'});
	title4.onAdd = function (map) {
var div = L.DomUtil.create('div','info4');
	 div.innerHTML +=
	 '<a><img src="images/impactsig.png" width="90px" height="65px" ></img></a>';
	 return div;
	};
	title4.addTo(map); 

	//Logo mayorsig
/*var title3 = L.control({position: 'bottomright'});
	title3.onAdd = function (map) {
var div = L.DomUtil.create('div','info3');
	 div.innerHTML +=
	 '<a><img src="images/MAYORSIG.jpg" width="90px" height="63px" ></img></a>';
	 return div;
	};
	title3.addTo(map);  
*/

///////////Cartografía de referencia///////////
var Mapa_fondo = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, opacity: 0.4, 
	attribution: '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap </a>| Map data © 2021 <a href="https://www.fundacionmatrix.es"><strong>Fundación Matrix</strong></a>',
	}).addTo(map);		
//			var positron = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
//			attribution: '©OpenStreetMap, ©CartoDB'
//			}).addTo(map);
//			var positronLabels = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
//			attribution: '©OpenStreetMap, ©CartoDB',
//			pane: 'labels'
//			}).addTo(map);
var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: 'Map data &copy'
	});
var osm1 = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 18,
	opacity: 0,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	});
var osm2 = new L.TileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	minZoom: 0, 
	maxZoom: 13,
	});
var osm3 = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, opacity: 0.4, 
	attribution: '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap </a>| Map data © 2021 <a href="https://www.fundacionmatrix.es"><strong>Fundación Matrix</strong></a>',
	});


//Límites
/*var comunidades = L.geoJson(comunidades, {
	color: "#17202A", 
	weight: 1.4,
	opacity: 0.3,
	fillOpacity: 0,
		attribution: '| © <a href="http://www.ign.es">Instituto Geográfico Nacional |'			
	}).addTo(map);
*/

	
//Otras funcionalidades

//minimapa	
var miniMap = new L.Control.MiniMap(osm2, { toggleDisplay: true, position:"bottomright", width:100,height:100,}).addTo(map); 					
//zoomHome
var zoomHome = L.Control.zoomHome({ position: 'topleft', homeCoordinates:[40, -5], zoomHomeTitle:'Posición inicial'}).addTo(map);
//fullscreen						
var fsControl = new L.Control.FullScreen();
	map.addControl(fsControl);
	map.on('enterFullscreen', function(){
	if(window.console) window.console.log('enterFullscreen');
	});
	map.on('exitFullscreen', function(){
	if(window.console) window.console.log('exitFullscreen');
	});
	L.control.scale().addTo(map);

///////////Estilo de las capas especificas del visor///////////


//capas de limites

//prov_limit.js

function styleprov(feature) {
	return {
		//fillColor: getColor1(feature.properties.), aqui relleno no se asocia a ningun valor
		weight: 2,
		opacity: 1,
		color: 'black',
		dashArray: '0',
		fillOpacity: 1
	};

};

var prov = L.geoJson(prov_limit,{
	style: styleprov,
	
});


//estilo y popups de CO2 TOTAL


function getColor1(a) {
	return a < 0 ? '#1a9641' :
	a < 4  ? '#60b855' : 
	a < 8 ? '#a6d96a' :
	a < 16 ? '#d3ec95': 
	a < 32  ? '#ffffc0' :
	a < 64 ? '#fed791' :
	a < 128 ? '#fdae61' : 
	a < 256  ? '#ea633e' :
	a >=256.1  ? '#d7191c' :
		'YELLOW';
};


function style1(feature) {
	return {
		fillColor: getColor1(feature.properties.total), // MUY IMPORTANTE, NO OLVIDAR PONER NOMBRE DE CAMPO EN TABLA.(DESPUES DE PROPERTIES)
		weight: 0.5,
		opacity: 1,
		color: 'black',
		dashArray: '0',
		fillOpacity: 0.8
	};

};

function popup1(feature, layer) {

	if (feature.properties && feature.properties.total) {
		layer.bindTooltip("<div id='custom'>"
		+"<strong>Municipio: </strong>"+feature.properties.NAMEUNI.toLocaleString()+"<br>"
             	
             	+"<strong>CO<sub>2</sub>-eq: </strong>"+feature.properties.total.toFixed(2).toLocaleString().replace(".",",")+" kt",
			{direction:"centerleft",sticky:true, permanente:true,offset:[0,-5], pane: 'popups',});	
	};
};

var geojson1 = L.geoJson(tabla,{
	style: style1,
	onEachFeature: popup1

});


//estilos y pop up de CO2 TRANSPORTE

function getColor2(a) {
	return a < 0 ? '#1a9641' :
	a < 4  ? '#60b855' : 
	a < 8 ? '#a6d96a' :
	a < 16 ? '#d3ec95': 
	a < 32  ? '#ffffc0' :
	a < 64 ? '#fed791' :
	a < 128 ? '#fdae61' : 
	a < 256  ? '#ea633e' :
	a >=256.1  ? '#d7191c' :
		'YELLOW';
};


function style2(feature) {
	return {
		fillColor: getColor2(feature.properties.trnsprt),
		weight: 0.5,
		opacity: 1,
		color: 'black',
		dashArray: '0',
		fillOpacity: 0.8
	};

};
function popup2(feature, layer) {

	if (feature.properties && feature.properties.trnsprt) {
		layer.bindTooltip("<div id='custom'>"
		+"<strong>Municipio: </strong>"+feature.properties.NAMEUNI.toLocaleString()+"<br>"
             	
             	+"<strong>CO<sub>2</sub>-eq: </strong>"+feature.properties.trnsprt.toFixed(2).toLocaleString().replace(".",",")+" kt",
			{direction:"centerleft",sticky:true, permanente:true,offset:[0,-5], pane: 'popups',});	
	};
};

var geojson2 = L.geoJson(tabla, {
	style: style2,
	onEachFeature: popup2

});


//estilos y pop up de CO2 CARRETERA


function getColor3(a) {
	return a < 0 ? '#1a9641' :
	a < 4 ? '#60b855' :
	a < 8 ? '#a6d96a' :
	a < 16 ? '#d3ec95': 
	a < 32 ? '#ffffc0' :
	a < 64 ? '#fed791' :
	a < 128 ? '#fdae61': 
	a < 256 ? '#ea633e' :
	a >=256.1  ? '#d7191c' :	
	'YELLOW';
};
function style3(feature) {
	return {
		fillColor: getColor3(feature.properties.carretr),
		weight: 0.5,
		opacity: 1,
		color: 'black',
		dashArray: '0',
		fillOpacity: 0.8
	};

};
function popup3(feature, layer) {

	if (feature.properties && feature.properties.carretr) {
		layer.bindTooltip("<div id='custom'>"
            	+"<strong>Municipio: </strong>"+feature.properties.NAMEUNI.toLocaleString()+"<br>"

		+"<strong>CO<sub>2</sub>-eq: </strong>"+feature.properties.carretr.toFixed(2).toLocaleString().replace(".",",")+" kt",
			{direction:"centerleft",sticky:true, permanente:true,offset:[0,-5], pane: 'popups',});	
	};
};

var geojson3 = L.geoJson(tabla, {
	style: style3,
	onEachFeature: popup3
});


//estilos y pop up de CO2 RESIDENCIAL


function getColor4(a) {
	return a < 0.1 ? '#1a9641' :
	a < 4 ? '#60b855' :
	a < 8 ? '#a6d96a' :
	a < 16 ? '#d3ec95': 
	a < 32 ? '#ffffc0' :
	a < 64 ? '#fed791' :
	a < 128 ? '#fdae61': 
	a < 256 ? '#ea633e' :
	a >=256.1 ? '#d7191c' :	
	'YELLOW';
};
function style4(feature) {
	return {
		fillColor: getColor4(feature.properties.resdncl),
		weight: 0.5,
		opacity: 1,
		color: 'black',
		dashArray: '0',
		fillOpacity: 0.8
	};

};
function popup4(feature, layer) {

	if (feature.properties && feature.properties.resdncl) {
		layer.bindTooltip("<div id='custom'>"
             	+"<strong>Municipio: </strong>"+feature.properties.NAMEUNI.toLocaleString()+"<br>"
             	
             	+"<strong>CO<sub>2</sub>-eq: </strong>"+feature.properties.resdncl.toFixed(2).toLocaleString().replace(".",",")+" kt",
			{direction:"centerleft",sticky:true, permanente:true,offset:[0,-5], pane: 'popups',});	
	};
};



var geojson4 = L.geoJson(tabla, {
	style: style4,
	onEachFeature: popup4
});


//capas de limites. La última capa en declarar se ubica siempre encima de las demás.

// rios.js
/*
function stylerios(feature) {
	return {
		//fillColor: getColor1(feature.properties.), aqui relleno no se asocia a ningun valor
		weight: 3,
		opacity: 1,
		color: '#42f5ef',
		dashArray: '0',
		//fillOpacity: 0.8
	};

};

var rios = L.geoJson(rios,{
	style: stylerios,
	
}).addTo(map);

//Buscador de ríos

var searchControl = new L.Control.Search({
       layer: rios,
       propertyName: 'NOM_RIO',
       marker: false,
		moveToLocation: function(latlng) {
			console.log(latlng +" Coordinates");
  			map.setView(latlng, 10); // set the zoom
		}
});

map.addControl(searchControl);
*/

//Renombrado y ordenado de capas mapas geojson

var mapa1 = L.layerGroup([geojson1]).addTo(map);
var mapa2 = L.layerGroup([geojson2]);
var mapa3 = L.layerGroup([geojson3]);
var mapa4 = L.layerGroup([geojson4]);
/*var mapa5 = L.layerGroup([geojson5]);
var mapa6 = L.layerGroup([geojson6]);
*/


// LISTA DESPLEGABLE

var baseTree = [
	{ label: "<strong>Limpiar mapa", layer: osm3 },
	{
	label: '<strong>Emisiones difusas de CO<sub>2</sub> en España',
	children: [
	
	    { label: "Emisión total anual de CO<sub>2</sub>",layer: mapa1},
		{ label: "Emisión anual de CO<sub>2</sub> del sector de transporte",layer: mapa2},
	    { label: "Emisión anual de CO<sub>2</sub> del transporte por carretera",layer: mapa3},
		{ label: "Emisión anual de CO<sub>2</sub> del sector RCI",layer: mapa4},

		 ]
	},
	];
	
var overlayTree = {
	label: 'Mapas de referencia',
	children: [
	
		//{ label: "<b>Límites de Comunidades Autónomas", layer: comunidades},
		{ label: "OpenStreetMap", layer: osm},
		{ label: "Provincias", layer:prov},

		]
};	

//TOTAL CO2

var htmlLegend1 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h2>"+ 'Emisión total anual de CO<sub>2</sub>'+"<\h2>",
			style: style1,
			layer: geojson1,
			elements: [{


				label:"<h4>"+  '<br>Emisión antropogénica total de fuentes difusas de la Península e Islas Baleares<br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
		        label:"<h3>"+  '<br> kt CO<sub>2</sub>-eq'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				//label:"<strong><h3>"+  '0 - 0'+"</strong><\h15>",html: '',style: {'background-color': '#1a9641','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '0,1 - 4,0'+"</strong><\h15>",html: '',style: {'background-color': '#60b855','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '4,1 - 8,0'+"</strong><\h15>",html: '',style: {'background-color': '#a6d96a','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '8,1 - 16,0'+"</strong><\h15>",html: '',style: {'background-color': '#d3ec95','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '16,1 - 32,0'+"</strong><\h15>",html: '',style: {'background-color': '#ffffc0','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '32,1 - 64,0'+"</strong><\h15>",html: '',style: {'background-color': '#fed791','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '64,1 - 128,0'+"</strong><\h15>",html: '',style: {'background-color': '#fdae61','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '128,1 - 256,0'+"</strong><\h15>",html: '',style: {'background-color': '#ea633e','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '>256,0'+"</strong><\h15>",html: '',style: {'background-color': '#d7191c','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				
				label: "<h5>" +'<BR><i>Fuente: Elaboración propia desde datos de emisiones de 2008 y mapas de ocupación del suelo CLC-2006, AEMA (2011)<i><BR>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend1);


//TRANSPORTE CO2

var htmlLegend2 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h2>"+ 'Emisión anual de CO<sub>2</sub> del sector de transporte'+"<\h2>",
			style: style2,
			layer: geojson2,
			elements: [{


				label:"<h4>"+  '<br>Emisión de la Península e Islas Baleares<br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
		        	label:"<h3>"+  '<br> kt CO<sub>2</sub>-eq'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				//label:"<strong><h3>"+  '0 - 0'+"</strong><\h15>",html: '',style: {'background-color': '#1a9641','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '0,1 - 4,0'+"</strong><\h15>",html: '',style: {'background-color': '#60b855','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '4.1 - 8,0'+"</strong><\h15>",html: '',style: {'background-color': '#a6d96a','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '8,1 - 16,0'+"</strong><\h15>",html: '',style: {'background-color': '#d3ec95','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '16,1 - 32,0'+"</strong><\h15>",html: '',style: {'background-color': '#ffffc0','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '32,1 - 64,0'+"</strong><\h15>",html: '',style: {'background-color': '#fed791','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '64,1 - 128,0'+"</strong><\h15>",html: '',style: {'background-color': '#fdae61','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '128,1 - 256,0'+"</strong><\h15>",html: '',style: {'background-color': '#ea633e','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '>256,0'+"</strong><\h15>",html: '',style: {'background-color': '#d7191c','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				
				label: "<h5>" +'<BR><i>Fuente: Elaboración propia desde datos de emisiones de 2008 y mapas de ocupación del suelo CLC-2006, AEMA (2011)<i><BR>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend2);


//CARRETERA CO2

var htmlLegend3 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h2>"+ 'Emisión anual de CO<sub>2</sub> del transporte por carretera'+"<\h2>",
			style: style3,
			layer: geojson3,
			elements: [{


				label:"<h4>"+  '<br>Emisión de la Península e Islas Baleares<br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
		       	label:"<h3>"+  '<br> kt CO<sub>2</sub>-eq'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				//label:"<strong><h3>"+  '0 ‒ 0'+"</strong><\h15>",html: '',style: {'background-color': '#1a9641','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '0,1 ‒ 4,0'+"</strong><\h15>",html: '',style: {'background-color': '#60b855','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '4,1 ‒ 8,0'+"</strong><\h15>",html: '',style: {'background-color': '#a6d96a','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '8,1 ‒ 16,0'+"</strong><\h15>",html: '',style: {'background-color': '#d3ec95','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '16,1 ‒ 32,0'+"</strong><\h15>",html: '',style: {'background-color': '#ffffc0','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '32,1 ‒ 64,0'+"</strong><\h15>",html: '',style: {'background-color': '#fed791','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '64,1 ‒ 128,0'+"</strong><\h15>",html: '',style: {'background-color': '#fdae61','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '128,1 ‒ 256,0'+"</strong><\h15>",html: '',style: {'background-color': '#ea633e','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '>256,0'+"</strong><\h15>",html: '',style: {'background-color': '#d7191c','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				
				label: "<h5>" +'<BR><i>Fuente: Elaboración propia desde datos de emisiones de 2008 y mapas de ocupación del suelo CLC-2006, AEMA (2011)<i><BR>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend3);



//RESIDENCIAL CO2


var htmlLegend4 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h2>"+ 'Emisión total anual de CO<sub>2</sub> del sector RCI'+"<\h2>",
			style: style4,
			layer: geojson4,
			elements: [{


				label:"<h4>"+  '<br>Emisión del sector residencial, comercial e institucional de Península y Baleares<br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
		       	label:"<h3>"+  '<br> kt CO<sub>2</sub>-eq'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<strong><h3>"+  '<0,1'+"</strong><\h15>",html: '',style: {'background-color': '#1a9641','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '0,1 ‒ 4,0'+"</strong><\h15>",html: '',style: {'background-color': '#60b855','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '4,1 ‒ 8,0'+"</strong><\h15>",html: '',style: {'background-color': '#a6d96a','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '8,1 ‒ 16,0'+"</strong><\h15>",html: '',style: {'background-color': '#d3ec95','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '16,1 ‒ 32,0'+"</strong><\h15>",html: '',style: {'background-color': '#ffffc0','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '32,1 ‒ 64,0'+"</strong><\h15>",html: '',style: {'background-color': '#fed791','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '64.1 ‒ 128,0'+"</strong><\h15>",html: '',style: {'background-color': '#fdae61','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '128,1 ‒ 256,0'+"</strong><\h15>",html: '',style: {'background-color': '#ea633e','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '>256,0'+"</strong><\h15>",html: '',style: {'background-color': '#d7191c','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				
				label: "<h5>" +'<BR><i>Fuente: Elaboración propia desde datos de emisiones de 2008 y mapas de ocupación del suelo CLC-2006, AEMA (2011)<i><BR>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend4);




//Visualizar capas
// L.control.layers(baseLayers, overlays,{collapsed:true, position: 'topright',}).addTo(map);
L.control.layers.tree(baseTree, overlayTree).addTo(map);

//boton de informacion 
var button2 = new L.Control.Button(L.DomUtil.get('helpbutton2'), { toggleButton: 'active', position: 'topright'});
	button2.addTo(map);
	button2.on('click', function () {
	 if (button2.isToggled()) {
			sidebar2.hide();
		} else {
			sidebar2.show();
		}
	});