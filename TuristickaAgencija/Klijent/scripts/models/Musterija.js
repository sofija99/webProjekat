

export class Musterija{
    constructor(ime, prezime, brojsaputnika, datumrodjenja, brojpasosa, imesaputnika, prezimenasaputnika, brojpasosasaputnika, kontakttelefon){
        this.ime=ime
        this.prezime=prezime
        this.brojSaputnika=brojsaputnika
        this.datumRodjenja=datumrodjenja
        this.brojPasosa=brojpasosa
        this.imenaSaputnika=imesaputnika
        this.prezimenaSaputnika=prezimenasaputnika
        this.brojPasosaSaputnika=brojpasosasaputnika
        this.kontaktTelefon=kontakttelefon


    }
    prikaziPodatke(aranzman){
        console.log("//////////////////////////////////")
        console.log(this)
    let host =document.querySelector('.kontejnerMusterija')
    const elementiHosta=['imeMusterije','prezimeMusterije','datumRodjenja','brojPasosa','kontaktTelefon','brojSaputnika']
    const atributimusterije=[this.ime,this.prezime, this.datumRodjenja,this.brojPasosa,this.kontaktTelefon,this.brojSaputnika]

    elementiHosta.forEach((el,index)=>{
        let elhosta=host.querySelector(`.${el}`)
        elhosta.value=atributimusterije[index]

    })
     let strhost=document.querySelector('.kontejnerAtributaBrSaputnika')
     //console.log(strhost)
    aranzman.dodajSaputnike(strhost,this.brojSaputnika)
     for(let k=0;k<this.brojSaputnika;k++){
        
       let  elhosta=host.querySelector(`.saputnik${k+1}`)
         elhosta.querySelector(`.imeSaputnika`).value=this.imenaSaputnika[k]
         elhosta.querySelector(`.prezimeSaputnika`).value=this.prezimenaSaputnika[k]
         elhosta.querySelector(`.brojPasosaSaputnika`).value=this.brojPasosaSaputnika[k]

    }
    let prijavaiprovera=document.querySelectorAll('button')
    prijavaiprovera.forEach(el=>{el.disabled=true})

    

    const odjaviSe=document.createElement('button')
    odjaviSe.innerHTML="Otkazi putovanje"
    host.appendChild(odjaviSe)
    odjaviSe.onclick=(ev)=>{
            this.odjaviSe(aranzman)
        }
    const sacuvajizmene=document.createElement('button')
    sacuvajizmene.innerHTML="Sacuvaj izmene"
    host.appendChild(sacuvajizmene)
    sacuvajizmene.onclick=(ev)=>{
            this.sacuvajizmene(aranzman)
        }
    }
   
    

    odjaviSe(aranzman,izmene=false){
        ///console.log("****************",aranzman)
        const prethodnomusterija=aranzman.musterije.length
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
    }
    }

    sacuvajizmene(aranzman){
        this.odjaviSe(aranzman,true)
        aranzman.prijaviSe()
    }
}