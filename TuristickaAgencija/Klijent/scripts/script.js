import { Agencija } from "./models/Agencija.js";
import { Aranzman } from "./models/Aranzman.js";

/*let idAgencije = 3;
fetch(`https://localhost:5001/Agencija/PreuzmiAgencijuSaID?ida=3`).then((p) => {
  p.json().then((data) => {
   
    const Agencija1 = new Agencija(
      data.naziv,
      data.adresa,
      data.kontakTelefon,
      data.vlasnik
    );

      data.aranzmani.forEach((aranzman) => {
      Agencija1.dodajAranzman(
        new Aranzman(aranzman.id,
            aranzman.brojMesta,
            aranzman.naziv,
            aranzman.cena,
          aranzman.slika,
          new Date( aranzman.datumPolaska),
          new Date( aranzman.datumPovratka),
          aranzman.tip,
          aranzman.brojDana,
          aranzman.brojZauzetihMesta
        )
      );
    });

    Agencija1.crtaj(document.body);
  });
});*/




fetch(`https://localhost:5001/Agencija/PreuzmiAgenciju`).then((p) => {
  p.json().then((data) => {
    data.forEach((data,index)=>{
    //console.log(data);
    const Agencija1 = new Agencija(
      data.naziv,
      data.adresa,
      data.kontakTelefon,
      data.vlasnik
    );
   console.log(Agencija1)
    const kontejnerAgencije=document.createElement("div")
    kontejnerAgencije.className=`kontejnerAgencije${index}`

      data.aranzmani.forEach((aranzman) => {
      Agencija1.dodajAranzman(
        new Aranzman(aranzman.id,
            aranzman.brojMesta,
            aranzman.naziv,
            aranzman.cena,
          aranzman.slika,
          new Date( aranzman.datumPolaska),
          new Date( aranzman.datumPovratka),
          aranzman.tip,
          aranzman.brojDana,
          aranzman.brojZauzetihMesta,
kontejnerAgencije
        )
      );
    });

 
    
    Agencija1.crtaj(kontejnerAgencije);
    document.body.appendChild(kontejnerAgencije)
  })
  });
});
