document.addEventListener('DOMContentLoaded', function() {
  const selectElement = document.getElementById('employeeDepartment');
  fetch('https://cukcuk.manhnv.net/api/v1/Departments')
    .then(response => response.json())
    .then(data => {
      data.forEach(department => {
          const option = document.createElement('option');
          option.value = department.DepartmentId;
          option.textContent = department.DepartmentName;
          selectElement.appendChild(option);
      });
    })
    .catch(error => {
      console.error('Error fetching departments:', error);
    });
})