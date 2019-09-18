
# Pomodoro Clock

A simple Pomodoro productivity timer

![(pomodoro.png)](./pomodoro.png)

## Built With

- [React](https://github.com/facebook/create-react-app) - `create-react-app` to scaffold the project
- [accurateInterval](https://gist.github.com/Squeegy/1d99b3cd81d610ac7351) - A `setTimeout` that doesn't lag behind

## Challenges

- `setTimeout` doesn't fire up at the exact provided time. There's always a lag - be it `1ms` or `10ms` or more, which can add up to great shift in actual time if run for a longer interval of time. Thus, we compensate it with the lag itself. Say, we need  to timeout at `1s` or `1000ms` interval and the timeout lags by `14ms`, the next timeout will run after 1000 - 14 = `986ms`

## Acknowledgements
[Animating circle](https://jsfiddle.net/alkhoo/JwkYm/15/)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.