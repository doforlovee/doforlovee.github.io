/* One slide per edition. Duplicate a track child to add a real edition. No autoplay. */
document.querySelectorAll('[data-carousel]').forEach(root=>{
 const track=root.querySelector('.carousel-track'), slides=[...track.children], controls=root.querySelector('.carousel-controls');
 const previous=controls.querySelector('[data-prev]'), next=controls.querySelector('[data-next]'), output=controls.querySelector('output');
 const en=document.documentElement.lang==='en';let index=0;
 if(slides.length<2)return;
 controls.hidden=false;track.tabIndex=0;track.setAttribute('role','group');track.setAttribute('aria-label',root.getAttribute('aria-label'));
 slides.forEach((slide,i)=>{slide.setAttribute('role','group');slide.setAttribute('aria-label',`${i+1} / ${slides.length}`)});
 function state(){index=Math.max(0,Math.min(slides.length-1,Math.round(track.scrollLeft/track.clientWidth)));output.textContent=`${en?'Edition':'Edición'} ${index+1} / ${slides.length}`;previous.disabled=index===0;next.disabled=index===slides.length-1}
 function go(n){track.scrollTo({left:Math.max(0,Math.min(n,slides.length-1))*track.clientWidth,behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'})}
 previous.onclick=()=>go(index-1);next.onclick=()=>go(index+1);
 track.addEventListener('keydown',e=>{if(e.target!==track)return;if(['ArrowRight','ArrowLeft','Home','End'].includes(e.key)){e.preventDefault();go(e.key==='Home'?0:e.key==='End'?slides.length-1:index+(e.key==='ArrowRight'?1:-1))}});
 track.addEventListener('scroll',state,{passive:true});new ResizeObserver(()=>{go(index);state()}).observe(track);state();
});
