import React from "react";
import { connect } from 'react-redux';

class Navba2 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			stickySw: false,
			viewportH: 0,
			menuOpen: false,
			jezik: this.props.jezik == "hr" ? "hr" : "en",
			
			ID: [],
			IDpozicije: [],
			visinaProzora: 0, 
			pozicija: 1   // trenutna pozicija/stranica, index starta sa 1 a ne sa 0
		}
		
		this.stickIt = this.stickIt.bind(this);
		this.toggle = this.toggle.bind(this);
		this.inicirajVrijednosti = this.inicirajVrijednosti.bind(this);
		this.updejtajPoziciju = this.updejtajPoziciju.bind(this);
		this.postaviTrenutnuStranicu = this.postaviTrenutnuStranicu.bind(this);
		this.inicirajVrijednostiNaResize = this.inicirajVrijednostiNaResize.bind(this);
	}
	
	static getDerivedStateFromProps(props, state) {
		if (props.jezik != state.jezik) {
			return {jezik: props.jezik};
		} else {
			return null;
		}
	}
	
	componentDidMount() {
		window.addEventListener("scroll", this.stickIt);
		this.setState({viewportH: document.querySelector("html").clientHeight});
		
		let polje = this._r1.children;
		let popis = [];
		for (let i = 0; i < polje.length; i++) {
			let atr = polje[i].getAttribute("href");
			popis.push(atr);
		}
		
		this.inicirajVrijednosti(popis);
		
		
		window.addEventListener("scroll", this.updejtajPoziciju);
		window.addEventListener("resize", this.inicirajVrijednostiNaResize);
		
		//window.scrollTo(0, 2817);
	}
	
	componentWillUnmount() {
		window.removeEventListener("scroll", this.stickIt);
		window.removeEventListener("scroll", this.updejtajPoziciju);
		window.removeEventListener("resize", this.inicirajVrijednostiNaResize);
	}
	
	componentDidUpdate() {
		let idOznaka = this.state.ID[this.state.pozicija-1];
		        
        this.postaviTrenutnuStranicu(this._r1, idOznaka);
        this.postaviTrenutnuStranicu(this._r2, idOznaka);
       		
	}
	
	postaviTrenutnuStranicu(r, idOznaka) {
		let linkovi = r.children;
		for (let i = 0; i < linkovi.length; i++) {
			let ee = linkovi[i];
			
			if (ee.getAttribute("href") === idOznaka) {
				ee.classList.add("navbar-dropdown-a-odabrani");
			} else {
				ee.classList.remove("navbar-dropdown-a-odabrani");
			}
		}
	}
	
	inicirajVrijednosti(popis) {
		// ova metoda inicira visinu prozora i offset-ove svake stranice
		
		let html = document.querySelector("html");
		this.setState({visinaProzora: window.innerHeight});
		
		let pp = [];
		for (let i = 0; i < popis.length; i++) {
			let el = document.querySelector(popis[i]);
			let koor = getCoords(el).top;
			pp.push(koor);
		}
		

		this.setState({IDpozicije: pp, ID: popis});
	}
	
	inicirajVrijednostiNaResize() {
		let html = document.querySelector("html");
		this.setState({visinaProzora: window.innerHeight});
		
		let pp = [];
		for (let i = 0; i < this.state.ID.length; i++) {
			let el = document.querySelector(this.state.ID[i]);
			let koor = getCoords(el).top;
			pp.push(koor);
		}
		this.setState({IDpozicije: pp});
		this.updejtajPoziciju();
	}
	
	updejtajPoziciju() {
		let poz = pronadiInterval(window.pageYOffset + this.state.visinaProzora/2, this.state.IDpozicije);
		if (poz != this.state.pozicija) {
			if (false && poz == -1) {
				this.setState({pozicija: 0});
				return null;
			}
			this.setState({pozicija: poz});
		}
	}
		
	stickIt() {
		if (!this.state.stickySw && window.pageYOffset > this.state.viewportH) {
			this._r.classList.add("sticky");
			this.setState({stickySw: true});
		} else if (this.state.stickySw && window.pageYOffset < this.state.viewportH){
			this._r.classList.remove("sticky");
			this.setState({stickySw: false});
		}
    }
    
    toggle() {
		if (this.state.menuOpen) {
			//this._r1.style.display = "none";
			this._r1.style.maxHeight = "0px";
			this.setState({menuOpen: false});
		} else {
			//this._r1.style.display = "block";
			this._r1.style.maxHeight = "200px";
			this.setState({menuOpen: true});
		}
	}
	
	render() {
		return (
		    <div ref={(e)=>this._r = e} className="navbar">
		        <div className="navbar-mobile">
		            <div className="navbar-el">
		                <div className="navbar-el1" onClick={this.toggle}>
		                    <div className="navbar-el2"></div>
		                    <div className="navbar-el2"></div>
		                    <div className="navbar-el2"></div>
		                </div>
		            </div>
		            <div className="navbar-crta"></div>
		            <div className="navbar-dropdown" ref={(e)=>this._r1 = e}>
                        <a href="#home" className="navbar-dropdown-a" onClick={()=>{this.toggle()}}><div className="navbar-dropdown-div">{this.state.jezik == "en" ? "HOME" : "POČETNA"}</div></a>
                        <a href="#about" className="navbar-dropdown-a" onClick={()=>{this.toggle()}}><div className="navbar-dropdown-div">{this.state.jezik == "en" ? "ABOUT" : "O MENI"}</div></a>
                        <a href="#portfolio" className="navbar-dropdown-a" onClick={()=>{this.toggle()}}><div className="navbar-dropdown-div">PORTFOLIO</div></a>
                        <a href="#forma" className="navbar-dropdown-a" onClick={()=>{this.toggle()}}><div className="navbar-dropdown-div">{this.state.jezik == "en" ? "CONTACT" : "KONTAKT"}</div></a>
		            </div>
	            </div>
	            <div className="navbar-laptop" ref={(e)=>this._r2 = e}>
	                <div className="navbar-dropdown-div2"></div>
	                <a href="#home" className="navbar-dropdown-a"><div className="navbar-dropdown-div1">{this.state.jezik == "en" ? "HOME" : "POČETNA"}</div></a>
	                <div className="navbar-dropdown-div2"></div>
                    <a href="#about" className="navbar-dropdown-a"><div className="navbar-dropdown-div1">{this.state.jezik == "en" ? "ABOUT" : "O MENI"}</div></a>
                    <div className="navbar-dropdown-div2"></div>
                    <a href="#portfolio" className="navbar-dropdown-a"><div className="navbar-dropdown-div1">PORTFOLIO</div></a>
                    <div className="navbar-dropdown-div2"></div>
                    <a href="#forma" className="navbar-dropdown-a"><div className="navbar-dropdown-div1">{this.state.jezik == "en" ? "CONTACT" : "KONTAKT"}</div></a>

	            </div>
	        </div>
		)
	}
}

