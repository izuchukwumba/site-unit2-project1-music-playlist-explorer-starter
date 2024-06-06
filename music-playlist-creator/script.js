//Block of code aimed at dynamically loading playlist data from data.js into index.html file
let playlistData = data

let playlists = document.getElementById('playlists');

let playlist_images = document.querySelectorAll('.playlist-image');

const playlistContainer = playlistData['playlists'].map((item, index1) => {

    return `
    <div class="playlist-card playlist-${index1}" id ="${index1}">
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

playlist_images.forEach((image, index)=>{
    image.addEventListener('click', (event)=>{
        // let playlist_index = event.target.closest('.playlist-card').id
        console.log('yes')
        // if(event.target.closest('.playlist-card')){
            // openModal(playlistData.playlists[index], playlistData.playlists[index]['songs']);
        // }

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
let like = document.querySelector('.like');

function likePlaylist(likeCount, index){
 likeCount += 1;
}

like.addEventListener('click', (event) => {
    let like_index = event.target.closest('.playlist-card').id
    likePlaylist(playlistData.playlists[like_index]['likeCount'], like_index);
})
