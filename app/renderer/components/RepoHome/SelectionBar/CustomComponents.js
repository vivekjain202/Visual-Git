import { withStyles } from '@material-ui/core/styles';
import {Button} from '@material-ui/core'
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
      '&:hover':{
        color: 'white',
      },
    },
    label: {
      textTransform: 'capitalize',
    },
  })(Button);