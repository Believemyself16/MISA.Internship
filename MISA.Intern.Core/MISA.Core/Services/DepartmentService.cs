using MISA.Core.DTOs;
using MISA.Core.Entities;
using MISA.Core.Exceptions;
using MISA.Core.Interfaces.Repository;
using MISA.Core.Interfaces.Service;

namespace MISA.Core.Services
{
    public class DepartmentService : BaseService<Department>, IDepartmentService
    {
        IDepartmentRepository _departmentRepository;
        public DepartmentService(IDepartmentRepository departmentRepository) : base(departmentRepository)
        {
            _departmentRepository = departmentRepository;
        }

        protected override void ValidateObject(Department entity)
        {
            // Thực hiện kiểm tra mã nhân viên
            var isDuplicate = _departmentRepository.CheckDepartmentCodeDuplicate(entity.DepartmentCode);
            if (isDuplicate)
            {
                throw new ValidateException(MISA.Core.Resource.Resource.ValidateMsg_Department_DepartmentCodeDuplicate);
            }
        }

        protected override void ProcessAfterSave()
        {
        }
    }
}
