
import React from 'react'
import { Provider, Heading, Subhead } from 'rebass'
import {
  Hero, CallToAction, ScrollDownIndicator, Section, Features, Checklist
} from 'react-landing-page'
import { NavButtons } from '../ui/Buttons';
import { Toolbar } from '@material-ui/core';


const featherCheckmark = <svg
  xmlns="http://www.w3.org/2000/svg"
  width="24" height="24"
  viewBox="0 0 24 24"
  fill="none" stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
>
  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
  <polyline points="22 4 12 14.01 9 11.01"/>
</svg>

const App = props => (
  <Provider>
    <Hero
      color="black"
      bg="white"
      backgroundImage="https://source.unsplash.com/jxaj-UrzQbc/1600x900"
    >
        <Heading>NICHER EVENTS</Heading>
        <Subhead>dream big or go home</Subhead>
        {/*<CallToAction href="/sign_up" mt={3}>Sign up</CallToAction>*/}
        {/*<NavButtons to="/sign_in" text='Already have account?' />*/}
        <ScrollDownIndicator/>
    </Hero>
    <Section width={1}
      heading='What are you looking for?'
      subhead='maybe this will help'>
      <Checklist children={[
            <NavButtons to="/venues" text='Venues' />,
            <NavButtons to="/events" text='Events' />
      ]} checkmark={featherCheckmark}/>
    </Section>

    <Section width={1}
      heading='In this section for example will be list of some public events'
      >
      <p>Some event </p>
      <p>Some event </p>
      <p>Some event </p>
      <p>Some event </p>
      <p>Some event </p>
    </Section>

    <Section width={1}
      heading='And so on'
      >
      <p>Another content </p>
      <p>Another content </p>
      <p>Another content </p>
      <p>Another content </p>
    </Section>
  </Provider>
)

export default App;
