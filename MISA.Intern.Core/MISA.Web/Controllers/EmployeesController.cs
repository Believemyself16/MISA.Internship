using Microsoft.AspNetCore.Mvc;
using MISA.Core.Entities;
using MISA.Core.Interfaces.Repository;
using MISA.Core.Interfaces.Service;

namespace MISA.Api.Controllers
{
    [Route("api/v1/employees")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        IEmployeeRepository _employeeRepository;
        private IEmployeeService _employeeService;
        public EmployeesController(IEmployeeRepository repository, IEmployeeService service)
        {
            _employeeRepository = repository;
            _employeeService = service;
        }

        [HttpGet]
        public IActionResult GetAllEmployee()
        {
            var employees = _employeeRepository.GetAll();
            var employeeDTOs = employees.Select(e => _employeeService.ConvertToDTO(e)).ToList();
            return Ok(employeeDTOs);
        }

        [HttpGet("{id}")]
        public IActionResult GetEmployeeById(Guid id)
        {
            var employee = _employeeRepository.GetById(id);
            if (employee == null)
            {
                return NotFound();
            }
            var employeeDTO = _employeeService.ConvertToDTO(employee);
            return Ok(employee);
        }

        [HttpPost]
        public IActionResult InsertEmployee(Employee employee)
        {
            var res = _employeeService.InsertService(employee);
            return StatusCode(201, res);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateEmployee(Guid id, [FromBody] Employee employee)
        {
            var res = _employeeService.UpdateService(employee);
            return Ok(res);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteEmployee(Guid id)
        {
            var res = _employeeService.DeleteService(id);
            return Ok(res);
        }
    }
}
