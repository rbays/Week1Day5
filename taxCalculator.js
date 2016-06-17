//define objects in the DOM
var grossInput = document.getElementById("grossInput"),
	calculateButton = document.getElementById("calculateButton"),
	outputArea = document.getElementById("outputArea"),
	grossOutput = document.getElementById("grossOutput"),
	taxOutput = document.getElementById("taxOutput"),
	netOutput = document.getElementById("netOutput");

//calculate tax on button click
calculateButton.addEventListener('click',calculateTax,false);
//calculate tax on enter key
grossInput.addEventListener('keypress',function (event) {
	var key = event.which;
	if (key === 13){
		calculateTax();
	}
}
							,false);

function calculateTax(){
	if (grossInput.value != ""){
		//define variable for calculations
	var allowance = 11000,
		fortyThreshold = 43000,
		taxTwentyAmount = 0,
		taxFortyAmount = 0,
		gross = Math.round(parseFloat(grossInput.value) * 100 ) /100,
		tax = 0,
		net = 0;
	
		//Under allowance
	if (gross <= allowance){
	}
		//20% tax only
	else if (gross <= fortyThreshold){
		net += allowance;
		taxTwentyAmount = gross - allowance;
		tax = Math.round((0.2 * taxTwentyAmount)*100) /100;
	}
		//some 40%
	else {
		taxFortyAmount = gross - fortyThreshold;
		taxTwentyAmount = fortyThreshold - allowance;
		tax = Math.round((0.2 * taxTwentyAmount)*100) /100;
		tax += Math.round((0.4 * taxFortyAmount)*100) /100;
	} 
			
	net = Math.round((gross - tax) * 100) / 100;//rounded to avoid floating point errors
	grossOutput.innerHTML = "£" + gross;
	taxOutput.innerHTML = "£" + tax;
	netOutput.innerHTML = "£" + net;
	outputArea.style.display = "block";
	}
}