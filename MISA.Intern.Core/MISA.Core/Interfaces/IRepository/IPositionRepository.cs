using MISA.Core.Entities;

namespace MISA.Core.Interfaces.Repository
{
    public interface IPositionRepository : IBaseRepository<Position>
    {
        /// <summary>
        /// Hàm kiểm tra mã vị trí đã tồn tại hay chưa
        /// </summary>
        /// <param name="positionCode">Mã vị trí</param>
        /// <returns>true - đã tồn tại; false - chưa tồn tại</returns>
        /// CreatedBy: VQHan (4/8/2024)

        bool CheckPositionCodeDuplicate(string positionCode);
    }
}
