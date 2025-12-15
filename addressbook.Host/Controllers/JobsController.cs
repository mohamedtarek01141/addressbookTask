using addressbook.Application.Dtos.Job;
using addressbook.Application.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace addressbook.Host.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobsController : ControllerBase
    {
        private readonly IJobService _jobService;

        public JobsController(IJobService jobService)
        {
            _jobService = jobService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<JobDto>>> GetAll()
        {
            var jobs = await _jobService.GetAllAsync();
            return Ok(jobs);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<JobDto>> GetById(int id)
        {
            var job = await _jobService.GetByIdAsync(id);
            if (job == null)
            {
                return NotFound($"Job with ID {id} not found");
            }
            return Ok(job);
        }

        [HttpPost]
        public async Task<ActionResult<JobDto>> Create([FromBody] CreateJobDto createDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdJob = await _jobService.CreateAsync(createDto);
            return CreatedAtAction(nameof(GetById), new { id = createdJob.Id }, createdJob);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<JobDto>> Update(int id, [FromBody] UpdateJobDto updateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var exists = await _jobService.ExistsAsync(id);
            if (!exists)
            {
                return NotFound($"Job with ID {id} not found");
            }

            var updatedJob = await _jobService.UpdateAsync(id, updateDto);
            return Ok(updatedJob);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var exists = await _jobService.ExistsAsync(id);
            if (!exists)
            {
                return NotFound($"Job with ID {id} not found");
            }

            var deleted = await _jobService.DeleteAsync(id);
            if (!deleted)
            {
                return StatusCode(500, "Failed to delete the job");
            }

            return NoContent();
        }
    }
}
