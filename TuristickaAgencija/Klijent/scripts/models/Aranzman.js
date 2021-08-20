import { Musterija } from "./Musterija.js";
export class Aranzman {
  constructor(
    id,
    brojmesta,
    naziv,
    cena,
    slika,
    datumpolaska,
    datumpovratka,
    tip,
    brojdana,
    brojzauzetihmesta = 0
  ) {
    this.id = id;
    this.brojMesta = brojmesta;
    this.naziv = naziv;
    this.cena = cena;
    this.slika = "../../style/img/" + slika + ".jpg";
    if (this.nePostojiSlika(this.slika)) {
      this.slika = "../../style/img/podrazumevana.jpg";
      //console.log("***********************************");
    }
    this.datumPolaska = datumpolaska.toDateString();
    this.datumPovratka = datumpovratka.toDateString();
    this.tip = tip;
    this.brojDana = brojdana;
    this.brojZauzetihMesta = brojzauzetihmesta;
    this.musterije = [];
    this.novaMusterija = new Musterija();
  }

  nePostojiSlika(urlSlike) {
    var http = new XMLHttpRequest();
    http.open("HEAD", urlSlike, false);
    http.send();
    return http.status == 404;
  }

  crtajAranzmane(host) {
    const kontAranz = document.createElement("div");
    kontAranz.className = "aranzman";
    kontAranz.style.backgroundImage = `url(${this.slika})`;
    kontAranz.classList.add("slikaaranzmana");
    kontAranz.style.backgroundSize = "cover";

    const labelaAranzmanaNaziv = document.createElement("label");
    labelaAranzmanaNaziv.innerHTML = this.naziv + " " + this.cena + "€";
    const labelaAranzmanaMesta = document.createElement("label");
    labelaAranzmanaMesta.innerHTML =
      this.brojZauzetihMesta + "/" + this.brojMesta;
    labelaAranzmanaMesta.className = "zauzetaKrozSlobodnaMesta";

    kontAranz.appendChild(labelaAranzmanaNaziv);
    kontAranz.appendChild(document.createElement("br"));
    kontAranz.appendChild(labelaAranzmanaMesta);
    host.appendChild(kontAranz);

    kontAranz.onclick = (ev) => {
      //ako vec postoji obrisi pa onda pravi drugi
      const trenutniprikazaranzmana = document.querySelector(
        ".kontejnerMusterijaIDestinacija"
      );

      if (trenutniprikazaranzmana != null) {
        trenutniprikazaranzmana.remove();
        let aranzmani = document.querySelectorAll(".aranzman");

        aranzmani.forEach((el) => {
          // el.style.backgroundColor='transparent'
          el.style.opacity = "unset";
        });
      }

      kontAranz.style.opacity = 0.6;
      //kontAranz.style.backgroundColor="#0000ff"

      this.pogledajAranzman(this);
    };
  }

  pogledajAranzman(element) {
    const kontejnerMusterijaIDestinacija = document.createElement("div");
    kontejnerMusterijaIDestinacija.className = "kontejnerMusterijaIDestinacija";
    document.body.appendChild(kontejnerMusterijaIDestinacija);

    const kontejnerMusterija = document.createElement("div");
    kontejnerMusterija.className = "kontejnerMusterija";
    kontejnerMusterijaIDestinacija.appendChild(kontejnerMusterija);

    this.crtajMusteriju(kontejnerMusterija);

    const kontejnerAranzmana = document.createElement("div");
    kontejnerAranzmana.className = "kontejnerAranzman";
    kontejnerMusterijaIDestinacija.appendChild(kontejnerAranzmana);

    this.crtajAranzman(kontejnerAranzmana);
  }

