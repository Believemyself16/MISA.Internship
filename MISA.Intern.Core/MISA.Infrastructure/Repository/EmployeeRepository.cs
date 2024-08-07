using MISA.Core.Entities;
using MISA.Core.Interfaces.Repository;
using Dapper;
using MISA.Infrastructure.Interfaces;

namespace MISA.Infrastructure.Repository
{
    public class EmployeeRepository : BaseRepository<Employee>, IEmployeeRepository
    {
        public EmployeeRepository(IMISADbContext dbContext) : base(dbContext) { }

        public bool CheckEmployeeCodeDuplicate(string employeeCode)
        {
            var sql = "SELECT EmployeeCode from Employee e WHERE e.EmployeeCode = @employeeCode";
            var parameters = new DynamicParameters();
            parameters.Add("@EmployeeCode", employeeCode);
            var res = _dbContext.Connection.QueryFirstOrDefault<string>(sql, parameters);
            return res != null;
        }
    }
}
