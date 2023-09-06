var shibas = 0
var shibaRate = 0

// Every item in the game
// TODO: items should be part of the Game variable
var items = [
  {
    "name": "item_oldCalculator",
    "price": "0.0000001"
  },
  {
    "name": "item_oldCpu",
    "price": "0.00000125"
  },
  {
    "name": "item_oldComputerFromGrandpa",
    "price": "0.00003"
  },
  {
    "name": "item_rapsberrypy",
    "price": "0.00005"
  },
  {
    "name": "item_smartphone",
    "price": "0.0005"
  },
  {
    "name": "item_middleClassPC",
    "price": "0.0015"
  },
  {
    "name": "item_cheapServer",
    "price": "0.004"
  },
  {
    "name": "item_gamingPC",
    "price": "0.015"
  },
  {
    "name": "item_cheapMiner",
    "price": "0.05"
  },
  {
    "name": "item_highEndUltraPC",
    "price": "0.15"
  },
  {
    "name": "item_bigMiner",
    "price": "1.5"
  },
  {
    "name": "item_miningFarm",
    "price": "250"
  },
  {
    "name": "item_nasaPC",
    "price": "5000"
  },
  {
    "name": "item_quantumRig",
    "price": "245000"
  },
  {
    "name": "item_miningFarmSpace",
    "price": "2000000"
  },
  {
    "name": "item_miningFarmMoon",
    "price": "75500000"
  },
  {
    "name": "item_bitcoinTimeMachine",
    "price": "975000000"
  },
  {
    "name": "item_blackHolePoweredMiner",
    "price": "750000000000"
  }
]

// Rate is null (at the beginning)
var bSec = null;

// If there is no shibas Item in the localStorage, create one.
// If there is one, do the other thing.
if(localStorage.getItem("shibas") === null){
  // Shibas are 0
  shibas = 0

  // Set the localStorage Item for the first time
  localStorage.setItem("shibas", "0");

  // Write the current amount of Shibas on the page
  $(".shibaAmount").text(shibas.toFixed(8))

}else{

  // Get the amount of Shibas and parse them to a float number
  shibas = parseFloat(localStorage.getItem("shibas"))

  $(".shibaAmount").text("loading...")
  $(".crystalAmount").text("loading...")

  let crystals = shibas * 100000000;

}

/**
 *
 *  <-- Setting up the game´s functions -->
 *
 */



// Game variable which will contain any needed major function or needed variables for the game.
var Game = {}


// Every constant variable is saved here
Game.GameConst = {
  "priceMultiplier": 2,
  "VERSION": "NORMAL"
}

Game.units = [
      "Million",
      "Billion",
      "Trillion",
      "Quadrillion",
      "Quintillion",
      "Sextillion",
      "Septillion",
      "Octillion",
      "Nonillion",
      "Decillion",
      "Undecillion",
      "Duodecillion",
      "Tredecillion",
      "Quattuordecillion",
      "Quindecillion",
      "Sexdecillion",
      "Septdecillion",
      "Octodecillion",
      "Novemdecillion",
      "Vigintillion",
      "Unvigintillion",
      "Duovigintillion",
      "Trevigintillion",
      "Quattuorvigintillion",
      "Quinvigintillion",
      "Sexvigintillion",
      "Septvigintillion",
      "Octovigintillion",
      "Novemvigintillion",
      "Trigintillion"
]



/**
 * Calculating every price for the items when the game was started (and if there are any items).
 *
 * @param element {HTMLElement} - The HTML element of the item on the game page
 * @param price {Number} - The price of the item, got from the items Object
 * @param itemAmount {Number} - The current amount of the item, saved in the localStorage
 */

Game.setPriceAtGameBeginning = function (element, price, itemAmount) {

  // Calculation of the price
  var multiplier = Game.GameConst.priceMultiplier

  // Calculate the new price -> price * multiplier^itemAmount
  var calculation = (parseFloat(price) * Math.pow(multiplier, parseInt(itemAmount))).toFixed(8)

  // Showing the actual price
  element.children()[2].textContent = calculation + " Shibas"

  // Set the data-price attribute with the new price
  element.attr("data-price", calculation.toString())

}



