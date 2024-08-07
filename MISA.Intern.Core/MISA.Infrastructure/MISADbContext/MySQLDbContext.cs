using Microsoft.Extensions.Configuration;
using MISA.Infrastructure.Interfaces;
using MySqlConnector;
using System.Data;

namespace MISA.Infrastructure.MISADbContext
{
    public class MySQLDbContext : IMISADbContext
    {
        public IDbConnection Connection { get; }
        public IDbTransaction Transaction { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }

        public MySQLDbContext(IConfiguration config)
        {
            Connection = new MySqlConnection(config.GetConnectionString("Database1"));
        }

        public IEnumerable<T> GetAll<T>()
        {
            throw new NotImplementedException();
        }

        public T? GetById<T>(Guid id)
        {
            throw new NotImplementedException();
        }

        public int Insert<T>(T entity)
        {
            throw new NotImplementedException();
        }

        public int Update<T>(T entity)
        {
            throw new NotImplementedException();
        }

        public int Delete<T>(Guid id)
        {
            throw new NotImplementedException();
        }

        public int DeleteMany<T>(Guid[] ids)
        {
            throw new NotImplementedException();
        }
    }
}
