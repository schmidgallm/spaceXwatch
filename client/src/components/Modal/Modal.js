import React, {Component} from 'react';
import './Modal.css'

class Modal extends Component {   

    render(){
        if(this.props.name) {
        return(
            <div className="modal">
			<div onClick={this.props.closeMe} className="modal-close"> X Close</div>
                <h2>{this.props.name}</h2>
                <span><p id="flightNumber">{this.props.flightNumber}</p></span>
                <hr />
                <span><p id="flightYear">{this.props.flightYear}</p></span>
                <div className="img-container">
                    <img id="image" src={this.props.image} alt={this.props.name} />
                </div>
				<div id="m_desc_wrapper">
					<p id="description">{this.props.desc}</p> 
				</div>				
            </div>
        )
        }
        else {
            return null;
        }
    }
}

export default Modal;