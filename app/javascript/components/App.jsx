import React from 'react';
import { Provider, Heading, Subhead, Flex, Box, Text, Image } from 'rebass';
import {
  Hero, ScrollDownIndicator, Section} from 'react-landing-page';
import { NavButtons } from '../ui/Buttons';

const Emoji = props => (
  <span
    className="emoji"
    role="img"
    aria-label={props.label ? props.label : ''}
    aria-hidden={props.label ? 'false' : 'true'}
  >
    {props.symbol}
  </span>
);

export default class App extends React.Component {

  render() {
    return (
      <Provider>
        <Hero
          color="black"
          bg="white"
          backgroundImage="https://source.unsplash.com/jxaj-UrzQbc/1600x900"
        >
          <Heading>NICHER EVENTS</Heading>
          <Subhead>dream big or go home</Subhead>
          <ScrollDownIndicator/>
        </Hero>
        <Section width={1}
          heading='What are you looking for?'
          subhead='maybe this will help'>
          <Flex flexWrap='wrap' justifyContent="center" mx={-6}>
            <Box px={2} py={2}>
              <h1>
                <Emoji symbol="👋" />
                <NavButtons to="/sign_in" text='Sign in' />
              </h1>
            </Box>
            <Box px={2} py={2}>
              <h1>
                <Emoji symbol="🔥" />
                <NavButtons to="/events" text='Public events' />
              </h1>
            </Box>
            <Box px={2} py={2}>
              <h1>
                <Emoji symbol="📩" />
                <NavButtons  to="/sign_up" text='Sign up' />
              </h1>
            </Box>
          </Flex>
        </Section>
        <Section width={1}
          heading='About application'>
          <Flex flexWrap='wrap' mx={-1}>
            <Box
              p={3}
              width={0.7}
              fontSize={4}>
              <Text align="center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Leo duis ut diam quam nulla porttitor massa id. Et odio pellentesque diam volutpat commodo sed egestas egestas. Molestie a iaculis at erat pellentesque. Blandit massa enim nec dui nunc mattis. Malesuada proin libero nunc consequat interdum varius sit amet. Ipsum faucibus vitae aliquet nec. Malesuada fames ac turpis egestas sed. Ullamcorper malesuada proin libero nunc consequat interdum varius sit. Sed euismod nisi porta lorem mollis aliquam ut porttitor. Est ante in nibh mauris cursus mattis molestie a iaculis. At ultrices mi tempus imperdiet nulla malesuada pellentesque. Arcu bibendum at varius vel pharetra vel. Fames ac turpis egestas sed tempus urna. Convallis convallis tellus id interdum velit laoreet.
              </Text>
            </Box>
            <Box
              p={3}
              width={0.3}
            >
              <Image src='https://source.unsplash.com/random/600x300?navigation' />
            </Box>
          </Flex>
          <Flex flexWrap='wrap' mx={-1}>
            <Box
              p={3}
              width={0.3}
            >
              <Image src='https://source.unsplash.com/random/600x400?map' />
            </Box>
            <Box
              p={3}
              width={0.7}
              fontSize={4}>
              <Text align="center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu sem integer vitae justo. Vulputate eu scelerisque felis imperdiet proin fermentum leo vel orci. Nunc id cursus metus aliquam eleifend mi in nulla. Mi tempus imperdiet nulla malesuada. Nunc mattis enim ut tellus elementum sagittis. Sed libero enim sed faucibus turpis in eu. Egestas sed tempus urna et pharetra pharetra massa. Etiam dignissim diam quis enim. In egestas erat imperdiet sed euismod nisi. Gravida in fermentum et sollicitudin ac. Morbi non arcu risus quis. Morbi leo urna molestie at elementum. Varius morbi enim nunc faucibus a pellentesque sit. Donec massa sapien faucibus et molestie ac feugiat sed. Ultricies tristique nulla aliquet enim tortor. Vel facilisis volutpat est velit. Sit amet venenatis urna cursus eget. Id consectetur purus ut faucibus pulvinar. Volutpat est velit egestas dui. Rhoncus urna neque viverra justo nec. Mattis nunc sed blandit libero volutpat sed. Praesent semper feugiat nibh sed pulvinar proin gravida hendrerit.
              </Text>
            </Box>
          </Flex>
        </Section>
        <Section width={1}
          heading='Contacts'>
          <Text
            fontSize={4}
            color='primary'
            align="center">
            <p>ADDRESS</p>
              Kaštonų g. 27 K1, Pagiriai,
              VLT-14117 Vilniaus r. Lithuania
            <p>email: contact@xgizer.com</p>
          </Text>
        </Section>
      </Provider>
    );}
}
