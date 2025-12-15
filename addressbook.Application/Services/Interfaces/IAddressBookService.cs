using addressbook.Application.Dtos.AddressBook;

namespace addressbook.Application.Services.Interfaces
{
    public interface IAddressBookService
    {
        Task<AddressBookDto?> GetByIdAsync(int id);
        Task<IEnumerable<AddressBookDto>> GetAllAsync();
        Task<IEnumerable<AddressBookDto>> SearchAsync(AddressBookSearchDto searchDto);
        Task<AddressBookDto> CreateAsync(CreateAddressBookDto createDto);
        Task<AddressBookDto> UpdateAsync(int id, UpdateAddressBookDto updateDto);
        Task<bool> DeleteAsync(int id);
        Task<bool> ExistsAsync(int id);
    }
}
