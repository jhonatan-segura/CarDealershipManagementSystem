namespace FinanzautoAPI.DTOs
{
   public class ImageDto
   {
      public int Id { get; set; }
      public required string FileName { get; set; }
      public required string ContentType { get; set; }
      public required byte[] ImageData { get; set; }
   }
}