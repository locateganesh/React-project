
import { useAccordionContent } from "./Accordion.jsx";
import { useAccordionItemContext } from "./AccordionItem.jsx";

export default function AccordionTitle({ className, children }) {
    const { toggleItem } = useAccordionContent();
    const id = useAccordionItemContext();

    return <h3 className={`accordion-item-title ${className ?? ''}`} onClick={() => toggleItem(id)}>{children}</h3>;
}