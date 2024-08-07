using System.Data;

namespace MISA.Infrastructure.Interfaces
{
    public interface IMISADbContext
    {
        IDbConnection Connection { get; }
        IDbTransaction Transaction { get; set; }
        IEnumerable<T> GetAll<T>(); 
        T? GetById<T>(Guid id);
        int Insert<T>(T entity);
        int Update<T>(T entity);
        int Delete<T>(Guid id);
        int DeleteMany<T>(Guid[] ids);
    }
}
