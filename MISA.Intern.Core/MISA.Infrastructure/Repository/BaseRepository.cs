using Dapper;
using MISA.Core.Interfaces.Repository;
using MISA.Infrastructure.Interfaces;

namespace MISA.Infrastructure.Repository
{
    public class BaseRepository<T> : IBaseRepository<T>, IDisposable where T : class
    {
        // Khởi tạo kết nối
        protected IMISADbContext _dbContext;
        protected string _className;
        public BaseRepository(IMISADbContext dbContext)
        {
            _dbContext = dbContext;
            _className = typeof(T).Name;
        }

        public IEnumerable<T> GetAll() 
        {
            var res = _dbContext.GetAll<T>();
            return res;
        }

        public T? GetById(Guid id)
        {
            var res = _dbContext.GetById<T>(id);
            return res;
        }

        public int Insert(T entity)
        {
            _dbContext.Connection.Open();
            _dbContext.Transaction = _dbContext.Connection.BeginTransaction();
            var res = _dbContext.Insert(entity);
            _dbContext.Transaction.Commit();
            return res;
        }

        public int Update(T entity)
        {
            _dbContext.Connection.Open();
            _dbContext.Transaction = _dbContext.Connection.BeginTransaction();
            var res = _dbContext.Update(entity);
            _dbContext.Transaction.Commit();
            return res;
        }

        public int Delete(Guid id)
        {
            _dbContext.Connection.Open();
            _dbContext.Transaction = _dbContext.Connection.BeginTransaction();
            var res = _dbContext.Delete<T>(id);
            _dbContext.Transaction.Commit();
            return res;
        }

        public int DeleteMany(Guid[] ids)
        {
            _dbContext.Connection.Open();
            _dbContext.Transaction = _dbContext.Connection.BeginTransaction();
            var res = _dbContext.DeleteMany<T>(ids);
            _dbContext.Transaction.Commit();
            return res;
        }

        public void Dispose()
        {
            _dbContext.Connection.Close();
        }
    }
}
