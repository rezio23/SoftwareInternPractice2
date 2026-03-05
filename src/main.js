let currentRow = null;
let dataRecorded = [];

$("#nameInput").on("input", function () {
  this.value = this.value.replace(/[^a-zA-Z\s]/g, "");
});

$("#emailInput").on("input", function () {
  this.value = this.value.replace(/[^a-z0-9.@\s]/g, "");
});

$("#numberInput").on("input", function () {
  this.value = this.value.replace(/[^0-9]/g, "");
});

function formData() {
  let data = {};
  data["FullName"] = $("#nameInput").val();
  data["Gender"] = $("#genderInput").val();
  data["DOB"] = $("#dobInput").val();
  data["Email"] = $("#emailInput").val();
  data["Phone"] = $("#numberInput").val();
  return data;
}

$("#addBtn").on("click", () => {
  $(".input").show();
});

$("#createBtn").on("click", addStudent);

function addStudent(){
  let StudentData = formData();
  dataRecorded.push(StudentData);

  let row = `
  <tr>
      <td><input class="selector" type="checkbox"></td>
      <td>${dataRecorded.length}</td> 
      <td>${StudentData.FullName}</td>
      <td>${StudentData.Gender}</td>
      <td>${StudentData.Phone}</td>
      <td>${StudentData.DOB}</td>
      <td>${StudentData.Email}</td>
    </tr>
  `;

  $("tbody").append(row);
  $(".input").hide();
}

$("#closeBtn").on("click", () => $(".input").hide());
