import {vratiTritocke, vratiParametreInterpolacije, randomNormal} from "./interpolacija.js";
import { analogniSat } from "./analogniSat.js";

export class brokenClock {
	constructor({display, xPoc1=0, yPoc1=0, xPoc2=100, nx=1, ny=1, infoKlikSw=false, interpolacijaSw=false, vrijeme=1000, korekcijaCrta=false}) {  // display je div element u koji ubacujes slova, visinaElementa/sirinaElementa zadaju visinu/sirinu pravokutnog div elementa
		// xPoc1/yPoc1 su koordinate gornjeg lijevog kuta u odnosu na lijevi/gornji brid elementa. slicno xPoc2/yPoc2 su 
		// koordinate donjeg desnog kuta, nx/ny zadaju broj kolona/redova pravokutnih elemenata 
		// infoKlikSw za true postavlja click event listenere koji ce ti vracati u konzoli koordinate klika, sto sluzi za postavljanje
		// animationpointsa. za mouse klick sa pritisnutim shiftom se postavlja na display krizic, a ako ne drzis pritisnut shift,
		// samo se vraca koordinata clicka u konzoli. ako pritisnes q, tada se brisu svi krizici sa displaya.
        // za interpolacijuSw true koristimo cubic hermite spline za interpolaciju putanje kroz zadane
        // animacijske pointe, za false koristimo jednostavnu linearnu interpolaciju
        // cini se da interpolacija steka kada animation point dode na 100%, znaci drzi ga manjim od 100, npr. 99.99, bug za ukloniti, takoder ako zasteka, promijeni decimale pocetnog i krajnjeg animation pointa, npr sa 97 na 97.2, i sa 0 na npr. 0.4, ovo vrijedi za cubic spline interpolaciju, u linearnoj interpolaciji nema bugu
		// vrijeme zadaje vrijeme animacije
		// nekada se znaju javiti bijele crte koje nastaju zbog nesavrsenosti browsera kod zaokruzivanja piksela. u tom slucaju
		// poigraj se sa medama xPoc1, xPoc2, yPoc1 i yPoc2. ako su sirina/visina elementa u pikselima iznad 0.5 u prvoj decimali, npr. 15.6 umjesto 15.4, 
		// tada nema linija zato sto kompjuter zaokruzuje na gore velicinu elementa, i onda su elementi za 1px siri, pa ispunjavaju bijele linije
		// korekcijaCrta korigira bijele linije tako da poveca sirinu/visinu elementa za 1px
		
		this.display = display;
		this.height = 100; //this.display.clientHeight;
		this.width = 100; //.display.clientWidth;
		
		this.xPoc1 = xPoc1;
		this.xPoc2 = xPoc2;
		this.yPoc1 = yPoc1;
		this.yPoc2 = display.clientWidth / display.clientHeight * (this.xPoc2-this.xPoc1) + this.yPoc1;
		
		this.slovoHeight = (this.yPoc2-yPoc1)/ny;
		this.slovoWidth = (xPoc2-xPoc1)/nx;
		this.slovoSize = (this.slovoWidth/100 * 0.6);
		this.nx = nx;
		this.ny = ny;
		this.startnaTockaAnimacije = 0;  // mora biti izmedu 0 i 100, realni broj
		this.animacijaStopSw = false;
		this.animacijaSmjer = 1; // 1 ili -1
		this.animacijaChangeDirectionSw = false; // za true mjenja smjer
		this.postotak = 0;  // trenutna vremenska pozicija animacije
		this.animacijaSw = false; // za true je animacija u tijeku, za false se ne odvija
		
		this.vrijeme = vrijeme;
		
		if (korekcijaCrta) {
			let ijX = ((this.xPoc2-this.xPoc1)/100/nx * this.display.clientWidth);
			let ijY = ((this.yPoc2-this.yPoc1)/100/ny * this.display.clientHeight);
			
			this.slovoHeight *= Math.ceil(ijY) / ijY;
			this.slovoWidth *= Math.ceil(ijX) / ijX;
		}
				
		this.dat = new Date();
		this.sati = this.dat.getHours();
		this.minute = this.dat.getMinutes();
		this.sekunde = this.dat.getSeconds();
		this.poljeSatova = [];
		for (let i = 0; i < this.nx * this.ny; i++) {
			let noviSat = new analogniSat({display, sirina:(this.xPoc2-this.xPoc1), timeUpdate:false});
			noviSat.sati = this.sati;
			noviSat.minute = this.minute;
			noviSat.sekunde = this.sekunde;
			noviSat.postaviVrijeme();
			this.poljeSatova.push(noviSat);
		}
		
		this.el = this.poljeSatova[0].sat;
		
		//dodajStilove(this.el, {height: (this.yPoc2-this.yPoc1) + "%", width: (this.xPoc2-this.xPoc1) + "%", padding: "0px", margin: "0px"});
		//display.appendChild(this.el);
		
		this.elVis = this.el.clientHeight;
		this.elSir = this.el.clientWidth;
		
		this.elVis = display.clientHeight * (this.yPoc2-this.yPoc1) /100;
		this.elSir = display.clientWidth * (this.xPoc2-this.xPoc1) /100;
		
		this.poljeSlova = [];
		this.poljeKrizica = [];
        
        this.interpolacijaSw = interpolacijaSw;
        this.poljeParametara = [];  //  polje interpolacijskih parametara za svako slovo
		
		this.pozadinskaBoja = null;
        		
		this.randomSlovo = this.randomSlovo.bind(this);
		this.randomBoja = this.randomBoja.bind(this);
		this.postaviRandomSlovo = this.postaviRandomSlovo.bind(this);
		this.postaviListener = this.postaviListener.bind(this);
		this.postaviSlovo = this.postaviSlovo.bind(this);
		this.iniciraj = this.iniciraj.bind(this);
		this.postaviKrizic = this.postaviKrizic.bind(this);
		this.ukloniKrizice = this.ukloniKrizice.bind(this);
		this.postaviRed = this.postaviRed.bind(this);
        this.postaviRed1 = this.postaviRed1.bind(this);
        this.inicijalizirajPoljeParametara = this.inicijalizirajPoljeParametara.bind(this);
        this.postaviSlovoRandomPath = this.postaviSlovoRandomPath.bind(this);
        this.postaviElement = this.postaviElement.bind(this);
        this.postaviKrajnjeVrijeme = this.postaviKrajnjeVrijeme.bind(this);
        this.pokreniAnimaciju = this.pokreniAnimaciju.bind(this);
        this.zaustaviAnimaciju = this.zaustaviAnimaciju.bind(this);
        this.postaviGumbe = this.postaviGumbe.bind(this);
        this.startStop = this.startStop.bind(this);
        this.forwardBackward = this.forwardBackward.bind(this);
        this.destruct = this.destruct.bind(this);
        this.updejtajPoljeSatova = this.updejtajPoljeSatova.bind(this);
				
		this.postaviGumbe();
		if (infoKlikSw)  this.postaviListener();
		
		setInterval(this.updejtajPoljeSatova, 1000);
		
		this.iniciraj();
	}
	
	updejtajPoljeSatova() {
		this.dat = new Date();
		this.sati = this.dat.getHours();
		this.minute = this.dat.getMinutes();
		this.sekunde = this.dat.getSeconds();
		for (let i = 0; i < this.nx * this.ny; i++) {
			this.poljeSatova[i].sati = this.sati;
			this.poljeSatova[i].minute = this.minute;
			this.poljeSatova[i].sekunde = this.sekunde;
			this.poljeSatova[i].postaviVrijeme();
		}
		
	}
	
