//Problem = no user interaction
//Solution = add user interactivity


var taskInput = document.getElementById("new-task"); //new-task
var addButton = document.getElementsByTagName("button")[0]; //first button
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); //unordered list #incomplete-tasks
var completedTasksHolder = document.getElementById("completed-tasks"); //unordered list #completed-tasks

//new task list item
var createNewTaskElement = function (taskString) {
       //create list item
         var listItem = document.createElement("li"); 
        //input checkbox
        var checkBox = document.createElement("input");
        //label
        var label = document.createElement("label")
        //input text in edit mode
        var editInput = document.createElement("input")
        //button.edit
        var editButton = document.createElement("button")
        //button.delete
        var deleteButton = document.createElement("button")
        //each element will need to be modified 
        
        checkBox.type = "checkbox";
        label.innerText = taskString;
        editInput.type = "text";
        editButton.innerText = "Edit";
        editButton.className = "edit";
        deleteButton.innerText = "Delete";
        deleteButton.className = "delete";
        
        
        //and each elements needs to be appended
        listItem.appendChild(checkBox);
        listItem.appendChild(label);
        listItem.appendChild(editInput);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);
        return listItem;
}

//Add tasks
var addTask = function () {
    console.log("Add task...");
    //create a new list item with the text from #new-task
    var listItem = createNewTaskElement(taskInput.value);
    //append listItem to incompleteTasksHolder
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem,completeTask);
    
    taskInput.value=""; //This just clears the add task text input after its added 
}
        
//Edit tasks
var editTask = function () {
     console.log("Edit task...")

    //When edit button is pressed
    
    var listItem = this.parentNode;
    var editInput = listItem.querySelector("input[type=text]");
    var label = listItem.querySelector("label");
    var containsClass = listItem.classList.contains("editMode");
            // if the class of the parent is .editMode
            
            if (containsClass) {
               //Switch from editMode
               //make the label text become the input's value  
               label.innerText = editInput.value;
            }
            
                     else {
                         // else 
                //switch to editMode
                // input value becomes the label's text
                editInput.value = label.innerText;
                     }   
            
            //toggle .editMode on the parent to change CSS
            listItem.classList.toggle("editMode");
            
   }         
            
//Delete tasks
var deleteTask = function () {
     console.log("Delete task...")
    //When delete button is pressed
            // remove parent list item from the ul
            var listItem = this.parentNode;
            var ul = listItem.parentNode;
            ul.removeChild(listItem);
     }       
            
//Mark tasks as complete
var completeTask = function () {
     console.log("Task complete...")
    // When the checkbox is checked 
        // append the task list item to the #completed-tasks list
    var listItem = this.parentNode
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem,incompleteTask);
    }

//Mark tasks as incomplete
var incompleteTask = function () {
     console.log("Task incomplete...")

    // when the checkbox is unchecked
        // append this to #incomplete-tasks list
    var listItem = this.parentNode
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem,completeTask);
}

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {    //taskListItem is a place holder for the two lists below using the for loops
    console.log("Bind task event...")
      //select taskListItem's children
      var checkBox = taskListItem.querySelector("input[type=checkbox]");
      var editButton = taskListItem.querySelector("button.edit");
      var deleteButton = taskListItem.querySelector("button.delete");
        //bind the editTask to the edit button
        editButton.onclick = editTask;
        //bind the deleteTask to the delete button
        deleteButton.onclick = deleteTask;
        //bind checkboxEventHandler to the checkbox 
         checkBox.onchange = checkBoxEventHandler;
    
}

//Set the click handler to the addTask function

var ajaxRequest = function () {
    console.log("AJAX Request");
}

addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);




//cycle over incompleteTaskHolders ul list items
for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
            //bind events to list item's children (completeTask)
            bindTaskEvents(incompleteTasksHolder.children[i], completeTask);
}


        
//cycle over completeTaskHolders ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++) {
            //bind events to list item's children (completeTask)
            bindTaskEvents(completedTasksHolder.children[i], incompleteTask);
}

         
                


