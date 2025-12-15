using addressbook.Domain.Interface;
using addressbook.Domain.Models;
using addressbook.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace addressbook.Infrastructure.Repositories
{
    public class AddressBookRepository : IAddressBookRepository
    {
        private readonly ApplicationDbContext _context;

        public AddressBookRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<AddressBook?> GetByIdAsync(int id)
        {
            return await _context.AddressBooks
                .Include(a => a.Job)
                .Include(a => a.Department)
                .FirstOrDefaultAsync(a => a.Id == id);
        }

        public async Task<IEnumerable<AddressBook>> GetAllAsync()
        {
            return await _context.AddressBooks
                .Include(a => a.Job)
                .Include(a => a.Department)
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<IEnumerable<AddressBook>> SearchAsync(
            string? searchTerm = null,
            DateOnly? startDate = null,
            DateOnly? endDate = null)
        {
            var query = _context.AddressBooks
                .Include(a => a.Job)
                .Include(a => a.Department)
                .AsQueryable();

            // Search by all fields if searchTerm is provided
            if (!string.IsNullOrWhiteSpace(searchTerm))
            {
                query = query.Where(a =>
                    a.FullName.Contains(searchTerm) ||
                    a.MobileNumber.Contains(searchTerm) ||
                    a.Email.Contains(searchTerm) ||
                    a.Address.Contains(searchTerm) ||
                    (a.Job != null && a.Job.Title.Contains(searchTerm)) ||
                    (a.Department != null && a.Department.Name.Contains(searchTerm)));
            }

            // Filter by date range
            if (startDate.HasValue)
            {
                query = query.Where(a => a.DateOfBirth >= startDate.Value);
            }

            if (endDate.HasValue)
            {
                query = query.Where(a => a.DateOfBirth <= endDate.Value);
            }

            return await query.ToListAsync();
        }

        public async Task<AddressBook> AddAsync(AddressBook entity)
        {
            await _context.AddressBooks.AddAsync(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<AddressBook> UpdateAsync(AddressBook entity)
        {
            _context.AddressBooks.Update(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await _context.AddressBooks.FindAsync(id);
            if (entity == null)
                return false;

            _context.AddressBooks.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> ExistsAsync(int id)
        {
            return await _context.AddressBooks.AnyAsync(a => a.Id == id);
        }
    }
}