	postaviGumbe() {
		this.gumb1 = document.createElement("div");
		this.gumb1.innerHTML = "STOP IT";
		this.gumb1sw = false;
		
		if (this.display.clientWidth < 800) {
		    var sirina = this.display.clientWidth * 0.15;
		} else if (sirina < 1100) {
			var sirina = this.display.clientWidth * 0.11;
		} else {
			var sirina = this.display.clientWidth * 0.09;
		}
		
		let visina = sirina/2;
		
		dodajStilove(this.gumb1, {cursor: "pointer", backgroundColor: "red", height: visina+"px", width: sirina+"px", display: "flex", justifyContent: "center",
			                alignItems: "center", position: "absolute", overflow: "hidden", padding: "0px", margin: "0px",
                            right: "20px", top: "30px", zIndex: "2", borderRadius: "5px", color: "white", fontSize: (sirina*0.15) + "2px"});
        this.display.appendChild(this.gumb1);
        this.gumb1.addEventListener("click", this.startStop);
        
        this.gumb2 = document.createElement("div");
		this.gumb2.innerHTML = "GO BACKWARD";

		this.gumb2sw = false;
		dodajStilove(this.gumb2, {cursor: "pointer", backgroundColor: "red", height: visina+"px", width: sirina+"px", display: "flex", justifyContent: "center",
			                alignItems: "center", position: "absolute", overflow: "hidden", padding: "0px", margin: "0px", textAlign: "center",
                            left: "20px", top: "30px", zIndex: "2", borderRadius: "5px", color: "white", fontSize: (sirina*0.15) + "px"});
        this.display.appendChild(this.gumb2);
        this.gumb2.addEventListener("click", this.forwardBackward);
	}
	
	forwardBackward() {	
		if (this.gumb2sw) {
			this.gumb2sw = false;
			this.gumb2.innerHTML = "GO BACKWARD";
			this.animacijaSmjer = 1;
		} else {
			this.gumb2sw = true;
			this.gumb2.innerHTML = "GO FORWARD";
			this.animacijaSmjer = -1;
		}
					
	}
	
	startStop() {
		if (this.gumb1sw) {
			this.gumb1sw = false;
			this.gumb1.innerHTML = "STOP IT";
			this.pokreniAnimaciju();
		} else {
			this.gumb1sw = true;
			this.gumb1.innerHTML = "START IT";
			this.zaustaviAnimaciju();
		}
	}
    
    inicijalizirajPoljeParametara() {
        
        for (let i = 0; i < this.poljeSlova.length; i++) {
            let podaci = this.poljeSlova[i][1];
            if (podaci.length === 1) {
                this.poljeParametara.push(null);
            } else {
                let xtocke = [];
                let ytocke = [];
                let fitocke = [];
                for (let j = 0; j < podaci.length; j++) {
                    xtocke.push([podaci[j][0], podaci[j][1]]);
                    ytocke.push([podaci[j][0], podaci[j][2]]);
                    fitocke.push([podaci[j][0], podaci[j][3]]);
                }
                let tritocke = vratiTritocke(xtocke);
                let xpar = vratiParametreInterpolacije(tritocke);
                tritocke = vratiTritocke(ytocke);
                let ypar = vratiParametreInterpolacije(tritocke);
                tritocke = vratiTritocke(fitocke);
                let fipar = vratiParametreInterpolacije(tritocke);
                
                //this.poljeParametara.push([xtocke, ytocke, fitocke]);
                this.poljeParametara.push([xpar, ypar, fipar]);
            }
        }
        
    }
	
	iniciraj() {
		
		
		this.postaviElement({xPoc1:this.xPoc1, yPoc1:this.yPoc1, xPoc2:this.xPoc2, yPoc2:this.yPoc2, nx:this.nx, ny:this.ny});
        
        if (this.interpolacijaSw)  this.inicijalizirajPoljeParametara();
        	    	    
	    this.pokreniAnimaciju();
	}
	
	pokreniAnimaciju() {
		let x, y, fi;
		this.animacijaSw = true;
		if (this.startnaTockaAnimacije < 0)  this.startnaTockaAnimacije = 0;
		if (this.startnaTockaAnimacije >= 100)  this.startnaTockaAnimacije = 99.9;
		let time = performance.now();
		requestAnimationWrapper(()=> {
			let time1 = performance.now();
			this.postotak = this.animacijaSmjer * (time1-time)/this.vrijeme*100 + this.startnaTockaAnimacije;
			time = time1;
			this.startnaTockaAnimacije = this.postotak;
			if (this.animacijaStopSw || this.postotak > 101 || this.postotak < 0) {
				this.animacijaStopSw = false;
				this.animacijaSw = false;
				this.gumb1sw = true;
			    this.gumb1.innerHTML = "START IT";
				return false; // prekida animaciju	
			} 
			for (let i = 0; i < this.poljeSlova.length; i++) {
				[x, y, fi] = this.pronadiKoordinate(this.poljeSlova[i][1], this.postotak, i);
				this.pomakniSlovo(this.poljeSlova[i][0], x, y, fi);
			}
			return true;
	    });
	    	    
	    
	}
	
	zaustaviAnimaciju() {
        this.animacijaStopSw = true;
	}
	
	destruct() {
		let du = this.poljeSlova.length;
		for (let i = 0; i < du; i++) {
			let ele = this.poljeSlova[i][0];
			this.display.removeChild(ele);
		}
		this.poljeSlova = [];
		this.display.removeChild(this.gumb1);
		this.display.removeChild(this.gumb2);
	}
	
	postaviElement({xPoc1=0, yPoc1=0, xPoc2=100, yPoc2=100, nx=1, ny=1}) {
		let dx = (xPoc2-xPoc1) / nx;		
		let dy = (yPoc2-yPoc1) / ny;
		
		let pocetakX = xPoc1 + dx/2;
		let pocetakY = yPoc1 + dy/2;
		
		for (let i = 0; i < ny; i++) {
			let koordY = pocetakY + i * dy;
			for (let j = 0; j < nx; j++) {
			    let koordX = pocetakX + j * dx;  
			    let krajnjeVrijeme = this.postaviKrajnjeVrijeme({linearDist:false});
			    //krajnjeVrijeme = 99.7;	
			    this.postaviElementRandomPath(i*nx + j, pocetakX, pocetakY, koordX, koordY, dx, dy, 20, 0.2, krajnjeVrijeme, false);
			}
		}
		
		
	}
	
	postaviKrajnjeVrijeme({pocInt=0, krajInt=100, linearDist=true}) {
		// ova metoda odabire random kranje vrijeme u postotcima. pocInt i krajInt definiraju interval dozvoljenih vrijednosti.
		// za linearDist T koristimo pravokutnu distribuciju (sve vrijednosti na zadanom intervalu su jednako vjerojatne),
		// za false koristimo definirani interval zajedno sa pripadajucim statistickim tezinama. U tom slucaju pocInt i krajInt su ignorirani.
		
		let interval = [0, 45, 55, 65, 70, 90];
		let tezine = [10, 48, 17, 12, 13]; // 10% za 0-45, 48% za 45-55, po 12% za 55-65, 65-70, 18% za 70-90
	
		if (linearDist === true) {
			let rez = (Math.random() * (krajInt-pocInt) + pocInt);
			return rez;
		} else {
			let tezine1 = [];
			let p = 0;
			let norm = tezine.reduce((total, num)=>{ return total + num}, 0);
			for (let i = 0; i < tezine.length; i++) {
				p += tezine[i] / norm;
				tezine1.push(p);
			}
			
			let vri = Math.random();
			let rez = pronadiInterval(vri, tezine1);
			if (rez >= tezine.length)  rez = tezine.length - 1;
			
			return Math.random() * (interval[rez+1] - interval[rez]) + interval[rez];
		}
		
	}
    
