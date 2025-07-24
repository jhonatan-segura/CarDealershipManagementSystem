using System.ComponentModel.DataAnnotations;

namespace FinanzautoAPI.DTOs
{
   public class ModelLineCreateDto
   {
      public required string Name { get; set; }
      public required int BrandId { get; set; }
   }
}
