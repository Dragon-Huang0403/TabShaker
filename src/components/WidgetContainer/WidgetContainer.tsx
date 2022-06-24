import React, { useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Resizers from './Resizers';
import Dragger from './Dragger';
import globalTheme from '../../theme';
import type { Direction, WidgetSizeLimit, WidgetSize } from './types';
import defaultTheme from './defaultTheme';
import { getNewWidgetSize } from './util';
import IconDropDownMenu from '../IconDropDownMenu';
import { MoreDots } from '../Icons';

const Wrapper = styled.div`
  user-select: none;
  position: relative;
`;

// 偵測視窗大小改變 >> addEventListener on window resize
// 透過視窗大小，得到現在畫面上可包含幾個網格，算出那些元件可以在畫面上
// offset 網格起始位置，render畫面

interface WidgetContainerProps extends WidgetSize {
  children: JSX.Element;
  limit: WidgetSizeLimit;
  onChange: (newWidgetSize: WidgetSize) => void;
  canWidgetMove: (newWidgetSize: WidgetSize) => boolean;
  handleConflict: (newWidgetSize: WidgetSize) => void;
  deleteWidget: () => void;
}

function WidgetContainer({
  limit,
  rowStart,
  rows,
  columnStart,
  columns,
  children,
  onChange,
  canWidgetMove,
  handleConflict,
  deleteWidget,
}: WidgetContainerProps) {
  const { gridUnit } = globalTheme;
  const defaultSize = { rowStart, rows, columnStart, columns };
  const [widgetSize, setWidgetSize] = useState(defaultSize);
  const [updateDragger, setUpdateDragger] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const handleOnSizeChange = (
    columnsDiff: number,
    rowsDiff: number,
    direction: Direction,
  ) => {
    const changes = { columnsDiff, rowsDiff, direction };
    const newWidgetSize = getNewWidgetSize(widgetSize, limit, changes);
    if (!canWidgetMove(newWidgetSize)) return;
    setWidgetSize(newWidgetSize);
  };

  const handleOnDrag = (
    columnsDiff: number,
    rowsDiff: number,
    status: string,
  ) => {
    const newRowStart = rowStart + rowsDiff >= 1 ? rowStart + rowsDiff : 1;
    const newColumnStart =
      columnStart + columnsDiff >= 1 ? columnStart + columnsDiff : 1;
    const newWidgetSize = {
      ...widgetSize,
      rowStart: newRowStart,
      columnStart: newColumnStart,
    };
    if (status === 'end' && canWidgetMove(newWidgetSize)) {
      setWidgetSize(newWidgetSize);
      return;
    }
    handleConflict(newWidgetSize);
  };

  useEffect(() => {
    onChange(widgetSize);
  }, [widgetSize]);

  useEffect(() => {
    setWidgetSize({ rowStart, columnStart, rows, columns });
    setUpdateDragger((prev) => !prev);
  }, [rowStart, columnStart, rows, columns]);

  const style = {
    gridColumnStart: widgetSize.columnStart,
    gridColumnEnd: `span ${widgetSize.columns}`,
    gridRowStart: widgetSize.rowStart,
    gridRowEnd: `span ${widgetSize.rows}`,
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Wrapper
        style={style}
        onMouseEnter={() => {
          setIsHover(true);
        }}
        onMouseLeave={() => {
          setIsHover(false);
        }}
      >
        {isHover && (
          <IconDropDownMenu
            items={[{ text: 'Delete', onClick: deleteWidget }]}
            style={{ top: '12px', right: '12px', position: 'absolute' }}
          >
            <MoreDots />
          </IconDropDownMenu>
        )}
        <Resizers
          defaultHeight={widgetSize.rows * gridUnit}
          defaultWidth={widgetSize.columns * gridUnit}
          gridUnit={gridUnit}
          handleOnSizeChange={handleOnSizeChange}
        />
        <Dragger
          gridUnit={gridUnit}
          handleOnDrag={handleOnDrag}
          updateDragger={updateDragger}
        >
          {children}
        </Dragger>
      </Wrapper>
    </ThemeProvider>
  );
}

export default WidgetContainer;
