
export let globalMouseDown = false;


window.addEventListener('mousedown',()=>{
    globalMouseDown = true;
})
window.addEventListener('mouseup',()=>{
    globalMouseDown = false;
})
