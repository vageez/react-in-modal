# React In Modal 

Wrapping a React component in an Accessible React Modal using ReactDOM.createPortal

### Features
1. Trap Focus Inside a Modal  
2. Supports Aria labelledBy tag
3. Supports Aria DescribedBy tag
4. Injects Modal before the closing ```</body>``` tag
5. Accepts close function as a prop and uses it to close Modal on ESC Keypress, or an click event outside ot the Modal.

### Implementation Suggestion
Do not hide and show Modal using CSS.   
Rather evaluate some logic in your app.      
Ex: ```{ modal ? <InModal><Content/></InModal> : <Content/> }```

| Property       | Required     | Type            | Description                                                                                                                                                                                                                      |
|----------------|--------------|-----------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| onClose        | Required     | function        | This is the redux action or regular function in your application that will close or Unmount the Modal. Once the Modal is rendered this function will be called when pressing the ECS Key or simply clicking outside the Modal.   |
| dimmer         | Not Required | object          | This represents the styling of the dimmed out area of the page.   Example: ```const dimmer = { style = { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.7)'} }```             |
| modal          | Not Required | object          | This represents the styling of the modal. Example: ```const modal = { style: { margin: '0px auto', width: " 80%", backgroundColor: 'white'}, 'aria-labelledBy' : 'Sample Label', 'aria-describedBy' : 'Sample Described By' }``` |
| ModalComponent | Not Required | React Component | React Component. By default the Modal is a div. This presents some limitations when trying to add media query styling to the Modal. Passing in a React Component with some advanced styling could be useful in this instance.    |


## ARIA Support

https://www.w3.org/WAI/GL/wiki/Using_aria-labelledby_to_provide_a_name_for_user_interface_controls

https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-describedby_attribute

## Usage

Our React Component Wrapped in Modal
/path/components/ModalContent.js

```
import InModal from 'reactinmodal';
import { closeAction } from './redux/actions';

const modal = {
        style: {
            width: " 80%",
            backgroundColor: "white",
            margin: "0 auto"
        },
        'aria-labelledBy' : 'Sample Label',
        'aria-describedBy' : 'Sample Described By',
}
const dimmer = {
            style : { 
                position: 'fixed', 
                top: 0, 
                left: 0,
                width: '100%', 
                height: '100%', 
                backgroundColor: 'rgba(0,0,0,0.7)' 
            }
        }       
        
const ModalContent = () => {
 return(
    <InModal onClose={close} 
            dimmer={dimmer} 
            modal={modal}
            ModalComponent={StyledInModal}>
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



## TODO

Create Unique ids, to support creating multiple insances on a single page.  


## License

MIT
