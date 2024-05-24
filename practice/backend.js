// Send an HTTP request (the response will actually contain an XML)
const xhr = new XMLHttpRequest();

// Get the request this method waits for the response to come back
xhr.addEventListener('load', ()=>{
  console.log(JSON.parse(xhr.responseText))
});

// Open the request and setup it
xhr.open('GET','https://supersimplebackend.dev/products/first');

// Send the message
xhr.send();