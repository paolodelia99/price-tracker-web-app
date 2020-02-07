import React, {Fragment} from 'react';
import CircularProgress from "@material-ui/core/CircularProgress";

const Spinner = () => {
    return (
        <Fragment>
            <div style={ {width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'}}>
                <div style={{
                    margin: 'auto',
                    height:'400px',
                    width: '400px',
                    background: 'none',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <CircularProgress color='primary' style={{margin: 'auto', width: '50px', display: 'block'}}/>
                </div>
            </div>
        </Fragment>
    );
};

export default Spinner;
