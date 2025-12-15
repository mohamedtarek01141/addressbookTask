using addressbook.Application.Services.Interfaces;
using addressbook.Application.Services.Services;
using Mapster;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace addressbook.Application.DependencyInjection
{
    public static class ServiceContainer
    {
        public static IServiceCollection ConfigureApplicationServices(this IServiceCollection services)
        {
            services.AddScoped<IAddressBookService, AddressBookService>();
            services.AddScoped<IJobService, JobService>();
            services.AddScoped<IDepartmentService, DepartmentService>();
            services.AddScoped<IAuthService, AuthService>();
            return services;
        }
    }
}
