const slider = document.querySelector('.slider')
if(slider){  
  const track = slider.querySelector('.track')
  const list = slider.querySelector('.list')
  const slides = slider.querySelectorAll('.slide')

  const arrows = document.querySelectorAll('.arrow')
  arrows.forEach(arrow=>arrow.addEventListener('click',handleArrow))

  let counter = 0, gap, perPage, slide_w, list_w

  init()

  function init(){  
    list_w = list.scrollWidth
    slide_w = slides[0].offsetWidth
    let styles = window.getComputedStyle(track)
    gap = parseInt(styles.getPropertyValue('--gap')) 
    perPage = parseInt(styles.getPropertyValue('--perPage')) 
  }

  function handleArrow(e){
    const target = e.currentTarget
    if(target.classList.contains('prev')){
      if(counter === 0) return
      counter--    
      moveList(counter)
    }
    if(target.classList.contains('next')){
      if(counter === slides.length - perPage) return
      counter++    
      moveList(counter)
    }
  }

  function moveList(counter){
    list.style.transform = `
    translateX(${-1 * counter * (slide_w + gap)}px)
    `
  }

  window.addEventListener('resize', () => {
    init()
    if(counter >= slides.length - perPage){
      counter = slides.length - perPage
      moveList(counter)
      return
    }
    moveList(counter)
  })
}