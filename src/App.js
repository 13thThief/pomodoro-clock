import React from 'react';
import './App.css';

// accurateIterval - https://gist.github.com/Squeegy/1d99b3cd81d610ac7351
let accurateInterval = function(fn, time) {
  let nextAt = new Date().getTime() + time;
  let timeout = null;
  let wrapper = function() {
    nextAt += time;
    timeout = setTimeout(wrapper, nextAt - new Date().getTime());
    return fn();
  };
  let cancel = function() {
    return clearTimeout(timeout);
  };
  timeout = setTimeout(wrapper, nextAt - new Date().getTime());
  return {
    cancel
  };
};

const defaultState = {
  sessionLength: 25,
  breakLength: 5,
  timerRunning: false,
  timerLabel: 'Session',
  timer: 1500,
  timerID: null
};

const minLength = 1;
const maxLength = 60;

let pomodoroCircle;
let circle;
let angle = 360;
let angleIncrement;

class Label extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id={this.props.id} className='label'>
        <div className='label-title'>{this.props.title}</div>
        <button
          id={this.props.decID}
          value='decrease'
          onClick={this.props.onClick}
        >
          <i className='fas fa-chevron-down fa-2x' />
        </button>
        <span id={this.props.lengthID}>{this.props.length}</span>
        <button
          id={this.props.incID}
          value='increase'
          onClick={this.props.onClick}
        >
          <i className='fas fa-chevron-up fa-2x' />
        </button>
      </div>
    );
  }
}

class Timer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id='timer'>
        <div id='timer-display'>
          <div id='timer-label'>{this.props.timerLabel}</div>
          <div id='time-left'>{this.props.timeLeft}</div>
        </div>
        <div id='timer-control'>
          <button id='start_stop' onClick={this.props.startStop}>
            <i
              className={
                'fas ' +
                (this.props.timerRunning ? 'fa-pause' : 'fa-play') +
                ' fa-2x'
              }
            />
          </button>
          <button id='reset' onClick={this.props.reset}>
            <i className='fa fa-refresh fa-2x' />
          </button>
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    this.audioRef = React.createRef();
  }

  reset = () => {
    this.state.timerID && this.state.timerID.cancel();
    pomodoroCircle && pomodoroCircle.cancel();
    this.setState(defaultState);
    this.audioRef.current.pause();
    this.audioRef.current.currentTime = 0;

    angle = 360;
    circle.setAttribute('stroke-dasharray', angle + ', 20000');
  };

  handleCount = e => {
    if (this.state.timerRunning) return;
    if (e.currentTarget.value === 'increase') this.incrementTimer(e);
    else this.decrementTimer(e);
  };

  incrementTimer = e => {
    if (e === undefined) {
      this.setState({
        timer: this.state.timer - 1
      });
      return;
    }

    switch (e.currentTarget.id) {
      case 'break-increment':
        if (this.state.breakLength === maxLength) return;
        this.setState({
          breakLength: this.state.breakLength + 1,
          timer: (this.state.breakLength + 1) * 60
        });
        break;
      case 'session-increment':
        if (this.state.sessionLength === maxLength) return;
        this.setState({
          sessionLength: this.state.sessionLength + 1,
          timer: (this.state.sessionLength + 1) * 60
        });
        break;
    }
  };

  decrementTimer = e => {
    if (e === undefined) {
      this.setState({
        timer: this.state.timer - 1
      });

      circle.setAttribute('stroke-dasharray', angle + ', 20000');

      angle -= angleIncrement;
      return;
    }

    switch (e.currentTarget.id) {
      case 'break-decrement':
        if (this.state.breakLength === minLength) {
          return;
        }
        this.setState({
          breakLength: this.state.breakLength - 1,
          timer: (this.state.breakLength - 1) * 60
        });
        break;
      case 'session-decrement':
        if (this.state.sessionLength === minLength) return;
        this.setState({
          sessionLength: this.state.sessionLength - 1,
          timer: (this.state.sessionLength - 1) * 60
        });
        break;
    }
  };

  startStop = () => {
    if (!this.state.timerRunning) {
      this.setState({
        timerRunning: true
      });
      angleIncrement = 360 / this.state.timer;
      this.countDown();
    } else {
      this.setState({
        timerRunning: false
      });
      this.state.timerID && this.state.timerID.cancel();
      angleIncrement = 360 / this.state.timer;
    }
  };

  countDown = () => {
    this.setState({
      timerID: accurateInterval(() => {
        this.decrementTimer();
        if (this.state.timer < 0) this.changeTimer();
      }, 1000)
    });
  };

  changeTimer = () => {
    this.audioRef.current.play();
    if (this.state.timerLabel === 'Session') {
      this.state.timerID.cancel();
      this.setState({
        timer: this.state.breakLength * 60,
        timerLabel: 'Break'
      });
      angle = 360;
      this.countDown();
    } else {
      this.state.timerID.cancel();
      this.setState({
        timer: this.state.sessionLength * 60,
        timerLabel: 'Session'
      });
      this.countDown();
    }
  };

  time = () => {
    let minutes = Math.floor(this.state.timer / 60);
    let seconds = this.state.timer - minutes * 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${minutes}:${seconds}`;
  };

  componentDidMount() {
    const script = document.createElement('script');
    script.src =
      'https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js';
    script.async = true;
    document.body.appendChild(script);
    circle = document.getElementById('green-halo');
  }

  render() {
    return (
      <div className='container'>
        <div className='title'>Pomodoro Clock</div>
        <div className='label-container'>
          <Label
            title='Session Length'
            id='session-label'
            lengthID='session-length'
            incID='session-increment'
            decID='session-decrement'
            length={this.state.sessionLength}
            onClick={this.handleCount}
          ></Label>
          <Label
            title='Break Length'
            id='break-label'
            lengthID='break-length'
            incID='break-increment'
            decID='break-decrement'
            length={this.state.breakLength}
            onClick={this.handleCount}
          ></Label>
        </div>
        <svg style={{ width: 200, height: 200, top: 0, left: 0 }}>
          <circle
            cx='100'
            cy='100'
            r='57'
            id='green-halo'
            fill='none'
            stroke='white'
            strokeWidth='5'
            strokeDasharray={`${angle},20000`}
            transform='rotate(-90,100,100)'
          />
          <text id='svg-text' textAnchor='middle' x='100' y='110'>
            {this.time()}
          </text>
        </svg>
        <Timer
          timerLabel={this.state.timerLabel}
          timeLeft={this.time()}
          startStop={this.startStop}
          reset={this.reset}
          timerRunning={this.state.timerRunning}
        />
        <audio
          id='beep'
          preload='auto'
          src={'https://goo.gl/65cBl1'}
          type='audio/mp3'
          ref={this.audioRef}
        />
      </div>
    );
  }
}

export default App;
