"use strict";

//Kiểm tra dữ liệu hợp lệ
function validateData(data) {
  for (let i = 0; i < petArr.length; i++) {
    if (data.id === petArr[i].id) {
      alert("ID must be unique!");
      idInput.value = "";
      return;
    }
  }

  if (
    data.id === "" ||
    data.name === "" ||
    !data.age ||
    !data.weight ||
    !data.lengthPet
  ) {
    alert("Fill in the blank");
  } else if (data.age < 1 || data.age > 15) {
    alert("Age must be between 1 and 15!");
  } else if (data.weight < 1 || data.weight > 15) {
    alert("Weight must be between 1 and 15!");
  } else if (data.lengthPet < 1 || data.length > 100) {
    alert("Length must be between 1 and 100!");
  } else if (data.type === "Select Type") {
    alert("Please select Type!");
  } else if (data.breed === "Select Breed" || data.breed === "") {
    alert("Please select Breed!");
  } else {
    petArr.push(data);
    saveToStorage("dataPet", JSON.stringify(petArr)); // Lưu thú cưng
    renderTableData(petArr);
    clearInput();
    healthyCheck = false;
    healthyBtn.textContent = "Show Healthy Pet";
  }
}

//Hiển thị danh sách thú cưng
let petTable = document.querySelector("#tbody"); // lưu DOM object của element tbody vào biến để truyền vào hàm
function renderTableData(dataArr) {
  petTable.innerHTML = ""; // set innerHTML của targetEl thành chuỗi trống => xóa dữ liệu hiện có trong bảng
  for (let i = 0; i < dataArr.length; i++) {
    // lặp qua mảng
    let row = document.createElement("tr"); // dùng createElement để tạo ra một phần tử tr (1 dòng)

    row.innerHTML = `
      <td>${dataArr[i].id}</td>
      <td>${dataArr[i].name}</td>
      <td>${dataArr[i].age}</td>
      <td>${dataArr[i].type}</td>
      <td>${dataArr[i].weight} kg</td>
      <td>${dataArr[i].lengthPet} cm</td>
      <td>${dataArr[i].breed}</td>
      <td><i class="bi bi-square-fill" style="color: ${
        dataArr[i].color
      }"></i></td>
      <td><i class="bi ${
        dataArr[i].vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill"
      }" </i></td>
      <td><i class="bi ${
        dataArr[i].dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"
      }" </i></td>
      <td><i class="bi ${
        dataArr[i].sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"
      }" </i></td>
      <td>${dataArr[i].BMI}</td>
      <td>${dataArr[i].date}</td>
      <td><button class="btn btn-danger" onclick="deletePet('${
        dataArr[i].id
      }')">Delete</button></td>`;
    petTable.appendChild(row); // gắn dòng mới tạo vào cuối bảng
  }
}
renderTableData(petArr); // Hiển thị danh sách thú cưng trước đó
//Nút Delete
const deletePet = (petId) => {
  // Confirm before deletePet
  if (confirm("Are you sure?")) {
    for (let i = 0; i < petArr.length; i++) {
      if (petId === petArr[i].id) petArr.splice(i, 1);
      saveToStorage("dataPet", JSON.stringify(petArr));
    }
    renderTableData(petArr);
  }
};
//Hiển thị danh sách Breed khi type thay đổi
typeInput.addEventListener("change", displayBreed);
//submit
submitBtn.addEventListener("click", function (e) {
  //Lấy data
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    lengthPet: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    BMI: "?",
    date: date,
  };
  validateData(data);
});

//Show Healthy Pet
let healthyCheck = false;
let healthyPetArr = [];
healthyBtn.addEventListener("click", function () {
  if (!healthyCheck) {
    healthyBtn.textContent = "Show All Pet";
    healthyCheck = !healthyCheck;
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].vaccinated && petArr[i].dewormed && petArr[i].sterilized)
        healthyPetArr.push(petArr[i]);
    }
    renderTableData(healthyPetArr);
    healthyPetArr = [];
  } else {
    healthyBtn.textContent = "Show Healthy Pet";
    healthyCheck = !healthyCheck;
    renderTableData(petArr);
  }
});

//Calculate BMI
function calBMI(dataArr) {
  for (let i = 0; i < dataArr.length; i++) {
    let BMI;
    if (dataArr[i].type === "Dog") {
      BMI = (dataArr[i].weight * 703) / dataArr[i].lengthPet ** 2;
    } else {
      BMI = (dataArr[i].weight * 886) / dataArr[i].lengthPet ** 2;
    }
    dataArr[i].BMI = BMI.toFixed(2);
    saveToStorage("dataPet", JSON.stringify(petArr));
  }
  return dataArr;
}

BMIBtn.addEventListener("click", function () {
  calBMI(petArr);
  renderTableData(petArr);
  healthyCheck = false;
  healthyBtn.textContent = "Show Healthy Pet";
});
