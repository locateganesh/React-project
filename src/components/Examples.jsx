import { useState } from 'react';
import { EXAMPLES } from '../data';
import TabButton from './TabButton/TabButton.jsx';
import Section from './Section.jsx';
import Tab from './Tab.jsx';

export default function Examples() {
    const [selectedTopic, setSelectedTopic] = useState('components');
    const onSelectHandle = (selectedButton) => {
        setSelectedTopic(selectedButton);
    }

    let tabContent = <p>Please select a topix</p>;
    if (selectedTopic) {
        tabContent = <div id='tab-content'>
            <h3>{EXAMPLES[selectedTopic].title}</h3>
            <p>{EXAMPLES[selectedTopic].description}</p>
            <pre>
                <code>{EXAMPLES[selectedTopic].code}</code>
            </pre>
        </div>
    }

    return (
        <Section id="examples" className="examples">
          <Tab buttons={
            <ul className="menu">
                <TabButton isSelected={selectedTopic === 'components'} onSelect={() => onSelectHandle('components')}>Component</TabButton>
                <TabButton isSelected={selectedTopic === 'jsx'} onSelect={() => onSelectHandle('jsx')}>JSX</TabButton>
                <TabButton isSelected={selectedTopic === 'props'} onSelect={() => onSelectHandle('props')}>Props</TabButton>
                <TabButton isSelected={selectedTopic === 'state'} onSelect={() => onSelectHandle('state')}>State</TabButton>
            </ul>
          }>{tabContent}</Tab>
        </Section>
    )
}