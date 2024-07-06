document.addEventListener('DOMContentLoaded', function () {
  const openDialogButton = document.getElementById('openDialogButton');
  const dialog = document.getElementById('addEmployeeDialog');
  const closeButton = dialog.querySelector('.close-button');

  openDialogButton.addEventListener('click', function () {
    dialog.style.display = 'flex';
  });

  closeButton.addEventListener('click', function () {
    dialog.style.display = 'none';
  });

  window.addEventListener('click', function (event) {
    if (event.target === dialog) {
      dialog.style.display = 'none';
    }
  });
});
