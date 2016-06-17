//define objects in the DOM
var grossInput = document.getElementById("grossInput"),
	calculateButton = document.getElementById("calculateButton"),
	outputArea = document.getElementById("outputArea"),
	grossOutput = document.getElementById("grossOutput"),
	taxOutput = document.getElementById("taxOutput"),
	//netOutput = document.getElementById("netOutput"),
	marriedCheck = document.getElementById("marriedCheck"),
	//allowanceOutput = document.getElementById("allowanceOut"),
	//marriageOutput = document.getElementById("marriageOut"),
	niOutput = document.getElementById("niOutput"),
	totalTakehome = document.getElementById("totalTakehome");

//calculate tax on button click
calculateButton.addEventListener('click',calculateDeductions,false);
//calculate tax on enter key
grossInput.addEventListener('keypress',function (event) {
	var key = event.which;
	if (key === 13){
		calculateDeductions();
	}
}
							,false);

//define variable for calculations
var allowance = 11000,
	lowerAllowance = 100000,
	noAllowance = noAllowance + 2 * lowerAllowance,
	fortyThreshold = 32000,
	fortyFiveThreshold = 150000,
	marriageAllowance = 1100,
	lowerMarriageAllowance = 27700,
	noMarriageAllowance = lowerMarriageAllowance + 2 * marriageAllowance,
	NiLel = 5824,
	NiMidRate = 0.12,
	NiHighRate = 0.02,
	NiUel = 43004,
	taxTwentyAmount = 0,
	taxFortyAmount = 0,
	taxFortyFiveAmount = 0,
	tax = 0,
	gross = 0,
	net = 0,
	Ni = 0,
	taxable = 0;

function calculateDeductions(){
	if (grossInput.value != ""){
		
		//reset variables for calculations
	window.allowance = 11000;
	window.marriageAllowance = 1100;
	window.taxTwentyAmount = 0;
	window.taxFortyAmount = 0;
	window.taxFortyFiveAmount = 0;
	window.gross = Math.round(parseFloat(grossInput.value) * 100 ) /100;
	window.tax = 0;
	window.Ni = 0;
	window.taxable = 0;
	window.net = window.gross;
	
	
	calculateNi();
	calculateTax();
	
		
	function calculateTax(){
	
		calculateTaxAllowance();
		
		var remaining = window.taxable;
	if (remaining >= fortyFiveThreshold){
		window.tax += (remaining - fortyFiveThreshold) * 0.45;
		remaining = fortyFiveThreshold;
	}
	if (remaining >= fortyThreshold){
		window.tax += (remaining-fortyThreshold) * 0.4;
		remaining = fortyThreshold;
	}
		window.tax += remaining * 0.2;
		window.net -= window.tax;
	}
		
		//sets Ni value and lowers net value by that amount, does not change global gross value (hopefully)
	function calculateNi(){
		var NiGross = gross;
		if (NiGross >= NiUel){
			Ni += (NiGross - NiUel) * NiHighRate;
			NiGross = NiUel;
		}
		if (NiGross > NiLel){
			Ni += (NiGross - NiLel) * NiMidRate;
		}
		window.Ni = Math.round(Ni * 100) / 100;
		window.net -= window.Ni;	 
	}		
		
		//sets tax allowancees and lowers gross accordingly 
	function calculateTaxAllowance(){
		if (gross >= noAllowance){
			window.allowance = 0;
		}
		else if (gross <= allowance){
			allowance = gross;
		}
		else if (gross <= lowerAllowance){
		}
		else{
			window.allowance -= (gross-lowerAllowance) / 2;
		}
		
		if ((marriedCheck.checked === false) || gross >= noMarriageAllowance){
			window.marriageAllowance = 0
		}
		else if (window.gross <= lowerMarriageAllowance){
		}
		else {
			window.marriageAllowance -= (window.gross - window.lowerMarriageAllowance) / 2;
		}
		window.taxable = window.gross - (window.marriageAllowance + window.allowance);
	}	
	
	//rounded to avoid floating point errors
	window.tax = Math.round(tax * 100) / 100;		
	window.net = Math.round((gross - tax - marriageAllowance-allowance) * 100) / 100;
		
	grossOutput.innerHTML = "£" + window.gross;
	taxOutput.innerHTML = "£" + window.tax;
	niOutput.innerHTML = "£" + window.Ni;
	//netOutput.innerHTML = "£" + window.net;
	//allowanceOutput.innerHTML = "£" + (window.allowance);
	//marriageOutput.innerHTML = "£" + window.marriageAllowance;
	totalTakehome.innerHTML = "£" + (Math.round((net + allowance + marriageAllowance -Ni) * 100) /100);
	outputArea.style.display = "block";
	}
}