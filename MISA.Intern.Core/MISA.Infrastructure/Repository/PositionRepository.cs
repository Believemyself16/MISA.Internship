using Dapper;
using MISA.Core.Entities;
using MISA.Core.Interfaces.Repository;
using MISA.Infrastructure.Interfaces;

namespace MISA.Infrastructure.Repository
{
    public class PositionRepository : BaseRepository<Position>, IPositionRepository
    {
        public PositionRepository(IMISADbContext dbContext) : base(dbContext) { }

        public bool CheckPositionCodeDuplicate(string positionCode)
        {
            var sql = "SELECT PositionCode from Position p WHERE p.PositionCode = @positionCode";
            var parameters = new DynamicParameters();
            parameters.Add("@DepartmentCode", positionCode);
            var res = _dbContext.Connection.QueryFirstOrDefault<string>(sql, parameters);
            return res != null;
        }
    }
}
