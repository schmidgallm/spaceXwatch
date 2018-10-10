import React from 'react';

class TopButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {isShown: false}
  }
  
  onScroll = () => {
    const scrollY = window.scrollY 
	
	this.setState({
		isShown: scrollY >= 78 ? true : false
	})
	
    
  }
  
  scrollToTop = () => {
	  window.scrollTo(0,0);
  }
  
  
  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
}

componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
}

  render() {
	  if(this.state.isShown)
	  {
		return (
		  <div className="top-button" onClick={this.scrollToTop}>
			Back to Top
		  </div>
		);
	  }
	  else
	  {
		  return null;
	  }
  }
}

export default TopButton;