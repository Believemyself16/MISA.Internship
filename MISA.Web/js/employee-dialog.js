document.addEventListener('DOMContentLoaded', function () {
  const openDialogButton = document.getElementById('openDialogButton');
  const dialog = document.getElementById('addEmployeeDialog');
  const closeButton = dialog.querySelector('.close-button');
  const contentArea = document.getElementById('main-content');

  openDialogButton.addEventListener('click', function () {
    dialog.style.display = 'flex';
    contentArea.classList.toggle('blur');
  });

  closeButton.addEventListener('click', function () {
    dialog.style.display = 'none';
    contentArea.classList.remove('blur');
  });

  window.addEventListener('click', function (event) {
    if (event.target === dialog) {
      dialog.style.display = 'none';
      contentArea.classList.remove('blur');
    }
  });
});

