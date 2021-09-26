const btnStart = document.querySelector('.btn-start')
const btnStop = document.querySelector('.btn-stop')
const video = document.querySelector('video')
const socket = io()
var canvas = document.querySelector('.preview')
var context = canvas.getContext("2d")
const stream = ss.createStream()
btnStart.addEventListener('click',startScreenShare)
btnStop.addEventListener('click',stopScreenShare)

canvas.width = 1920;
canvas.height = 1080;
context.width = canvas.width
context.height = canvas.height
function viewVideo (video,context) {
    context.drawImage(video,0,0,canvas.width,canvas.height)
    socket.emit('videoStream',canvas.toDataURL('image/jpg'))
}

async function startScreenShare () {
        console.log('click')

        try {
            video.srcObject  = await navigator.mediaDevices.getDisplayMedia();
         setInterval(function() {
            viewVideo(video,context)
        },10)
        
          
            
        } 
        catch(err) {
          console.error("Error: " + err);
        }
        
        
     
}

socket.on('sendVideoStream',stream => {
    document.getElementById('play').style.backgroundImage = `url('${stream}')`
    document.querySelector('.title').style.display = "none"
    document.querySelector('#play-frame').classList.add('show')
    document.querySelector('.video').style.display = 'none'

})


function stopScreenShare () {
    
}