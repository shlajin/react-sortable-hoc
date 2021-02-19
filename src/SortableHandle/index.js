import * as React from 'react';
import invariant from 'invariant';

import {provideDisplayName} from '../utils';

export default function sortableHandle(
  WrappedComponent,
  config = {withRef: false},
) {
  return class WithSortableHandle extends React.Component {
    static displayName = provideDisplayName('sortableHandle', WrappedComponent);

    componentDidMount() {
      const node = this.wrappedInstance.current;
      console.log({wrappedInstance: this.wrappedInstance});
      node.sortableHandle = true;
    }

    getWrappedInstance() {
      invariant(
        config.withRef,
        'To access the wrapped instance, you need to pass in {withRef: true} as the second argument of the SortableHandle() call',
      );
      return this.wrappedInstance.current;
    }

    wrappedInstance = React.createRef();

    render() {
      return <WrappedComponent {...this.props} ref={this.wrappedInstance} />;
    }
  };
}

export function isSortableHandle(node) {
  return node.sortableHandle != null;
}
