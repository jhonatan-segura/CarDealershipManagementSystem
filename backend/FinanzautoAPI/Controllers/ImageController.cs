using Microsoft.AspNetCore.Mvc;
using FinanzautoAPI.Context;
using FinanzautoAPI.Entities;
using Microsoft.EntityFrameworkCore;
using FinanzautoAPI.DTOs;
using Microsoft.AspNetCore.Authorization;

namespace FinanzautoAPI.Controllers
{

   [ApiController]
   [Route("images")]
   [Authorize]
   public class ImageController(ApplicationDbContext context) : ControllerBase
   {
      private readonly ApplicationDbContext _context = context;

      [HttpGet]
      public async Task<ActionResult<IEnumerable<Image>>> GetAll()
      {
         var images = await _context.Images
             .ToListAsync();

         return Ok(images);
      }

      [HttpGet("{id}")]
      public async Task<ActionResult<Image>> GetById(int id)
      {
         var image = await _context.Images
             .Where(i => i.Id == id)
             .ToListAsync();

         if (image == null)
            return NotFound();

         return Ok(image);
      }

      [HttpPost("upload")]
      [Consumes("multipart/form-data")]
      public async Task<ActionResult> Upload([FromForm] ImageUploadDto imageDto)
      {
         if (imageDto.File == null || imageDto.File.Length == 0)
         {
            return BadRequest("No image uploaded.");
         }

         using var memoryStream = new MemoryStream();
         await imageDto.File.CopyToAsync(memoryStream);
         var imageData = memoryStream.ToArray();

         var image = new Image
         {
            FileName = imageDto.File.FileName,
            ContentType = imageDto.File.ContentType,
            ImageData = imageData
         };

         _context.Images.Add(image);
         await _context.SaveChangesAsync();

         return Ok(new { image.Id, image.FileName });
      }

      [HttpPost("upload-multiple")]
      [Consumes("multipart/form-data")]
      public async Task<IActionResult> UploadImages([FromForm] List<IFormFile> files)
      {
         if (files == null || files.Count == 0)
            return BadRequest("No files received.");

         var savedImages = new List<Image>();

         foreach (var file in files)
         {
            using var ms = new MemoryStream();
            await file.CopyToAsync(ms);

            var image = new Image
            {
               FileName = file.FileName,
               ContentType = file.ContentType,
               ImageData = ms.ToArray(),
               UploadedAt = DateTime.UtcNow
            };

            savedImages.Add(image);
         }

         _context.Images.AddRange(savedImages);
         await _context.SaveChangesAsync();

         // Return the list of created image IDs
         var imageIds = savedImages.Select(i => i.Id);
         return Ok(imageIds);
      }

      [HttpPut]
      public async Task<ActionResult> Update(int id, Image image)
      {
         if (id != image.Id)
            return BadRequest("ID mismatch");

         _context.Entry(image).State = EntityState.Modified;

         try
         {
            await _context.SaveChangesAsync();
         }
         catch (DbUpdateConcurrencyException)
         {
            if (!_context.Images.Any(i => i.Id == id))
               return NotFound();

            throw;
         }

         return NoContent();
      }

      [HttpDelete("{id}")]
      public async Task<IActionResult> Delete(int id)
      {
         var image = await _context.Images.FindAsync(id);
         if (image == null)
            return NotFound();

         _context.Images.Remove(image);
         await _context.SaveChangesAsync();

         return NoContent();
      }
   }
}