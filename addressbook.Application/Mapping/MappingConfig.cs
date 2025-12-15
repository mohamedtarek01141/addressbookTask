using addressbook.Application.Dtos.AddressBook;
using addressbook.Application.Dtos.Department;
using addressbook.Application.Dtos.Job;
using addressbook.Domain.Models;
using Mapster;

namespace addressbook.Application.Mapping
{
    public class MappingConfig : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.NewConfig<AddressBook, AddressBookDto>()
                .Map(dest => dest.JobTitle, src => src.Job != null ? src.Job.Title : null)
                .Map(dest => dest.DepartmentName, src => src.Department != null ? src.Department.Name : null);

            config.NewConfig<CreateAddressBookDto, AddressBook>()
                .Ignore(dest => dest.Id)
                .Ignore(dest => dest.Job)
                .Ignore(dest => dest.Department);

            config.NewConfig<UpdateAddressBookDto, AddressBook>()
                .Ignore(dest => dest.Id)
                .Ignore(dest => dest.Job)
                .Ignore(dest => dest.Department);

            config.NewConfig<Job, JobDto>()
                .Map(dest => dest.JobTitle, src => src.Title);

            config.NewConfig<CreateJobDto, Job>()
                .Ignore(dest => dest.Id)
                .Map(dest => dest.Title, src => src.JobTitle);

            config.NewConfig<UpdateJobDto, Job>()
                .Ignore(dest => dest.Id)
                .Map(dest => dest.Title, src => src.JobTitle);

            config.NewConfig<Department, DepartmentDto>();

            config.NewConfig<CreateDepartmentDto, Department>()
                .Ignore(dest => dest.Id);

            config.NewConfig<UpdateDepartmentDto, Department>()
                .Ignore(dest => dest.Id);
        }
    }
}
