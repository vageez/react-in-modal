# React In Modal 

Wrapping a React component in an Accessible React Modal using ReactDOM.createPortal


## Usage

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

## License

MIT
