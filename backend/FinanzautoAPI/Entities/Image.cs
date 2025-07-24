using System.ComponentModel.DataAnnotations;

namespace FinanzautoAPI.Entities
{
   public class Image
   {
      public int Id { get; set; }

      [Required]
      [MaxLength(255)]
      public required string FileName { get; set; }

      [Required]
      [MaxLength(100)]
      public required string ContentType { get; set; }

      [Required]
      public required byte[] ImageData { get; set; }
      public DateTime UploadedAt { get; set; } = DateTime.UtcNow;
      public ICollection<VehicleImage> VehicleImages { get; set; } = [];
   }
}