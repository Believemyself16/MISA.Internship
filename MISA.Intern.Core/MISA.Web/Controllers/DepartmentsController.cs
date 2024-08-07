using Microsoft.AspNetCore.Mvc;
using MISA.Core.Entities;
using MISA.Core.Interfaces.Repository;
using MISA.Core.Interfaces.Service;

namespace MISA.Api.Controllers
{
    [Route("api/v1/departments")]
    [ApiController]
    public class DepartmentsController : ControllerBase
    {
        IDepartmentRepository _departmentRepository;
        private IDepartmentService _departmentService;
        public DepartmentsController(IDepartmentRepository repository, IDepartmentService service)
        {
            _departmentRepository = repository;
            _departmentService = service;
        }

        [HttpGet]
        public IActionResult GetAllDepartment()
        {
            var departments = _departmentRepository.GetAll();
            return Ok(departments);
        }

        [HttpGet("{id}")]
        public IActionResult GetDepartmentById(Guid id)
        {
            var department = _departmentRepository.GetById(id);
            return Ok(department);
        }

        [HttpPost]
        public IActionResult InsertDepartment(Department department)
        {
            var res = _departmentService.InsertService(department);
            return StatusCode(201, res);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateDepartment(Guid id, [FromBody] Department department)
        {
            var res = _departmentService.UpdateService(department);
            return StatusCode(200, department);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteDepartment(Guid id)
        {
            var res = _departmentService.DeleteService(id);
            return StatusCode(200, res);
        }
    }
}
