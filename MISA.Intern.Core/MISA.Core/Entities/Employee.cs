using MISA.Core.Const;
using MISA.Core.MISAEnum;
using MISA.Core.Validation;
using System.ComponentModel.DataAnnotations;

namespace MISA.Core.Entities
{
    /// <summary>
    /// Thông tin nhân viên
    /// CreatedBy: VQHan
    /// </summary>
    public class Employee
    {
        public Guid EmployeeId { get; set; }

        [Required(ErrorMessage = MISAConst.ERROR_EMPLOYEECODE_EMPTY)]
        [MaxLength(20, ErrorMessage = MISAConst.ERROR_EMPLOYEECODE_LENGTH)]
        public string EmployeeCode { get; set; } = "";

        [Required(ErrorMessage = MISAConst.ERROR_FULLNAME_EMPTY)]
        public string Fullname { get; set; } = "";

        [Required(ErrorMessage = MISAConst.ERROR_DOB_EMPTY)]
        [DateGreaterThanToday(ErrorMessage = MISAConst.ERROR_DOB_GREATER)]
        public DateTime DateOfBirth { get; set; }

        [Required(ErrorMessage = MISAConst.ERROR_GENDER_EMPTY)]
        public Gender Gender { get; set; }

        [MaxLength(12, ErrorMessage = MISAConst.ERROR_IDNUMBER_LENGTH)]
        public string? IdentityNumber { get; set; }

        [DateGreaterThanToday(ErrorMessage = MISAConst.ERROR_IDDATE_GREATER)]
        public DateTime? IdentityDate { get; set; }
        public string? IdentityPlace { get; set; }
        public string? Address { get; set; }

        [MaxLength(10, ErrorMessage = MISAConst.ERROR_PHONENUMBER_LENGTH)]
        public string? MobilePhone { get; set; }
        public string? LandlinePhone { get; set; }

        [Required(ErrorMessage = MISAConst.ERROR_EMAIL_EMPTY)]
        [EmailAddress(ErrorMessage = MISAConst.ERROR_EMAIL_FORMAT)]
        public string Email { get; set; } = "";
        public string? BankNumber { get; set; }
        public string? BankName { get; set; }
        public string? BankBranch { get; set; }
        public Guid DepartmentId { get; set; }
        public Guid PositionId { get; set; }
        public DateTime CreatedDate { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime ModifiedDate { get; set; }
        public string? ModifiedBy { get; set; }

    }
}
