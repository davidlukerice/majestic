import React from "react";
import styled from "styled-components";
import SplitPane from "react-split-pane";
import TestExplorer from "./tests-explorer";

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

export default class App extends React.Component {
  render() {
    return (
      <ContainerDiv>
        <SplitPane split="vertical" defaultSize={400}>
          <SplitPane split="vertical" defaultSize={350} primary="second">
            <div>
              <TestExplorer />
            </div>
            <div />
          </SplitPane>
        </SplitPane>
      </ContainerDiv>
    );
  }
}