    postaviRed1(str, xPoc, y, dx, pStart, pPoc, pKraj) {  // rijeseno
        // str je string, xPoc je x koordinata prvog slova, y je y-koord retka, dx je x-razmak medu
        // slovima, pStart je postotak kada animacija starta, pPoc je vrijeme zavrsetka kretanja prvog
        // slova a pKraj drugog, skala je normalizacijski parametar tako da najveci postotak bude 100
        // ako imamo npr. zadnji animation point na 130, stavi skalu na 130. ne moze biti manja od 100
        let dp = (pKraj-pPoc) / (str.length-1);
        for (let i = 0; i < str.length; i++) {
            let c = str[i];
            this.postaviSlovoRandomPath(c, xPoc + i*dx, y, 20, pStart, (pPoc+dp), false);
        }
    }
	
	postaviRed(str, zajednickiNiz, xPoc, y, fi, dx, pPoc, pKraj) {  // rijeseno
		// str je string koji postavljamo na ekran, xPoc je x-koordinata prvog slova, y je y-koordinata svih slova,
		// dx je razlika u x-koordinatama prvog slova, pPoc je postotak zadnjeg animation pointa za prvo slovo, a pKraj je za zadnje 
		// slovo
		
		let rez = [];
		let dp = (pKraj-pPoc) / (str.length-1);
		for (let i = 0; i < str.length; i++) {
			let c = str[i]
			console.log(c);
			rez = JSON.parse(JSON.stringify(zajednickiNiz));
			rez.push([pPoc + dp*i, xPoc + dx*i, y, fi]);
			this.postaviSlovo(c, rez);
		}
		
	}
	
	pomakniSlovo(el, x, y, fi, boja=null) {  // rijeseno
		dodajStilove(el, {left: (x - this.slovoWidth/2) + "%", top: (y - this.slovoHeight/2) + "%", transform: "rotate(" + fi + "deg)"});
        if (boja !== null)  dodajStilove(el, {color: boja});
	}
	
    postaviElementRandomPath(index, pocX, pocY, konX, konY, dX, dY, duljX, postoPoc, postoKon, bojaSw=true) {  // rijeseno
        // ova funkcija za slovo postavlja random path koristenjem random walka, konX i konY su konacne
        // koordinate slova, duljX je mjera tipicne udaljenosti pocetne i konacne tocke (odreduje skalu)
        // postoPoc/postoKon su pocetni i konacni postotak animacije, znaci odreduju pocetak i kraj gibanja elementa
        // bojaSw za true zadaje random boju elementa
      let n = 5;
      let stdevY = 2/3 * duljX;
      let stdevFi  =  300;
      
      let putanjaUnutraSw = true;  //  za true sve tocke putanje moraju biti unutat dislaya, za false samo krajnje tocke
      
      let rot = null;
      let tocke = [];
      let uvjet = true;
      let ii = 0;
      while (uvjet) {  
        ii++;
        uvjet = false;  
        if (Math.random() < 0.5) {
            rot = 0;
        } else {
            rot = Math.random()*360 - 180;
        }
        
        let dx = duljX / (n-1);
        let drot = rot / (n-1);
        let dposto = (postoKon - postoPoc) / (n-1);
        let posto = postoKon;
        let okret = 0;  // varijabla kuta nagiba slova
        
        tocke = [[posto, konX, konY, okret]];
        let xpoz = 0;
        let ypoz = 0;
        let fi = Math.random()*360;  // jednokratna rotacija
        //fi = 0;
        let fi1 = 0; // spiralna rotacija
        let xpoz1, ypoz1;
        for (let i = 1; i < n; i++) {
            xpoz += dx;
            ypoz += randomNormal(0, stdevY/(n-1)**0.5);
            posto -= dposto;
            fi1 += drot;
            let r = (xpoz**2 + ypoz**2)**0.5;
            if (r < 0.01)  r = 0.01;
            let kut = Math.asin(ypoz/r) + (fi+fi1)/360*2*Math.PI;
            xpoz1 = r * Math.cos(kut);
            ypoz1 = r * Math.sin(kut);
            okret += randomNormal(0, stdevFi/(n-1)**0.5);
            tocke.push([posto, konX + xpoz1, konY + ypoz1, okret]);
            
            if (putanjaUnutraSw && (konX+xpoz1 < this.slovoWidth/2 || konX+xpoz1 > this.width-this.slovoWidth/2 || 
                                    konY + ypoz1 < this.slovoHeight/2 || konY + ypoz1 > this.height-this.slovoHeight/2)) {
                if (ii > 10) {
                    ii = 0;
                    putanjaUnutraSw = false;
                }
                break;
            }
        }
        if (konX+xpoz1 < this.slovoWidth/2 || konX+xpoz1 > this.width-this.slovoWidth/2 || 
            konY + ypoz1 < this.slovoHeight/2 || konY + ypoz1 > this.height-this.slovoHeight/2) {
            uvjet = true;
            if (ii > 10)  uvjet = false;
        }
      } // kraj while(uvjet) petlje  
        tocke.reverse();

		let el = document.createElement("div");
		let x, y, fii;
		[x, y, fii] = this.pronadiKoordinate(tocke, 0);
		dodajStilove(el, {cursor: "default", backgroundColor: this.pozadinskaBoja, height: this.slovoHeight + "%", width: this.slovoWidth + "%", display: "flex",
                          justifyContent: "center", alignItems: "center", position: "absolute", overflow: "hidden", padding: "0px", margin: "0px",
                          left: (x - this.slovoWidth/2) + "%", top: (y - this.slovoHeight/2) + "%", transform: "rotate(" + fii + "deg)"});
        if (bojaSw)  el.style.backgroundColor = this.randomBoja();      
         
        let el1 = this.poljeSatova[index].sat;
        
        dodajStilove(el1, {height: this.elVis + "px", width: this.elSir + "px", position: "absolute", left: (-1 * (konX-pocX) / dX * this.elSir / this.nx) + "px", top: (-1 * (konY-pocY) / dY * this.elVis / this.ny) + "px"});
        el.appendChild(el1);
        
        this.display.appendChild(el);
        this.poljeSlova.push([el, tocke]);
    }
    
    postaviSlovoRandomPath(slovo, konX, konY, duljX, postoPoc, postoKon, bojaSw=true) {  // rijeseno
        // ova funkcija za slovo postavlja random path koristenjem random walka, konX i konY su konacne
        // koordinate slova, duljX je mjera tipicne udaljenosti pocetne i konacne tocke (odreduje skalu)
        // postoPoc/postoKon su pocetni i konacni postotak animacije, znaci odreduju pocetak i kraj gibanja elementa
        // bojaSw za true zadaje random boju elementa
      let n = 5;
      let stdevY = 2/3 * duljX;
      let stdevFi  =  300;
      
      let putanjaUnutraSw = true;  //  za true sve tocke putanje moraju biti unutat dislaya, za false samo kranje tocke
      
      let rot = null;
      let tocke = [];
      let uvjet = true;
      let ii = 0;
      while (uvjet) {  
        ii++;
        uvjet = false;  
        if (Math.random() < 0.5) {
            rot = 0;
        } else {
            rot = Math.random()*360 - 180;
        }
        
        let dx = duljX / (n-1);
        let drot = rot / (n-1);
        let dposto = (postoKon - postoPoc) / (n-1);
        let posto = postoKon;
        let okret = 0;  // varijabla kuta nagiba slova
        
        tocke = [[posto, konX, konY, okret]];
        let xpoz = 0;
        let ypoz = 0;
        let fi = Math.random()*360;  // jednokratna rotacija
        //fi = 0;
        let fi1 = 0; // spiralna rotacija
        let xpoz1, ypoz1;
        for (let i = 1; i < n; i++) {
            xpoz += dx;
            ypoz += randomNormal(0, stdevY/(n-1)**0.5);
            posto -= dposto;
            fi1 += drot;
            let r = (xpoz**2 + ypoz**2)**0.5;
            if (r < 0.01)  r = 0.01;
            let kut = Math.asin(ypoz/r) + (fi+fi1)/360*2*Math.PI;
            xpoz1 = r * Math.cos(kut);
            ypoz1 = r * Math.sin(kut);
            okret += randomNormal(0, stdevFi/(n-1)**0.5);
            tocke.push([posto, konX + xpoz1, konY + ypoz1, okret]);
            
            if (putanjaUnutraSw && (konX+xpoz1 < this.slovoWidth/2 || konX+xpoz1 > this.width-this.slovoWidth/2 || 
                                    konY + ypoz1 < this.slovoHeight/2 || konY + ypoz1 > this.height-this.slovoHeight/2)) {
                if (ii > 10) {
                    ii = 0;
                    putanjaUnutraSw = false;
                }
                break;
            }
        }
        if (konX+xpoz1 < this.slovoWidth/2 || konX+xpoz1 > this.width-this.slovoWidth/2 || 
            konY + ypoz1 < this.slovoHeight/2 || konY + ypoz1 > this.height-this.slovoHeight/2) {
            uvjet = true;
            //console.log("k " + (konX+xpoz1) + ", " + (konY+ypoz1) + " - " + this.display.style.width + ", " + this.display.style.height);
            if (ii > 10)  uvjet = false;
        }
      } // kraj while(uvjet) petlje  
        tocke.reverse();

		let el = document.createElement("div");
		let x, y, fii;
		[x, y, fii] = this.pronadiKoordinate(tocke, 0);
		dodajStilove(el, {cursor: "default", height: this.slovoHeight + "%", width: this.slovoWidth + "%", display: "flex",
                          justifyContent: "center", alignItems: "center", fontSize: this.slovoSize, color: "yellow", position: "absolute",
                          left: (x - this.slovoWidth/2) + "%", top: (y - this.slovoHeight/2) + "%", transform: "rotate(" + fii + "deg)"});
        el.innerHTML = slovo;
        if (bojaSw)  el.style.backgroundColor = this.randomBoja();
        el.classList.add("slovo1");
        this.display.appendChild(el);
        
        this.poljeSlova.push([el, tocke]);
    }
	
