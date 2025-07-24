using System.ComponentModel.DataAnnotations;

namespace FinanzautoAPI.Entities
{
   public class Observation
   {
      public int Id { get; set; }

      [Required]
      [MaxLength(200)]
      public required string Text { get; set; }
      public ICollection<VehicleObservation> VehicleObservations { get; set; } = [];
   }
}