import React, {Component} from 'react';
import './Modal.css'

class Modal extends Component {

    constructor(props) {
        super(props)

    }


   

    render(){
        if(this.props.name) {
        return(
            <div className="modal">
                <h2>{this.props.name}</h2>
                <span><p id="flightNumber">Flight Number: {this.props.flightNumber}</p></span>
                <span><p id="flightYear">Flight Year: {this.props.flightYear}</p></span>
                <div className="img-container">
                    <img id="image" src={this.props.image} />
                </div>
                <p id="description">{this.props.desc}</p>   
            </div>
        )
        }
        else {
            return null;
        }
    }
}

export default Modal;