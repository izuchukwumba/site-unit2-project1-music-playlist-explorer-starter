//Block of code aimed at dynamically loading playlist data from data.js into index.html file
let playlistData = data

let playlists = document.getElementById('playlists');

let playlist_images = document.querySelectorAll('.playlist-image');


function renderPlaylistData(playlistArray){
    const playlistContainer = playlistArray.map((item, index) => {

        return `
        <div class="playlist-card playlist-${index}" id ="${index}">
            <div class='image-container'><img class="playlist-image" src = "${item['playlist_art']}"></div>

            <div class = 'playlist-text-container'>
                <div class="playlist-title">${item['playlist_name']}</div>
                <div class="creator-name">${item['playlist_creator']}</div>
            </div>
            <div class='icon-container'>
            <div class='like-container'>
                <i class="like-btn like fa-regular fa-heart"></i>
                <div class="like-count">${item['likeCount']}</div>
            </div>
            <div>
            <i class="edit-btn fa-regular fa-pen-to-square"></i>
            <i class="trash-btn fa-regular fa-trash-can"></i>
            </div>
            </div>
            </div>


        </div>
        `;



    }).join('')

    playlists.innerHTML = playlistContainer

}

renderPlaylistData(playlistData['playlists']);

// const playlistContainer = playlistData['playlists'].map((item, index) => {

//     return `
//     <div class="playlist-card playlist-${index}" id ="${index}">
//         <div class='image-container'><img class="playlist-image" src = "${item['playlist_art']}"></div>

//         <div class = 'playlist-text-container'>
//             <div class="playlist-title">${item['playlist_name']}</div>
//             <div class="creator-name">${item['playlist_creator']}</div>
//         </div>
//         <div class='icon-container'>
//         <div class='like-container'>
//             <i class="like-btn like fa-regular fa-heart"></i>
//             <div class="like-count">${item['likeCount']}</div>
//         </div>
//             <i class="trash-btn fa-regular fa-trash-can"></i>
//         </div>
//     </div>`;



// }).join('')

// playlists.innerHTML = playlistContainer


//Modal creation + Playlist and song data loading
let songList = document.getElementById('modal-song-info');
let modal = document.getElementById('modal-container');
let closeBtn = document.querySelector('.close-icon');
let shuffleContainer = document.querySelector('.shuffle-container');

// let shuffle_btn_list = playlistData['playlists'].map((item, index) => {

//     return `
//     <div class="shuffle-btn">Shuffle</div>
//     `
// }).join('')

// shuffleContainer.innerHTML = shuffle_btn_list

// let songContainer = playlistData['playlists'].map((item, index) => {
//         return `
//         <div>
//         <div class='shuffle-btn'>Shuffle</div>

//             <div class="song-container">
//             <img src="" class="song-image"/>
//             <div class="song-text">
//                 <div class="song-title"></div>
//                 <div class="song-artist-name"></div>
//                 <div class ='album-name'></div>
//             </div>
//             <div class='song-duration-container'>
//             <div class="song-duration"></div>
//             </div>
//             </div>
//             </div>
//             `

//     }).join('')

//     songList.innerHTML = songContainer



function openModal(playlist){
    document.querySelector('.modal-playlist-image').src = playlist['playlist_art'];
    document.querySelector('.modal-playlist-title').innerHTML = playlist['playlist_name'];
    document.querySelector('.modal-playlist-creator-name').innerHTML = playlist['playlist_creator'];

    let songContainer = playlist['songs'].map((item, index) => {
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
    // console.log(songList);

    modal.style.visibility = "visible";
    console.log('modal opened');

    shuffleBtn.addEventListener('click', (event) => {
        shufflePlaylist(playlist);
        console.log('clicked')
    })

}

function closeModal(){
    modal.style.visibility = "hidden";
    document.querySelector('.modal-playlist-image').src = '';

}

function addImageEventListeners(){
let images_container = document.querySelectorAll('.image-container');

images_container.forEach((image, index)=>{
        image.addEventListener('click', (event)=>{
        let playlist_index = event.target.closest('.playlist-card').id
        console.log(index)
        if(event.target.closest('.playlist-card')){
            openModal(playlistData.playlists[index]);
        }

    })

})
}

addImageEventListeners()

// playlists.addEventListener('click', (event) => {

//     let playlist_index = event.target.closest('.playlist-card').id

//     if(event.target.closest('.playlist-card')){

//         openModal(playlistData.playlists[playlist_index], playlistData.playlists[playlist_index]['songs']);

//     }})


closeBtn.addEventListener('click', closeModal);


//Liking playlists
let likeBtn = document.querySelectorAll('.like-btn');

function addLikeEventListener(){
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
}
addLikeEventListener()

let shuffleBtn = document.querySelector('.shuffle-btn');

function shufflePlaylist(playlist){

    for(let i = playlist.songs.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));

        [playlist.songs[i], playlist.songs[j]] = [playlist.songs[j], playlist.songs[i]];
    }
    console.log(playlist["songs"]);

    openModal(playlist);
}

