document.addEventListener('DOMContentLoaded', function() {
  var menuButton = document.getElementById('menu-button');
  var sidebar = document.getElementById('sidebar');

  menuButton.addEventListener('click', function() {
    sidebar.classList.toggle('active');
  });

  document.addEventListener('click', function(e) {
    var target = e.target;
    if (!sidebar.contains(target) && target !== menuButton) {
      sidebar.classList.remove('active');
    }
  });
});

document.querySelectorAll('.sidebar-item').forEach(item => {
  item.addEventListener('click', function() {
    const link = this.getAttribute('data-link');
    if (link) {
      window.location.href = link;
    }
  });
});
