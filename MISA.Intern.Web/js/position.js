document.addEventListener("DOMContentLoaded", function () {
  const selectElement = document.getElementById("employeePosition");
  fetch("https://localhost:7010/api/v1/positions")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((position) => {
        const option = document.createElement("option");
        option.value = position.positionId;
        option.textContent = position.positionName;
        selectElement.appendChild(option);
      });
    })
    .catch((error) => {
      const option = document.createElement("option");
      option.textContent = "Không có vị trí nào";
      selectElement.appendChild(option);
      console.error("Error fetching positions:", error);
    });
});
