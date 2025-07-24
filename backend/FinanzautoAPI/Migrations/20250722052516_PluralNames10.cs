using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FinanzautoAPI.Migrations
{
    /// <inheritdoc />
    public partial class PluralNames10 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VehicleObservations_Users_VehicleId",
                table: "VehicleObservations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_VehicleObservations",
                table: "VehicleObservations");

            migrationBuilder.DropIndex(
                name: "IX_VehicleObservations_VehicleId",
                table: "VehicleObservations");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "VehicleObservations");

            migrationBuilder.AddPrimaryKey(
                name: "PK_VehicleObservations",
                table: "VehicleObservations",
                columns: new[] { "VehicleId", "ObservationId" });

            migrationBuilder.AddForeignKey(
                name: "FK_VehicleObservations_Vehicles_VehicleId",
                table: "VehicleObservations",
                column: "VehicleId",
                principalTable: "Vehicles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VehicleObservations_Vehicles_VehicleId",
                table: "VehicleObservations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_VehicleObservations",
                table: "VehicleObservations");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "VehicleObservations",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_VehicleObservations",
                table: "VehicleObservations",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_VehicleObservations_VehicleId",
                table: "VehicleObservations",
                column: "VehicleId");

            migrationBuilder.AddForeignKey(
                name: "FK_VehicleObservations_Users_VehicleId",
                table: "VehicleObservations",
                column: "VehicleId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
