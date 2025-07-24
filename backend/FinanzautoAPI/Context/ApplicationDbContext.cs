using FinanzautoAPI.Entities;
using Microsoft.EntityFrameworkCore;

namespace FinanzautoAPI.Context
{
   public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
   {
      public DbSet<Brand> Brands { get; set; }
      public DbSet<ModelLine> ModelLines { get; set; }
      public DbSet<Vehicle> Vehicles { get; set; }
      public DbSet<Color> Colors { get; set; }
      public DbSet<Image> Images { get; set; }
      public DbSet<Observation> Observations { get; set; }
      public DbSet<VehicleObservation> VehicleObservations { get; set; }
      public DbSet<VehicleImage> VehicleImages { get; set; }
      public DbSet<User> Users { get; set; }
      protected override void OnModelCreating(ModelBuilder modelBuilder)
      {
         base.OnModelCreating(modelBuilder);


         // foreign keys for vehicle and observations
         modelBuilder.Entity<VehicleObservation>()
          .HasKey(vo => new { vo.VehicleId, vo.ObservationId });

         modelBuilder.Entity<VehicleObservation>()
             .HasOne(vo => vo.Vehicle)
             .WithMany(v => v.VehicleObservations)
             .HasForeignKey(vo => vo.VehicleId);

         modelBuilder.Entity<VehicleObservation>()
             .HasOne(vo => vo.Observation)
             .WithMany(o => o.VehicleObservations)
             .HasForeignKey(vo => vo.ObservationId);

         // foreign keys for vehicle and image
         modelBuilder.Entity<VehicleImage>()
             .HasKey(vo => new { vo.VehicleId, vo.ImageId });

         modelBuilder.Entity<VehicleImage>()
             .HasOne(vo => vo.Vehicle)
             .WithMany(v => v.VehicleImages)
             .HasForeignKey(vi => vi.VehicleId);

         modelBuilder.Entity<VehicleImage>()
             .HasOne(vo => vo.Image)
             .WithMany(i => i.VehicleImages)
             .HasForeignKey(vi => vi.ImageId);


         modelBuilder.Entity<Vehicle>()
             .Property(v => v.Cost)
             .HasPrecision(14, 2);


         modelBuilder.Entity<VehicleStatus>().HasData(
             new VehicleStatus { Id = 1, Name = "Disponible" },
             new VehicleStatus { Id = 2, Name = "Reparación" },
             new VehicleStatus { Id = 3, Name = "En vitrina" },
             new VehicleStatus { Id = 4, Name = "Vendido" }
         );

         modelBuilder.Entity<Color>().HasData(
             new Color { Id = 1, Name = "Blanco" },
             new Color { Id = 2, Name = "Negro" },
             new Color { Id = 3, Name = "Gris" },
             new Color { Id = 4, Name = "Plateado" },
             new Color { Id = 5, Name = "Rojo" },
             new Color { Id = 6, Name = "Azul" },
             new Color { Id = 7, Name = "Verde" },
             new Color { Id = 8, Name = "Amarillo" },
             new Color { Id = 9, Name = "Marrón" },
             new Color { Id = 10, Name = "Beige" }
         );

         modelBuilder.Entity<Brand>().HasData(
             new Brand { Id = 1, Name = "Toyota" },
             new Brand { Id = 2, Name = "Chevrolet" },
             new Brand { Id = 3, Name = "Renault" },
             new Brand { Id = 4, Name = "Mazda" },
             new Brand { Id = 5, Name = "Nissan" }
         );

         modelBuilder.Entity<ModelLine>().HasData(
             // Toyota
             new ModelLine { Id = 1, Name = "Corolla", BrandId = 1 },
             new ModelLine { Id = 2, Name = "Hilux", BrandId = 1 },
             new ModelLine { Id = 3, Name = "Yaris", BrandId = 1 },

             // Chevrolet
             new ModelLine { Id = 4, Name = "Onix", BrandId = 2 },
             new ModelLine { Id = 5, Name = "Tracker", BrandId = 2 },
             new ModelLine { Id = 6, Name = "Spark GT", BrandId = 2 },

             // Renault
             new ModelLine { Id = 7, Name = "Duster", BrandId = 3 },
             new ModelLine { Id = 8, Name = "Stepway", BrandId = 3 },
             new ModelLine { Id = 9, Name = "Logan", BrandId = 3 },

             // Mazda
             new ModelLine { Id = 10, Name = "Mazda 2", BrandId = 4 },
             new ModelLine { Id = 11, Name = "Mazda 3", BrandId = 4 },
             new ModelLine { Id = 12, Name = "CX-5", BrandId = 4 },

             // Nissan
             new ModelLine { Id = 13, Name = "Versa", BrandId = 5 },
             new ModelLine { Id = 14, Name = "Frontier", BrandId = 5 },
             new ModelLine { Id = 15, Name = "Sentra", BrandId = 5 }
         );

      }
   }
}
