const showModal = document.querySelector(".show-modal");
const bottomSheet = document.querySelector(".bottom-sheet");
const sheetOverlay = bottomSheet.querySelector(".sheet-overlay");
const dragIcon = bottomSheet.querySelector(".drag-icon");
const sheetContent = bottomSheet.querySelector(".content");


let isDragging = false, startY, startHeight;

const showBottomSheet = () =>{
    bottomSheet.classList.add("show");
    document.body.style.overflowY = "hidden";
    updateSheetHeight(50);
}

const hideBottomSheet = () =>{
    bottomSheet.classList.remove("show");
    document.body.style.overflowY = "auto";
}

const updateSheetHeight = (height) =>{
    sheetContent.style.height = `${height}vh`;
    bottomSheet.classList.toggle("fullscreen", height === 90);
}

const dragStart = (e) => {
    isDragging = true;
    startY = e.pageY || e.touches?.[0].pageY;
    startHeight = parseInt(sheetContent.style.height);
    bottomSheet.classList.add("dragging");
}

const dragging = (e) =>{
    if(!isDragging) return;
    const delta = startY - (e.pageY || e.touches?.[0].pageY);
    const newHeight = startHeight + delta / window.innerHeight * 100;
    updateSheetHeight(newHeight);
    
}

const dragStop = () =>{
    isDragging = false;
    bottomSheet.classList.remove("dragging");
    const sheetHeight = parseInt(sheetContent.style.height);
    sheetHeight < 25 ? hideBottomSheet() : sheetContent > 75 ? updateSheetHeight(50) : updateSheetHeight(90);
}




dragIcon.addEventListener("touchstart", dragStart);
document.addEventListener("touchend", dragStop);
document.addEventListener("touchmove", dragging);

dragIcon.addEventListener("mousedown", dragStart);
document.addEventListener("mouseup", dragStop);
document.addEventListener("mousemove", dragging);
showModal.addEventListener("click", showBottomSheet);
sheetOverlay.addEventListener("click", hideBottomSheet);
