import React from 'react';

export default function Car(props) {

    console.log(props);
    props = { width: 24, height: 24, strokeWidth: 2, ...props };
    const { width, height, strokeWidth } = props;
    delete props.width;
    delete props.height;
    delete props.strokeWidth;

    console.log(props);

    return (<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" {...props}><g fill="blue" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth}><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path><circle cx={7} cy={17} r={2}></circle><path d="M9 17h6"></path><circle cx={17} cy={17} r={2}></circle></g></svg>);
}