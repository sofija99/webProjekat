using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.Globalization;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Server.Models
{
    [Table("Saputnici")]
    public class Saputnik
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

        [Column("brojPasosa")]
        public string brojPasosa { get; set; }

      
        //pokazivac na musteriju
        [JsonIgnore]
        public Musterija musterija { get; set; }


    }
}