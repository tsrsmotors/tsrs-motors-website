// Main JS for interactivity: menu toggle, lightbox, reviews slider, booking form handler
document.addEventListener('DOMContentLoaded', function(){
  // Menu
  const menuBtn = document.querySelector('.menu-btn');
  const menu = document.getElementById('menu');
  menuBtn && menuBtn.addEventListener('click', ()=> menu && menu.classList.toggle('active'));

  // Close menu on nav link click
  document.querySelectorAll('.nav-link').forEach(a=>a.addEventListener('click', ()=> menu && menu.classList.remove('active')));

  // Year
  const yearEl = document.getElementById('year'); if(yearEl) yearEl.textContent = new Date().getFullYear();

  // Lightbox
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox && lightbox.querySelector('.lightbox-img');
  const lightboxCaption = lightbox && lightbox.querySelector('.lightbox-caption');
  const lbClose = lightbox && lightbox.querySelector('.lightbox-close');

  document.querySelectorAll('.gallery-item').forEach(item=>{
    item.addEventListener('click', (e)=>{
      e.preventDefault();
      const href = item.getAttribute('href');
      const caption = item.dataset.caption || '';
      if(lightbox && lightboxImg){
        lightboxImg.src = href;
        lightboxCaption.textContent = caption;
        lightbox.setAttribute('aria-hidden','false');
      }
    })
  });

  if(lbClose) lbClose.addEventListener('click', ()=> lightbox && lightbox.setAttribute('aria-hidden','true'));
  if(lightbox) lightbox.addEventListener('click', (e)=>{ if(e.target === lightbox) lightbox.setAttribute('aria-hidden','true'); });

  // Reviews slider (simple auto-rotate)
  const reviews = document.querySelectorAll('#reviews-slider .review');
  let currentReview = 0;
  function showReview(idx){ reviews.forEach((r,i)=> r.style.display = i===idx?'block':'none'); }
  if(reviews.length){ showReview(0); setInterval(()=>{ currentReview = (currentReview+1)%reviews.length; showReview(currentReview); }, 4500); }

  // Booking form handler (demo: intercept and show message; replace action with Formspree endpoint to enable real submission)
  const bookingForm = document.getElementById('booking-form');
  const bookingResult = document.getElementById('booking-result');
  if(bookingForm){
    bookingForm.addEventListener('submit', async function(e){
      e.preventDefault();
      const action = bookingForm.getAttribute('action') || '';

      const data = new FormData(bookingForm);

      // If action contains {your-form-id} we simulate result and instruct user
      if(action.includes('{your-form-id}') || action.trim() === ''){
        bookingResult.textContent = 'Demo submission captured. Replace form action with your Formspree form ID to enable real submissions.';
        bookingForm.reset();
        return;
      }

      try{
        // Attempt to POST
        const resp = await fetch(action, {method:'POST', body: data, headers:{'Accept':'application/json'}});
        if(resp.ok){ bookingResult.textContent = 'Booking sent — we will contact you shortly.'; bookingForm.reset(); }
        else{ const json = await resp.json(); bookingResult.textContent = json.error || 'Submission failed — try again later.'; }
      }catch(err){ console.error(err); bookingResult.textContent = 'Submission failed — check console for details.'; }
    });
  }

});
