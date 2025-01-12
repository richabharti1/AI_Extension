chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.content === "imageDescription") {
        console.log(message.description);
    }
});

// import { createRoot } from "react-dom/client";
// import {AI_ETENSION_ID} from '../common/const';
//
//
// const InjectedFunction = () => {
//     return (
//         <>
//          <div>hello</div>
//         </>
//     );
// };
//
// const ai_extension = document.createElement(AI_ETENSION_ID);
// document.body.appendChild(ai_extension);
// ai_extension.render(<InjectedFunction />);
