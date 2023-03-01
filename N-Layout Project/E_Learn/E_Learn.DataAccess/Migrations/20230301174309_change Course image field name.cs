using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ELearn.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class changeCourseimagefieldname : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ImagePath",
                table: "Courses",
                newName: "Image");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Image",
                table: "Courses",
                newName: "ImagePath");
        }
    }
}
