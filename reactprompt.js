import { createPortal } from "react-dom";
import { createRoot } from "react-dom/client";

/**
 * Uses a React component as a custom prompt, without the need to manage its state within the parent component.
 *
 * @param {React.Component} Component - The React component to use as a custom prompt.
 * @param {object} props - Optional props to pass to the component.
 * @returns {Promise} - A Promise that resolves with the value entered by the user in the custom prompt.
 */
const reactprompt = (Component, props) => {
    return new Promise((resolve) => {
        const container = document.createElement("div");
        const root = createRoot(container);

        const onClose = (val) => {
            root.unmount();
            container.remove();
            resolve(val);
        };

        if (props?.onClose) {
            delete props.onClose;
        }

        root.render(
            createPortal(<Component onClose={onClose} {...props} />, document.body)
        );
    });
};

export default reactprompt;
