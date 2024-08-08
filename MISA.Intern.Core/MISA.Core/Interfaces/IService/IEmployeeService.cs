using MISA.Core.DTOs;
using MISA.Core.Entities;

namespace MISA.Core.Interfaces.Service
{
    public interface IEmployeeService : IBaseService<Employee>
    {
        EmployeeDTO ConvertToDTO(Employee employee);
    }
}
