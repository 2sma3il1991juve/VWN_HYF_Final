import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Route from 'react-router-dom/Route';
// import { Responsive, WidthProvider } from 'react-grid-layout';
import '../CSS/LandingPage.css';
import ReactPlayer from 'react-player'


// const ResponsiveReactGridLayout = WidthProvider(Responsive);

class LandingPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {},
        }
    }

    componentWillMount() {
        this.setState({
            data: this.props.data
        });
    }

    render() {
        const style = {
            margin: 20,
            textAlign: 'center',
            backgroundColor: '#e9e8e3',
        };
        const { data } = this.state
        let imagesArray = []
        return (
            <div>
                <Route className="route" exact path="/" component={(props) => {
                    return (
                        <div className="landingPageBTNs">
                            <RaisedButton className="BTN" label="Login as an admin" onClick={() => props.history.push('/login')} />
                            <RaisedButton className="BTN" label="View Organizations" onClick={() => props.history.push('/organizations')} />
                            <RaisedButton className="BTN" label="Add your organization" onClick={() => props.history.push('/add')} />
                        </div>

                    );
                }} />
                <Route className='route' exact path='/' component={(props) => {
                    return (
                        <div className="orgContainer">
                        <div className="title"><h1>Vluchtelingen Werk Nederland</h1></div>
                            <ReactPlayer url='https://youtu.be/18I58D0CRK0' playing
                                youtubeConfig={{ playerVars: { showinfo: 1 } }} />
                            {Object.keys(data).map((org) => {
                                return (
                                    <Paper
                                        key={org} className="org"
                                        style={style} zDepth={1} children={
                                            <div>
                                                <Avatar src={data[org]['logo']} size={100} />
                                                <h3>{data[org]['name']}</h3>
                                            </div>
                                        } />
                                )
                            }
                            )
                            }
                        </div>
                    );
                }} />
            </div >
        );
    }
}
export default LandingPage;