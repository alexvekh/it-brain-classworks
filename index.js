console.log("==================  1 example    ========");

function* myGenerator() {
  console.log("Start");
  // ...

  yield 1;

  yield 2;

  yield 3;

  console.log("End");
  return 25;
}

const generator = myGenerator();
console.log(generator); // Object [Generator] {}

const result1 = generator.next(); // to do to 1st yield
console.log(result1); // { value: 1, done: false }

const result2 = generator.next(); // to do to 2nd yield
console.log(result2); // { value: 2, done: false }

const result3 = generator.next(); // to do to 2nd yield
console.log(result3); // { value: 3, done: false }

const result4 = generator.next(); // to do to 2nd yield
console.log(result4); // { value: undefined, done: true }  { value: {return}, done: true }

// ------------------------------------
console.log("===========  2 example    ===============");
function* processOrder(order) {
  yield validateOrder(order);
  yield processPayment(order);
  yield sendOrderConfirmation(order);
  return order;
}

function validateOrder(order) {
  const isValid = order.quantity > 0;
  return isValid;
}

function processPayment(order) {
  const isPaymentSuccessful = Math.random() < 0.5;
  return isPaymentSuccessful;
}

function sendOrderConfirmation() {
  const isConfirmationSent = true;
  return isConfirmationSent;
}

const order = { id: 123, product: "Товар", quantity: 2 };
const orderProcessing = processOrder(order);
const isValidateOrder = orderProcessing.next().value;
if (isValidateOrder === false) {
  // ----
}

const isProcessPayment = orderProcessing.next();
if (isProcessPayment === false) {
  // -----
}
console.log(orderProcessing.next());
console.log(orderProcessing.next());
console.log(orderProcessing.next());

// ----------------------------------------------
console.log("==========  3 example    ================");

function* generatorFunction() {
  yield "First value";
  yield "Second value";
  return 3;
}

const generator2 = generatorFunction();

for (let value of generator) consolelog(value);

//  ---------------------------------------------
console.log("===========  4 example    ===============");

function* generatorOne() {
  yield "1 1";
  yield "1 2";
}

function* generatorTwo() {
  yield* generatorOne();
  yield "1 1";
  yield "1 2";
}

const gen = generatorTwo();
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());

//  -------------------------------------------
console.log("=========  5 example    =================");

function* myGenerator() {
  yield 1;
  const value = yield 2; // value = 8
  yield 3;
  yield value; //
}

const generator3 = myGenerator();

console.log(generator3.next().value);
console.log(generator3.next().value);
console.log(generator3.next(8).value); // передаем 8 в const value
console.log(generator3.next().value);

// --------------------------------
// console.log("===========  6 example    ===============");
// function* myGenerator() {
//   try {
//     yield 1;
//     return 10; // прерве function
//     const value = yield 2; // value = 8
//     yield 3;
//     yield value; //
//   } catch (error) {
//     console.log(error);
//   }
// }

// // or
// const generator4 = myGenerator();
// console.log(generator4.return(10)); // Программа завершиться
// console.log(generator4.throw(10)); // помилка. Программа завершиться
// console.log(generator4.throw(new Error())); // повноцінна помилка

// --------------------------------
console.log("=============  7 example    =============");

const asyncFunc = () => new Promise((resolve) => setTimeout(resolve, 1000));

async function* asyncGenerator() {
  await asyncFunc();
  yield "After 1 second";
  await asyncFunc();
  yield "After 2 second";
}

// or
async function runGenerator() {
  const generator5 = asyncGenerator();
  let result = null;
  result = await generator5.next();
  console.log(result);
  result = await generator5.next();
  result.value;
  console.log(result);
}
runGenerator();
// ----------------------------------------------------
console.log("=============  8 example    =============");

const asyncFunc2 = () => new Promise((resolve) => setTimeout(resolve, 1000));

async function* asyncGenerator() {
  await asyncFunc2();
  yield "After 1 second";
  await asyncFunc2();
  yield "After 2 second";
}
async function runGenerator() {
  const generator6 = asyncGenerator();
  for await (const result7 of generator6) {
    console.log(result7);
    await asyncFunc2();
  }
}

runGenerator;

//======================================================
console.log("=================  9 example    ================================");

// Фунція, що стимулює завантаження даних з бази
function fetchDataFromServer() {
  return new Promise((resolve, reject) => {
    //Стимулюємо асинхронний запит до сервера
    setTimeout(() => {
      const randomNumber = Math.random();
      if (randomNumber < 0.7) {
        resolve("Дані успішно завантажені");
      } else {
        reject("Помилка завантаження заних");
      }
    }, 1000);
  });
}

function convertData(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Симулюємо асинхронну конвертацію данних
      const convertedData = data.toUpperCase();
      resolve(convertedData);
    }, 500);
  });
}

// енраторний метод, що використовує "yield" для послідовного завантаження даних
async function* fetchData() {
  try {
    const result6 = await fetchDataFromServer(); // завантажуємо дані з скервера

    yield "pending"; // Повертаємо статус пендінг

    const convertedData = await convertData(result6); // Конвертуємо дані
    yield "success"; // Повертаємо статус "success"
    return convertedData;
  } catch (error) {
    yield "error"; // повертаэмо статус "error"
  }
}

(async () => {
  const generator8 = fetchData();
  console.log(await generator8.next());
  console.log(await generator8.next());
  console.log(await generator8.next());
})();
