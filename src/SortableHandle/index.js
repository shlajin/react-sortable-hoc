import * as React from 'react';
import mergeRefs from 'react-merge-refs';
import invariant from 'invariant';

import {provideDisplayName} from '../utils';

export default function sortableHandle(
  WrappedComponent,
  config = {withRef: false},
) {
  return class WithSortableHandle extends React.Component {
    static displayName = provideDisplayName('sortableHandle', WrappedComponent);
    ref = React.createRef();

    componentDidMount() {
      const node = this.ref.current;
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
      const ref = config.withRef ? this.wrappedInstance : null;

      return (
        <WrappedComponent
          ref={ref ? mergeRefs(ref, this.ref) : this.ref}
          {...this.props}
        />
      );
    }
  };
}

export function isSortableHandle(node) {
  return node.sortableHandle != null;
}
