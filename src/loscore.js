//console.log("Hello World");
// Let's make an object and start adding methods to it!
class LoScore {
  identity(val) {
    return val;
  }

  //ARRAYS

  uniq(array) {
    // YOUR CODE HERE
    const seen = {};
    const ret_arr = [];
    for (let i = 0; i < array.length; i++) {
      if (!seen[array[i]]) {
        ret_arr.push(array[i]);
        seen[array[i]] = true;
      }
    }
    return ret_arr;
  }

  // COLLECTIONS

  each(collection, iterator) {
    if (collection instanceof Array) {
      for (let i = 0; i < collection.length; i += 1) {
        iterator(collection[i], i, collection);
      }
    } else {
      const keys = Object.keys(collection);
      for (let i = 0; i < keys.length; i += 1) {
        iterator(collection[keys[i]], keys[i], collection);
      }
    }
  }

  map(collection, iteratee) {
    // YOUR CODE HERE
    const resultArr = [];
    this.each(collection, (val) => {
      resultArr.push(iteratee(val));
    });
    return resultArr;
  }

  filter(collection, test) {
    const result = [];
    this.each(collection, (val) => test(val) && result.push(val));
    return result;
  }

  reject(collection, test) {
    // const result = [];
    return this.filter(collection, (val) => {
      return !test(val);
    });
  }

  reduce(collection, iterator, accumulator) {
    // YOUR CODE HERE
    this.each(collection, (val) => {
      if (accumulator === undefined) accumulator = iterator(val, 0);
      else accumulator = iterator(accumulator, val);
    });
    return accumulator;
  }

  every(collection, test) {
    // YOUR CODE HERE
    if (collection.length === 0) {
      return true;
    }
    if (test === undefined) {
      for (const i of collection) {
        if (i) {
          return true;
        }
        return false;
      }
    }
    const bool = this.reduce(
      collection,
      (accumulator, value) => {
        accumulator.push(test(value));
        return accumulator;
      },
      []
    );
    let check = true;
    for (const i of bool) {
      if (!i) {
        check = false;
      }
    }
    return check;
  }

  /**
  | OBJECTS
  |~~~~~~~~~~
  * */
  extend(...obj) {
    // YOUR CODE HERE
    for (let i = 0; i < obj.length - 1; i++) {
      this.each(obj[i + 1], (value, key) => {
        obj[0][key] = value;
      });
    }
    return obj[0];
  }

  /**
  | FUNCTIONS
  |~~~~~~~~~~
  * */

  once(func) {
    // YOUR CODE HERE
    let counter = 0;
    let result;
    // console.log(func);
    function f(args) {
      if (counter === 0) {
        result = func(args);
      }
      counter++;
      return result;
    }
    return f;
  }

  memoize(func) {
    // YOUR CODE HERE
    const cache = {};
    return function(...args) {
      const key = JSON.stringify(args);
      if (cache[key]) {
        //console.log(cache)
        return cache[key];
      }

      const val = func(...args);
      //console.log(val)
      cache[key] = val;
      return val;
    };
  }

  invoke(collection, functionOrKey) {
    // YOUR CODE HERE
    let resultArr = [];
    //console.log(resultArr)
    if (typeof functionOrKey !== "function") {
      resultArr = this.map(collection, (i) => {
        return i[functionOrKey].apply(i);
      });
    } else if (typeof functionOrKey === "function") {
      resultArr = this.map(collection, (i) => {
        return functionOrKey.apply(i);
      });
    }
    return resultArr;
  }

  /**
  | ADVANCED REQUIREMENTS
  |~~~~~~~~~~~~~
  * */

  sortBy() {
    // YOUR CODE HERE
  }

  zip() {
    // YOUR CODE HREE
  }

  delay() {
    // YOUR CODE HERE
  }

  defaults() {
    // YOUR CODE HERE
  }

  throttle() {
    // YOUR CODE HERE
  }
}

module.exports = new LoScore();
