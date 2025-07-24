using System.ComponentModel.DataAnnotations;

namespace FinanzautoAPI.Entities
{
   public class ModelLine
   {
      public int Id { get; set; }
      
      [Required]
      [MaxLength(50)]
      public required string Name { get; set; }
      public int BrandId { get; set; }
      public Brand? Brand { get; set; }
   }
}