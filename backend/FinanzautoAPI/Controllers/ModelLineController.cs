using Microsoft.AspNetCore.Mvc;
using FinanzautoAPI.Context;
using FinanzautoAPI.Entities;
using Microsoft.EntityFrameworkCore;
using FinanzautoAPI.DTOs;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.AspNetCore.Authorization;

namespace FinanzautoAPI.Controllers
{

   [ApiController]
   [Route("modellines")]
   [Authorize]
   public class ModelLineController(ApplicationDbContext context) : ControllerBase
   {
      private readonly ApplicationDbContext _context = context;

      [HttpGet]
      public async Task<ActionResult<IEnumerable<ModelLine>>> GetAll()
      {
         var models = await _context.ModelLines
             .ToListAsync();

         return Ok(models);
      }

      [HttpGet("by-brand/{id}")]
      public async Task<ActionResult<IEnumerable<ModelLine>>> GetByBrandId(int id)
      {
         var models = await _context.ModelLines
             .Include(v => v.Brand)
             .Where(m => m.Brand!.Id == id)
             .ToListAsync();

         if (models == null)
            return NotFound();

         return Ok(models);
      }

      [HttpGet("{id}")]
      public async Task<ActionResult<ModelLine>> GetById(int id)
      {
         var model = await _context.ModelLines
             .Include(v => v.Brand)
             .SingleOrDefaultAsync(v => v.Id == id);

         if (model == null)
            return NotFound();

         return Ok(model);
      }

      [HttpPost]
      public async Task<ActionResult> Create([FromBody] ModelLineCreateDto modelDto)
      {
         var model = new ModelLine
         {
            Name = modelDto.Name,
            BrandId = modelDto.BrandId
         };
         _context.ModelLines.Add(model);
         await _context.SaveChangesAsync();

         return CreatedAtAction(nameof(GetById), new { id = model.Id }, model);
      }

      [HttpPut("{id}")]
      public async Task<ActionResult> Update(int id, ModelLineCreateDto dto)
      {
         var model = await _context.ModelLines
             .SingleOrDefaultAsync(m => m.Id == id);

         if (model == null)
            return NotFound();

         model.Name = dto.Name;
         model.BrandId = dto.BrandId;

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