
import { useAccordionContent } from "./Accordion.jsx";
import { useAccordionItemContext } from "./AccordionItem.jsx";

export default function AccordionContent({ className, children }) {
    const { openItemId } = useAccordionContent();
    const id = useAccordionItemContext();
    const isOpen = openItemId === id;

    return <div className={`accordion-item-content ${className ?? ''} ${isOpen ? 'open' : 'close'}`}>{children}</div>;
}