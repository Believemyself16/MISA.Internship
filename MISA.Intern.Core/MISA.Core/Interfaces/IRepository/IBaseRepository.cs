namespace MISA.Core.Interfaces.Repository
{
    public interface IBaseRepository<T> where T : class
    {
        IEnumerable<T> GetAll();
        T? GetById(Guid id);
        int Insert(T entity);
        int Update(T entity);
        int Delete(Guid id);
        int DeleteMany(Guid[] ids);
    }
}
