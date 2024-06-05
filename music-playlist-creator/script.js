let playlistData = data

let playlists = document.getElementById('playlists');

const playlistContainer = playlistData['playlists'].map((item) => {
    return `
    <div class="playlist-cards" onclick = "openModal(${item, item['songs']})">
        <div class='image-container'><img class="playlist-image" src = "${item['playlist_art']}"></div>

        <div class = 'playlist-text-container'>
            <div class="playlist-title">${item['playlist_name']}</div>
            <div class="creator-name">${item['playlist_creator']}</div>
        </div>
        <div class='like-container'>
            <i class="fa-regular fa-heart"></i>
            <div class="like-count">${item['likeCount']}</div>
        </div>

    </div>`;
}).join('')

playlists.innerHTML = playlistContainer

let modal = document.getElementById('modalContainer');
let close_icon = document.querySelector('.close');

function openModal(playlist, song){
    document.querySelector('.modal-playlist-image').src = playlist['playlist_art'];
    document.querySelector('.modal-playlist-title').innerText = playlist['playlist_name'];
    document.querySelector('.modal-playlist-creator').innerText = playlist['playlist_creator'];
    document.querySelector('.song-title').innerText = song['title'];
    document.querySelector('.song-artist-name').innerText = song['artist'];
    document.querySelector('.album-name').innerText = song['album'];
    document.querySelector('.song-duration').innerHTML = song['song-duration'];

    modal.style.display = "block";
}
