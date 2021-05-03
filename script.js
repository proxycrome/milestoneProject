// const students = [
//     {"id": 1, "FirstName": "Victor", "SurName": "Ezeonwuka", "Age": 29, "Level": 300, "Favorite Club": "Barcelona", "edit": "delete"},
//     {"id": 2, "FirstName": "Ayo", "SurName": "Garba", "Age": 27, "Level": 300, "Favorite Club": "Arsenal", "edit": "delete"},
//     {"id": 3, "FirstName": "Nkechi", "SurName": "Chigozie", "Age": 28, "Level": 400, "Favorite Club": "Juventus", "edit": "delete"},
//     {"id": 4, "FirstName": "Simi", "SurName": "Adekunle", "Age": 25, "Level": 200, "Favorite Club": "Real Madrid", "edit": "delete"},
//     {"id": 5, "FirstName": "Sylvia", "SurName": "Adejoke", "Age": 23, "Level": 100, "Favorite Club": "Manchester United", "edit": "delete"}
// ];

const students = [];


const tableBody = document.querySelector('#user_data > tbody');
var button = document.querySelector('#btn');


const addUser = (ev) => {
    if(validate()){
        ev.preventDefault(); // To stop the form from submitting to the url
        let object = {
            "id" : Date.now(),
            "FirstName": document.getElementById('fname').value,
            "Surname": document.getElementById('sname').value,
            "Age": document.getElementById('age').value,
            "Level": document.getElementById('clevel').value,
            "Favorite Club": document.getElementById('fclub').value,
            "action": "delete"
        };
        students.push(object); 
        populateData(students) 
        document.querySelector('form').reset() // Clears the form for the next entries 
        localStorage.setItem("studentsList", JSON.stringify(students)) 
    }
}


function onDelete(td){
    if(confirm("Are you sure you want to delete this record?")){
        row = td.parentElement.parentElement;
        document.getElementById("user_data").deleteRow(row.rowIndex);
        resetForm();
    }
}


function populateData(students){
    // Clears out Existing table data..
    while(tableBody.firstChild){
        tableBody.removeChild(tableBody.firstChild);
    }

    // Populate Table
    students.forEach((row) => {
        const tr = document.createElement("tr");

        for(var item in row){
            const td = document.createElement("td");
            if(item === "action"){
                const button = document.createElement("button");
                button.textContent = row[item];
                // button.setAttribute("type", "submit");
                button.setAttribute("class", "table_btn");
                button.setAttribute("onClick", "onDelete(this)")
                td.appendChild(button);
                tr.appendChild(td);
            }else{
                td.textContent = row[item];
                tr.appendChild(td);
            }
        }

        tableBody.appendChild(tr);
    })

}


function validate(){
    isValid = true;
    if(document.getElementById("fname").value === ""){
        isValid = false;
        document.getElementById("firstNameValidationError").classList.remove("hide");
    }else{
        isValid = true;
        if(!document.getElementById("firstNameValidationError").classList.contains("hide")){
            document.getElementById("firstNameValidationError").classList.add("hide");
        }
    }
    
    if(document.getElementById("sname").value === ""){
        isValid = false;
        document.getElementById("surNameValidationError").classList.remove("hide");
    }else{
        isValid = true;
        if(!document.getElementById("surNameValidationError").classList.contains("hide")){
            document.getElementById("surNameValidationError").classList.add("hide");
        }
    }
    
    if(document.getElementById("age").value === ""){
        isValid = false;
        document.getElementById("ageValidationError").classList.remove("hide");
    }else{
        isValid = true;
        if(!document.getElementById("ageValidationError").classList.contains("hide")){
            document.getElementById("ageValidationError").classList.add("hide");
        }
    } 
    
    if(document.getElementById("clevel").value === ""){
        isValid = false;
        document.getElementById("currentLevelValidationError").classList.remove("hide");
    }else{
        isValid = true;
        if(!document.getElementById("currentLevelValidationError").classList.contains("hide")){
            document.getElementById("currentLevelValidationError").classList.add("hide");
        }
    } 
    
    if(document.getElementById("fclub").value === ""){
        isValid = false;
        document.getElementById("favoriteClubValidationError").classList.remove("hide");
    }else {
        isValid = true;
        if(!document.getElementById("favoriteClubValidationError").classList.contains("hide")){
            document.getElementById("favoriteClubValidationError").classList.add("hide");
        }
    }
    return isValid
}


document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#btn").addEventListener("click", addUser)
})