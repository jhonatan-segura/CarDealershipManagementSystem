using System.ComponentModel.DataAnnotations;

namespace FinanzautoAPI.DTOs
{
   public class UserValidatedDto
   {
      public int Id { get; set; }
      public required string Name { get; set; }
      public required string Email { get; set; }
      public required string Token { get; set; }
   }
}