//Adding Playlists
let addPlaylistBtn = document.getElementById('add-playlist-btn');
let form = document.getElementById('new-playlist-form');
addPlaylistBtn.addEventListener('click', (event) => {
    form.style.display = 'block';
})
let closeFormBtn = document.getElementById('close-playlist-form-btn');
closeFormBtn.addEventListener('click', (event) => {
    form.style.display = 'none';
})
let submitNewPlaylist = document.getElementById('submit-playlist-btn');

let newPlaylistName = document.getElementById('new-playlist-name');
let newPlaylistCreator = document.getElementById('new-playlist-creator');
let newPlaylistImage = document.getElementById('new-playlist-image');

let [newSongTitle1, newSongArtist1, newSongAlbum1, newSongImageURL1, newSongDuration1] = [document.getElementById('new-song-title1'), document.getElementById('new-song-artist1'), document.getElementById('new-song-album1'), document.getElementById('new-song-image1'), document.getElementById('new-song-duration1')];
let [newSongTitle2, newSongArtist2, newSongAlbum2, newSongImageURL2, newSongDuration2] = [document.getElementById('new-song-title2'), document.getElementById('new-song-artist2'), document.getElementById('new-song-album2'), document.getElementById('new-song-image2'), document.getElementById('new-song-duration2')];
let [newSongTitle3, newSongArtist3, newSongAlbum3, newSongImageURL3, newSongDuration3] = [document.getElementById('new-song-title3'), document.getElementById('new-song-artist3'), document.getElementById('new-song-album3'), document.getElementById('new-song-image3'), document.getElementById('new-song-duration3')];
let [newSongTitle4, newSongArtist4, newSongAlbum4, newSongImageURL4, newSongDuration4] = [document.getElementById('new-song-title4'), document.getElementById('new-song-artist4'), document.getElementById('new-song-album4'), document.getElementById('new-song-image4'), document.getElementById('new-song-duration4')];
let [newSongTitle5, newSongArtist5, newSongAlbum5, newSongImageURL5, newSongDuration5] = [document.getElementById('new-song-title5'), document.getElementById('new-song-artist5'), document.getElementById('new-song-album5'), document.getElementById('new-song-image5'), document.getElementById('new-song-duration5')];


function addNewPlaylist(allPlaylists){

    let playlist = {'playlistID': allPlaylists['playlists'].length-1, 'playlist_name': newPlaylistName.value, 'playlist_creator': newPlaylistCreator.value, 'likeCount': 0, 'playlist_art': newPlaylistImage.value, 'songs': [] }

    let songs = [
        {'title': newSongTitle1.value, 'artist': newSongArtist1.value, 'album': newSongAlbum1.value, 'cover_art': newSongImageURL1.value, 'duration': newSongDuration1.value},
        {'title': newSongTitle2.value, 'artist': newSongArtist2.value, 'album': newSongAlbum2.value, 'cover_art': newSongImageURL2.value, 'duration': newSongDuration2.value},
        {'title': newSongTitle3.value, 'artist': newSongArtist3.value, 'album': newSongAlbum3.value, 'cover_art': newSongImageURL3.value, 'duration': newSongDuration3.value},
        {'title': newSongTitle4.value, 'artist': newSongArtist4.value, 'album': newSongAlbum4.value, 'cover_art': newSongImageURL4.value, 'duration': newSongDuration4.value},
        {'title': newSongTitle5.value, 'artist': newSongArtist5.value, 'album': newSongAlbum5.value, 'cover_art': newSongImageURL5.value, 'duration': newSongDuration5.value}
    ]

    if(newSongTitle1.value != ""){
        playlist['songs'].push(songs[0]);
    }
    if(newSongTitle2.value != ""){
        playlist['songs'].push(songs[1]);
    }
    if(newSongTitle3.value != ""){
        playlist['songs'].push(songs[2]);
    }
    if(newSongTitle4.value != ""){
        playlist['songs'].push(songs[3]);
    }
    if(newSongTitle5.value != ""){
        playlist['songs'].push(songs[4]);
    }

    allPlaylists['playlists'].push(playlist);
    renderPlaylistData(allPlaylists['playlists']);
    addImageEventListeners();
    addLikeEventListener();
    form.style.display = 'none';
    console.log(allPlaylists);
}

submitNewPlaylist.addEventListener('click', (event) => {
    addNewPlaylist(playlistData);
    addTrashcanEventListerners()
})


//Editing Playlists
let editPlaylistBtns = document.querySelectorAll('.edit-btn');


function editPlaylist(playlists, index){


}


//Deleting Playlists

function deletePlaylist(playlists, index){
    playlists.splice(index, 1);
    renderPlaylistData(playlists);
    addTrashcanEventListerners()
    addLikeEventListener();
    addImageEventListeners();
    console.log('clicked')
    console.log(playlists);
    console.log(trashBtns)
}

