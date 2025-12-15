using System.ComponentModel.DataAnnotations;

namespace addressbook.Application.Dtos.AddressBook
{
    public class UpdateAddressBookDto
    {
        [Required]
        [StringLength(200)]
        public string FullName { get; set; } = string.Empty;

        [Required]
        public int JobId { get; set; }

        [Required]
        public int DepartmentId { get; set; }

        [Required]
        [Phone]
        [StringLength(20)]
        public string MobileNumber { get; set; } = string.Empty;

        [Required]
        public DateOnly DateOfBirth { get; set; }

        [Required]
        [StringLength(500)]
        public string Address { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        [StringLength(200)]
        public string Email { get; set; } = string.Empty;

        public string PhotoPath { get; set; } = string.Empty;

        [Range(0, 150)]
        public int Age { get; set; }
    }
}

