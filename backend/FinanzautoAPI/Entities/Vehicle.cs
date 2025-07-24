using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace FinanzautoAPI.Entities
{
   [Index(nameof(Plate), IsUnique = true)]
   public class Vehicle
   {
      public int Id { get; set; }
      [Required]
      [StringLength(6, MinimumLength = 6, ErrorMessage = "La placa debe tener exactamente 6 caracteres.")]
      public required string Plate { get; set; }
      [Range(1900, 2100)]
      public short YearReleased { get; set; }
      [Required]
      public required int Mileage { get; set; }
      [Required]
      public decimal Cost { get; set; }
      public int ColorId { get; set; }
      public Color? Color { get; set; }
      public int ModelLineId { get; set; }
      public ModelLine? ModelLine { get; set; }
      public int VehicleStatusId { get; set; }
      public VehicleStatus? VehicleStatus { get; set; }
      public ICollection<VehicleObservation> VehicleObservations { get; set; } = [];
      public ICollection<VehicleImage> VehicleImages { get; set; } = new List<VehicleImage>();
   }
}