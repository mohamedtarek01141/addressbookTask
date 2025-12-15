using addressbook.Application.Dtos.Department;
using addressbook.Application.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace addressbook.Host.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentsController : ControllerBase
    {
        private readonly IDepartmentService _departmentService;

        public DepartmentsController(IDepartmentService departmentService)
        {
            _departmentService = departmentService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DepartmentDto>>> GetAll()
        {
            var departments = await _departmentService.GetAllAsync();
            return Ok(departments);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DepartmentDto>> GetById(int id)
        {
            var department = await _departmentService.GetByIdAsync(id);
            if (department == null)
            {
                return NotFound($"Department with ID {id} not found");
            }
            return Ok(department);
        }

        [HttpPost]
        public async Task<ActionResult<DepartmentDto>> Create([FromBody] CreateDepartmentDto createDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdDepartment = await _departmentService.CreateAsync(createDto);
            return CreatedAtAction(nameof(GetById), new { id = createdDepartment.Id }, createdDepartment);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<DepartmentDto>> Update(int id, [FromBody] UpdateDepartmentDto updateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var exists = await _departmentService.ExistsAsync(id);
            if (!exists)
            {
                return NotFound($"Department with ID {id} not found");
            }

            var updatedDepartment = await _departmentService.UpdateAsync(id, updateDto);
            return Ok(updatedDepartment);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var exists = await _departmentService.ExistsAsync(id);
            if (!exists)
            {
                return NotFound($"Department with ID {id} not found");
            }

            var deleted = await _departmentService.DeleteAsync(id);
            if (!deleted)
            {
                return StatusCode(500, "Failed to delete the department");
            }

            return NoContent();
        }
    }
}
