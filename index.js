// const request = new Request("url", {});
// fetch(request);

// fetch('https://jsonplaceholder.typicode.com/todos/1')
//       .then(response => response.json())
//       .then(json => console.log(json))

//fetch("https://jsonplaceholder.typicode.com/todos/1", {});

const data = { id: 1, name: "User", age: 50 };

// fetch("https://jsonplaceholder.typicode.com/todos/1", {
//   method: "DELETE",
// });

// fetch("https://jsonplaceholder.typicode.com/todos/1", {
//   method: "POST",
//   body: JSON.stringify(data),
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: "Bearer your_token",
//   },
// }).then((res) => {
//   console.log(res);
// });

async function getData() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1", {
    method: "GET",
    //body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer your_token",
    },
  });
  console.log(res.bodyUsed);
  const data = await res.json();
  console.log(res.bodyUsed);
  console.log(data);
  console.log(res.status);
  console.log(res.ok);
}

getData();
