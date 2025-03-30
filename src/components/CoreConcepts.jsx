import CoreConcept from './CoreConcept/CoreConcept.jsx';
import { CORE_CONCEPTS } from '../data';
import Section from './Section.jsx';

export default function CoreConcepts() {
    return (
        <Section id="core-concepts" className="core-concepts">
            <h2>Core Concepts</h2>
            <ul>
                {CORE_CONCEPTS.map(item => <CoreConcept key={item.title} {...item} />)}
            </ul>
        </Section>
    )
}