document.addEventListener("DOMContentLoaded", function () {
  const tableBody = document.getElementById("tableBody");
  const recordPerPageSelect = document.getElementById("recordPerPage");
  const prevPageButton = document.getElementById("prevPage");
  const nextPageButton = document.getElementById("nextPage");
  const totalRecords = document.getElementById("totalRecords");
  const searchInput = document.getElementById("searchInput");

  let currentPage = 1;
  let recordPerPage = parseInt(recordPerPageSelect.value);
  let listEmployee = [];

  function displayData(dataArray, currentPage) {
    tableBody.innerHTML = "";
    const startIndex = (currentPage - 1) * recordPerPage;
    const endIndex = startIndex + recordPerPage;
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
        const employeeId = item.EmployeeId;
        const deletePopup = document.querySelector(".popup-container");
        deletePopup.style.display = "flex";

        const cancelButton = document.getElementById("cancelDeleteButton");
        cancelButton.addEventListener("click", function () {
          deletePopup.style.display = "none";
        });

        const confirmDeleteButton = document.getElementById("confirmDeleteButton");
        confirmDeleteButton.addEventListener("click", function () {
          fetch(`https://cukcuk.manhnv.net/api/v1/Employees/${employeeId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => {
              if (response.ok) {
                deletePopup.style.display = "none";
                alert("Xóa nhân viên thành công");
                listEmployee = listEmployee.filter((emp) => emp.EmployeeId !== employeeId);
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
      });
    });

    totalRecords.textContent = dataArray.length;
  }

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

  function updatePagination(dataArray) {
    const totalRecords = dataArray.length;
    const totalPages = Math.ceil(totalRecords / recordPerPage);

    prevPageButton.disabled = currentPage === 1;
    nextPageButton.disabled = currentPage === totalPages || totalRecords === 0;

    displayData(dataArray, currentPage);
  }

  recordPerPageSelect.addEventListener("change", function () {
    recordPerPage = parseInt(recordPerPageSelect.value);
    currentPage = 1;
    updatePagination(listEmployee);
  });

  prevPageButton.addEventListener("click", function () {
    if (currentPage > 1) {
      currentPage--;
      updatePagination(listEmployee);
    }
  });

  nextPageButton.addEventListener("click", function () {
    const totalRecords = listEmployee.length;
    const totalPages = Math.ceil(totalRecords / recordPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      updatePagination(listEmployee);
    }
  });

  searchInput.addEventListener("input", function () {
    const searchValue = searchInput.value.toLowerCase();
    const filteredData = listEmployee.filter((item) => item.FullName.toLowerCase().includes(searchValue));
    updatePagination(filteredData);
  });

  fetch("https://cukcuk.manhnv.net/api/v1/Employees")
    .then((response) => response.json())
    .then((data) => {
      listEmployee = data;
      updatePagination(listEmployee);
    })
    .catch((error) => console.error("Error fetching employee data:", error));

  // Thêm và sửa thông tin nhân viên
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
    const url = employeeId ? `https://cukcuk.manhnv.net/api/v1/Employees/${employeeId}` : `https://cukcuk.manhnv.net/api/v1/Employees`;
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
});
