import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import homePageImage from './../../assets/images/gps.png';

const styles = theme => ({
  card: {
    maxWidth: 1100,
    margin: 'auto',
    marginTop: theme.spacing(5)
  },
  title: {
    padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
    color: theme.palette.text.secondary
  },
  media: {
    minHeight: 700,
      display: "block",
      margin: "auto",
      height: "auto",
      maxHeight: "100vh",
      maxWidth: "100vh",
       backgroundSize: "contain"
  }
})

class Home extends Component {
  render() {
    const {classes} = this.props
    return (
        <Card className={classes.card}>
          <Typography type="headline" component="h2" className={classes.title}>
              Gps.az Satellite Imagery Services
          </Typography>
          <CardMedia className={classes.media} image={homePageImage} />
        </Card>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Home)