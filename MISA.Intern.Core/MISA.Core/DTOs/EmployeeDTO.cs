namespace MISA.Core.DTOs
{
    public class EmployeeDTO
    {
        public Guid EmployeeId { get; set; }
        public string EmployeeCode { get; set; }
        public string Fullname { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string GenderName { get; set; }
        public string? IdentityNumber { get; set; }
        public DateTime? IdentityDate { get; set; }
        public string? IdentityPlace { get; set; }
        public string? Address { get; set; }
        public string? MobilePhone { get; set; }
        public string? LandlinePhone { get; set; }
        public string Email { get; set; }
        public string? BankNumber { get; set; }
        public string? BankName { get; set; }
        public string? BankBranch { get; set; }
        public string DepartmentName { get; set; }
        public string PositionName { get; set; }
        public DateTime CreatedDate { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime ModifiedDate { get; set; }
        public string? ModifiedBy { get; set; }
    }
}
