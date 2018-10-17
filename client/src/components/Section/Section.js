import "./Section.css";
import React from 'react';

class Section extends React.Component {
  constructor(props) {
    super(props)
     this.myRef = React.createRef();
  }
  
  onScroll = () => {
    const scrollY = window.scrollY 
	
	if(window.innerWidth > 1073)
	{
		if(this.props.title === "Visual Data")
		{
			let amount = -600 + (scrollY /2);
			this.myRef.current.firstElementChild.style.transform = "translateX(" + amount + "px)";
			this.myRef.current.firstElementChild.lastElementChild.style.transform = "translateX(" + amount * -0.15 + "px)";
		}
		else if(this.props.title === "SpaceX")
		{
			let amount = 900 - (scrollY /2);
			this.myRef.current.firstElementChild.style.transform = "translateX(" + amount + "px)";
			this.myRef.current.firstElementChild.firstElementChild.style.transform = "translateX(" + amount * -0.15 + "px)";
		}
		else if(this.props.title === "Collaboration")
		{
			let amount = -1400 + (scrollY /2);
			this.myRef.current.firstElementChild.style.transform = "translateX(" + amount + "px)";
			this.myRef.current.firstElementChild.lastElementChild.style.transform = "translateX(" + amount * -0.15 + "px)";
		}
	}
	else
	{
		this.myRef.current.firstElementChild.style.transform = "translateX(0px)";
		this.myRef.current.firstElementChild.lastElementChild.style.transform = "translateX(0px)";
		this.myRef.current.firstElementChild.firstElementChild.style.transform = "translateX(0px)";
	}
    
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
}

componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
}

  render() {
const {props} = this ;
  return(
  <div className="divider" ref={this.myRef}>
    <div className="divider-slide-div">
  {props.direction === "left" ? <div className="divider-image"><img src={props.image}/></div> : <div className="divider-text divider-flip-static"><h1>{props.title}</h1><h2>{props.details}</h2></div> }
  {props.direction === "left" ? <div className="divider-text"><h1>{props.title}</h1><h2>{props.details}</h2></div> : <div className="divider-image divider-flip-percent"><img src={props.image}/></div> }
    </div>
  </div>
);
  }
}

export default Section;