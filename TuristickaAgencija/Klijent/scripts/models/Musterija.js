export class Musterija {
  constructor(
    id,
    ime,
    prezime,
    brojsaputnika,
    datumrodjenja,
    brojpasosa,
    imesaputnika,
    prezimenasaputnika,
    brojpasosasaputnika,
    kontakttelefon
  ) {
    this.id = id;
    this.ime = ime;
    this.prezime = prezime;
    this.brojSaputnika = brojsaputnika;
    this.datumRodjenja = datumrodjenja;
    this.brojPasosa = brojpasosa;
    this.imenaSaputnika = imesaputnika;
    this.prezimenaSaputnika = prezimenasaputnika;
    this.brojPasosaSaputnika = brojpasosasaputnika;
    this.kontaktTelefon = kontakttelefon;
  }
  prikaziPodatke(aranzman) {
    //  console.log("//////////////////////////////////")
    // console.log(this)
    let host = document.querySelector(".kontejnerMusterija");
    const elementiHosta = [
      "imeMusterije",
      "prezimeMusterije",
      "datumRodjenja",
      "brojPasosa",
      "kontaktTelefon",
      "brojSaputnika",
    ];
    const atributimusterije = [
      this.ime,
      this.prezime,
      this.datumRodjenja,
      this.brojPasosa,
      this.kontaktTelefon,
      this.brojSaputnika,
    ];

    elementiHosta.forEach((el, index) => {
      let elhosta = host.querySelector(`.${el}`);
      elhosta.value = atributimusterije[index];
      if (index === 2) {
        //console.log(atributimusterije[index])
        elhosta.valueAsDate = new Date(atributimusterije[index]);
        //console.log(elhosta)
      }
    });
    let strhost = document.querySelector(".kontejnerAtributaBrSaputnika");
    //console.log(strhost)
    aranzman.dodajSaputnike(strhost, this.brojSaputnika);
    for (let k = 0; k < this.brojSaputnika; k++) {
      let elhosta = host.querySelector(`.saputnik${k + 1}`);
      elhosta.querySelector(`.imeSaputnika`).value = this.imenaSaputnika[k];
      elhosta.querySelector(`.prezimeSaputnika`).value =
        this.prezimenaSaputnika[k];
      elhosta.querySelector(`.brojPasosaSaputnika`).value =
        this.brojPasosaSaputnika[k];
    }

    this.promeniDugmice(host, aranzman);
  }

  promeniDugmice(host, aranzman) {
    let prijavaiprovera = document.querySelectorAll("button");
    prijavaiprovera.forEach((el) => {
      el.disabled = true;
    });
    const odjaviSe = document.createElement("button");
    odjaviSe.innerHTML = "Otkazi putovanje";
    host.appendChild(odjaviSe);
    odjaviSe.onclick = (ev) => {
      this.odjaviSe(aranzman);
    };
    const sacuvajizmene = document.createElement("button");
    sacuvajizmene.innerHTML = "Sacuvaj izmene";
    host.appendChild(sacuvajizmene);
    sacuvajizmene.onclick = (ev) => {
      this.sacuvajizmene(aranzman);
    };
  }

  prijaviSe(aranzman) {
    const elementi = [
      "imeMusterije",
      "prezimeMusterije",
      "datumRodjenja",
      "brojPasosa",
      "kontaktTelefon",
      "brojSaputnika",
    ];
    const vrednostiEl = [];

    var svepopunjeno = true;

    let imenasaputnika = [];
    let prezimenasaputnika = [];
    let brojpasosasaputnika = [];

    elementi.forEach((el, ind) => {
      vrednostiEl[ind] = document.querySelectorAll(`.${el}`)[0].value;
      if (vrednostiEl[ind] === "") {
        if (svepopunjeno === true) {
          alert(`Morate uneti sva polja`);

          svepopunjeno = false;
        }
        document.querySelectorAll(`.${el}`)[0].style.backgroundColor =
          "#c29b9b";
      } else {
        if (el === "brojSaputnika") {
          //broj saputnika sad foreach za to
          const brojsaputnika = document.querySelector(`.${el}`).value;

          if (brojsaputnika > 0) {
            for (let j = 0; j < brojsaputnika; j++) {
              const saputnik = document.querySelector(`.saputnik${j + 1}`);

              imenasaputnika[j] = saputnik.querySelector(".imeSaputnika").value;
              prezimenasaputnika[j] =
                saputnik.querySelector(".prezimeSaputnika").value;
              brojpasosasaputnika[j] = saputnik.querySelector(
                ".brojPasosaSaputnika"
              ).value;
              if (
                imenasaputnika[j] === "" ||
                prezimenasaputnika[j] === "" ||
                brojpasosasaputnika[j] === ""
              ) {
                alert("Morate uneti sva polja saputnika!");
                svepopunjeno = false;
                return false;
              }
            }
          }
        }
        document.querySelectorAll(`.${el}`)[0].style.backgroundColor = "white";
      }
    });
    if (svepopunjeno) {
      let saputnici = [];
      imenasaputnika.forEach((ime, index) => {
        saputnici.push({
          ime: ime,
          prezime: prezimenasaputnika[index],
          brojPasosa: brojpasosasaputnika[index],
        });
      });
      this.ime = vrednostiEl[0];
      this.prezime = vrednostiEl[1];
      this.datumRodjenja = vrednostiEl[2];
      this.brojPasosa = vrednostiEl[3];
      this.kontaktTelefon = vrednostiEl[4];
      this.brojSaputnika = vrednostiEl[5];
      this.imenaSaputnika = imenasaputnika;
      this.prezimenaSaputnika = prezimenasaputnika;
      this.brojPasosaSaputnika = brojpasosasaputnika;

      console.log(vrednostiEl[5]);
      fetch("https://localhost:5001/Agencija/UpisiMusteriju/" + aranzman.id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ime: vrednostiEl[0],
          prezime: vrednostiEl[1],
          brojSaputnika: vrednostiEl[5],
          datumRodjenja: vrednostiEl[2],
          brojPasosa: vrednostiEl[3],
          kontaktTelefon: vrednostiEl[4],
          saputnici: saputnici,
        }),
      })
        .then((res) => {
          if (res.ok) {
            alert("Uspesno ste se prijavili!");
            console.log("**********************************", vrednostiEl[5]);
            console.log(this);
            aranzman.novaMusterija = this; //res.musterijanova;
            aranzman.prikaziPodatke(Number(vrednostiEl[5]) + 1);
            let host = document.querySelector(".kontejnerMusterija");
            this.promeniDugmice(host, aranzman);
          } else if (res.status == 400) {
            res.json().then((res) => {
              aranzman.novaMusterija = res.musterijanova;
              aranzman.novaMusterija.prikaziPodatke(aranzman);
            });
            let host = document.querySelector(".kontejnerMusterija");
            this.promeniDugmice(host, aranzman);

            alert("Vec ste se prijavili za ovo putovanje");
          } else if (res.status == 406) {
            alert("Nema dovoljno mesta.");
          } else {
            alert("Greška prilikom upisa.");
          }
        })
        .catch((res) => {
          alert("Greška prilikom upisa.");
        });

    }
  }

  odjaviSe(aranzman, izmene = false) {
    console.log("///////////////////////////////////////////", this);
    fetch(
      "https://localhost:5001/Agencija/IzbrisiMusteriju/" +
        Number(this.id) +
        "/" +
        Number(aranzman.id),
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        console.log(res);
        if (res.ok) {
          alert("Uspesno ste otkazali putovanje");
          console.log(
            "**********************************",
            0 - 1 - this.brojsaputnika
          );
          aranzman.prikaziPodatke(Number(0 - 1 - this.brojSaputnika));
          let prijavaiprovera = document.querySelectorAll("button");
          prijavaiprovera.forEach((el) => {
            el.disabled = true;
          });
        } else {
          alert("Putovanje je vec otkazano");
        }
      })
      .catch((e) => console.log(e));
    ///console.log("****************",aranzman)
    /* const prethodnomusterija=aranzman.musterije.length
        aranzman.musterije = aranzman.musterije.filter(el=>{el.brojPasosa!=this.brojPasosa})
        if(aranzman.musterije.length!=prethodnomusterija){
        aranzman.brojZauzetihMesta=aranzman.brojZauzetihMesta-Number(this.brojSaputnika)-1
        
       // console.log("****************",aranzman)
        aranzman.prikaziPodatke( aranzman.brojZauzetihMesta)
        if(izmene===false){
        alert('Uspesno ste otkazali putovanje')
        let prijavaiprovera=document.querySelectorAll('button')

        prijavaiprovera.forEach(el=>{el.disabled=true})
        }
    }
    else{
        alert('Putovanje je vec otkazano')
    }*/
  }

  sacuvajizmene(aranzman) {
    //PRIKUPLJANJE PODATAKA
    const elementi = [
      "imeMusterije",
      "prezimeMusterije",
      "datumRodjenja",
      "brojPasosa",
      "kontaktTelefon",
      "brojSaputnika",
    ];
    const vrednostiEl = [];

    var svepopunjeno = true;

    let imenasaputnika = [];
    let prezimenasaputnika = [];
    let brojpasosasaputnika = [];

    elementi.forEach((el, ind) => {
      vrednostiEl[ind] = document.querySelectorAll(`.${el}`)[0].value;
      if (vrednostiEl[ind] === "") {
        if (svepopunjeno === true) {
          alert(`Morate uneti sva polja`);

          svepopunjeno = false;
        }
        document.querySelectorAll(`.${el}`)[0].style.backgroundColor =
          "#c29b9b";
      } else {
        if (el === "brojSaputnika") {
          //broj saputnika sad foreach za to
          const brojsaputnika = document.querySelector(`.${el}`).value;

          if (brojsaputnika > 0) {
            for (let j = 0; j < brojsaputnika; j++) {
              const saputnik = document.querySelector(`.saputnik${j + 1}`);

              imenasaputnika[j] = saputnik.querySelector(".imeSaputnika").value;
              prezimenasaputnika[j] =
                saputnik.querySelector(".prezimeSaputnika").value;
              brojpasosasaputnika[j] = saputnik.querySelector(
                ".brojPasosaSaputnika"
              ).value;
              if (
                imenasaputnika[j] === "" ||
                prezimenasaputnika[j] === "" ||
                brojpasosasaputnika[j] === ""
              ) {
                alert("Morate uneti sva polja saputnika!");
                svepopunjeno = false;
                return false;
              }
            }
          }
        }
        document.querySelectorAll(`.${el}`)[0].style.backgroundColor = "white";
      }
    });
    /////////////////////////////////////////////////
    let saputnici = [];
    imenasaputnika.forEach((ime, index) => {
      saputnici.push({
        ime: ime,
        prezime: prezimenasaputnika[index],
        brojPasosa: brojpasosasaputnika[index],
      });
    });
    fetch("https://localhost:5001/Agencija/IzmeniMusteriju/" + aranzman.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: this.id,
        ime: vrednostiEl[0],
        prezime: vrednostiEl[1],
        brojSaputnika: vrednostiEl[5],
        datumRodjenja: vrednostiEl[2],
        brojPasosa: vrednostiEl[3],
        kontaktTelefon: vrednostiEl[4],
        saputnici: saputnici,
      }),
    })
      .then((res) => {
        if (res.ok) {
          alert("Uspesno ste uneli izmene!");
          console.log(
            "**********************************",
            0 - this.brojSaputnika + Number(vrednostiEl[5])
          );
          aranzman.prikaziPodatke(
            0 - Number(this.brojSaputnika) + Number(vrednostiEl[5])
          );
        } else if (p.status == 406) {
          alert("Nema dovoljno mesta.");
        } else {
          alert("Greška prilikom upisa.");
        }
      })
      .catch((p) => {
        alert("Greška prilikom upisa.");
      });

    //this.odjaviSe(aranzman, true);
    // aranzman.prijaviSe();
  }
}
