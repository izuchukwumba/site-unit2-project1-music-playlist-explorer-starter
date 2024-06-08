//Featured Home

let playlistData = data

let randomPlaylist = playlistData['playlists'][Math.floor(playlistData['playlists'].length * Math.random())
]


document.querySelector('.featured-playlist-image').src = randomPlaylist['playlist_art'];
document.querySelector('.featured-playlist-title').innerText = randomPlaylist['playlist_name'];
document.querySelector('.featured-playlist-creator').innerHTML = `<span class='featured-curated-text'>curated by: </span>${randomPlaylist['playlist_creator']}`;
document.querySelector('.featured-playlist-details').innerText = `${randomPlaylist['playlist_creator']} is a music enthusiast with a passion for curating the perfect vibes! This playlist is a labor of love, carefully crafted to share the joy of music with the world.`

let featuredSongsContainer = document.querySelector('.featured-songs-container')

let featuredSongs = randomPlaylist['songs'].map((song,index)=>{
    return`
    <div class = 'featured-song-title'>${song['title']}</div>
    <div class = 'featured-song-artist'>${song['artist']}</div>
    <div class = 'featured-song-title'>${song['album']}</div>
    `

}).join('')

featuredSongsContainer.innerHTML = featuredSongs


//Create a dynamic table
//Myabe make it with grid
