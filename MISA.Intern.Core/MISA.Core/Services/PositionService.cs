using MISA.Core.DTOs;
using MISA.Core.Entities;
using MISA.Core.Exceptions;
using MISA.Core.Interfaces.Repository;
using MISA.Core.Interfaces.Service;

namespace MISA.Core.Services
{
    public class PositionService : BaseService<Position>, IPositionService
    {
        IPositionRepository _positionRepository;
        public PositionService(IPositionRepository positionRepository) : base(positionRepository)
        {
            _positionRepository = positionRepository;
        }

        protected override void ValidateObject(Position entity)
        {
            // Thực hiện kiểm tra mã vị trí
            var isDuplicate = _positionRepository.CheckPositionCodeDuplicate(entity.PositionCode);
            if (isDuplicate)
            {
                throw new ValidateException(MISA.Core.Resource.Resource.ValidateMsg_Position_PositionCodeDuplicate);
            }
        }

        protected override void ProcessAfterSave()
        {
        }
    }
}
