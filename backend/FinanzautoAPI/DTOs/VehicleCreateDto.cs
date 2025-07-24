using System.ComponentModel.DataAnnotations;

namespace FinanzautoAPI.DTOs
{
   public class VehicleCreateUpdateDto
   {
      public required string Plate { get; set; }
      public required short YearReleased { get; set; }
      public required int Mileage { get; set; }
      public required decimal Cost { get; set; }
      public required string Observation { get; set; }
      public required int ColorId { get; set; }
      public required int ModelLineId { get; set; }
      public List<int> ImageIds { get; set; } = [];
      public required int StatusId { get; set; }
   }
}
