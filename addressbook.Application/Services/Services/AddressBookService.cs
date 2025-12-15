using addressbook.Application.Dtos.AddressBook;
using addressbook.Application.Services.Interfaces;
using addressbook.Domain.Interface;
using addressbook.Domain.Models;
using Mapster;

namespace addressbook.Application.Services.Services
{
    public class AddressBookService : IAddressBookService
    {
        private readonly IAddressBookRepository _repository;

        public AddressBookService(IAddressBookRepository repository)
        {
            _repository = repository;
        }

        public async Task<AddressBookDto?> GetByIdAsync(int id)
        {
            var entity = await _repository.GetByIdAsync(id);
            return entity?.Adapt<AddressBookDto>();
        }

        public async Task<IEnumerable<AddressBookDto>> GetAllAsync()
        {
            var entities = await _repository.GetAllAsync();
            return entities.Adapt<IEnumerable<AddressBookDto>>();
        }

        public async Task<IEnumerable<AddressBookDto>> SearchAsync(AddressBookSearchDto searchDto)
        {
            var entities = await _repository.SearchAsync(
                searchDto.SearchTerm,
                searchDto.StartDate,
                searchDto.EndDate);
            return entities.Adapt<IEnumerable<AddressBookDto>>();
        }

        public async Task<AddressBookDto> CreateAsync(CreateAddressBookDto createDto)
        {
            var entity = createDto.Adapt<AddressBook>();
            var createdEntity = await _repository.AddAsync(entity);
            return createdEntity.Adapt<AddressBookDto>();
        }

        public async Task<AddressBookDto> UpdateAsync(int id, UpdateAddressBookDto updateDto)
        {
            var entity = updateDto.Adapt<AddressBook>();
            entity.Id = id;
            var updatedEntity = await _repository.UpdateAsync(entity);
            return updatedEntity.Adapt<AddressBookDto>();
        }

        public async Task<bool> DeleteAsync(int id)
        {
            return await _repository.DeleteAsync(id);
        }

        public async Task<bool> ExistsAsync(int id)
        {
            return await _repository.ExistsAsync(id);
        }
    }
}
