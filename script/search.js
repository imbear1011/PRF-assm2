"use strict";
const findBtn = document.getElementById("find-btn");
renderBreed(breedArr);
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
      `;
    petTable.appendChild(row); // gắn dòng mới tạo vào cuối bảng
  }
}
findBtn.addEventListener("click", function () {
  let petFind = petArr;

  const data = {
    id: idInput.value,
    name: nameInput.value,
    type: typeInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
  };
  //tìm kiếm
  if (idInput.value) {
    petFind = petFind.filter((pet) => pet.id.includes(idInput.value));
  }
  if (nameInput.value) {
    petFind = petFind.filter((pet) => pet.name.includes(nameInput.value));
  }

  if (typeInput.value !== "Select Type") {
    petFind = petFind.filter((pet) => pet.type === typeInput.value);
  }
  if (breedInput.value !== "Select Breed") {
    petFind = petFind.filter((pet) => pet.breed === breedInput.value);
  }

  if (vaccinatedInput.checked) {
    petFind = petFind.filter(
      (pet) => pet.vaccinated === vaccinatedInput.checked
    );
  }
  if (dewormedInput.checked) {
    petFind = petFind.filter((pet) => pet.dewormed === dewormedInput.checked);
  }
  if (sterilizedInput.checked) {
    petFind = petFind.filter(
      (pet) => pet.sterilized === sterilizedInput.checked
    );
  }

  renderTableData(petFind);
});
