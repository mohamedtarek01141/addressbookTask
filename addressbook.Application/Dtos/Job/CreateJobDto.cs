using System.ComponentModel.DataAnnotations;

namespace addressbook.Application.Dtos.Job
{
    public class CreateJobDto
    {
        [Required]
        [StringLength(200)]
        public string JobTitle { get; set; } = string.Empty;
    }
}

