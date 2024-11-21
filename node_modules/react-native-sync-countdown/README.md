# react-native-sync-countdown
Synchronize countdown timer for the whole project

# Why need this Library?
Normally we can achieve counter/timer/countdown by using react state and side effect but the problem is when we "must" have countdown to the whole app then re-render managment become terror nightmare by using callback instend of state now we have control which component should be re-rendering.

# Note
Feel free to just copy or modify these code and since it was just class file it might work on any javascript app 

## Installation

```sh
npm install react-native-sync-countdown
```

```sh
yarn add react-native-sync-countdown
```

## Usage

```js
import { CountDown } from 'react-native-sync-countdown';

// ...

const countDown = CountDown
  
useEffect(() => {
  countDown.setTimer(60000)

  countDown.getTimer((timer) => {
    console.log('get timer every 1 sec', timer)
  })

  countDown.getTimerOnEnd(() => {
    console.log('timer end',)
  })

  return () => countDown.resetTimer()
}, [])
  
```

## setTimer
Set duration for countdown and also start timer
```js
countDown.setTimer(60000) // in miliseconds
```

## getTimer
getTimer will be trigger every 1 second
```js
countDown.getTimer((timer) => {
  console.log('get timer every 1 sec', timer)
})
```

## getTimerOnEnd
getTimerOnEnd will be trigger once duration is 0
```js
countDown.getTimerOnEnd(() => {
  console.log('timer end',)
})
```

## resetTimer
Stop and set duration to 0
```js
countDown.resetTimer()
```
  
## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
