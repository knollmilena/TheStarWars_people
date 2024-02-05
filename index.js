const fetch = require("node-fetch");

const arg = process.argv;

if (arg.length === 2) {
  console.error("Вы ничего не ввели, попробуйте еще раз.");
  process.exit(1);
}
// let arr = [];

let requests = arg.map((item) => fetch(`https://swapi.dev/api/people/?search=${item}`));
Promise.all(requests).then((responses) =>
  Promise.all(responses.map((response) => response.json())).then((data) => {
    rebderResult(data);
  })
);

function rebderResult(arr) {
  let result = {
    "Total result": "",
    All: "",
    "Min height": "",
    "Max height": "",
  };
  let resultArr = [];
  let nameArr = [];
  let heightArr = [];

  arr.forEach((item) => {
    if (result["Total result"] !== "") {
      result["Total result"] = parseInt(result["Total result"]) + item.count;
    } else {
      result["Total result"] += item.count;
    }

    if (item.results.length > 1) {
      for (let i = 0; (item.results.length !== 0) & (item.results.length > i); i++) {
        resultArr.push(item.results[i]);
        nameArr.push(item.results[i].name);
        heightArr.push(item.results[i].height);
      }
    } else if (item.results.length === 1) {
      resultArr.push(item.results[0]);
      nameArr.push(item.results[0].name);
      heightArr.push(item.results[0].height);
    }
  });

  result.All = sortingName(nameArr);
  result["Min height"] = `${sortingNum(heightArr)[0]}, ${
    resultArr.find((el) => el.height === sortingNum(heightArr)[0]).name
  }`;

  result["Max height"] = `${sortingNum(heightArr)[heightArr.length - 1]}, ${
    resultArr.find((el) => el.height === sortingNum(heightArr)[heightArr.length - 1]).name
  }`;
  console.log(result);
}
function sortingNum(arr) {
  const numbers = arr.sort(function (a, b) {
    return a - b;
  });
  return numbers;
}
function sortingName(arr) {
  const sorted = arr.sort((a, b) => {
    if (a.toLowerCase() < b.toLowerCase()) {
      return -1;
    }
    if (a.toLowerCase() > b.toLowerCase()) {
      return 1;
    }
    return 0;
  });
  return sorted;
}
