var slideIndex = 1;


$(() => {
	showSlides(slideIndex);

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
})



// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}