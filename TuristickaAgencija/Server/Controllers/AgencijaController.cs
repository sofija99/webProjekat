using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cors;

namespace Server.Controllers
{

    [ApiController]
    [Route("[controller]")]

    public class AgencijaController : ControllerBase
    {

        public AgencijaContext Context { get; set; }

        public AgencijaController(AgencijaContext context)
        {
            Context = context;
        }



        //CRUD AGENCIJA
        [Route("PreuzmiAgenciju")]
        [HttpGet]
        public async Task<List<Agencija>> PreuzmiAgenciju()
        {
            return await Context.Agencije.Include(p => p.aranzmani).ToListAsync();
        }


        [Route("PreuzmiAgencijuSaID")]
        [HttpGet]
        public async Task<Agencija> PreuzmiAgenciju(int ida)
        {
            var agencija = Context.Agencije.Include(p => p.aranzmani)
                                                 .Where(b => b.ID == ida).SingleOrDefaultAsync();
            // var agencija = await Context.Agencije.FindAsync(ida);                                                 
            return await agencija;
        }



        [Route("UpisAgencije")]
        [HttpPost]
        public async Task UpisAgencije([FromBody] Agencija agencija)
        {
            Context.Agencije.Add(agencija);
            await Context.SaveChangesAsync();

        }

        [Route("IzmeniAgenciju")]
        [HttpPut]
        public async Task IzmeniAgenciju([FromBody] Agencija agencija)
        {

            Context.Update<Agencija>(agencija);
            await Context.SaveChangesAsync();

        }

        [Route("IzbrisiAgenciju")]
        [HttpDelete]
        public async Task IzbrisiAgenciju(int id)
        {

            var staraagencija = await Context.Agencije.FindAsync(id);
            Context.Remove(staraagencija);
            await Context.SaveChangesAsync();

        }

        //CRUD ARANZMAN

        [Route("PreuzmiAranzman")]
        [HttpGet]
        public async Task<List<Aranzman>> PreuzmiAranzman()
        {
            return await Context.Aranzmani.ToListAsync();
        }

        [Route("UpisiAranzman/{idAgencije}")]
        [HttpPost]
        public async Task UpisiAranzman(int idAgencije, [FromBody] Aranzman aranzman)
        {
            var agencija = await Context.Agencije.FindAsync(idAgencije);
            aranzman.agencija = agencija;
            Context.Aranzmani.Add(aranzman);
            await Context.SaveChangesAsync();

        }

        [Route("IzmeniAranzman")]
        [HttpPut]
        public async Task IzmeniAranzman([FromBody] Aranzman aranzman)
        {

            Context.Update<Aranzman>(aranzman);
            await Context.SaveChangesAsync();

        }

        [Route("IzbrisiAranzman")]
        [HttpDelete]
        [EnableCors("cors")]
        public async Task IzbrisiAranzman(int id)
        {

            var stariAranzman = await Context.Aranzmani.FindAsync(id);
            Context.Remove(stariAranzman);
            await Context.SaveChangesAsync();

        }


        //CRUD Musterija

        [Route("PreuzmiMusteriju")]
        [HttpGet]
        public async Task<List<Musterija>> PreuzmiMusteriju()
        {
            return await Context.Musterije.ToListAsync();
        }


        [HttpPost]
        [Route("UpisiMusteriju/{idAranzmana}")]
        [EnableCors("cors")]
        public async Task<IActionResult> UpisiMusteriju(int idAranzmana, [FromBody] Musterija musterija)
        {
            var aranzman = await Context.Aranzmani.FindAsync(idAranzmana);
            musterija.aranzman = aranzman;

            //provera: da li se musterija vec prijavila => da li ima dovoljno mesta 
            //povecaj broj zauzetih mesta

            if (Context.Musterije.Any(musterijapom => musterijapom.brojPasosa == musterija.brojPasosa && musterijapom.aranzman.ID == idAranzmana))
            {
                var musterijanova = Context.Musterije.Where(p => p.aranzman.ID == idAranzmana && p.brojPasosa == musterija.brojPasosa).FirstOrDefault();
                return BadRequest(new { musterijanova = musterijanova });
            }
            if (aranzman.brojZauzetihMesta + musterija.brojSaputnika + 1 > aranzman.brojMesta)
            {
                return StatusCode(406);
            }
            else
            {
                aranzman.brojZauzetihMesta = aranzman.brojZauzetihMesta + 1 + musterija.brojSaputnika;
                Context.Musterije.Add(musterija);
                Context.Update<Aranzman>(aranzman);
                await Context.SaveChangesAsync();
                return Ok();
            }


        }