/**
 * Function to increase the amount of the item (in the localStorage) with the specific identifier.
 *
 * @param id - The identifier of the item (the id from the list element)
 */
Game.itemAction = function (id) {

  var item = id
  var itemAmount = 0;

  if(localStorage.getItem(item) === null){
    localStorage.setItem(item, "1");
  }else{
    itemAmount = parseInt(localStorage.getItem(item))

    localStorage.setItem(item, "" + (itemAmount + 1) + "");

  }

}



/**
 * Calculating the Shibas per Second - rate when the page was opened.
 *
 */
Game.setShibaPerSecondRateAtBeginning = function () {

  for(var i = 0; i < items.length; i++){
    if(localStorage.getItem(items[i].name) === null){
      localStorage.setItem(items[i].name, "0")
    }else{
      // HTML element on the game page
      var $element = $("#" + items[i].name)

      // Amnount of the item
      var itemAmount = localStorage.getItem(items[i].name)

      // Writing the amount on the page at the item´s element
      $element.children()[0].textContent = itemAmount

      // Only calculate the new price if there is more than 0 items.
      // If there are not enough items, it will just continue, and if there are,
      // it will execute the function and continue after it as well.
      if(itemAmount > 0) {
        Game.setPriceAtGameBeginning($element, parseFloat(items[i].price), parseInt(itemAmount))
      }

      // Getting the data-bits-per-sec attribute, needed for calculating the shiba/sec rate
      var bits_per_sec = $element.attr("data-bits-per-sec")
      itemAmount = parseInt(itemAmount)

      // The rate before
      var before = shibaRate

      // Calculating the rate
      shibaRate = shibaRate + (itemAmount * bits_per_sec)

      // Logging the calculation in the console
      console.log("i = " + i + " | B/sec before: " + before.toFixed(8) +
        " - Calculation made: " + before.toFixed(8) + " + (" + itemAmount + " * " + bits_per_sec + ") = " +  shibaRate.toFixed(8) +
        " | New B/sec at " + shibaRate.toFixed(8))
    }
  }

}



/**
 * Function which sets a new "Shiba per Second" rate
 *
 * @param rate - The number which must be added to the current Shiba per Second - rate
 * @returns {Number} - Returning the new Shiba per Second - rate
 */
Game.setNewShibaRate = function (rate) {

  // Logging the new Shiba per second rate
  console.log("setNewShibaRate -> New rate: " + (shibaRate + rate).toFixed(8) )

  // Showing the new rate on the page
  // Rounding at specific values
  if((shibaRate + rate) >= 1000000) {
    $(".bSecRateNumber").text((shibaRate + rate).toFixed(0).optimizeNumber())
  }else if((shibaRate + rate) >= 1000 ){
    $(".bSecRateNumber").text((shibaRate + rate).toFixed(0))
  }else if((shibaRate + rate) >= 1 ){
    $(".bSecRateNumber").text((shibaRate + rate).toFixed(2))
  }else{
    $(".bSecRateNumber").text((shibaRate + rate).toFixed(8))
  }

  // Returning the new rate
  return shibaRate = shibaRate + rate;

}



/**
 * This function will check if there is any change in the localStorage,
 * especially looking at the item amount. So it will actually calculate every price again and
 * again. (This function should be recoded)
 *
 * TODO: Find a better way for setting the price after an item was bought.
 */
Game.setNewPrice = function()
{
  // for-loop for getting the price multiplier and to calculate the new price
  for(var i = 0; i < items.length; i++){
    if(localStorage.getItem(items[i].name) === null){
      localStorage.setItem(items[i].name, "0")
    }else{
      var $element = $("#" + items[i].name)
      var itemAmount = localStorage.getItem(items[i].name)

      $element.children()[0].textContent = itemAmount

      // Only calculate if there is more than 0 items
      if(itemAmount > 0) {

        // Calculation of the price
        var multiplier = Game.GameConst.priceMultiplier
        var calculation = (parseFloat(items[i].price) * Math.pow(multiplier, parseInt(itemAmount))).toFixed(8)

        // Showing the actual price
        $element.children()[2].textContent = calculation + " Shibas"

        // Set the data-price attribute with the new price
        $element.attr("data-price", calculation.toString())

      }
    }
  }
  // End of the for-loop
}

