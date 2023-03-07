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




let addAlbum = false;

const addAlbumBtn = document.getElementById("new-album-btn");
const albumFormContainer = document.getElementById("form-container");

addAlbumBtn.addEventListener("click", () => {
    addAlbum = !addAlbum;
    if (addAlbum) {
        albumFormContainer.style.display = "none";
    } else {
        albumFormContainer.style.display = "block";
    }
  });

  const albumForm = document.getElementById("add-album-form")
  albumForm.addEventListener("submit", (e) => {
    e.preventDefault()
    newAlbum();
    e.target.reset()
  })

  function newAlbum(){
    const albumTitle = document.getElementsByClassName("input-text")[0]
    const albumArtist = document.getElementsByClassName("input-text")[1]
    const albumArt = document.getElementsByClassName("input-text")[2]
    const albumGenre = document.getElementsByClassName("input-text")[3]
    const albumRealease = document.getElementsByClassName("input-text")[4]
    const albumBought = document.getElementsByClassName("input-text")[5]
    const albumRating = document.getElementsByClassName("input-text")[6]
    const div = document.createElement("div")

      fetch("http://localhost:3000/music", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          title: albumTitle.value,
          artist: albumArtist.value,
          artwork: albumArt.value,
          genre: albumGenre.value,
          release_date: albumRealease.value,
          date_added: albumBought.value,
          rating: albumRating.value,
        })
      })
      .then(response => response.json())
      .then(newAlbum => renderAlbum(newAlbum,div))
  }

