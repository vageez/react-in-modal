# React In Modal 

Wrapping a React component in an Accessible React Modal using ReactDOM.createPortal

| Property        | Required     | Type     | Description                                                                                                                                                                                                                                                                                                                                                                                                                    |
|-----------------|--------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| onClose         | Required     | function | This is the redux action or regular function in your application that will close or Unmount the Modal. Once the Modal is rendered this function will be called when pressing the ECS Key or simply clicking outside the Modal.                                                                                                                                                                                                 |
| overlayStyle    | Not Required | object   | This represents the styling of the dimmed out area of the page.  There is default styling already applied. If you wish to override the default styling you may pass in this object.  Default Style : ```{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.7)'} ``` Override Example: ```style = { overlay: { width: " 80%" ,margin: "0 auto", backgroundColor: "white"} }``` |
| modalStyle      | Not Required | object   | This represents the styling of the modal.  There is default styling already applied. Default Style: ```{ margin: '0 auto' }``` If you wish to override the default styling you may pass in this object.  Example: ```style = { modal: { margin: '25px auto', width: " 80%", backgroundColor: 'yellow'} }```                                                                                                                    |
| ariaLabelledBy  | Not Required | string   | https://www.w3.org/WAI/GL/wiki/Using_aria-labelledby_to_provide_a_name_for_user_interface_controls                                                                                                                                                                                                                                                                                                                             |
| ariaDescribedBy | Not Required | string   | https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-describedby_attribute                                                                                                                                                                                                                                                                                                           |                                                                                                                             |
## Usage

Our React Component Wrapped in Modal
/path/components/ModalContent.js

```
import InModal from 'reactinmodal';
import { closeAction } from './redux/actions';

const modalStyle = {
            width: " 80%",
            margin: "0 auto",
            backgroundColor: "white",
        }
const overlayStyle = {
            backgroundColor: "red",
            opacity: "0.7",
        }        
    
const labelledBy = "dialog-title"
const describedBy = "dialog-description"

const ModalContent = () => {
 return(
        <InModal onClose={closeAction} ariaLabelledBy={labelledBy} ariaDescribedBy={describedBy} overlayStyle={overlayStyle} modalStyle={modalStyle}>
        <h1 id="dialog-title">Site Navigation</h1>
        <p id="dialog-description" className="sr-only">Description goes here</p>
        <nav>
            <ul>
                <li><a href="one.html">Link One</a></li>
                <li><a href="two.html">Link Two</a></li>
                <li><a href="three.html">Link Three</a></li>
            </ul>
        </nav>
        <button type="button" aria-label="Close Navigation" className="close-dialog" onClick={closeAction}> <i className="fa fa-times"></i> </button>
    </InModal>
 )
}
export default ModalContent
```

## License

MIT
