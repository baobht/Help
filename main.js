"use strict";
/**
 * edit function
 * Runs when the edit button of an item is clicked.
 * Sends the user to the edit page after storing the information necessary
 * @param {number} category category index in inventory
 * @param {number} item item index in inventory
 */
// Global inventory variable
let inv = new Inventory();
let category = ["Footware", "Top", "Bottom", "Accesories"];
for (let i = 0; i < category.length; i++) {
    inv.addCategory(category[i])
}

// Check if data available in LS before continuing
if (checkLSData(WAREHOUSE_KEY)) {
    // If data exists, retrieve it
    let data = retrieveLSData(WAREHOUSE_KEY);
    // Restore data into inv
    inv.fromData(data);
}
// Function
function edit(category, item) {
    // store data in LS
    localStorage.setItem(CATEGORY_KEY, category);
    localStorage.setItem(ITEM_KEY, item);
    // redirect to edit page
    window.location = "edit.html";
}
/**
 * addClothingCategory function
 * Runs when 'Add Category' is clicked on the header nav bar.
 * Creates a new category, saves it in LS and updates the display
 */
function addClothingCategory() {
    // Get category name
    let newCategory = prompt("Name of new category?");
    // if user clicks cancel
    if (newCategory == null) {
        return;
    }
    // Try again if empty input
    while (newCategory == "") {
        alert("That input is invalid");
        newCategory = prompt("Name of new category?");
    }
    // Confirm add category
    if (confirm(`Confirm to add ${newCategory} as a category?`)) {
        // add to inventory
        inventory.addCategory(newCategory);
        // update LS
        updateLSData(WAREHOUSE_KEY, inventory);
        // update display
        displayInventory(inventory);
    }
}
/**
 * cancelAddClothingItem function
 * Runs when the cancel button is clicked inside the dialog polyfill.
 * Closes the dialog box.
 */
function cancelAddClothingItem() {
    // close dialog box
    dialog.close();
}

function addClothingItem() {
    // TODO: Task 2

    // Reset the dialog box
    document.getElementById("newItemName").innerHTML = "";
    document.getElementById("newItemStock").value = "";
    document.getElementById("newItemPrice").value = "";
    dialog.showModal()


    // Add item to the inventory
    // console.log(categoryIndex);
    // console.log(inv);
    // console.log(inv.addItem(item, 1));
    // Inventory.prototype.addItem(item, categoryIndex)
    // Dialog open

}

function displayInventory(inventory) {
    // console.log(123123123123);

    // TODO: Task 3
    let itemOutput = "";
    let stockOutput = "";
    let priceOutput = "";
    console.log(inventory._warehouse);
    var containString = ""
    // inventory = confirmAddClothingItem();
    for (let i = 0; i < inventory._warehouse.length; i++) {
        // console.log(i);
        let listOfItemInSpecCat = inventory._warehouse[i].items;
        // console.log(typeof item);
        for (let j = 0; j < listOfItemInSpecCat.length; j++) {
            let str = '<tr>'
            // console.log(listOfItemInSpecCat);
            // itemOutput += `${listOfItemInSpecCat[j]._name}\n`;
            // stockOutput += `${listOfItemInSpecCat[j]._stock}\n`;
            // priceOutput += `${listOfItemInSpecCat[j]._price}\n`;
            str +=
                `
            <td class="mdl-data-table__cell--non-numeric"><span id="newItemName">${listOfItemInSpecCat[j]._name}</span></td>
            <td><span id="newItemStock">${listOfItemInSpecCat[j]._stock}</td>
            <td><span id="newItemPrice">${listOfItemInSpecCat[j]._price}</td>
            <td><button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button"
                onclick="edit(0,0)">Edit</button></td>
                </tr>
            `
            // console.log(str);
            containString += str


            // return(
            //     `<tr>
            //     <td class="mdl-data-table__cell--non-numeric"><span id="newItemName">asd</span></td>
            //     <td><span id="newItemStock"></td>
            //     <td><span id="newItemPrice"></td>
            //     <td><button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button"
            //         onclick="edit(0,0)">Edit</button></td>
            //     </tr>`
            // )


        }
        // if (typeof item == "object")

    }
    document.getElementById("tableTemp").innerHTML = containString

    console.log(containString);
    // console.log(itemOutput, stockOutput, priceOutput);
    // console.log(document.getElementById("newItemName"));
    // document.getElementById("newItemName").innerHTML = itemOutput;
    // document.getElementById("newItemStock").innerHTML = stockOutput;
    // document.getElementById("newItemPrice").innerHTML = priceOutput;
}

function confirmAddClothingItem() {
    // TODO: Task 4
    // addClothingItem();
    let nameRef = document.getElementById("newItemName1");
    let stockRef = document.getElementById("newItemStock1");
    let priceRef = document.getElementById("newItemPrice1");
    let categoryRef = document.getElementById("newItemCategory");
    let newItemName = nameRef.value;
    let newItemStock = stockRef.value;
    let newItemPrice = priceRef.value;
    let categoryIndex = categoryRef.value;
    // console.log(categoryIndex, typeof categoryIndex);
    if (newItemName == "") {
        alert("Name has to be specified");
        return;
    }
    if (newItemPrice == null) {
        alert("Item price must be entered");
        return;
    }
    if (newItemStock == null) {
        alert("Item stock must be entered");
        return;
    }
    if (categoryIndex == "") {
        alert("Category is not specified");
        return;
    }
    // Get the value from the HTML file 

    let item = new ClothingItem(newItemName, newItemStock, newItemPrice);
    // Add item to the inventory
    inv.addItem(item, categoryIndex)
    dialog.close();
    displayInventory(inv)
}

// Global code
// Registers the dialog box polyfill
let dialog = document.getElementById("addDialog");
if (!dialog.showModal) {
    dialogPolyfill.registerDialog(dialog);
}
// Displays the warehouse inventory when the page loads
displayInventory(inv);


