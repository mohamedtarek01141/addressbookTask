using addressbook.Application.Dtos.Department;

namespace addressbook.Application.Services.Interfaces
{
    public interface IDepartmentService
    {
        Task<DepartmentDto?> GetByIdAsync(int id);
        Task<IEnumerable<DepartmentDto>> GetAllAsync();
        Task<DepartmentDto> CreateAsync(CreateDepartmentDto createDto);
        Task<DepartmentDto> UpdateAsync(int id, UpdateDepartmentDto updateDto);
        Task<bool> DeleteAsync(int id);
        Task<bool> ExistsAsync(int id);
    }
}

