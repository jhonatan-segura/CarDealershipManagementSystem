using Microsoft.AspNetCore.Mvc;
using FinanzautoAPI.Context;
using FinanzautoAPI.Entities;
using Microsoft.EntityFrameworkCore;
using FinanzautoAPI.DTOs;
using Microsoft.AspNetCore.Authorization;

namespace FinanzautoAPI.Controllers
{

   [ApiController]
   [Route("vehicles")]
   [Authorize]
   public class VehiclesController(ApplicationDbContext context) : ControllerBase
   {
      private readonly ApplicationDbContext _context = context;

      [HttpGet("for-sale")]
      [AllowAnonymous]
      public async Task<ActionResult<IEnumerable<VehicleWithObservationsDto>>> GetAllVehiclesForSale()
      {
         var vehicles = await _context.Vehicles
             .Include(v => v.VehicleObservations)
                 .ThenInclude(vo => vo.Observation)
             .Include(v => v.ModelLine)
                 .ThenInclude(ml => ml!.Brand)
             .Include(v => v.Color)
             .Where(v => (v.VehicleStatus!.Name == "Disponible" ||
                        v.VehicleStatus!.Name == "En vitrina") &&
                        v.IsActive == 1)
             .Select(v => new VehicleWithObservationsDto
             {
                Id = v.Id,
                Plate = v.Plate,
                YearReleased = v.YearReleased,
                Mileage = v.Mileage,
                Cost = v.Cost,
                Color = v.Color!,
                Observations = v.VehicleObservations
                     .Select(vo => new ObservationDto
                     {
                        Id = vo.Observation.Id,
                        Text = vo.Observation.Text
                     }).ToList(),
                ModelLine = v.ModelLine!,
                Status = v.VehicleStatus!,
                Images = v.VehicleImages
                     .Select(vi => new ImageDto
                     {
                        Id = vi.Image.Id,
                        FileName = vi.Image.FileName,
                        ContentType = vi.Image.ContentType,
                        ImageData = vi.Image.ImageData
                     }).ToList()
             })
             .ToListAsync();

         return Ok(vehicles);
      }

      [HttpGet]
      public async Task<ActionResult<IEnumerable<VehicleWithObservationsDtoNoImageData>>> GetAll()
      {
         var vehicles = await _context.Vehicles
            .Include(v => v.ModelLine)
                .ThenInclude(ml => ml!.Brand)
             .Where(v => v.IsActive == 1)
            .Select(v => new VehicleWithObservationsDtoNoImageData
            {
               Id = v.Id,
               Plate = v.Plate,
               YearReleased = v.YearReleased,
               Mileage = v.Mileage,
               Cost = v.Cost,
               Color = v.Color!,
               Observations = v.VehicleObservations
                     .Select(vo => new ObservationDto
                     {
                        Id = vo.Observation.Id,
                        Text = vo.Observation.Text
                     }).ToList(),
               ModelLine = v.ModelLine!,
               Status = v.VehicleStatus!,
               Images = v.VehicleImages
                     .Select(vi => new ImageDtoNoImageData
                     {
                        Id = vi.Image.Id,
                        FileName = vi.Image.FileName,
                        ContentType = vi.Image.ContentType,
                     }).ToList()
            })
            .ToListAsync();

         return Ok(vehicles);
      }

      [HttpGet("{id}")]
      [AllowAnonymous]
      public async Task<ActionResult<VehicleWithObservationsDto>> GetById(int id)
      {
         var vehicle = await _context.Vehicles
             .Include(v => v.VehicleObservations)
                 .ThenInclude(vo => vo.Observation)
             .Include(v => v.ModelLine)
                 .ThenInclude(ml => ml!.Brand)
             .Include(v => v.Color)
             .Where(v => v.Id == id && v.IsActive == 1)
             .Select(v => new VehicleWithObservationsDto
             {
                Id = v.Id,
                Plate = v.Plate,
                YearReleased = v.YearReleased,
                Mileage = v.Mileage,
                Cost = v.Cost,
                Color = v.Color!,
                Observations = v.VehicleObservations
                     .Select(vo => new ObservationDto
                     {
                        Id = vo.Observation.Id,
                        Text = vo.Observation.Text
                     }).ToList(),
                ModelLine = v.ModelLine!,
                Status = v.VehicleStatus!,
                Images = v.VehicleImages
                     .Select(vi => new ImageDto
                     {
                        Id = vi.Image.Id,
                        FileName = vi.Image.FileName,
                        ContentType = vi.Image.ContentType,
                        ImageData = vi.Image.ImageData,
                     }).ToList()
             })
             .SingleOrDefaultAsync();

         if (vehicle == null)
            return NotFound();

         return Ok(vehicle);
      }

      [HttpGet("search/{searchText}")]
      [AllowAnonymous]
      public async Task<ActionResult<IEnumerable<VehicleWithObservationsDto>>> Search(string searchText)
      {
         var vehicles = await _context.Vehicles
             .Include(v => v.VehicleObservations)
                 .ThenInclude(vo => vo.Observation)
             .Include(v => v.ModelLine)
                 .ThenInclude(ml => ml!.Brand)
             .Include(v => v.Color)
             .Where(v => (v.Plate.Contains(searchText) ||
                     v.ModelLine!.Brand!.Name.Contains(searchText) ||
                     v.ModelLine.Name.Contains(searchText) ||
                     v.Color!.Name.Contains(searchText) ||
                     v.YearReleased.ToString().Contains(searchText) ||
                     v.Cost.ToString().Contains(searchText) ||
                     v.VehicleStatus!.Name.Contains(searchText)) &&
                     v.IsActive == 1)
             .Select(v => new VehicleWithObservationsDto
             {
                Id = v.Id,
                Plate = v.Plate,
                YearReleased = v.YearReleased,
                Mileage = v.Mileage,
                Cost = v.Cost,
                Color = v.Color!,
                Observations = v.VehicleObservations
                     .Select(vo => new ObservationDto
                     {
                        Id = vo.Observation.Id,
                        Text = vo.Observation.Text
                     }).ToList(),
                ModelLine = v.ModelLine!,
                Status = v.VehicleStatus!,
                Images = v.VehicleImages
                     .Select(vi => new ImageDto
                     {
                        Id = vi.Image.Id,
                        FileName = vi.Image.FileName,
                        ContentType = vi.Image.ContentType,
                        ImageData = vi.Image.ImageData
                     }).ToList()
             })
             .ToListAsync();

         if (vehicles == null)
            return NotFound();

         return Ok(vehicles);
      }

