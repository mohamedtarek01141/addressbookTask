using addressbook.Application.Dtos.Job;

namespace addressbook.Application.Services.Interfaces
{
    public interface IJobService
    {
        Task<JobDto?> GetByIdAsync(int id);
        Task<IEnumerable<JobDto>> GetAllAsync();
        Task<JobDto> CreateAsync(CreateJobDto createDto);
        Task<JobDto> UpdateAsync(int id, UpdateJobDto updateDto);
        Task<bool> DeleteAsync(int id);
        Task<bool> ExistsAsync(int id);
    }
}

