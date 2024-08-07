using MISA.Core.Entities;
using MISA.Core.Exceptions;
using MISA.Core.Interfaces.Repository;
using MISA.Core.Interfaces.Service;

namespace MISA.Core.Services
{
    public class EmployeeService : BaseService<Employee>, IEmployeeService
    {
        IEmployeeRepository _employeeRepository;
        public EmployeeService(IEmployeeRepository employeeRepository) : base(employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        protected override void ValidateObject(Employee entity)
        {
            // Thực hiện kiểm tra mã nhân viên
            var isDuplicate = _employeeRepository.CheckEmployeeCodeDuplicate(entity.EmployeeCode);
            if (isDuplicate)
            {
                throw new ValidateException(MISA.Core.Resource.Resource.ValidateMsg_Employee_EmployeeCodeDuplicate);
            }
        }

        protected override void ProcessAfterSave()
        {
        }
    }
}
