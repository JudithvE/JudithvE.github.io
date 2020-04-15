$(() => {
    $('#musicbutton').on('click', () => {
        let sound = new Howl({ src: 'Pero_Asi.mp3' })      
        sound.play()
    })
})