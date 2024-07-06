document.addEventListener("DOMContentLoaded", function() {
  const data = [
    { index: 1, code: "NV-001", name: "Vũ Quang Hân", gender: "nam", dob: "20/10/2002", email: "hanvq@gmail.com", address: "92 Trần Phú, Hà Nội" },
    { index: 2, code: "NV-002", name: "Nguyễn Thị Lan", gender: "nữ", dob: "15/08/1995", email: "lannt@gmail.com", address: "24 Bạch Mai, Hà Nội" },
    { index: 3, code: "NV-003", name: "Trần Văn Minh", gender: "nam", dob: "05/11/1988", email: "minhtv@gmail.com", address: "56 Nguyễn Trãi, Hà Nội" },
    { index: 4, code: "NV-004", name: "Phạm Thị Hòa", gender: "nữ", dob: "19/07/1992", email: "hoapt@gmail.com", address: "18 Lê Duẩn, Hà Nội" },
    { index: 5, code: "NV-005", name: "Đỗ Văn Long", gender: "nam", dob: "22/04/1985", email: "longdv@gmail.com", address: "102 Hoàng Quốc Việt, Hà Nội" },
    { index: 6, code: "NV-006", name: "Lê Thị Mai", gender: "nữ", dob: "30/01/1990", email: "mailt@gmail.com", address: "33 Kim Mã, Hà Nội" },
    { index: 7, code: "NV-007", name: "Nguyễn Văn Nam", gender: "nam", dob: "12/06/1983", email: "namnv@gmail.com", address: "88 Giảng Võ, Hà Nội" },
    { index: 8, code: "NV-008", name: "Hoàng Thị Hoa", gender: "nữ", dob: "07/09/1994", email: "hoah@gmail.com", address: "55 Láng Hạ, Hà Nội" },
    { index: 9, code: "NV-009", name: "Phan Văn An", gender: "nam", dob: "23/12/1978", email: "anpv@gmail.com", address: "12 Tràng Tiền, Hà Nội" },
    { index: 10, code: "NV-010", name: "Vũ Thị Cúc", gender: "nữ", dob: "10/03/1989", email: "cucvt@gmail.com", address: "77 Lạc Long Quân, Hà Nội" },
    { index: 11, code: "NV-011", name: "Nguyễn Văn Tùng", gender: "nam", dob: "17/10/1980", email: "tungnv@gmail.com", address: "45 Tây Sơn, Hà Nội" },
    { index: 12, code: "NV-012", name: "Trần Thị Bích", gender: "nữ", dob: "02/02/1991", email: "bichtt@gmail.com", address: "12 Trần Duy Hưng, Hà Nội" },
    { index: 13, code: "NV-013", name: "Đặng Văn Toàn", gender: "nam", dob: "29/07/1975", email: "toandv@gmail.com", address: "66 Nguyễn Chí Thanh, Hà Nội" },
    { index: 14, code: "NV-014", name: "Lê Thị Lan", gender: "nữ", dob: "11/12/1982", email: "lanlt@gmail.com", address: "38 Cầu Giấy, Hà Nội" },
    { index: 15, code: "NV-015", name: "Ngô Văn Hiếu", gender: "nam", dob: "25/05/1987", email: "hieuvn@gmail.com", address: "47 Trần Khát Chân, Hà Nội" },
    { index: 16, code: "NV-016", name: "Phạm Thị Hạnh", gender: "nữ", dob: "18/09/1993", email: "hanhpt@gmail.com", address: "99 Nguyễn Văn Cừ, Hà Nội" },
    { index: 17, code: "NV-017", name: "Nguyễn Văn Quý", gender: "nam", dob: "05/08/1981", email: "quynv@gmail.com", address: "19 Lê Lợi, Hà Nội" },
    { index: 18, code: "NV-018", name: "Trần Thị Thanh", gender: "nữ", dob: "21/11/1986", email: "thanhtr@gmail.com", address: "81 Giải Phóng, Hà Nội" },
    { index: 19, code: "NV-019", name: "Hoàng Văn Bình", gender: "nam", dob: "16/03/1979", email: "binhvh@gmail.com", address: "29 Phạm Ngọc Thạch, Hà Nội" },
    { index: 20, code: "NV-020", name: "Lê Thị Hải", gender: "nữ", dob: "08/01/1990", email: "hailt@gmail.com", address: "14 Thanh Niên, Hà Nội" },
    { index: 21, code: "NV-021", name: "Nguyễn Văn Đạt", gender: "nam", dob: "30/04/1984", email: "datnv@gmail.com", address: "23 Tôn Đức Thắng, Hà Nội" },
    { index: 22, code: "NV-022", name: "Phạm Thị Hà", gender: "nữ", dob: "06/07/1992", email: "hapt@gmail.com", address: "32 Hàng Bài, Hà Nội" },
    { index: 23, code: "NV-023", name: "Nguyễn Văn Phú", gender: "nam", dob: "17/02/1985", email: "phunv@gmail.com", address: "27 Kim Liên, Hà Nội" },
    { index: 24, code: "NV-024", name: "Trần Thị Vân", gender: "nữ", dob: "11/05/1991", email: "vantr@gmail.com", address: "31 Phan Chu Trinh, Hà Nội" },
    { index: 25, code: "NV-025", name: "Vũ Văn Thành", gender: "nam", dob: "25/09/1988", email: "thanhvv@gmail.com", address: "20 Đặng Tiến Đông, Hà Nội" },
    { index: 26, code: "NV-026", name: "Lê Thị Oanh", gender: "nữ", dob: "02/12/1987", email: "oanhtl@gmail.com", address: "37 Hoàng Diệu, Hà Nội" },
    { index: 27, code: "NV-027", name: "Nguyễn Văn Sơn", gender: "nam", dob: "15/03/1994", email: "sonnv@gmail.com", address: "14 Lý Thường Kiệt, Hà Nội" },
    { index: 28, code: "NV-028", name: "Phạm Thị Xuân", gender: "nữ", dob: "19/08/1995", email: "xuanpt@gmail.com", address: "55 Hai Bà Trưng, Hà Nội" },
    { index: 29, code: "NV-029", name: "Trần Văn Phong", gender: "nam", dob: "24/04/1990", email: "phongtv@gmail.com", address: "78 Bà Triệu, Hà Nội" },
    { index: 30, code: "NV-030", name: "Lê Thị Minh", gender: "nữ", dob: "10/11/1991", email: "minhlt@gmail.com", address: "66 Trương Định, Hà Nội" }
  ];

  const tableBody = document.getElementById('tableBody');
  const recordPerPageSelect = document.getElementById('recordPerPage');
  const prevPageButton = document.getElementById('prevPage');
  const nextPageButton = document.getElementById('nextPage');
  const totalRecords = document.getElementById('totalRecords');

  let currentPage = 1;
  let recordPerPage = parseInt(recordPerPageSelect.value);

  function displayData(currentPage) {
    tableBody.innerHTML = '';
    const startIndex = (currentPage - 1) * recordPerPage;
    const endIndex = startIndex + recordPerPage;
    const paginatedData = data.slice(startIndex, endIndex);

    paginatedData.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.index}</td>
        <td>${item.code}</td>
        <td>${item.name}</td>
        <td>${item.gender}</td>
        <td>${item.dob}</td>
        <td>${item.email}</td>
        <td>${item.address}</td>
      `;
      tableBody.appendChild(row);
    });

    totalRecords.textContent = data.length;
  }

  function updatePagination() {
    const totalRecords = data.length;
    const totalPages = Math.ceil(totalRecords / recordPerPage);

    prevPageButton.disabled = currentPage === 1;
    nextPageButton.disabled = currentPage === totalPages || totalRecords === 0;

    displayData(currentPage);
  }

  recordPerPageSelect.addEventListener('change', function() {
    recordPerPage = parseInt(recordPerPageSelect.value);
    currentPage = 1;
    updatePagination();
  });

  prevPageButton.addEventListener('click', function() {
    if (currentPage > 1) {
      currentPage--;
      updatePagination();
    }
  });

  nextPageButton.addEventListener('click', function() {
    const totalRecords = data.length;
    const totalPages = Math.ceil(totalRecords / recordPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      updatePagination();
    }
  });

  updatePagination();
});
