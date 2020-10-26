class Memory { //creates a Memory class to export later
    constructor() {
      this.memory = new Float64Array(1024); //create a memory block
      this.head = 0; //pointer is pointing to the head
    };
  
    allocate(size) { //reserve a block of memory cosisisting of (size) boxes
      if (this.head + size > this.memory.length) { //if the requested memory size if bigger than the current length
        return null; //method will fail
      };
  
      let start = this.head; //start at the head
  
      this.head += size; //point to the head + size
      return start; //return that value
    }
  
    free(ptr) {};
  
    copy(toIdx, fromIdx, size) { //method to copy memory - size = num of boxes - fromIdx = starting from - toIdx = start copy here
      if (fromIdx === toIdx) { //if the from and to are the same
        return; //do nothing
      };
  
      if (fromIdx > toIdx) { //if from is after the to
        for (let i = 0; i < size; i++) { //loop forward through value of (size)
          this.set(toIdx + i, this.get(fromIdx + i)); //start pasting from toIdx, get the value of fromIdx + (size)
        };
      } else { //if from is before the to
        for (let i = size - 1; i >= 0; i--) { //loop backward
          this.set(toIdx + i, this.get(fromIdx + i));
        };
      };
    };
  
    get(ptr) { //return the value stored at a certain memory address (ptr)
      return this.memory[ptr]; //go through memory and find (ptr)
    };
  
    set(ptr, value) { //method to set a value in a memory block
      this.memory[ptr] = value; //go through memory and set (value) in that block
    };
  };
  
  module.exports = Memory;