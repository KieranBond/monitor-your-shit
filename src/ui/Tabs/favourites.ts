import {displayData} from "../tab";
import {storedData} from "./settings";

export const openFavouritesTab = (event: Event) => {
    displayData(event, 'Favourites', async () => await html());
}

async function html() {
let favs = '';

    // if (storedData.favourites.length > 0) {
    //     await getFavs();
    // }

    return `
<h2>Tracking</h2>
${storedData.tracking || 'not tracking a build'}
<h2>Favourites</h2>
${favs || 'not tracking a build'}
<h2 id="add-fav">+</h2><input type="text" placeholder="repository"/><input type="text" placeholder="branch"/><button type="button">Add Favourite</button>
`
}
