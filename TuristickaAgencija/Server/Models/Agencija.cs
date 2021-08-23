using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.Globalization;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Server.Models
{
    [Table("Agencije")]
    public class Agencija
    {


        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("naziv")]
        [DataType(DataType.Text)]
        public string naziv { get; set; }

        [Column("adresa")]
        public string adresa { get; set; }

        [Column("kontakTelefon")]
        public string kontakTelefon { get; set; }

        [Column("vlasnik")]
        [DataType(DataType.Text)]
        public string vlasnik { get; set; }
        
        public List<Aranzman> aranzmani { get; set; }


    }
}