/**
 * The function which adds new generated Shibas to the current Shiba amount.
 *
 * @param rate - The Shiba per second rate; Needed for adding the generated Shibas every second
 */
Game.bSecFunction = function (rate) {

  shibas = shibas + rate

  // Show both values on the page
  // Rounding the shiba number at specific set values
  if(shibas > 1000000){

    let shibaUnitNumber = shibas.optimizeNumber()

    $(".shibaAmount").text(shibaUnitNumber)
  }else if(shibas >= 1000){
    $(".shibaAmount").text(shibas.toFixed(0))
  }else if(shibas >= 1){
    $(".shibaAmount").text(shibas.toFixed(2))
  }else{
    $(".shibaAmount").text(shibas.toFixed(8))
  }


  // Rounding the crystals amount at a specific value and optimize it for displaying on the screen.
  var crystals = shibas * 100000000;

  if(crystals < 1000000) {
    $(".crystalAmount").text(Math.round(crystals))
  }else{

    let crystalUnitNumber = crystals.optimizeNumber()
    $(".crystalAmount").text(crystalUnitNumber)
  }

  // Save shiba amount in the storage
  localStorage.setItem("shibas", "" + shibas + "")

  console.log("bSec -> B/sec at " + rate.toFixed(8))

}

/**
 * Stops the B/sec interval.
 */
Game.stopBsec = function () {
  clearInterval(bSec)
}

/**
 * Function for optimizing the number with an unit for displaying it on the screen.
 *
 * @returns {string} An optimized number as a string with its unit
 */
Game.optimizeNumber = function () {
  if(this >= 1e6){
    let number = parseFloat(this)
    let unit = Math.floor(parseFloat(number.toExponential(0).toString().replace("+", "").slice(2)) / 3) * 3

    // let test = this.toExponential(0).toString().replace("+", "").slice(2)
    // console.log(test)

    var num = (this / ('1e'+(unit))).toFixed(2)

    var unitname = Game.units[Math.floor(unit / 3) - 1]

    return num + " " + unitname
  }

  return this.toLocaleString()
}

Number.prototype.optimizeNumber = Game.optimizeNumber
String.prototype.optimizeNumber = Game.optimizeNumber

/**
 * Resets the game
 */
Game.resetGame = function () {
  Game.stopBsec()
  localStorage.setItem("shibas", "0")
  localStorage.clear()
  location.reload()
}

// --------------------------------------------------- //

/**
 * <-- Now doing everything -->
 */


// Calculates the Shiba/sec rate with the amount of every item multiplied with their given Shibas/second rate.
Game.setShibaPerSecondRateAtBeginning()

// Stating the interval with the calculated Shiba/second rate.
bSec = setInterval(function () {
  Game.bSecFunction(shibaRate);
}, 1000)


