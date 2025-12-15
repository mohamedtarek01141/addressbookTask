using addressbook.Application.Dtos.Job;
using addressbook.Application.Services.Interfaces;
using addressbook.Domain.Interface;
using addressbook.Domain.Models;
using Mapster;

namespace addressbook.Application.Services.Services
{
    public class JobService : IJobService
    {
        private readonly IGenericRepository<Job> _repository;

        public JobService(IGenericRepository<Job> repository)
        {
            _repository = repository;
        }

        public async Task<JobDto?> GetByIdAsync(int id)
        {
            var entity = await _repository.GetByIdAsync(id);
            return entity?.Adapt<JobDto>();
        }

        public async Task<IEnumerable<JobDto>> GetAllAsync()
        {
            var entities = await _repository.GetAllAsync();
            return entities.Adapt<IEnumerable<JobDto>>();
        }

        public async Task<JobDto> CreateAsync(CreateJobDto createDto)
        {
            var entity = createDto.Adapt<Job>();
            var createdEntity = await _repository.AddAsync(entity);
            return createdEntity.Adapt<JobDto>();
        }

        public async Task<JobDto> UpdateAsync(int id, UpdateJobDto updateDto)
        {
            var entity = updateDto.Adapt<Job>();
            entity.Id = id;
            var updatedEntity = await _repository.UpdateAsync(entity);
            return updatedEntity.Adapt<JobDto>();
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

