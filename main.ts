radio.setGroup(6);
let turbineIsRunning = false
basic.showIcon(IconNames.Happy)
let turbineOnTime = 0
let turbineTimeout = 15000 // 15 sec timeout
let lightsOn= false
let lightsOnTimeout = 10000
let lightsOnTime = 0
let onDuration = 100
let lightsPin = DigitalPin.P0

input.onButtonPressed(Button.A, function () {
    activateLights()
})


function activateLights() {
    lightsOn = !lightsOn
    lightsOnTime = input.runningTime()
    pins.digitalWritePin(lightsPin, 1)
    led.toggleAll();
    basic.pause(onDuration)
    led.toggleAll();
    pins.digitalWritePin(lightsPin, 0)
}

radio.onReceivedString(function (receivedString: string) {
    if (receivedString == "Lys på") {
        activateLights()
        lightsOnTime = input.runningTime()
    } else if (receivedString == "Lys av") {
        win()
        activateLights()
    } else if (receivedString == "reset") {
        control.reset()
    }
})

function win() {
    radio.sendString("S")
}

basic.forever(function() {
  if(lightsOn){
      led.plot(0,0)
      if (input.runningTime() > lightsOnTime + lightsOnTimeout) {
          activateLights()
      }
  } else {
      led.unplot(0,0)
  }
})
