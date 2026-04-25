// const user = {
//     name: "jone",
//     age: 24
// }
// console.log(user.name);
// console.log(user['age']);

class User {
  constructor(age) {
    this._age = age;
  }

  set age(value) {
    if (value < 0) {
      console.log("Invalid age");
    } else {
      this._age = value;
    }
  }

  get age() {
    return this._age;
  }
}

const u = new User(20);

u.age = -5;   // validation runs
console.log(u.age);