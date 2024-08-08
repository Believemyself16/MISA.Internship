using MISA.Core.DTOs;
using MISA.Core.Entities;
using MISA.Core.Exceptions;
using MISA.Core.Interfaces.Repository;
using MISA.Core.Interfaces.Service;
using MISA.Core.MISAEnum;

namespace MISA.Core.Services
{
    public class EmployeeService : BaseService<Employee>, IEmployeeService
    {
        IEmployeeRepository _employeeRepository;
        IPositionRepository _positionRepository;
        IDepartmentRepository _departmentRepository;
        public EmployeeService(IDepartmentRepository departmentRepository,
            IPositionRepository positionRepository,
            IEmployeeRepository employeeRepository) : base(employeeRepository)
        {
            _employeeRepository = employeeRepository;
            _positionRepository = positionRepository;
            _departmentRepository = departmentRepository;
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

        public EmployeeDTO ConvertToDTO(Employee employee)
        {
            var position = _positionRepository.GetById(employee.PositionId);
            var department = _departmentRepository.GetById(employee.DepartmentId);

            return new EmployeeDTO
            {
                EmployeeId = employee.EmployeeId,
                EmployeeCode = employee.EmployeeCode,
                Fullname = employee.Fullname,
                DateOfBirth = employee.DateOfBirth,
                GenderName = employee.Gender switch
                {
                    Gender.MALE => "Nam",
                    Gender.FEMALE => "Nữ",
                    Gender.OTHER => "Khác",
                    _ => "Không xác định"
                },
                IdentityNumber = employee.IdentityNumber,
                IdentityDate = employee.IdentityDate,
                IdentityPlace = employee.IdentityPlace,
                Address = employee.Address,
                MobilePhone = employee.MobilePhone,
                LandlinePhone = employee.LandlinePhone,
                Email = employee.Email,
                BankNumber = employee.BankNumber,
                BankName = employee.BankName,
                BankBranch = employee.BankBranch,
                PositionName = position.PositionName,
                DepartmentName = department.DepartmentName,
                CreatedDate = employee.CreatedDate,
                CreatedBy = employee.CreatedBy,
                ModifiedDate = employee.ModifiedDate,
                ModifiedBy = employee.ModifiedBy
            };
        }
    }
}
