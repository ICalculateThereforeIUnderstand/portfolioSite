import React from "react";
import { brokenElement, brokenClock } from "./animacije.js";
import { connect } from 'react-redux';

class ZajednickaLogika1 extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			klasa: this.props.klasa, 
			trenutnaKlasa: this.props.klasa,
			sw: this.props.sw, 
			jezik: this.props.jezik,
			hoverSw1: false // hoverSw1 indikator koji se updejta klikovima na uredaju bez hover sposobnosti
		}
		
		this.ref = React.createRef();
		this.ref1 = React.createRef();
		this.timeRef = null;
		this.be = null;
		
		// slijedi hover logika, komponenta je ne mora koristiti
		this.hoverRef = React.createRef();
        this.hoveraj = this.hoveraj.bind(this);
        this.odhoveraj = this.odhoveraj.bind(this);
        this.iniciraj = this.iniciraj.bind(this);
        this.pocisti = this.pocisti.bind(this);
        this.hoveraj = this.hoveraj.bind(this);
        this.odhoveraj = this.odhoveraj.bind(this);
        this.iniciraj = this.iniciraj.bind(this);
        this.pocisti = this.pocisti.bind(this);
		// kraj hover logike
		
		this.provjeriVidljivost = this.provjeriVidljivost.bind(this);
		this.toggle = this.toggle.bind(this);
		this.hoverCapability = this.hoverCapability.bind(this);
	}
	
	componentDidMount() {
		
		dodajStilove(this.ref.current, {height: "100%", width: "100%", position: "absolute", left: "0", top: "0", transition: "opacity 0.7s, transform 0.7s"});
		this.ref.current.classList.add(this.state.klasa);	
		this.iniciraj();
	}
	
	static getDerivedStateFromProps(props, state) {	
		if (props.klasa !== state.klasa  ||  props.sw !== state.sw || props.jezik !== state.jezik) {
		    return {klasa: props.klasa, sw: props.sw, jezik: props.jezik};	
		}
		return null;
	}
	
	componentDidUpdate() {
		let st = this.state.klasa;
		let st1 = this.state.trenutnaKlasa;
		if (st !== st1 ) {
			this.ref.current.classList.remove(st1);
			this.ref.current.classList.add(st);			
			this.setState({trenutnaKlasa: st});
		}
		
		clearTimeout(this.timeRef);
		this.timeRef = setTimeout(this.provjeriVidljivost, 600);
	}
	
	componentWillUnmount() {
		this.resetirajAnimaciju();
		this.pocisti();
	}
	
	hoverCapability(id) {
    // ova funkcija provjerava da li uredaj ima hover sposobnosti, id je id testnog div elementa kojem media query mjenja boju ovisno o hover sposobnosti
	    if (window.getComputedStyle(document.querySelector("#"+id)).getPropertyValue("background-color") == "rgb(0, 0, 0)")  return true;
	    return false;
	}
	
	provjeriVidljivost() {
		if (this.state.sw && this.ref1.current !== null  &&  isElementInViewport(this.ref1.current) && 
		    this.ref.current !== null && this.ref.current.classList.contains("modal-slide-trenutni")) {
			if (this.be === null)  this.pokreniAnimaciju();
		} else {
			if (this.be !== null)  this.resetirajAnimaciju();
		}		
	}
	
	// slijedi hover logika
	iniciraj() {
		if (this.hoverRef.current !== null) {
			if (this.hoverCapability("hoverTest")) {
		        this.hoverRef.current.addEventListener("mouseenter", this.hoveraj);
                this.hoverRef.current.addEventListener("mouseleave", this.odhoveraj);
                this.hoverRef.current.addEventListener("mousedown", this.odhoveraj);
                this.hoverRef.current.addEventListener("mouseup", this.hoveraj);
			} else {
				this.hoverRef.current.addEventListener("click", this.toggle);
			}
		}
	}
	
	pocisti() {
		if (this.hoverRef.current !== null) {
			if (this.hoverCapability("hoverTest")) {
		        this.hoverRef.current.removeEventListener("mouseenter", this.hoveraj);
                this.hoverRef.current.removeEventListener("mouseleave", this.odhoveraj);
                this.hoverRef.current.removeEventListener("mousedown", this.odhoveraj);
                this.hoverRef.current.removeEventListener("mouseup", this.hoveraj);
            } else {
				this.hoverRef.current.removeEventListener("click", this.toggle);
			}
		}
	}
	
	toggle() {
		if (this.state.hoverSw1) {
			this.odhoveraj();
			this.setState({hoverSw1: false});
		} else {
			this.hoveraj();
			this.setState({hoverSw1: true});
		}
	}
	
	hoveraj() {
        this.hoverRef.current.style.opacity = "0.8";
    }
    
    odhoveraj() {
        this.hoverRef.current.style.opacity = "0";
    }
}

