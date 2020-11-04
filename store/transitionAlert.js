import { createContext, Component } from 'react';

const State = createContext();
const Dispatch = createContext();

class Provider extends Component {
  state = {
    isOpen: false,
  }

  dispatch = {
    updateTransitionAlert: this.updateTransitionAlert.bind(this),
  }

  updateTransitionAlert(values) {
    this.setState({
      ...this.state,
      ...values,
    })
  }

  render() {
    const { children } = this.props;
    
    return (
        <State.Provider value={this.state}>
            <Dispatch.Provider value={this.dispatch}>
                {children}
            </Dispatch.Provider>
        </State.Provider>
    );
  }
}

export const TransitionAlert = {
  State,
  Provider,
  Dispatch,
};
