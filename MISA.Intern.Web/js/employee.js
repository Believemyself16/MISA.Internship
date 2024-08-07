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
  function displayData(dataArray, _currentPage) {
    tableBody.innerHTML = "";
    const startIndex = (_currentPage - 1) * _recordPerPage;
    const endIndex = startIndex + _recordPerPage;
    const paginatedData = dataArray.slice(startIndex, endIndex);

    paginatedData.forEach((item, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${startIndex + index + 1}</td>
        <td>${item.EmployeeCode}</td>
        <td>${item.FullName}</td>
        <td>${item.GenderName}</td>
        <td>${new Date(item.DateOfBirth).toLocaleDateString()}</td>
        <td>${item.Email}</td>
        <td>
          ${item.Address}
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

  fetch("http://localhost:7010/api/v1/employees")
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
    const filteredData = _listEmployee.filter((item) => item.FullName.toLowerCase().includes(searchValue));
    updatePagination(filteredData);
  });
  //#endregion

  //#region AddEmployee, EditEmployee API
  function openEditModal(employee) {
    const dialog = document.getElementById("addEmployeeDialog");
    const contentArea = document.getElementById("main-content");

    document.getElementById("employeeId").value = employee.EmployeeId;
    document.getElementById("employeeCode").value = employee.EmployeeCode;
    document.getElementById("employeeName").value = employee.FullName;
    document.getElementById("employeeDob").value = employee.DateOfBirth.split("T")[0];
    document.querySelector(`input[name="gender"][value="${employee.Gender}"]`).checked = true;
    document.getElementById("identityNumber").value = employee.IdentityNumber;
    document.getElementById("identityDate").value = employee.IdentityDate.split("T")[0];
    document.getElementById("identityPlace").value = employee.IdentityPlace;
    document.getElementById("employeeDepartment").value = employee.DepartmentId;
    document.getElementById("employeeAddress").value = employee.Address;
    document.getElementById("employeeEmail").value = employee.Email;

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
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const identityNumber = document.getElementById("identityNumber").value;
    const identityDate = document.getElementById("identityDate").value;
    const identityPlace = document.getElementById("identityPlace").value;
    const departmentId = document.getElementById("employeeDepartment").value;
    const address = document.getElementById("employeeAddress").value;
    const email = document.getElementById("employeeEmail").value;

    const employeeData = {
      FullName: fullName,
      EmployeeCode: employeeCode,
      DateOfBirth: dateOfBirth,
      Gender: gender,
      IdentityNumber: identityNumber,
      IdentityDate: identityDate,
      IdentityPlace: identityPlace,
      DepartmentId: departmentId,
      Address: address,
      Email: email,
    };

    const dialog = document.getElementById("addEmployeeDialog");
    const contentArea = document.getElementById("main-content");
    const url = employeeId ? `http://localhost:7010/api/v1/employees/${employeeId}` : `http://localhost:7010/api/v1/employees/`;
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
        console.error("Error adding employee:", error);
      });
  });
  //#endregion

  //#region DeleteEmployee API
  function openDeleteModal(employee) {
    const employeeId = employee.EmployeeId;
    const deletePopup = document.querySelector(".popup-container");
    deletePopup.style.display = "flex";

    const cancelButton = document.getElementById("cancelDeleteButton");
    cancelButton.addEventListener("click", function () {
      deletePopup.style.display = "none";
    });

    const confirmDeleteButton = document.getElementById("confirmDeleteButton");
    confirmDeleteButton.addEventListener("click", function () {
      fetch(`http://localhost:7010/api/v1/employees/${employeeId}`, {
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
