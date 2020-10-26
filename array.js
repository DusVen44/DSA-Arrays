const memory = require('./memory'); //import memory.js
console.log(memory)

class Array {
    constructor() {
        this.length = 0; //start with a length of 0
        this._capacity = 0; //how many items you can hold without resizing
        this.ptr = memory.allocate(this.length); //pointer to 0 block of memory
    };

    _resize(size) { //method to resize the array
        const oldPtr = this.ptr; //declare value for current/old pointer
        this.ptr = memory.allocate(size); //reserve a block of memory with the value of (size)
        if (this.ptr === null) { //if the pointer is null
            throw new Error('Out of memory'); //throw this error
        };
        memory.copy(this.ptr, oldPtr, this.length); //copy old point to the new pointer
        memory.free(oldPtr); //free up the old ptr value
        this._capacity = size; //the new capacity is equal to the size
    };

    push(value) { //method to add item to the array
        if (this.length >= this._capacity) { //if the length is >= the capacity (ran out of space)
            this._resize((this.length + 1) * Array.SIZE_RATIO); //resize array 
        };
        memory.set(this.ptr + this.length, value); //set memory to be equal to the value
        this.length++; //add 1 to current length
    };

    get(index) { //retrieve value of an index
        if (index < 0 || index >= this.length) { //if you ask for negative index or value too high
            throw new Error('Index ERROR'); //throw this error
        };
        return memory.get(this.ptr + index); //get the value of the (index)
    };

    pop() { //pop off value at the end of the array
        if (this.length === 0) { //if the array length is 0
            throw new Error('Index ERROR') //throw this error
        };
        const value = memory.get(this.ptr + this.length - 1); //get the value of the 2nd to last index
        this.length--; //length is subtracted by 1
        return value; //return the value of the new last item
    };

    insert(index, value) { //insert new value anywhere
        if (index < 0 || index >= this.length) { //if you ask for negative or too high of value 
            throw new Error('Index ERROR') //throw this error
        };
        if (this.length >= this._capacity) {
            this._resize((this.length + 1) * Array.SIZE_RATIO);
        };
        memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index); //move every value AFTER (index) over 1 spot
        memory.set(this.ptr + index, value); //set memory
        this.length++; //add 1 to length
    };

    remove(index) { //delete value
        if (index < 0 || index >= this.length) { //if you ask for negative or too high of value
            throw new Error('Index error'); //throw this error
        }
        memory.copy(this.ptr + index, this.ptr + index + 1, this.length - index - 1); //move every value after (index) backwards 1 spot
        this.length--; //shorten the length by 1
    };

};

function main() {
    Array.SIZE_RATIO = 3;
    let arr = new Array();
    arr.push(3);
    console.log(arr);
}

console.log(main())