const mapStateToProps = state => {
  return {
    jezik: state.jezik
  }
}

function PromjenjiveSlike() {
	
	const [br, setBr] = React.useState(0);
	const r = React.useRef();
	const r1 = React.useRef();
	
	React.useEffect(()=>{
		r.current = setInterval(()=>{setBr((prevBr)=>{ return (prevBr+1)%6})}, 1000);
		
		return ()=>{console.log("ponistavamo komponentu.");clearTimeout(r.current)};
	}, []);
	
	React.useEffect(()=>{
		console.log("novi br je " + br);
		for (let i = 0; i < 6; i++) {
			let el = r1.current.querySelector("#slika" + (i+1));
			if (i === br) {
				el.style.display = "block";
			} else {
				el.style.display = "none";
			}
		}
	}, [br]);
	
	return (
	    <div className="page21-slika" ref={r1}>
            <img src="./slike/slika_animacije1.jpg" alt="pocetna stranica" id="slika1" className="page21-slika-slika"/> 
		    <img src="./slike/slika_animacije2.jpg" alt="pocetna stranica" id="slika2" className="page21-slika-slika"/> 
		    <img src="./slike/slika_animacije3.jpg" alt="pocetna stranica" id="slika3" className="page21-slika-slika"/> 
		    <img src="./slike/slika_animacije4.jpg" alt="pocetna stranica" id="slika4" className="page21-slika-slika"/> 
		    <img src="./slike/slika_animacije5.jpg" alt="pocetna stranica" id="slika5" className="page21-slika-slika"/> 
		    <img src="./slike/slika_animacije6.jpg" alt="pocetna stranica" id="slika6" className="page21-slika-slika"/> 
		</div>
	)
}

class Pag21 extends ZajednickaLogika1 {
	constructor(props) {
		super(props);
		
		this.state = {
			hoverSw: this.hoverCapability("hoverTest")
		}
	
		this.pokreniAnimaciju = this.pokreniAnimaciju.bind(this);
		this.resetirajAnimaciju = this.resetirajAnimaciju.bind(this);
	}
		
	pokreniAnimaciju() {
	  if (this.state.hoverSw) {	
		let visSlika = 100;
		let sirSlika = 100;
		let koef = this.ref.current.clientWidth / this.ref.current.clientHeight * visSlika / sirSlika; // ove zadnje dvije brojke su visina / sirina slike u px
		if (this.ref.current.clientWidth / this.ref.current.clientHeight > sirSlika/visSlika) {
			// po visini narihtavamo
			var ypo1 = 10.11;
			var ypo2 = 89.93;
			let xsir = (ypo2-ypo1) / koef;
		    var xpo1 = (100-xsir)/2;
		    var xpo2 = (100+xsir)/2;
	    } else {
			// po sirini narihtavamo
			var xpo1 = 10.11;
			var xpo2 = 89.93;
			let ysir = (xpo2-xpo1) * koef;
			var ypo1 = (100-ysir)/2;
		    var ypo2 = (100+ysir)/2;
		}
		this.be = new brokenClock({display:this.ref.current, xPoc1:xpo1, yPoc1:ypo1, xPoc2:xpo2, nx:15, ny:15, infoKlikSw:false, interpolacijaSw:true,
			                      vrijeme:8000, korekcijaCrta:true});
	  }		                      
	}
	
	resetirajAnimaciju() {
		if (this.be !== null) {
			this.be.destruct();
		}
		this.be = null;
	}
	