	postaviSlovo(slovo, kord, bojaSw=true) {  // rijeseno koord je polje niza koordinata oblika [p, x, y, fi] gdje je p postotak izvrsene animacije
		let el = document.createElement("div");
		let x, y, fi;
		[x, y, fi] = this.pronadiKoordinate(kord, 0);
		dodajStilove(el, {cursor: "default", backgroundColor: this.pozadinskaBoja, height: this.slovoHeight + "%", width: this.slovoWidth + "%", display: "flex",
                          justifyContent: "center", alignItems: "center", fontSize: this.slovoSize + "px", color: "yellow", position: "absolute",
                          left: (x - this.slovoWidth/2) + "px", top: (y - this.slovoHeight/2) + "px", transform: "rotate(" + fi + "deg)"});
        el.innerHTML = slovo;
        if (bojaSw)  el.style.backgroundColor = this.randomBoja();
        el.classList.add("slovo1");
        this.display.appendChild(el);
        
        let kk = [];
        for (let i = 0; i < kord.length; i++) {
			kk.push([...kord[i]]);
		}
        
        this.poljeSlova.push([el, kk]);
	}
	
	pronadiKoordinate(kord, postotak, tockaBr) {  // rijeseno   ova pomocna funkcija uzima postotak trenutne animacije i vraca koordinate x, y, fi 
		// za slovo sa koordinatskim poljem kord. koristi binarno pretrazivanje polja
		let len = kord.length;
		if (len === 1) {
			return kord[0].slice(1);
		}
		
		let tp1 = 0;
		let tp2 = len-1;
		if (kord[tp1][0] >= postotak) {
			return kord[0].slice(1);
		} else if (kord[tp2][0] <= postotak) {
			return kord[tp2].slice(1);
		}
		
		let tp = null;
		while (tp2-tp1 > 1) {
			//tp = (tp1+tp2)/2;
            tp = Math.floor((tp1+tp2)/2);
			if (kord[tp][0] >= postotak) {
				tp2 = tp;
			} else {
				tp1 = tp;
			}
		}
		
		let x1, x2, y1, y2, p1, p2, fi1, fi2;
		[p1, x1, y1, fi1] = kord[tp1];
		[p2, x2, y2, fi2] = kord[tp2];
		
        if (this.interpolacijaSw) {  // za true koristi interpolaciju tocaka
            let a, b, c, d;
            [a, b, c, d]  =  this.poljeParametara[tockaBr][0][tp2-1];
            let x = a*postotak**3 + b*postotak**2 + c*postotak + d; 
            [a, b, c, d]  =  this.poljeParametara[tockaBr][1][tp2-1];
            let y = a*postotak**3 + b*postotak**2 + c*postotak + d; 
            [a, b, c, d]  =  this.poljeParametara[tockaBr][2][tp2-1];
            let fi = a*postotak**3 + b*postotak**2 + c*postotak + d; 
            return [x, y, fi];
        } 
		return [(x2-x1)/(p2-p1)*(postotak-p1)+x1, (y2-y1)/(p2-p1)*(postotak-p1)+y1, (fi2-fi1)/(p2-p1)*(postotak-p1)+fi1];
	}
	
	postaviRandomSlovo(slovoSw=true, bojaSw=true) {  // rijeseno
		// za slovoSw t postavlja random slovo, za vojaSw t postavlja random boju
		let x = Math.floor(Math.random()*(this.width-this.slovoWidth) ) + this.slovoWidth/2;
		let y = Math.floor(Math.random()*(this.height-this.slovoHeight) ) + this.slovoHeight/2;
		let fi = Math.floor(Math.random()*360);
		
		let el = document.createElement("div");
		dodajStilove(el, {cursor: "default", backgroundColor: this.pozadinskaBoja, height: this.slovoHeight + "%", width: this.slovoWidth + "%", display: "flex",
                          justifyContent: "center", alignItems: "center", fontSize: this.slovoSize, color: "yellow", position: "absolute",
                          left: (x - this.slovoWidth/2) + "%", top: (y - this.slovoHeight/2) + "%", transform: "rotate(" + fi + "deg)"});
        if (slovoSw)  el.innerHTML = this.randomSlovo({});
        if (bojaSw)  el.style.backgroundColor = this.randomBoja();
        el.classList.add("slovo1");
        this.display.appendChild(el);
        this.poljeSlova.push([el, [[0, x, y, fi]]]);
	}
	
	randomSlovo({malaSw=false}) {  // za malaSw true generira i mala slova
		let slova = "ABCČĆDĐEFGHIJKLMNOPRSŠTUVYŽXYQ";
		if (malaSw)  slova += "abcčćdđefghijklmnoprsštuvzžxyq";
		return slova[Math.floor(Math.random()*slova.length)];
	}
	
	randomBoja() {
		let slova = "0123456789abcdef";
		let rez = "#";
		for (let i = 0; i < 6; i++) {
			rez += slova[Math.floor(Math.random()*slova.length)];
		}
		return rez;
	}
	
	postaviKrizic(x, y) {
		var radius = 10;
		let el = document.createElement("div");
		dodajStilove(el, {cursor: "default", backgroundColor: "yellow", height: 2*radius + "px", width: 2*radius + "px", display: "flex",
                          justifyContent: "center", alignItems: "center", position: "absolute", borderRadius: "50%", 
                          left: (x - radius) + "px", top: (y - radius) + "px"});
        let el1 = document.createElement("div");
        dodajStilove(el1, {cursor: "default", backgroundColor: "green", height: "15%", width: "100%", position: "absolute", 
			               left: "0%", top: "42.5%"});
	    el.appendChild(el1);
	    el1 = document.createElement("div");
        dodajStilove(el1, {cursor: "default", backgroundColor: "green", width: "15%", height: "100%", position: "absolute", 
			               left: "42.5%", top: "0%"});
	    el.appendChild(el1);
	    
	    el.addEventListener("mouseenter", this.hoverFun);
        
        this.display.appendChild(el);
        this.poljeKrizica.push(el);
	}
	
