using MISA.Core.Entities;

namespace MISA.Core.Interfaces.Repository
{
    public interface IEmployeeRepository : IBaseRepository<Employee>
    {
        /// <summary>
        /// Hàm kiểm tra mã nhân viên đã tồn tại hay chưa
        /// </summary>
        /// <param name="employeeCode">Mã nhân viên</param>
        /// <returns>true - đã tồn tại; false - chưa tồn tại</returns>
        /// CreatedBy: VQHan (4/8/2024)
        
        bool CheckEmployeeCodeDuplicate(string employeeCode);
    }
}
