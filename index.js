// патерни програмування

// Singleton (only one object)
class RecentPurchases {
  static #instance = null;

  constructor() {
    this.purchases = [];
  }

  static create() {
    if (!this.#instance) {
      this.#instance = new RecentPurchases();
    }
    return this.#instance;
  }
  add(item) {
    this.purchases.push(item);
  }
  get() {
    return this.purchases;
  }
}
//test
const lastPurchasesList = RecentPurchases.create();
const lastPurchasesList2 = RecentPurchases.create();
console.log(lastPurchasesList === lastPurchasesList2); // true
lastPurchasesList2.add("phone");
lastPurchasesList2.add("headphones");
console.log(lastPurchasesList.get()); // [ 'phone', 'headphones' ]

// ... or with static metods
class RecentPurchases2 {
  static #instance = null;
  static #purchases = [];

  static create() {
    if (!this.#instance) {
      this.#instance = new RecentPurchases();
    }
    return this.#instance;
  }
  static add(item) {
    this.#purchases.push(item);
  }
  static get() {
    return this.#purchases;
  }
}
//test
RecentPurchases2.create();
RecentPurchases2.add("phone");
RecentPurchases2.add("headphones");
console.log(RecentPurchases2.get()); // [ 'phone', 'headphones' ]

// --------------------------------------------------------------------------
// Factory
// 2 simmilar classes with diferent parameners
class Button {
  constructor({ text, color }) {
    this.text = text;
    this.color = color;
  }
  render() {
    terurn`<button class="color:${this.color};">${this.text}</button>`;
  }
}

class IconButton {
  constructor({ icon, color }) {
    this.icon = icon;
    this.color = color;
  }
  render() {
    terurn`<button class="color:${this.color};"><img src="${this.text}"</button>`;
  }
}

class ButtonFactory {
  static TYPE = {
    BASIC: "basic",
    ICON: "icon",
  };
  static createButton(type, options) {
    // any logic here
    if (options.icon) {
      return new IconButton(options);
    }
    if (options.text) {
      return new Button(options);
    }
    throw new Error(`There is no ${type} type button`);

    // switch (type) {
    //   case this.TYPE.BASIC:
    //     return new Button(options);
    //   case this.TYPE.ICON:
    //     return new IconButton(options);
    //   default:
    //     throw new Error(`There is no ${type} type button`);
    // }
  }
}

const myIconButton = ButtonFactory.createButton(ButtonFactory.TYPE.ICON, { color: "red", icon: "/icon/my-icon.svg" });
console.log(myIconButton);

//-----------------------------------------------------------------------------------------------
// Observer (one-to-many depencies) if one object change -> many objects changes

class User {
  constructor(email) {
    this.email = email;
  }
  sendEmail(message) {
    console.log(`Sending to email ${this.email} message ${message}`);
  }
}

class Video {
  constructor(name) {
    this.name = name;
  }
}

class Chanel {
  constructor(name) {
    this.name = name;
    this.subscribers = [];
  }
  subscibe(user) {
    this.subscribers.push(user);
  }
  unsubscibe(user) {
    this.subscribers = this.subscribers.filter((sub) => sub !== user);
  }
  createVideo(name) {
    const video = new Video(name);
    this.sendNotify(video);
  }
  sendNotify(video) {
    this.subscribers.forEach((subscriber) => subscriber.sendEmail(`New video "${video.name}" on the YouTube chanel ${this.name}!`));
  }
}
//test
const chanel = new Chanel("IT Brains");
const user1 = new User("john@exemple.com");
const user2 = new User("jane@exemple.com");
const user3 = new User("alice@exemple.com");
chanel.subscibe(user1);
chanel.subscibe(user2);
chanel.subscibe(user3);
chanel.createVideo("Lesson about HTML");
chanel.unsubscibe(user1);
chanel.createVideo("SCC lesson");

// -----------------------------------------------------------------------------------------------------------
// Decorator (add new functions)

class Coffee {
  name = "koffe";
  cost = 10;
  cook() {
    console.log(`Cooking ${this.name}`);
  }
}

class MilkDecorator {
  constructor(coffee, amount) {
    this.coffee = coffee;
    this.amount = amount;
  }
  get name() {
    return `${this.coffee.name}, with ${this.amount}ml milk`;
  }
  get cost() {
    const milkPrice = 0.05;
    return this.coffee.cost + milkPrice * this.amount;
  }
  cook() {
    console.log(`Cooking ${this.name}`);
  }
}
//test
let coffee = new Coffee();
console.log(coffee.name);
console.log(coffee.cost);
coffee.cook();

let latteCoffee = new MilkDecorator(coffee, 300);
console.log(latteCoffee.name);
console.log(latteCoffee.cost);
latteCoffee.cook();

// ----------------------------------------------------------------------------
//Memento (save objecy for restore later)

class TextEditor {
  #text = "";
  set text(text) {
    this.#text = text;
    this.#save();
  }
  get text() {
    return this.#text;
  }
  #save() {
    Snapchot.create(this.text);
  }
  restore() {
    this.#text = Snapchot.restore().text;
  }
}

class Snapshot {
  constructor(text) {
    this.text = text;
  }
  static #snapshots = [];
  static create(text) {
    console.log(text);
    this.#snapshots.push(new Snapshot(text));
  }
  static restore() {
    this.#snapshots.pop();
    return this.#snapshots[this.#snapshots.length - 1];
  }
}

const editor = new TextEditor();
editor.text = "This is begining text.";
editor.text = "This is editedg text.";
editor.text = "This is updated text.";

console.log(editor.text);
console.log("===");
editor.restore;
console.log(editor.text);
editor.restore;
console.log(editor.text);

//---------------------------------------------------------------------------
// Chain of responsibility
class AuthHandler {
  setNextHandler(handler) {
    this.setNextHandler = handler;
    return handler
  }
  login(user, password) {
    if (this.setNextHandler {
      return this.setNextHandler.login(user, password);
    } else return false;
  }
}

class TwoFactorAuthHandler extends AuthHandler {
  login(user, password) {
    if (user === "John" && password === "password" && this.isValiTwoFactorCode()) {
      console.log("Allowed enter with 2F Auth");
      return true;
    } else {
      return super.login(user, password);
    }
  }
  isValiTwoFactorCode() {
    return true;
  }
}

const handler = new TwoFactorAuthHandler();
handler.setNextHandler({
  login: (...arg) => {console.log(arg)}
})

handler.login("login", "password");

