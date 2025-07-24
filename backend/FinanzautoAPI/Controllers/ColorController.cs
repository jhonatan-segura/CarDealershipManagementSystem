using Microsoft.AspNetCore.Mvc;
using FinanzautoAPI.Context;
using FinanzautoAPI.Entities;
using Microsoft.EntityFrameworkCore;
using FinanzautoAPI.DTOs;
using Microsoft.AspNetCore.Authorization;

namespace FinanzautoAPI.Controllers
{

   [ApiController]
   [Route("colors")]
   [Authorize]
   public class ColorController(ApplicationDbContext context) : ControllerBase
   {
      private readonly ApplicationDbContext _context = context;

      [HttpGet]
      public async Task<ActionResult<IEnumerable<Color>>> GetAll()
      {
         var colors = await _context.Colors
             .ToListAsync();

         return Ok(colors);
      }

      [HttpGet("{id}")]
      public async Task<ActionResult<Color>> GetById(int id)
      {
         var color = await _context.Colors
             .Where(c => c.Id == id)
             .ToListAsync();

         if (color == null)
            return NotFound();

         return Ok(color);
      }

      [HttpPost]
      public async Task<ActionResult> Create([FromBody] ColorCreateUpdateDto colorDto)
      {
         var color = new Color
         {
            Name = colorDto.Name
         };
         _context.Colors.Add(color);
         await _context.SaveChangesAsync();

         return CreatedAtAction(nameof(GetById), new { id = color.Id }, color);
      }

      [HttpPut]
      public async Task<ActionResult> Update(int id, ColorCreateUpdateDto dto)
      {
         var color = await _context.Colors
             .SingleOrDefaultAsync(c => c.Id == id);

         if (color == null)
            return NotFound();

         color.Name = dto.Name;

         try
         {
            await _context.SaveChangesAsync();
         }
         catch (Exception e)
         {
            Conflict(new { message = $"Ha ocurrido un error: {e.Message}" });
         }

         return NoContent();
      }

      [HttpDelete("{id}")]
      public async Task<IActionResult> Delete(int id)
      {
         var color = await _context.Colors.FindAsync(id);
         if (color == null)
            return NotFound();

         _context.Colors.Remove(color);
         await _context.SaveChangesAsync();

         return NoContent();
      }
   }
}