import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  container: {},
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
    border: '2px solid rgba(255, 255, 255, 0.69)',
    borderRadius: '3%',
    '&.red': {
      boxShadow: '0 0 2px red, 0 0 2px red, 0 0 2px red, 0 0 2px red, inset 0 0 2px red, inset 0 0 2px red, inset 0 0 2px red, inset 0 0 2px red',
    },
    '&.blue': {
      boxShadow: '0 0 2px #3388dd, 0 0 2px #3388dd, 0 0 2px #3388dd, 0 0 2px #3388dd, inset 0 0 2px #3388dd, inset 0 0 2px #3388dd, inset 0 0 2px #3388dd, inset 0 0 2px #3388dd',
    },
    '&.green': {
      boxShadow: '0 0 2px green, 0 0 2px green, 0 0 2px green, 0 0 2px green, inset 0 0 2px green, inset 0 0 2px green, inset 0 0 2px green, inset 0 0 2px green',
    },
  },
}));
