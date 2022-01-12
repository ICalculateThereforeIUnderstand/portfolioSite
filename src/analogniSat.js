
export class analogniSat {
	constructor({display, sirina="50%", id="", timeUpdate=true}) {
		// display je div element gdje postavljamo sat, sirina je sirina u postotcima sirine displaya, za timeUpdate true sat sam refresha svoje vrijeme
		// svake sekunde. za false vrijeme stoji i eventualno ga mozes updejtati izvan ove klase.
		this.el = display;
		this.elVis = this.el.clientHeight;
		this.elSir = this.el.clientWidth;
		
		this.id = id;
		this.sirina = parseInt(sirina);
		this.visina = this.sirina * this.elSir / this.elVis;
		this.fontSize = this.sirina/100 * this.elSir * 0.09;
		this.satFi = 0;
		this.minuteFi = 0;
		this.sekundeFi = 0;
		
		this.dat = new Date();
		this.sati = this.dat.getHours();
		this.minute = this.dat.getMinutes();
		this.sekunde = this.dat.getSeconds();
		
		this.sat = document.createElement("div");
		dodajStilove(this.sat, {backgroundColor: "white", height: this.visina+"%", width: this.sirina+"%", borderRadius: "50%",
			                    border: "4px solid black", position: "relative", boxSizing: "border-box"});
		if (this.id !== "")  this.sat.setAttribute("id", this.id);
		
		//this.el.appendChild(this.sat);

		// sati
		this.kazaljkaSati = document.createElement("div");
		dodajStilove(this.kazaljkaSati, {position: "absolute", top: "23%", left: "48.6%", height: "33%", width: "2.8%", backgroundColor: "black", 
			                             borderRadius: "30% 30% 0px 0px", zIndex: "1", transformOrigin: "50% 81.8181%", transform: "rotate(225deg)"});
		this.sat.appendChild(this.kazaljkaSati);

		// minute
		this.kazaljkaMinute = document.createElement("div");
		dodajStilove(this.kazaljkaMinute, {position: "absolute", top: "15%", left: "49%", height: "45%", width: "2%", backgroundColor: "black", 
			                             borderRadius: "30% 30% 0px 0px", zIndex: "2", transformOrigin: "50% 77.777%", transform: "rotate(315deg)"});
		this.sat.appendChild(this.kazaljkaMinute);
				
		let srednjiDio = document.createElement("div");
		dodajStilove(srednjiDio, {position: "absolute", top: "47.5%", left: "47.5%", height: "5%", width: "5%", backgroundColor: "black", borderRadius: "50%"})
		this.sat.appendChild(srednjiDio);
	
	    // sekunde
		this.kazaljkaSekunde = document.createElement("div");
		dodajStilove(this.kazaljkaSekunde, {position: "absolute", top: "20%", left: "49%", height: "45%", width: "2%", 
			                             zIndex: "3", transformOrigin: "50% 66.666%", transform: "rotate(90deg)"});
	    let el1 = document.createElement("div");
	    dodajStilove(el1, {position: "absolute", bottom: "0%", left: "0%", height: "20%", width: "100%", backgroundColor: "red"});
	    this.kazaljkaSekunde.appendChild(el1);
	    let el2 = document.createElement("div");
	    dodajStilove(el2, {position: "absolute", top: "0%", left: "25%", height: "80%", width: "50%", backgroundColor: "red", borderRadius: "40% 40% 0px 0px"});
	    this.kazaljkaSekunde.appendChild(el2);
	    let el3 = document.createElement("div");
	    dodajStilove(el3, {position: "absolute", top: "64.4444%", left: "0%", height: "4.4444%", width: "100%", backgroundColor: "red", borderRadius: "50%"});
	    this.kazaljkaSekunde.appendChild(el3);
			                             
			                             
		this.sat.appendChild(this.kazaljkaSekunde);
		
		this.postaviVrijeme();
		
		this.postaviGrafickeElemente();
		
		if (timeUpdate) {
		    setInterval(() => {this.sekunde++; this.postaviVrijeme()}, 1000);
		}
		
		this.postaviGrafickeElemente = this.postaviGrafickeElemente.bind(this);
		this.postaviVrijeme = this.postaviVrijeme.bind(this);
	}
	
	postaviVrijeme() {
        let fi = this.sekunde * 6;
        this.kazaljkaSekunde.style.transform = "rotate(" + fi + "deg)";
        let fi1 = this.minute * 6  +  fi / 60;
        this.kazaljkaMinute.style.transform = "rotate(" + fi1 + "deg)";
        let fi2 = this.sati * 30 + fi1 / 12;
        this.kazaljkaSati.style.transform = "rotate(" + fi2 + "deg)";
	}
	
	postaviGrafickeElemente() {
		// kruzni indikatori za sate
		for (let i = 0; i < 12; i++) {
			let el = document.createElement("div");
			let fi = 30*i;
			dodajStilove(el, {height: "3%", width: "3%", backgroundColor: "black", position: "absolute", top: "48.5%", left: "48.5%",
				              borderRadius: "50%", transform: "rotate("+fi+"deg) translateY(-1180%)"});
			this.sat.appendChild(el);
		}
		// indikatori-crtice za minute
		for (let i = 0; i < 60; i++) {
			if (i % 5 === 0) continue;
			let el = document.createElement("div");
			let fi = 6*i;
			dodajStilove(el, {height: "4%", width: "0.7%", backgroundColor: "black", position: "absolute", top: "48%", left: "49.65%", 
				             transform: "rotate("+fi+"deg) translateY(-880%)"});
			this.sat.appendChild(el);
		}
		
		// brojevi
		for (let i = 0; i < 12; i++) {
			let el = document.createElement("div");
			el.innerHTML = (i+1);
			let fi = 30*(i+1);
			dodajStilove(el, {height: "10%", width: "10%", position: "absolute", top: "45%", left: "45%", 
				             transform: "rotate("+fi+"deg) translateY(-430%) rotate(" + (-1*fi) + "deg)", display: "flex", justifyContent: "center", alignItems: "center",
				             fontSize: this.fontSize + "px", fontFamily: "sans-serif", fontWeight: "600"});
			this.sat.appendChild(el);
		}
		
	}
	
	
}

function dodajStilove(el, stilovi) {
    for (let key in stilovi) {
	    el.style[key] = stilovi[key];
	}
}

