const firstButton = document.getElementById("text-align");
const sorter = document.createElement("select");
sorter.id = "sorter";
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
    currentAlbums = albums
    sortAlbums(albums)
})

function renderAlbum(album, div){
    const albumDiv = document.createElement("div")
    albumDiv.className = "divAlbum"
    const albumContainer = document.getElementById("album-Container");
    albumContainer.append(albumDiv);
    const img = document.createElement("img");
    const artist = document.createElement("h3");
    const title = document.createElement("i");
    const genre = document.createElement("h5");
    genre.style.color = "red"
    const dateReleased = document.createElement("h5");
    const dateBought = document.createElement("h5");
    const rating = document.createElement("h3")
    const deleteBtn = document.createElement("button");
    const breakElement = document.createElement("br");
    const addSongBtn = document.createElement("button")
    addSongBtn.id = "add_songs"
    img.src = album.artwork;
    artist.innerText = album.artist;
    title.innerText = album.title;
    genre.innerText = album.genre;
    deleteBtn.innerText = "Delete Album"
    addSongBtn.innerText = "Add Songs!"
    dateReleased.innerText = `Release Date: ${album.release_date}`;
    dateBought.innerText = `Purchase Date: ${album.date_added}`;

    const songForm = document.createElement("form");
    songForm.id = "song_list_form";
    const songInput = document.createElement("input");
    const songSubmit = document.createElement("input")
    songForm.append(songInput, songSubmit);
    songInput.type = "text";
    songInput.name = "name";
    songInput.value = "";
    songInput.placeholder = "Enter song!";
    songInput.class = "input-text";
    songSubmit.type = "submit";
    songSubmit.name = "submit";
    songSubmit.value = "Add Song!"
    songSubmit.class = "submit"
    songForm.style.display = "none";

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

    albumDiv.append(img, artist, title, genre, dateReleased, dateBought, rating, addSongBtn, breakElement, deleteBtn, songForm);

    function renderSongs(album, albumDiv){
    const songContainer = document.createElement("div");
    songContainer.id = "songContainer"

      albumDiv.append(songContainer);
      const songList = document.createElement("ol");

      songContainer.append(songList)
      album.songs.forEach(song =>{
        const li = document.createElement("li");
        li.innerText = song;
        songList.append(li);
    })
    songContainer.style.display = "none";
  }

  renderSongs(album, albumDiv)

    let showImage = false;
    img.addEventListener("click", (e)=>{
      showImage = !showImage
      console.log(e.target.parentNode.lastChild)
      const currentSongs = e.target.parentNode.lastChild
      if (showImage){
        currentSongs.style.display = "block"
      }
      else {
        currentSongs.style.display = "none";
      }
    })


    deleteBtn.addEventListener("click", () => deleteAlbum(album, albumDiv))

    let showAddSongsBtn = true
    addSongBtn.addEventListener("click", (e) => {
      showAddSongsBtn = !showAddSongsBtn
      if (showAddSongsBtn){
        songForm.style.display = "none"
      }
      else {
        songForm.style.display = "block";
      }
    })

    songForm.addEventListener("submit", (e)=> {
      e.preventDefault()
      const currentSongs = e.target.parentNode.lastChild.firstChild
      const newSong = document.createElement("li")
      newSong.innerText = e.target.name.value;
      currentSongs.append(newSong)
      songForm.reset()

      album.songs = [...album.songs, newSong.innerText]
      console.log(album.songs)
      console.log(newSong.innerText)

      fetch(`http://localhost:3000/music/${album.id}`,{
        method: "PATCH",
        headers : {
          "Content-Type": "application/json" ,
        },
        body: JSON.stringify({
          "songs": album.songs
        })
      })
    })
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
          songs: []
        })
      })
      .then(response => response.json())
      .then(newAlbum => {
        currentAlbums = [...currentAlbums, newAlbum]
        console.log(currentAlbums)
        //Find way to check current sort    
        console.log(sorter.value)
        if (sorter.value == "Album"){
          const sortedAlbums = currentAlbums.sort((a,b) => (a.title > b.title) ? 1: -1)
          sortedAlbums.forEach(album => renderAlbum(album))
       }
       else if (sorter.value === "Artist"){
        const sortedAlbums = currentAlbums.sort((a, b) => (a.artist > b.artist)? 1: -1)
        sortedAlbums.forEach(album => renderAlbum(album))
      }
      else if (sorter.value === "Date Added"){
        const sortedAlbums = currentAlbums.sort((a, b) => (a.date_added > b.date_added)? 1: -1)
        sortedAlbums.forEach(album => renderAlbum(album))
      }
      else if (sorter.value === "Release Date"){
        const sortedAlbums = currentAlbums.sort((a, b) => (a.release_date > b.release_date)? 1: -1)
        sortedAlbums.forEach(album => renderAlbum(album))
      }
      else if (sorter.value === "Rating"){
        const sortedAlbums = currentAlbums.sort((a, b) => (a.rating < b.rating)? 1: -1)
        sortedAlbums.forEach(album => renderAlbum(album))
      }
        sortAlbums(currentAlbums)
      })
  }

function sortAlbums(albums) {
  clearAlbums()
  albums.forEach(album => renderAlbum(album))
  sorter.addEventListener("change", (e)=>{
      clearAlbums()
      if (sorter.value === "Album"){
         const sortedAlbums = albums.sort((a,b) => (a.title > b.title) ? 1: -1)
         sortedAlbums.forEach(album => renderAlbum(album))
      }
      else if (sorter.value === "Artist"){
        const sortedAlbums = albums.sort((a, b) => (a.artist > b.artist)? 1: -1)
        sortedAlbums.forEach(album => renderAlbum(album))
      }
      else if (sorter.value === "Date Added"){
        const sortedAlbums = albums.sort((a, b) => (a.date_added > b.date_added)? 1: -1)
        sortedAlbums.forEach(album => renderAlbum(album))
      }
      else if (sorter.value === "Release Date"){
        const sortedAlbums = albums.sort((a, b) => (a.release_date > b.release_date)? 1: -1)
        sortedAlbums.forEach(album => renderAlbum(album))
      }
      else if (sorter.value === "Rating"){
        const sortedAlbums = albums.sort((a, b) => (a.rating < b.rating)? 1: -1)
        sortedAlbums.forEach(album => renderAlbum(album))
      }
  })  
}

function clearAlbums(){
  currentDisplay = sorter.parentNode.parentNode.childNodes[9];
      while (currentDisplay.lastChild){
        currentDisplay.removeChild(currentDisplay.firstChild)
      }
}