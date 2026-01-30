// Primitives: number, string, boolean
// More complex types: arrays, objects
// Function types, parameters


// Primitives

let age: number;

age = 12;

let userName: string;

userName = "Max";

let isCorrect: boolean;

isCorrect = true;


// More Complex types

// arrays

let hobbies: string[];

hobbies = ['Sports', 'Cooking'];


// Object

let person: {
    name: string;
    age: number;
};

person = {
    name: "Rock",
    age: 60
};


// Array obejcts

let people: {
    name: string;
    age: number;
}[]; 


people = [
    {
        name: "peter",
        age: 34,
    }
]



///////////////////////////
///// Type Inference /////
//////////////////////////

// When you assign immediately a value to a variable, that becomes its type. For example below `course` variable is now string type, without assigning type to it.
let course = "React - the complete guide";
// let course: string = "React - the complete guide"; // not required
// course = 1213123; // not correct


///////////////////////////
//////// Union ///////////
//////////////////////////

// Define multiple types

let courses: string | number = "Some course";
courses = 21321;

let users: string | string[];



///////////////////////////
////// Type Alias ////////
//////////////////////////


type Person2 = {
    name: string;
    age: number;
};

let person2: Person2 = {
    name: "Rock",
    age: 60
};


// Array obejcts

let people2: Person2[]; 


////////////////////////////////////////
////// Function & Function type ////////
///////////////////////////////////////

function add(a: number, b: number) {
    return a + b;
}

add(1, 5);

// : number - is return type, it can defined manually, if not defined, it can Inference automatically, see above example;
function divide(a: number, b: number): number {
    return a / b;
}



///////////////////////////
//////// Generics ////////
//////////////////////////

// Instead of type any, a generic types helps to have similar type of parameter and return vakue,

// Type any example
function insertArray(array: any[], value: any) {
    return [value, ...array];
}
const demoArray = [1, 2, 3, 4];
const updateArray = insertArray(demoArray, -1);

updateArray[0].split(''); // This will cause issue beacuse number can't be split.

// With generic

function insertArray2<T>(array: T[], value: T) {
    return [value, ...array];
}
// function insertArray2<number>(array: number[], value: number): number[]
const updateNumber = insertArray2(demoArray, -1);

const stringArray = ["b,", "c", "d"];
// function insertArray2<string>(array: string[], value: string): string[]
const updateString = insertArray2(stringArray, "a");

// With genetics type changes based on value provided.
