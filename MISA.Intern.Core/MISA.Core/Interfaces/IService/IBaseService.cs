using MISA.Core.DTOs;

namespace MISA.Core.Interfaces.Service
{
    public interface IBaseService<T> where T : class
    {
        MISAServiceResult InsertService(T entity);
        MISAServiceResult UpdateService(T entity);
        MISAServiceResult DeleteService(Guid id);
    }
}
