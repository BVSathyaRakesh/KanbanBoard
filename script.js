
//select
const  modalContainer = document.querySelector('.modal-cont');
const addBtnContainer = document.querySelector('.add-btn');
const colorModalArr = document.querySelectorAll('.color_modal');
const textAreaCont = document.querySelector('.textarea-cont');
const mainCont = document.querySelector('main');

//Variable
const uid = new ShortUniqueId({ length: 5 });


//add event listener to add-btn container
addBtnContainer.addEventListener('click',function(){
  modalContainer.style.display = 'flex';
})


// select all the color box
for(let i=0;i< colorModalArr.length;i++){
    let currentElement = colorModalArr[i];
    // remove the selected from everyone
       currentElement.addEventListener('click',function (event){

        for(let i=0;i< colorModalArr.length;i++){
            colorModalArr[i].classList.remove('selected');
        }
      
       //add to that element that was clicked
       const targetColorElem = event.target;
       targetColorElem.classList.add('selected');

    })
}


textAreaCont.addEventListener('keypress',function (e){

    if(e.key == 'Enter' && e.shiftKey == true){
        modalContainer.style.display = 'none';

        //create the Ticket

        //text
        const task = textAreaCont.value;
        //current Color
        const currentColor = modalContainer.querySelector('.selected');
        const taskColor = currentColor.getAttribute('currColor');
      

        //reset your model to default
        textAreaCont.value = "";

        createTicket(taskColor,task);
    }
    
})


 function createTicket(taskColor,task){

    const id = uid.rnd();
    
    const ticketContainer = document.createElement('div');
    ticketContainer.setAttribute('class','ticket-cont');

    ticketContainer.innerHTML = `<div class="ticket-color ${taskColor}"></div>
    <div class="ticket-id">#${id}</div>
    <div class="ticket-area">${task}</div>
    <i class="fa-solid fa-lock lock-icon"></i>` 

    mainCont.appendChild(ticketContainer);

    const lockButton = ticketContainer.querySelector('.lock-icon');
    const textArea =  ticketContainer.querySelector('.ticket-area');

     handleLockBtn(lockButton,textArea);

 }

 function handleLockBtn(lockButton,textArea){

    lockButton.addEventListener('click',function(){
        const isLocked =  lockButton.classList.contains('fa-lock');

        if(isLocked == true){
            lockButton.classList.remove('fa-lock');
            lockButton.classList.add('fa-lock-open');
            textArea.contentEditable = true;
        }else{
            lockButton.classList.add('fa-lock');
            lockButton.classList.remove('fa-lock-open');
            textArea.contentEditable = false;
        }
    })

 }

