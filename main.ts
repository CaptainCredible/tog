radio.setGroup(6);
let turbineIsRunning = false
basic.showIcon(IconNames.Happy)
let turbineOnTime = 0
let turbineTimeout = 15000 // 15 sec timeout
let lightsOn= false
let lightsOnTimeout = 10000
let lightsOnTime = 0
let onDuration = 200
let lightsPin = DigitalPin.P0

input.onButtonPressed(Button.A, function () {
    activateLights(1)
    lightsOn = true
})


function activateLights(onOrOff: number) {
    pins.digitalWritePin(lightsPin, onOrOff)
    led.toggleAll();
    basic.pause(onDuration)
    led.toggleAll();
    pins.digitalWritePin(lightsPin, onOrOff)
}

radio.onReceivedString(function (receivedString: string) {
    if (receivedString == "Lys på") {
        activateLights(1)
        lightsOn= true
        lightsOnTime = input.runningTime()
    } else if (receivedString == "Lys av") {
        win()
        lightsOn = false
        activateLights(0)
    } else if (receivedString == "reset") {
        control.reset()
    }
})

function win() {
    radio.sendString("S")
}

basic.forever(function() {
  if(lightsOn){
      if (input.runningTime() > lightsOnTime + lightsOnTimeout) {
          lightsOn = false
          pins.digitalWritePin(lightsPin, 0)
      }
  }
})
