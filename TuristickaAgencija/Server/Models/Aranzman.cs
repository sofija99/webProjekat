using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.Globalization;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Server.Models
{

    [Table("Aranzmani")]
    public class Aranzman
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("brojMesta")]
        public int brojMesta { get; set; }

        [Column("naziv")]
        [DataType(DataType.Text)]
        public string naziv { get; set; }

        [Column("cena")]
        public int cena { get; set; }

        [Column("slika")]
        [DataType(DataType.ImageUrl)]
        public string slika { get; set; }

        [Column("datumPolaska")]
       // [DataType(DataType.Date)]
        public DateTime datumPolaska { get; set; }

        [Column("datumPovratka")]
       // [DataType(DataType.Date)]
        public DateTime datumPovratka { get; set; }

        [Column("tip")]
        public string tip { get; set; }

        [Column("brojDana")]
        public int brojDana { get; set; }

        [Column("brojZauzetihMesta")]
        public int brojZauzetihMesta { get; set; }

        
        public List<Musterija> musterije { get; set; }

        //pokazivac na agenciju
        [JsonIgnore]
        public Agencija agencija { get; set; }


    }
}