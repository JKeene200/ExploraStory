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

/*  */
function toggleHideElements(itemArray) {
    for (const item of itemArray) {
        if (item.classList.contains('show')) {
            item.classList.remove('show')
            item.classList.add('hide')
        } else {
            item.classList.remove('hide')
            item.classList.add('show')
        }
    }
}

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
        if (routeDrawer.classList.contains('show')) {
            toggleRouteDrawer();
        }
        toggleHideElements([defaultMenu, optionsMenu, addButton]);
    } else {
        /* close profile drawer if it is open */
        if (profileDrawer.classList.contains('show')) {
            toggleProfileDrawer();
        }
        toggleHideElements([optionsMenu, defaultMenu, addButton]);
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
    toggleHideElements([drawer, addButton]);
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
    toggleHideElements([drawer]);
};

/* listener add route button */
const addRouteButton = document.getElementById('add');
addRouteButton.addEventListener('click',toggleAddRouteScreen);

/* listener add route button */
const cancelAddRouteButton = document.getElementById('cancel-add-route');
cancelAddRouteButton.addEventListener('click',tryCloseNewRouteDrawer);
cancelAddRouteButton.addEventListener('click',toggleAddRouteScreen);

/* listener close new route instructions box button */
const closeNewRouteInstructions = document.getElementById('instructions-close');
closeNewRouteInstructions.addEventListener('click',toggleNewRouteInstructions);

/* add route screen */
function toggleAddRouteScreen() {
    const addButton = document.getElementById('add');
    const routeMenu = document.getElementById('add-route-menu');
    const defaultMenu = document.getElementById('default-menu');
    const instructionsBox = document.getElementById('new-route-instructions');
    
    if (addButton.classList.contains('show')) {
        toggleHideElements([addButton, defaultMenu, routeMenu]);
        toggleNewRouteInstructions();
        map.addControl(draw);
    } else {
        /* if instructions box is open, close it */
        if (instructionsBox.classList.contains('show')) {
            toggleNewRouteInstructions();
        };
        toggleHideElements([routeMenu, defaultMenu, addButton]);
        map.removeControl(draw);
    };
};

/* toggle new route instructions */
function toggleNewRouteInstructions() {
    const instructionsBox = document.getElementById('new-route-instructions');

    /* hide of show the new route instructions as appropriate */
    toggleHideElements([instructionsBox]);
}

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
    toggleHideElements([drawer]);
    
};

/* close new route drawer if open */
function tryCloseNewRouteDrawer() {
    const drawer = document.getElementById('new-route-drawer');
    
    /* close the new route drawer if it is open */
    if (drawer.classList.contains('show')) {
        toggleHideElements([drawer]);
    };
};

/* listener reset route trace button */
const resetRouteTraceButton = document.getElementById('reset-route-trace');
resetRouteTraceButton.addEventListener('click',resetRouteTrace);

/* Reset the trace if a mistake was made */
function resetRouteTrace() {
    draw.deleteAll();
    draw.changeMode('draw_line_string');
}

/* new route addition logic below */
map.on('draw.create', updateLine);
map.on('draw.update', updateLine);

function updateLine(e) {
    let data = draw.getAll();
    let geometry = JSON.stringify(data.features[0].geometry);
    document.getElementById('id_route_data').value = geometry;
};

/* route display logic below */

/* parse data from database */
map.on('load', () => {
    let myData = JSON.parse(document.getElementById('data-storage').textContent);
    displayRoutes(myData);
});

/* add routes to map from json*/
function displayRoutes(data) {
    for (let feature of data.features) {
        addRouteSource(feature);
        renderRouteLayer(feature);
    };
};

/* add route data source to map */
function addRouteSource(feature) {
    let route_id = 'route' + String(feature.id)
    let route_coords = feature.geometry.coordinates
    map.addSource(route_id, {
        'type': 'geojson',
        'data': {
            'type': 'Feature',
            'properties': {},
            'geometry': {
                'type': 'LineString',
                'coordinates': route_coords
            }
        }
    });
}

/* render route on map from source */
function renderRouteLayer(feature) {
    let route_id = 'route' + String(feature.id)
    let color = String(feature.properties.route_color)
    map.addLayer({
        'id': route_id,
        'type': 'line',
        'source': route_id,
        'layout': {
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
            'line-color': color,
            'line-width': 5
        }
    });
}


