import React from "react";

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