// Doing everything here when the game is ready to be used.
$(document).ready(function () {

  // Write the version into the .version span element
  $(".version").text("Version " + Game.GameConst.VERSION)

  // Write the shiba per second rate into the .bSecRateNumber span element
  if(shibaRate >= 1000){
    $(".bSecRateNumber").text(shibaRate.toFixed(0))
  }else if(shibaRate >= 1 ){
    $(".bSecRateNumber").text(shibaRate.toFixed(2))
  }else{
    $(".bSecRateNumber").text(shibaRate.toFixed(8))
  }


  // If clicked on the big Shibas
  $(".shiba").click(function () {

    // Add 1^-8 Shibas (equal to 1 crystal)
    shibas = shibas + 0.00000001

    // Show the new number on the page
    if(shibas > 1000000){

      let shibaUnitNumber = shibas.optimizeNumber()
      $(".shibaAmount").text(shibaUnitNumber)

    }else if(shibas >= 1000){
      $(".shibaAmount").text(shibas.toFixed(0))
    }else if(shibas >= 1){
      $(".shibaAmount").text(shibas.toFixed(2))
    }else{
      $(".shibaAmount").text(shibas.toFixed(8))
    }

    if((shibas * 100000000) < 1000000) {
      $(".crystalAmount").text(Math.round((shibas * 100000000)))
    }else{

      let crystalUnitNumber = (shibas * 100000000).optimizeNumber()
      $(".crystalAmount").text(crystalUnitNumber)
    }

    // Save the new amount of Shibas in the localStorage storage
    localStorage.setItem("shibas", "" + shibas + "")

  });


  // If any item from the list was clicked...
  $(".purchaseItem").click(function () {

    // Get following attributes and children elements

    // id of the item
    var id = $(this).attr("id")

    // The price attribute as a float number
    var price = parseFloat($(this).attr("data-price"))

    // The b/sec attribute from the item as a float number
    var shibasPerSecond = parseFloat($(this).attr("data-bits-per-sec"))

    // The element which shows how many of the item is existing
    var amountDisplay = $(this).children()[0]
    var amountDisplayAmount = parseInt(localStorage.getItem(id))

    var priceDisplay = $(this).children()[2]

    // If you have enough Shibas, it´ll buy one item
    if(parseFloat(shibas.toFixed(8)) >= price){

      // Substract the price from the current Shibas number and set it to the shibas variable.
      shibas = parseFloat(shibas.toFixed(8)) - price

      // Save the new amount of Shibas in the localStorage storage
      localStorage.setItem("shibas", "" + shibas + "")

      // Changing amount number on the right of the item
      amountDisplayAmount = amountDisplayAmount + 1
      amountDisplay.textContent = amountDisplayAmount.toString()

      // Changing the Shibas amount
      // Rounding the Shiba number at specific values
      if(shibas > 1e6){

        let shibaUnitNumber = shibas.optimizeNumber()
        $(".shibaAmount").text(shibaUnitNumber)

      }else if(shibas >= 1000){
        $(".shibaAmount").text(shibas.toFixed(0))
      }else if(shibas >= 1){
        $(".shibaAmount").text(shibas.toFixed(2))
      }else{
        $(".shibaAmount").text(shibas.toFixed(8))
      }

      // Calculation the Crystals amount
      if((shibas * 100000000) < 1e6) {
        $(".crystalAmount").text(Math.round((shibas * 100000000)))
      }else{

        let crystalUnitNumber = (shibas * 100000000).optimizeNumber()
        $(".crystalAmount").text(crystalUnitNumber)

      }

      // Increasing the amount of the specific item
      Game.itemAction(id)

      // Stops the interval
      Game.stopBsec()

      // Setting a new price and show it
      Game.setNewPrice()

      // Saving the new calculated Bitcoin/second rate in a variable
      var newRate = Game.setNewShibaRate(shibasPerSecond)

      // Restarting the interval with the new rate
      bSec = setInterval(function () {
        Game.bSecFunction(newRate);
      }, 1000)

    }

  })

  //
  // If the reset button was pressed, do following thing
  $(".resetButton").click(function () {
    Game.resetGame()
  })

});

function startTime() {
    var today = new Date();
    var hr = today.getHours();
    var min = today.getMinutes();
    var sec = today.getSeconds();
    ap = (hr < 12) ? "<span>AM</span>" : "<span>PM</span>";
    hr = (hr == 0) ? 12 : hr;
    hr = (hr > 12) ? hr - 12 : hr;
    //Add a zero in front of numbers<10
    hr = checkTime(hr);
    min = checkTime(min);
    sec = checkTime(sec);
    document.getElementById("clock").innerHTML = hr + ":" + min + ":" + sec + " " + ap;
    
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var curWeekDay = days[today.getDay()];
    var curDay = today.getDate();
    var curMonth = months[today.getMonth()];
    var curYear = today.getFullYear();
    var date = curWeekDay+", "+curDay+" "+curMonth+" "+curYear;
    document.getElementById("date").innerHTML = date;
    
    var time = setTimeout(function(){ startTime() }, 500);
}
function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

