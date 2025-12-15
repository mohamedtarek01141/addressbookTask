namespace addressbook.Application.Dtos.AddressBook
{
    public class AddressBookDto
    {
        public int Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public int JobId { get; set; }
        public int DepartmentId { get; set; }
        public string MobileNumber { get; set; } = string.Empty;
        public DateOnly DateOfBirth { get; set; }
        public string Address { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PhotoPath { get; set; } = string.Empty;
        public int Age { get; set; }
        public string? JobTitle { get; set; }
        public string? DepartmentName { get; set; }
    }
}

