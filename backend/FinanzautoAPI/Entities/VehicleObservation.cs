namespace FinanzautoAPI.Entities
{
   public class VehicleObservation
   {
      public int VehicleId { get; set; }
      public Vehicle Vehicle { get; set; } = null!;

      public int ObservationId { get; set; }
      public Observation Observation { get; set; } = null!;
   }
}