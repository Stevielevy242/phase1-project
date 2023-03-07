fetch("http://localhost:3000/music")
.then(response => response.json())
.then(albums => albums.forEach(album =>{
    const div = document.createElement("div");
    renderAlbum(album, div)}))

function renderAlbum(album, div){
    //const div = document.createElement("div");
    const albumContainer = document.getElementById("album-Container");
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
    let showImage = false;
    img.addEventListener("click", (e) => {
        showImage = !showImage
        const existingList = e.target.parentNode.lastChild;
        if (showImage){
            renderSongs(album, div);
        }
        else{
            existingList.remove();
        }
    })
}

function renderSongs(album, div){
    const songContainer = document.createElement("div");
    div.append(songContainer);
    const songList = document.createElement("ul");
    songContainer.append(songList)
    album.songs.forEach(song =>{
        const li = document.createElement("li");
        li.innerText = song;
        songList.append(li);
    })
    //console.log(album.songs)

}