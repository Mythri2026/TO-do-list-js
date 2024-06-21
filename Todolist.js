const todoValue = document.getElementById("todoText"),
  listItems = document.getElementById("list-items"),
  addUpdateClick = document.getElementById("AddUpdateClick"),
  AlertMessage = document.getElementById("AlertMessage");

let updateText;
let todoData = JSON.parse(localStorage.getItem("todoData-list"));
if(!todoData){
    todoData = [];
  }

  todoValue.addEventListener("keypress",function(e){
    //setAlertMessage("");
    if(e.key === "Enter"){
      addUpdateClick.click();
          }
  });

  function ReadToDoItems(){
    todoData.forEach((element) =>{
      let li = document.createElement("li");
      let style="";
      if(element.status){
        style="style='text-decoration: line-through'";
      }
      const todoItems = `<div ${style} title="Hit Double Click and Complete" ondblclick="CompletedToDoItems(this)">${
      element.item
    }
    ${
      style === ""
        ? ""
        : '<img class="todo-controls" src="mark.jpeg" />'
    }</div><div>
    ${
      style === ""
        ? '<img class="edit todo-controls" onclick="UpdateToDoItems(this)" src="pencil.jpeg" />'
        : ""
    }
    <img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="bin.jpeg" /></div></div>`
      li.innerHTML=todoItems;
      listItems.appendChild(li);
    });
  }
  ReadToDoItems();

function CreateToDoItems() {
  if(todoValue.value === "") {
    //AlertMessage.innerText = "Please enter your todo text!";
    alert("Please enter your todo text!");
   todoValue.focus();
  } else{
    let IsPresent = false;
    todoData.forEach((element)=>{
      if(element.item==todoValue.value){
        IsPresent=true;
      }
    });

    if(IsPresent){
      setAlertMessage("This item already present in  the List!");
      return;
    }

  let li = document.createElement("li");
  const todoItems = `<div title="Hit Double click and Complete" ondblclick="CompletedToDoItems(this)">${todoValue.value}
                      </div><div><img class = "edit todo-controls" onclick="UpdateToDoItems(this)"
                       src="pencil.jpeg" /><img class="delete todo-controls" onclick="DeleteToDoItems(this)" 
                       src="bin.jpeg"/></div></div>`;

  li.innerHTML = todoItems;
  listItems.appendChild(li);

  if(!todoData){
    todoData = [];
  }
  let itemList = { item: todoValue.value, status:false };
  todoData.push(itemList);
  setLocalStorage();
  todoValue.value =  "";
  setAlertMessage("Todo item created Successfully!");
}
}

function CompletedToDoItems(e) {
  if (e.parentElement.querySelector("div").style.textDecoration === "") {
    const img = document.createElement("img");
    img.src = "mark.jpeg";
    img.className = "todo-controls";
    e.parentElement.querySelector("div").style.textDecoration = "line-through";
    e.parentElement.querySelector("div").appendChild(img);
    e.parentElement.querySelector("img.edit").remove();

    todoData.forEach((element) => {
      if (
        e.parentElement.querySelector("div").innerText.trim() === element.item
      ) {
        element.status = true;
      }
    });
    setLocalStorage();
    setAlertMessage("Todo item Completed Successfully!");
  }
}


function UpdateToDoItems(e){
  if(e.parentElement.parentElement.querySelector("div").style.textDecoration === "")
 {
  todoValue.value=e.parentElement.parentElement.querySelector("div").innerText;
  updateText = e.parentElement.parentElement.querySelector("div");
  addUpdateClick.setAttribute("onclick","UpdateOnSelectionItems()");
  addUpdateClick.setAttribute("src","recycle.jpeg");
  todoValue.focus();
}
}

function UpdateOnSelectionItems() {
  let IsPresent = false;
  todoData.forEach((element)=>{
    if(element.item == todoValue.value){
      IsPresent=true;
    }
  });
  if(IsPresent){
    setAlertMessage("This item already present in the List!");
    return;
  }

  todoData.forEach((element) => {
    if(element.item == updateText.innerText.trim()){
      element.item=todoValue.value;
    }
  });
  setLocalStorage();

  updateText.innerText=todoValue.value;
  addUpdateClick.setAttribute("onclick","CreateToDoItems()");
  addUpdateClick.setAttribute("src","plus.jpeg");
  todoValue.value="";
  setAlertMessage("Todo item Successfully updated!");
}

function DeleteToDoItems(e) {
  let deleteValue = e.parentElement.parentElement.querySelector("div").innerText;
  if(confirm(`Are you sure?. Do you want to delete this ${deleteValue}!`)){
    e.parentElement.parentElement.setAttribute("class","deleted-item");
    todoValue.focus();

    todoData.forEach((element)=>{
      if(element.item == deleteValue.trim()){
        todoData.splice(element, 1);
      }
    });
    setTimeout(()=>{
    e.parentElement.parentElement.remove() ;
  } ,1000 ) ;
    setAlertMessage("Todo item Deleted Successfully!");

    setLocalStorage();
  }
}

function setLocalStorage(){
  localStorage.setItem("todoData",JSON.stringify(todoData));
}

function setAlertMessage(message) {
  AlertMessage.removeAttribute("class");
  AlertMessage.innerText = message;

  setTimeout(()=>{
    AlertMessage.classList.add("toggleMe")  ;
  },1000);
}


