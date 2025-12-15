using addressbook.Application.Dtos.Department;
using addressbook.Application.Services.Interfaces;
using addressbook.Domain.Interface;
using addressbook.Domain.Models;
using Mapster;

namespace addressbook.Application.Services.Services
{
    public class DepartmentService : IDepartmentService
    {
        private readonly IGenericRepository<Department> _repository;

        public DepartmentService(IGenericRepository<Department> repository)
        {
            _repository = repository;
        }

        public async Task<DepartmentDto?> GetByIdAsync(int id)
        {
            var entity = await _repository.GetByIdAsync(id);
            return entity?.Adapt<DepartmentDto>();
        }

        public async Task<IEnumerable<DepartmentDto>> GetAllAsync()
        {
            var entities = await _repository.GetAllAsync();
            return entities.Adapt<IEnumerable<DepartmentDto>>();
        }

        public async Task<DepartmentDto> CreateAsync(CreateDepartmentDto createDto)
        {
            var entity = createDto.Adapt<Department>();
            var createdEntity = await _repository.AddAsync(entity);
            return createdEntity.Adapt<DepartmentDto>();
        }

        public async Task<DepartmentDto> UpdateAsync(int id, UpdateDepartmentDto updateDto)
        {
            var entity = updateDto.Adapt<Department>();
            entity.Id = id;
            var updatedEntity = await _repository.UpdateAsync(entity);
            return updatedEntity.Adapt<DepartmentDto>();
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

