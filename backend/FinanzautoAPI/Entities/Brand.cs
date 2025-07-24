using System.ComponentModel.DataAnnotations;

namespace FinanzautoAPI.Entities
{
   public class Brand
   {
      public int Id { get; set; }
      
      [Required]
      [MaxLength(20)]
      public required string Name { get; set; }
   }
}