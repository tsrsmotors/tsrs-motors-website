// Basic interactivity: year, menu toggle, booking -> WhatsApp
document.addEventListener('DOMContentLoaded', function(){
  // set year in footer
  var y = new Date().getFullYear();
  var el = document.getElementById('year');
  if(el) el.textContent = y;

  // menu toggle for small screens
  var toggle = document.getElementById('menuToggle');
  var nav = document.getElementById('navMenu');
  if(toggle && nav){
    toggle.addEventListener('click', function(){
      var expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      if(!expanded) nav.setAttribute('aria-hidden','false'); else nav.setAttribute('aria-hidden','true');
    });
  }

  // booking form -> WhatsApp message
  var form = document.getElementById('bookingForm');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var fd = new FormData(form);
      var name = fd.get('name') || '';
      var phone = fd.get('phone') || '';
      var service = fd.get('service') || '';
      var problem = fd.get('problem') || '';
      var text = 'TSRS Motors - Service Request%0A';
      text += 'Name: ' + encodeURIComponent(name) + '%0A';
      text += 'Phone: ' + encodeURIComponent(phone) + '%0A';
      text += 'Service: ' + encodeURIComponent(service) + '%0A';
      text += 'Details: ' + encodeURIComponent(problem);
      // open WhatsApp (international format without leading +)
      var wa = 'https://wa.me/8801911200577?text=' + text;
      window.open(wa, '_blank', 'noopener');
    });
  }
});
