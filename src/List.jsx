import * as React from 'react';
import {
  Virtuoso
} from 'react-virtuoso';

/**
 * Automatically sized, virtualized vertical infinite list that supports dynamic row height
 */
export const List = React.forwardRef(
  (
    {
      data,
      itemContent,
      itemKey,
      fixedItemHeight,
      estimatedItemHeight,
      overscan,
      className,
      components: propComponents,
      initialItemCount,
      useWindowScroll,
      scrollParent,
      context,
      stickyItemCount,
      ...rest
    },
    ref,
  ) => {
    const renderItemContent = React.useCallback(
      (index, item, context) => {
        return React.createElement(itemContent, { item, index, context });
      },
      [itemContent],
    );

    const components = React.useMemo(
      () => ({
        List: propComponents?.List,
        Item: propComponents?.Item,
      }),
      [propComponents],
    );

    const combinedContext = React.useMemo(
      () => ({ ...context, data }),
      [data, context],
    );

    return (
      <Virtuoso
        {...rest}
        {...(initialItemCount !== undefined ? { initialItemCount } : {})}
        topItemCount={stickyItemCount}
        ref={ref}
        useWindowScroll={useWindowScroll}
        customScrollParent={scrollParent ?? undefined}
        fixedItemHeight={fixedItemHeight}
        defaultItemHeight={estimatedItemHeight}
        className={className}
        data={data}
        context={combinedContext}
        components={components}
        itemContent={renderItemContent}
        computeItemKey={itemKey}
      />
    );
  },
);