	render() {
		return ( 
		    <div ref={this.ref} className="page21">
		    {this.state.hoverSw ?
		            <div ref={this.ref1} className="page18-viewpoint"></div> 
		    :
		           <>
                    <PromjenjiveSlike/>
		            <div className="page18-el" ref={this.hoverRef}>
		                {this.state.jezik === "hr" ? 
                            <p className="page12-el-tekst">Animacija je isključena zato što koristite mobitel, a vrlo je računarski zahtjevna. Ako je želite vidjeti uživo posjetite ovu stranicu sa desktop računala.</p>
                        :   <p className="page12-el-tekst page23-el-tekst-dodatno">This animation is turned off because you are accessing this site from smartphone and the animation is computer intensive. If you want to see it, please visit this site from desktop computer.</p>
				        }
	                </div>
	               </> 
		    } 
		    </div>
		    
		)
	}
}

export const Page21 = connect(
  mapStateToProps,
  null
)(Pag21)

export class Pag18 extends ZajednickaLogika1 {
	constructor(props) {
		super(props);
		
		this.pokreniAnimaciju = this.pokreniAnimaciju.bind(this);
		this.resetirajAnimaciju = this.resetirajAnimaciju.bind(this);
	}
	
	pokreniAnimaciju() {
		let visSlika = 1632;
		let sirSlika = 918;
		let koef = this.ref.current.clientWidth / this.ref.current.clientHeight * visSlika / sirSlika; // ove zadnje dvije brojke su visina / sirina slike u px
		if (this.ref.current.clientWidth / this.ref.current.clientHeight > sirSlika/visSlika) {
			// po visini narihtavamo
			var ypo1 = 10.11;
			var ypo2 = 89.93;
			let xsir = (ypo2-ypo1) / koef;
		    var xpo1 = (100-xsir)/2;
		    var xpo2 = (100+xsir)/2;
	    } else {
			// po sirini narihtavamo
			var xpo1 = 10.11;
			var xpo2 = 89.93;
			let ysir = (xpo2-xpo1) * koef;
			var ypo1 = (100-ysir)/2;
		    var ypo2 = (100+ysir)/2;
		}
		this.be = new brokenElement({display:this.ref.current, slikaUrl:"2b.jpg", xPoc1:xpo1, yPoc1:ypo1, xPoc2:xpo2, yPoc2: ypo2, nx:12, ny:24, infoKlikSw:false, interpolacijaSw:false, vrijeme:12000, prekidac:1, korekcijaCrta: false});
	}
	
	resetirajAnimaciju() {
		if (this.be !== null) {
			this.be.destruct();
		}
		this.be = null;
	}
	
	render() {
		return (
		    <div ref={this.ref} className="page18">
		        <div ref={this.ref1} className="page18-viewpoint"></div>
		        <div className="page18-el" ref={this.hoverRef}>
		            {this.state.jezik === "hr" ? 
                        <p className="page12-el-tekst">U ovoj animaciji se igramo slovima, nešto slično kao i u video isječku. Napisao sam posebnu javascript klasu koja to provodi. Prvo krećemo sa postavljanjem posljednjeg postava slova. Zatim za svako slovo generiramo random krivulju od n točaka. Posljednja dobivena točka je startna. Random točke dobijamo posebno razvijenim 2D random šetačem. Osigurao sam da točke ne bježe sa ekrana, a također sam vodio računa o responsive designu i da animacija izgleda lijepo u svim mogućim dimenzijama ekrana (jedinice x,z koord su u postotcima, veličina slova ovisi o dimenzijama podloge, itd). Kod svakog otvaranja prozora se animacija nanovo pokreće, stoga je početni raspored slova svaki put drugačiji.</p>
                    :   <p className="page12-el-tekst page23-el-tekst-dodatno">In this animation we play with letters, something similar to video clip. I have written special JavaScript class which makes all the work. First, user has to setup final layout of letters. That is only thing he needs to do. After that, for each letter random trajectory is generated with n points, where last one is starting point in animation. Points are generated by specially designed 2d random walker. I have made sure that all trajectories are within the screen and I have taken care of responsive design, so animation looks nice in all possible screens (coordinates are in percentages, size of letters are functions of display dimensions, etc). With every new opening of window, animation starts from the beginning, so starting layout of letters is every time different.</p>
				    }
	            </div>
		    </div>
		)
	}
}

