import styled from 'styled-components';

const EditorWrapper = styled.div`
  position: relative;
  flex-grow: 1;
  height: 200px;
  overflow-y: auto;
  overflow-x: hidden;
  color: white;

  & > div:first-child {
    height: 100%;
    tab-size: 1;
    outline: 0;
    padding: 0px 15px 15px;
  }
  & > div:first-child:active {
    cursor: auto;
  }
`;

const PlaceHolder = styled.div`
  color: ${({ theme }) => theme.color.lightGrey};
  overflow: hidden;
  position: absolute;
  top: 0px;
  left: 15px;
  user-select: none;
  pointer-events: none;
`;

export default EditorWrapper;
export { PlaceHolder };
