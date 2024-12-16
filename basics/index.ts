
let aNumber: number = 34;
let aString: string = "Hello";
let aBoolean: boolean= true;
let anUndefined: number;

anUndefined = 100;
// anUndefined = "Test";

let numbersArr: number[] = [];
// numbersArr.push("test");

let aStudent: { firstName: string; lastName: string; };
aStudent = { firstName: "David", lastName: "Doe" }

let aFn = (aParam: number): number => {
    return aParam + '5';
}

// Onze eigen types aanmaken
type CustomNumb = number | string;

let aSecondNumb: CustomNumb;
aSecondNumb = 5;
aSecondNumb = "hello";
// aSecondNumb = true;

type MyFunc = (aParam: CustomNumb) => void;

const newFn: MyFunc = () => {
    return null;
}

newFn(5);


const secondFn = (arg: CustomNumb) => {
   if(typeof arg === "string") {
    return "Dit is een string";
   } else if (typeof arg === "number") {
    return arg + 5
   }
}

type Person = {
    firstName: string;
    lastName: string;
    age: number;
}

type Student = {
   readonly studentNumber: number;
   bio?: string;
} & Person

const newStudent: Student = {
    age: 5,
    firstName: "John", 
    lastName: "Doe",
    studentNumber: 4284824252
 }

 newStudent.studentNumber = 423532523;


 type Direction = "left" | "right" | "up" | "bottom";

 let myDirection: Direction = "right"

 enum Status { "new", "processing", "confirmed" }

 let myStatus: Status = Status.new






