import React from "react";
import "./modal.css";
import { ImCross } from "react-icons/im";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { DefaultStranica } from "./stranice.js";
import { mouseEvents } from "./mouseEvents.js";
import { connect } from 'react-redux';

export class Moda extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			sw: false,
			hoverSW: false,
			poz: 0,
			dulj: this.props.stranice.length,
			slideSw: true, 
			
			naslov: this.props.naslov,
			jezik: this.props.jezik,
			naslovSize: this.props.naslovSize,
			slikaUrl: this.props.slikaUrl,
			modalID: this.props.modalID,
			panelNaslov: this.props.panelNaslov,
			panelNaslov1: this.props.panelNaslov1,
			panelTekst: this.props.panelTekst,
			siteUrl: this.props.siteUrl,
			stranice: this.props.stranice,
			lang: this.props.lang
		}
	
		this.refe = React.createRef();
		this.refe1 = React.createRef();
		this.refe2 = React.createRef();
		this.refe3 = React.createRef();
		this.refe4 = React.createRef();
		this.refe5 = React.createRef();
		this.refe6 = React.createRef();
		this.ms = null;
		
		this.otvori = this.otvori.bind(this);
		this.zatvori = this.zatvori.bind(this);
		this.prethodna = this.prethodna.bind(this);
		this.sljedeca = this.sljedeca.bind(this);
		
		
	}
	
	componentDidMount() {
				
		this.refe.current.style.backgroundRepeat = "no-repeat";
		this.refe.current.style.backgroundSize = "cover";
		this.refe.current.style.backgroundPosition = "center";
		
		this.refe3.current.style.top = "-50%";
		this.refe3.current.style.opacity = "0";
		this.refe4.current.style.top = "50%";
		this.refe5.current.style.opacity = "0";
		
		if (this.state.dulj > 1) {
		    this.ms = new mouseEvents({"el1":this.refe6.current, time:120, prevFun:this.prethodna, nextFun:this.sljedeca});
		    this.ms.postavi();
		}
	}
	
	componentWillUnmount() {
		if (this.ms !== null) {
		    this.ms.ukloni();
		}
	}
	
	static getDerivedStateFromProps(props, state) {	
		
		return ({
			naslov: props.naslov,
			jezik: props.jezik,
			naslovSize: props.naslovSize,
			slikaUrl: props.slikaUrl,
			modalID: props.modalID,
			panelNaslov: props.panelNaslov,
			panelNaslov1: props.panelNaslov1,
			panelTekst: props.panelTekst,
			siteUrl: props.siteUrl,
			stranice: props.stranice,
			dulj: props.stranice.length,
			lang: props.lang
		})      		
	}
	
	componentDidUpdate() {
	
		this.refe.current.style.backgroundImage = "url(" + this.state.slikaUrl + ")";
		
		if (this.state.hoverSw) {
			this.refe3.current.style.top = "0%";
			this.refe3.current.style.opacity = "1";
			this.refe4.current.style.top = "0%";
			this.refe5.current.style.opacity = "0.5";
		} else {
			this.refe3.current.style.top = "-50%";
			this.refe3.current.style.opacity = "0";
			this.refe4.current.style.top = "50%";
			this.refe5.current.style.opacity = "0";
		}
		
		if (this.state.sw) {
			this.refe1.current.style.display = "block";
			this.refe2.current.style.display = "block";
		} else {
			this.refe1.current.style.display = "none";
			this.refe2.current.style.display = "none";
		}
		
		if (this.ms === null && this.state.dulj > 1) {
		    this.ms = new mouseEvents({"el1":this.refe6.current, time:120, prevFun:this.prethodna, nextFun:this.sljedeca});
		    this.ms.postavi();
		}
	}
	
	otvori(e) {
		e.stopPropagation();
		this.setState({sw: true});
	}
	
	zatvori(e) {
		e.stopPropagation();
		this.setState({sw: false});
	}
	
	prethodna() {
		if (this.state.slideSw) {
		    let poz1 = this.state.poz - 1;
		    if (poz1 === -1)  poz1 = this.state.dulj-1;
		    
		    setTimeout(()=>{this.setState({slideSw:true})}, 500);
		    this.setState({poz: poz1, slideSw: false});
		}
	}
	
	sljedeca() {
		if (this.state.slideSw) {
		    let poz1 = this.state.poz + 1;
		    if (poz1 === this.state.dulj)  poz1 = 0;
		    setTimeout(()=>{this.setState({slideSw:true})}, 500);
		    this.setState({poz: poz1, slideSw: false});
		}
	}
	
	render() {
		return (
		<div ref={this.refe} id={this.state.modalID} className="modal-link" onMouseEnter={ ()=>{this.setState({hoverSw:true})} } onMouseLeave={()=>{this.setState({hoverSw:false})}}>
	        <div className="modal-nevidljivi" ref={this.refe1} onClick={this.zatvori}>
	        </div>
	        <div className="modal" ref={this.refe2}>
	             <div className="modal-slide" ref={this.refe6}>
	                 {this.state.stranice.length > 1 ? 
					     <>	 
	                         <div className="modal-slide-gumb-left" onClick={this.prethodna}>
	                             <IoIosArrowBack className="modal-slide-gumb-ikona"/>
	                         </div>
	                         <div className="modal-slide-gumb-right" onClick={this.sljedeca}>
	                             <IoIosArrowForward className="modal-slide-gumb-ikona"/>
	                         </div>
	                     </> : null
				     }
	                 
	                
	                 {this.state.stranice.map((el, index)=>{ 
						 if (this.state.poz === index) {
							 return React.createElement(el, {key:index, klasa:"modal-slide-trenutni", sw:this.state.sw}, null);  // vecina stranica ne koristi sw, samo neke koje koriste animacije
					     } else if ( (this.state.poz === 0 && index === this.state.dulj-1) || this.state.poz === index+1) {
							 return React.createElement(el, {key:index, klasa:"modal-slide-prethodni", sw:this.state.sw}, null);
					     } else {
							 return React.createElement(el, {key:index, klasa:"modal-slide-sljedeci", sw:this.state.sw}, null);
						 }})
					 }
					 

	             </div>
	             <div className="modal-panel">
	                 <div className="modal-panel-el1">
	                     <p className="modal-panel-naslov">{this.state.panelNaslov}</p>
	                     <p className="modal-panel-naslov1">{this.state.panelNaslov1}</p>
                         <div className="modal-panel-crta"></div>    
	                 </div>
	                 <div className="modal-panel-el2">
	                     <p className="modal-panel-tekst">{this.state.panelTekst}</p>
	                 </div>
	                 
                     <div className="modal-panel-button" onClick={this.zatvori}>
                         <ImCross className="modal-panel-button-ikona"/>
                     </div>
                     <a href={this.state.siteUrl} className="modal-panel-link">VIEW SITE</a>
                     
	             </div>
	        </div>
	        
	        <div className="modal-plast" ref={this.refe5}>
	        </div>
	        <div className="modal-naslov" ref={this.refe3} style={{"fontSize": this.state.naslovSize}}>
	            <p className="modal-naslov-p1">{this.state.naslov}</p>
	            <p className="modal-naslov-p2">{this.state.jezik}</p>
	        </div>
	        <div className="modal-button" ref={this.refe4} onClick={this.otvori}>LEARN MORE</div>

	    </div>
		)
	}
}

