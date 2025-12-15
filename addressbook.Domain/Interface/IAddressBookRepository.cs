using addressbook.Domain.Models;

namespace addressbook.Domain.Interface
{
    public interface IAddressBookRepository
    {
        Task<AddressBook?> GetByIdAsync(int id);
        Task<IEnumerable<AddressBook>> GetAllAsync();
        Task<IEnumerable<AddressBook>> SearchAsync(
            string? searchTerm = null,
            DateOnly? startDate = null,
            DateOnly? endDate = null);
        Task<AddressBook> AddAsync(AddressBook entity);
        Task<AddressBook> UpdateAsync(AddressBook entity);
        Task<bool> DeleteAsync(int id);
        Task<bool> ExistsAsync(int id);
    }
}
