
document.addEventListener('DOMContentLoaded', ()=>{
  // Year
  const y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const id=a.getAttribute('href').slice(1);
      const el=document.getElementById(id);
      if(el){ e.preventDefault(); window.scrollTo({top: el.getBoundingClientRect().top + window.scrollY - 78, behavior:'smooth'}); }
    });
  });

  
  // Section spy
  const ids = ['home','work','about','contact'];
  const sections = ids.map(id=> document.getElementById(id));
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        const id = e.target.id;
        links.forEach(l=> l.classList.toggle('active', l.getAttribute('href')==='#'+id));
        moveUnderline(document.querySelector('.navlink.active'));
      }
    });
  },{ threshold: 0.65 });
  sections.forEach(s=> s && io.observe(s));
  moveUnderline(document.querySelector('.navlink[href="#home"]'));

  // Typewriter / rotating roles
  const roles = ['Frontend Engineer','UI/UX Developer','Graphic Designer'];
  const chip = document.createElement('span');
  chip.className='chip muted';
  const rolesBox = document.querySelector('.roles');
  if(rolesBox){
    rolesBox.appendChild(chip);
    let i=0, showing=true, t='';
    function tick(){
      const target = roles[i % roles.length];
      if(showing){
        t = target.slice(0, t.length+1);
        chip.textContent = t;
        if(t.length===target.length){ showing=false; setTimeout(tick,900); return; }
        setTimeout(tick,40);
      }else{
        t = t.slice(0, -1);
        chip.textContent = t;
        if(t.length===0){ showing=true; i++; setTimeout(tick,400); return; }
        setTimeout(tick,24);
      }
    }
    tick();
  }
});


// Added for Assignment 2 accessibility

// Accessibility keyboard support and nav toggle (added)
document.addEventListener('keydown', function(e){ var t=e.target; if(t && t.getAttribute && t.getAttribute('role')==='button'){ if(e.key==='Enter' || e.key===' '){ e.preventDefault(); t.click(); } } });
(function(){ var navToggle=document.querySelector('.nav-toggle'); var navList=document.querySelector('.nav-list'); if(navToggle && navList){ navToggle.addEventListener('click', function(){ var expanded = navToggle.getAttribute('aria-expanded')==='true'; navToggle.setAttribute('aria-expanded', String(!expanded)); navList.classList.toggle('open'); }); } })();
