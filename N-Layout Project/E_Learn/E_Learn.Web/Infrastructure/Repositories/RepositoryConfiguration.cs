using E_Learn.DataAccess.Data.IRepository;
using E_Learn.DataAccess.Data.Repository;

namespace E_Learn.Web.Infrastructure.Repositories
{
    public class RepositoryConfiguration
    {
        public static void Config(IServiceCollection services)
        {
            // Add category repository
            services.AddTransient<ICategoryRepository, CategoryRepository>();
        }
    }
}
