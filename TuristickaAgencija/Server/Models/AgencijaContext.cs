using Microsoft.EntityFrameworkCore;

namespace Server.Models
{

    public class AgencijaContext : DbContext
    {

        public DbSet<Agencija> Agencije { get; set; }
        public DbSet<Aranzman> Aranzmani { get; set; }
        public DbSet<Musterija> Musterije { get; set; }
        public DbSet<Saputnik> Saputnici { get; set; }

        public AgencijaContext(DbContextOptions options) : base(options)
        {

        }
      /*  protected override void OnModelCreating(ModelBuilder mb)
        {
            mb.Entity<Agencija>()
            .HasMany(ag => ag.aranzmani)
            .WithOne()
            .OnDelete(DeleteBehavior.Cascade);
mb.Entity<Aranzman>()
.HasMany(m => m.musterije)
.WithOne()
.OnDelete(DeleteBehavior.Cascade);
            mb.Entity<Musterija>()
            .HasMany(s => s.saputnici)
            .WithOne()
            .OnDelete(DeleteBehavior.Cascade);

            base.OnModelCreating(mb);
        }*/
    }
}