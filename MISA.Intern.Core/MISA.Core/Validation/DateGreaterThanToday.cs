using System.ComponentModel.DataAnnotations;

namespace MISA.Core.Validation
{
    public class DateGreaterThanToday : ValidationAttribute
    {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            // Kiểm tra ngày nhập vào
            if (value == null)
            {
                return ValidationResult.Success;
            }

            DateTime date;
            if (DateTime.TryParse(value.ToString(), out date))
            {
                // So sánh với ngày hiện tại
                var today = DateTime.Now;
                if (today < date)
                {
                    return new ValidationResult(ErrorMessage);
                }
                else
                {
                    return ValidationResult.Success;
                }
            }
            else
            {
                return new ValidationResult("Ngày tháng không hợp lệ!");
            }
        }
    }
}
