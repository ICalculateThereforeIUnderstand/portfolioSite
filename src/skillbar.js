import React from "react";


export class SkillBar extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			postotak: this.props.posto,
			height: this.props.height,
			width: this.props.width,
			tekst: this.props.tekst,
			toggleSw: false,
			toggleSw1: false,
			sw: this.props.sw,   /*za true imamo animirani indikator*/
			offsetSw: this.props.offsetSw  /*n je no-offset, l je left, r je right, animacija pomicanja Skillbara*/
		}
		
		this.timeRef = null;
		
		this.isElementInViewport = this.isElementInViewport.bind(this);
		this.toggle = this.toggle.bind(this);
		this.toggle1 = this.toggle1.bind(this);
		this.pozicija = this.pozicija.bind(this);
	}
	
	componentDidMount() {
		if (this.state.sw) {
			window.addEventListener("scroll", this.toggle);
			this.timeRef = setInterval(this.toggle, 400);
		}
		if (this.state.offsetSw == "l" || this.state.offsetSw == "r") {
			window.addEventListener("scroll", this.toggle1);
		} 
	}
	
	componentWillUnmount() {
		if (this.state.sw) {
			window.removeEventListener("scroll", this.toggle);
		}
		if (this.state.offsetSw == "l" || this.state.offsetSw == "r") {
			window.removeEventListener("scroll", this.toggle1);
		} 
		clearInterval(this.timeRef);
	}
	
	toggle1() {
		if (this.state.toggleSw1 == false  &&  this.isElementInViewport(this._r3)) {
			//console.log("Element je upravo usao u ekran " + Math.random());
			if (this.state.offsetSw != "n") {
				this._r1.style.left = "0%";
			} 
			this.setState({toggleSw1: true});
		} else if (this.state.toggleSw1  &&  this.isElementInViewport(this._r3) == false){
			//console.log("Element je upravo IZASAO iz ekrana " + Math.random());
			if (this.state.offsetSw != "n") {
				this._r1.style.left = this.pozicija(this.state.offsetSw);
			}
			this.setState({toggleSw1: false});
		}
	}
	
	toggle() {
		if (this.state.toggleSw == false  &&  this.isElementInViewport(this._r1)) {
			//console.log("Element je upravo usao u ekran " + Math.random());
			this._r2.style.width = this.state.postotak + "%";
			clearInterval(this.timeRef);
			this.setState({toggleSw: true});
		} else if (false && this.state.toggleSw  &&  this.isElementInViewport(this._r1) == false){
			//console.log("Element je upravo IZASAO iz ekrana " + Math.random());
			this._r2.style.width = "0%";
			this.setState({toggleSw: false});
		}
	}
	
	isElementInViewport(el) {
        var rect = el.getBoundingClientRect();

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
        );
    }
    
    pozicija(p) {
		if (p == "n") {
			return "0%";
		} else if (p == "l") {
			return "-100%";
		} else {
			return "100%";
		}
	}
	
	render() {
	    return (
	        <div ref={(e)=>this._r3 = e} className="skillbar" style={{"height": this.state.height, "width": this.state.width}}>
	            <div ref={(e)=>this._r1 = e} className="skillbar-cont" style={{"left": this.pozicija(this.state.offsetSw)}}>
	                <div ref={(e)=>this._r2 = e} className="skillbar-el1" style={{"width": this.state.sw ? "0%" : this.state.postotak+"%"}}>
	                </div>
	                <div className="skillbar-el2">
	                    <p>{this.state.postotak+"%"}</p>
	                </div>
	                <div className="skillbar-el3">
	                    <p>{this.state.tekst}</p>
	                </div>
	            </div>
	        </div>
	    )   
	}
}

SkillBar.defaultProps = {
	posto: 100,
	height: "30px",
	width: "100%",
	tekst: "nema...",
	sw: false,
	offsetSw: "n"
}

export function SkillBar1({height="30px", width="100%", posto=100, tekst="", sw=false}) {
	const [postotak, setPostotak] = React.useState(posto);
	
	let stil1 = {"height": height, "width": width}; 
		
	let stil2 = {"width": postotak + "%"};
			
	return (
	    <div className="skillbar" style={stil1}>
	        <div className="skillbar-el1" style={stil2}>
	        </div>
	        <div className="skillbar-el2">
	            <p>{postotak+"%"}</p>
	        </div>
	        <div className="skillbar-el3">
	            <p>{tekst}</p>
	        </div>
	    </div>
	);
}


