import {Aranzman} from "./Aranzman.js"

export class Agencija{
    constructor(naziv="nn", adresa="nn", kontaktTelefon="00", vlasnik="nn"){
        this.naziv=naziv
        this.adresa=adresa
        this.kontaktTelefon=kontaktTelefon
        this.vlasnik=vlasnik
        this.Aranzmani=[]

    }

    crtaj(host){
        if(!host)
        throw new Exception("Roditeljski el ne postoji!")
//<h1 class='nazivagencije'>Turistička agencija </h1>

 const nazivagencije=document.createElement("label");
 nazivagencije.className='nazivagencije'



        //const nazivagencije= host.querySelector(".nazivagencije")
        nazivagencije.textContent=`Turisticka agencija ${this.naziv}`
        //host.appendChild(nazivagencije)
      
   host.appendChild(nazivagencije)

        //ARANZMANI
        const kontejnerAranzmana=document.createElement("div")
        kontejnerAranzmana.className='kontejnerAranzmana'
        host.appendChild(kontejnerAranzmana)

        this.Aranzmani.forEach(aranzman=>{
            aranzman.crtajAranzmane(kontejnerAranzmana)
        })

        const footeragencije=document.createElement("div")
        footeragencije.className='footer'
       
        //const footer=host.querySelector(".footer")
        footeragencije.innerHTML=`Kontankt telefon: ${this.kontaktTelefon} <br/>
        Adresa: ${this.adresa}<br/>
        Vlasnik: ${this.vlasnik}`
         host.appendChild(footeragencije)
    }

    dodajAranzman(noviAranzman){
      
        if(!noviAranzman)
        throw new Exception("Niste dodali aranzman!")
        else
        this.Aranzmani.push(noviAranzman)

    }


}