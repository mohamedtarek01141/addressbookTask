using System.ComponentModel.DataAnnotations;

namespace addressbook.Application.Dtos.Job
{
    public class UpdateJobDto
    {
        [Required]
        [StringLength(200)]
        public string JobTitle { get; set; } = string.Empty;
    }
}

