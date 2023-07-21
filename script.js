const addBtn = document.querySelector(".addBtn")
const saveBtn = document.querySelector(".save")
const form = document.querySelector(".taskForm")
const tableContainer = document.querySelector(".container")
const table = document.getElementById("table")
const taskTitle = document.getElementById("title")
const description = document.getElementById("description")
const priority = document.getElementById("priority") //getting priority through select tag
const dueDate = document.getElementById("date")
const taskFile = document.getElementById("taskFile")
const searchBtn = document.querySelector(".searchBtn")
//value of serial number which will be auto-incremented for each row
var sr = 0;




addBtn.addEventListener("click", () => {
    form.classList.remove("hidden")
    tableContainer.classList.add("hidden")
})


saveBtn.addEventListener("click", (event) => {
    var isFieldsEmpty = false
    event.preventDefault();
  
    // Increment sr after inserting the row
    sr += 1;
    // console.log(`called ${sr} time`);

    if ((!taskTitle.value) || (!description.value) || (!priority.value) || (!dueDate.value)) {
        alert("please fill all fields")
        isFieldsEmpty = true
    }

    //getting the current date, so that task can not have a past date
    let currentDate = new Date()
    var dd = String(currentDate.getDate()).padStart(2, '0')
    var mm = String(currentDate.getMonth() + 1).padStart(2, '0')
    var yyyy = currentDate.getFullYear()

    currentDate = yyyy + '-' + mm + '-' + dd

    console.log("due date", dueDate.value, "current date: ", currentDate)

    if(dueDate.value < currentDate){
      alert("please select valid date")
      isFieldsEmpty = true
    }
  
    if (!isFieldsEmpty) {

      var rowCount = table.rows.length;
    // var cellCount = table.rows[0].cells.length;
      var row = table.insertRow(rowCount);
      row.insertCell(0).innerHTML = rowCount;
      row.insertCell(1).innerHTML = priority.value;
      row.insertCell(2).innerHTML = taskTitle.value;
      row.insertCell(3).innerHTML = description.value;
      row.insertCell(4).innerHTML = dueDate.value;
      row.insertCell(5).innerHTML = '<button type="submit" class="delete">Delete</button>';
      row.insertCell(6).innerHTML = '<button type="submit" class="edit">Edit</button>';
  
      taskTitle.value = "";
      description.value = "";
      priority.value = "";
      dueDate.value = "";
  
      form.classList.add("hidden");
      tableContainer.classList.remove("hidden");
    }
  })

  // ...

// Function to delete a row
function deleteRow(row) {
    const rowIndex = row.rowIndex;
    table.deleteRow(rowIndex);
  }
  
  // Function to edit a row
  function editRow(row) {

    // Get the data from the row
    const cells = row.cells;
    // console.log(cells)
    // const sr = cells[0].innerHTML;
    const new_priority = cells[1].innerHTML;
    const new_title = cells[2].innerHTML;
    const new_description = cells[3].innerHTML;
    const new_dueDate = cells[4].innerHTML;

    // console.log(cells[1].innerHTML)
    // console.log(cells[2].innerHTML)
    // console.log(cells[3].innerHTML)
    // console.log(cells[4].innerHTML)

    // Update the form fields with the row data
    taskTitle.value = new_title;
    description.value = new_description;
    priority.value = new_priority;
    dueDate.value = new_dueDate;
  
    console.log(row)

    // Delete the row
    deleteRow(row);
  
    // Show the form for editing
    form.classList.remove("hidden");
    tableContainer.classList.add("hidden");
  }
  
  // Add event listeners to the table
  table.addEventListener("click", (event) => {
    const target = event.target;
    // console.log(target)
    if (target.classList.contains("delete")) {
      // Delete button clicked
      const row = target.parentNode.parentNode;
      deleteRow(row);
    } else if (target.classList.contains("edit")) {
      // Edit button clicked
      const row = target.parentNode.parentNode;
      // console.log(row)
      editRow(row);
    }
  });
  
  // ...
  
  searchBtn.addEventListener("click", ()=> {
    const searchPriority = document.getElementById("searchPriority").value
    // console.log(searchPriority)
    //whenever we will click on search button, it will take all the rows in this variable
    const rows = table.getElementsByTagName("tr")
    // console.log(rows)
    //setting the default view of al the rows
    for(let i = 1; i < rows.length; i++){
      rows[i].style.display = ""
    }
    
    if(searchPriority !== ""){
      for(let i = 1; i < rows.length; i++){
        //taking the value of priority cell of the row of the table
        const priorityCell =  rows[i].getElementsByTagName("td")[1]
        //actually some browsers support innerText and some do not
        const priority = priorityCell.innerText || priorityCell.textContent
        if(searchPriority != priority){
          //if the value of priority of the current row of the table is not equal to the value of priority selected through dropdown
          //then hide them
          rows[i].style.display = "none"
        }
      }
    }
  })