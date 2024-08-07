using Microsoft.AspNetCore.Mvc;
using MISA.Core.Entities;
using MISA.Core.Interfaces.Repository;
using MISA.Core.Interfaces.Service;

namespace MISA.Api.Controllers
{
    [Route("api/v1/positions")]
    [ApiController]
    public class PositionsController : ControllerBase
    {
        IPositionRepository _positionRepository;
        private IPositionService _positionService;
        public PositionsController(IPositionRepository repository, IPositionService service)
        {
            _positionRepository = repository;
            _positionService = service;
        }

        [HttpGet]
        public IActionResult GetAllPosition()
        {
            var positions = _positionRepository.GetAll();
            return Ok(positions);
        }

        [HttpGet("{id}")]
        public IActionResult GetPositionById(Guid id)
        {
            var position = _positionRepository.GetById(id);
            return Ok(position);
        }

        [HttpPost]
        public IActionResult InsertPosition(Position position)
        {
            var res = _positionService.InsertService(position);
            return StatusCode(201, res);
        }

        [HttpPut("{id}")]
        public IActionResult UpdatePosition(Guid id, [FromBody] Position position)
        {
            var res = _positionService.UpdateService(position);
            return StatusCode(200, position);
        }

        [HttpDelete("{id}")]
        public IActionResult DeletePosition(Guid id)
        {
            var res = _positionService.DeleteService(id);
            return StatusCode(200, res);
        }
    }
}
