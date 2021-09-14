"use strict";
// Predefined keys for LS
const CATEGORY_KEY = "currentCategoryIndex";
const ITEM_KEY = "currentItemIndex";
const WAREHOUSE_KEY = "warehouseData";

class ClothingItem {
    // TODO: Task 1
    //Constructor 
    constructor(name = "", stock = 0, price = 0) {
        this._name = name;
        this._stock = stock;
        this._price = price;
    }
    // Ancessor 
    get name() {
        return this._name
    };
    get stock() {
        return this._stock
    };
    get price() {
        return this._price;
    }
    //Mutators 
    set name(newName) {
        this._name = newName;
    }
    set price(newPrice) {
        this._price = newPrice;
    }
    set stock(newStock) {
        this._stock = newStock;
    }
    //Methods 
    toString() {
        return "Name: " + this._name + ", Stock: " + this._stock + ", Price: " + this._price;
    }
    fromData(dataObject) {
        this._name = dataObject._name;
        this._stock = dataObject._stock;
        this._price = dataObject._price;
    }
}

class Inventory {
    // TODO: Task 1
    //Constructor 
    constructor() {
        this._warehouse = [];
    }
    //Accesors 
    get warehouse() {
        return this._warehouse;
    }
    //Mutator (No mutators as never "replace" the warehouse)
    //Method 

    addCategory(categoryName) {
        let category = {}
        this._warehouse.push(category)
        category.Name = categoryName;
        category.items = [];
    }

    addItem(clothingItem, categoryIndex) {
        // console.log(clothingItem, categoryIndex);
        if (clothingItem instanceof ClothingItem) {
            // console.log(this._warehouse);
            this._warehouse[categoryIndex].items.push(clothingItem);
            console.log(this._warehouse);
        }
    }
    getItem(categoryIndex, itemIndex) {
        let item = this._warehouse[categoryIndex].item[itemIndex];
        return item
    }
    fromData(data) {
        this._items = [];
        for (let i = 0; i < data.length; i++) {
            let item = new ClothingItem();
            item.fromData(data[i]);
            this._items.push(item);
        }
    }

}

/**
 * checkLSData function
 * Used to check if any data in LS exists at a specific key
 * @param {string} key LS Key to be used
 * @returns true or false representing if data exists at key in LS
 */
function checkLSData(key) {
    if (localStorage.getItem(key) != null) {
        return true;
    }
    return false;
}

/**
 * retrieveLSData function
 * Used to retrieve data from LS at a specific key. 
 * @param {string} key LS Key to be used
 * @returns data from LS in JS format
 */
function retrieveLSData(key) {
    let data = localStorage.getItem(key);
    try {
        data = JSON.parse(data);
    }
    catch (err) { }
    finally {
        return data;
    }
}
/**
 * updateLSData function
 * Used to store JS data in LS at a specific key
 * @param {string} key LS key to be used
 * @param {any} data data to be stored
 */
function updateLSData(key, data) {
    let json = JSON.stringify(data);
    localStorage.setItem(key, json);
}

