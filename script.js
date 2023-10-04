
//select
const  modalContainer = document.querySelector('.modal-cont');
const addBtnContainer = document.querySelector('.add-btn');
const colorModalArr = document.querySelectorAll('.color_modal');
const textAreaCont = document.querySelector('.textarea-cont');
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
    }
    
})