Moda.defaultProps = {
	naslov: "nema naslova...",
	jezik: "nema...",
	naslovSize: 18,
	slikaUrl: "slika.jpg",
	modalID: 1,
	panelNaslov: "nema naslova...",
	panelNaslov1: "nema naslova...",
	panelTekst: "nema teksta...",
	siteUrl: "http://www.google.com",
	stranice: [DefaultStranica],
	lang: "en"
}

const mapStateToProps = state => {
  return {
    lang: state.jezik
  }
}

export const Modal = connect(
  mapStateToProps,
  null
)(Moda)

export function Modal1({naslov="nema naslova...", jezik="nema...", naslovSize=18, slikaUrl="slika.jpg", modalID, panelNaslov="nema naslova...", panelNaslov1="nema naslova...", panelTekst="nema teksta...", siteUrl="http://www.google.com", stranice=[DefaultStranica]}) {
	const [sw, setSw] = React.useState(false);
	const [hoverSw, setHoverSw] = React.useState(false);  // za true hoveramo prozor, za false ne hoveramo
	const [poz, setPoz] = React.useState(0);
	const [dulj] = React.useState(stranice.length);
	const [slideSw, setSlideSw] = React.useState(true); // vremenska odgoda novog slida dok stari nije zavrsio
	const r = React.useRef();
	const r1 = React.useRef();
	const r2 = React.useRef();
	const r3 = React.useRef();
	const r4 = React.useRef();
	const r5 = React.useRef();
	
	
    React.useEffect(() => {
		r.current.style.backgroundImage = "url(" + slikaUrl + ")";
		r.current.style.backgroundRepeat = "no-repeat";
		r.current.style.backgroundSize = "cover";
		r.current.style.backgroundPosition = "center";
		
	}, [slikaUrl]);
	
	React.useEffect(() => {
	    if (sw) {
			r1.current.style.display = "block";
			r2.current.style.display = "block";
		} else {
			r1.current.style.display = "none";
			r2.current.style.display = "none";
		}
	}, [sw]);
	
	React.useEffect(() => {
		if (hoverSw) {
			r3.current.style.top = "0%";
			r3.current.style.opacity = "1";
			r4.current.style.top = "0%";
			r5.current.style.opacity = "0.5";
		} else {
			r3.current.style.top = "-50%";
			r3.current.style.opacity = "0";
			r4.current.style.top = "50%";
			r5.current.style.opacity = "0";
		}
		
	}, [hoverSw]);
		
	function otvori(e) {
		e.stopPropagation();
		setSw(true);
	}
	
	function zatvori(e) {
		e.stopPropagation();
		setSw(false);
	}
	
	function prethodna() {
		if (slideSw) {
		    let poz1 = poz - 1;
		    if (poz1 === -1)  poz1 = dulj-1;
		    
		    setTimeout(()=>{setSlideSw(true)}, 500);
		    setPoz(poz1);
		    setSlideSw(false);
		}
	}
	
	function sljedeca() {
		if (slideSw) {
		    let poz1 = poz + 1;
		    if (poz1 === dulj)  poz1 = 0;
		    setTimeout(()=>{setSlideSw(true)}, 500);
		    setPoz(poz1);
		    setSlideSw(false);
		}
	}
	
	return (
	    <div id={modalID} className="modal-link" ref={r} onMouseEnter={()=>{setHoverSw(true)}} onMouseLeave={()=>{setHoverSw(false)}}>
	        <div className="modal-nevidljivi" ref={r1} onClick={zatvori}>
	        </div>
	        <div className="modal" ref={r2}>
	             <div className="modal-slide">
	                 {stranice.length > 1 ? 
					     <>	 
	                         <div className="modal-slide-gumb-left" onClick={prethodna}>
	                             <IoIosArrowBack className="modal-slide-gumb-ikona"/>
	                         </div>
	                         <div className="modal-slide-gumb-right" onClick={sljedeca}>
	                             <IoIosArrowForward className="modal-slide-gumb-ikona"/>
	                         </div>
	                     </> : null
				     }
	                 
	                
	                 {stranice.map((el, index)=>{ 
						 if (poz === index) {
							 return React.createElement(el, {key:index, klasa:"modal-slide-trenutni"}, null);
					     } else if ( (poz === 0 && index === dulj-1) || poz === index+1) {
							 return React.createElement(el, {key:index, klasa:"modal-slide-prethodni"}, null);
					     } else {
							 return React.createElement(el, {key:index, klasa:"modal-slide-sljedeci"}, null);
						 }})
					 }
					 

	             </div>
	             <div className="modal-panel">
	                 <div className="modal-panel-el1">
	                     <p className="modal-panel-naslov">{panelNaslov}</p>
	                     <p className="modal-panel-naslov1">{panelNaslov1}</p>
                         <div className="modal-panel-crta"></div>    
	                 </div>
	                 <div className="modal-panel-el2">
	                     <p className="modal-panel-tekst">{panelTekst}</p>
	                 </div>
	                 
                     <div className="modal-panel-button" onClick={zatvori}>
                         <ImCross className="modal-panel-button-ikona"/>
                     </div>
                     <a href={siteUrl} className="modal-panel-link">VIEW SITE</a>
                     
	             </div>
	        </div>
	        
	        <div className="modal-plast" ref={r5}>
	        </div>
	        <div className="modal-naslov" ref={r3} style={{"fontSize": naslovSize}}>
	            <p className="modal-naslov-p1">{naslov}</p>
	            <p className="modal-naslov-p2">{jezik}</p>
	        </div>
	        <div className="modal-button" ref={r4} onClick={otvori}>LEARN MORE</div>
	    </div>
	    
	)
}

function dodajStilove(el, stilovi) {
	for (let key in stilovi) {
		el.style[key] = stilovi[key];
	}
}
