# React In Modal 

Wrapping a React component in an Accessible React Modal using ReactDOM.createPortal


## Usage

Our React Component Wrapped in Modal
/path/components/ModalContent.js

```
import inModal from 'react-in-modal';

const Content = () =>
    <>
        <h1>Title</h1>
        <p>Some paragraph</p>
        <nav>
            <ul>
                <li><a href="one.html">Link One</a></li>
                <li><a href="two.html">Link Two</a></li>
                <li><a href="three.html">Link Three</a></li>
            </ul>
        </nav>
    </>

export default inModal(Content)

```

Our React Component Rendered somewhere in our application
/path/components/App.js
```
import ModalContent from './ModalContent.js';
import { closeAction } from './redux/actions';

# Config needed to manage the display properties of our modal.

const config = {
    close : closeAction,
    style: {
        modalOverlay: {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.7)"
        },
        modal: {
            width: " 80%",
            margin: "0 auto",
            backgroundColor: "white",
        }
    },
    aria: {
        labelledBy: "dialog-title",
        describedBy: "dialog-description"
    }
}

...
<ModalContent {...config}/>
...

```

## License

MIT
