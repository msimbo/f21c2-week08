const fetchInput = 'github.json';

//@TODO: play with GH's API {}
//@TODO: build our app with an API...

// > block 1
fetch(fetchInput)
    .then(res => res.json())
    .then(content => {
        console.log(content);
    });

// > block 2
const myData = 'some string'; //string

// >  block 3
console.log(myData);
