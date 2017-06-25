// The line below is unnecessary, but it's a good practice
// to specify your dependencies in an explicit way.
// const {React, ReactDOM, $} = window;

class OneTimeClickLink extends React.Component {
    constructor(props) {
        super(props);

        this.state = {clicked: false};
        this.linkClicked = this.linkClicked.bind(this);
    }

    linkClicked(event) {
        this.setState({clicked: true});
    }

    render() {
        const {clicked} = this.state;

        const oneTimeLink = (
            <a href='javascript:void(0)' onClick={this.linkClicked}>
                Click me
            </a>
        );

        const clickedMessage = <span>You clicked me.</span>;

        return (
            <div id='one-time-click-link'>
                {clicked ? clickedMessage : oneTimeLink}
            </div>
        );
    }
}

// Start this code only when all HTML is loaded by the browser.
// $(() => {
//     ReactDOM.render(<OneTimeClickLink />, document.getElementById('start'));
// });
