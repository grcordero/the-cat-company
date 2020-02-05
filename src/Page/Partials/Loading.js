import React from 'react';

function Loading(props) {
    const loading = ['0s', '0.25s', '0.50s'].map((interval, index) => {
        let style = {
            'animationDelay': interval
        };

        return <div className="spinner-grow spinner-grow-sm" role="status" style={style} key={index}><span className="sr-only">Loading&hellip;</span></div>
    });

    return (loading);
}

export default Loading;