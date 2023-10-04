using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Compass.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Addcategoryandcouresseeder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Category",
                columns: new[] { "Id", "Description", "Name" },
                values: new object[,]
                {
                    { 1, "", "Programming" },
                    { 2, "", "UI/UX" },
                    { 3, "", "FrontEnd" },
                    { 4, "", "System programming" }
                });

            migrationBuilder.InsertData(
                table: "Courses",
                columns: new[] { "Id", "CategoryId", "Description", "ImagePath", "Price", "Title" },
                values: new object[,]
                {
                    { 1, 1, "Description C++ Basics", "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png", 900.0m, "C++ Basics" },
                    { 2, 1, "Description C++ Advanced", "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png", 910.0m, "C++ Advanced" },
                    { 3, 2, "Description Figma", "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png", 1500.0m, "Figma" },
                    { 4, 3, "Description HTML/CSS/JavaScript", "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png", 1850.0m, "HTML/CSS/JavaScript" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Category",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Category",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Category",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Category",
                keyColumn: "Id",
                keyValue: 3);
        }
    }
}
