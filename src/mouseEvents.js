
export class mouseEvents {
    constructor({el1, el2=null, time=120, prevFun=defaultPrevFun, nextFun=defaultNextFun}) {
        this.el1 = el1;
        this.el2 = el2;
        this.time = time;
        this.sw = false;
        this.pozX = 0;
        this.hoverSw = this.hoverCapability("hoverTest");
            
        this.x1 = null;
        this.x2 = null;
        this.touchID = null;
        
        this.timeRef = null;
        this.prevFun = prevFun;
        this.nextFun = nextFun;
    
        this.postavi = this.postavi.bind(this);
        this.pritisni = this.pritisni.bind(this);
        this.otpusti = this.otpusti.bind(this);
        this.dogadaj = this.dogadaj.bind(this);
        this.dogadaj1 = this.dogadaj1.bind(this);
        this.hoveraj = this.hoveraj.bind(this);
        this.odhoveraj = this.odhoveraj.bind(this);
        this.hoverCapability = this.hoverCapability.bind(this);
        
        this.pritisniT = this.pritisniT.bind(this);
        this.otpustiT = this.otpustiT.bind(this);
        this.dogadajT = this.dogadajT.bind(this);
        this.dogadaj1T = this.dogadaj1T.bind(this);
    
    }
    
    postavi() {
		if (this.hoverSw) {
            this.el1.addEventListener("mousedown", this.pritisni);
            this.el1.addEventListener("mouseup", this.otpusti);
            this.el1.addEventListener("mouseleave", this.otpusti);
        } else {
            this.el1.addEventListener("touchstart", this.pritisniT);
            this.el1.addEventListener("touchend", this.otpustiT);
            this.el1.addEventListener("touchleave", this.otpustiT);			
			this.el1.addEventListener("touchcancel", this.otpustiT);
		}
        
        if (this.el2 !== null) {
            this.el2.addEventListener("mouseenter", this.hoveraj);
            this.el2.addEventListener("mouseleave", this.odhoveraj);
            this.el2.addEventListener("mousedown", this.odhoveraj);
            this.el2.addEventListener("mouseup", this.hoveraj);
        }
        
    }
        
    hoverCapability(id) {
    // ova funkcija provjerava da li uredaj ima hover sposobnosti, id je id testnog div elementa kojem media query mjenja boju ovisno o hover sposobnosti
	    if (window.getComputedStyle(document.querySelector("#"+id)).getPropertyValue("background-color") == "rgb(0, 0, 0)")  return true;
	    return false;
    }
    
    hoveraj() {
        this.el2.style.opacity = "1";
    }
    
    odhoveraj() {
        this.el2.style.opacity = "0";
    }
    
    ukloni() {
		if (this.hoverSw) {
            this.el1.removeEventListener("mousedown", this.pritisni);
            this.el1.removeEventListener("mouseup", this.otpusti);
            this.el1.removeEventListener("mouseleave", this.otpusti);
        } else {
            this.el1.removeEventListener("touchstart", this.pritisniT);
            this.el1.removeEventListener("touchend", this.otpustiT);
            this.el1.removeEventListener("touchleave", this.otpustiT);			
			this.el1.removeEventListener("touchcancel", this.otpustiT);			
		}
        if (this.el2 !== null) {
            this.el2.removeEventListener("mouseenter", this.hoveraj);
            this.el2.removeEventListener("mouseleave", this.odhoveraj);
            this.el2.addEventListener("mousedown", this.odhoveraj);
            this.el2.addEventListener("mouseup", this.hoveraj);
        }
    }
    
    pritisniT(e) {
		this.sw = true;
		this.x1 = e.changedTouches[0].pageX;
		this.touchID = e.changedTouches[0].identifier;
		this.timerRef = setTimeout(this.dogadajT, this.time);
	}
	
	otpustiT(e) {
		this.sw = false;
		clearTimeout(this.timerRef);
	}
	
	dogadajT() {
        this.el1.addEventListener("touchmove", this.dogadaj1T);
    }
    
    dogadaj1T(e) {
				
        this.x2 = e.changedTouches[0].pageX;
        if (!this.sw) return;
        if (this.x2 > this.x1 + 25) {
            this.el1.removeEventListener("touchmove", this.dogadaj1T);
            this.prevFun();
        } else if (this.x2 < this.x1 - 25) {
            this.el1.removeEventListener("touchmove", this.dogadaj1T);
            this.nextFun();
        }
    }
    
    pritisni(e) {
        this.sw = true;
        this.x1 = e.offsetX;
        
        this.el1.style.cursor = "col-resize";
        
        this.timerRef = setTimeout(this.dogadaj, this.time);
    }
    
    otpusti() {
        this.sw = false;
        this.el1.style.cursor = "auto";
        clearTimeout(this.timerRef);
    }
    
    dogadaj() {
        this.el1.addEventListener("mousemove", this.dogadaj1);
    }
    
    dogadaj1(e) {
        this.x2 = e.offsetX;
        if (!this.sw) return;
        if (this.x2 > this.x1 + 25) {
            this.el1.removeEventListener("mousemove", this.dogadaj1);
            this.prevFun();
        } else if (this.x2 < this.x1 - 25) {
            this.el1.removeEventListener("mousemove", this.dogadaj1);
            this.nextFun();
        }
    }
}

function defaultPrevFun() {
	console.log("Kliknuo si za pomak nalijevo... " + Math.random());
	
}

function defaultNextFun() {
	console.log("Kliknuo si za pomak nadesno... " + Math.random());
}