      [HttpGet("search-by-plate/{plate}")]
      public async Task<ActionResult<VehicleWithObservationsDto>> SearchByPlate(string plate)
      {
         var vehicle = await _context.Vehicles
             .Where(v => v.Plate.ToUpper() == plate.ToUpper() && v.IsActive == 1)
             .Select(v => new
             {
                v.Id,
             })
             .SingleOrDefaultAsync();

         if (vehicle == null)
            return NotFound();

         return Ok(vehicle);
      }

      [HttpPost]
      public async Task<ActionResult> Create([FromBody] VehicleCreateUpdateDto vehicleDto)
      {
         bool plateExists = await _context.Vehicles
            .AnyAsync(v => v.Plate.ToUpper() == vehicleDto.Plate.ToUpper());

         if (plateExists)
         {
            return Conflict(new { message = "La placa ya está registrada." });
         }

         var images = await _context.Images
            .Where(i => vehicleDto.ImageIds.Contains(i.Id))
            .ToListAsync();

         var vehicle = new Vehicle
         {
            Plate = vehicleDto.Plate,
            YearReleased = vehicleDto.YearReleased,
            Mileage = vehicleDto.Mileage,
            Cost = vehicleDto.Cost,
            ColorId = vehicleDto.ColorId,
            ModelLineId = vehicleDto.ModelLineId,
            VehicleStatusId = vehicleDto.StatusId,
            VehicleImages = [.. images.Select(image => new VehicleImage
                  {
                     ImageId = image.Id
                  })]
         };

         _context.Vehicles.Add(vehicle);

         var observation = new Observation
         {
            Text = vehicleDto.Observation
         };

         _context.Observations.Add(observation);

         try
         {
            await _context.SaveChangesAsync();

            var vehicleObservation = new VehicleObservation
            {
               VehicleId = vehicle.Id,
               ObservationId = observation.Id
            };

            _context.VehicleObservations.Add(vehicleObservation);

            await _context.SaveChangesAsync();
         }
         catch (Exception e)
         {
            return Conflict(new { message = "Ha ocurrido un error.", exception = e.Message });
         }

         return CreatedAtAction(nameof(GetById), new { id = vehicle.Id }, new { vehicle.Id });
      }

      [HttpPatch("purchase/{id}")]
      [AllowAnonymous]
      public async Task<IActionResult> Purchase(int id)
      {
         var vehicle = await _context.Vehicles.FindAsync(id);

         if (vehicle == null)
            return NotFound("Vehículo no encontrado");

         var soldStatus = await _context.Set<VehicleStatus>()
               .FirstOrDefaultAsync(s => s.Name.ToLower() == "vendido");

         if (soldStatus == null)
            return NotFound("No se encontró el estado 'Vendido'");

         // Cambiar el estado a ID 4 (Comprado)
         vehicle.VehicleStatusId = soldStatus.Id;

         await _context.SaveChangesAsync();

         return Ok(new { message = "Estado cambiado a 'Vendido'" });
      }

      [HttpDelete("{id}")]
      public async Task<IActionResult> Delete(int id)
      {
         var vehicle = await _context.Vehicles.FindAsync(id);
         if (vehicle == null)
            return NotFound(new { message = "No existe ningún vehiculo con este Id" });

         vehicle.IsActive = 0;
         await _context.SaveChangesAsync();

         return NoContent();
      }

      [HttpPut("{id}")]
      public async Task<IActionResult> Update(int id, [FromBody] VehicleCreateUpdateDto dto)
      {
         var vehicle = await _context.Vehicles
             .Include(v => v.VehicleImages)
             .Include(v => v.VehicleObservations)
             .SingleOrDefaultAsync(v => v.Id == id);

         if (vehicle == null)
            return NotFound();

         // Actualizar propiedades básicas
         vehicle.Plate = dto.Plate;
         vehicle.YearReleased = dto.YearReleased;
         vehicle.Mileage = dto.Mileage;
         vehicle.Cost = dto.Cost;
         vehicle.ColorId = dto.ColorId;
         vehicle.ModelLineId = dto.ModelLineId;
         vehicle.VehicleStatusId = dto.StatusId;

         // Reemplazar imágenes asociadas
         var images = await _context.Images
             .Where(i => dto.ImageIds.Contains(i.Id))
             .ToListAsync();
         vehicle.VehicleImages = [.. images.Select(image => new VehicleImage
         {
            VehicleId = vehicle.Id,
            ImageId = image.Id
         })];

         var newObservation = new Observation { Text = dto.Observation };
         _context.Observations.Add(newObservation);
         await _context.SaveChangesAsync(); // necesitamos el ID generado

         var newVehicleObservation = new VehicleObservation
         {
            VehicleId = vehicle.Id,
            ObservationId = newObservation.Id
         };
         _context.VehicleObservations.Add(newVehicleObservation);

         await _context.SaveChangesAsync();

         return NoContent();
      }

   }
}