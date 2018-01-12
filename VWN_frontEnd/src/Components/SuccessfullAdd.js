// import React, { Component } from 'react';
// // import {Text} from 'react-native-animatable';

// class SuccessfullAdd extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       x: 0,
//       y: 0
//     }
//   }


//   render() {
//     let radius = Math.min(this.props.width, this.props.height) / 2;
//     let strokeWidth = radius / 20;
//     let cx = this.props.width / 2;
//     let cy = this.props.height / 2;

//     return (
//       <div>
// {/* <Text animation="slideInDown" iterationCount={5} direction="alternate">You did it</Text> */}
// {/* <Text animation="pulse" easing="ease-out" iterationCount="infinite" style={{ textAlign: 'center' }}>❤️</Text> */}
//         </div>

//     );
//   }

//   renderHead(cx, cy, radius, strokeWidth) {
//     return <circle cx={cx} cy={cy} r={radius - 10} fill="gold" stroke="black" strokeWidth={strokeWidth} />;
//   }

//   renderEye(cx, cy, radius, strokeWidth) {
//     let angle = Math.atan2(this.state.y - cy, this.state.x - cx); // angle
//     let bcx = cx + radius / 2 * Math.cos(angle);
//     let bcy = cy + radius / 2 * Math.sin(angle);
//     return [
//       <circle key="eye" cx={cx} cy={cy} r={radius} fill="white" stroke="black" strokeWidth={strokeWidth} />,
//       <circle key="eyeball" cx={bcx} cy={bcy} r={radius / 2} fill="black" />
//     ];
//   }

//   renderMouth(left, top, width, strokeWidth) {
//     let bottom = top + width * 2 / 5;
//     let path = `M${left} ${top} C ${left + 0.25 * width} ${bottom}, ${left + 0.75 * width} ${bottom}, ${left + width} ${top}`;
//     return <path d={path} stroke="black" strokeWidth={strokeWidth} fill="transparent" />;
//   }

//   handleMouseMove(event) {
//     let svg = this.refs.svg;
//     let rect = svg.getBoundingClientRect();
//     this.setState({
//       x: event.clientX - rect.left,
//       y: event.clientY - rect.top
//     });
//   }
// }

// export default SuccessfullAdd;