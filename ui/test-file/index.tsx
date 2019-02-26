import React, { useEffect } from "react";
import styled from "styled-components";
import { space, color } from "styled-system";
import { useQuery, useMutation } from "react-apollo-hooks";
import FILEITEMS_SUB from "./file-items-subscription.gql";
import FILEITEMS from "./query.gql";
import RUNFILE from "./run-file.gql";
import FILERESULTSUB from "./subscription.gql";
import RESULT from "./result.gql";
import Test from "./test-item";
import { transform } from "./tranformer";
import useSubscription from "./use-subscription";
import Button from "../components/button";
import FileSummary from "./summary";

const Container = styled.div`
  ${space};
  ${color};
  flex-grow: 1;
  height: 100vh;
  padding-left: 20px;
`;

interface Props {
  selectedFilePath: string;
}

export default function TestFile({ selectedFilePath }: Props) {
  const { data: fileItemResult } = useSubscription(
    FILEITEMS,
    FILEITEMS_SUB,
    {
      path: selectedFilePath
    },
    result => result.file,
    result => result.fileChange
  );

  const runFile = useMutation(RUNFILE, {
    variables: {
      path: selectedFilePath
    }
  });

  const { data: result } = useSubscription(
    RESULT,
    FILERESULTSUB,
    {
      path: selectedFilePath
    },
    result => result.result,
    result => result.changeToResult
  );

  const roots = (fileItemResult.items || []).filter(
    item => item.parent === null
  );

  return (
    <Container p={4} bg="dark" color="text">
      <FileSummary
        path={selectedFilePath}
        onRun={() => {
          runFile();
        }}
        onWatch={() => {
          runFile({
            variables: {
              path: selectedFilePath,
              watch: true
            }
          });
        }}
      />

      {fileItemResult &&
        roots.map(item => {
          const tree = transform(item, fileItemResult.items as any);
          return <Test item={tree} result={result} />;
        })}
    </Container>
  );
}