	ukloniKrizice() {
		for (let i = this.poljeKrizica.length-1; i > -1; i--) {
			let el = this.poljeKrizica[i];
			el.removeEventListener("mouseenter", this.hoverFun);
			this.display.removeChild(el);
			this.poljeKrizica.splice(i, 1);
		}
	}
	
	hoverFun(e) {
		let radius = parseFloat(e.target.style.height)/2;
		let x = parseFloat(e.target.style.left) + radius;
		let y = parseFloat(e.target.style.top) + radius;
		console.log("Ovaj krizic je postavljen na koordinatu " + x + ", " + y);
	}
	
	postaviListener() {
		this.display.addEventListener("click", fun);
		document.addEventListener("keydown", pritisakGumba);
		var that = this;
		
		function pritisakGumba(e) {
			if (e.code === "KeyQ")  that.ukloniKrizice();
		}
		
		function fun(e) {
			if (e.target.classList.contains("slovo1")) {
				var x = (parseInt(e.target.style.left) + e.offsetX);
				var y = (parseInt(e.target.style.top) + e.offsetY);
			    console.log("Koordinata klika je " + x + ", " + y);
			} else {
				var x = e.offsetX;
				var y = e.offsetY;
				console.log("Koordinata klika je " + x + ", " + y);
			}
			if (e.shiftKey)  that.postaviKrizic(x, y);
		} 
	}
}

export class brokenElement {
	constructor({display, slikaUrl, xPoc1=0, yPoc1=0, xPoc2=100, yPoc2=100, nx=1, ny=1, infoKlikSw=false, interpolacijaSw=false, vrijeme=1000, 
		         prekidac=1, korekcijaCrta=false}) {  // display je div element u koji ubacujes slova, visinaElementa/sirinaElementa zadaju visinu/sirinu pravokutnog div elementa
		// xPoc1/yPoc1 su koordinate gornjeg lijevog kuta u odnosu na lijevi/gornji brid elementa. slicno xPoc2/yPoc2 su 
		// koordinate donjeg desnog kuta, nx/ny zadaju broj kolona/redova pravokutnih elemenata 
		// infoKlikSw za true postavlja click event listenere koji ce ti vracati u konzoli koordinate klika, sto sluzi za postavljanje
		// animationpointsa. za mouse klick sa pritisnutim shiftom se postavlja na display krizic, a ako ne drzis pritisnut shift,
		// samo se vraca koordinata clicka u konzoli. ako pritisnes q, tada se brisu svi krizici sa displaya.
        // za interpolacijuSw true koristimo cubic hermite spline za interpolaciju putanje kroz zadane
        // animacijske pointe, za false koristimo jednostavnu linearnu interpolaciju
        // cini se da interpolacija steka kada animation point dode na 100%, znaci drzi ga manjim od 100, npr. 99.99, bug za ukloniti, takoder ako zasteka, promijeni decimale pocetnog i krajnjeg animation pointa, npr sa 97 na 97.2, i sa 0 na npr. 0.4, ovo vrijedi za cubic spline interpolaciju, u linearnoj interpolaciji nema bugu
		// slikaUrl je path filea slike. vrijeme zadaje duljinu animacije u msec, prekidac za 1 daje animaciju slovima, za 2 slike
		// nekada se znaju javiti bijele crte u krajnjoj slici koje nastaju zbog nesavrsenosti browsera kod zaokruzivanja piksela. u tom slucaju
		// poigraj se sa medama xPoc1, xPoc2, yPoc1 i yPoc2. problem je u zaokruzivanju sirine/visine elementa i startne pozicije. npr. kada je sirina 15.36, browser ga zaokruzi na 15,
		// i onda ce otprilike svaki treci red pocinjati 1px prekasno i nastaju linije. to mozes rijesiti tako da povecas/smanjis broj redova/stupaca tako da sirina/visina budu iznad 15.5, npr 15.6px umjesto 15.4px, i onda browser zaokruzuje na 16, elementi su malo siri i preklapaju se i ispunjavaju bijele linije
		// opcija korekcijaCrta za true ispravlja bijele crte nastale zbog zaokruzivanja piksela tako da povecava sirinu i visinu elemenata za 1px
		
		this.display = display;
		this.height = 100; //this.display.clientHeight;
		this.width = 100; //.display.clientWidth;
		this.slovoHeight = (yPoc2-yPoc1)/ny;
		this.slovoWidth = (xPoc2-xPoc1)/nx;

        if (korekcijaCrta) {
			let ijX = ((xPoc2-xPoc1)/100/nx * this.display.clientWidth);
			let ijY = ((yPoc2-yPoc1)/100/ny * this.display.clientHeight);
			
			this.slovoHeight *= Math.ceil(ijY) / ijY;
			this.slovoWidth *= Math.ceil(ijX) / ijX;
		}

		this.slovoSize = (this.slovoWidth/100 * 0.6);
		this.xPoc1 = xPoc1;
		this.xPoc2 = xPoc2;
		this.yPoc1 = yPoc1;
		this.yPoc2 = yPoc2;
		this.nx = nx;
		this.ny = ny;
		this.el = document.createElement("img");
		this.el.src = slikaUrl;
		dodajStilove(this.el, {height: (this.yPoc2-this.yPoc1) + "%", width: (this.xPoc2-this.xPoc1) + "%", padding: "0px", margin: "0px"});
		//display.appendChild(this.el);
		
		this.elVis = this.el.clientHeight;
		this.elSir = this.el.clientWidth;
		this.vrijeme = vrijeme;
		this.prekidac = prekidac;
				
		this.elVis = display.clientHeight * (this.yPoc2-this.yPoc1) /100;
		this.elSir = display.clientWidth * (this.xPoc2-this.xPoc1) /100;
		
		this.poljeSlova = [];
		this.poljeKrizica = [];
        
        this.interpolacijaSw = interpolacijaSw;
        this.poljeParametara = [];  //  polje interpolacijskih parametara za svako slovo
		
		this.pozadinskaBoja = null;
        		
		this.randomSlovo = this.randomSlovo.bind(this);
		this.randomBoja = this.randomBoja.bind(this);
		this.postaviRandomSlovo = this.postaviRandomSlovo.bind(this);
		this.postaviListener = this.postaviListener.bind(this);
		this.postaviSlovo = this.postaviSlovo.bind(this);
		this.iniciraj = this.iniciraj.bind(this);
		this.postaviKrizic = this.postaviKrizic.bind(this);
		this.ukloniKrizice = this.ukloniKrizice.bind(this);
		this.postaviRed = this.postaviRed.bind(this);
        this.postaviRed1 = this.postaviRed1.bind(this);
        this.inicijalizirajPoljeParametara = this.inicijalizirajPoljeParametara.bind(this);
        this.postaviSlovoRandomPath = this.postaviSlovoRandomPath.bind(this);
        this.postaviElement = this.postaviElement.bind(this);
        this.postaviKrajnjeVrijeme = this.postaviKrajnjeVrijeme.bind(this);
        this.destruct = this.destruct.bind(this);
		
		if (infoKlikSw)  this.postaviListener();
		
		this.iniciraj();
	}
    
    inicijalizirajPoljeParametara() {
        
        for (let i = 0; i < this.poljeSlova.length; i++) {
            let podaci = this.poljeSlova[i][1];
            if (podaci.length === 1) {
                this.poljeParametara.push(null);
            } else {
                let xtocke = [];
                let ytocke = [];
                let fitocke = [];
                for (let j = 0; j < podaci.length; j++) {
                    xtocke.push([podaci[j][0], podaci[j][1]]);
                    ytocke.push([podaci[j][0], podaci[j][2]]);
                    fitocke.push([podaci[j][0], podaci[j][3]]);
                }
                let tritocke = vratiTritocke(xtocke);
                let xpar = vratiParametreInterpolacije(tritocke);
                tritocke = vratiTritocke(ytocke);
                let ypar = vratiParametreInterpolacije(tritocke);
                tritocke = vratiTritocke(fitocke);
                let fipar = vratiParametreInterpolacije(tritocke);
                
                //this.poljeParametara.push([xtocke, ytocke, fitocke]);
                this.poljeParametara.push([xpar, ypar, fipar]);
            }
        }
        
    }
	
