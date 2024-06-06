//Block of code aimed at dynamically loading playlist data from data.js into index.html file
let playlistData = data

let playlists = document.getElementById('playlists');

let playlist_images = document.querySelectorAll('.playlist-image');

const playlistContainer = playlistData['playlists'].map((item, index) => {

    return `
    <div class="playlist-card playlist-${index}" id ="${index}">
        <div class='image-container'><img class="playlist-image" src = "${item['playlist_art']}"></div>

        <div class = 'playlist-text-container'>
            <div class="playlist-title">${item['playlist_name']}</div>
            <div class="creator-name">${item['playlist_creator']}</div>
        </div>
        <div class='like-container'>
            <i class="like-btn like fa-regular fa-heart"></i>
            <div class="like-count">${item['likeCount']}</div>
        </div>

    </div>`;



}).join('')

playlists.innerHTML = playlistContainer

//Modal creation + Playlist and song data loading
let songList = document.getElementById('modal-song-info');
let modal = document.getElementById('modal-container');
let closeBtn = document.querySelector('.close-icon');

function openModal(playlist, song){
    document.querySelector('.modal-playlist-image').src = playlist['playlist_art'];
    document.querySelector('.modal-playlist-title').innerHTML = playlist['playlist_name'];
    document.querySelector('.modal-playlist-creator-name').innerHTML = playlist['playlist_creator'];

    let songContainer = song.map((item, index) => {
        return `
            <div class="song-container">
            <img src="${item['cover_art']}" class="song-image"/>
            <div class="song-text">
                <div class="song-title">${item['title']}</div>
                <div class="song-artist-name">${item['artist']}</div>
                <div class ='album-name'>${item['album']}</div>
            </div>
            <div class='song-duration-container'>
            <div class="song-duration">${item['duration']}</div>
            </div>
            </div>

            `

    }).join('')

    songList.innerHTML = songContainer

    modal.style.visibility = "visible";
    console.log('modal opened');
}

function closeModal(){
    modal.style.visibility = "hidden";
    document.querySelector('.modal-playlist-image').src = '';

}

let images_container = document.querySelectorAll('.image-container');

images_container.forEach((image, index)=>{
        image.addEventListener('click', (event)=>{
        let playlist_index = event.target.closest('.playlist-card').id
        console.log(index)
        if(event.target.closest('.playlist-card')){
            openModal(playlistData.playlists[index], playlistData.playlists[index]['songs']);
        }

    })

})

// playlists.addEventListener('click', (event) => {

//     let playlist_index = event.target.closest('.playlist-card').id

//     if(event.target.closest('.playlist-card')){

//         openModal(playlistData.playlists[playlist_index], playlistData.playlists[playlist_index]['songs']);

//     }})


closeBtn.addEventListener('click', closeModal);


//Liking playlists
let likeBtn = document.querySelectorAll('.like-btn');

likeBtn.forEach((btn, index) => {
    btn.addEventListener('click', (event) => {
        // let like_index = event.target.closest('.playlist-card').id
        playlistData.playlists[index]['likeCount'] += 1;

        console.log(playlistData.playlists[index]['likeCount'])

        let likeCount = document.querySelectorAll('.like-count');

        likeCount.forEach((item, index) => {
        item.textContent = playlistData.playlists[index]['likeCount'];

        btn.classList.remove('fa-regular');
        btn.classList.add('fa-solid');
        btn.style.color = 'red';
})

    })
})

function shufflePlaylist(songArray){

    for(let i = songArray.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));

        [songArray[i], songArray[j]] = [songArray[j], songArray[i]];
    }
    console.log(songArray);
    return songArray;
}

let shuffleBtns = document.querySelectorAll('.shuffle-btn');

shuffleBtns.forEach((btn, index) => {
    btn.addEventListener('click', (event) => {
    shufflePlaylist(playlistData.playlists[index]['songs']);

    playlistData.playlists[index]['songs'] = shufflePlaylist(playlistData.playlists[index]['songs']);
})
//only the first song data is shuffling. continue from here.
})
