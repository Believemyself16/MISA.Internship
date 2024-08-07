using MISA.Core.Const;
using System.ComponentModel.DataAnnotations;

namespace MISA.Core.Entities
{
    /// <summary>
    /// Thông tin phòng ban
    /// CreatedBy: VQHan
    /// </summary>
    public class Department
    {
        public Guid DepartmentId { get; set; }

        [Required(ErrorMessage = MISAConst.ERROR_DEPARTMENTCODE_EMPTY)]
        [MaxLength(20, ErrorMessage = MISAConst.ERROR_DEPARTMENTCODE_LENGTH)]
        public string DepartmentCode { get; set; }

        [Required(ErrorMessage = MISAConst.ERROR_DEPARTMENTNAME_EMPTY)]
        public string DepartmentName { get; set; }
        public DateTime CreatedDate { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime ModifiedDate { get; set; }
        public string? ModifiedBy { get; set; }
    }
}
