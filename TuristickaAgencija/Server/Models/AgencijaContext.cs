using Microsoft.EntityFrameworkCore;

namespace Server.Models
{

    public class AgencijaContext : DbContext
    {
        //za TABELU vrt
        public DbSet<Agencija> Agencije { get; set; }
        public DbSet<Aranzman> Aranzmani { get; set; }
        public DbSet<Musterija> Musterije { get; set; }
        public DbSet<Saputnik> Saputnici { get; set; }

        public AgencijaContext(DbContextOptions options) : base(options)
        {

        }
    }
}