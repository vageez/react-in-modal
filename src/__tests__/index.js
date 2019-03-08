import React from 'react';
import { shallow } from 'enzyme'
import sinon from 'sinon'
import inModal from '../index';

const close = () => console.log('close function')

const config = {
    close : close(),
    style: {
        dialogOverlayStyle: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.7)'
        },
        dialogStyle: {
            width: '80%',
            margin: '0 auto',
            backgroundColor: 'white',
        }
    },
    aria: {
        labelledBy: 'dialog-title',
        describedBy: 'dialog-description'
    }
}
const ModalContent = () =>
    <div>
        <h1 id='dialog-title'>Site Navigation</h1>
        <p id='dialog-description' className='sr-only'>Description goes here</p>
        <nav>
            <ul>
                <li><a href='one.html'>Link One</a></li>
                <li><a href='two.html'>Link Two</a></li>
                <li><a href='three.html'>Link Three</a></li>
            </ul>
        </nav>
    </div>

const ComponentToTest = inModal(config)(ModalContent)

describe('rendering', () => {
  let wrapper, showUrl
   beforeEach(() => {
     props =  {
       location: { pathname: 'testUrl1'},
       showUrl: (url) => {}
     }
     showUrl = sinon.stub(props, 'showUrl')
   })
   afterEach(() => {
     showUrl.reset()
   })
   it('ComponentDidMount', () => {
     wrapper = shallow(<ComponentToTest  {...props}/>
     expect(showUrl.calledOnce).toBe(true)
   })
   it('componentWillReceiveProps', () => {
    wrapper = shallow(<Mycomponent  {...props}/>)
    wrapper.setProps({location: { pathname: 'testUrl2'}})
    expect(showUrl.calledOnce).toBe(true)
   })
})