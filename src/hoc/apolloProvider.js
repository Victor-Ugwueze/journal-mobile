import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import hoistNonReactStatic from 'hoist-non-react-statics';



export default apolloProvider = (WrappedComponent, client) => {
  class Enhance extends Component {
    render () {
      return (
          <ApolloProvider client={client}>
            <WrappedComponent {...this.props} />
          </ApolloProvider>
      )
    }
  }
  hoistNonReactStatic(Enhance, WrappedComponent);
  return Enhance;
};
