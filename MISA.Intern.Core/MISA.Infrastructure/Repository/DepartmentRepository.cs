using Dapper;
using MISA.Core.Entities;
using MISA.Core.Interfaces.Repository;
using MISA.Infrastructure.Interfaces;

namespace MISA.Infrastructure.Repository
{
    public class DepartmentRepository : BaseRepository<Department>, IDepartmentRepository
    {
        public DepartmentRepository(IMISADbContext dbContext) : base(dbContext) { }

        public bool CheckDepartmentCodeDuplicate(string departmentCode)
        {
            var sql = "SELECT DepartmentCode from Department d WHERE d.DepartmentCode = @departmentCode";
            var parameters = new DynamicParameters();
            parameters.Add("@DepartmentCode", departmentCode);
            var res = _dbContext.Connection.QueryFirstOrDefault<string>(sql, parameters);
            return res != null;
        }
    }
}
