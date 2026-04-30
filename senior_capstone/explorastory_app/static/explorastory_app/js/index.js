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

/* function to hide and show elements as needed, accepts a list of elements */
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

/* drag event listeners */
document.addEventListener('DOMContentLoaded', dragListener);

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
    /* close modify route menu if it is open, logic is in the called function */
    closeModifyRoute();
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
cancelAddRouteButton.addEventListener('click',hideNextButton);
cancelAddRouteButton.addEventListener('click',toggleAddRouteScreen);

/* listener close new route instructions box button */
const closeNewRouteInstructions = document.getElementById('instructions-popup-close');
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
const routeNextButton = document.getElementById('route-next');
routeNextButton.addEventListener('click',toggleNewRouteDrawer);

/* toggle next button visibility when called */
function toggleNextButton() {
    const button = document.getElementById('route-next');
    toggleHideElements([button]);
};

function hideNextButton() {
    const button = document.getElementById('route-next');
    if (button.classList.contains('show')) {
        toggleNextButton();
    };
};

/* listener close new route drawer button */
const newRouteCloseButton = document.getElementById('close-new-route');
newRouteCloseButton.addEventListener('click',toggleNewRouteDrawer);

/* toggle new route drawer */
function toggleNewRouteDrawer() {
    const drawer = document.getElementById('new-route-drawer');
    const colorPicker = document.getElementById('id_route_color');
    const instructionsBox = document.getElementById('new-route-instructions');
    const nextButton = document.getElementById('route-next');


    /* open or close the new route drawer as appropriate, hide new route instructions if needed*/
    if (instructionsBox.classList.contains('show')) {
        toggleHideElements([instructionsBox]);
    };
    if ((drawer.classList.contains('hide') && nextButton.classList.contains('show')) || (drawer.classList.contains('show') && nextButton.classList.contains('hide'))) {
        toggleNextButton();
    };
    toggleHideElements([drawer]);
    /* set the color picker to the default color */
    colorPicker.value = '#9999ff';
};

/* close new route drawer if open */
function tryCloseNewRouteDrawer() {
    const drawer = document.getElementById('new-route-drawer');
    
    /* close the new route drawer if it is open */
    if (drawer.classList.contains('show')) {
        toggleHideElements([drawer]);
    };
};

/* route reorder code below */
function dragListener() {
    const routeContainer = document.getElementById('route-container');
    const routes = routeContainer.querySelectorAll('li');
    let routeStart, routeNew, route1, route2;

    for (li of routes) {
        li.ondragstart = function(){
            route1 = this;
        };

        li.ondragover = (e) => e.preventDefault();
        
        li.ondrop = function(){
            route2 = this;
            swapRoutes(route1, route2);
        };
    };
};

/* swap routes in list and on map */
function swapRoutes(route1, route2) {
    const parent = route1.parentNode;
    const nextRoute = route2.nextElementSibling;

    /* If route2 is right after route1, use adjacent logic */
    if (nextRoute === route1) {
        parent.insertBefore(route1, route2);
    } else {
        /* Replace route1 with route2 */
        route1.replaceWith(route2);
        
        /* Insert route1 back into route2's original position */
        if (nextRoute) {
            parent.insertBefore(route1, nextRoute);
        } else { /* if nextRoute does not exist */
            parent.appendChild(route1);
        };
    };

    /* update the route order in the order form */
    saveRouteOrder();

    /* find the last route in the list */
    const lastRoute = parent.lastElementChild;

    /* update the layers of all routes */
    const routes = getAllPreviousSiblings(lastRoute);
    for (route of routes) {
        /* get the next sibling, and place it after the route using the layer ids defined when the layers were created*/
        map.moveLayer('route' + String(route.nextElementSibling.getAttribute('route-id')), 'route' + String(route.getAttribute('route-id')));
    };
};

/* function to get all routes above the moved route */
function getAllPreviousSiblings(element) {
    let siblings = [];
    while (element = element.previousElementSibling) {
        siblings.unshift(element);
    }
    return siblings;
};

/* function to update the new order and opacity of the routes */
function saveRouteOrder() {
    const routeContainer = document.getElementById('route-container');
    const routes = routeContainer.querySelectorAll('li');
    const routeOrder = [];
    const routeOpacity = [];

    /* fill arrays with the route order and opacity */
    for (li of routes) {
        routeOrder.push(li.getAttribute('route-id'));
        routeOpacity.push(li.getAttribute('route-visible'));
    };

    /* combile the arrays into csv strings */
    const orderString = routeOrder.join(',');
    const opacityString = routeOpacity.join(',');

    /* update the route order and opacity in the form */
    document.getElementById('id_route_order').value = orderString;
    document.getElementById('id_route_opacity').value = opacityString;

};

