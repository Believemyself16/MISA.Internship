document.addEventListener("DOMContentLoaded", function () {
  const tableBody = document.getElementById("tableBody");
  const recordPerPageSelect = document.getElementById("recordPerPage");
  const prevPageButton = document.getElementById("prevPage");
  const nextPageButton = document.getElementById("nextPage");
  const totalRecords = document.getElementById("totalRecords");
  const searchInput = document.getElementById("searchInput");

  let _currentPage = 1;
  let _recordPerPage = parseInt(recordPerPageSelect.value);
  let _listEmployee = [];

  //#region GetPageEmployee API
  // Đổi giới tính sang dạng text
  function getGenderName(gender) {
    switch (gender) {
      case 0:
        return "Nam";
      case 1:
        return "Nữ";
      case 2:
        return "Khác";
      default:
        return "Không xác định";
    }
  }

  // Hàm hiển thị dữ liệu dạng bảng
  function displayData(dataArray, _currentPage) {
    tableBody.innerHTML = "";
    const startIndex = (_currentPage - 1) * _recordPerPage;
    const endIndex = startIndex + _recordPerPage;
    const paginatedData = dataArray.slice(startIndex, endIndex);

    paginatedData.forEach((item, index) => {
      const row = document.createElement("tr");
      console.log(item);
      row.innerHTML = `
        <td>${startIndex + index + 1}</td>
        <td>${item.employeeCode}</td>
        <td>${item.fullname}</td>
        <td>${getGenderName(item.gender)}</td>
        <td>${new Date(item.dateOfBirth).toLocaleDateString()}</td>
        <td>${item.email}</td>
        <td>
          ${item.address}
          <div class="action-button-container">
            <div class="feature-button-container">
              <button class="edit-button custom-feature-button">
                <i class="custom-icon mdi mdi-pencil-outline"></i>
              </button>
            </div>
            <div class="feature-button-container">
              <button class="custom-feature-button">
                <i class="custom-icon mdi mdi-content-copy"></i>
              </button>
            </div>
            <div class="feature-button-container">
              <button class="delete-button">
                <i class="custom-icon mdi mdi-close"></i>
              </button>
            </div>
          </div>
        </td>
      `;
      tableBody.appendChild(row);

      const editButton = row.querySelector(".edit-button");
      editButton.addEventListener("click", function () {
        openEditModal(item);
      });

      const deleteButton = row.querySelector(".delete-button");
      deleteButton.addEventListener("click", function () {
        openDeleteModal(item);
      });
    });

    totalRecords.textContent = dataArray.length;
  }

  fetch("https://localhost:7010/api/v1/employees")
    .then((response) => response.json())
    .then((data) => {
      _listEmployee = data;
      updatePagination(_listEmployee);
    })
    .catch((error) => console.error("Error fetching employee data:", error));
  //#endregion

  //#region Pagination
  function updatePagination(dataArray) {
    const totalRecords = dataArray.length;
    const totalPages = Math.ceil(totalRecords / _recordPerPage);

    prevPageButton.disabled = _currentPage === 1;
    nextPageButton.disabled = _currentPage === totalPages || totalRecords === 0;

    displayData(dataArray, _currentPage);
  }

  recordPerPageSelect.addEventListener("change", function () {
    _recordPerPage = parseInt(recordPerPageSelect.value);
    _currentPage = 1;
    updatePagination(_listEmployee);
  });

  prevPageButton.addEventListener("click", function () {
    if (_currentPage > 1) {
      _currentPage--;
      updatePagination(_listEmployee);
    }
  });

  nextPageButton.addEventListener("click", function () {
    const totalRecords = _listEmployee.length;
    const totalPages = Math.ceil(totalRecords / _recordPerPage);
    if (_currentPage < totalPages) {
      _currentPage++;
      updatePagination(_listEmployee);
    }
  });
  //#endregion

  //#region SearchFilter
  searchInput.addEventListener("input", function () {
    const searchValue = searchInput.value.toLowerCase();
    const filteredData = _listEmployee.filter((item) => item.fullname.toLowerCase().includes(searchValue));
    updatePagination(filteredData);
  });
  //#endregion

  //#region AddEmployee, EditEmployee API
  function openEditModal(employee) {
    const dialog = document.getElementById("addEmployeeDialog");
    const contentArea = document.getElementById("main-content");

    document.getElementById("employeeId").value = employee.employeeId;
    document.getElementById("employeeCode").value = employee.employeeCode;
    document.getElementById("employeeName").value = employee.fullname;
    document.getElementById("employeeDob").value = new Date(employee.dateOfBirth).toISOString().split("T")[0];

    // Lấy ra giới tính của nhân viên
    const genderRadio = document.querySelector(`input[name="Gender"][value="${employee.gender}"]`);
    if (genderRadio) {
      genderRadio.checked = true;
    }
    document.getElementById("identityNumber").value = employee.identityNumber;
    document.getElementById("identityDate").value = new Date(employee.identityDate).toISOString().split("T")[0];
    document.getElementById("identityPlace").value = employee.identityPlace;

    // Lấy giá trị phòng ban và vị trí
    const departmentDropdown = document.getElementById("employeeDepartment");
    departmentDropdown.value = employee.departmentId;
    if (departmentDropdown) {
      let selectedOption = Array.from(departmentDropdown.options).find((option) => option.text === employee.departmentId);
      if (selectedOption) {
        selectedOption.selected = true;
      }
    }

    const positionDropdown = document.getElementById("employeePosition");
    positionDropdown.value = employee.positionId;
    if (positionDropdown) {
      let selectedOption = Array.from(positionDropdown.options).find((option) => option.text === employee.positionId);
      if (selectedOption) {
        selectedOption.selected = true;
      }
    }

    document.getElementById("employeeAddress").value = employee.address;
    document.getElementById("mobilePhone").value = employee.mobilePhone;
    document.getElementById("landlinePhone").value = employee.landlinePhone;
    document.getElementById("employeeEmail").value = employee.email;
    document.getElementById("bankNumber").value = employee.bankNumber;
    document.getElementById("bankName").value = employee.bankName;
    document.getElementById("bankBranch").value = employee.bankBranch;

    dialog.style.display = "flex";
    contentArea.classList.add("blur");
  }

  const form = document.getElementById("addEmployeeForm");
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const employeeId = document.getElementById("employeeId").value;
    const employeeCode = document.getElementById("employeeCode").value;
    const fullName = document.getElementById("employeeName").value;
    const dateOfBirth = document.getElementById("employeeDob").value;
    const gender = document.querySelector('input[name="Gender"]:checked').value;
    const positionId = document.getElementById("employeePosition").value;
    const identityNumber = document.getElementById("identityNumber").value;
    const identityDate = document.getElementById("identityDate").value;
    const identityPlace = document.getElementById("identityPlace").value;
    const departmentId = document.getElementById("employeeDepartment").value;
    const address = document.getElementById("employeeAddress").value;
    const mobilePhone = document.getElementById("mobilePhone").value;
    const landlinePhone = document.getElementById("landlinePhone").value;
    const email = document.getElementById("employeeEmail").value;
    const bankNumber = document.getElementById("bankNumber").value;
    const bankName = document.getElementById("bankName").value;
    const bankBranch = document.getElementById("bankBranch").value;

    const employeeData = {
      Fullname: fullName,
      EmployeeCode: employeeCode,
      DateOfBirth: dateOfBirth,
      Gender: parseInt(gender),
      PositionId: positionId,
      IdentityNumber: identityNumber,
      IdentityDate: identityDate,
      IdentityPlace: identityPlace,
      DepartmentId: departmentId,
      Address: address,
      MobilePhone: mobilePhone,
      LandlinePhone: landlinePhone,
      Email: email,
      BankNumber: bankNumber,
      BankName: bankName,
      BankBranch: bankBranch,
    };

    // Nếu là cập nhật (PUT), thêm EmployeeId vào employeeData
    if (employeeId) {
      employeeData.EmployeeId = employeeId;
    }

    debugger;
    console.log(employeeData);

    const dialog = document.getElementById("addEmployeeDialog");
    const contentArea = document.getElementById("main-content");
    const url = employeeId ? `https://localhost:7010/api/v1/employees/${employeeId}` : `https://localhost:7010/api/v1/employees/`;
    const method = employeeId ? "PUT" : "POST";

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employeeData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(employeeId ? "Failed to update employee" : "Failed to add employee");
        }
      })
      .then((data) => {
        alert(employeeId ? "Nhân viên đã được cập nhật thành công!" : "Nhân viên đã được thêm thành công!");
        dialog.style.display = "none";
        contentArea.classList.remove("blur");
        location.reload();
      })
      .catch((error) => {
        alert(`Lỗi: ${error.message}`);
      });
  });
  //#endregion

  //#region DeleteEmployee API
  function openDeleteModal(employee) {
    const employeeId = employee.employeeId;
    const deletePopup = document.querySelector(".popup-container");
    deletePopup.style.display = "flex";

    const cancelButton = document.getElementById("cancelDeleteButton");
    cancelButton.addEventListener("click", function () {
      deletePopup.style.display = "none";
    });

    const confirmDeleteButton = document.getElementById("confirmDeleteButton");
    confirmDeleteButton.addEventListener("click", function () {
      fetch(`https://localhost:7010/api/v1/employees/${employeeId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            deletePopup.style.display = "none";
            alert("Xóa nhân viên thành công");
            _listEmployee = _listEmployee.filter((emp) => emp.EmployeeId !== employeeId);
            location.reload();
          } else {
            throw new Error(`Không thể xóa nhân viên với ID ${employeeId}`);
          }
        })
        .catch((error) => {
          console.error("Lỗi khi xóa nhân viên:", error);
          alert("Có lỗi xảy ra khi xóa nhân viên.");
        });
    });
  }
  //#endregion
});
