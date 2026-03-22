/*
	Josiah Keene
	index.js
	2/21/26
*/

/* map loading script */
mapboxgl.accessToken = 'pk.eyJ1Ijoiam9zaWFoLW1hcHMiLCJhIjoiY21sZ3U4djQ0MDJlYzNsb2dtNTBuZGE5MyJ9.Iv0kCNtiadm1dKpLtRTmtQ';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: [-98.58, 39.83], // starting position [lng, lat]
    zoom: 4 // starting zoom
});

/* line drawing script */
const draw = new MapboxDraw({
    displayControlsDefault: false,
    defaultMode: 'draw_line_string'
});

/* listener open options menu */
const optionsOpenButton = document.getElementById('user-options');
optionsOpenButton.addEventListener('click',toggleOptionsMenu);

/* listener close options menu */
const optionsCloseButton = document.getElementById('options-close');
optionsCloseButton.addEventListener('click',toggleOptionsMenu);

/* toggle options menu */
function toggleOptionsMenu() {
    const defaultMenu = document.getElementById('default-menu');
    const optionsMenu = document.getElementById('options-menu');
    const routeDrawer = document.getElementById('route-drawer');
    const profileDrawer = document.getElementById('profile-drawer');
    const addButton = document.getElementById('add');

    /* switch between the default menu and the options menu as appropriate, hiding the add button while showing the options menu */
    if (defaultMenu.classList.contains('show')) {
        /* close route drawer if it is open */
        if (routeDrawer.classList.contains('open')) {
            toggleRouteDrawer();
        }
        defaultMenu.classList.remove('show');
        defaultMenu.classList.add('hide');
        optionsMenu.classList.remove('hide');
        optionsMenu.classList.add('show');
        addButton.classList.remove('show');
        addButton.classList.add('hide');
    } else {
        /* close profile drawer if it is open */
        if (profileDrawer.classList.contains('open')) {
            toggleProfileDrawer();
        }
        optionsMenu.classList.remove('show');
        optionsMenu.classList.add('hide');
        defaultMenu.classList.remove('hide');
        defaultMenu.classList.add('show');
        addButton.classList.remove('hide');
        addButton.classList.add('show');

    };
};

/* listener toggle route drawer button */
const routeToggleButton = document.getElementById('route-toggle');
routeToggleButton.addEventListener('click',toggleRouteDrawer);

/* listener close route drawer button */
const routeCancelButton = document.getElementById('route-cancel');
routeCancelButton.addEventListener('click',toggleRouteDrawer);

/* toggle route drawer */
function toggleRouteDrawer() {
    const drawer = document.getElementById('route-drawer');
    const addButton = document.getElementById('add');
    
    /* open or close the route drawer as appropriate, hiding the add button while the drawer is open */
    if (drawer.classList.contains('closed')) {
        drawer.classList.remove('closed');
        drawer.classList.add('open');
        addButton.classList.remove('show');
        addButton.classList.add('hide');
    } else {
        drawer.classList.remove('open');
        drawer.classList.add('closed');
        addButton.classList.remove('hide');
        addButton.classList.add('show');
    };
    
};

/* listener toggle profile drawer button */
const profileToggleButton = document.getElementById('profile-settings');
profileToggleButton.addEventListener('click',toggleProfileDrawer);

/* listener close profile drawer button */
const profileCloseButton = document.getElementById('close-profile');
profileCloseButton.addEventListener('click',toggleProfileDrawer);

/* toggle profile drawer */
function toggleProfileDrawer() {
    const drawer = document.getElementById('profile-drawer');
    
    /* open or close the profile drawer as appropriate */
    if (drawer.classList.contains('closed')) {
        drawer.classList.remove('closed');
        drawer.classList.add('open');
    } else {
        drawer.classList.remove('open');
        drawer.classList.add('closed');
    };
    
};

/* listener add route button */
const addRouteButton = document.getElementById('add');
addRouteButton.addEventListener('click',toggleAddRouteScreen);

/* listener add route button */
const cancelAddRouteButton = document.getElementById('cancel-add-route');
cancelAddRouteButton.addEventListener('click',tryCloseNewRouteDrawer);
cancelAddRouteButton.addEventListener('click',toggleAddRouteScreen);

/* add route screen */
function toggleAddRouteScreen() {
    const addButton = document.getElementById('add');
    const routeMenu = document.getElementById('add-route-menu');
    const defaultMenu = document.getElementById('default-menu');
    
    if (addButton.classList.contains('show')) {
        addButton.classList.remove('show');
        addButton.classList.add('hide');
        defaultMenu.classList.remove('show');
        defaultMenu.classList.add('hide');
        routeMenu.classList.remove('hide');
        routeMenu.classList.add('show');
        map.addControl(draw);
    } else {
        routeMenu.classList.remove('show');
        routeMenu.classList.add('hide');
        defaultMenu.classList.remove('hide');
        defaultMenu.classList.add('show');
        addButton.classList.remove('hide');
        addButton.classList.add('show');
        map.removeControl(draw);
    };
};

/* listener toggle new route drawer button */
const newRouteToggleButton = document.getElementById('new-route-toggle');
newRouteToggleButton.addEventListener('click',toggleNewRouteDrawer);

/* listener close new route drawer button */
const newRouteCloseButton = document.getElementById('close-new-route');
newRouteCloseButton.addEventListener('click',toggleNewRouteDrawer);

/* toggle new route drawer */
function toggleNewRouteDrawer() {
    const drawer = document.getElementById('new-route-drawer');
    
    /* open or close the new route drawer as appropriate */
    if (drawer.classList.contains('closed')) {
        drawer.classList.remove('closed');
        drawer.classList.add('open');
    } else {
        drawer.classList.remove('open');
        drawer.classList.add('closed');
    };
    
};

/* close new route drawer if open */
function tryCloseNewRouteDrawer() {
    const drawer = document.getElementById('new-route-drawer');
    
    /* close the new route drawer if it is open */
    if (drawer.classList.contains('open')) {
        drawer.classList.remove('open');
        drawer.classList.add('closed');
    };
};

/* listener reset route trace button */
const resetRouteTraceButton = document.getElementById('reset-route-trace');
resetRouteTraceButton.addEventListener('click',resetRouteTrace);

/* Reset the trace if a mistake was made */
function resetRouteTrace() {
    draw.deleteAll()
    draw.changeMode('draw_line_string')
}


/* map.on('load', () => {
    map.addSource('route', {
        'type': 'geojson',
        'data': {
            'type': 'Feature',
            'properties': {},
            'geometry': {
                'type': 'LineString',
                'coordinates': [
                    [-122.483696, 37.833818],
                    [-122.483482, 37.833174],
                    [-122.483396, 37.8327],
                    [-122.483568, 37.832056],
                    [-122.48404, 37.831141],
                    [-122.48404, 37.830497],
                    [-122.483482, 37.82992],
                    [-122.483568, 37.829548],
                    [-122.48507, 37.829446],
                    [-122.4861, 37.828802],
                    [-122.486958, 37.82931],
                    [-122.487001, 37.830802],
                    [-122.487516, 37.831683],
                    [-122.488031, 37.832158],
                    [-122.488889, 37.832971],
                    [-122.489876, 37.832632],
                    [-122.490434, 37.832937],
                    [-122.49125, 37.832429],
                    [-122.491636, 37.832564],
                    [-122.492237, 37.833378],
                    [-122.493782, 37.833683]
                ]
            }
        }
    });
    map.addLayer({
        'id': 'route',
        'type': 'line',
        'source': 'route',
        'layout': {
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
            'line-color': '#888',
            'line-width': 8
        }
    });
}); */