  crtajAranzman(host) {
    host.style.backgroundImage = `url(${this.slika})`;
    host.classList.add("slikaaranzmana");

    const aranzman = document.createElement("h3");
    aranzman.innerHTML = this.naziv;
    aranzman.classList.add("nazivagencije");
    host.appendChild(aranzman);

    const listalabela = [
      "Broj mesta",
      "Broj zauzetih mesta",
      "Cena",
      "Broj dana",
      "Datum polaska",
      "Datum povratka",
    ];
    const listaatributa = [
      this.brojMesta,
      this.brojZauzetihMesta,
      this.cena,
      this.brojDana,
      this.datumPolaska,
      this.datumPovratka,
    ];
    listalabela.forEach((atribut, index) => {
      const labela = document.createElement("label");

      labela.innerHTML = `${atribut}:    ${listaatributa[index]}`;
      if (atribut === "Cena") labela.innerHTML += " €";
      if (atribut === "Broj zauzetih mesta")
        labela.className = "listaZauzetihMesta";
      host.appendChild(labela);
    });
  }

  crtajMusteriju(host) {
    const atributi = [
      "Ime",
      "Prezime",
      "Datum rodjenja",
      "Broj pasosa",
      "Kontakt telefon",
      "Broj saputnika",
    ];
    const klase = [
      "imeMusterije",
      "prezimeMusterije",
      "datumRodjenja",
      "brojPasosa",
      "kontaktTelefon",
      "brojSaputnika",
    ];
    const tipupisa = ["text", "text", "date", "number", "number", "number"];

    atributi.forEach((atr, index) => {
      const kontejnerAtributa = document.createElement("div");
      kontejnerAtributa.className = "kontejnerAtributa";
      const labelaAtributa = document.createElement("label");
      labelaAtributa.innerHTML = atr;
      kontejnerAtributa.appendChild(labelaAtributa);

      const atribut = document.createElement("input");
      atribut.className = klase[index];
      atribut.type = tipupisa[index];
      atribut.classList.add("atributiMusterije");
      kontejnerAtributa.appendChild(atribut);

      host.appendChild(kontejnerAtributa);

      if (atr === "Broj saputnika") {
        atribut.value = 0;
        kontejnerAtributa.classList.add("kontejnerAtributaBrSaputnika");
        atribut.onchange = (ev) => {
          let brsap = atribut.value;
          if (isNaN(brsap) || brsap > 10 || brsap < 0) {
            alert("Broj saputnika mora biti broj i manji od 10");
            atribut.value = 10;
          }
          this.dodajSaputnike(kontejnerAtributa, atribut.value);
        };
      }
      if (atr === "Broj pasosa" || atr === "Kontakt telefon") {
        atribut.onchange = (ev) => {
          if (
            isNaN(atribut.value) ||
            atribut.value < 0 ||
            atribut.value === ""
          ) {
            alert("Kontakt telefon i broj pasosa moraju biti brojevi ");
            atribut.value = 0;
          }
        };
      }
    });

    const prijaviSe = document.createElement("button");
    prijaviSe.innerHTML = "Prijavi se";
    host.appendChild(prijaviSe);
    prijaviSe.onclick = (ev) => {
      this.prijaviSe();
    };
    const proveraPrijave = document.createElement("button");
    proveraPrijave.innerHTML = "Proveri prijavu";
    host.appendChild(proveraPrijave);
    proveraPrijave.onclick = (ev) => {
      const brpasosa = document.querySelector(".brojPasosa");
      if (brpasosa.value === "") {
        alert("morate uneti broj pasosa");
        brpasosa.style.backgroundColor = "#c29b9b";
        //return false
      } else {
        brpasosa.style.backgroundColor = "white";
        this.proveraPrijave(brpasosa.value);
      }
    };
  }

