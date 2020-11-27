import React, { FC } from 'react';
import { Container, Typography } from '@material-ui/core';
import firebase from 'firebase/app';
import { useGetObject } from '../../firebase/useGetObject';
import { useGetList } from '../../firebase/useGetList';
import { useStyles } from './styles';

interface HomeProps {}

export const Home: FC<HomeProps> = () => {
  const classes = useStyles();
  const listRef = firebase.database().ref('list');
  const configRef = firebase.database().ref('config');
  const list = useGetList(listRef);
  const config = useGetObject(configRef);
  console.log('list, config', list, config);

  return (
    <Container id="list-container" maxWidth="md" className={classes.container}>
      <Typography variant="h4">HELLO</Typography>
    </Container>
  );
};
