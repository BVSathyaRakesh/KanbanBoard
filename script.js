//select
const  modalContainer = document.querySelector('.modal-cont');
const addBtnContainer = document.querySelector('.add-btn');
const colorModalArr = document.querySelectorAll('.color_modal');
const textAreaCont = document.querySelector('.textarea-cont');
const mainCont = document.querySelector('main');
const priorityColorsArr = document.querySelectorAll(".toolbox-priority-cont .color");

const deleteBtn = document.querySelector('.remove-btn');


//Variable
const uid = new ShortUniqueId({ length: 5 });
const colorsArray = ["red", "blue", "green", "purple"];
let deleteFlag = false;

let ticketsArray =[];

if (localStorage.getItem('ticketsArray') != null) {
    let strTicketsArray = localStorage.getItem('ticketsArray');
    ticketsArray = JSON.parse(strTicketsArray);

    //with the help of that object create a ticket
    for (let i = 0; i < ticketsArray.length; i++) {
        let ticketObj = ticketsArray[i];
        createTicket(
            ticketObj.color,
            ticketObj.task,
            ticketObj.id,
            true);
    }
}




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

for (let i = 0; i < priorityColorsArr.length; i++) {
    let currentColorElem = priorityColorsArr[i];
    currentColorElem.addEventListener("dblclick", function () {
        console.log("dblclick");
        for (let i = 0; i < priorityColorsArr.length; i++) {
            // console.log(colorModalArr[i].classList);
            priorityColorsArr[i].classList.remove("selected");
        }
        /********************ui********************/

        showAllTickets();
    })
}

/**************filtering logic on the tickets**********/
for (let i = 0; i < priorityColorsArr.length; i++) {
    let currentColorElem = priorityColorsArr[i];
    currentColorElem.addEventListener("click", function (event) {
        console.log("click")
        /*******************UI*********************/
        // registering the color
        // remove the selected from everyone
        for (let i = 0; i < priorityColorsArr.length; i++) {
            // console.log(colorModalArr[i].classList);
            priorityColorsArr[i].classList.remove("selected");
        }
        // add to that element thta was clicked
        const targetColorElem = event.target;
        // console.log("````````````````````");
        // console.log(targetColorElem)
        targetColorElem.classList.add("selected");
        /********************ui********************/

        const currentColor = colorsArray[i];
        filterTickets(currentColor);
    })
}


//  Main App handler Functions

//add event listener to add-btn container
addBtnContainer.addEventListener('click',function(){
    modalContainer.style.display = 'flex';
  })
  
  

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




 deleteBtn.addEventListener('click',function(){
     
     if(deleteFlag == false){
        deleteBtn.style.color = 'red';
        deleteFlag = true;
     }
     else {
        deleteBtn.style.color = 'black';
        deleteFlag = false;
     }
 })


/**************Helper Functions**********/

function createTicket(taskColor, task, pId, flag){

    let id;
    if (flag == true) {
        id = pId;
    } else {
        id = uid.rnd();
    }
    
    const ticketContainer = document.createElement('div');
    ticketContainer.setAttribute('class','ticket-cont');

    ticketContainer.innerHTML = `<div class="ticket-color ${taskColor}"></div>
    <div class="ticket-id">#${id}</div>
    <div class="ticket-area">${task}</div>
    <i class="fa-solid fa-lock lock-icon"></i>` 

    mainCont.appendChild(ticketContainer);

    const lockButton = ticketContainer.querySelector('.lock-icon');
    const textArea =  ticketContainer.querySelector('.ticket-area');
    const ticketColorElem = ticketContainer.querySelector('.ticket-color');


    if (flag == undefined) {
        let ticketObj = {
            id: id,
            task: task,
            color: taskColor
        }

        ticketsArr.push(ticketObj);
        setLocalStorage();
    }

     handleLockBtn(lockButton,textArea);
     handleChangeColor(ticketColorElem);

     handleDelete(ticketContainer,id);

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

         /*************************local storage***********************/
         for (let i = 0; i < ticketsArr.length; i++) {
            let ticketObj = ticketsArr[i];
            if (ticketObj.id == id) {
                // overriding 
                let newTask = ticketArea.innerText;
                ticketObj.task = newTask;
                break;
            }
        }
        setLocalStorage();
    })

 }

 function handleChangeColor(ticketColorElem){
    ticketColorElem.addEventListener('click',function(){
        let cColor = ticketColorElem.classList[1];
        // console.log("cColor", cColor);
        let cidx = colorsArray.indexOf(cColor);
        // 0       1       2         3
        // ["red", "blue", "green", "purple"];
        let nidx = (cidx + 1) % colorModalArr.length;

        let nextColor = colorsArray[nidx];
        ticketColorElem.classList.remove(cColor);
        ticketColorElem.classList.add(nextColor);

/*************************local storage***********************/
        for (let i = 0; i < ticketsArray.length; i++) {
            let ticketObj = ticketsArray[i];
            if (ticketObj.id == id) {
                ticketObj.color = nextColor;
                break;
            }
        }
        setLocalStorage();

    })
 }

 function handleDelete(ticketContainer,id){
      
    ticketContainer.addEventListener('click',function(){
        if(deleteFlag == true){
            let res = confirm("do you want to delete it");
            if (res) {
                ticketContainer.remove();
/*************************local storage***********************/
                let ridx;
                for (let i = 0; i < ticketsArray.length; i++) {
                    let ticketObj = ticketsArray[i];
                    if (ticketObj.id == id) {
                        ridx = i;
                    }
                }
                ticketsArray.splice(ridx, 1);
                setLocalStorage();
            }
        }
    })
     
 }

 function filterTickets(currentColor) {
    console.log("element to be visible will be of color ", currentColor);
    // 1. select all the latest tickets
    const ticketsArr = mainCont.querySelectorAll(".ticket-cont");
    //  loop through all the tickets
    for (let i = 0; i < ticketsArr.length; i++) {
        const cTicket = ticketsArr[i];
        console.log(cTicket);
        let isPresent = cTicket.querySelector(`.${currentColor}`);
        if (isPresent == null) {
            cTicket.style.display = "none";
        } else {
            cTicket.style.display = "block";
        }
        // only make the ticket visible when the ticket color ==currentColor
    }
}

function showAllTickets() {
    // 1. select all the latest tickets
    const ticketsArr = mainCont.querySelectorAll(".ticket-cont");
    //  loop through all the tickets
    for (let i = 0; i < ticketsArr.length; i++) {
        const cTicket = ticketsArr[i];
        cTicket.style.display = "block";
        // only make the ticket visible when the ticket color ==currentColor
    }
}


function setLocalStorage() {
    const strTicketsArr = JSON.stringify(ticketsArr);
    localStorage.setItem("ticketsArr", strTicketsArr);
}