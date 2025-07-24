using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FinanzautoAPI.Migrations
{
    /// <inheritdoc />
    public partial class PluralNames3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ModelLine_Brands_BrandId",
                table: "ModelLine");

            migrationBuilder.DropForeignKey(
                name: "FK_Vehicles_ModelLine_ModelLineId",
                table: "Vehicles");

            migrationBuilder.DropPrimaryKey(
                name: "PK_User",
                table: "User");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ModelLine",
                table: "ModelLine");

            migrationBuilder.RenameTable(
                name: "User",
                newName: "Users");

            migrationBuilder.RenameTable(
                name: "ModelLine",
                newName: "ModelLines");

            migrationBuilder.RenameIndex(
                name: "IX_ModelLine_BrandId",
                table: "ModelLines",
                newName: "IX_ModelLines_BrandId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Users",
                table: "Users",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ModelLines",
                table: "ModelLines",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ModelLines_Brands_BrandId",
                table: "ModelLines",
                column: "BrandId",
                principalTable: "Brands",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Vehicles_ModelLines_ModelLineId",
                table: "Vehicles",
                column: "ModelLineId",
                principalTable: "ModelLines",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ModelLines_Brands_BrandId",
                table: "ModelLines");

            migrationBuilder.DropForeignKey(
                name: "FK_Vehicles_ModelLines_ModelLineId",
                table: "Vehicles");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Users",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ModelLines",
                table: "ModelLines");

            migrationBuilder.RenameTable(
                name: "Users",
                newName: "User");

            migrationBuilder.RenameTable(
                name: "ModelLines",
                newName: "ModelLine");

            migrationBuilder.RenameIndex(
                name: "IX_ModelLines_BrandId",
                table: "ModelLine",
                newName: "IX_ModelLine_BrandId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_User",
                table: "User",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ModelLine",
                table: "ModelLine",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ModelLine_Brands_BrandId",
                table: "ModelLine",
                column: "BrandId",
                principalTable: "Brands",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Vehicles_ModelLine_ModelLineId",
                table: "Vehicles",
                column: "ModelLineId",
                principalTable: "ModelLine",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
