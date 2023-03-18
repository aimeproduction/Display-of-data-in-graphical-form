export interface DiagramTemplate {
  title: string
  diagramType: string
  queryPath: string
  selectedLinesValue:[
    {
      lineName: string,
      lineColor: string
}
]
}
