import styled from 'styled-components/native';
import { Label, Item, Button, Text, Icon, Container, Content, Input, Switch, CheckBox, List, ListItem, Thumbnail, Footer } from 'native-base';

export const CustomView = styled.View`
  ${props => props.customCss}
`;

export const CustomScrollView = styled.ScrollView`
  ${props => props.customCss}
`;


export const CustomImage = styled.Image`
  ${props => props.customCss}
`;

export const CustomLabel = styled(Label)`
  ${props => props.customCss}
`;

export const CustomItem = styled(Item)`
  margin: 10px;
  margin-bottom:0px;
  ${props => props.customCss}
`;

export const CustomButton = styled(Button)`
  ${props => props.customCss}
`;

export const CustomText = styled(Text)`
  ${props => props.customCss}
`;

export const CustomIcon = styled(Icon)`
  ${props => props.customCss}
`;

export const CustomContainer = styled(Container)`
  ${props => props.customCss}
`;

export const CustomContent = styled(Content)`
  width: 100%;
  ${props => props.customCss}
`;

export const CustomInput = styled(Input)`
  ${props => props.customCss}
`;

export const CustomSwitch = styled(Switch)`
  ${props => props.customCss}
`;

export const CustomCheckBox = styled(CheckBox)`
  ${props => props.customCss}
`;

export const CustomList = styled(List)`
  ${props => props.customCss}
`;

export const CustomListItem = styled(ListItem)`
  ${props => props.customCss}
`;


export const CustomThumbnail = styled(Thumbnail)`
  ${props => props.customCss}
`;

export const CustomFooter = styled(Footer)`
  ${props => props.customCss}
`;

