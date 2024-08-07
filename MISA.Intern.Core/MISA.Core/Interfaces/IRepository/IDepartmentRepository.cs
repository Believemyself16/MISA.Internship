using MISA.Core.Entities;

namespace MISA.Core.Interfaces.Repository
{
    public interface IDepartmentRepository : IBaseRepository<Department>
    {
        /// <summary>
        /// Hàm kiểm tra mã phòng ban đã tồn tại hay chưa
        /// </summary>
        /// <param name="departmentCode">Mã phòng ban</param>
        /// <returns>true - đã tồn tại; false - chưa tồn tại</returns>
        /// CreatedBy: VQHan (4/8/2024)

        bool CheckDepartmentCodeDuplicate(string departmentCode);
    }
}
