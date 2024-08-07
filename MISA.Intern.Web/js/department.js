document.addEventListener("DOMContentLoaded", function () {
  const selectElement = document.getElementById("employeeDepartment");
  fetch("http://localhost:5000/api/v1/departments")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((department) => {
        const option = document.createElement("option");
        option.value = department.DepartmentId;
        option.textContent = department.DepartmentName;
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
