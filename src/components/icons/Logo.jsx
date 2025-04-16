import React from 'react';
import SvgIcon from '@mui/material/SvgIcon';
import Car from './Car';

export default function Logo(props) {
    return (<SvgIcon component={Car} {...props} />);
}