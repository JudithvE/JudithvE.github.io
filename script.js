$(() => {
	let sound = new Howl({ src: 'Pero_Asi.mp3' })
	let playpause = $('#musicplayer #playpause')      
	playpause.on('click', () => {
		playpause.toggleClass('paused') 
		let paused = playpause.hasClass('paused')  
		if(paused) {
			playpause.attr('src', 'pause.png')
			sound.play()
		} else {
			playpause.attr('src', 'play.png')
			sound.pause()
		}
	})
	setInterval(() => {
		let dur = sound.duration()
		let seek = sound.seek()
		let a = (seek / dur)* 100
		$('#bolletje').css('left', `${a}%`)
		$('#progress').css('width', `${a}%`)
	}, 100)

	let draggingbolletje = false
	let startdragx = 0
	let startdragprogress = 0
	$('#bolletje').on('mousedown', (e) => {
		draggingbolletje = true
		startdragx = e.clientX
		console.log($('#bolletje')[0].style.left)
		startdragprogress = Number($('#bolletje')[0].style.left.replace('%' , ''))
	})
	$('body').on('mouseup', () => { draggingbolletje = false})

	$('body').on('mousemove', (e) => {
		if(!draggingbolletje) return
		let b = e.clientX-startdragx
		let newprogress = startdragprogress + (b/Number($('#line').width()))*100
		console.log(newprogress, startdragprogress, b, Number($('#line').width()))
		sound.seek(sound.duration()*(newprogress/100))
	})
	
	let profile = $('#pfp')      
	profile.on('mouseenter', () => {
		profile.attr('src', 'profile4.png')
	})
	profile.on('mouseleave', () => {
		profile.attr('src', 'profile3.png')
	})
	/*var screenHeight = screen.height;
	if (screenHeight < 800) {
	  $('body').css('zoom', 0.8);
	} else {
		 $('body').css('zoom', 1);
	}*/
})