  dodajSaputnike(host, broj) {
    let vecpostoji = host.querySelector(".saputnici");

    if (vecpostoji != null) vecpostoji.remove();
    const saputnici = document.createElement("div");
    saputnici.className = `saputnici`;

    for (let i = 0; i < broj; i++) {
      const saputnik = document.createElement("div");
      saputnik.className = `saputnik${i + 1} <br\>`;

      const labelaSaputnik = document.createElement("label");
      labelaSaputnik.innerHTML = `saputnik ${i + 1}`;

      const labelaime = document.createElement("label");
      labelaime.innerHTML = `Ime saputnika`;

      const imeSaputnika = document.createElement("input");
      imeSaputnika.type = "text";
      imeSaputnika.className = "imeSaputnika";

      const labelprezime = document.createElement("label");
      labelprezime.innerHTML = `Prezime saputnika`;

      const prezimeSaputnika = document.createElement("input");
      prezimeSaputnika.type = "text";
      prezimeSaputnika.className = "prezimeSaputnika";


   

      const labelbrojpasosa = document.createElement("label");
      labelbrojpasosa.innerHTML = `Broj pasosa saputnika`;

      const brojpasosa = document.createElement("input");
      brojpasosa.type = "number";
      brojpasosa.className = "brojPasosaSaputnika";
      
   if (i < this.novaMusterija.brojSaputnika) {
        prezimeSaputnika.value = this.novaMusterija.prezimenaSaputnika[i];
        imeSaputnika.value = this.novaMusterija.imenaSaputnika[i];
        brojpasosa.value = this.novaMusterija.brojPasosaSaputnika[i];
      }
      saputnik.appendChild(labelaSaputnik);
      saputnik.appendChild(labelaime);
      saputnik.appendChild(imeSaputnika);
      saputnik.appendChild(labelprezime);
      saputnik.appendChild(prezimeSaputnika);
      saputnik.appendChild(labelbrojpasosa);
      saputnik.appendChild(brojpasosa);

      saputnici.appendChild(saputnik);
    }
    host.appendChild(saputnici);
  }

  async prijaviSe() {
    this.novaMusterija.prijaviSe(this);
  }

  proveraPrijave(element) {
    console.log(element, this.id);
    fetch(
      `https://localhost:5001/Agencija/PronadjiMusteriju/${this.id}/${element}`
    )
      .then((res) => {
        if (res.status == 200) {
          res.json().then((data) => {
            // console.log(data);

            let imenasaputnika = [];
            let prezimenasaputnika = [];
            let brojpasosasaputnika = [];
            for (let i = 0; i < data.brojSaputnika; i++) {
              imenasaputnika[i] = data.saputnici[i].ime;
              prezimenasaputnika[i] = data.saputnici[i].prezime;
              brojpasosasaputnika[i] = data.saputnici[i].brojPasosa;
            }
            this.novaMusterija = new Musterija(
              data.id,
              data.ime,
              data.prezime,
              data.brojSaputnika,
              data.datumRodjenja,
              data.brojPasosa,
              imenasaputnika,
              prezimenasaputnika,
              brojpasosasaputnika,
              data.kontaktTelefon
            );
            this.novaMusterija.prikaziPodatke(this);
          });
        } else {
          alert("Niste se prijavili za ovo putovanje.");
        }
      })
      .catch((p) => {
        alert("Greška prilikom upisa.");
      });
    /*let pom = true;
    this.musterije.forEach((musterija) => {
      if (musterija.brojPasosa === element) {
        pom = false;
        alert("Prijavljeni ste za ovo putovanje");

        musterija.prikaziPodatke(this);
        // return  false
      } else {
        musterija.brojPasosaSaputnika.forEach((brpasosa) => {
          if (brpasosa === element) {
            pom = false;
            alert(
              `Prijavljeni ste kao saputnik na ovom letovanju. Prijavio vas je ${musterija.ime} ${musterija.prezime}`
            );
            // return false
          }
        });
      }
    });
    if (pom) return true;
    else return false;*/
  }

  prikaziPodatke(element) {
    // console.log(element);
    var zauzeta = Number(element) + Number(this.brojZauzetihMesta);
    let listaZauzetihMesta = document.querySelector(".listaZauzetihMesta");
    listaZauzetihMesta.innerHTML = `Broj zauzetih mesta:   ${zauzeta}`;
    let aranzmani = document.querySelectorAll(".aranzman");

    aranzmani.forEach((el) => {
      if (el.style.opacity === "0.6") {
        let labelaAranzmanaMesta = el.querySelector(
          ".zauzetaKrozSlobodnaMesta"
        );
        labelaAranzmanaMesta.innerHTML = zauzeta + "/" + this.brojMesta;
      }
    });
  }
}
