using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FinanzautoAPI.Migrations
{
    /// <inheritdoc />
    public partial class PluralNames : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ModelLine_Brand_BrandId",
                table: "ModelLine");

            migrationBuilder.DropForeignKey(
                name: "FK_Vehicle_Color_ColorId",
                table: "Vehicle");

            migrationBuilder.DropForeignKey(
                name: "FK_Vehicle_Image_ImageId",
                table: "Vehicle");

            migrationBuilder.DropForeignKey(
                name: "FK_Vehicle_ModelLine_ModelLineId",
                table: "Vehicle");

            migrationBuilder.DropForeignKey(
                name: "FK_Vehicle_VehicleStatus_VehicleStatusId",
                table: "Vehicle");

            migrationBuilder.DropForeignKey(
                name: "FK_VehicleObservation_Observation_ObservationId",
                table: "VehicleObservation");

            migrationBuilder.DropForeignKey(
                name: "FK_VehicleObservation_Vehicle_VehicleId",
                table: "VehicleObservation");

            migrationBuilder.DropPrimaryKey(
                name: "PK_VehicleObservation",
                table: "VehicleObservation");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Vehicle",
                table: "Vehicle");

            migrationBuilder.DropPrimaryKey(
                name: "PK_User",
                table: "User");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Observation",
                table: "Observation");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Image",
                table: "Image");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Color",
                table: "Color");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Brand",
                table: "Brand");

            migrationBuilder.RenameTable(
                name: "VehicleObservation",
                newName: "VehicleObservations");

            migrationBuilder.RenameTable(
                name: "Vehicle",
                newName: "Vehicles");

            migrationBuilder.RenameTable(
                name: "User",
                newName: "Users");

            migrationBuilder.RenameTable(
                name: "Observation",
                newName: "Observations");

            migrationBuilder.RenameTable(
                name: "Image",
                newName: "Images");

            migrationBuilder.RenameTable(
                name: "Color",
                newName: "Colors");

            migrationBuilder.RenameTable(
                name: "Brand",
                newName: "Brands");

            migrationBuilder.RenameIndex(
                name: "IX_VehicleObservation_VehicleId",
                table: "VehicleObservations",
                newName: "IX_VehicleObservations_VehicleId");

            migrationBuilder.RenameIndex(
                name: "IX_VehicleObservation_ObservationId",
                table: "VehicleObservations",
                newName: "IX_VehicleObservations_ObservationId");

            migrationBuilder.RenameIndex(
                name: "IX_Vehicle_VehicleStatusId",
                table: "Vehicles",
                newName: "IX_Vehicles_VehicleStatusId");

            migrationBuilder.RenameIndex(
                name: "IX_Vehicle_ModelLineId",
                table: "Vehicles",
                newName: "IX_Vehicles_ModelLineId");

            migrationBuilder.RenameIndex(
                name: "IX_Vehicle_ImageId",
                table: "Vehicles",
                newName: "IX_Vehicles_ImageId");

            migrationBuilder.RenameIndex(
                name: "IX_Vehicle_ColorId",
                table: "Vehicles",
                newName: "IX_Vehicles_ColorId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_VehicleObservations",
                table: "VehicleObservations",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Vehicles",
                table: "Vehicles",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Users",
                table: "Users",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Observations",
                table: "Observations",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Images",
                table: "Images",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Colors",
                table: "Colors",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Brands",
                table: "Brands",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ModelLine_Brands_BrandId",
                table: "ModelLine",
                column: "BrandId",
                principalTable: "Brands",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_VehicleObservations_Observations_ObservationId",
                table: "VehicleObservations",
                column: "ObservationId",
                principalTable: "Observations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_VehicleObservations_Vehicles_VehicleId",
                table: "VehicleObservations",
                column: "VehicleId",
                principalTable: "Vehicles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Vehicles_Colors_ColorId",
                table: "Vehicles",
                column: "ColorId",
                principalTable: "Colors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Vehicles_Images_ImageId",
                table: "Vehicles",
                column: "ImageId",
                principalTable: "Images",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Vehicles_ModelLine_ModelLineId",
                table: "Vehicles",
                column: "ModelLineId",
                principalTable: "ModelLine",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Vehicles_VehicleStatus_VehicleStatusId",
                table: "Vehicles",
                column: "VehicleStatusId",
                principalTable: "VehicleStatus",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ModelLine_Brands_BrandId",
                table: "ModelLine");

            migrationBuilder.DropForeignKey(
                name: "FK_VehicleObservations_Observations_ObservationId",
                table: "VehicleObservations");

            migrationBuilder.DropForeignKey(
                name: "FK_VehicleObservations_Vehicles_VehicleId",
                table: "VehicleObservations");

            migrationBuilder.DropForeignKey(
                name: "FK_Vehicles_Colors_ColorId",
                table: "Vehicles");

            migrationBuilder.DropForeignKey(
                name: "FK_Vehicles_Images_ImageId",
                table: "Vehicles");

            migrationBuilder.DropForeignKey(
                name: "FK_Vehicles_ModelLine_ModelLineId",
                table: "Vehicles");

            migrationBuilder.DropForeignKey(
                name: "FK_Vehicles_VehicleStatus_VehicleStatusId",
                table: "Vehicles");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Vehicles",
                table: "Vehicles");

            migrationBuilder.DropPrimaryKey(
                name: "PK_VehicleObservations",
                table: "VehicleObservations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Users",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Observations",
                table: "Observations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Images",
                table: "Images");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Colors",
                table: "Colors");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Brands",
                table: "Brands");

            migrationBuilder.RenameTable(
                name: "Vehicles",
                newName: "Vehicle");

            migrationBuilder.RenameTable(
                name: "VehicleObservations",
                newName: "VehicleObservation");

            migrationBuilder.RenameTable(
                name: "Users",
                newName: "User");

            migrationBuilder.RenameTable(
                name: "Observations",
                newName: "Observation");

            migrationBuilder.RenameTable(
                name: "Images",
                newName: "Image");

            migrationBuilder.RenameTable(
                name: "Colors",
                newName: "Color");

            migrationBuilder.RenameTable(
                name: "Brands",
                newName: "Brand");

            migrationBuilder.RenameIndex(
                name: "IX_Vehicles_VehicleStatusId",
                table: "Vehicle",
                newName: "IX_Vehicle_VehicleStatusId");

            migrationBuilder.RenameIndex(
                name: "IX_Vehicles_ModelLineId",
                table: "Vehicle",
                newName: "IX_Vehicle_ModelLineId");

            migrationBuilder.RenameIndex(
                name: "IX_Vehicles_ImageId",
                table: "Vehicle",
                newName: "IX_Vehicle_ImageId");

            migrationBuilder.RenameIndex(
                name: "IX_Vehicles_ColorId",
                table: "Vehicle",
                newName: "IX_Vehicle_ColorId");

            migrationBuilder.RenameIndex(
                name: "IX_VehicleObservations_VehicleId",
                table: "VehicleObservation",
                newName: "IX_VehicleObservation_VehicleId");

            migrationBuilder.RenameIndex(
                name: "IX_VehicleObservations_ObservationId",
                table: "VehicleObservation",
                newName: "IX_VehicleObservation_ObservationId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Vehicle",
                table: "Vehicle",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_VehicleObservation",
                table: "VehicleObservation",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_User",
                table: "User",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Observation",
                table: "Observation",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Image",
                table: "Image",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Color",
                table: "Color",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Brand",
                table: "Brand",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ModelLine_Brand_BrandId",
                table: "ModelLine",
                column: "BrandId",
                principalTable: "Brand",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Vehicle_Color_ColorId",
                table: "Vehicle",
                column: "ColorId",
                principalTable: "Color",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Vehicle_Image_ImageId",
                table: "Vehicle",
                column: "ImageId",
                principalTable: "Image",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Vehicle_ModelLine_ModelLineId",
                table: "Vehicle",
                column: "ModelLineId",
                principalTable: "ModelLine",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Vehicle_VehicleStatus_VehicleStatusId",
                table: "Vehicle",
                column: "VehicleStatusId",
                principalTable: "VehicleStatus",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_VehicleObservation_Observation_ObservationId",
                table: "VehicleObservation",
                column: "ObservationId",
                principalTable: "Observation",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_VehicleObservation_Vehicle_VehicleId",
                table: "VehicleObservation",
                column: "VehicleId",
                principalTable: "Vehicle",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
