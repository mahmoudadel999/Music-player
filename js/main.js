const musicContainer = document.querySelector('.container')
const palyBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.prog-container')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')

//* Song titles
const songs = [
  {
    title: 'Quran-1',
    audio: 'Sound-1',
    image: 'photo-1',
  },
  {
    title: 'Quran-2',
    audio: 'Sound-2',
    image: 'photo-2',
  },
  {
    title: 'Quran-3',
    audio: 'Sound-3',
    image: 'photo-3',
  },
]

let songIndex = 0

loadSong(songs[songIndex])
function loadSong(song) {
  title.innerText = song.title
  audio.src = `media/${song.audio}.mp3`
  cover.src = `img/${song.image}.jpg`
  console.log(song)
}
function palySong() {
  musicContainer.classList.add('play')
  palyBtn.querySelector('i.fas').classList.remove('fa-play')
  palyBtn.querySelector('i.fas').classList.add('fa-pause')
  audio.play()
}

function pauseSong() {
  musicContainer.classList.remove('play')
  palyBtn.querySelector('i.fas').classList.remove('fa-pause')
  palyBtn.querySelector('i.fas').classList.add('fa-play')
  audio.pause()
}

function updateProgress(e) {
  // let a = e.target.currentTime //* Another Code
  // let b = e.target.duration
  const { duration, currentTime } = e.srcElement
  const progressPercent = (currentTime / duration) * 100
  progress.style.width = `${progressPercent}%`
}

function setProgress(e) {
  const width = this.clientWidth
  const clickX = e.offsetX
  const duration = audio.duration

  audio.currentTime = (clickX / width) * duration
}

//* Event Listener
palyBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play')

  if (isPlaying) {
    pauseSong()
  } else {
    palySong()
  }
})

function prevSong() {
  songIndex--
  if (songIndex < 0) {
    songIndex = songs.length - 1
  }
  loadSong(songs[songIndex])
  palySong()
}
function nextSong() {
  songIndex++
  if (songIndex > songs.length - 1) {
    songIndex = 0
  }
  loadSong(songs[songIndex])
  palySong()
}

//* Change song events
prevBtn.addEventListener('click', () => {
  prevSong()
})
nextBtn.addEventListener('click', () => {
  nextSong()
})

//* Time song
audio.addEventListener('timeupdate', updateProgress)

progressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong)
