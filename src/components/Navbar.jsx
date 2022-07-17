import React from 'react';
import { Container, Grid, Text, Image } from '@nextui-org/react';
import Connect from './Connect';
import '../index.css'

function Navbar() {
  return (
    <Container>
      <Grid.Container gap={0} justify="center">
        <Grid xs={6} justify="center" alignItems='center'>
          <Image
            objectFit="scale-down"
            width={80}
            height={80}
            src={require("../images/0xLogo.png")}
            alt="Logo Image"
          />
          <Text h2 color="warning" weight="bold">[ 0x Swap dApp ]</Text>
        </Grid>
        {/* <Grid xs={4} justify="center" alignItems='center'>
          <Text h2 color="warning" weight="bold">[ 0x Swap dApp ]</Text>
        </Grid> */}
        <Grid xs={6} justify="right" alignItems='center'>
          <Connect />
        </Grid>
      </Grid.Container>
    </Container>
  );
}

export default Navbar;