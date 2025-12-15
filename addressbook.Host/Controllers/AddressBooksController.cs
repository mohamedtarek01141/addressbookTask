using addressbook.Application.Dtos.AddressBook;
using addressbook.Application.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace addressbook.Host.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddressBooksController : ControllerBase
    {
        private readonly IAddressBookService _addressBookService;

        public AddressBooksController(IAddressBookService addressBookService)
        {
            _addressBookService = addressBookService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AddressBookDto>>> GetAll()
        {
            var entries = await _addressBookService.GetAllAsync();
            return Ok(entries);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AddressBookDto>> GetById(int id)
        {
            var addressBook = await _addressBookService.GetByIdAsync(id);
            if (addressBook == null)
            {
                return NotFound($"addressBookwith ID {id} not found");
            }
            return Ok(addressBook);
        }

        [HttpPost("search")]
        public async Task<ActionResult<IEnumerable<AddressBookDto>>> Search([FromBody] AddressBookSearchDto searchDto)
        {
            if (searchDto == null)
            {
                return BadRequest("Search criteria cannot be null");
            }

            var entries = await _addressBookService.SearchAsync(searchDto);
            return Ok(entries);
        }

        [HttpPost]
        public async Task<ActionResult<AddressBookDto>> Create([FromBody] CreateAddressBookDto createDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdEntry = await _addressBookService.CreateAsync(createDto);
            return CreatedAtAction(nameof(GetById), new { id = createdEntry.Id }, createdEntry);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<AddressBookDto>> Update(int id, [FromBody] UpdateAddressBookDto updateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var exists = await _addressBookService.ExistsAsync(id);
            if (!exists)
            {
                return NotFound($"addressBookwith ID {id} not found");
            }

            var updatedEntry = await _addressBookService.UpdateAsync(id, updateDto);
            return Ok(updatedEntry);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var exists = await _addressBookService.ExistsAsync(id);
            if (!exists)
            {
                return NotFound($"addressBookwith ID {id} not found");
            }

            var deleted = await _addressBookService.DeleteAsync(id);
            if (!deleted)
            {
                return StatusCode(500, "Failed to delete the address addressBook");
            }

            return NoContent();
        }
    }
}
