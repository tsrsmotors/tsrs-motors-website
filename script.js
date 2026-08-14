// Basic carousel script to rotate slides (images/videos)
(function(){
  const carousels = document.querySelectorAll('.carousel');
  if(!carousels.length) return;

  carousels.forEach(initCarousel);

  function initCarousel(carousel){
    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const prevBtn = carousel.querySelector('.carousel-control.prev');
    const nextBtn = carousel.querySelector('.carousel-control.next');
    const indicators = carousel.querySelector('.carousel-indicators');
    const autoplay = carousel.dataset.autoplay === 'true';
    const interval = parseInt(carousel.dataset.interval || 4500,10);

    let index = 0;
    let timer = null;

    // build indicators
    slides.forEach((s,i)=>{
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.setAttribute('aria-label','Go to slide '+(i+1));
      if(i===0) btn.classList.add('active');
      btn.addEventListener('click',()=>{goTo(i);resetTimer();});
      indicators.appendChild(btn);
    });

    function update(){
      track.style.transform = `translateX(-${index*100}%)`;
      Array.from(indicators.children).forEach((b,bi)=> b.classList.toggle('active', bi===index));
      // handle videos
      slides.forEach((s,si)=>{
        const type = s.dataset.type;
        if(type==='video'){
          const v = s.querySelector('video');
          if(!v) return;
          if(si===index){ v.currentTime=0; v.play().catch(()=>{}); } else { v.pause(); }
        }
      });
    }

    function goTo(i){ index = (i+slides.length)%slides.length; update(); }
    function next(){ goTo(index+1); }
    function prev(){ goTo(index-1); }

    prevBtn && prevBtn.addEventListener('click',()=>{ prev(); resetTimer(); });
    nextBtn && nextBtn.addEventListener('click',()=>{ next(); resetTimer(); });

    // autoplay
    function startTimer(){ if(autoplay) timer = setInterval(next, interval); }
    function stopTimer(){ if(timer){ clearInterval(timer); timer=null; } }
    function resetTimer(){ stopTimer(); startTimer(); }

    carousel.addEventListener('mouseenter', stopTimer);
    carousel.addEventListener('mouseleave', startTimer);

    // accessibility: keyboard
    carousel.addEventListener('keydown', (e)=>{
      if(e.key==='ArrowLeft') prev();
      if(e.key==='ArrowRight') next();
    });

    // initial state
    update();
    startTimer();
  }

  // set current year in footer
  const yEl = document.getElementById('year');
  if(yEl) yEl.textContent = new Date().getFullYear();
})();
