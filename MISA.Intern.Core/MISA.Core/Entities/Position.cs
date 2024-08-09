using MISA.Core.Const;
using System.ComponentModel.DataAnnotations;

namespace MISA.Core.Entities
{
    /// <summary>
    /// Thông tin vị trí
    /// CreatedBy: VQHan
    /// </summary>
    public class Position
    {
        public Guid PositionId { get; set; }

        [Required(ErrorMessage = MISAConst.ERROR_POSITIONCODE_EMPTY)]
        [MaxLength(20, ErrorMessage = MISAConst.ERROR_POSITIONCODE_LENGTH)]
        public string PositionCode { get; set; }

        [Required(ErrorMessage = MISAConst.ERROR_POSITIONNAME_EMPTY)]
        public string PositionName { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
    }
}
