fetch("http://localhost:3000/music")
.then(response => response.json())
.then(albums => albums.forEach(album => renderAlbum(album)))

function renderAlbum(album){
    const albumContainer = document.getElementById("album-Container");
    const div = document.createElement("div");
    albumContainer.append(div);
    const img = document.createElement("img");
    const artist = document.createElement("h3");
    const title = document.createElement("h3");
    const genre = document.createElement("h3");
    const dateReleased = document.createElement("h3");
    const dateBought = document.createElement("h3");
    img.src = album.artwork;
    artist.innerText = album.artist;
    title.innerText = album.title;
    genre.innerText = album.genre;
    dateReleased.innerText = `Release Date: ${album.release_date}`;
    dateBought.innerText = `Purchase Date: ${album.date_added}`;
    div.append(img, artist, title, genre, dateReleased, dateBought);

    

}