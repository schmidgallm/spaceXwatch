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
  
  scrollToTop() {
	  var scrollDuration = 2000;
const   scrollHeight = window.scrollY,
        scrollStep = Math.PI / ( scrollDuration / 15 ),
        cosParameter = scrollHeight / 2;
var     scrollCount = 0,
        scrollMargin,
        scrollInterval = setInterval( function() {
            if ( window.scrollY != 0 ) {
                scrollCount = scrollCount + 1;  
                scrollMargin = cosParameter - cosParameter * Math.cos( scrollCount * scrollStep );
                window.scrollTo( 0, ( scrollHeight - scrollMargin ) );
            } 
            else clearInterval(scrollInterval); 
        }, 15 );
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