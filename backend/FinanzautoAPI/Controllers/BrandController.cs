using Microsoft.AspNetCore.Mvc;
using FinanzautoAPI.Context;
using FinanzautoAPI.Entities;
using Microsoft.EntityFrameworkCore;
using FinanzautoAPI.DTOs;
using Microsoft.AspNetCore.Authorization;

namespace FinanzautoAPI.Controllers
{

   [ApiController]
   [Route("brands")]
   [Authorize]
   public class BrandController(ApplicationDbContext context) : ControllerBase
   {
      private readonly ApplicationDbContext _context = context;

      [HttpGet]
      public async Task<ActionResult<IEnumerable<Brand>>> GetAll()
      {
         var brands = await _context.Brands
             .ToListAsync();

         return Ok(brands);
      }

      [HttpGet("{id}")]
      public async Task<ActionResult<Brand>> GetById(int id)
      {
         var brand = await _context.Brands
             .SingleOrDefaultAsync(b => b.Id == id);

         if (brand == null)
            return NotFound();

         return Ok(brand);
      }

      [HttpPost]
      public async Task<ActionResult> Create(BrandDto dto)
      {
         var brand = new Brand
         {
            Name = dto.Name,
         };
         _context.Brands.Add(brand);
         await _context.SaveChangesAsync();

         return CreatedAtAction(nameof(GetById), new { id = brand.Id }, brand);
      }

      [HttpPut("{id}")]
      public async Task<ActionResult> Update(int id, BrandDto dto)
      {
         var brand = await _context.Brands
             .SingleOrDefaultAsync(b => b.Id == id);

         if (brand == null)
            return NotFound();

         brand.Name = dto.Name;

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
         var model = await _context.ModelLines.FindAsync(id);
         if (model == null)
            return NotFound();

         _context.ModelLines.Remove(model);
         await _context.SaveChangesAsync();

         return NoContent();
      }
   }
}