using MISA.Core.DTOs;
using MISA.Core.Interfaces.Repository;
using MISA.Core.Interfaces.Service;

namespace MISA.Core.Services
{
    public class BaseService<T> : IBaseService<T> where T : class
    {
        IBaseRepository<T> repository;
        public BaseService(IBaseRepository<T> repository)
        {
            this.repository = repository;
        }

        public MISAServiceResult InsertService(T entity)
        {
            
            SetNewId(entity);
            ValidateObject(entity);
            var res = repository.Insert(entity);
            ProcessAfterSave();
            return new MISAServiceResult();
        }

        // Thêm mới id cho bản ghi
        private void SetNewId(T entity)
        {
            var className = typeof(T).Name;
            var prop = typeof(T).GetProperty($"{className}Id");
            if (prop != null && (prop.PropertyType == typeof(Guid)) || prop.PropertyType == typeof(Guid?))
            {
                prop.SetValue(entity, Guid.NewGuid());
            }
        }

        // Xử lí nghiệp vụ trước khi thêm mới dữ liệu
        protected virtual void ValidateObject(T entity)
        {
        }

        // Xử lí sau khi thêm dữ liệu
        protected virtual void ProcessAfterSave()
        {
        }

        public MISAServiceResult UpdateService(T entity)
        {
            ValidateObject(entity);
            var res = repository.Update(entity);
            ProcessAfterSave();
            return new MISAServiceResult();
        }

        public MISAServiceResult DeleteService(Guid id)
        {
            var res = repository.Delete(id);
            ProcessAfterSave();
            return new MISAServiceResult();
        }
    }
}
