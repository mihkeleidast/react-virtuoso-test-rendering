import * as React from 'react';
import { render } from '@testing-library/react';

import { List } from './List';

describe('InfiniteList', () => {
  const data = [
    { id: '1', value: 'foo' },
    { id: '2', value: 'bar' },
    { id: '3', value: 'baz' },
  ];

  const itemKey = (_, { id }) => id;

  const Item = (props) => (
    <div {...props} data-testid={`item-${props.context?.data[props['data-item-index']]?.id}`} />
  );

  const itemContent = ({ item: { value } }) => <>{value}</>;

  it('correctly renders items', async () => {
    const { container, queryByTestId } = render(
      <List
        data={data}
        itemKey={itemKey}
        itemContent={itemContent}
        components={{ Item }}
        initialItemCount={data.length}
      />,
      { wrapper: ({ children }) => <div style={{ height: 300 }}>{children}</div> },
    );

    expect(container).toMatchSnapshot();

    // All items are rendered
    expect(queryByTestId('item-1')).not.toBeNull();
    expect(queryByTestId('item-2')).not.toBeNull();
    expect(queryByTestId('item-3')).not.toBeNull();
  });
});
