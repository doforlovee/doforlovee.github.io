/* Refit after page turns, zoom, font loading and viewport changes. */
(()=>{
 function fit(){
  document.querySelectorAll('.quote').forEach(box=>{
   if(!box.clientWidth||!box.clientHeight)return;
   let text=box.querySelector('.quote-text');
   if(!text){text=document.createElement('span');text.className='quote-text';text.textContent=box.textContent;box.replaceChildren(text)}
   box.style.removeProperty('font-size');
   const s=getComputedStyle(box), base=parseFloat(s.fontSize);
   const h=box.clientHeight-parseFloat(s.paddingTop)-parseFloat(s.paddingBottom);
   const w=box.clientWidth-parseFloat(s.paddingLeft)-parseFloat(s.paddingRight);
   const fits=()=>text.offsetHeight<=h+.5&&text.scrollWidth<=text.clientWidth+.5;
   if(!fits()){
    let low=1,high=base;
    for(let i=0;i<14;i++){let mid=(low+high)/2;box.style.fontSize=mid+'px';if(fits())low=mid;else high=mid}
    box.style.fontSize=low+'px';
   }
  });
 }
 let frame;const schedule=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(fit)};
 const book=document.querySelector('#book'), modal=document.querySelector('#dialogContent');
 const observer=new MutationObserver(schedule);
 [book,modal].filter(Boolean).forEach(el=>observer.observe(el,{childList:true}));
 const resize=new ResizeObserver(schedule);
 [book,document.querySelector('#readerDialog')].filter(Boolean).forEach(el=>resize.observe(el));
 window.addEventListener('resize',schedule);
 document.fonts.ready.then(schedule);schedule();
})();
