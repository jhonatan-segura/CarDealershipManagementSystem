namespace FinanzautoAPI.Entities
{
   public class VehicleImage
   {
      public int VehicleId { get; set; }
      public Vehicle Vehicle { get; set; } = null!;

      public int ImageId { get; set; }
      public Image Image { get; set; } = null!;
   }
}