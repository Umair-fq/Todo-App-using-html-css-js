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

//value of serial number which will be auto-incremented for each row
var sr = 0;




addBtn.addEventListener("click", () => {
    form.classList.remove("hidden")
    tableContainer.classList.add("hidden")
})


saveBtn.addEventListener("click", (event) => {
    event.preventDefault();
  
    // Increment sr after inserting the row
    sr += 1;
    console.log(`called ${sr} time`);
  
    var rowCount = table.rows.length;
    // var cellCount = table.rows[0].cells.length;
    var row = table.insertRow(rowCount);
    row.insertCell(0).innerHTML = sr;
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
    const sr = cells[0].innerHTML;
    const priority = cells[1].innerHTML;
    const title = cells[2].innerHTML;
    const description = cells[3].innerHTML;
    const dueDate = cells[4].innerHTML;
  
    // Update the form fields with the row data
    taskTitle.value = title;
    description.value = description;
    priority.value = priority;
    dueDate.value = dueDate;
  
    // Delete the row
    deleteRow(row);
  
    // Show the form for editing
    form.classList.remove("hidden");
    tableContainer.classList.add("hidden");
  }
  
  // Add event listeners to the table
  table.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("delete")) {
      // Delete button clicked
      const row = target.parentNode.parentNode;
      deleteRow(row);
    } else if (target.classList.contains("edit")) {
      // Edit button clicked
      const row = target.parentNode.parentNode;
      editRow(row);
    }
  });
  
  // ...
  