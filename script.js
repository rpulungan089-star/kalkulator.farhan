const display = document.getElementById("display");
const preview = document.getElementById("preview");

/* INPUT */
function appendValue(value){

    if(display.value === "0" && value !== "."){
        display.value = value;
    }else{
        display.value += value;
    }

    updatePreview();
}

/* FORMAT ANGKA */
function formatNumber(num){

    return parseFloat(num.toFixed(10));
}

/* UPDATE PREVIEW */
function updatePreview(){

    try{

        let expression = display.value.replace(/%/g,"/100");

        let result = eval(expression);

        result = formatNumber(result);

        if(
            result !== undefined &&
            !isNaN(result) &&
            display.value !== result.toString()
        ){

            preview.innerText = result;

        }else{

            preview.innerText = "";

        }

    }catch{

        preview.innerText = "";

    }
}

/* CLEAR */
function clearDisplay(){

    display.value = "0";
    preview.innerText = "0";
}

/* BACKSPACE */
function backspace(){

    if(display.value.length === 1){

        display.value = "0";

    }else{

        display.value = display.value.slice(0,-1);
    }

    updatePreview();
}

/* PLUS MINUS */
function toggleSign(){

    if(display.value.startsWith("-")){

        display.value = display.value.substring(1);

    }else if(display.value !== "0"){

        display.value = "-" + display.value;
    }

    updatePreview();
}

/* CALCULATE */
function calculate(){

    try{

        let expression = display.value.replace(/%/g,"/100");

        let result = eval(expression);

        result = formatNumber(result);

        if(isNaN(result)){

            display.value = "Error";
            preview.innerText = "";

        }else{

            display.value = result;
            preview.innerText = "";
        }

    }catch{

        display.value = "Error";
        preview.innerText = "";
    }
}

/* KEYBOARD SUPPORT */
document.addEventListener("keydown",(e)=>{

    const key = e.key;

    if(!isNaN(key) || ['+','-','*','/','.','%'].includes(key)){
        appendValue(key);
    }

    if(key === "Enter"){
        calculate();
    }

    if(key === "Backspace"){
        e.preventDefault();
        backspace();
    }

    if(key === "Escape"){
        clearDisplay();
    }
});