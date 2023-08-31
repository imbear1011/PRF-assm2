"use strict";
const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const healthyBtn = document.getElementById("healthy-btn");
const BMIBtn = document.getElementById("BMI-btn");
const sideBar = document.getElementById("sidebar");
//Animation cho Sidebar
sideBar.addEventListener("click", function () {
  sideBar.classList.toggle("active");
});
//Lưu dữ liệu dưới LocalStorage
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key)) ?? [];
}
//Lưu Pet
let petArr = getFromStorage("dataPet");
//Lưu Breed
let breedArr = getFromStorage("dataBreed");
//in ra ngày, tháng và năm hiện tại
let currentDate = new Date();
let ngay = currentDate.getDate();
let thang = currentDate.getMonth() + 1; // Tháng tính từ 0, nên cộng thêm 1
let nam = currentDate.getFullYear();
let date = ngay + "/" + thang + "/" + nam;

//Clear input
function clearInput() {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  breedInput.value = "Select Breed";
  //colorInput.value = "#000";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
}
//Hiển thị Breed
function renderBreed(dataArr) {
  breedInput.innerHTML = `<option>Select Breed</option>`;
  for (let i = 0; i < dataArr.length; i++) {
    const option = document.createElement("option");
    option.innerHTML = `${dataArr[i].breed}`;
    breedInput.appendChild(option);
  }
}
//Hiển thị danh sách Breed theo Type
function displayBreed() {
  const breedOfDogCat = breedArr.filter(
    (breedData) => breedData.type === typeInput.value
  );
  renderBreed(breedOfDogCat);
}
