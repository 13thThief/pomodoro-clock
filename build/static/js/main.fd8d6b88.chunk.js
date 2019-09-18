(window["webpackJsonppomodoro-clock"]=window["webpackJsonppomodoro-clock"]||[]).push([[0],{13:function(e,t,n){},14:function(e,t,n){},15:function(e,t,n){"use strict";n.r(t);var a,r,i,s=n(0),c=n.n(s),o=n(7),l=n.n(o),m=(n(13),n(1)),u=n(2),h=n(4),d=n(3),f=n(5),p=(n(14),function(e,t){var n=(new Date).getTime()+t,a=null;return a=setTimeout(function r(){return n+=t,a=setTimeout(r,n-(new Date).getTime()),e()},n-(new Date).getTime()),{cancel:function(){return clearTimeout(a)}}}),b={sessionLength:25,breakLength:5,timerRunning:!1,timerLabel:"Session",timer:1500,timerID:null},g=1,k=60,L=360,v=function(e){function t(e){var n;return Object(m.a)(this,t),(n=Object(h.a)(this,Object(d.a)(t).call(this,e))).state={},n}return Object(f.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return c.a.createElement("div",{id:this.props.id,className:"label"},c.a.createElement("div",{className:"label-title"},this.props.title),c.a.createElement("button",{id:this.props.decID,value:"decrease",onClick:this.props.onClick},c.a.createElement("i",{className:"fas fa-chevron-down fa-2x"})),c.a.createElement("span",{id:this.props.lengthID},this.props.length),c.a.createElement("button",{id:this.props.incID,value:"increase",onClick:this.props.onClick},c.a.createElement("i",{className:"fas fa-chevron-up fa-2x"})))}}]),t}(c.a.Component),E=function(e){function t(e){return Object(m.a)(this,t),Object(h.a)(this,Object(d.a)(t).call(this,e))}return Object(f.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return c.a.createElement("div",{id:"timer"},c.a.createElement("div",{id:"timer-display"},c.a.createElement("div",{id:"timer-label"},this.props.timerLabel),c.a.createElement("div",{id:"time-left"},this.props.timeLeft)),c.a.createElement("div",{id:"timer-control"},c.a.createElement("button",{id:"start_stop",onClick:this.props.startStop},c.a.createElement("i",{className:"fas "+(this.props.timerRunning?"fa-pause":"fa-play")+" fa-2x"})),c.a.createElement("button",{id:"reset",onClick:this.props.reset},c.a.createElement("i",{className:"fa fa-refresh fa-2x"}))))}}]),t}(c.a.Component),D=function(e){function t(e){var n;return Object(m.a)(this,t),(n=Object(h.a)(this,Object(d.a)(t).call(this,e))).reset=function(){n.state.timerID&&n.state.timerID.cancel(),a&&a.cancel(),n.setState(b),n.audioRef.current.pause(),n.audioRef.current.currentTime=0,L=360,r.setAttribute("stroke-dasharray",L+", 20000")},n.handleCount=function(e){n.state.timerRunning||("increase"===e.currentTarget.value?n.incrementTimer(e):n.decrementTimer(e))},n.incrementTimer=function(e){if(void 0!==e)switch(e.currentTarget.id){case"break-increment":if(n.state.breakLength===k)return;n.setState({breakLength:n.state.breakLength+1,timer:60*(n.state.breakLength+1)});break;case"session-increment":if(n.state.sessionLength===k)return;n.setState({sessionLength:n.state.sessionLength+1,timer:60*(n.state.sessionLength+1)})}else n.setState({timer:n.state.timer-1})},n.decrementTimer=function(e){if(void 0===e)return n.setState({timer:n.state.timer-1}),r.setAttribute("stroke-dasharray",L+", 20000"),void(L-=i);switch(e.currentTarget.id){case"break-decrement":if(n.state.breakLength===g)return;n.setState({breakLength:n.state.breakLength-1,timer:60*(n.state.breakLength-1)});break;case"session-decrement":if(n.state.sessionLength===g)return;n.setState({sessionLength:n.state.sessionLength-1,timer:60*(n.state.sessionLength-1)})}},n.startStop=function(){n.state.timerRunning?(n.setState({timerRunning:!1}),n.state.timerID&&n.state.timerID.cancel(),i=360/n.state.timer):(n.setState({timerRunning:!0}),i=360/n.state.timer,n.countDown())},n.countDown=function(){n.setState({timerID:p(function(){n.decrementTimer(),n.state.timer<0&&n.changeTimer()},1e3)})},n.changeTimer=function(){n.audioRef.current.play(),"Session"===n.state.timerLabel?(n.state.timerID.cancel(),n.setState({timer:60*n.state.breakLength,timerLabel:"Break"}),L=360,n.countDown()):(n.state.timerID.cancel(),n.setState({timer:60*n.state.sessionLength,timerLabel:"Session"}),n.countDown())},n.time=function(){var e=Math.floor(n.state.timer/60),t=n.state.timer-60*e;return t=t<10?"0"+t:t,"".concat(e=e<10?"0"+e:e,":").concat(t)},n.state=b,n.audioRef=c.a.createRef(),n}return Object(f.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){var e=document.createElement("script");e.src="https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js",e.async=!0,document.body.appendChild(e),r=document.getElementById("green-halo")}},{key:"render",value:function(){return c.a.createElement("div",{className:"container"},c.a.createElement("div",{className:"title"},"Pomodoro Clock"),c.a.createElement("div",{className:"label-container"},c.a.createElement(v,{title:"Session Length",id:"session-label",lengthID:"session-length",incID:"session-increment",decID:"session-decrement",length:this.state.sessionLength,onClick:this.handleCount}),c.a.createElement(v,{title:"Break Length",id:"break-label",lengthID:"break-length",incID:"break-increment",decID:"break-decrement",length:this.state.breakLength,onClick:this.handleCount})),c.a.createElement("svg",{style:{width:200,height:200,top:0,left:0}},c.a.createElement("circle",{cx:"100",cy:"100",r:"57",id:"green-halo",fill:"none",stroke:"white",strokeWidth:"5",strokeDasharray:"".concat(L,",20000"),transform:"rotate(-90,100,100)"}),c.a.createElement("text",{id:"svg-text",textAnchor:"middle",x:"100",y:"110"},this.time())),c.a.createElement(E,{timerLabel:this.state.timerLabel,timeLeft:this.time(),startStop:this.startStop,reset:this.reset,timerRunning:this.state.timerRunning}),c.a.createElement("audio",{id:"beep",preload:"auto",src:"https://goo.gl/65cBl1",type:"audio/mp3",ref:this.audioRef}))}}]),t}(c.a.Component);l.a.render(c.a.createElement(D,null),document.getElementById("root"))},8:function(e,t,n){e.exports=n(15)}},[[8,1,2]]]);
//# sourceMappingURL=main.fd8d6b88.chunk.js.map