const mapStateToProps = state => {
  return {
    jezik: state.jezik
  }
}

export const Navbar2 = connect(
  mapStateToProps,
  null
)(Navba2)

export class Navbar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			stickySw: false,
			viewportH: 0,
			menuOpen: false,
			jezik: this.props.jezik == "hr" ? "hr" : "en"
		}
		
		this.stickIt = this.stickIt.bind(this);
		this.toggle = this.toggle.bind(this);
	}
	
	static getDerivedStateFromProps(props, state) {
		if (props.jezik != state.jezik) {
			return {jezik: props.jezik};
		} else {
			return null;
		}
	}
	
	componentDidMount() {
		window.addEventListener("scroll", this.stickIt);
		this.setState({viewportH: document.querySelector("html").clientHeight});
	}
	
	componentWillUnmount() {
		window.removeEventListener("scroll", this.stickIt);
	}
		
	stickIt() {
		if (!this.state.stickySw && window.pageYOffset > this.state.viewportH) {
			this._r.classList.add("sticky");
			this.setState({stickySw: true});
		} else if (this.state.stickySw && window.pageYOffset < this.state.viewportH){
			this._r.classList.remove("sticky");
			this.setState({stickySw: false});
		}
    }
    
    toggle() {
		if (this.state.menuOpen) {
			//this._r1.style.display = "none";
			this._r1.style.maxHeight = "0px";
			this.setState({menuOpen: false});
		} else {
			//this._r1.style.display = "block";
			this._r1.style.maxHeight = "200px";
			this.setState({menuOpen: true});
		}
	}
	
	render() {
		return (
		    <div ref={(e)=>this._r = e} className="navbar">
		        <div className="navbar-mobile">
		            <div className="navbar-el">
		                <div className="navbar-el1" onClick={this.toggle}>
		                    <div className="navbar-el2"></div>
		                    <div className="navbar-el2"></div>
		                    <div className="navbar-el2"></div>
		                </div>
		            </div>
		            <div className="navbar-crta"></div>
		            <div className="navbar-dropdown" ref={(e)=>this._r1 = e}>
		                <a href="#home" className="navbar-dropdown-a" onClick={()=>{this.toggle()}}><div className="navbar-dropdown-div">{this.state.jezik == "en" ? "HOME" : "POČETNA"}</div></a>
                        <a href="#about" className="navbar-dropdown-a" onClick={()=>{this.toggle()}}><div className="navbar-dropdown-div">{this.state.jezik == "en" ? "ABOUT" : "O MENI"}</div></a>
                        <a href="#portfolio" className="navbar-dropdown-a" onClick={()=>{this.toggle()}}><div className="navbar-dropdown-div">PORTFOLIO</div></a>
                        <a href="#forma" className="navbar-dropdown-a" onClick={()=>{this.toggle()}}><div className="navbar-dropdown-div">{this.state.jezik == "en" ? "CONTACT" : "KONTAKT"}</div></a>
		            </div>
	            </div>
	            <div className="navbar-laptop">
	                <div className="navbar-dropdown-div2"></div>
	                <a href="#home" className="navbar-dropdown-a"><div className="navbar-dropdown-div1">{this.state.jezik == "en" ? "HOME" : "POČETNA"}</div></a>
	                <div className="navbar-dropdown-div2"></div>
                    <a href="#about" className="navbar-dropdown-a"><div className="navbar-dropdown-div1">{this.state.jezik == "en" ? "ABOUT" : "O MENI"}</div></a>
                    <div className="navbar-dropdown-div2"></div>
                    <a href="#portfolio" className="navbar-dropdown-a"><div className="navbar-dropdown-div1">PORTFOLIO</div></a>
                    <div className="navbar-dropdown-div2"></div>
                    <a href="#forma" className="navbar-dropdown-a"><div className="navbar-dropdown-div1">{this.state.jezik == "en" ? "CONTACT" : "KONTAKT"}</div></a>
	            </div>
	        </div>
		)
	}
}


