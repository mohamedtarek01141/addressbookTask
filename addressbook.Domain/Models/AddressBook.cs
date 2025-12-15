using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace addressbook.Domain.Models
{
    public class AddressBook
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
        public Job? Job { get; set; }
        public Department? Department { get; set; }

    }
}