/* listener for modify route buttons */
const modifyButtonContainer = document.getElementById('route-container');
modifyButtonContainer.addEventListener('click', routesOptionsButtons);

/* listener for close modify route button*/
const closeModifyRouteButton = document.getElementById('close-route-details');
closeModifyRouteButton.addEventListener('click', closeModifyRoute);

/* open the modify route drawer and populate the form with the appropriate data */
function routesOptionsButtons(e) {
    const modifyDrawer = document.getElementById('route-details-drawer');
    /* if called by route-details button, populate form */
    if (e.target.classList.contains('route-details')) {
        let routeId = e.target.id;
        let myData = JSON.parse(document.getElementById('data-storage').textContent);
        let route = myData.features.find(f => f.id == routeId);

        /* populate form with appropriate data */
        document.getElementById('id_route_id').value = routeId;
        document.getElementById('id_change_route_name').value = route.properties.route_name;
        document.getElementById('id_change_route_date').value = route.properties.route_date;
        document.getElementById('id_change_route_color').value = route.properties.route_color;
        document.getElementById('id_change_route_note').value = route.properties.route_note;

        /* also poulate delete form, in case it is needed */
        document.getElementById('delete_route_id').value = routeId;
        toggleHideElements([modifyDrawer]);
    };
    /* if called by opacity toggle, toggle the route's opacity */
    if (e.target.classList.contains('opacity-toggle')) {
        let routeId = e.target.id;
        let routeOpacity = e.target.closest('#route-data').getAttribute('route-visible');
        /* using the layer ids defined when the layers were created, toggle the route layer opacity */
        if (routeOpacity == 'True') {
            e.target.closest('#route-data').setAttribute('route-visible', 'False');
            map.setLayoutProperty('route' + routeId, 'visibility', 'none');
        } else {
            e.target.closest('#route-data').setAttribute('route-visible', 'True');
            map.setLayoutProperty('route' + routeId, 'visibility', 'visible');
        };
        /* toggle text for hide/show */
        if (e.target.textContent == 'Show') {
            e.target.textContent = "Hide";
        } else {
            e.target.textContent = "Show";
        }

        /* update the route's opacity in the order form */
        saveRouteOrder();
    };
};

function closeModifyRoute() {
    const modifyDrawer = document.getElementById('route-details-drawer');
    /* close drawer if open */
    if (modifyDrawer.classList.contains('show')) {
        toggleHideElements([modifyDrawer])
    }
}

/* listener for delete route button */
const deleteRouteButton = document.getElementById('delete-route');
deleteRouteButton.addEventListener('click', toggleDeleteRoutePopup);

/* listener for cancel delete route button */
const cancelDeleteRouteButton = document.getElementById('cancel-delete');
cancelDeleteRouteButton.addEventListener('click', toggleDeleteRoutePopup);

/* listener for close delete route button */
const closeDeleteRouteButton = document.getElementById('delete-popup-close');
closeDeleteRouteButton.addEventListener('click', toggleDeleteRoutePopup);

/* open the delete route menu */
function toggleDeleteRoutePopup() {
    const popup = document.getElementById('delete-route-popup');
    toggleHideElements([popup]);
}

/* listener reset route trace button */
const resetRouteTraceButton = document.getElementById('reset-route-trace');
resetRouteTraceButton.addEventListener('click', resetRouteTrace);

/* Reset the trace if a mistake was made */
function resetRouteTrace() {
    draw.deleteAll();
    draw.changeMode('draw_line_string');
    tryCloseNewRouteDrawer();
    hideNextButton();
}

/* new route addition logic below */
/* call function to update the route form as needed */
map.on('draw.create', updateLine);
map.on('draw.create', toggleNewRouteDrawer);
map.on('draw.update', updateLine);

/* update the trace coordinates in the form */
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
    let route_id = 'route' + String(feature.id);
    let route_coords = feature.geometry.coordinates;
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
    let route_id = 'route' + String(feature.id);
    let color = String(feature.properties.route_color);
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
    if (!feature.properties.route_visible) {
        map.setLayoutProperty(route_id, 'visibility', 'none');
    }
}


