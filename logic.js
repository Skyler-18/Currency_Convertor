//ESTABLISHING DOM CONNECTION WITH HTML FILE
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const currAPI_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const mssg = document.querySelector(".mssg");

//MAIN RUNNING FUNCTION
for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;

        //SELECTING FROM DROPDOWN VALUE TO USD AND TO DROPDOWN VALUE TO INR
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }

        select.append(newOption);
    }

    //ADDING EVENT LISTENER AND CALLING FUNCTION TO CHANGE FLAGS
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

//UPDATING FLAG USING API CALL
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let flagLink = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = flagLink;
};

//PREVENTING RELOAD ON CLICK OF BUTTON AND UPDATING MESSAGE ACCORDING TO EXCHANGE RATE
btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

const updateExchangeRate = async () => {
    let amount = document.querySelector("input");
    let amtVal = amount.value;
    if (amtVal === "" | amtVal <= 0) {
        amtVal = 1;
        amount.value = "1";
        alert("Invalid values automatically change to 1");
    }

    const URL = `${currAPI_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let exchRate = data[toCurr.value.toLowerCase()];
    
    let finalRate = amtVal * exchRate;
    mssg.innerText = `${amtVal} ${fromCurr.value} = ${finalRate} ${toCurr.value}`;
};


//CALLING UPDATE EXCHANGE RATE FUNCTION ON ITS RELOAD ITSELF TO DISPLAY CORRECT CONVERSTION OF USD TO INR BY DEFAULT.
//WE ARE INVOKING THE FUNCTION BY AN ANONYMOUS ARROW FUNCTION BECAUSE WHEN WE NEED TO PASS THE ARGUMENTS WHILE INVOKING THE FUNCTION, DIRECTLY CALLING IT USING CALLBACK THROWS AN ERROR, SO MAKING A HABIT TO PASS A FUNCTION THIS WAY IS A GOOD HABIT.
// window.addEventListener("load", updateExchangeRate);
window.addEventListener("load", () => {
    updateExchangeRate();
})