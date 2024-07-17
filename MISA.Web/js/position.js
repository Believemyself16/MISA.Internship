document.addEventListener('DOMContentLoaded', function() {
  const selectElement = document.getElementById('employeePos');
  fetch('https://cukcuk.manhnv.net/api/v1/Positions')
    .then(response => response.json())
    .then(data => {
      console.log('API response:', data);
      data.forEach(position => {
          const option = document.createElement('option');
          option.value = position.PositionId;
          option.textContent = position.PositionName;
          selectElement.appendChild(option);
      });
    })
    .catch(error => {
      const option = document.createElement('option');
      option.textContent = "Không có vị trí";
      selectElement.appendChild(option);
      console.error('Error fetching departments:', error);
    });
})