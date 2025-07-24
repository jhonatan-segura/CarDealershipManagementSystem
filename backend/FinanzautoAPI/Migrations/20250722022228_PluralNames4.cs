using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FinanzautoAPI.Migrations
{
    /// <inheritdoc />
    public partial class PluralNames4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VehicleObservations_Vehicles_VehicleId",
                table: "VehicleObservations");

            migrationBuilder.AddForeignKey(
                name: "FK_VehicleObservations_Users_VehicleId",
                table: "VehicleObservations",
                column: "VehicleId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VehicleObservations_Users_VehicleId",
                table: "VehicleObservations");

            migrationBuilder.AddForeignKey(
                name: "FK_VehicleObservations_Vehicles_VehicleId",
                table: "VehicleObservations",
                column: "VehicleId",
                principalTable: "Vehicles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