export class Navbar1 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			stickySw: false,
			viewportH: 0,
			menuOpen: false,
			jezik: this.props.jezik == "hr" ? "hr" : "en"
		}
		
		this.stickIt = this.stickIt.bind(this);
		this.toggle = this.toggle.bind(this);
	}
	
	static getDerivedStateFromProps(props, state) {
		if (props.jezik != state.jezik) {
			return {jezik: props.jezik};
		} else {
			return null;
		}
	}
	
	componentDidMount() {
		window.addEventListener("scroll", this.stickIt);
		this.setState({viewportH: document.querySelector("html").clientHeight});
	}
	
	componentWillUnmount() {
		window.removeEventListener("scroll", this.stickIt);
	}
		
	stickIt() {
		if (!this.state.stickySw && window.pageYOffset > this.state.viewportH) {
			this._r.classList.add("sticky");
			this.setState({stickySw: true});
		} else if (this.state.stickySw && window.pageYOffset < this.state.viewportH){
			this._r.classList.remove("sticky");
			this.setState({stickySw: false});
		}
    }
    
    toggle() {
		if (this.state.menuOpen) {
			//this._r1.style.display = "none";
			this._r1.style.maxHeight = "0px";
			this.setState({menuOpen: false});
		} else {
			//this._r1.style.display = "block";
			this._r1.style.maxHeight = "200px";
			this.setState({menuOpen: true});
		}
	}
	
	render() {
		return (
		    <div ref={(e)=>this._r = e} className="navbar">
		        <div className="navbar-el">
		            <div className="navbar-el1" onClick={this.toggle}>
		                <div className="navbar-el2"></div>
		                <div className="navbar-el2"></div>
		                <div className="navbar-el2"></div>
		            </div>
		        </div>
		        <div className="navbar-crta">
		        </div>
		        <div className="navbar-dropdown" ref={(e)=>this._r1 = e}>
		            <a href="#home" className="navbar-dropdown-a" onClick={()=>{this.toggle()}}><div className="navbar-dropdown-div">{this.state.jezik == "en" ? "HOME" : "POČETNA"}</div></a>
                    <a href="#about" className="navbar-dropdown-a" onClick={()=>{this.toggle()}}><div className="navbar-dropdown-div">{this.state.jezik == "en" ? "ABOUT" : "O MENI"}</div></a>
                    <a href="#ostatak1" className="navbar-dropdown-a" onClick={()=>{this.toggle()}}><div className="navbar-dropdown-div">PORTFOLIO</div></a>
                    <a href="#forma" className="navbar-dropdown-a" onClick={()=>{this.toggle()}}><div className="navbar-dropdown-div">{this.state.jezik == "en" ? "CONTACT" : "KONTAKT"}</div></a>
		        </div>
	        </div>
		)
	}
}

function pronadiInterval(br, polje) {
	let dulj = polje.length;
	let tp1 = 0;
	let tp2 = dulj-1;
	
	if (br <= polje[tp1]) return 0;
	if (dulj == 1)  return 1;
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

function getCoords(elem) { // crossbrowser version
    var box = elem.getBoundingClientRect();

    var body = document.body;
    var docEl = document.documentElement;

    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;

    var top  = box.top +  scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return { top: Math.round(top), left: Math.round(left) };
}