function addTrashcanEventListerners(){
let trashBtns = document.querySelectorAll('.trash-btn');
trashBtns.forEach((btn, index) => {
    btn.addEventListener('click', (event) => {
        deletePlaylist(playlistData['playlists'], index);
        console.log(trashBtns)

    })
})
}

addTrashcanEventListerners()

//Search
let searchBar = document.getElementById('search-input');
searchBar.addEventListener('input', (event) => {
    searchPlaylist(searchBar.value, event);
})

function searchPlaylist(searchTerm, event){
    let query = event.target.value;

    let filteredPlaylists = playlistData['playlists'].filter((playlist) => {
        return playlist['playlist_name'].toLowerCase().includes(query.toLowerCase());
    })
    renderPlaylistData(filteredPlaylists);
}

//Sort
let sort_options = document.getElementById('sort-options');
console.log(sort_options);

function sortPlaylistName_AZ(playlistArray){
    playlistArray.sort((a, b) => {
        let firstLetterofPlaylistName_A = a['playlist_name'][0].toLowerCase();
        let firstLetterofPlaylistName_B = b['playlist_name'][0].toLowerCase();

        if(firstLetterofPlaylistName_A < firstLetterofPlaylistName_B){
            return -1;
        }
        if(firstLetterofPlaylistName_A > firstLetterofPlaylistName_B){
            return 1;
        }
        return 0;
    })

    renderPlaylistData(playlistArray);
    addTrashcanEventListerners()
    addLikeEventListener();
    addImageEventListeners();
}


function sortPlaylistName_ZA(playlistArray){
    playlistArray.sort((a, b) => {
        let firstLetterofPlaylistName_A = a['playlist_name'][0].toLowerCase();
        let firstLetterofPlaylistName_B = b['playlist_name'][0].toLowerCase();

        if(firstLetterofPlaylistName_A < firstLetterofPlaylistName_B){
            return 1;
        }
        if(firstLetterofPlaylistName_A > firstLetterofPlaylistName_B){
            return -1;
        }
        return 0;
    })

    renderPlaylistData(playlistArray);
    addTrashcanEventListerners()
    addLikeEventListener();
    addImageEventListeners();
}

function sortCreatorName_AZ(playlistArray){
    playlistArray.sort((a, b) => {
        let firstLetterofCreatorName_A = a['playlist_creator'][0].toLowerCase();
        let firstLetterofCreatorName_B = b['playlist_creator'][0].toLowerCase();

        if(firstLetterofCreatorName_A < firstLetterofCreatorName_B){
            return -1;
        }
        if(firstLetterofCreatorName_A > firstLetterofCreatorName_B){
            return 1;
        }
        return 0;
    })

    renderPlaylistData(playlistArray);
    addTrashcanEventListerners()
    addLikeEventListener();
    addImageEventListeners();

}

function sortCreatorName_ZA(playlistArray){
    playlistArray.sort((a, b) => {
        let firstLetterofCreatorName_A = a['playlist_creator'][0].toLowerCase();
        let firstLetterofCreatorName_B = b['playlist_creator'][0].toLowerCase();

        if(firstLetterofCreatorName_A < firstLetterofCreatorName_B){
            return 1;
        }
        if(firstLetterofCreatorName_A > firstLetterofCreatorName_B){
            return -1;
        }
        return 0;
    })

    renderPlaylistData(playlistArray);
    addTrashcanEventListerners()
    addLikeEventListener();
    addImageEventListeners();
}

function sortLikeCount_AZ(playlistArray){
    playlistArray.sort((a, b) => {

        if(a['likeCount'] < b['likeCount']){
            return -1;
        }
        if(a['likeCount'] < b['likeCount']){
            return 1;
        }
        return;
    })

    renderPlaylistData(playlistArray);
    addTrashcanEventListerners()
    addLikeEventListener();
    addImageEventListeners();
}
function sortLikeCount_ZA(playlistArray){
    playlistArray.sort((a, b) => {

        if(a['likeCount'] < b['likeCount']){
            return 1;
        }
        if(a['likeCount'] < b['likeCount']){
            return -1;
        }
        return 0;
    })

    renderPlaylistData(playlistArray);
    addTrashcanEventListerners()
    addLikeEventListener();
    addImageEventListeners();
}

sort_options.addEventListener('change', (event) => {
    sortBy(event.target.value);
})

function sortBy(value){
    if(value == 'playlist-name-AZ'){
        sortPlaylistName_AZ(playlistData['playlists']);
}
    if(value == 'playlist-name-ZA'){
        sortPlaylistName_ZA(playlistData['playlists']);
    }
    if(value == 'creator-name-AZ'){
        sortCreatorName_AZ(playlistData['playlists']);
    }
    if(value == 'creator-name-ZA'){
        sortCreatorName_ZA(playlistData['playlists']);
    }
    if(value == 'like-count-AZ'){
        sortLikeCount_AZ(playlistData['playlists']);
    }
    if(value == 'like-count-ZA'){
        sortLikeCount_ZA(playlistData['playlists']);
    }

}
