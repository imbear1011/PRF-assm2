"use strict";
//Kiểm tra dữ liệu
function validateData(data) {
  if (data.breed === "") {
    alert("Fill in the blank");
  } else if (data.type === "Select Type") {
    alert("Please select Type!");
  } else {
    breedArr.push(data);
    saveToStorage("dataBreed", JSON.stringify(breedArr)); // Lưu thú cưng
    renderBreedTable(breedArr);
    clearInput();
  }
}
//Clear input
function clearInput() {
  typeInput.value = "Select Type";
  breedInput.value = "";
}
//Hiển thị danh sách thú cưng
let breedTable = document.querySelector("#tbody"); // lưu DOM object của element tbody vào biến để truyền vào hàm
function renderBreedTable(dataArr) {
  breedTable.innerHTML = ""; // set innerHTML của targetEl thành chuỗi trống => xóa dữ liệu hiện có trong bảng
  for (let i = 0; i < dataArr.length; i++) {
    // lặp qua mảng
    let row = document.createElement("tr"); // dùng createElement để tạo ra một phần tử tr (1 dòng)

    row.innerHTML = `
      <td>${i + 1}</td>
      <td>${dataArr[i].breed}</td>
      <td>${dataArr[i].type}</td>
      <td><button class="btn btn-danger" onclick="deleteBreed('${
        dataArr[i].breed
      }')">Delete</button></td>`;
    breedTable.appendChild(row); // gắn dòng mới tạo vào cuối bảng
  }
}
renderBreedTable(breedArr); // Hiển thị danh sách breed trước đó
//Nút Delete
const deleteBreed = (breed) => {
  // Confirm before deletePet
  if (confirm("Are you sure?")) {
    for (let i = 0; i < breedArr.length; i++) {
      if (breed === breedArr[i].breed) breedArr.splice(i, 1);
      saveToStorage("dataBreed", JSON.stringify(breedArr));
    }
    renderBreedTable(breedArr);
  }
};

//Nút submit
submitBtn.addEventListener("click", function (e) {
  //Lấy data
  const data = {
    breed: breedInput.value,
    type: typeInput.value,
  };
  validateData(data);
});