	iniciraj() {
		
		if (this.prekidac === 2) {
		    this.postaviElement({xPoc1:this.xPoc1, yPoc1:this.yPoc1, xPoc2:this.xPoc2, yPoc2:this.yPoc2, nx:this.nx, ny:this.ny});
		}
		
        		                
        if (this.prekidac === 1) {
          let norm = 1.16;
          
          let sirina = this.display.clientWidth;
		  this.slovoWidth = 2.1;
		  this.slovoHeight = sirina / this.display.clientHeight * this.slovoWidth;
		  
		  this.slovoSize = (sirina * this.slovoWidth/100 * 1.3);
		  //this.slovoSize = (this.display.clientHeight * this.slovoHeight/100 * 1.5);
		           
          this.postaviRed1("From Chaos to order!", 20, 20, this.slovoWidth, 0/norm, 10/norm, 10/norm);
          this.postaviRed1("Second law of termodynamics", 20, 28, this.slovoWidth, 30/norm, 45/norm, 45/norm);
          this.postaviRed1("does not apply if...", 20, 36, this.slovoWidth, 30/norm, 45/norm, 45/norm);
          this.postaviRed1("you control arrow of time", 20, 44, this.slovoWidth, 65/norm, 80/norm, 80/norm);
          this.postaviRed1("or ...", 20, 52, this.slovoWidth, 65, 80, 80, 115);
          this.postaviRed1("reversed javascript animations!", 20, 60, this.slovoWidth, 100/norm, 115/norm, 115/norm);
        }
        
        if (this.interpolacijaSw)  this.inicijalizirajPoljeParametara();
        
        let x, y, fi;
        	    
	    if (true) {
			let time = performance.now();
			requestAnimationWrapper(()=> {
				let time1 = performance.now();
			    let postotak = (time1-time)/this.vrijeme*100;
			    if (postotak > 101) {
					//if (this.korekcijaCrta)  this.display.appendChild(this.el)
					return false; // prekida animaciju
				}
			    for (let i = 0; i < this.poljeSlova.length; i++) {
				    [x, y, fi] = this.pronadiKoordinate(this.poljeSlova[i][1], postotak, i);
				    this.pomakniSlovo(this.poljeSlova[i][0], x, y, fi);
			    }
			    return true;
			});
			
		}  // if true/false prekidac
	    
	    
	    
        
	}
	
	destruct() {
		let du = this.poljeSlova.length;
		for (let i = 0; i < du; i++) {
			let ele = this.poljeSlova[i][0];
			this.display.removeChild(ele);
		}
		this.poljeSlova = [];
	}
	
	postaviElement({xPoc1=0, yPoc1=0, xPoc2=100, yPoc2=100, nx=1, ny=1}) {
		let dx = (xPoc2-xPoc1) / nx;		
		let dy = (yPoc2-yPoc1) / ny;
		
		let pocetakX = xPoc1 + dx/2;
		let pocetakY = yPoc1 + dy/2;
		
		for (let i = 0; i < ny; i++) {
			let koordY = pocetakY + i * dy;
					
			for (let j = 0; j < nx; j++) {
			    let koordX = pocetakX + j * dx;  
			    let krajnjeVrijeme = this.postaviKrajnjeVrijeme({linearDist:false});
			    //krajnjeVrijeme = 99.7;	
			    this.postaviElementRandomPath(pocetakX, pocetakY, koordX, koordY, dx, dy, 20, 0.2, krajnjeVrijeme, true);
			}
		}
		
		
	}
	
	postaviKrajnjeVrijeme({pocInt=0, krajInt=100, linearDist=true}) {
		// ova metoda odabire random kranje vrijeme u postotcima. pocInt i krajInt definiraju interval dozvoljenih vrijednosti.
		// za linearDist T koristimo pravokutnu distribuciju (sve vrijednosti na zadanom intervalu su jednako vjerojatne),
		// za false koristimo definirani interval zajedno sa pripadajucim statistickim tezinama. U tom slucaju pocInt i krajInt su ignorirani.
		
		let interval = [0, 45, 55, 65, 70, 90];
		let tezine = [10, 48, 17, 12, 13]; // 10% za 0-45, 48% za 45-55, po 12% za 55-65, 65-70, 18% za 70-90
		

		
		if (linearDist === true) {
			let rez = (Math.random() * (krajInt-pocInt) + pocInt);
			return rez;
		} else {
			let tezine1 = [];
			let p = 0;
			let norm = tezine.reduce((total, num)=>{ return total + num}, 0);
			for (let i = 0; i < tezine.length; i++) {
				p += tezine[i] / norm;
				tezine1.push(p);
			}
			
			let vri = Math.random();
			let rez = pronadiInterval(vri, tezine1);
			if (rez >= tezine.length)  rez = tezine.length - 1;
			
			return Math.random() * (interval[rez+1] - interval[rez]) + interval[rez];
		}
		
	}
    
    postaviRed1(str, xPoc, y, dx, pStart, pPoc, pKraj) {  // rijeseno
        // str je string, xPoc je x koordinata prvog slova, y je y-koord retka, dx je x-razmak medu
        // slovima, pStart je postotak kada animacija starta, pPoc je vrijeme zavrsetka kretanja prvog
        // slova a pKraj drugog, skala je normalizacijski parametar tako da najveci postotak bude 100
        // ako imamo npr. zadnji animation point na 130, stavi skalu na 130. ne moze biti manja od 100
        let dp = (pKraj-pPoc) / (str.length-1);
        for (let i = 0; i < str.length; i++) {
            let c = str[i];
            this.postaviSlovoRandomPath(c, xPoc + i*dx, y, 20, pStart, (pPoc+dp), false);
        }
    }
	
	postaviRed(str, zajednickiNiz, xPoc, y, fi, dx, pPoc, pKraj) {  // rijeseno
		// str je string koji postavljamo na ekran, xPoc je x-koordinata prvog slova, y je y-koordinata svih slova,
		// dx je razlika u x-koordinatama prvog slova, pPoc je postotak zadnjeg animation pointa za prvo slovo, a pKraj je za zadnje 
		// slovo
		
		let rez = [];
		let dp = (pKraj-pPoc) / (str.length-1);
		for (let i = 0; i < str.length; i++) {
			let c = str[i]
			console.log(c);
			rez = JSON.parse(JSON.stringify(zajednickiNiz));
			rez.push([pPoc + dp*i, xPoc + dx*i, y, fi]);
			this.postaviSlovo(c, rez);
		}
		
	}
	
	pomakniSlovo(el, x, y, fi, boja=null) {  // rijeseno
		dodajStilove(el, {left: (x - this.slovoWidth/2) + "%", top: (y - this.slovoHeight/2) + "%", transform: "rotate(" + fi + "deg)"});
        if (boja !== null)  dodajStilove(el, {color: boja});
	}
	
