import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  container: {
    paddingTop: 120,
  },
  tableContainer: {
    position: 'fixed',
    top: 0,
    zIndex: 1,
    display: 'flex',
    background: 'rgba(255, 255, 255, .9)',
  },
  table: {
    borderCollapse: 'collapse',
    '& td, & th': {
      border: '1px solid #dddddd',
      textAlign: 'left',
      padding: 2,
    },
    '& input': {
      width: '100%',
      boxSizing: 'border-box',
    },
  },
  labelList: {
    width: '50%',
  },
  imagesContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
    width: 'calc(20% - 4px)',
    margin: '2px',
    overflow: 'hidden',
  },
  image: {
    maxWidth: '100%',
  },
  boundingBox: {
    position: 'absolute',
    border: '1px solid rgba(255, 255, 255, 0.69)',
    borderRadius: '3%',
    '&.red': {
      boxShadow:
        '0 0 2px red, 0 0 2px red, 0 0 2px red, 0 0 2px red, inset 0 0 2px red, inset 0 0 2px red, inset 0 0 2px red, inset 0 0 2px red',
    },
    '&.blue': {
      boxShadow:
        '0 0 2px #3388dd, 0 0 2px #3388dd, 0 0 2px #3388dd, 0 0 2px #3388dd, inset 0 0 2px #3388dd, inset 0 0 2px #3388dd, inset 0 0 2px #3388dd, inset 0 0 2px #3388dd',
    },
    '&.green': {
      boxShadow:
        '0 0 2px green, 0 0 2px green, 0 0 2px green, 0 0 2px green, inset 0 0 2px green, inset 0 0 2px green, inset 0 0 2px green, inset 0 0 2px green',
    },
    '&.grey': {
      boxShadow:
        '0 0 2px grey, 0 0 2px grey, 0 0 2px grey, 0 0 2px grey, inset 0 0 2px grey, inset 0 0 2px grey, inset 0 0 2px grey, inset 0 0 2px grey',
    },
    '&:hover': {
      borderWidth: 2,
    }
  },
  focusPoint: {
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#ddd9',
    border: '1px solid black',
    borderRadius: '100%',
    width: 16,
    height: 16,
  },
}));