export const Page18 = connect(
  mapStateToProps,
  null
)(Pag18)

export class Pag20 extends ZajednickaLogika1 {
	constructor(props) {
		super(props);
		
		this.pokreniAnimaciju = this.pokreniAnimaciju.bind(this);
		this.resetirajAnimaciju = this.resetirajAnimaciju.bind(this);
	}
	
	pokreniAnimaciju() {
		let visSlika = 1632;
		let sirSlika = 918;
		let koef = this.ref.current.clientWidth / this.ref.current.clientHeight * visSlika / sirSlika; // ove zadnje dvije brojke su visina / sirina slike u px
		// u ovom dijelu narihtavamo visinu i sirinu slike tako da sama slika bude pravilno skalirana/nedeformirana po x i y osi, da bude po sredini ekrana
		// i da zauzima vecinu prostora po manjoj dimenziji displaya tako da ne izlazi iz ekrana. na taj nacin osiguravamo responsive design 
		if (this.ref.current.clientWidth / this.ref.current.clientHeight > sirSlika/visSlika) {
			// po visini narihtavamo
			var ypo1 = 10.11;
			var ypo2 = 89.93;	
			let xsir = (ypo2-ypo1) / koef;
		    var xpo1 = (100-xsir)/2;
		    var xpo2 = (100+xsir)/2;
	    } else {
			// po sirini narihtavamo
			var xpo1 = 10.11;
			var xpo2 = 89.93;
			let ysir = (xpo2-xpo1) * koef;
			var ypo1 = (100-ysir)/2;
		    var ypo2 = (100+ysir)/2;
		}
		this.be = new brokenElement({display:this.ref.current, slikaUrl:"./slike/myPic.jpg", xPoc1:xpo1, yPoc1:ypo1, xPoc2:xpo2, yPoc2: ypo2, nx:10, ny:18, infoKlikSw:false, interpolacijaSw:true, vrijeme:12000, prekidac:2, korekcijaCrta: true});
	}
	
	resetirajAnimaciju() {
		if (this.be !== null) {
			this.be.destruct();
		}
		this.be = null;
	}
	
	render() {
		return (
		    <div ref={this.ref} className="page18">
		        <div ref={this.ref1} className="page18-viewpoint"></div>
		        <div className="page18-el" ref={this.hoverRef}>
		            {this.state.jezik === "hr" ? <p className="page12-el-tekst">U ovom uratku otišao sam korak dalje i više se ne igram sa slovima, već sa komadićima veće slike. To se postiže tako da svakom malom div elementu koji je prije sadržavao slovo dodamo dijete-sliku, učinimo ga "overflow: hidden", te njegovu dijete-sliku pomičemo relativno prema njemu ovisno o njegovoj krajnjoj poziciji u većoj slici. Procesi pozicioniranja komadića/elemenata i generiranja njihovih putanja su identični kao u slučaju sa slovima. Ovaj postupak je moguće ponoviti za bilo koji div element, ma kako složen bio. Na sljedećoj stranici ćete vidjeti animaciju sa html analognim satom koji sam napravio isključivo od div elemenata.</p>
					: <p className="page12-el-tekst">In this work I go one step further and dont play with letters anymore but with pieces of bigger picture. This is accomplished by assigning bigger pic in background of each small pic which previously contained letter, then we make small pieces "overflow:hidden" and its much bigger child-pic is moved relative to it depending where that parent element is positioned compared to final big picture. Process of positioning of elements on screen and generating their trajectories is same as in case with letters. It is possible to repeat this process with any div element no matter how complex it is. On next page you can see animation of appearing/disappearing analog html clock.</p>
				    }	
	            </div>
		    </div>
		)
	}
}

export const Page20 = connect(
  mapStateToProps,
  null
)(Pag20)

function isElementInViewport(el) {
	var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
    );
}

function dodajStilove(el, stilovi) {
    for (let key in stilovi) {
	    el.style[key] = stilovi[key];
	}
}
