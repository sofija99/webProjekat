using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Server.Migrations
{
    public partial class V1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Agencije",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    naziv = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    adresa = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    kontakTelefon = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    vlasnik = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Agencije", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Aranzmani",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    brojMesta = table.Column<int>(type: "int", nullable: false),
                    naziv = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    cena = table.Column<int>(type: "int", nullable: false),
                    slika = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    datumPolaska = table.Column<DateTime>(type: "datetime2", nullable: false),
                    datumPovratka = table.Column<DateTime>(type: "datetime2", nullable: false),
                    tip = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    brojDana = table.Column<int>(type: "int", nullable: false),
                    brojZauzetihMesta = table.Column<int>(type: "int", nullable: false),
                    agencijaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Aranzmani", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Aranzmani_Agencije_agencijaID",
                        column: x => x.agencijaID,
                        principalTable: "Agencije",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Musterije",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    prezime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    brojSaputnika = table.Column<int>(type: "int", nullable: false),
                    datumRodjenja = table.Column<DateTime>(type: "datetime2", nullable: false),
                    brojPasosa = table.Column<int>(type: "int", nullable: false),
                    kontaktTelefon = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    aranzmanID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Musterije", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Musterije_Aranzmani_aranzmanID",
                        column: x => x.aranzmanID,
                        principalTable: "Aranzmani",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Saputnici",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    prezime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    brojPasosa = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    musterijaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Saputnici", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Saputnici_Musterije_musterijaID",
                        column: x => x.musterijaID,
                        principalTable: "Musterije",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Aranzmani_agencijaID",
                table: "Aranzmani",
                column: "agencijaID");

            migrationBuilder.CreateIndex(
                name: "IX_Musterije_aranzmanID",
                table: "Musterije",
                column: "aranzmanID");

            migrationBuilder.CreateIndex(
                name: "IX_Saputnici_musterijaID",
                table: "Saputnici",
                column: "musterijaID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Saputnici");

            migrationBuilder.DropTable(
                name: "Musterije");

            migrationBuilder.DropTable(
                name: "Aranzmani");

            migrationBuilder.DropTable(
                name: "Agencije");
        }
    }
}
