let currentRow = null;
let dataRecorded = [];

$("#nameInput").on("input", function () {
  this.value = this.value.replace(/[^a-zA-Z\s]/g, "");
});

$("#emailInput").on("input", function () {
  this.value = this.value.replace(/[^a-zA-Z0-9.@_-]/g, "");
});

$("#numberInput").on("input", function () {
  this.value = this.value.replace(/[^0-9]/g, "");
});

function formData() {
  let data = {};
  data["FullName"] = $("#nameInput").val().trim();
  data["Gender"] = $("#genderInput").val();
  data["DOB"] = $("#dobInput").val();
  data["Email"] = $("#emailInput").val().trim();
  data["Phone"] = $("#numberInput").val();
  return data;
}

function emailDuplication(newData, ignoreIndex = -1) {
  for (let i = 0; i < dataRecorded.length; i++) {
    if (i === ignoreIndex) continue;
    let existingStudent = dataRecorded[i];

    if (existingStudent.Email === newData.Email) {
      Swal.fire({
        icon: "error",
        title: "Invalid",
        text: "This Email is already registered to another student!",
      });
      return true;
    }
  }

  return false;
}

$("#addBtn").on("click", () => {
  $(".input").show();
});

$("#createBtn").on("click", addStudent);

function addStudent() {
  let StudentData = formData();
  let nameRestrict = /^[a-zA-Z\s]+$/;
  let emailRestrict = /^[a-zA-Z0-9._-]+@gmail\.com$/;
  let phoneRestrict = /^0[0-9]{8,9}$/;

  if (StudentData.FullName === "" || !nameRestrict.test(StudentData.FullName)) {
    Swal.fire({
      icon: "error",
      title: "Invalid",
      text: "Invalid name pattern!",
    });
    return;
  }
  if (!emailRestrict.test(StudentData.Email)) {
    Swal.fire({
      icon: "error",
      title: "Invalid",
      text: "Invalid Email pattern!",
    });
    return;
  }
  if (!phoneRestrict.test(StudentData.Phone)) {
    Swal.fire({
      icon: "error",
      title: "Invalid",
      text: "Invalid phone number pattern!",
    });
    return;
  }
  if (StudentData.Gender === "N/A") {
    Swal.fire({
      icon: "error",
      title: "Invalid",
      text: "Please select the student's gender!",
    });
    return;
  }
  if (StudentData.DOB === "") {
    Swal.fire({
      icon: "error",
      title: "Invalid",
      text: "Please select the student's date of birth!",
    });
    return;
  }
  let dobDate = new Date(StudentData.DOB);
  let today = new Date();

  let cutoffDate = new Date(
    today.getFullYear() - 15,
    today.getMonth(),
    today.getDate(),
  );

  if (dobDate > cutoffDate) {
    Swal.fire({
      icon: "error",
      title: "Invalid",
      text: "Student age must be at least 15 years old!",
    });
    return;
  }

  if (emailDuplication(StudentData)) {
    return;
  }

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

  window: Swal.fire({
    title: "Added a Student!",
    icon: "success",
    draggable: true,
  });

  $("tbody").append(row);
  $(".input").hide();
}

$("#closeBtn").on("click", () => $(".input").hide());

$("#editBtn").on("click", () => {
  let selected = $(".selector:checked");

  if (selected.length !== 1) {
    Swal.fire({
      icon: "error",
      title: "Invalid",
      text: "Please select a student to edit!",
    });
    return;
  }

  currentRow = selected.closest("tr");

  let name = currentRow.find("td:eq(2)").text();
  let gender = currentRow.find("td:eq(3)").text();
  let phone = currentRow.find("td:eq(4)").text();
  let dob = currentRow.find("td:eq(5)").text();
  let email = currentRow.find("td:eq(6)").text();

  $("#nameInput").val(name);
  $("#genderInput").val(gender);
  $("#numberInput").val(phone);
  $("#dobInput").val(dob);
  $("#emailInput").val(email);

  $(".input").show();
  $("#createBtn").html('<i class="fa-solid fa-check"></i> Update');
  $("#createBtn").off("click").on("click", updateStudent);
});

function updateStudent() {
  let newData = formData();

  currentRow.find("td:eq(2)").text(newData.FullName);
  currentRow.find("td:eq(3)").text(newData.Gender);
  currentRow.find("td:eq(4)").text(newData.Phone);
  currentRow.find("td:eq(5)").text(newData.DOB);
  currentRow.find("td:eq(6)").text(newData.Email);

  let StudentData = formData();
  let nameRestrict = /^[a-zA-Z\s]+$/;
  let emailRestrict = /^[a-zA-Z0-9._-]+@gmail\.com$/;
  let phoneRestrict = /^0[0-9]{8,9}$/;

  if (StudentData.FullName === "" || !nameRestrict.test(StudentData.FullName)) {
    Swal.fire({
      icon: "error",
      title: "Invalid",
      text: "Invalid name pattern!",
    });
    return;
  }
  if (!emailRestrict.test(StudentData.Email)) {
    Swal.fire({
      icon: "error",
      title: "Invalid",
      text: "Invalid Email pattern!",
    });
    return;
  }
  if (!phoneRestrict.test(StudentData.Phone)) {
    Swal.fire({
      icon: "error",
      title: "Invalid",
      text: "Invalid phone number pattern!",
    });
    return;
  }
  if (StudentData.Gender === "N/A") {
    Swal.fire({
      icon: "error",
      title: "Invalid",
      text: "Please select the student's gender!",
    });
    return;
  }
  if (StudentData.DOB === "") {
    Swal.fire({
      icon: "error",
      title: "Invalid",
      text: "Please select the student's date of birth!",
    });
    return;
  }
  let dobDate = new Date(StudentData.DOB);
  let today = new Date();

  let cutoffDate = new Date(
    today.getFullYear() - 15,
    today.getMonth(),
    today.getDate(),
  );

  if (dobDate > cutoffDate) {
    alert("Error: Student must be at least 15 years old!");
    return;
  }

  let rowIndex = parseInt(currentRow.find("td:eq(1)").text()) - 1;
  if (emailDuplication(newData, rowIndex)) {
    return;
  }
  Swal.fire({
    title: "Updated a Student!",
    icon: "success",
    draggable: true,
  });
  dataRecorded[rowIndex] = newData;

  $(".input").hide();
  $("#nameInput, #dobInput, #emailInput, #numberInput").val("");
  $("#genderInput").val("N/A");
  $(".selector:checked").prop("checked", false);

  $("#createBtn").html('<i class="fa-solid fa-check"></i> Create');
  $("#createBtn").off("click").on("click", addStudent);
}

$("#deleteBtn").on("click", () => {
  let selected = $(".selector:checked");

  if (selected.length !== 1) {
    Swal.fire({
      icon: "error",
      title: "Invalid",
      text: "Please select a student to delete!",
    });
    return;
  }
  Swal.fire({
    title: "Are you sure to delete?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleted!",
        text: "Delete a Student!",
        icon: "success",
      });
      currentRow = selected.closest("tr").remove();
      $("tbody tr").each(function (index) {
        $(this)
          .find("td:eq(1)")
          .text(index + 1);
      });
    }
  });
  $(".input").hide();
});
