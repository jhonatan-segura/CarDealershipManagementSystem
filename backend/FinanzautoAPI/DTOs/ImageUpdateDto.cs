namespace FinanzautoAPI.DTOs
{
   public class ImageUpdateDto
   {
      public required string FileName { get; set; }
      public required string ContentType { get; set; }
      public required byte[] ImageData { get; set; }
   }
}