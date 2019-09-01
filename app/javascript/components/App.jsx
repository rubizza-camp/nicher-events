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
    let user;
    if (localStorage.user){
      user = <Flex flexWrap='wrap' justifyContent="center" mx={-6}>
        <Box px={2} py={2}>
          <h1>
            <Emoji symbol="👋" />
            <NavButtons to="/venues" text='Venues' />
          </h1>
        </Box>
        <Box px={2} py={2}>
          <h1>
            <Emoji symbol="🔥" />
            <NavButtons to="/events" text='Public events' />
          </h1>
        </Box>
      </Flex>

    }else {
      user = <Flex flexWrap='wrap' justifyContent="center" mx={-6}>
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
    }
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
          {user}
        </Section>
        <Section width={1}
          heading='About application'>
          <Flex flexWrap='wrap' mx={-1}>
            <Box
              p={3}
              width={0.7}
              fontSize={4}>
              <Text align="center">
                Nicher-Events(2.0) - application that helps people to navigate themselves during events. Wanna cup of coffee? Can not find performance you are interested in? Nicher.Events will help you with that. It will lead you to the desirable location using augmented reality technology. Just choose from the list of options. Or maybe you are an event planner and you are having problems with finding the perfect spot? Nicher.Events is a full-fledged event aggregator which gives you and opportunity to find the ideal location for events of any format.
              </Text>
            </Box>
            <Box
              p={3}
              width={0.3}
            >
              <Image src='https://is4-ssl.mzstatic.com/image/thumb/Purple113/v4/59/f8/94/59f894cd-f7f5-db9d-d7e0-3ea696306f91/source/512x512bb.jpg' />
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
            Ave. Masherova 11, Minsk, Belarus
            <p>email: contact@xgizer.com</p>
          </Text>
        </Section>
      </Provider>
    );}
}
