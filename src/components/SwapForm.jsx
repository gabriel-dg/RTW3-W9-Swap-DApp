import React, { useState } from "react";
import { Container, Grid, Card, Spacer, Modal, Input, Row, Button, Text } from "@nextui-org/react";
import { ethers } from 'ethers';
import confetti from 'canvas-confetti';
import TokenList from "./TokenList"
import * as qs from 'qs'
import { ContractMethodNoResultError, useSigner, useProvider } from "wagmi";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";

export default function Swap() {


  // NOTES: define const START
  const [fromToken, setFromToken] = useState()
  const [fromTokenAddress, setFromTokenAddress] = useState()
  const [fromAmount, setFromAmount] = useState()
  const [toToken, setToToken] = useState()
  const [toTokenAddress, setToTokenAddress] = useState()
  const [toAmount, setToAmount] = useState()
  const [gasFee, setGasFee] = useState();
  // NOTES: define const END


  // To control show/hide modal TonekList
  const [fromVisible, fromSetVisible] = useState(false);
  const fromHandler = () => fromSetVisible(true);
  const fromCloseHandler = () => fromSetVisible(false);

  const [toVisible, toSetVisible] = useState(false);
  const toHandler = () => toSetVisible(true);
  const toCloseHandler = () => toSetVisible(false);


  const getPrice = async () => {
    if (!fromToken || !toToken) return;

    let amount = fromAmount;
    amount = ethers.utils.parseEther(amount);
    console.log("Amount: ", amount)

    const params = {
      sellToken: fromToken,
      buyToken: toToken,
      sellAmount: amount.toString()
    }
    // Fetch the swap price.
    const response = await fetch(`https://api.0x.org/swap/v1/price?${qs.stringify(params)}`);
    // const response = await fetch(`https://ropsten.api.0x.org/swap/v1/price?${qs.stringify(params)}`);
    let swapPriceJSON = await response.json();
    setToAmount(ethers.utils.formatEther(swapPriceJSON.buyAmount));
    setGasFee(swapPriceJSON.estimatedGas)
    // console.log("seelToken: ", fromToken);
    // console.log("buyToken: ", toToken);
    console.log("Price: ", swapPriceJSON);
  }


  const getQuote = async (account) => {
    if (!fromToken || !toToken) return;

    let amount = fromAmount;
    amount = ethers.utils.parseEther(amount);

    const params = {
      sellToken: fromToken,
      buyToken: toToken,
      sellAmount: amount.toString(),
      takerAddress: account,
    }
    console.log("Parameters: ", params);

    const response = await fetch(`https://api.0x.org/swap/v1/quote?${qs.stringify(params)}`);
    // const response = await fetch(`https://ropsten.api.0x.org/swap/v1/quote?${qs.stringify(params)}`);
    let swapQuoteJSON = await response.json();
    return swapQuoteJSON;

  }

  //REVIEW trySwap
  const trySwap = async () => {
    
    handleConfetti()

    const erc20abi = [{ "inputs": [{ "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "symbol", "type": "string" }, { "internalType": "uint256", "name": "max_supply", "type": "uint256" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "burn", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "burnFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }]

    let accounts = await window.ethereum.request({ method: "eth_accounts" });
    console.log("Accounts: ", accounts);
    let takerAddress = accounts[0];
    console.log("takerAddress: ", takerAddress);
    const swapQuoteJSON = await getQuote(takerAddress);
    console.log("swapQuoteJSON: ", swapQuoteJSON);

    // Set Token Allowance
    // Interact with the ERC20TokenContract
    // REVIEW: Verify ethers.Contract parameters...
    const ERC20TokenContract = new ethers.Contract(fromTokenAddress, erc20abi, takerAddress);
    // const ERC20TokenContract = new ethers.Contract(erc20abi, fromTokenAddress);
    console.log("Setup ERC20TokenContract: ", ERC20TokenContract);

    const maxApproval = ethers.constants.MaxUint256;
    console.log("maxApproval: ", maxApproval);

    // let approveSwap = await ERC20TokenContract.connect(takerAddress).approve(swapQuoteJSON.allowanceTarget, maxApproval).then(console.log("Approved"));
    ERC20TokenContract.methods.approve(
      swapQuoteJSON.allowanceTarget,
      maxApproval,
    )
      .send({ from: takerAddress })
      .then(tx => {
        console.log("tx: ", tx)
      });

    // Perform the swap
    // const receipt = await web3.eth.sendTransaction(swapQuoteJSON);
    // console.log("receipt: ", receipt);

    const receipt = await takerAddress.sendTransaction(swapQuoteJSON)
      .then(console.log("receipt: ", receipt));

  }

  const handleConfetti = () => {
    confetti({
      particleCount: 150,
      startVelocity: 30,
      spread: 360,
      origin: {
        x: Math.random(),
        y: Math.random() - 0.2
      }
    });
  };


  return (

    <div className="swap-form">
      <Container xs={2} >

        <TokenList open={fromVisible} onClose={fromCloseHandler} setTokenSymbol={setFromToken} setTokenAddress={setFromTokenAddress} />
        <TokenList open={toVisible} onClose={toCloseHandler} setTokenSymbol={setToToken} setTokenAddress={setToTokenAddress} />

        <Grid.Container>
          <Row gap={1} justify="right">
            <Text h3 color="warning" weight="bold">
              Swap your Tokens
            </Text>
          </Row>
        </Grid.Container>
        <Spacer y={1} />
        <Grid.Container gap={2}>
          <Card variant="bordered" borderWeight="extrabold">
            <Card.Header>
              From Token:
            </Card.Header>
            <Card.Divider />
            <Card.Body>
              <Grid>
                <Row gap={0} justify="center" align="center">
                  <Button css={{ m: 10 }} size="lg" auto color="gradient" ghost shadow onClick={fromHandler}>
                    {fromToken && (fromToken)} {!fromToken && (<>Select a Token</>)}
                  </Button>
                  <Input css={{ m: 10 }} size="lg" name="fromToken" type="number" value={fromAmount} bordered labelPlaceholder="amount" status="warning" helperText="Required" onChange={(e) => { setFromAmount(e.target.value) }} onBlur={getPrice} />
                </Row>
              </Grid>
            </Card.Body>
          </Card>
        </Grid.Container>

        <Grid.Container gap={2}>
          <Card variant="bordered" borderWeight="extrabold">
            <Card.Header>
              To Token:
            </Card.Header>
            <Card.Divider />
            <Card.Body>
              <Grid>
                <Row gap={0} justify="center" align="center">
                  <Button css={{ m: 10 }} size="lg" auto color="gradient" ghost shadow onClick={toHandler}>
                    {toToken && (toToken)} {!toToken && (<>Select a Token</>)}
                  </Button>

                  <Input css={{ m: 10 }} size="lg" name="toToken" value={toAmount} readOnly bordered labelPlaceholder="converted amount" status="warning" />
                </Row>
                <Row gap={0} justify="center" align="center">
                  <Text>
                    Gas: {gasFee}
                  </Text>
                </Row>
              </Grid>
            </Card.Body>
          </Card>
        </Grid.Container>

        <Grid.Container gap={2}>
          <Row gap={0} justify="center" align="center">
            <Button
              // disabled
              auto
              rounded
              ripple={false}
              size="lg"
              // onClick={handleConfetti}
              css={{
                background: '#F08A5D',
                fontWeight: '$semibold',
                boxShadow: '$md',
                position: 'relative',
                overflow: 'visible',
                color: '#F9ED69',
                px: '$18',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  background: '#B83B5E',
                  opacity: 1,
                  borderRadius: '$pill',
                  transition: 'all 0.4s ease'
                },
                '&:hover': {
                  transform: 'translateY(-5px)',
                  '&:after': {
                    transform: 'scaleX(1.5) scaleY(1.6)',
                    opacity: 0
                  }
                },
                '&:active': {
                  transform: 'translateY(-2px)'
                }
              }}
              onClick={trySwap}>
              Swap Tokens
            </Button>
          </Row>
        </Grid.Container>

        {/* <Spacer /> */}

      </Container>
    </div>

  );
}
