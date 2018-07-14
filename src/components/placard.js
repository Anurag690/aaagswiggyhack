import React from 'react';

class Placard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const style = {
            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
            backgroundColor: '#ababab',
            height: '80px',
            width: '80%',
            transition: '0.3s',
            padding: '20px',
            borderRadius: '5px',
            margin: '2%',

        }
        return(
            <div style={style}>
                hello
            </div>
        );
    }
}
export default Placard;