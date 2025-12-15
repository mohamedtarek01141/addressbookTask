using System.ComponentModel.DataAnnotations;

namespace addressbook.Application.Dtos.Department
{
    public class CreateDepartmentDto
    {
        [Required]
        [StringLength(200)]
        public string Name { get; set; } = string.Empty;
    }
}

