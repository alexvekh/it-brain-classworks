// function loadFile(filename, callback) {
//   try {
//     console.log(`Завантаженя файлу ${filename}...`);
//     setTimeout(() => callback(null, `Вміст файлу ${filename}`), 2000);
//   } catch (e) {
//     callback(e);
//   }
// }

// loadFile("example.txt", (error, content) => {
//   if (error) {
//     console.log("Помилка завантаженя файлу: ", error);
//   } else {
//     console.log("Файл завантажено успішно!");
//     console.log("Вміс файлу", content);
//   }
// });

//===============================
// Пекельна піраміда

// loadFile("example.txt", (error, content) => {
//   if (error) {
//     console.log("Помилка завантаженя файлу: ", error);
//   } else {
//     console.log("Файл завантажено успішно!");
//     console.log("Вміст файлу", content);

//     convertFile(content, (error, convertedContent) => {
//       if (error) {
//         console.log("Помилка ковертації файлу: ", error);
//       } else {
//         console.log("Файл успішно сконвертовано!");
//         console.log("Конвертований вміст файлу", content);

//         loadFile(convertedContent, (error) => {
//           if (error) {
//             console.log("Помилка збереження файлу: ", error);
//           } else {
//             console.log("Файл успішно збережено!");

//             loadFile((error) => {
//               if (error) {
//                 console.log("Помилка відправлення файлу кліенту: ", error);
//               } else {
//                 console.log("Файл успішно відправлено клієнту!");
//               }
//             });
//           }
//         });
//       }
//     });
//   }
// });

//===============================
// Promise

// const loadFile = (filename) =>
//   new Promise((resolve, reject) => {
//     console.log(`Завантаженя файлу ${filename}...`);
//     //reject("Error");
//     setTimeout(() => resolve(`Вміст файлу ${filename}`), 2000);
//   });

// const result = loadFile("imege.png");
// result.then(
//   (data) => {
//     console.log(data);
//   },
//   (error) => {
//     console.log(error);
//   }
// );

function loadFile(filename) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(`Вміст файлу ${filename}`), 2000);
  });
}

function convertFile(content) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(`Конвертований вміст: ${content.toUpperCase}`), 1000);
  });
}

function saveFile(convertedContent) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), 1500);
  });
}

function sendFileToClient() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(), reject("Error");
    }, 500);
  });
}

loadFile("imege.png")
  .then((data) => {
    return data.toUpperCase();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log("Error", error);
  })
  .finally(() => {
    console.log("End");
  });

const result = loadFile("photo.png");
result.then((data) => {
  console.log(data, 1);
});

result.then((data) => {
  console.log(data, 2);
});

result.then((data) => {
  console.log(data, 3);
});

// // Пекельна піраміда з промісов стає компактною і зрозумілою

function getInfoFromFile(file) {
  console.log(file, 111);
  return Promise.resolve(file);
}

loadFile("example.txt")
  .then((content) => {
    console.log("Файл завантажено успішно!");
    console.log("Вміст файлу", content);
    return convertFile(content);
  })
  .then((data) => {
    return getInfoFromFile(data);
  })
  .then((convertedContent) => {
    console.log("Файл успішно сконвертовано!");
    console.log("Конвертований вміст файлу", convertedContent);
    return saveFile(convertedContent);
  })
  .then(() => {
    console.log("Файл успішно збережено!");
    return sendFileToClient();
  })
  .then(() => {
    console.log("Файл успішно відправлено клієнту!");
  })
  .catch((error) => {
    console.log("Сталася помилка:", error);
  })
  .then(() => {
    console.log("Відправка файлу завершена");
  });

Promise.allSettled([loadFile("example.txt"), getInfoFromFile("example.txt"), saveFile(), sendFileToClient(), convertFile("file")])
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });

const loadAndSendFile = () =>
  loadFile()
    .then((data) => sendFileToData(data))
    .finally(() => console.log("Файл відправлено"));

const loadAndSendFile2 = async () => {
  try {
    const data = await loadFile();
    await sendFileToData(data);
  } catch (e) {
    console.log(e);
  } finally {
    console.log("Файл відправлено");
  }
};

loadAndSendFile2();
