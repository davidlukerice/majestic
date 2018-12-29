import React from "react";
import styled from "styled-components";
import { File, Folder, ChevronRight, ChevronDown } from "react-feather";
import {} from "styled-system";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;
const Content = styled.div`
  display: flex;
  align-items: center;
`;
const Label = styled.div`
  margin-left: 5px;
`;
const EmptyChevron = styled.div`
  width: 5px;
`;

interface Item {
  name: string;
  path: string;
  isExpanded?: boolean;
  children?: Item[];
}

interface Props {
  item: Item;
}

export default function FileItem({ item }: Props) {
  const Icon = item.children ? Folder : File;
  let Chevron: any = EmptyChevron;
  if (item.children) {
    Chevron = item.isExpanded ? ChevronDown : ChevronRight;
  }

  return (
    <Container>
      <Content>
        <Chevron size={11} />
        <Icon size={13} />
        <Label>{item.name}</Label>
      </Content>
      {item.children && item.children.map(child => <FileItem item={child} />)}
    </Container>
  );
}
