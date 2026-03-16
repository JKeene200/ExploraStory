/*
	Josiah Keene
	index.js
	2/21/26
*/

/* listener open options menu */
const optionsOpenButton = document.getElementById('user-options')
optionsOpenButton.addEventListener('click',toggleOptionsMenu)

/* listener close options menu */
const optionsCloseButton = document.getElementById('options-close')
optionsCloseButton.addEventListener('click',toggleOptionsMenu)

/* toggle options menu */
function toggleOptionsMenu() {
    const defaultMenu = document.getElementById('default-menu')
    const optionsMenu = document.getElementById('options-menu')
    const routeDrawer = document.getElementById('route-drawer')
    const profileDrawer = document.getElementById('profile-drawer')
    const addButton = document.getElementById('add')

    /* switch between the default menu and the options menu as appropriate, hiding the add button while showing the options menu */
    if (defaultMenu.classList.contains("show")) {
        /* close route drawer if it is open */
        if (routeDrawer.classList.contains('open')) {
            toggleRouteDrawer()
        }
        defaultMenu.classList.remove("show")
        defaultMenu.classList.add("hide")
        optionsMenu.classList.remove("hide")
        optionsMenu.classList.add("show")
        addButton.classList.remove('show')
        addButton.classList.add('hide')
    } else {
        /* close profile drawer if it is open */
        if (profileDrawer.classList.contains('open')) {
            toggleProfileDrawer()
        }
        optionsMenu.classList.remove("show")
        optionsMenu.classList.add("hide")
        defaultMenu.classList.remove("hide")
        defaultMenu.classList.add("show")
        addButton.classList.remove('hide')
        addButton.classList.add('show')

    };
}

/* listener toggle route drawer button */
const routeToggleButton = document.getElementById('route-toggle')
routeToggleButton.addEventListener('click',toggleRouteDrawer)

/* listener close route drawer button */
const routeCancelButton = document.getElementById('route-cancel')
routeCancelButton.addEventListener('click',toggleRouteDrawer)

/* toggle route drawer */
function toggleRouteDrawer() {
    const drawer = document.getElementById('route-drawer')
    const addButton = document.getElementById('add')
    
    /* open or close the route drawer as appropriate, hiding the add button while the drawer is open */
    if (drawer.classList.contains("closed")) {
        drawer.classList.remove("closed")
        drawer.classList.add("open")
        addButton.classList.remove('show')
        addButton.classList.add('hide')
    } else {
        drawer.classList.remove("open")
        drawer.classList.add("closed")
        addButton.classList.remove('hide')
        addButton.classList.add('show')
    }
    
}

/* listener toggle profile drawer button */
const profileToggleButton = document.getElementById('profile-settings')
profileToggleButton.addEventListener('click',toggleProfileDrawer)

/* listener close profile drawer button */
const profileCloseButton = document.getElementById('close-profile')
profileCloseButton.addEventListener('click',toggleProfileDrawer)

/* toggle profile drawer */
function toggleProfileDrawer() {
    const drawer = document.getElementById('profile-drawer')
    
    /* open or close the profile drawer as appropriate */
    if (drawer.classList.contains("closed")) {
        drawer.classList.remove("closed")
        drawer.classList.add("open")
    } else {
        drawer.classList.remove("open")
        drawer.classList.add("closed")
    }
    
}

/* listener add route button */
const addRouteButton = document.getElementById('add')
addRouteButton.addEventListener('click',toggleAddRouteScreen)

/* listener add route button */
const cancelAddRouteButton = document.getElementById('cancel-add-route')
cancelAddRouteButton.addEventListener('click',toggleAddRouteScreen)

/* add route screen */
function toggleAddRouteScreen() {
    const addButton = document.getElementById('add')
    const routeMenu = document.getElementById('add-route-menu')
    const defaultMenu = document.getElementById('default-menu')

    if (addButton.classList.contains('show')) {
        addButton.classList.remove('show')
        addButton.classList.add('hide')
        defaultMenu.classList.remove('show')
        defaultMenu.classList.add('hide')
        routeMenu.classList.remove('hide')
        routeMenu.classList.add('show')
    } else {
        routeMenu.classList.remove('show')
        routeMenu.classList.add('hide')
        defaultMenu.classList.remove('hide')
        defaultMenu.classList.add('show')
        addButton.classList.remove('hide')
        addButton.classList.add('show')
    }
}

/* listener toggle new route drawer button */
const newRouteToggleButton = document.getElementById('new-route-toggle')
newRouteToggleButton.addEventListener('click',toggleNewRouteDrawer)

/* listener close new route drawer button */
const newRouteCloseButton = document.getElementById('close-new-route')
newRouteCloseButton.addEventListener('click',toggleNewRouteDrawer)

/* toggle new route drawer */
function toggleNewRouteDrawer() {
    const drawer = document.getElementById('new-route-drawer')
    
    /* open or close the new route drawer as appropriate */
    if (drawer.classList.contains("closed")) {
        drawer.classList.remove("closed")
        drawer.classList.add("open")
    } else {
        drawer.classList.remove("open")
        drawer.classList.add("closed")
    }
    
}