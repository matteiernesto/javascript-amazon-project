// Creating a date object
const date = new Date();
const time = date.toLocaleTimeString();
console.log(time)
console.log(this)

// We can use .call() extra parameter in front 
function logThis(){
    console.log(this)
}
logThis.call({name : "hello"})