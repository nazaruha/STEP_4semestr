using Ardalis.Specification;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Compass.Core.Entities.Specification
{
    public static class CourseSpecification
    {
        public class GetAll : Specification<Course> 
        {
            public GetAll()
            {
                Query.Include(c => c.Category);
            }
        }
        public class ByCategoryId : Specification<Course>
        {
            public ByCategoryId(int categoryId)
            {
                Query
                    .Include(c => c.Category)
                    .Where(c => c.CategoryId == categoryId);
            }
        }
    }
}
