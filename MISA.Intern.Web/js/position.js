document.addEventListener("DOMContentLoaded", function () {
  const selectElement = document.getElementById("employeePos");
  fetch("http://localhost:7010/api/v1/positions")
    .then((response) => response.json())
    .then((data) => {
      console.log("API response:", data);
      data.forEach((position) => {
        const option = document.createElement("option");
        option.value = position.PositionId;
        option.textContent = position.PositionName;
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