    postaviElementRandomPath(pocX, pocY, konX, konY, dX, dY, duljX, postoPoc, postoKon, bojaSw=true) {  // rijeseno
        // ova funkcija za slovo postavlja random path koristenjem random walka, konX i konY su konacne
        // koordinate slova, duljX je mjera tipicne udaljenosti pocetne i konacne tocke (odreduje skalu)
        // postoPoc/postoKon su pocetni i konacni postotak animacije, znaci odreduju pocetak i kraj gibanja elementa
        // bojaSw za true zadaje random boju elementa
      let n = 5;
      let stdevY = 2/3 * duljX;
      let stdevFi  =  300;
      
      let putanjaUnutraSw = true;  //  za true sve tocke putanje moraju biti unutat dislaya, za false samo kranje tocke
      
      let rot = null;
      let tocke = [];
      let uvjet = true;
      let ii = 0;
      while (uvjet) {  
        ii++;
        uvjet = false;  
        if (Math.random() < 0.5) {
            rot = 0;
        } else {
            rot = Math.random()*360 - 180;
        }
        
        let dx = duljX / (n-1);
        let drot = rot / (n-1);
        let dposto = (postoKon - postoPoc) / (n-1);
        let posto = postoKon;
        let okret = 0;  // varijabla kuta nagiba slova
        
        tocke = [[posto, konX, konY, okret]];
        let xpoz = 0;
        let ypoz = 0;
        let fi = Math.random()*360;  // jednokratna rotacija
        //fi = 0;
        let fi1 = 0; // spiralna rotacija
        let xpoz1, ypoz1;
        for (let i = 1; i < n; i++) {
            xpoz += dx;
            ypoz += randomNormal(0, stdevY/(n-1)**0.5);
            posto -= dposto;
            fi1 += drot;
            let r = (xpoz**2 + ypoz**2)**0.5;
            if (r < 0.01)  r = 0.01;
            let kut = Math.asin(ypoz/r) + (fi+fi1)/360*2*Math.PI;
            xpoz1 = r * Math.cos(kut);
            ypoz1 = r * Math.sin(kut);
            okret += randomNormal(0, stdevFi/(n-1)**0.5);
            tocke.push([posto, konX + xpoz1, konY + ypoz1, okret]);
            
            if (putanjaUnutraSw && (konX+xpoz1 < this.slovoWidth/2 || konX+xpoz1 > this.width-this.slovoWidth/2 || 
                                    konY + ypoz1 < this.slovoHeight/2 || konY + ypoz1 > this.height-this.slovoHeight/2)) {
                if (ii > 10) {
                    ii = 0;
                    putanjaUnutraSw = false;
                }
                break;
            }
        }
        if (konX+xpoz1 < this.slovoWidth/2 || konX+xpoz1 > this.width-this.slovoWidth/2 || 
            konY + ypoz1 < this.slovoHeight/2 || konY + ypoz1 > this.height-this.slovoHeight/2) {
            uvjet = true;
            if (ii > 10)  uvjet = false;
        }
      } // kraj while(uvjet) petlje  
        tocke.reverse();

		let el = document.createElement("div");
		let x, y, fii;
		[x, y, fii] = this.pronadiKoordinate(tocke, 0);
		dodajStilove(el, {cursor: "default", backgroundColor: this.pozadinskaBoja, height: this.slovoHeight + "%", width: this.slovoWidth + "%", display: "flex",
                          justifyContent: "center", alignItems: "center", position: "absolute", overflow: "hidden", padding: "0px", margin: "0px",
                          left: (x - this.slovoWidth/2) + "%", top: (y - this.slovoHeight/2) + "%", transform: "rotate(" + fii + "deg)"});
        if (bojaSw)  el.style.backgroundColor = this.randomBoja();      
         
        let el1 = this.el.cloneNode(true);
        dodajStilove(el1, {height: this.elVis + "px", width: this.elSir + "px", position: "absolute", left: (-1 * (konX-pocX) / dX * this.elSir / this.nx) + "px", top: (-1 * (konY-pocY) / dY * this.elVis / this.ny) + "px"});
        el.appendChild(el1);
        
        this.display.appendChild(el);
        this.poljeSlova.push([el, tocke]);
    }
    
    postaviSlovoRandomPath(slovo, konX, konY, duljX, postoPoc, postoKon, bojaSw=true) {  // rijeseno
        // ova funkcija za slovo postavlja random path koristenjem random walka, konX i konY su konacne
        // koordinate slova, duljX je mjera tipicne udaljenosti pocetne i konacne tocke (odreduje skalu)
        // postoPoc/postoKon su pocetni i konacni postotak animacije, znaci odreduju pocetak i kraj gibanja elementa
        // bojaSw za true zadaje random boju elementa
      let n = 5;
      let stdevY = 2/3 * duljX;
      let stdevFi  =  300;
      
      let putanjaUnutraSw = true;  //  za true sve tocke putanje moraju biti unutat dislaya, za false samo kranje tocke
      
      let rot = null;
      let tocke = [];
      let uvjet = true;
      let ii = 0;
      while (uvjet) {  
        ii++;
        uvjet = false;  
        if (Math.random() < 0.5) {
            rot = 0;
        } else {
            rot = Math.random()*360 - 180;
        }
        
        let dx = duljX / (n-1);
        let drot = rot / (n-1);
        let dposto = (postoKon - postoPoc) / (n-1);
        let posto = postoKon;
        let okret = 0;  // varijabla kuta nagiba slova
        
        tocke = [[posto, konX, konY, okret]];
        let xpoz = 0;
        let ypoz = 0;
        let fi = Math.random()*360;  // jednokratna rotacija
        //fi = 0;
        let fi1 = 0; // spiralna rotacija
        let xpoz1, ypoz1;
        for (let i = 1; i < n; i++) {
            xpoz += dx;
            ypoz += randomNormal(0, stdevY/(n-1)**0.5);
            posto -= dposto;
            fi1 += drot;
            let r = (xpoz**2 + ypoz**2)**0.5;
            if (r < 0.01)  r = 0.01;
            let kut = Math.asin(ypoz/r) + (fi+fi1)/360*2*Math.PI;
            xpoz1 = r * Math.cos(kut);
            ypoz1 = r * Math.sin(kut);
            okret += randomNormal(0, stdevFi/(n-1)**0.5);
            tocke.push([posto, konX + xpoz1, konY + ypoz1, okret]);
            
            if (putanjaUnutraSw && (konX+xpoz1 < this.slovoWidth/2 || konX+xpoz1 > this.width-this.slovoWidth/2 || 
                                    konY + ypoz1 < this.slovoHeight/2 || konY + ypoz1 > this.height-this.slovoHeight/2)) {
                if (ii > 10) {
                    ii = 0;
                    putanjaUnutraSw = false;
                }
                break;
            }
        }
        if (konX+xpoz1 < this.slovoWidth/2 || konX+xpoz1 > this.width-this.slovoWidth/2 || 
            konY + ypoz1 < this.slovoHeight/2 || konY + ypoz1 > this.height-this.slovoHeight/2) {
            uvjet = true;
            if (ii > 10)  uvjet = false;
        }
      } // kraj while(uvjet) petlje  
        tocke.reverse();

		let el = document.createElement("div");
		let x, y, fii;
		[x, y, fii] = this.pronadiKoordinate(tocke, 0);
		dodajStilove(el, {cursor: "default", height: this.slovoHeight + "%", width: this.slovoWidth + "%", display: "flex",
                          justifyContent: "center", alignItems: "center", fontSize: this.slovoSize + "px", color: "#444", position: "absolute",
                          left: (x - this.slovoWidth/2) + "%", top: (y - this.slovoHeight/2) + "%", transform: "rotate(" + fii + "deg)"});
        el.innerHTML = slovo;
        if (bojaSw)  el.style.backgroundColor = this.randomBoja();
        //el.classList.add("slovo1");
        this.display.appendChild(el);
        
        this.poljeSlova.push([el, tocke]);
    }
	
