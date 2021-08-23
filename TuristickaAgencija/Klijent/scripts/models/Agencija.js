import {Aranzman} from "./Aranzman.js"

export class Agencija{
    constructor(naziv, adresa, kontaktTelefon, vlasnik){
        this.naziv=naziv
        this.adresa=adresa
        this.kontaktTelefon=kontaktTelefon
        this.vlasnik=vlasnik
        this.Aranzmani=[]

    }

    crtaj(host){
        if(!host)
        throw new Exception("Roditeljski el ne postoji!")

        const nazivagencije= host.querySelector(".nazivagencije")
        nazivagencije.textContent=`Turisticka agencija ${this.naziv}`
        host.appendChild(nazivagencije)
      
   

        //ARANZMANI
        const kontejnerAranzmana=document.createElement("div")
        kontejnerAranzmana.className='kontejnerAranzmana'
        host.appendChild(kontejnerAranzmana)

        this.Aranzmani.forEach(aranzman=>{
            aranzman.crtajAranzmane(kontejnerAranzmana)
        })


        const footer=host.querySelector("footer")
        footer.innerHTML=`Kontankt telefon: ${this.kontaktTelefon} <br/>
        Adresa: ${this.adresa}<br/>
        Vlasnik: ${this.vlasnik}`
        
    }

    dodajAranzman(noviAranzman){
      
        if(!noviAranzman)
        throw new Exception("Niste dodali aranzman!")
        else
        this.Aranzmani.push(noviAranzman)

    }


}