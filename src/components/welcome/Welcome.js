import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Map from "../map/mapview.js";

const request = require('../../resources/request');

const styles = theme => ({
    card: {
        maxWidth: 1100,
        margin: 'auto',
        marginTop: theme.spacing(5)
    },
    title: {
        padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
        color: theme.palette.text.secondary
    },
    media: {
        minHeight: 700
    }
})

class Welcome extends Component {
    zones = [];

    constructor(props) {
        super(props);

        // console.log('---constructor --');
        //
        // console.log('---state end const --');

        this.state = {
            user: {},
            // userZones : [],
            stringData: 'ALMA',
            privilege: {}
        }
    }

    componentDidMount = () => this.fetchData()
    fetchData = () => {
        request.get('users/' + request.auth.getSubject(), (err, res) => {
            if (err) {
                console.log(err)
            } else {
                this.setState({user: res.body})
                request.get('users/privileges', (err, res) => {
                    if (err) {
                        console.log('error if :' + err)
                    } else {
                        this.setState({privilege: res.body})
                    }
                })

                request.get('users/zones', (err, res) => {
                    if (err) {
                        console.log('error if :' + err)
                    } else {
                        for (let i = 0; i < res.body.length; i++) {
                            this.zones.push(res.body[i]);
                        }
                    }
                })
            }
        })

    }


//


    render() {
        const {classes} = this.props
        //    const { isBackdropOpen } = this.state;
        // const sendDataToParent = (layer) => { // the callback. Use a better name
        //     console.log(this.state.geofenceLayer);
        //     this.state.geofenceLayer = layer;
        //     console.log('sendDataToParent accepted');
        // console.log('render');
        // console.log(this.state.userZones);
        // };

        return (

            <React.Fragment>

                <Map userZoneObject={this.zones}>
                </Map>
                {/*{}*/}
            </React.Fragment>
        )
    }
}

Welcome.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Welcome)