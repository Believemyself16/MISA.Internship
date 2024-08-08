using Dapper;
using Microsoft.Extensions.Configuration;
using MISA.Infrastructure.Interfaces;
using MySqlConnector;
using System.Data;

namespace MISA.Infrastructure.MISADbContext
{
    public class MariaDbContext : IMISADbContext
    {
        public IDbConnection Connection { get; }
        public IDbTransaction Transaction { get; set; }
        public MariaDbContext(IConfiguration config)
        {
            Connection = new MySqlConnection(config.GetConnectionString("Database1"));
        }

        public IEnumerable<T> GetAll<T>()
        {
            var className = typeof(T).Name;
            var sql = $"SELECT * FROM {className}";
            var data = Connection.Query<T>(sql);
            return data;
        }

        public T? GetById<T>(Guid id)
        {
            var className = typeof(T).Name;
            var sql = $"SELECT * FROM {className} WHERE {className}Id = @id";
            var paramaters = new DynamicParameters();
            paramaters.Add("@id", id);
            var res = Connection.QueryFirstOrDefault<T>(sql, paramaters);
            return res;
        }

        public int Insert<T>(T entity)
        {
            var className = typeof(T).Name;
            var propListName = "";
            var propListValue = "";

            // Lấy ra các props của entity
            var props = entity.GetType().GetProperties();
            var parameters = new DynamicParameters();
            foreach (var prop in props)
            {
                // Lấy ra name của prop
                var propName = prop.Name;

                // Lấy ra value của prop
                var propValue = prop.GetValue(entity);

                propListName += $"{propName},";
                propListValue += $"@{propName},";
                parameters.Add($"@{propName}", propValue);
            }
            propListName = propListName.Substring(0, propListName.Length - 1);
            propListValue = propListValue.Substring(0, propListValue.Length - 1);

            // Câu lệnh insert
            var sqlInsert = $"INSERT INTO {className} ({propListName}) VALUES ({propListValue})";
            // Thực thi
            var res = Connection.Execute(sqlInsert, param: parameters, transaction: Transaction);
            return res;
        }

        public int Update<T>(T entity)
        {
            var className = typeof(T).Name;
            var propListSet = "";
            var parameters = new DynamicParameters();
            object idValue = null;

            // Lấy ra các thuộc tính của đối tượng
            var props = entity.GetType().GetProperties();
            foreach (var prop in props)
            {
                var propName = prop.Name;
                var propValue = prop.GetValue(entity);

                if (propName.Equals($"{className}Id"))
                {
                    idValue = propValue; // Lưu ID để sử dụng trong mệnh đề WHERE
                }
                else
                {
                    propListSet += $"{propName} = @{propName}, "; // Chuẩn bị chuỗi set
                    parameters.Add($"@{propName}", propValue);
                    var a = propValue;
                }
            }

            if (idValue == null)
            {
                throw new ArgumentException("Đối tượng phải có trường id.");
            }

            propListSet = propListSet.TrimEnd(',', ' ');

            var sql = $"UPDATE {className} SET {propListSet} WHERE {className}Id = @Id";
            parameters.Add("@Id", idValue);

            var res = Connection.Execute(sql, param: parameters, transaction: Transaction);
            return res;
        }

        public int Delete<T>(Guid id)
        {
            var className = typeof(T).Name;
            var sql = $"DELETE FROM {className} WHERE {className}Id = @id";
            var parameters = new DynamicParameters();
            parameters.Add("@id", id);
            var res = Connection.Execute(sql, param: parameters, transaction: Transaction);
            return res;
        }

        public int DeleteMany<T>(Guid[] ids)
        {
            var className = typeof(T).Name;
            var sql = $"DELETE FROM {className} WHERE {className}Id IN (@ids)";
            var parameters = new DynamicParameters();
            var idArray = ""; // xóa 1 chuỗi các mã theo cú pháp (NV1,NV2,NV3)
            foreach (var item in ids)
            {
                idArray += $"{item},";
            }
            idArray = idArray.Substring(0, idArray.Length - 1);
            parameters.Add("@ids", idArray);
            var res = Connection.Execute(sql, parameters);
            return res;
        }
    }
}
