using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.Globalization;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Server.Models
{
    [Table("Musterije")]
    public class Musterija
    {




        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("ime")]
        [DataType(DataType.Text)]
        public string ime { get; set; }

        [Column("prezime")]
        [DataType(DataType.Text)]
        public string prezime { get; set; }

        [Column("brojSaputnika")]
        public int brojSaputnika { get; set; }

        [Column("datumRodjenja")]
        [DataType(DataType.Date)]
        public DateTime datumRodjenja { get; set; }

        [Column("brojPasosa")]
        public int brojPasosa { get; set; }

        [Column("kontaktTelefon")]
        public string kontaktTelefon { get; set; }

        
        public List<Saputnik> saputnici { get; set; }
        //pokazivac na aranzman
        [JsonIgnore]
        public Aranzman aranzman { get; set; }

    }
}