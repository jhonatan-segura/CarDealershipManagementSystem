using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FinanzautoAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddVehicleImageMiddleTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Vehicles_Images_ImageId",
                table: "Vehicles");

            migrationBuilder.DropIndex(
                name: "IX_Vehicles_ImageId",
                table: "Vehicles");

            migrationBuilder.DropColumn(
                name: "ImageId",
                table: "Vehicles");

            migrationBuilder.CreateTable(
                name: "VehicleImages",
                columns: table => new
                {
                    VehicleId = table.Column<int>(type: "int", nullable: false),
                    ImageId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VehicleImages", x => new { x.VehicleId, x.ImageId });
                    table.ForeignKey(
                        name: "FK_VehicleImages_Images_ImageId",
                        column: x => x.ImageId,
                        principalTable: "Images",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_VehicleImages_Vehicles_VehicleId",
                        column: x => x.VehicleId,
                        principalTable: "Vehicles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_VehicleImages_ImageId",
                table: "VehicleImages",
                column: "ImageId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "VehicleImages");

            migrationBuilder.AddColumn<int>(
                name: "ImageId",
                table: "Vehicles",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Vehicles_ImageId",
                table: "Vehicles",
                column: "ImageId");

            migrationBuilder.AddForeignKey(
                name: "FK_Vehicles_Images_ImageId",
                table: "Vehicles",
                column: "ImageId",
                principalTable: "Images",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
