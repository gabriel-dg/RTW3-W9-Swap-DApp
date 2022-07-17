import React from 'react';
import { useState, useEffect } from 'react'
import { Container, Modal, Table, Button, Text } from '@nextui-org/react';

export default function TokenList(props) {

  const [tokens, setTokens] = useState([]);

  const handleChange = (event) => {
    props.setTokenSymbol(event.target.title);
    props.setTokenAddress(event.target.address);
  }

  const closeModal = () => {
    props.onClose(false);
  }


  useEffect(() => {
    const getTokensList = async () => {
      await listAvailableTokens()
        .then(returnValue => { console.log("query successful ", returnValue) })
        .catch(error => console.log("Error: ", error));
    };
    getTokensList();
  }, []);

  async function listAvailableTokens() {
    // const response = await fetch('https://tokens.coingecko.com/uniswap/all.json');
    const response = await fetch('https://gateway.ipfs.io/ipns/tokens.uniswap.org');
    let tokens = await response.json();
    tokens = tokens.tokens
    setTokens(tokens);
    console.log("Tokens List:", tokens);
  }

  return (

    <Container className="tokens-list">

      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={props.open}
        onClose={props.onClose}
      >
        <Modal.Header>
          <Text b id="modal-title" size={16}>
            Select a Token
          </Text>
        </Modal.Header>
        <Modal.Body>

          <Table
            compact
            bordered
            striped
            shadow={false}
            color="primary"
            aria-label="Token-List"
            css={{
              height: "auto",
              minWidth: "100%",
            }}
            selectionMode="single"
          >
            <Table.Header>
              <Table.Column key="logo">LOGO</Table.Column>
              <Table.Column key="symbol" allowsSorting>SYMBOL</Table.Column>
              <Table.Column key="name" allowsSorting>NAME</Table.Column>
            </Table.Header>
            <Table.Body>

              {tokens.map((token, t) => (
                <Table.Row key={token.address} >
                  <Table.Cell >
                    <img src={token.logoURI} width='25' alt='TokenIcon' />
                  </Table.Cell>
                  <Table.Cell>
                    <span address={token.address} title={token.symbol} onClick={handleChange}>{token.symbol}</span>
                  </Table.Cell>
                  <Table.Cell>
                    <span title={token.name}>{token.name}</span>
                  </Table.Cell>
                </Table.Row>
              ))}

            </Table.Body>
            <Table.Pagination
              color="gradient"
              shadow
              noMargin
              align="center"
              rowsPerPage={10}
              onPageChange={(page) => console.log({ page })}
            />
          </Table>

        </Modal.Body >
        <Modal.Footer>
          <Button auto rounded color="gradient" size="sm" onPress={closeModal}>
            Accept
          </Button>
        </Modal.Footer>
      </Modal >

    </Container>
  );
}
