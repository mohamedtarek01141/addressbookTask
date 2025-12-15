namespace addressbook.Application.Dtos.AddressBook
{
    public class AddressBookSearchDto
    {
        public string? SearchTerm { get; set; }
        public DateOnly? StartDate { get; set; }
        public DateOnly? EndDate { get; set; }
    }
}

