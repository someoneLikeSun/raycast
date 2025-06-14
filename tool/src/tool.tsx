import { ActionPanel, Action, Icon, List, LaunchProps, Detail } from "@raycast/api";

export default function Command(props: LaunchProps) {
  const weight = parseFloat(props.arguments.weight);
  const price = parseFloat(props.arguments.price);
  if(!isFinite(weight)|| !isFinite(price)){
    return (<Detail markdown="输入内容应是数字"/>)
  }

  const kg_p=kg_price(weight,price)
  const g_p=g_price(weight,price)
  const jin_p=jin_price(weight,price)

  return (
    <List>
      <List.Item title={`千克(kg)：${kg_p}元/每斤`} actions={resultActions(kg_p)}/>
      <List.Item title={`克(g):${g_p}元/每斤`} actions={resultActions(g_p)}/>
      <List.Item title={`斤(j):${jin_p}元/每斤`} actions={resultActions(jin_p)}/>
    </List>
  );
}

function kg_price(weight: number, price: number){
  return Math.round(price/(weight*2) *100)/100;
}

function g_price(weight: number, price: number){
  return Math.round((price*500/weight)*100)/100;
}

function jin_price(weight: number, price: number){
  return Math.round((price/weight) *100)/100;
}

function resultActions(result:number){
  return (
    <ActionPanel>
      <Action.CopyToClipboard content={`${result}元/每斤`}/>
    </ActionPanel>
  )
}
