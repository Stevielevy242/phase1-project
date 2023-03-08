const firstButton = document.getElementById("text-align");
const sorter = document.createElement("select");
firstButton.append(sorter);
const option1 = document.createElement("option");
option1.innerText = "Please Choose Sorting Method";
option1.value = "Please Choose Sorting Method"
option1.setAttribute('selected', 'selected');
option1.setAttribute('disabled', 'true');
const option2 = document.createElement("option");
option2.innerText = "Album (A-Z)";
option2.value = "Album";
const option3 = document.createElement("option");
option3.innerText = "Artist (A-Z)";
option3.value = "Artist";
const option4 = document.createElement("option");
option4.innerText = "Date Added (Earliest - Latest)";
option4.value = "Date Added";
const option5 = document.createElement("option");
option5.innerText = "Release Date (Earliest - Latest)";
option5.value = "Release Date";
const option6 = document.createElement("option");
option6.innerText = "Rating (Highest - Lowest)";
option6.value = "Rating";
sorter.append(option1, option2, option3, option4, option5, option6)

let currentAlbums = []




fetch("http://localhost:3000/music")
.then(response => response.json())
.then(albums => { 
  currentAlbums = albums;
  albums.forEach(album =>{
    const div = document.createElement("div");
    div.className = "divAlbum"
    renderAlbum(album, div)})
  })
  

function renderAlbum(album, div){
    const albumContainer = document.getElementById("album-Container");
    albumContainer.append(div);
    const img = document.createElement("img");
    const artist = document.createElement("h3");
    const title = document.createElement("i");
    const genre = document.createElement("h5");
    genre.style.color = "red"
    const dateReleased = document.createElement("h5");
    const dateBought = document.createElement("h5");
    const rating = document.createElement("h3")
    const deleteBtn = document.createElement("button")
    img.src = album.artwork;
    artist.innerText = album.artist;
    title.innerText = album.title;
    genre.innerText = album.genre;
    dateReleased.innerText = `Release Date: ${album.release_date}`;
    dateBought.innerText = `Purchase Date: ${album.date_added}`;

    if(album.rating === "5"){
      rating.innerText = "Rating: ★★★★★";
    }
    else if(album.rating === "4"){
      rating.innerText = "Rating: ★★★★";
    }
    else if(album.rating === "3"){
      rating.innerText = "Rating: ★★★";
    }
    else if(album.rating === "2"){
      rating.innerText = "Rating: ★★";
    }
    else if(album.rating === "1"){
      rating.innerText = "Rating: ★";
    }
    else{
      rating.innerText = "Rating: No Stars";
    }

    deleteBtn.innerText = "Delete Album"

    div.append(img, artist, title, genre, dateReleased, dateBought, rating, deleteBtn);


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

    deleteBtn.addEventListener("click", () => deleteAlbum(album, div))

    function renderSongs(album, div){
      const songContainer = document.createElement("div");
      div.append(songContainer);
      const songList = document.createElement("ol");
      songContainer.append(songList)
      album.songs.forEach(song =>{
        const li = document.createElement("li");
        li.innerText = song;
        songList.append(li);
    })

  }
}

function deleteAlbum(album, div){
  fetch(`http://localhost:3000/music/${album.id}`, {
    method: "DELETE"
  })
  div.remove()
}

let addAlbum = true;

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
      .then(newAlbum => {
        currentAlbums = [...currentAlbums, newAlbum]
        renderAlbum(newAlbum,div)
      })
    
  }

  