        [HttpGet]
        [Route("PronadjiMusteriju/{idAranzmana}/{brojPasosaMusterije}")]
        [EnableCors("cors")]
        public async Task<Musterija> PronadjiMusteriju(int idAranzmana, int brojPasosaMusterije)
        {



            //if (Context.Musterije.Any(musterijapom => musterijapom.brojPasosa == brojPasosaMusterije && musterijapom.aranzman.ID == idAranzmana))
            //{
            // var musterijanova = Context.Musterije.Where(p => p.aranzman.ID == idAranzmana && p.brojPasosa==brojPasosaMusterije).FirstOrDefault();
            // return BadRequest(new { musterijanova = musterijanova });

            return await Context.Musterije.Include(p => p.saputnici).Where(p => p.aranzman.ID == idAranzmana && p.brojPasosa == brojPasosaMusterije).FirstOrDefaultAsync();
            //}


        }

        [Route("IzmeniMusteriju/{idAranzmana}")]
        [HttpPut]
        [EnableCors("cors")]
        public async Task<IActionResult> IzmeniMusteriju(int idAranzmana, [FromBody] Musterija musterija)
        {
            var aranzman = await Context.Aranzmani.FindAsync(idAranzmana);
            musterija.aranzman = aranzman;

            //Console.Write(aranzman);
            //

            if (aranzman.brojZauzetihMesta + musterija.brojSaputnika + 1 > aranzman.brojMesta)
            {
                return StatusCode(406);
            }
            else
            {
                int brojSaputnika=0;
                  while(true)//  for (var i = 0; i < musterija.brojSaputnika; i++)
                {
                    var saputnik = await Context.Saputnici.Where(p => p.musterija.ID == musterija.ID).FirstOrDefaultAsync();
                    //Console.WriteLine("////////////////"+saputnik);
                    if(saputnik!=null)
                    Context.Remove(saputnik);
                    await Context.SaveChangesAsync();
                   
                    if(saputnik==null)
                    break;
                    
                     brojSaputnika++;
                }
                //await Context.SaveChangesAsync();

                
                if (aranzman != null)
                {
                    aranzman.brojZauzetihMesta = aranzman.brojZauzetihMesta -brojSaputnika+ musterija.brojSaputnika;
                    Context.Update<Aranzman>(aranzman);
                }


                Context.Update<Musterija>(musterija);
                await Context.SaveChangesAsync();
                return Ok();
            }

        }

        [Route("IzbrisiMusteriju/{idmusterije}/{idAranzmana}")]
        [HttpDelete]
        [EnableCors("cors")]
        public async Task<IActionResult> IzbrisiMusteriju(int idmusterije, int idAranzmana)
        {
            //nadji musterijju i saputnici
            //obrisi saputnici 
            //smanji zauzeta mesta
            //obrisi musteriju


            var staraMusterija = await Context.Musterije.FindAsync(idmusterije);
             // Context.Remove(staraMusterija);
            if (staraMusterija != null)
            {
                // if(staraMusterija.brojSaputnika != 0)
                for (var i = 0; i < staraMusterija.brojSaputnika; i++)
                {
                    var saputnik = await Context.Saputnici.Where(p => p.musterija.ID == idmusterije).FirstOrDefaultAsync();
                    //Console.WriteLine("////////////////"+saputnik);
                     Context.Remove(saputnik);
                    await Context.SaveChangesAsync();
                }
                //await Context.SaveChangesAsync();

                var aranzman = await Context.Aranzmani.FindAsync(idAranzmana);
                if (aranzman != null)
                {
                    aranzman.brojZauzetihMesta = aranzman.brojZauzetihMesta - 1 - staraMusterija.brojSaputnika;
                    Context.Update<Aranzman>(aranzman);
                }
                Context.Remove(staraMusterija);
                await Context.SaveChangesAsync();
                return Ok();
            }
            else
            {
                return StatusCode(406);
            }

        }
        //CRUD saputnik

        [Route("PreuzmiSaputnika")]
        [HttpGet]
        public async Task<List<Saputnik>> PreuzmiSaputnika()
        {
            return await Context.Saputnici.ToListAsync();
        }

        [Route("UpisiSaputnika/{idMusterije}")]
        [HttpPost]
        public async Task UpisiSaputnika(int idMusterije, [FromBody] Saputnik saputnik)
        {
            var musterija = await Context.Musterije.FindAsync(idMusterije);
            saputnik.musterija = musterija;
            // musterija.brojSaputnika+=1;
            Context.Saputnici.Add(saputnik);
            await Context.SaveChangesAsync();

        }

        [Route("IzmeniSaputnika")]
        [HttpPut]
        public async Task IzmeniSaputnika([FromBody] Saputnik saputnik)
        {

            Context.Update<Saputnik>(saputnik);
            await Context.SaveChangesAsync();

        }

        [Route("IzbrisiSaputnika")]
        [HttpDelete]
        public async Task IzbrisiSaputnika(int id)
        {

            var stariSaputnik = await Context.Saputnici.FindAsync(id);
            Context.Remove(stariSaputnik);
            await Context.SaveChangesAsync();

        }







    }
}