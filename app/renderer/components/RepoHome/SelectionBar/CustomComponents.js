import { withStyles } from '@material-ui/core/styles';
import { Button, Dialog } from '@material-ui/core'
export const AppBarButton = withStyles({
  root: {
    background: 'black',
    borderRadius: 0,
    border: 0,
    color: 'grey',
    height: 30,
    marginTop: '3px',
    marginBottom: '3px',
    padding: '0 30px 0 30px',
    borderRight: '1px solid white',
    '&:hover': {
      color: 'white',
    },
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);

export const CustomDialog = withStyles({
  root:{
  },
  paper: {
    minWidth: '400px',
    borderRadius:'0px',
    // marginBottom: '0px'

  }
})(Dialog)