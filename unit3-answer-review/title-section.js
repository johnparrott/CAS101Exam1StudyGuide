const config=await fetch('./slides.json').then(r=>r.json());
const hero=document.createElement('header');hero.className='exam-hero page-section';hero.setAttribute('aria-labelledby','exam-title');
const space=document.createElement('div');space.className='answer-space';space.setAttribute('aria-hidden','true');
Array.from({length:80},(_,i)=>config.slides[i%config.slides.length]).forEach((slide,i)=>{
 const flight=document.createElement('div');flight.className='answer-flight';
 // Stratified rectangular field: no angular ordering or spiral phase progression.
 const col=i%10,row=Math.floor(i/10);
 const hash=n=>{const v=Math.sin(n*127.1+311.7)*43758.5453;return v-Math.floor(v);};
 const px=(col+.2+hash(i+1)*.6)/10;
 const py=(row+.2+hash(i+91)*.6)/8;
 // Spread target positions over the full viewport. Perspective brings far cards inward.
 const x=(px-.5)*2400,y=(py-.5)*1600;
 flight.style.setProperty('--scroll-depth',String(.15+hash(i+43)*.55));
 flight.style.setProperty('--flight-x',`${x}px`);flight.style.setProperty('--flight-y',`${y}px`);
 flight.style.setProperty('--far-z',`${-1400-hash(i+21)*2400}px`);
 flight.style.setProperty('--near-z',`${610+hash(i+72)*160}px`);
 flight.style.setProperty('--far-blur',`${7+hash(i+53)*7}px`);
 flight.style.setProperty('--duration','36s');
 const phase=((i*37)%80+.35)/80;
 flight.style.setProperty('--delay',`${-phase*36}s`);
 const drift=document.createElement('div');drift.className='answer-drift';
 const badge=document.createElement('div');badge.className='flying-answer';
 const check=document.createElement('span');check.className='answer-check';check.textContent='✓';
 const letter=document.createElement('span');letter.textContent=slide.correct;
 const separator=document.createElement('span');separator.className='answer-separator';separator.textContent='-';
 const text=document.createElement('span');text.textContent=slide.options[slide.correct.charCodeAt(0)-65];
 badge.append(check,letter,separator,text);drift.append(badge);flight.append(drift);space.append(flight);
});
const title=document.createElement('div');title.className='exam-hero-title';
const label=document.createElement('p');label.textContent='Answer Review';
const heading=document.createElement('h1');heading.id='exam-title';heading.textContent=`Unit ${config.unit} Exam`;title.append(label,heading);
const down=document.createElement('a');down.className='hero-down';down.href='#carousel';down.setAttribute('aria-label','Go to the answer review carousel');down.textContent='↓';
hero.append(space,title,down);document.querySelector('#carousel').before(hero);
document.documentElement.classList.add('section-snapping');document.querySelector('#carousel').classList.add('page-section');
const observer=new IntersectionObserver(([entry])=>hero.classList.toggle('is-offscreen',!entry.isIntersecting));observer.observe(hero);

let scrollFrame=0;
const updateScroll=()=>{scrollFrame=0;if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;const progress=Math.max(0,Math.min(1,-hero.getBoundingClientRect().top/hero.clientHeight));hero.style.setProperty('--hero-scroll',`${progress*hero.clientHeight}px`);};
window.addEventListener('scroll',()=>{if(!scrollFrame)scrollFrame=requestAnimationFrame(updateScroll);},{passive:true});updateScroll();
