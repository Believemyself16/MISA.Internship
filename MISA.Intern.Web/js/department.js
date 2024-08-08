document.addEventListener("DOMContentLoaded", function () {
  const selectElement = document.getElementById("employeeDepartment");
  fetch("https://localhost:7010/api/v1/departments")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((department) => {
        const option = document.createElement("option");
        option.value = department.departmentId;
        option.textContent = department.departmentName;
        selectElement.appendChild(option);
      });
    })
    .catch((error) => {
      const option = document.createElement("option");
      option.textContent = "Không có phòng ban nào";
      selectElement.appendChild(option);
      console.error("Error fetching departments:", error);
    });
});