	postaviSlovo(slovo, kord, bojaSw=true) {  // rijeseno koord je polje niza koordinata oblika [p, x, y, fi] gdje je p postotak izvrsene animacije
		let el = document.createElement("div");
		let x, y, fi;
		[x, y, fi] = this.pronadiKoordinate(kord, 0);
		dodajStilove(el, {cursor: "default", backgroundColor: this.pozadinskaBoja, height: this.slovoHeight + "%", width: this.slovoWidth + "%", display: "flex",
                          justifyContent: "center", alignItems: "center", fontSize: this.slovoSize + "px", color: "yellow", position: "absolute",
                          left: (x - this.slovoWidth/2) + "px", top: (y - this.slovoHeight/2) + "px", transform: "rotate(" + fi + "deg)"});
        el.innerHTML = slovo;
        if (bojaSw)  el.style.backgroundColor = this.randomBoja();
        el.classList.add("slovo1");
        this.display.appendChild(el);
        
        let kk = [];
        for (let i = 0; i < kord.length; i++) {
			kk.push([...kord[i]]);
		}
        
        this.poljeSlova.push([el, kk]);
	}
	
	pronadiKoordinate(kord, postotak, tockaBr) {  // rijeseno   ova pomocna funkcija uzima postotak trenutne animacije i vraca koordinate x, y, fi 
		// za slovo sa koordinatskim poljem kord. koristi binarno pretrazivanje polja
		let len = kord.length;
		if (len === 1) {
			return kord[0].slice(1);
		}
		
		let tp1 = 0;
		let tp2 = len-1;
		if (kord[tp1][0] >= postotak) {
			return kord[0].slice(1);
		} else if (kord[tp2][0] <= postotak) {
			return kord[tp2].slice(1);
		}
		
		let tp = null;
		while (tp2-tp1 > 1) {
			//tp = (tp1+tp2)/2;
            tp = Math.floor((tp1+tp2)/2);
			if (kord[tp][0] >= postotak) {
				tp2 = tp;
			} else {
				tp1 = tp;
			}
		}
		
		let x1, x2, y1, y2, p1, p2, fi1, fi2;
		[p1, x1, y1, fi1] = kord[tp1];
		[p2, x2, y2, fi2] = kord[tp2];
		
        if (this.interpolacijaSw) {  // za true koristi interpolaciju tocaka
            let a, b, c, d;
            [a, b, c, d]  =  this.poljeParametara[tockaBr][0][tp2-1];
            let x = a*postotak**3 + b*postotak**2 + c*postotak + d; 
            [a, b, c, d]  =  this.poljeParametara[tockaBr][1][tp2-1];
            let y = a*postotak**3 + b*postotak**2 + c*postotak + d; 
            [a, b, c, d]  =  this.poljeParametara[tockaBr][2][tp2-1];
            let fi = a*postotak**3 + b*postotak**2 + c*postotak + d; 
            return [x, y, fi];
        } 
		return [(x2-x1)/(p2-p1)*(postotak-p1)+x1, (y2-y1)/(p2-p1)*(postotak-p1)+y1, (fi2-fi1)/(p2-p1)*(postotak-p1)+fi1];
	}
		
	postaviRandomSlovo(slovoSw=true, bojaSw=true) {  // rijeseno
		// za slovoSw t postavlja random slovo, za vojaSw t postavlja random boju
		let x = Math.floor(Math.random()*(this.width-this.slovoWidth) ) + this.slovoWidth/2;
		let y = Math.floor(Math.random()*(this.height-this.slovoHeight) ) + this.slovoHeight/2;
		let fi = Math.floor(Math.random()*360);
		
		let el = document.createElement("div");
		dodajStilove(el, {cursor: "default", backgroundColor: this.pozadinskaBoja, height: this.slovoHeight + "%", width: this.slovoWidth + "%", display: "flex",
                          justifyContent: "center", alignItems: "center", fontSize: this.slovoSize, color: "yellow", position: "absolute",
                          left: (x - this.slovoWidth/2) + "%", top: (y - this.slovoHeight/2) + "%", transform: "rotate(" + fi + "deg)"});
        if (slovoSw)  el.innerHTML = this.randomSlovo({});
        if (bojaSw)  el.style.backgroundColor = this.randomBoja();
        el.classList.add("slovo1");
        this.display.appendChild(el);
        this.poljeSlova.push([el, [[0, x, y, fi]]]);
	}
	
	randomSlovo({malaSw=false}) {  // za malaSw true generira i mala slova
		let slova = "ABCČĆDĐEFGHIJKLMNOPRSŠTUVYŽXYQ";
		if (malaSw)  slova += "abcčćdđefghijklmnoprsštuvzžxyq";
		return slova[Math.floor(Math.random()*slova.length)];
	}
	
	randomBoja() {
		let slova = "0123456789abcdef";
		let rez = "#";
		for (let i = 0; i < 6; i++) {
			rez += slova[Math.floor(Math.random()*slova.length)];
		}
		return rez;
	}
	
	postaviKrizic(x, y) {
		var radius = 10;
		let el = document.createElement("div");
		dodajStilove(el, {cursor: "default", backgroundColor: "yellow", height: 2*radius + "px", width: 2*radius + "px", display: "flex",
                          justifyContent: "center", alignItems: "center", position: "absolute", borderRadius: "50%", 
                          left: (x - radius) + "px", top: (y - radius) + "px"});
        let el1 = document.createElement("div");
        dodajStilove(el1, {cursor: "default", backgroundColor: "green", height: "15%", width: "100%", position: "absolute", 
			               left: "0%", top: "42.5%"});
	    el.appendChild(el1);
	    el1 = document.createElement("div");
        dodajStilove(el1, {cursor: "default", backgroundColor: "green", width: "15%", height: "100%", position: "absolute", 
			               left: "42.5%", top: "0%"});
	    el.appendChild(el1);
	    
	    el.addEventListener("mouseenter", this.hoverFun);
        
        this.display.appendChild(el);
        this.poljeKrizica.push(el);
	}
	
	ukloniKrizice() {
		for (let i = this.poljeKrizica.length-1; i > -1; i--) {
			let el = this.poljeKrizica[i];
			el.removeEventListener("mouseenter", this.hoverFun);
			this.display.removeChild(el);
			this.poljeKrizica.splice(i, 1);
		}
	}
	
	hoverFun(e) {
		let radius = parseFloat(e.target.style.height)/2;
		let x = parseFloat(e.target.style.left) + radius;
		let y = parseFloat(e.target.style.top) + radius;
		console.log("Ovaj krizic je postavljen na koordinatu " + x + ", " + y);
	}
	
	postaviListener() {
		this.display.addEventListener("click", fun);
		document.addEventListener("keydown", pritisakGumba);
		var that = this;
		
		function pritisakGumba(e) {
			if (e.code === "KeyQ")  that.ukloniKrizice();
		}
		
		function fun(e) {
			if (e.target.classList.contains("slovo1")) {
				var x = (parseInt(e.target.style.left) + e.offsetX);
				var y = (parseInt(e.target.style.top) + e.offsetY);
			    console.log("Koordinata klika je " + x + ", " + y);
			} else {
				var x = e.offsetX;
				var y = e.offsetY;
				console.log("Koordinata klika je " + x + ", " + y);
			}
			if (e.shiftKey)  that.postaviKrizic(x, y);
		} 
	}
}

function pronadiInterval(br, polje) {
	let dulj = polje.length;
	let tp1 = 0;
	let tp2 = dulj-1;
	
	if (br <= polje[tp1]) return 0;
	if (dulj === 1)  return 1;
	if (br > polje[tp2]) return dulj;
	
	let tp;
	let uvjet = true;
	while (uvjet) {
		tp = Math.floor((tp1+tp2)/2);
		if (polje[tp] >= br) {
			tp2 = tp;
		} else {
			tp1 = tp;
		}
		
		if (tp2-tp1 <= 1) uvjet = false;
		
	}
	
	return tp2;
	
}

function dodajStilove(el, stilovi) {
    for (let key in stilovi) {
	    el.style[key] = stilovi[key];
	}
}

function requestAnimationWrapper(fun) {
    window.requestAnimationFrame(()=> {if (fun())  requestAnimationWrapper(fun)});
}
