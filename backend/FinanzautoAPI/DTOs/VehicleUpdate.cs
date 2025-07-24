using FinanzautoAPI.Entities;

namespace FinanzautoAPI.DTOs
{
   public class VehicleUpdateDto
   {
      public string Plate { get; set; } = string.Empty;
      public short YearReleased { get; set; }
      public int Mileage { get; set; }
      public decimal Cost { get; set; }
      public List<ObservationDto> Observations { get; set; } = [];
      public required ModelLine ModelLine { get; set; }
      public required VehicleStatus Status { get; set; }
      public required IFormFile File { get; set; }
   }
}
